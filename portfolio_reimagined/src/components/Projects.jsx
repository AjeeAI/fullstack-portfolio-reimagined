import React from 'react'
import dash from "/src/assets/dash_img.png"
import sentinel from "/src/assets/sentinel_img.png"
import bookish from "/src/assets/bookish.png"
import awasabi from "/src/assets/Awasabi_thumbnail.png"
import taxwise from "/src/assets/taxwise_thumbnail.jpg"
import mols_img from "/src/assets/mols_auth.png"
import expense from "/src/assets/expense.png"
import fastapi from "/src/assets/fastapi.png"
import library from "/src/assets/library.png"
import vid from "/src/assets/vid.png"
import music from "/src/assets/music.png"
import ecommerce from "/src/assets/ecommerce.png"
import task from "/src/assets/tasks.png"
import portfolio from "/src/assets/portfolio.png"
import quizzy from "/src/assets/quizzy.png"
import video from "/src/assets/video_app.png"

import { Link } from 'react-router-dom'

const Projects = () => {

  const projects = [
    {
      "name": "CNII Sentinel",
      "details": "An automated, AI-driven monitoring system designed to protect critical fiber optic infrastructure in Nigeria. Features a 'Scout & Sniper' OSINT pipeline for precision news scraping, Google Gemini-powered risk analysis with quantitative scoring, and a tactical mobile dashboard with real-time Telegram escalation for high-priority threats.",
      "stack": ["FastAPI", "Flutter", "Google Gemini", "Tavily", "Jina AI", "Firebase", "TiDB"],
      "thumbnail": sentinel, 
      "live_link": "https://ai-sentinel-eye.web.app",
      "github_link": "https://github.com/AjeeAI/cnii-sentinel",
      "video_link": "https://youtu.be/5BynKRQCF1Y?si=vv_8_CoVEzU0AFSs" 
    },
    {
      "name": "Bookish",
      "details": "A minimalist, responsive blogging and photography platform built for a journalist. Features a Progressive Web App (PWA) architecture, custom skeleton loaders for smooth UX, and a bespoke admin dashboard for content management.",
      "stack": ["React", "Firebase", "Cloudinary", "Tailwind CSS"],
      "thumbnail": bookish, 
      "live_link": "https://okiki-bookish.web.app",
      "github_link": "https://github.com/AjeeAI/bookish-frontend.git" 
    },
    {
      "name": "AwaSabi Language Learning Platform",
      "details": "Top 10 out of 79 entries in the N-Atlas Awarri Hackathon. AI-powered platform teaching indigenous Nigerian languages using the N-Atlas model, featuring gamified learning paths and speech-to-text integration.",
      "stack": ["React", "Python", "N-Atlas Model", "AI/LLM"],
      "thumbnail": awasabi, 
      "live_link": "https://youtu.be/fgQDBatOu0Q",
      "github_link": "https://github.com/AjeeAI/Awarri-hackathon.git"
    },
    {
      "name": "Nigerian Tax Assistant & Expense Tracker",
      "details": "Full-stack financial application for tracking expenses and calculating tax liabilities, featuring a scalable backend and real-time database.",
      "stack": ["React", "Vite", "FastAPI", "MySQL", "Koyeb", "Firebase"],
      "thumbnail": taxwise,
      "live_link": "https://youtu.be/KITm38ZG2dw",
      "github_link": "https://github.com/AjeeAI/tax_project.git"
    },
    {
      "name": "Expense Tracker App",
      "details": "A web application for logging daily expenses, tracking spending patterns, and generating summaries.",
      "stack": ["React", "Fastapi", "MySQL"],
      "thumbnail": expense, 
      "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_javascript-frontenddevelopment-webapp-activity-7385814752393838592-2ARm?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
      "github_link": "https://github.com/AjeeAI/ExpenseTrackerReact.git"
    },
    {
      "name": "E-commerce Mobile App",
      "details": "A mobile shopping platform with integrated product browsing, cart, and checkout features.",
      "stack": ["Flutter", "Firebase", "Stripe"],
      "thumbnail": ecommerce,
      "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_flutter-firebase-paystack-activity-7351563226368659460-XaoO?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
      "github_link": "https://github.com/Ajee139/E-Commerce-Application.git"
    },
    {
      "name": "iMusic",
      "details": "A music player app that allows bookmarking of specific sections of a song and allows users to jump to a bookmarked section.",
      "stack": ["Flutter", "Local storage", "Bloc"],
      "thumbnail": music,
      "live_link": "https://krazykitchen-live-link.com",
      "github_link": "https://github.com/Ajee139/iMusic.git"
    },
    {
      "name": "Pocket Tasks",
      "details": "A task management app that users to monitor their tasks and allows them to see the priority of each task and the deadline.",
      "stack": ["Flutter", "Local storage", "Hive", "Provider"],
      "thumbnail": task,
      "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_flutter-mobiledevelopment-opensource-activity-7352370675463913472-fx0i?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
      "github_link": "https://github.com/Ajee139/Pocket-Tasks.git"
    },
    {
      "name": "Youtube Video Downloader",
      "details": "A music player app that allows bookmarking of specific sections of a song and allows users to jump to a bookmarked section.",
      "stack": ["Flutter", "yt-dlp", "Bloc"],
      "thumbnail": video,
      "live_link": "https://krazykitchen-live-link.com",
      "github_link": "https://github.com/Ajee139/Youtube-downloader.git"
    },
    {
      "name": "Quizzy",
      "details": "A quiz app for learning the bible.",
      "stack": ["Flutter", "Firebase"],
      "thumbnail": quizzy,
      "live_link": "https://your-blog-live-link.com",
      "github_link": "https://github.com/Ajee139/Quizzy.git"
    },
    {
      "name": "Portfolio website",
      "details": "A fullstack portfolio website with admin page for checking messages sent through the contact form.",
      "stack": ["React", "FastAPI", "MySQL", "Render", "Firebase Hosting"],
      "thumbnail": portfolio,
      "live_link": "https://your-otp-system-live-link.com",
      "github_link": "https://github.com/AjeeAI/fullstack-portfolio-reimagined.git"
    },
    {
      "name": "IoT Multi-Authentication Project",
      "details": "A research-driven application using Mutually Orthogonal Latin Squares (MOLS) for IoT device authentication.",
      "stack": ["Python", "MOLS", "RBIBD", "IoT Security"],
      "thumbnail": mols_img,
      "live_link": "https://your-iot-auth-live-link.com",
      "github_link": "https://github.com/Ajee139/Final-year-Project-Code.git"
    },
    {
      "name": "FastAPI Admin Login System",
      "details": "Backend system for secure admin login with environment-based password management.",
      "stack": ["Python", "FastAPI", "SQLAlchemy", "dotenv"],
      "thumbnail": fastapi,
      "live_link": "https://www.linkedin.com/posts/ajeeflutterdev_fastapi-backenddevelopment-python-activity-7389805472972759040-ujnq?utm_source=share&utm_medium=member_desktop&rcm=ACoAACySzbIBLgKnSNogZPm4Wkeu3U49XWabgs8",
      "github_link": "https://github.com/AjeeAI/backend-fastapi.git"
    }
  ]

  return (
    <div className='mt-10 flex flex-col justify-between items-center'>
        <h1 className='text-white font-bold text-2xl font-outfit'>Selected Projects</h1>

        <p className='text-white font-md my-3'>Here is a selection of my recent Projects. Click on the links for a live preview or github code.</p>

        <div className='flex w-full flex-wrap justify-center items-center'>
          {projects.map((project) => (
            <div 
              key={project.name} 
              className="flex flex-col w-full max-w-80 h-[32rem] justify-start items-center bg-gray-800 shadow-md rounded-lg m-4 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full h-48 mb-4 overflow-hidden shrink-0">
                <img 
                  src={project.thumbnail} 
                  alt={project.name} 
                  className="w-full h-full object-cover rounded-t-lg" 
                />
              </div>

              {/* Content Section */}
              <div className='flex flex-col justify-between items-center px-4 text-center flex-grow pb-4 w-full'>
                <div className="w-full">
                  <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-3">{project.details}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {project.stack.map((stackItem, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons - Updated for Conditional Video Demo */}
                {/* Note: I added flex-wrap and reduced the gap to gap-2 so 3 buttons fit nicely! */}
                <div className="flex flex-wrap gap-2 justify-center text-center w-full mb-5">
                  
                  {project.live_link && (
                    <a 
                      href={project.live_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.name}`}
                      className="flex-1 min-w-[100px] max-w-32"
                    >
                      <div className='w-full h-10 bg-purple-500 text-white rounded-lg flex justify-center items-center hover:bg-purple-700 transition-colors font-medium'>
                        Live Demo
                      </div>
                    </a>
                  )}

                  {project.github_link && (
                    <a 
                      href={project.github_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.name}`}
                      className="flex-1 min-w-[100px] max-w-32"
                    >
                      <div className='w-full h-10 bg-white text-black rounded-lg flex justify-center items-center hover:bg-gray-100 transition-colors font-medium'>
                        GitHub
                      </div>
                    </a>
                  )}

                  {/* Conditionally rendered Video Demo Button */}
                  {project.video_link && (
                    <a 
                      href={project.video_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View video demo of ${project.name}`}
                      className="flex-1 min-w-[100px] max-w-32"
                    >
                      <div className='w-full h-10 bg-purple-900/40 text-purple-200 rounded-lg flex justify-center items-center hover:bg-purple-800/60 transition-colors font-medium'>
                        Video
                      </div>
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

      <p className='text-white text-2xl font-bold mt-10 font-outfit'>Interested in collaborating?</p>
      <p className='text-white text-center text-md mt-3 px-3'>Let's build something amazing together. Reach out to discuss your project.</p>

      <Link to="/contact">
        <button className='bg-purple-800 px-6 h-10 rounded-lg my-4 text-white hover:bg-purple-700 transition-colors'>
          Get in Touch
        </button>
      </Link>
    </div>
  )
}

export default Projects