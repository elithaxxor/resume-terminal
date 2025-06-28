import sqlite3
from pathlib import Path
from typing import Optional, List, Tuple

DB_PATH = Path(__file__).resolve().parent.parent / 'applications.db'

CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS applications (
    job_id TEXT PRIMARY KEY,
    title TEXT,
    company TEXT,
    provider TEXT,
    date_applied TEXT,
    status TEXT,
    follow_up_dt TEXT,
    notes TEXT
)
"""

class Tracker:
    def __init__(self, db_path: Path = DB_PATH):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute(CREATE_TABLE)
        self.conn.commit()

    def log_application(self, job_id: str, title: str, company: str, provider: str,
                        date_applied: str, status: str = 'submitted',
                        follow_up_dt: Optional[str] = None, notes: str = '') -> None:
        self.conn.execute(
            'REPLACE INTO applications (job_id, title, company, provider, date_applied, status, follow_up_dt, notes) '
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            (job_id, title, company, provider, date_applied, status, follow_up_dt, notes)
        )
        self.conn.commit()

    def update_status(self, job_id: str, status: str) -> None:
        self.conn.execute('UPDATE applications SET status=? WHERE job_id=?', (status, job_id))
        self.conn.commit()

    def get_applications(self) -> List[Tuple]:
        cur = self.conn.execute('SELECT * FROM applications')
        return cur.fetchall()
