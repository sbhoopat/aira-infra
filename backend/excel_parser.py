import pandas as pd
from typing import List, Dict, Any
import numpy as np
from config import settings
from google_drive_service import fetch_files_from_drive_folder

def clean_value(val):
    if isinstance(val, pd.Series):
        val = val.iloc[0]
    
    # Check for pandas NA first
    if pd.isna(val):
        return None
        
    # Then handle string comparisons safely
    if isinstance(val, str):
        val = val.strip()
        if val.lower() == "nan" or val == "":
            return None
        return val
        
    if isinstance(val, float) and np.isnan(val):
        return None
    return val

def parse_excel_to_properties(file_path: str) -> List[Dict[str, Any]]:
    properties = []
    try:
        # Read all sheets using context manager to ensure file handle is released
        with pd.ExcelFile(file_path) as xls:
            for sheet_name in xls.sheet_names:
                df = pd.read_excel(xls, sheet_name=sheet_name)
                
                # Map columns safely (case-insensitive where possible)
                columns = [str(c).strip().lower() for c in df.columns]
                df.columns = columns
                
                for index, row in df.iterrows():
                    # Try finding relevant columns
                    project_name = row.get("project") or row.get("project name") or row.get("builder - project") or row.get("proposal")
                    if not clean_value(project_name):
                        continue # Skip empty rows
                    
                    location = row.get("location", "")
                    bhk = row.get("bhk") or row.get("type") or row.get("segment", "")
                    sizes = row.get("sizes") or row.get("unit sizes in sft") or row.get("full unit facilities", "")
                    price = row.get("price") or row.get("pricing / cam") or row.get("pricing/cam") or row.get("price(s)", "")
                    possession = row.get("possess") or row.get("possession") or row.get("starting from", "")
                    total_un = row.get("total un") or row.get("sft(total / flr)", "")
                    floors = row.get("floors") or row.get("floor", "")
                    usp = row.get("usp") or row.get("returns", "")
                    google_drive = row.get("google driv") or row.get("google drive", "")
                    lead_regist = row.get("lead regist") or row.get("lead registration") or row.get("lead registr", "")
                    cp_code = row.get("cp code") or row.get("cp code / cp mobile") or row.get("cp code/mobile", "")
                    location_map = row.get("location map", "")
                    
                    g_url = str(clean_value(google_drive)) if clean_value(google_drive) else None
                    drive_files = {"images": [], "documents": []}
                    if g_url and settings.GOOGLE_DRIVE_API_KEY:
                        drive_files = fetch_files_from_drive_folder(g_url, settings.GOOGLE_DRIVE_API_KEY)
                        
                    h_img = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    imgs = [h_img]
                    if drive_files["images"]:
                        h_img = drive_files["images"][0]
                        imgs = drive_files["images"]
                    
                    brochure = None
                    if drive_files["documents"]:
                        brochure = drive_files["documents"][0]
                    
                    property_dict = {
                        "name": str(clean_value(project_name)),
                        "type": str(sheet_name).capitalize(),
                        "category": str(sheet_name).upper(),
                        "location": {"area": str(clean_value(location)) if clean_value(location) else "Unknown", "city": "Hyderabad"},
                        "configurations": [str(clean_value(bhk))] if clean_value(bhk) else [],
                        "area_display": str(clean_value(sizes)) if clean_value(sizes) else None,
                        "price_display": str(clean_value(price)) if clean_value(price) else "On Request",
                        "possession_date": str(clean_value(possession)) if clean_value(possession) else None,
                        "total_units": 0, # Could be parsed from total_un
                        "floors": str(clean_value(floors)) if clean_value(floors) else None,
                        "tagline": str(clean_value(usp)) if clean_value(usp) else None,
                        "hero_image": h_img,
                        "images": imgs,
                        "brochure_url": brochure,
                        "google_drive_url": g_url,
                        "lead_regist": str(clean_value(lead_regist)) if clean_value(lead_regist) else None,
                        "cp_code": str(clean_value(cp_code)) if clean_value(cp_code) else None,
                        "location_map_url": str(clean_value(location_map)) if clean_value(location_map) else None,
                        "status": "Ongoing" # Default
                    }
                    properties.append(property_dict)
    except Exception as e:
        print(f"Error parsing excel: {e}")
        raise e
    
    return properties
