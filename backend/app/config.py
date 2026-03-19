import os
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

ADMIN_EMAIL = os.environ.get("admin_email")
ADMIN_EMAIL_PASSWORD = os.environ.get("admin_email_password")

if not all([SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY]):
    raise ValueError("Missing critical environment variables for AI/DB setup.")