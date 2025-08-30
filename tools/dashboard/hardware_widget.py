import curses
import psutil
import os
import time
from typing import Any, Optional

class HardwareWidget:
    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr

        self.row: Optional[int] = None
        self.cpu_usage: float = 0
        self.memory: Any = None  # psutil.virtual_memory() returns a named tuple
        self.temp: str = ""
        self.temp_num: float = 0
        self.update()

    @staticmethod
    def get_cpu_display(cpu_usage: float) -> int:
        if cpu_usage < 30:
            return curses.color_pair(3)
        elif cpu_usage < 50:
            return curses.color_pair(4)
        elif cpu_usage < 70:
            return curses.color_pair(5)
        else:
            return curses.color_pair(5) | curses.A_REVERSE

    @staticmethod
    def get_memory_display(memory_percent: float) -> int:
        if memory_percent < 30:
            return curses.color_pair(3)
        elif memory_percent < 50:
            return curses.color_pair(4)
        elif memory_percent < 70:
            return curses.color_pair(5)
        else:
            return curses.color_pair(5) | curses.A_REVERSE

    @staticmethod
    def get_temp_display(temp_num: float) -> int:
        if temp_num < 55:
            return curses.color_pair(3)
        elif temp_num < 60:
            return curses.color_pair(4)
        elif temp_num < 64:
            return curses.color_pair(5)
        else:
            return curses.color_pair(5) | curses.A_REVERSE

    def update(self, time: float = time.time()) -> None:
        self.cpu_usage = psutil.cpu_percent(interval=1)
        self.memory = psutil.virtual_memory()
        self.temp = os.popen("vcgencmd measure_temp").readline().strip().replace("temp=", "")
        try:
            self.temp_num = float(self.temp.replace("'C", "").replace("C", ""))
        except Exception:
            self.temp_num = 0

    def draw(self, row: Optional[int] = None) -> int:
        if row is None:
            row = self.row if self.row is not None else 0
        self.row = row

        cpu_color = self.get_cpu_display(self.cpu_usage)
        memory_color = self.get_memory_display(self.memory.percent)
        temp_color = self.get_temp_display(self.temp_num)

        self.stdscr.addstr(row, 0, "CPU:", curses.A_BOLD)
        self.stdscr.addstr(row, 4, f"{self.cpu_usage:04.1f}%", cpu_color)
        self.stdscr.addstr(row, 11, "Mem:", curses.A_BOLD)
        self.stdscr.addstr(row, 15, f"{self.memory.percent:04.1f}%", memory_color)
        self.stdscr.addstr(row, 21, f"({self.memory.used / 1024**2:05.1f}MB)")
        self.stdscr.addstr(row, 32, "T:", curses.A_BOLD)
        self.stdscr.addstr(row, 34, f"{self.temp_num:3.1f}'C", temp_color)

        return row + 2
