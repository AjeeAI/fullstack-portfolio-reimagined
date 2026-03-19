from pydantic import BaseModel, Field

class ContactMessage(BaseModel):
    name: str = Field(..., example="John Doe")
    email: str = Field(..., example="john@example.com")
    subject: str = Field(..., example="Freelance Work")
    message: str = Field(..., example="I want to hire you!")

class ChatRequest(BaseModel):
    message: str
    # Adding a thread_id so LangGraph can remember distinct user sessions
    thread_id: str = Field(default="default_session", example="user_123")