from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from langchain_core.messages import HumanMessage

# Import from our modules
from models import ContactMessage, ChatRequest
from email_service import send_email_to_admin
from agent import agent_graph

app = FastAPI(title="Ajee's Portfolio API (Agentic RAG)", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Agentic AI & Email Backend is operational 🚀"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """Handles AI queries using LangGraph ReAct Agent with Streaming."""
    
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