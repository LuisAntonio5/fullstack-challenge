import json
import os
import sqlite3
import sys


def get_db():
    dirname = os.path.dirname(__file__)
    db_path = os.path.join(dirname, "./../data/database.sqlite")

    with sqlite3.connect(db_path, check_same_thread=False) as db:
        db.row_factory = sqlite3.Row
        db.execute("PRAGMA foreign_keys=ON")
        yield db

def company_id_exists(cursor, company_id):
    # Check if a company with the specified company_id exists in the companies table
    cursor.execute("SELECT COUNT(*) FROM companies WHERE company_id = ?", (company_id,))
    count = cursor.fetchone()[0]
    return count > 0

# Insert data into the companies table
def insert_companies(data, cursor):
    """
        Since a company must have a unique company_id, the
        unique_company_ids set enables checking if a company
        has already been inserted into the companies table.
    """
    unique_company_ids = set()
    for item in data.values():
        company_id = item["company_id"]
        if company_id not in unique_company_ids:
            cursor.execute("""
                INSERT INTO companies (company_id, name, country, founding_date, description)
                VALUES (?, ?, ?, ?, ?)""", 
                (item["company_id"], item["name"], item["country"], item["founding_date"], item["description"])
            )
            unique_company_ids.add(company_id)

# Insert data into the deals table
def insert_deals(data, cursor):
    """
        Since a deal must have an existing company_id, 
        company_id_exists() is used to ensure that the deal is 
        made with a company_id that exists in the database.
    """
    for item in data.values():
        company_id = item["company_id"]
        if company_id_exists(cursor, company_id):
            cursor.execute("""
                INSERT INTO deals (date, funding_amount, funding_round, company_id)
                VALUES (?, ?, ?, ?)""",
                (item["date"], item["funding_amount"], item["funding_round"], item["company_id"])
            )

def load_data_to_db():
    db_generator = get_db()
    db = next(db_generator)

    try:
        with open("data/challenge_companies.json") as f:
            companies_data = json.load(f)
            insert_companies(companies_data, db.cursor())

        db.commit()

        with open("data/challenge_deals.json") as f:
            deals_data = json.load(f)
            insert_deals(deals_data, db.cursor())
        
        db.commit()
    finally:
        try:
            next(db_generator)
        except StopIteration:
            pass
        db.close()

    print("Data imported.")

if __name__ == '__main__':
    globals()[sys.argv[1]]()