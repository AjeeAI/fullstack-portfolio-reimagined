import React, { useEffect } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Techstack from './components/Techstack'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { useLocation } from 'react-router-dom'

// Replace this with how you handle environment variables in your React setup 
// (e.g., import.meta.env.VITE_API_URL or process.env.REACT_APP_API_URL)
const API_URL = "https://your-render-backend-url.onrender.com"; 

const App = () => {
  const { pathname } = useLocation()

  // 1. Scroll tracking logic
  useEffect(() => {
    const id = pathname.replace("/", "") || "hero"   // default to hero section
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

  // 2. Keep-Awake Ping Logic
  useEffect(() => {
    const keepAwake = async () => {
      try {
        await fetch(`${API_URL}/health`); // Or /health if you explicitly made a /health route
        console.log("Pinged backend to keep it awake 🚀");
      } catch (error) {
        console.error("Failed to ping backend:", error);
      }
    };

    // Call it immediately when the app first loads
    keepAwake();

    // Set up the interval to call it every 8 minutes (8 * 60 * 1000)
    const interval = setInterval(keepAwake, 480000);

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center bg-gradient-custom font-inter'>
      <Header/>

      {/* Give each section an id matching the route */}
      <div id="hero"><Hero/></div>
      <div id="about"><About/></div>
      <div id="projects"><Projects/></div>
      <div id="techstack"><Techstack/></div>
      <div id="journey"><Journey/></div>
      <div id="contact"><Contact/></div>
    </div>
  )
}

export default App