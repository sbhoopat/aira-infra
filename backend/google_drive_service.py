import os
import requests
import logging

logger = logging.getLogger("aira.google_drive")

def extract_folder_id(url: str) -> str:
    import re
    if not url:
        return None
    # match /folders/ID
    match = re.search(r'/folders/([a-zA-Z0-9_-]+)', url)
    if match:
        return match.group(1)
    # match /id=ID
    match = re.search(r'id=([a-zA-Z0-9_-]+)', url)
    if match:
        return match.group(1)
    return None

def fetch_files_from_drive_folder(folder_url: str, api_key: str):
    """
    Fetches files from a public Google Drive folder using the Drive API v3.
    Returns a dict with images (URLs) and documents (URLs).
    """
    folder_id = extract_folder_id(folder_url)
    if not folder_id or not api_key:
        return {"images": [], "documents": []}

    try:
        url = f"https://www.googleapis.com/drive/v3/files"
        params = {
            'q': f"'{folder_id}' in parents and trashed = false",
            'fields': 'files(id, name, mimeType, webViewLink, webContentLink)',
            'key': api_key
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        files = response.json().get('files', [])
        
        images = []
        documents = []
        
        for file in files:
            # We construct a direct download link if possible, or use webContentLink/webViewLink
            file_id = file.get('id')
            mime_type = file.get('mimeType', '')
            # A direct view link for images:
            direct_link = f"https://drive.google.com/uc?export=view&id={file_id}"
            
            if mime_type.startswith('image/'):
                images.append(direct_link)
            elif mime_type == 'application/pdf' or mime_type.startswith('application/vnd.google-apps'):
                documents.append(file.get('webViewLink') or direct_link)
                
        return {"images": images, "documents": documents}
        
    except Exception as e:
        logger.error(f"Failed to fetch Google Drive folder {folder_id}: {e}")
        return {"images": [], "documents": []}
