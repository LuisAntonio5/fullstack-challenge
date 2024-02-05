import os
from sqlite3 import Connection

from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db

router = APIRouter()


@router.get("/companies")
async def get_companies(db: Connection = Depends(get_db)):
    pass
