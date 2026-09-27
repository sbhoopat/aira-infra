import os
import json
import logging
from typing import List, Dict, Any, Optional
from config import settings
from seed_data import INITIAL_PROPERTIES, INITIAL_LOCATIONS

logger = logging.getLogger("aira.database")

# Local File fallback
DB_FILE = os.path.join(os.path.dirname(__file__), 'local_db.json')

def load_local_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            try:
                return json.load(f)
            except:
                pass
    return {"properties": {}}

def save_local_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

_local_data = load_local_db()
_properties_store: Dict[str, Dict[str, Any]] = _local_data.get("properties", {})
_inquiries_store: List[Dict[str, Any]] = [
    {
        "id": "ENQ-1001",
        "property_id": "aira-skyline",
        "property_name": "Aira Skyline",
        "name": "Vikram Malhotra",
        "phone": "+91 98450 12345",
        "email": "vikram.m@techcorp.com",
        "type": "Site Visit Request",
        "visit_date": "2026-10-02",
        "visit_time": "11:00 AM",
        "message": "Interested in 4 BHK Sky Villa facing lake.",
        "status": "Site Visit Scheduled",
        "source": "Website",
        "created_at": "2026-09-25T14:30:00.000Z"
    },
    {
        "id": "ENQ-1002",
        "property_id": "aira-stone-villas",
        "property_name": "Aira Stone Villas",
        "name": "Sneha Rao",
        "phone": "+91 97110 54321",
        "email": "sneha.rao@gmail.com",
        "type": "Price & Floorplan Enquiry",
        "visit_date": None,
        "visit_time": None,
        "message": "Looking for 4 BHK East facing villa.",
        "status": "New",
        "source": "Website",
        "created_at": "2026-09-26T09:15:00.000Z"
    }
]
_users_store: Dict[str, Dict[str, Any]] = {
    "admin@airainfra.com": {
        "id": "usr-admin-01",
        "email": "admin@airainfra.com",
        "password": "admin123",  # In production, hashed with passlib/bcrypt
        "full_name": "Aira Master Admin",
        "role": "admin"
    }
}

# Supabase Client Initialization
supabase_client = None

def get_supabase():
    global supabase_client
    if supabase_client is not None:
        return supabase_client

    if settings.SUPABASE_KEY and "placeholder" not in settings.SUPABASE_KEY:
        try:
            from supabase import create_client, Client
            supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            logger.info("Connected to Supabase client successfully")
            return supabase_client
        except Exception as e:
            logger.warning(f"Could not connect to Supabase: {e}. Falling back to memory store.")
    return None

class DatabaseService:
    # Properties
    @staticmethod
    def get_all_properties(area: Optional[str] = None, p_type: Optional[str] = None, status: Optional[str] = None, search: Optional[str] = None) -> List[Dict[str, Any]]:
        client = get_supabase()
        if client:
            try:
                query = client.table("properties").select("*")
                if status and status != "All":
                    query = query.eq("status", status)
                if p_type and p_type != "All types":
                    query = query.eq("type", p_type)
                res = query.execute()
                if res.data and len(res.data) > 0:
                    return res.data
            except Exception as e:
                logger.warning(f"Supabase properties query error: {e}")

        # Fallback to in-memory store
        items = list(_properties_store.values())
        if search:
            q = search.lower()
            items = [p for p in items if q in p["name"].lower() or q in p.get("location", {}).get("area", "").lower()]
        if area and area != "All areas":
            items = [p for p in items if p.get("location", {}).get("area", "").lower() == area.lower()]
        if status and status != "All":
            items = [p for p in items if p.get("status", "").lower() == status.lower()]
        if p_type and p_type != "All types":
            items = [p for p in items if p.get("type", "").lower() == p_type.lower()]
        return items

    @staticmethod
    def get_property_by_id(property_id: str) -> Optional[Dict[str, Any]]:
        client = get_supabase()
        if client:
            try:
                res = client.table("properties").select("*").eq("id", property_id).single().execute()
                if res.data:
                    return res.data
            except Exception as e:
                logger.warning(f"Supabase property by id: {e}")

        return _properties_store.get(property_id)

    @staticmethod
    def create_property(prop_data: Dict[str, Any]) -> Dict[str, Any]:
        p_id = prop_data.get("id") or prop_data["name"].lower().replace(" ", "-")
        prop_data["id"] = p_id

        client = get_supabase()
        if client:
            try:
                res = client.table("properties").upsert(prop_data).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                logger.error(f"Supabase create property error: {e}")

        _properties_store[p_id] = prop_data
        
        _local_data["properties"] = _properties_store
        save_local_db(_local_data)
        
        return prop_data

    @staticmethod
    def update_property(property_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        client = get_supabase()
        if client:
            try:
                res = client.table("properties").update(updates).eq("id", property_id).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                logger.error(f"Supabase update property error: {e}")

        if property_id in _properties_store:
            _properties_store[property_id].update(updates)
            
            _local_data["properties"] = _properties_store
            save_local_db(_local_data)
            
            return _properties_store[property_id]
        return None

    @staticmethod
    def delete_property(property_id: str) -> bool:
        client = get_supabase()
        if client:
            try:
                client.table("properties").delete().eq("id", property_id).execute()
            except Exception as e:
                logger.error(f"Supabase delete property error: {e}")

        if property_id in _properties_store:
            del _properties_store[property_id]
            
            _local_data["properties"] = _properties_store
            save_local_db(_local_data)
            
            return True
        return False

    # Inquiries
    @staticmethod
    def get_all_inquiries() -> List[Dict[str, Any]]:
        client = get_supabase()
        if client:
            try:
                res = client.table("inquiries").select("*").order("created_at", desc=True).execute()
                if res.data:
                    return res.data
            except Exception as e:
                logger.warning(f"Supabase inquiries query error: {e}")

        return _inquiries_store

    @staticmethod
    def create_inquiry(inquiry_data: Dict[str, Any]) -> Dict[str, Any]:
        import uuid
        inq_id = str(uuid.uuid4())
        inquiry_data["id"] = inq_id
        inquiry_data["status"] = "New"

        client = get_supabase()
        if client:
            try:
                res = client.table("inquiries").insert(inquiry_data).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                logger.error(f"Supabase insert inquiry error: {e}")

        _inquiries_store.insert(0, inquiry_data)
        return inquiry_data

    @staticmethod
    def update_inquiry_status(inquiry_id: str, status: str) -> bool:
        client = get_supabase()
        if client:
            try:
                client.table("inquiries").update({"status": status}).eq("id", inquiry_id).execute()
            except Exception as e:
                logger.error(f"Supabase update inquiry status: {e}")

        for item in _inquiries_store:
            if item.get("id") == inquiry_id:
                item["status"] = status
                return True
        return False

    # Users
    @staticmethod
    def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
        return _users_store.get(email.lower())

    @staticmethod
    def create_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
        import uuid
        email = user_data["email"].lower()
        user_record = {
            "id": str(uuid.uuid4()),
            "email": email,
            "password": user_data["password"],
            "full_name": user_data.get("full_name", email.split("@")[0]),
            "role": user_data.get("role", "admin")
        }
        _users_store[email] = user_record

        # Also push to Supabase if connected
        client = get_supabase()
        if client:
            try:
                client.auth.sign_up({
                    "email": email,
                    "password": user_data["password"],
                    "options": {
                        "data": {
                            "full_name": user_record["full_name"],
                            "role": user_record["role"]
                        }
                    }
                })
            except Exception as e:
                logger.warning(f"Supabase auth user signup: {e}")

        return user_record

    # Locations
    @staticmethod
    def get_locations() -> List[Dict[str, Any]]:
        client = get_supabase()
        if client:
            try:
                res = client.table("locations").select("*").execute()
                if res.data and len(res.data) > 0:
                    return res.data
            except Exception as e:
                logger.warning(f"Supabase locations error: {e}")
        return INITIAL_LOCATIONS
