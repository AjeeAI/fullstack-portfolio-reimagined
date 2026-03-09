import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const projects = [
  {
    "name": "CNII Sentinel",
    "details": "An automated, AI-driven monitoring system designed to protect critical fiber optic infrastructure in Nigeria. Features a 'Scout & Sniper' OSINT pipeline for precision news scraping, Google Gemini-powered risk analysis with quantitative scoring, and a tactical mobile dashboard with real-time Telegram escalation for high-priority threats.",
    "stack": ["FastAPI", "Flutter", "Google Gemini", "Tavily", "Jina AI", "Firebase", "TiDB"],
    "thumbnail": "/assets/sentinel_img.png", 
    "live_link": "https://ai-sentinel-eye.web.app",
    "github_link": "https://github.com/AjeeAI/cnii-sentinel",
    "video_link": "https://youtu.be/5BynKRQCF1Y?si=vv_8_CoVEzU0AFSs"
  },
  {
    "name": "Bookish",
    "details": "A minimalist, responsive blogging and photography platform built for a journalist. Features a Progressive Web App (PWA) architecture, custom skeleton loaders for smooth UX, and a bespoke admin dashboard for content management.",
    "stack": ["React", "Firebase", "Cloudinary", "Tailwind CSS"],
    "thumbnail": "/assets/bookish.png", 
    "live_link": "https://okiki-bookish.web.app",
    "github_link": "https://github.com/AjeeAI/bookish-frontend.git",
    "video_link": "https://youtu.be/ZsUJEK2XY_g"
  },
  {
    "name": "AwaSabi Language Learning Platform",
    "details": "Top 10 out of 79 entries in the N-Atlas Awarri Hackathon. AI-powered platform teaching indigenous Nigerian languages using the N-Atlas model, featuring gamified learning paths and speech-to-text integration.",
    "stack": ["React", "Python", "N-Atlas Model", "AI/LLM"],
    "thumbnail": "/assets/Awasabi_thumbnail.png", 
    "github_link": "https://github.com/AjeeAI/Awarri-hackathon.git",
    "video_link": "https://youtu.be/fgQDBatOu0Q" 
  },
  {
    "name": "Nigerian Tax Assistant & Expense Tracker",
    "details": "Full-stack financial application for tracking expenses and calculating tax liabilities, featuring a scalable backend and real-time database.",
    "stack": ["React", "Vite", "FastAPI", "MySQL", "Koyeb", "Firebase"],
    "thumbnail": "/assets/taxwise_thumbnail.jpg", 
    "github_link": "https://github.com/AjeeAI/tax_project.git",
    "video_link": "https://youtu.be/KITm38ZG2dw" 
  },
  {
    "name": "Expense Tracker App",
    "details": "A web application for logging daily expenses, tracking spending patterns, and generating summaries.",
    "stack": ["React", "Fastapi", "MySQL"],
    "thumbnail": "/assets/expense.png", 
    "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_javascript-frontenddevelopment-webapp-activity-7385814752393838592-2ARm?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
    "github_link": "https://github.com/AjeeAI/ExpenseTrackerReact.git"
  },
  {
    "name": "E-commerce Mobile App",
    "details": "A mobile shopping platform with integrated product browsing, cart, and checkout features.",
    "stack": ["Flutter", "Firebase", "Stripe"],
    "thumbnail": "/assets/ecommerce.png", 
    "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_flutter-firebase-paystack-activity-7351563226368659460-XaoO?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
    "github_link": "https://github.com/Ajee139/E-Commerce-Application.git"
  },
  {
    "name": "iMusic",
    "details": "A music player app that allows bookmarking of specific sections of a song and allows users to jump to a bookmarked section.",
    "stack": ["Flutter", "Local storage", "Bloc"],
    "thumbnail": "/assets/music.png", 
    "live_link": "https://krazykitchen-live-link.com",
    "github_link": "https://github.com/Ajee139/iMusic.git"
  },
  {
    "name": "Pocket Tasks",
    "details": "A task management app that users to monitor their tasks and allows them to see the priority of each task and the deadline.",
    "stack": ["Flutter", "Local storage", "Hive", "Provider"],
    "thumbnail": "/assets/tasks.png", 
    "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_flutter-mobiledevelopment-opensource-activity-7352370675463913472-fx0i?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
    "github_link": "https://github.com/Ajee139/Pocket-Tasks.git"
  },
  {
    "name": "Youtube Video Downloader",
    "details": "A music player app that allows bookmarking of specific sections of a song and allows users to jump to a bookmarked section.",
    "stack": ["Flutter", "yt-dlp", "Bloc"],
    "thumbnail": "/assets/video_app.png", 
    "live_link": "https://krazykitchen-live-link.com",
    "github_link": "https://github.com/Ajee139/Youtube-downloader.git"
  },
  {
    "name": "Quizzy",
    "details": "A quiz app for learning the bible.",
    "stack": ["Flutter", "Firebase"],
    "thumbnail": "/assets/quizzy.png", 
    "live_link": "https://your-blog-live-link.com",
    "github_link": "https://github.com/Ajee139/Quizzy.git"
  },
  {
    "name": "Portfolio website",
    "details": "A fullstack portfolio website with admin page for checking messages sent through the contact form.",
    "stack": ["React", "FastAPI", "MySQL", "Render", "Firebase Hosting"],
    "thumbnail": "/assets/portfolio.png", 
    "live_link": "https://your-otp-system-live-link.com",
    "github_link": "https://github.com/AjeeAI/fullstack-portfolio-reimagined.git"
  },
  {
    "name": "IoT Multi-Authentication Project",
    "details": "A research-driven application using Mutually Orthogonal Latin Squares (MOLS) for IoT device authentication.",
    "stack": ["Python", "MOLS", "RBIBD", "IoT Security"],
    "thumbnail": "/assets/mols_auth.png", 
    "live_link": "https://your-iot-auth-live-link.com",
    "github_link": "https://github.com/Ajee139/Final-year-Project-Code.git"
  },
  {
    "name": "FastAPI Admin Login System",
    "details": "Backend system for secure admin login with environment-based password management.",
    "stack": ["Python", "FastAPI", "SQLAlchemy", "dotenv"],
    "thumbnail": "/assets/fastapi.png", 
    "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_fastapi-backenddevelopment-python-activity-7389805472972759040-ujnq?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
    "github_link": "https://github.com/AjeeAI/backend-fastapi.git"
  }
];

export const seedDatabase = async () => {
  console.log("Starting Firebase upload...");
  
  try {
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      // Injecting orderId (1, 2, 3...) based on the array position
      await addDoc(collection(db, "projects"), {
        ...project,
        orderId: i + 1,
        createdAt: serverTimestamp()
      });
      console.log(`✅ Uploaded [${i + 1}/${projects.length}]: ${project.name}`);
    }
    console.log("🎉 ALL PROJECTS SEEDED SUCCESSFULLY!");
    alert("Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error uploading to Firebase:", error);
    alert("Error seeding database.");
  }
};