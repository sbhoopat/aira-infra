from fastapi import APIRouter, HTTPException, Depends, Query, status, UploadFile, File
from typing import List, Optional, Any, Dict
import os
import shutil
from models import PropertyCreate, PropertyUpdate, PropertyResponse, UserResponse
from database import DatabaseService
from routers.auth import require_admin, get_current_user
from excel_parser import parse_excel_to_properties

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

@router.post("/upload-excel", status_code=status.HTTP_201_CREATED)
async def upload_excel(file: UploadFile = File(...), admin: UserResponse = Depends(require_admin)):
    """Upload an Excel file to bulk import properties (Admin only)."""
    if not file.filename.endswith('.xlsx'):
        raise HTTPException(status_code=400, detail="Only .xlsx files are supported")
    
    import tempfile
    
    # Save the file temporarily in the system's temp directory (required for Vercel)
    temp_dir = tempfile.gettempdir()
    temp_file = os.path.join(temp_dir, f"temp_{file.filename}")
    try:
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        properties_data = parse_excel_to_properties(temp_file)
        
        created_count = 0
        for prop_data in properties_data:
            # Optionally validate data with PropertyCreate
            # Here we just insert directly for flexibility or we could parse
            DatabaseService.create_property(prop_data)
            created_count += 1
            
        return {"success": True, "message": f"Successfully imported {created_count} properties from {file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

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
