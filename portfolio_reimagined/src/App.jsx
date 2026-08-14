'use client'; 

import React, { useEffect } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Techstack from './components/Techstack'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer' // Added Footer
import NavigationHelper from './components/NavigationHelper' // Added NavigationHelper
import Chatbot from './components/Chatbot' // Added Chatbot
import { useLocation } from 'react-router-dom'

// Use environment variable for the API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-render-backend-url.onrender.com"; 

const App = () => {
  // If you are using Next.js, you'd usually use usePathname() from 'next/navigation'
  // But sticking with your current useLocation() logic:
  const { pathname } = useLocation()

  // 1. SCROLL TRACKING LOGIC
  useEffect(() => {
    const id = pathname.replace("/", "") || "hero" 
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

  // 2. KEEP-AWAKE PING LOGIC (Render.com free tier fix)
  useEffect(() => {
    const keepAwake = async () => {
      try {
        await fetch(`${API_URL}/health`); 
        console.log("Backend pinged: Awake 🚀");
      } catch (error) {
        console.error("Backend ping failed:", error);
      }
    };

    keepAwake();
    // 8 minute interval to prevent Render.com spin-down
    const interval = setInterval(keepAwake, 480000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col w-full min-h-screen items-center transition-colors duration-300 font-inter
      /* LIGHT MODE: Clean slate-50 background */
      bg-slate-50 
      /* DARK MODE: Transparent so the layout.jsx radial gradient shows through */
      dark:bg-transparent'
    >
      <Header/>

      {/* Main Content Sections */}
      <main className="w-full">
        <section id="hero"><Hero/></section>
        <section id="about"><About/></section>
        <section id="projects"><Projects/></section>
        <section id="techstack"><Techstack/></section>
        <section id="journey"><Journey/></section>
        <section id="contact"><Contact/></section>
      </main>

      <Footer />

      {/* Persistent UI Elements */}
      <NavigationHelper />
      <Chatbot />
    </div>
  )
}

export default App