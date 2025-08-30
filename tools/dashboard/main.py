import curses
import time
import threading
from container_widget import ContainerWidget
from website_widget import WebsiteWidget
from hardware_widget import HardwareWidget
from process_widget import ProcessWidget
from timer_widget import TimerWidget
from typing import Any

class MonitorApp:
    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr
        self.stdscr.nodelay(True)  # Make getch non-blocking

        self.setup_curses()

        self.container_widget = ContainerWidget(self.stdscr)
        self.hardware_widget = HardwareWidget(self.stdscr)
        # self.process_widget = ProcessWidget(self.stdscr)
        self.timer_widget = TimerWidget(self.stdscr)
        self.website_widget = WebsiteWidget(self.stdscr)

        self._run_background_updates()

    def _run_background_updates(self):
        def updater(widget, interval=1.0, offset=0.0):
            if offset > 0:
                time.sleep(offset)
            while True:
                widget.update(time.time())
                time.sleep(interval)

        threading.Thread(target=updater, args=(self.hardware_widget, 1, 0), daemon=True).start()
        # threading.Thread(target=updater, args=(self.process_widget, 3, 2), daemon=True).start()
        threading.Thread(target=updater, args=(self.website_widget, 1, 0), daemon=True).start()
        threading.Thread(target=updater, args=(self.container_widget, 3, 4), daemon=True).start()
        threading.Thread(target=updater, args=(self.timer_widget, 0.5, 0), daemon=True).start()

    def setup_curses(self) -> None:
        curses.curs_set(0)  # Hide cursor

        curses.init_pair(1, curses.COLOR_BLUE, curses.COLOR_BLACK)
        curses.init_pair(2, curses.COLOR_CYAN, curses.COLOR_BLACK)
        curses.init_pair(3, curses.COLOR_GREEN, curses.COLOR_BLACK)
        curses.init_pair(4, curses.COLOR_YELLOW, curses.COLOR_BLACK)
        curses.init_pair(5, curses.COLOR_RED, curses.COLOR_BLACK)
        curses.init_pair(6, curses.COLOR_MAGENTA, curses.COLOR_BLACK)

        curses.init_pair(10, curses.COLOR_WHITE, curses.COLOR_BLACK)

    def draw(self) -> None:
        row = 0
        row = self.hardware_widget.draw(row)
        # row = self.process_widget.draw(row)
        row = self.website_widget.draw(row)
        row = self.container_widget.draw(row)
        row = self.timer_widget.draw(row)
        self.stdscr.refresh()

    def run(self) -> None:
        self.stdscr.clear()
        last_draw = time.time()
        last_clear = time.time()
        self.draw()  # Initial draw

        while True:
            now = time.time()
            key = self.stdscr.getch()

            # Clear the screen every minute
            if now - last_clear >= 60:
                self.stdscr.clear()
                last_clear = now

            # If key is pressed
            if key != -1:
                self.timer_widget.handle_input(key, now)
                self.timer_widget.draw()

            # If second has passed
            if now - last_draw >= 1:
                self.draw()
                last_draw = now

            time.sleep(0.05)

def main(stdscr: Any) -> None:
    app = MonitorApp(stdscr)
    app.run()

if __name__ == "__main__":
    curses.wrapper(main)
