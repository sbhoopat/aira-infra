from fastapi import APIRouter, HTTPException, Depends, Query, status
from typing import List, Optional, Any, Dict
from models import PropertyCreate, PropertyUpdate, PropertyResponse, UserResponse
from database import DatabaseService
from routers.auth import require_admin, get_current_user

router = APIRouter(prefix="/api/properties", tags=["Properties"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_properties(
    area: Optional[str] = Query(None, description="Filter by area e.g. Kokapet"),
    type: Optional[str] = Query(None, description="Filter by type e.g. Apartments"),
    status: Optional[str] = Query(None, description="Filter by status e.g. Ongoing"),
    search: Optional[str] = Query(None, description="Search query")
):
    """Retrieve all real estate projects with optional filtering."""
    properties = DatabaseService.get_all_properties(area=area, p_type=type, status=status, search=search)
    return properties

@router.get("/{property_id}", response_model=Dict[str, Any])
async def get_property(property_id: str):
    """Retrieve single property details by ID or slug."""
    property_item = DatabaseService.get_property_by_id(property_id)
    if not property_item:
        raise HTTPException(status_code=404, detail=f"Property '{property_id}' not found")
    return property_item

@router.post("", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
async def create_property(prop: PropertyCreate, admin: UserResponse = Depends(require_admin)):
    """Create a new property listing (Admin only)."""
    data = prop.dict()
    created = DatabaseService.create_property(data)
    return created

@router.put("/{property_id}", response_model=Dict[str, Any])
async def update_property(property_id: str, updates: PropertyUpdate, admin: UserResponse = Depends(require_admin)):
    """Update an existing property listing (Admin only)."""
    clean_updates = {k: v for k, v in updates.dict().items() if v is not None}
    updated = DatabaseService.update_property(property_id, clean_updates)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Property '{property_id}' not found")
    return updated

@router.delete("/{property_id}")
async def delete_property(property_id: str, admin: UserResponse = Depends(require_admin)):
    """Delete a property listing from the database (Admin only)."""
    success = DatabaseService.delete_property(property_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Property '{property_id}' not found")
    return {"success": True, "message": f"Property '{property_id}' deleted successfully"}
