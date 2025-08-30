import curses
import subprocess
import re
import time
from typing import List, Tuple, Optional

class ContainerWidget:
    def __init__(self, stdscr: 'curses._CursesWindow') -> None:
        self.stdscr: 'curses._CursesWindow' = stdscr

        self.row: Optional[int] = None
        self.cache: List[Tuple[str, str, str]] = []
        self.update_time: float = 0
        self.update()

    @staticmethod
    def load_docker_cache() -> List[Tuple[str, str, str]]:
        result: List[Tuple[str, str, str]] = []
        try:
            output = subprocess.check_output([
                "docker", "ps", "--format", "{{.ID}}|{{.Names}}|{{.State}}|{{.Status}}"
            ], text=True)
            for line in output.strip().splitlines():
                container_id, name, state, status = line.split("|", 3)
                result.append((container_id, name, state, status))
        except Exception:
            pass
        return result

    @staticmethod
    def get_container_display(state: str, status: str) -> Tuple[int, str]:
        match = re.search(r'\((\w+?)\)', status)
        text = match.group(1) if match else state

        if text == "paused":
            return curses.color_pair(2), text
        elif text in ("healthy", "running"):
            return curses.color_pair(3), text
        elif text in ("unhealthy", "restarting"):
            return curses.color_pair(4), text
        else:
            return curses.color_pair(5), text

    def update(self, time: float = time.time()) -> None:
        self.cache = self.load_docker_cache()

    def draw(self, row: Optional[int] = None) -> int:
        if row is None:
            row = self.row if self.row is not None else 0
        self.row = row

        self.stdscr.addstr(row, 0, f"{'Container':<32}{'Status':<8}", curses.A_BOLD)

        for i, (container_id, name, state, status) in enumerate(sorted(self.cache, key=lambda x: x[1])):
            color, text = self.get_container_display(state, status)
            self.stdscr.addstr(row + 1, 0, f"{name[:31]:<32}")
            self.stdscr.addstr(row + 1, 32, f"{text[:8]}", color)
            row += 1

        return row + 2
