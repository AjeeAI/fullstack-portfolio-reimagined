import os
import base64
import requests
from dotenv import load_dotenv

from supabase import create_client, Client
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_core.documents import Document

# NEW: Import OpenAI Embeddings
from langchain_openai import OpenAIEmbeddings

# 1. Load Environment Variables
load_dotenv()
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
openai_key = os.environ.get("OPENAI_API_KEY") # Make sure this is in your .env!

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# 2. Initialize the OpenAI Embedding Model
print("Loading OpenAI embedding model...")
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small", 
    openai_api_key=openai_key
)

# 3. Setup the Text Splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,     
    chunk_overlap=50,   
    separators=["\n\n", "\n", " ", ""]
)

def ingest_cv(pdf_path: str):
    print(f"\n--- Processing CV: {pdf_path} ---")
    if not os.path.exists(pdf_path):
        print(f"❌ Could not find {pdf_path}.")
        return

    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    chunks = text_splitter.split_documents(documents)
    
    for chunk in chunks:
        chunk.metadata["source_type"] = "CV"
        chunk.metadata["author"] = "Ajijolaoluwa Adesoji"
        
    print(f"Uploading {len(chunks)} CV chunks to Supabase...")
    SupabaseVectorStore.from_documents(
        chunks, embeddings, client=supabase,
        table_name="portfolio_documents", query_name="match_portfolio_documents"
    )
    print("✅ CV successfully embedded and uploaded!")


def ingest_github(username: str):
    print(f"\n--- Processing GitHub for: {username} ---")
    headers = {"Accept": "application/vnd.github.v3+json"}
    github_token = os.environ.get("GITHUB_TOKEN")
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    repos_url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=100"
    response = requests.get(repos_url, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Failed to fetch repos. Status code: {response.status_code}")
        return

    repos = response.json()
    documents = []
    print(f"Found {len(repos)} repositories. Extracting READMEs...")

    for repo in repos:
        repo_name = repo['name']
        description = repo['description'] or "No description provided."
        language = repo['language'] or "Unknown"
        
        readme_url = f"https://api.github.com/repos/{username}/{repo_name}/readme"
        readme_res = requests.get(readme_url, headers=headers)
        
        readme_content = ""
        if readme_res.status_code == 200:
            readme_data = readme_res.json()
            readme_content = base64.b64decode(readme_data['content']).decode('utf-8')
        
        full_text = f"Repository: {repo_name}\nLanguage: {language}\nDescription: {description}\n\nREADME:\n{readme_content}"
        
        doc = Document(
            page_content=full_text,
            metadata={"source_type": "GitHub", "repo_name": repo_name, "author": username}
        )
        documents.append(doc)

    chunks = text_splitter.split_documents(documents)
    print(f"Uploading {len(chunks)} GitHub chunks to Supabase...")
    
    SupabaseVectorStore.from_documents(
        chunks, embeddings, client=supabase,
        table_name="portfolio_documents", query_name="match_portfolio_documents"
    )
    print("✅ GitHub data successfully embedded and uploaded!")


def ingest_linkedin(pdf_path: str):
    print(f"\n--- Processing LinkedIn: {pdf_path} ---")
    if not os.path.exists(pdf_path):
        print(f"❌ Could not find {pdf_path}.")
        return
        
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    chunks = text_splitter.split_documents(documents)
    
    for chunk in chunks:
        chunk.metadata["source_type"] = "LinkedIn"
        chunk.metadata["author"] = "Ajijolaoluwa Adesoji"
        
    print(f"Uploading {len(chunks)} LinkedIn chunks to Supabase...")
    SupabaseVectorStore.from_documents(
        chunks, embeddings, client=supabase,
        table_name="portfolio_documents", query_name="match_portfolio_documents"
    )
    print("✅ LinkedIn data successfully embedded and uploaded!")


# --- MAIN EXECUTION BLOCK ---
if __name__ == "__main__":
    print("🚀 Starting Portfolio Data Ingestion (Powered by OpenAI)...\n")
    
    # 1. Ingest CV
    ingest_cv("CV.pdf")
    
    # 2. Ingest GitHub
    ingest_github("AjeeAI")
    
    # 3. Ingest LinkedIn
    ingest_linkedin("linkedin_profile.pdf")
    
    print("\n🎉 All data ingested successfully!")