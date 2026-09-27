from fastapi import APIRouter
from typing import List, Dict, Any
from database import DatabaseService

router = APIRouter(prefix="/api/locations", tags=["Locations"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_locations():
    """Retrieve all Hyderabad residential growth corridors and market trends."""
    return DatabaseService.get_locations()
