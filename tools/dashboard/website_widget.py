import curses
import time
import requests
import urllib
from typing import Dict, List, Tuple, Optional

class WebsiteWidget:
    def __init__(self, stdscr) -> None:
        self.stdscr = stdscr

        self.row: Optional[int] = None
        self.cache_index: int = 0
        self.cache: Dict[str, int] = {
            "https://lieblinghomecare.com": 0,
            "https://demasie.com/health": 0,
            # "https://ssh.demasie.com": 0,
            # "https://ftp.demasie.com": 0,
            "https://nathan.demasie.com/health": 0,
            "https://habit.demasie.com/health": 0,
            "https://refer.demasie.com/health": 0,
            "https://app-habit-print.demasie.com/health": 0,
            "https://app-refer-codes.demasie.com/health": 0,
            "https://app-site.demasie.com/health": 0,
            "https://edu-i18next-server.demasie.com/health": 0,
            "https://tool-n8n.demasie.com/healthz": 0
        }
        self.keys: List[str] = list(self.cache.keys())

    @staticmethod
    def get_website_status(url: str) -> int:
        try:
            return requests.head(url, timeout=5).status_code
        except requests.RequestException:
            return 400

    @staticmethod
    def get_website_display(status_code: int, website_url: str) -> Tuple[int, str, str]:
        display_url: str = urllib.parse.urlparse(website_url).netloc.rjust(33)

        if status_code == 0:
            return curses.color_pair(2) | curses.A_REVERSE, "UKN".center(6), display_url
        elif status_code == 200:
            return curses.color_pair(3) | curses.A_REVERSE, "OK".center(6), display_url
        else:
            return curses.color_pair(5) | curses.A_REVERSE, "ERROR".center(6), display_url

    def update(self, time: float = time.time()) -> None:
        website_url: str = self.keys[self.cache_index % len(self.keys)]
        self.cache[website_url] = self.get_website_status(website_url)
        self.cache_index += 1

    def draw(self, row: Optional[int] = None) -> int:
        if row is None:
            row = self.row if self.row is not None else 0
        self.row = row

        self.stdscr.addstr(row, 0, f"{'Website'.rjust(33):<34}{'Status':<6}", curses.A_BOLD)

        for i, (website_url, status_code) in enumerate(self.cache.items()):
            color, status, website = self.get_website_display(status_code, website_url)
            self.stdscr.addstr(row + 1, 0, f"{website[-33:]:<34}")
            self.stdscr.addstr(row + 1, 34, f"{status[:6]}", color)
            row += 1

        return row + 2
