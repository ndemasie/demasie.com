import curses
import time
from typing import Optional
from enum import Enum

class TimerButton(Enum):
    START_STOP = 0
    RESET = 1

class TimerWidget:

    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr

        self.row: Optional[int] = None
        self.button: TimerButton = TimerButton.START_STOP
        self.is_running: bool = False
        self.start_time: Optional[float] = None
        self.elapsed: float = 0
        self.reset_armed: bool = False  # Tracks if reset is armed for double click
        self.update()

    def get_time_display(self) -> int:
        hours: int = int(self.elapsed // 3600)
        minutes: int = int((self.elapsed % 3600) // 60)
        seconds: int = int(self.elapsed % 60)
        text = f"{hours:02}:{minutes:02}:{seconds:02}"

        flash = curses.A_NORMAL if int(self.elapsed) % 2 == 0 else curses.A_REVERSE

        if not self.is_running:
            color = curses.A_BOLD
        elif self.elapsed < (60 * 60 * 7): # 7 hours
            color = curses.color_pair(3) | flash
        elif self.elapsed < (60 * 60 * 8): # 8 hours
            color = curses.color_pair(4) | flash
        else:
            color = curses.color_pair(5) | flash

        return color, text

    def get_reset_display(self):
        if self.button == TimerButton.RESET and self.reset_armed:
            color = curses.color_pair(5) | curses.A_REVERSE
        elif self.button == TimerButton.RESET:
            color = curses.A_REVERSE
        else:
            color = curses.A_NORMAL

        return color, "Reset"

    def get_start_display(self):
        color = curses.A_REVERSE if self.button == TimerButton.START_STOP else curses.A_NORMAL
        text = "Start" if not self.is_running else "Stop"
        return color, text

    def handle_input(self, key: int, time: float = time.time()) -> None:
        if key in (curses.KEY_STAB, curses.KEY_BTAB, 9):
            self.button = TimerButton((self.button.value + 1) % 2)

        if key in (curses.KEY_ENTER, 10, 13):
            if self.button == TimerButton.START_STOP:
                if not self.is_running:
                    self.is_running = True
                    self.start_time = time
                else:
                    self.is_running = False
                    self.elapsed += time - self.start_time
                    self.start_time = None

            elif self.button == TimerButton.RESET:
                if not self.reset_armed:
                    self.reset_armed = True  # First click arms reset
                    return
                else:
                    self.is_running = False
                    self.elapsed = 0
                    self.start_time = None
                    self.button = TimerButton.START_STOP

        self.reset_armed = False  # Disarm reset if switching


    def update(self, time: float = time.time()) -> None:
        if self.is_running and self.start_time is not None:
            self.elapsed += time - self.start_time
            self.start_time = time


    def draw(self, row: Optional[int] = None) -> int:
        if row is None:
            row = self.row if self.row is not None else 0
        self.row = row

        # Start/Stop
        color, text = self.get_start_display()
        self.stdscr.addstr(row, 2, f" [ {text} ] ", color)

        # Timer (highlight if running)
        color, text = self.get_time_display()
        self.stdscr.addstr(row, 15, f" {text} ", color)

        # Reset
        color, text = self.get_reset_display()
        self.stdscr.addstr(row, 27, f" [ {text} ] ", color)

        if row is None:
            self.stdscr.refresh()

        return row + 2