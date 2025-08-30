import curses
import time
import psutil
from typing import List, Any, Optional

class ProcessWidget:
    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr

        self.row: Optional[int] = None
        self.cache: List[Any] = []
        self.update_time: float = 0
        self.update()

    def update(self, time: float = time.time()) -> None:
        self.cache = sorted(psutil.process_iter(['pid', 'name', 'cpu_percent']),
                            key=lambda p: p.info['cpu_percent'], reverse=True)[:3]

    def draw(self, row: Optional[int] = None) -> int:
        if row is None:
            row = self.row if self.row is not None else 0
        self.row = row

        self.stdscr.addstr(row, 0, f"{'PID':<9}{'Name':<25}{'CPU %':<8}", curses.A_BOLD)

        for i, p in enumerate(self.cache):
            self.stdscr.addstr(row + 1, 0, f"{p.info['pid']:<9}{p.info['name'][:24]:<25}{p.info['cpu_percent']:<8.2f}")
            row += 1

        return row + 2
