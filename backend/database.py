
import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).resolve().parent / "landfair.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    try:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS market_values (
                id TEXT PRIMARY KEY,
                state TEXT NOT NULL,
                district TEXT NOT NULL,
                mandal TEXT NOT NULL,
                village TEXT NOT NULL,
                land_category TEXT NOT NULL,
                land_classification TEXT,
                rate REAL,
                unit TEXT,
                effective_from TEXT,
                effective_to TEXT,
                source_reference TEXT,
                verification_status TEXT NOT NULL
                    DEFAULT 'unverified'
            )
        """)

        connection.commit()

    finally:
        connection.close()
