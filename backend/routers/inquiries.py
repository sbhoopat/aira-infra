from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Dict, Any
from models import InquiryCreate, InquiryStatusUpdate, InquiryResponse, UserResponse
from database import DatabaseService
from routers.auth import require_admin

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries & Leads"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_inquiries(admin: UserResponse = Depends(require_admin)):
    """Retrieve all sales inquiries, site visit requests, and brochure downloads (Admin only)."""
    inquiries = DatabaseService.get_all_inquiries()
    return inquiries

@router.post("", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
async def submit_inquiry(inquiry: InquiryCreate):
    """Public customer endpoint to submit site visit requests, price inquiries, and brochure leads."""
    data = inquiry.dict()
    saved = DatabaseService.create_inquiry(data)
    return {
        "success": True,
        "message": "Thank you! Your request has been recorded. Our sales advisor will reach out shortly.",
        "inquiry": saved
    }

@router.patch("/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, req: InquiryStatusUpdate, admin: UserResponse = Depends(require_admin)):
    """Update CRM status of a lead (Admin only)."""
    valid_statuses = ["New", "Contacted", "Site Visit Scheduled", "Deal Closed"]
    if req.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")

    success = DatabaseService.update_inquiry_status(inquiry_id, req.status)
    if not success:
        raise HTTPException(status_code=404, detail=f"Inquiry '{inquiry_id}' not found")
    return {"success": True, "id": inquiry_id, "status": req.status}
