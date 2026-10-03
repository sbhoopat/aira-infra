import os
import logging
from typing import List, Dict, Any, Optional
from config import settings
from seed_data import INITIAL_PROPERTIES, INITIAL_LOCATIONS

logger = logging.getLogger("aira.database")

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
            logger.error(f"Could not connect to Supabase: {e}")
            raise RuntimeError(f"Database connection failed: {e}")
            
    raise RuntimeError("SUPABASE_KEY is missing or invalid. Please configure your environment variables.")

class DatabaseService:
    # Properties
    @staticmethod
    def get_all_properties(area: Optional[str] = None, p_type: Optional[str] = None, status: Optional[str] = None, search: Optional[str] = None) -> List[Dict[str, Any]]:
        client = get_supabase()
        
        query = client.table("properties").select("*")
        if status and status != "All":
            query = query.eq("status", status)
        if p_type and p_type != "All types":
            query = query.eq("type", p_type)
            
        # Supabase doesn't have a simple ILIKE for JSON fields easily through the python client, 
        # so for complex searches we fetch all and filter in memory if needed, or use textSearch.
        # For this implementation, we'll fetch all matching the primary filters and do text search in memory.
        res = query.execute()
        items = res.data if res.data else []
        
        if search:
            q = search.lower()
            items = [p for p in items if q in p.get("name", "").lower() or q in p.get("location", {}).get("area", "").lower()]
        
        if area and area != "All areas":
            items = [p for p in items if p.get("location", {}).get("area", "").lower() == area.lower()]
            
        return items

    @staticmethod
    def get_property_by_id(property_id: str) -> Optional[Dict[str, Any]]:
        client = get_supabase()
        res = client.table("properties").select("*").eq("id", property_id).execute()
        if res.data and len(res.data) > 0:
            return res.data[0]
        return None

    @staticmethod
    def create_property(prop_data: Dict[str, Any]) -> Dict[str, Any]:
        p_id = prop_data.get("id") or prop_data["name"].lower().replace(" ", "-")
        prop_data["id"] = p_id
        
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc).isoformat()
        prop_data["created_at"] = now
        prop_data["updated_at"] = now

        client = get_supabase()
        res = client.table("properties").upsert(prop_data).execute()
        if res.data:
            return res.data[0]
        
        raise RuntimeError("Failed to create property in Supabase")

    @staticmethod
    def update_property(property_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        client = get_supabase()
        
        from datetime import datetime, timezone
        updates["updated_at"] = datetime.now(timezone.utc).isoformat()
        
        res = client.table("properties").update(updates).eq("id", property_id).execute()
        if res.data and len(res.data) > 0:
            return res.data[0]
        return None

    @staticmethod
    def delete_property(property_id: str) -> bool:
        client = get_supabase()
        res = client.table("properties").delete().eq("id", property_id).execute()
        # Supabase python client returns data of deleted rows if they existed
        return bool(res.data)

    # Inquiries
    @staticmethod
    def get_all_inquiries() -> List[Dict[str, Any]]:
        client = get_supabase()
        res = client.table("inquiries").select("*").order("created_at", desc=True).execute()
        return res.data if res.data else []

    @staticmethod
    def create_inquiry(inquiry_data: Dict[str, Any]) -> Dict[str, Any]:
        import uuid
        inq_id = str(uuid.uuid4())
        inquiry_data["id"] = inq_id
        inquiry_data["status"] = "New"
        
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc).isoformat()
        inquiry_data["created_at"] = now
        inquiry_data["updated_at"] = now

        client = get_supabase()
        res = client.table("inquiries").insert(inquiry_data).execute()
        if res.data:
            return res.data[0]
            
        raise RuntimeError("Failed to insert inquiry into Supabase")

    @staticmethod
    def update_inquiry_status(inquiry_id: str, status: str) -> bool:
        client = get_supabase()
        
        from datetime import datetime, timezone
        updated_at = datetime.now(timezone.utc).isoformat()
        
        res = client.table("inquiries").update({"status": status, "updated_at": updated_at}).eq("id", inquiry_id).execute()
        return bool(res.data)

    # Users
    @staticmethod
    def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
        client = get_supabase()
        # Fetch user details (Assuming you have a profiles or users table with emails)
        # Note: Depending on your Supabase setup, you might query a custom 'users' table 
        # or use the admin auth API. For this structure, we assume a custom users table or similar logic.
        res = client.table("profiles").select("*").eq("email", email.lower()).execute()
        if res.data and len(res.data) > 0:
            return res.data[0]
        return None

    @staticmethod
    def create_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
        email = user_data["email"].lower()
        client = get_supabase()
        
        # Sign up in Supabase Auth
        auth_res = client.auth.sign_up({
            "email": email,
            "password": user_data["password"],
            "options": {
                "data": {
                    "full_name": user_data.get("full_name", email.split("@")[0]),
                    "role": user_data.get("role", "admin")
                }
            }
        })
        
        return {
            "id": auth_res.user.id if auth_res.user else None,
            "email": email,
            "full_name": user_data.get("full_name", email.split("@")[0]),
            "role": user_data.get("role", "admin")
        }

    # Locations
    @staticmethod
    def get_locations() -> List[Dict[str, Any]]:
        client = get_supabase()
        res = client.table("locations").select("*").execute()
        if res.data and len(res.data) > 0:
            return res.data
        return INITIAL_LOCATIONS
