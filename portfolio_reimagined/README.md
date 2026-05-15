Location: /portfolio_reimagined/README.md

Portfolio Frontend: Next.js & Framer Motion
The frontend is a reactive, single-page experience designed for maximum engagement and performance. It serves as the primary interface for the Agentic AI assistant.

🚀 Key Technical Features
Agentic Chat Interface: Built to handle real-time token streaming from the FastAPI backend, providing an "LLM-native" user experience.

Dynamic Scroll Tracking: Implements custom useEffect logic to synchronize the browser's URL path with the current viewport section (Hero, About, Projects, etc.).

Backend Keep-Awake: Includes an automated pinging service that hits the /health endpoint every 8 minutes to prevent backend hibernation on hosting services like Render.

Vector-Ready Assets: Uses SVG-based iconography (Lucide, React-Icons) for crisp visuals across all resolutions.

🛠️ Tech Stack
Framework: Next.js 16+.

State & Logic: React 19 with custom hooks for navigation and connectivity.

Styling: Tailwind CSS 4.x using a custom-gradient utility.

Animations: Framer Motion for scroll-triggered transitions and micro-interactions.

Database/Auth: Firebase for lightweight data management.

⚙️ Setup & Installation
Install dependencies:

npm install

Environment Variables: Create a .env.local file:

VITE_API_URL=https://your-backend-api.com
# Include Firebase Configs

Development:

npm run dev
