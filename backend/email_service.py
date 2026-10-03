import logging
import resend
import os

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

    api_key = os.getenv("RESEND_API_KEY")
    if not api_key:
        logger.error("RESEND_API_KEY is missing from environment variables.")
        return
    
    resend.api_key = ''

    try:
        email = resend.Emails.send(payload)
        logger.info("Enquiry email sent successfully via Resend SDK.")
    except Exception as e:
        logger.error(f"Exception when calling Resend API: {e}")
