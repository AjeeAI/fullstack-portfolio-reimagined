Project Overview
Location: /

Full-Stack AI Portfolio: Agentic RAG Edition
This repository contains a high-performance, AI-integrated portfolio designed to showcase technical expertise through an interactive, autonomous assistant. The system utilizes a modern Next.js frontend and a FastAPI backend driven by a LangGraph-powered ReAct agent.

🏗️ Project Architecture
The project is architected as a decoupled full-stack application:

Frontend (/portfolio_reimagined): A Next.js application leveraging Tailwind CSS for styling and Framer Motion for high-fidelity animations.

Backend (/backend): A Python-based FastAPI server hosting a LangGraph agent that performs RAG (Retrieval-Augmented Generation) against a Supabase vector store.

📂 Repository Structure

├── backend/                # FastAPI & LangGraph AI Service
│   ├── app/
│   │   ├── main.py        # API Endpoints & Rate Limiting logic
│   │   ├── agent.py       # LangGraph ReAct Agent & Tool definitions
│   │   ├── email_service.py # SMTP Integration for Contact Form
│   │   └── requirements.txt # Python dependencies
├── portfolio_reimagined/   # Next.js Frontend Application
│   ├── src/
│   │   ├── components/    # Modular UI sections (Hero, About, etc.)
│   │   ├── lib/           # Firebase & Third-party configurations
│   │   └── App.jsx        # Core routing and keep-awake logic
│   └── package.json       # Node.js dependencies
└── README.md              # Project-wide documentation
