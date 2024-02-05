import os
from sqlite3 import Connection

from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db

router = APIRouter()


@router.get("/companies")
async def get_companies(db: Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM companies")
    companies = cursor.fetchall()
    return {"companies": companies}

@router.get("/companies/{company_id}")
async def get_company_by_id(company_id: int, db: Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM companies WHERE company_id = ?", (company_id,))
    company = cursor.fetchone()
    
    if company:
        return {"company": company}
    else:
        return {"message": "Company not found"}
