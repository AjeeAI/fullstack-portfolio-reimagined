from supabase import create_client, Client
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

from config import SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Initialize Embeddings & Vector Store
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small", 
    openai_api_key=OPENAI_API_KEY
)

vector_store = SupabaseVectorStore(
    embedding=embeddings,
    client=supabase,
    table_name="portfolio_documents",
    query_name="match_portfolio_documents"
)

retriever = vector_store.as_retriever(search_kwargs={"k": 4})

# Define the retrieval tool using the @tool decorator
@tool
def retrieve_portfolio_info(query: str) -> str:
    """
    Search for relevant documents in Ajee's portfolio knowledge base.
    
    Use this tool when you need information about Ajee's experience, skills, 
    projects, or background. Do NOT use this for general knowledge questions, 
    small talk, or greetings.
    """
    results = retriever.invoke(query)
    if not results:
        return "No relevant portfolio documents found."
    
    return "\n\n---\n\n".join(doc.page_content for doc in results)

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