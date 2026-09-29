import logging
import requests
import os
import base64

logger = logging.getLogger(__name__)

def send_enquiry_email(enquiry_data: dict):
    # Construct the email body
    property_name = enquiry_data.get('property_name', 'Aira Property')
    html_content = f"""
    <h2>New Enquiry Received</h2>
    <p><strong>Property:</strong> {property_name}</p>
    <p><strong>Name:</strong> {enquiry_data.get('name', 'N/A')}</p>
    <p><strong>Phone:</strong> {enquiry_data.get('phone', 'N/A')}</p>
    <p><strong>Email:</strong> {enquiry_data.get('email', 'N/A')}</p>
    <p><strong>Enquiry Type:</strong> {enquiry_data.get('type', 'General Enquiry')}</p>
    <p><strong>Message:</strong> {enquiry_data.get('message', 'N/A')}</p>
    """

    payload = {
        "from": "onboarding@resend.dev",
        "to": "airainfrahyd@gmail.com",
        "subject": f"New Enquiry: {property_name}",
        "html": html_content
    }

    api_key_b64 = os.getenv("RESEND_API_KEY_B64")
    if not api_key_b64:
        logger.error("RESEND_API_KEY_B64 is missing from environment variables.")
        return
    
    api_key = base64.b64decode(api_key_b64).decode('utf-8')

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    try:
        response = requests.post(
            'https://api.resend.com/emails',
            json=payload,
            headers=headers,
            verify=False
        )
        if response.status_code in [200, 201]:
            logger.info("Enquiry email sent successfully via Resend.")
        else:
            logger.error(f"Resend failed with status {response.status_code}: {response.text}")
    except Exception as e:
        logger.error(f"Exception when calling Resend API: {e}")
