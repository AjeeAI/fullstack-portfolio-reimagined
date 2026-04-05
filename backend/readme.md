Location: /backend/README.md

Portfolio Backend: Agentic RAG Engine
This service powers the portfolio's intelligence, using a sophisticated ReAct agent to retrieve and discuss my professional history.

🧠 AI Agent Logic (LangGraph)
The backend implements an autonomous agent using the LangGraph framework:

The Brain: Uses gpt-4o-mini with a specific system prompt to act as "Ajee's professional assistant".

Retrieval Tool (retrieve_portfolio_info): A custom tool that converts user queries into embeddings via OpenAI's text-embedding-3-small and performs a vector similarity search (RPC) on Supabase.

Conversation Memory: Implements MemorySaver to track thread_id across turns, allowing for follow-up questions.

📡 API Architecture (FastAPI)
The API is designed for robustness and security:

Streaming Response: Uses astream_events (v2) to filter tool execution logs and stream only the final text tokens to the user.

Smart Rate Limiting: Implements a sliding window limit of 10 messages per 10 minutes per IP address to manage OpenAI costs.

CORS Security: Restricts access to your specific production frontend URL.

Contact System: A dedicated /api/messages endpoint that triggers SMTP email alerts for new inquiries.

🛠️ Environment Configuration
Required variables in .env:

OPENAI_API_KEY: For LLM and Embeddings.

SUPABASE_URL & SUPABASE_SERVICE_KEY: For vector database access.

EMAIL_USER & EMAIL_PASS: For the contact form notification service.

🚀 Running the Server

# Navigate to the app directory
cd backend/app

# Install requirements
pip install -r requirements.txt

# Start with Uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000
