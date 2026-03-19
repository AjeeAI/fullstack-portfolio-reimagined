import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# --- AI & SUPABASE IMPORTS ---
from supabase import create_client, Client
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# 1. Load Environment Variables
load_dotenv()

# --- SETUP AI (SUPABASE + LANGCHAIN) ---
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
openai_key = os.environ.get("OPENAI_API_KEY")

# Initialize Supabase and Local Embeddings
supabase: Client = create_client(supabase_url, supabase_key)
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vector_store = SupabaseVectorStore(
    embedding=embeddings,
    client=supabase,
    table_name="portfolio_documents",
    query_name="match_portfolio_documents"
)

retriever = vector_store.as_retriever(search_kwargs={"k": 4})
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, openai_api_key=openai_key)

system_prompt = (
    "You are Ajee's highly intelligent and professional portfolio AI assistant. "
    "Use the following pieces of retrieved context to answer the user's question about Ajee's experience, skills, and projects. "
    "If you don't know the answer, politely say that you don't know and encourage them to use the contact form to reach Ajee directly. "
    "Always highlight Ajee's strengths as a Fullstack Developer and keep your answers concise and engaging.\n\n"
    "Context:\n{context}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


# --- SETUP EMAIL HELPER ---
def send_email_to_admin(name, email, subject, message):
    admin_email = os.getenv("admin_email")
    admin_password = os.getenv("admin_email_password")  

    if not admin_email or not admin_password:
        print("Email credentials missing in .env. Skipping email.")
        return

    msg = MIMEMultipart()
    msg["From"] = admin_email
    msg["To"] = admin_email
    msg["Subject"] = f"New Portfolio Message: {subject}"

    body = f"A new message has been sent from your portfolio site:\n\nName: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(admin_email, admin_password)
        server.send_message(msg)


# --- FASTAPI APP ---
app = FastAPI(title="Ajee's Portfolio API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- PYDANTIC MODELS ---
class ContactMessage(BaseModel):
    name: str = Field(..., example="John Doe")
    email: str = Field(..., example="john@example.com")
    subject: str = Field(..., example="Freelance Work")
    message: str = Field(..., example="I want to hire you!")

class ChatRequest(BaseModel):
    message: str


# --- ROUTES ---

@app.get("/")
def home():
    return {"status": "AI & Email Backend is operational 🚀"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """Handles AI queries using LangChain and Supabase."""
    try:
        response = rag_chain.invoke({"input": request.message})
        return {"reply": response["answer"]}
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail="Error generating AI response")

@app.post("/api/messages")
def send_message_notification(message: ContactMessage):
    """
    Since Firebase handles storing the message in the database, 
    this endpoint's ONLY job now is to fire off the email alert to you.
    """
    try:
        send_email_to_admin(
            message.name,
            message.email,
            message.subject,
            message.message
        )
        return {"message": "Email alert triggered successfully"}
    except Exception as e:
        print(f"Email Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email alert")