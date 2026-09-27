from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

# User & Auth Models
class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserCreateRequest(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "admin"  # "admin" | "staff" | "user"

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    role: str = "admin"
    created_at: Optional[datetime] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Property Location Model
class Coordinates(BaseModel):
    lat: float
    lng: float

class PropertyLocation(BaseModel):
    area: str
    city: str = "Hyderabad"
    fullAddress: Optional[str] = None
    pincode: Optional[str] = None
    coordinates: Optional[Coordinates] = None

# Floor Plan Model
class FloorPlan(BaseModel):
    bhk: str
    superBuiltUpArea: str
    carpetArea: Optional[str] = None
    facing: Optional[str] = None
    price: Optional[str] = None
    bathrooms: Optional[int] = 3
    balconies: Optional[int] = 2
    image: Optional[str] = None

# Property Create/Update/Response Models
class PropertyBase(BaseModel):
    name: str
    tagline: Optional[str] = None
    type: str = "Apartments"
    category: Optional[str] = "APARTMENTS"
    status: str = "Ongoing"
    status_badge: Optional[str] = "Ongoing"
    rera_approved: bool = True
    rera_number: Optional[str] = None
    featured: bool = False
    price_display: str
    price_min: int = 0
    price_max: int = 0
    price_per_sqft: Optional[int] = 0
    location: Dict[str, Any] = {}
    configurations: List[str] = []
    bhk_display: Optional[str] = None
    area_display: Optional[str] = None
    area_min: Optional[int] = 0
    area_max: Optional[int] = 0
    possession_date: Optional[str] = None
    total_units: Optional[int] = 0
    towers: Optional[int] = 1
    floors: Optional[str] = None
    land_area: Optional[str] = None
    open_space_percentage: Optional[str] = None
    developer: str = "Aira Infra Developers Ltd."
    hero_image: str
    images: List[str] = []
    video_url: Optional[str] = None
    brochure_url: Optional[str] = None
    description: Optional[str] = None
    highlights: List[str] = []
    amenities: List[str] = []
    floor_plans: List[Dict[str, Any]] = []
    specifications: Dict[str, Any] = {}
    nearby_landmarks: List[Dict[str, Any]] = []

class PropertyCreate(PropertyBase):
    id: Optional[str] = None

class PropertyUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None
    price_display: Optional[str] = None
    price_min: Optional[int] = None
    price_max: Optional[int] = None
    price_per_sqft: Optional[int] = None
    location: Optional[Dict[str, Any]] = None
    configurations: Optional[List[str]] = None
    hero_image: Optional[str] = None
    images: Optional[List[str]] = None
    video_url: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
    amenities: Optional[List[str]] = None
    featured: Optional[bool] = None

class PropertyResponse(PropertyBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# Inquiry / Lead Models
class InquiryCreate(BaseModel):
    property_id: Optional[str] = None
    property_name: str = "General Enquiry"
    name: str
    phone: str
    email: Optional[str] = None
    type: str = "General Enquiry"
    visit_date: Optional[str] = None
    visit_time: Optional[str] = None
    message: Optional[str] = None
    source: str = "Website"

class InquiryStatusUpdate(BaseModel):
    status: str  # 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Deal Closed'

class InquiryResponse(InquiryCreate):
    id: str
    status: str = "New"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# Location Model
class LocationResponse(BaseModel):
    id: str
    name: str
    sub_title: Optional[str] = None
    average_price: Optional[str] = None
    growth_rate: Optional[str] = None
    active_projects: Optional[int] = 0
    description: Optional[str] = None
    image: Optional[str] = None
    tags: List[str] = []

# Testimonial Model
class TestimonialResponse(BaseModel):
    id: str
    name: str
    role: Optional[str] = None
    project: Optional[str] = None
    avatar: Optional[str] = None
    rating: int = 5
    quote: str
    verified_buyer: bool = True
