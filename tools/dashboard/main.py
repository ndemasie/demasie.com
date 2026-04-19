import curses
import time
import threading
from tools.dashboard.widget_container import WidgetContainer
from tools.dashboard.widget_website import WidgetWebsite
from tools.dashboard.widget_hardware import WidgetHardware
from tools.dashboard.widget_process import WidgetProcess
from tools.dashboard.widget_timer import WidgetTimer
from typing import Any

class MonitorApp:
    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr
        self.stdscr.nodelay(True)  # Make getch non-blocking

        self._setup_curses()

        self.widget_container = WidgetContainer(self.stdscr)
        self.widget_hardware = WidgetHardware(self.stdscr)
        # self.widget_process = WidgetProcess(self.stdscr)
        self.widget_timer = WidgetTimer(self.stdscr)
        self.widget_website = WidgetWebsite(self.stdscr)

        self._run_background_updates()

    def _run_background_updates(self):
        def updater(widget, interval=1.0, offset=0.0):
            if offset > 0:
                time.sleep(offset)
            while True:
                widget.update(time.time())
                time.sleep(interval)

        threading.Thread(target=updater, args=(self.widget_hardware, 1, 0), daemon=True).start()
        # threading.Thread(target=updater, args=(self.widget_process, 3, 2), daemon=True).start()
        threading.Thread(target=updater, args=(self.widget_website, 1, 0), daemon=True).start()
        threading.Thread(target=updater, args=(self.widget_container, 3, 4), daemon=True).start()
        threading.Thread(target=updater, args=(self.widget_timer, 0.5, 0), daemon=True).start()

    def _setup_curses(self) -> None:
        curses.curs_set(0)  # Hide cursor

        curses.init_pair(1, curses.COLOR_BLUE, curses.COLOR_BLACK)
        curses.init_pair(2, curses.COLOR_CYAN, curses.COLOR_BLACK)
        curses.init_pair(3, curses.COLOR_GREEN, curses.COLOR_BLACK)
        curses.init_pair(4, curses.COLOR_YELLOW, curses.COLOR_BLACK)
        curses.init_pair(5, curses.COLOR_RED, curses.COLOR_BLACK)
        curses.init_pair(6, curses.COLOR_MAGENTA, curses.COLOR_BLACK)

        curses.init_pair(10, curses.COLOR_WHITE, curses.COLOR_BLACK)

    def _draw(self) -> None:
        row = 0
        row = self.widget_hardware.draw(row)
        # row = self.widget_process.draw(row)
        row = self.widget_website.draw(row)
        row = self.widget_container.draw(row)
        row = self.widget_timer.draw(row)
        self.stdscr.refresh()

    def run(self) -> None:
        self.stdscr.clear()
        last_draw = time.time()
        last_clear = time.time()

        self._draw()  # Initial draw

        while True:
            now = time.time()
            key = self.stdscr.getch()

            # Clear the screen every minute
            if now - last_clear >= 60:
                self.stdscr.clear()
                last_clear = now

            # If key is pressed
            if key != -1:
                self.widget_timer.handle_input(key, now)
                self.widget_timer.draw()

            # If second has passed
            if now - last_draw >= 1:
                self._draw()
                last_draw = now

            time.sleep(0.05)

def main(stdscr: Any) -> None:
    app = MonitorApp(stdscr)
    app.run()

if __name__ == "__main__":
    curses.wrapper(main)
