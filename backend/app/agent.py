from supabase import create_client, Client
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

from config import SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Initialize Embeddings
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small", 
    openai_api_key=OPENAI_API_KEY
)

# Define the retrieval tool using the @tool decorator
@tool
def retrieve_portfolio_info(query: str) -> str:
    """
    Search for relevant documents in Ajee's portfolio knowledge base.
    
    Use this tool when you need information about Ajee's experience, skills, 
    projects, or background. Do NOT use this for general knowledge questions, 
    small talk, or greetings.
    """
    try:
        # 1. Convert the user's text query into a vector embedding manually
        query_embedding = embeddings.embed_query(query)
        
        # 2. Call the Supabase database directly (Bypassing the broken LangChain wrapper!)
        response = supabase.rpc(
            "match_portfolio_documents", 
            {
                "query_embedding": query_embedding,
                "match_count": 4,
                "filter": {}
            }
        ).execute()
        
        # 3. Format the results
        results = response.data
        if not results:
            return "No relevant portfolio documents found."
        
        # The RPC returns a list of dictionaries. 
        # (We check for both 'content' and 'page_content' depending on how your DB table is named)
        return "\n\n---\n\n".join(doc.get("content", doc.get("page_content", "")) for doc in results)
        
    except Exception as e:
        # If Supabase or the network crashes, catch it here!
        print(f"Tool execution error: {e}")
        # Returning a string ensures LangGraph successfully creates a ToolMessage
        return "I experienced a technical issue accessing the database. Please tell the user to try again later or use the contact form."

# Bind the tool to a list
tools = [retrieve_portfolio_info]

# Initialize LLM with streaming enabled
llm = ChatOpenAI(
    model="gpt-4o-mini", 
    temperature=0.3, 
    openai_api_key=OPENAI_API_KEY, 
    streaming=True
)

# System Prompt
system_prompt = SystemMessage(
    content="You are Ajee's highly intelligent and professional portfolio AI assistant. "
    "Use your tools to answer the user's question about Ajee's experience, skills, and projects. "
    "If you don't know the answer, politely say that you don't know and encourage them to use the contact form to reach Ajee directly. "
    "Always highlight Ajee's strengths as a Fullstack Developer and keep your answers concise and engaging."
)

# Initialize Checkpointer for Memory
memory = MemorySaver()

# Build the ReAct Agent Graph
agent_graph = create_react_agent(
    model=llm,
    tools=tools,
    prompt=system_prompt,
    checkpointer=memory
)