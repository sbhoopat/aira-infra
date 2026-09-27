from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from models import UserResponse
from database import DatabaseService, get_supabase
from seed_data import INITIAL_PROPERTIES, INITIAL_LOCATIONS
from routers.auth import require_admin
from config import settings

router = APIRouter(prefix="/api/admin", tags=["Admin Portal Utilities"])

@router.get("/stats")
async def get_admin_stats(admin: UserResponse = Depends(require_admin)) -> Dict[str, Any]:
    """Retrieve administrative dashboard summary metrics."""
    inquiries = DatabaseService.get_all_inquiries()
    properties = DatabaseService.get_all_properties()

    site_visits = len([i for i in inquiries if "visit" in i.get("type", "").lower()])
    brochures = len([i for i in inquiries if "brochure" in i.get("type", "").lower()])
    direct = len([i for i in inquiries if "enquiry" in i.get("type", "").lower() or "inquiry" in i.get("type", "").lower()])

    return {
        "total_properties": len(properties),
        "total_inquiries": len(inquiries),
        "site_visits_booked": site_visits,
        "brochure_downloads": brochures,
        "direct_inquiries": direct,
        "supabase_project_id": settings.SUPABASE_PROJECT_ID,
        "supabase_connected": get_supabase() is not None
    }

@router.post("/seed")
async def seed_database(admin: UserResponse = Depends(require_admin)):
    """Seed initial luxury property portfolio to database (Admin only)."""
    client = get_supabase()
    seeded_count = 0

    if client:
        try:
            for p in INITIAL_PROPERTIES:
                client.table("properties").upsert(p).execute()
                seeded_count += 1
            for loc in INITIAL_LOCATIONS:
                client.table("locations").upsert(loc).execute()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to seed Supabase database: {str(e)}")
    else:
        for p in INITIAL_PROPERTIES:
            DatabaseService.create_property(p)
            seeded_count += 1

    return {
        "success": True,
        "message": f"Successfully seeded {seeded_count} properties and micro-market locations!",
        "seeded_properties": seeded_count
    }
