import time
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain_core.messages import HumanMessage

# Import from our modules
from models import ContactMessage, ChatRequest
from email_service import send_email_to_admin
from agent import agent_graph

app = FastAPI(title="Ajee's Portfolio API (Agentic RAG)", version="3.0.0")

# --- CORS SETUP ---
# Restrict access to only your production frontend
ALLOWED_ORIGINS = [
    "https://ajijolaoluwa-adesoji.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROBUST RATE LIMITING SETUP ---
# Store format: { "ip_address": [timestamp1, timestamp2, ...] }
ip_request_records = {}
TIME_WINDOW_SECONDS = 600  # 10 minutes
MAX_MESSAGES_PER_WINDOW = 10  # 10 messages allowed per 10 mins

def get_client_ip(request: Request) -> str:
    """Extracts the real IP address, even when hosted behind proxies like Render."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

@app.get("/")
def home():
    return {"status": "Agentic AI & Email Backend is operational 🚀"}


@app.get("/health")
def get_health():
    """Simple API to check the health of backend"""
    return {
        "status": "Healthy"
    }
@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest, fastapi_req: Request):
    """Handles AI queries using LangGraph ReAct Agent with Streaming."""
    
    # 1. Check Rate Limit based on IP and Time
    client_ip = get_client_ip(fastapi_req)
    current_time = time.time()
    
    # Get the user's request history, or start a new empty list
    user_requests = ip_request_records.get(client_ip, [])
    
    # Clean up old requests (remove timestamps older than 10 minutes ago)
    user_requests = [req_time for req_time in user_requests if current_time - req_time < TIME_WINDOW_SECONDS]
    
    if len(user_requests) >= MAX_MESSAGES_PER_WINDOW:
        # Gracefully stream a rejection message instead of throwing an HTTP error
        async def limit_reached_response():
            yield "To ensure everyone gets a turn, I have a limit of 10 messages every 10 minutes. Please wait a bit, or use the contact form below to get in touch with Ajee directly!"
        return StreamingResponse(limit_reached_response(), media_type="text/plain")
    
    # 2. Increment the count for this IP address
    user_requests.append(current_time)
    ip_request_records[client_ip] = user_requests
    
    async def generate_response():
        try:
            # We must pass a thread_id for the MemorySaver to track the conversation
            config = {"configurable": {"thread_id": request.thread_id}}
            
            # Use astream_events to filter out tool execution logs and only stream final text
            async for event in agent_graph.astream_events(
                {"messages": [HumanMessage(content=request.message)]},
                config=config,
                version="v2"
            ):
                # We only want to yield tokens when the chat model is actively streaming back to the user
                if event["event"] == "on_chat_model_stream":
                    chunk = event["data"]["chunk"]
                    # Make sure it's content and not a tool call request
                    if chunk.content and not chunk.tool_calls:
                        yield chunk.content
                        
        except Exception as e:
            print(f"Chat Error: {e}")
            # Rollback the user's message timestamp if the AI crashes so they don't lose a turn
            if ip_request_records.get(client_ip):
                ip_request_records[client_ip].pop()
            yield "Sorry, I encountered an error while generating the response."

    return StreamingResponse(generate_response(), media_type="text/plain")

@app.post("/api/messages")
def send_message_notification(message: ContactMessage):
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