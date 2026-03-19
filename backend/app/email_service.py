import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD

def send_email_to_admin(name: str, email: str, subject: str, message: str):
    if not ADMIN_EMAIL or not ADMIN_EMAIL_PASSWORD:
        print("Email credentials missing in .env. Skipping email.")
        return

    msg = MIMEMultipart()
    msg["From"] = ADMIN_EMAIL
    msg["To"] = ADMIN_EMAIL
    msg["Subject"] = f"New Portfolio Message: {subject}"

    body = f"A new message has been sent from your portfolio site:\n\nName: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD)
        server.send_message(msg)