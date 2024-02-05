import os
import sqlite3


def get_db():
    dirname = os.path.dirname(__file__)
    db_path = os.path.join(dirname, "./../data/database.sqlite")

    with sqlite3.connect(db_path, check_same_thread=False) as db:
        db.row_factory = sqlite3.Row
        db.execute("PRAGMA foreign_keys=ON")
        yield db
