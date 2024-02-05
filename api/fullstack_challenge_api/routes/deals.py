from sqlite3 import Connection
from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db

router = APIRouter()

@router.get("/deals")
async def get_deals(db: Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM deals")
    deals = cursor.fetchall()
    return {"deals": deals}

@router.get("/deals/company/{company_id}")
async def get_deals_by_company_id(company_id: int, db: Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM deals WHERE company_id = ?", (company_id,))
    deals = cursor.fetchall()
    
    if deals:
        return {"deals": deals}
    else:
        return {"message": "Deals for the company not found"}
