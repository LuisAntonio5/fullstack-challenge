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