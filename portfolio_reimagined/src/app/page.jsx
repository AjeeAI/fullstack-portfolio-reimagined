// src/app/page.jsx
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Techstack from '@/components/Techstack'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// 1. Import the tracker and scroll button component
import NavigationHelper from '@/components/NavigationHelper'

// NEW: Import the Chatbot component!
import Chatbot from '@/components/Chatbot' 

export const revalidate = 0;

export default function Home() {
  return (
    // Updated container to use min-h-screen and a transparent background 
    // to let the layout.jsx radial gradient shine through.
    <div className='flex flex-col w-full min-h-screen font-inter selection:bg-purple-500/30'>
      <Header/>
      
      {/* 2. Navigation magic */}
      <NavigationHelper />

      {/* Each section now has the space it deserves */}
      <div id="hero" className="w-full"><Hero/></div>
      
      {/* Use a slight vertical gap (space-y) if you want sections to feel distinct, 
          or keep them tight for a seamless flow */}
      <div className="flex flex-col space-y-20 lg:space-y-32 pb-20">
          <div id="about" className="w-full"><About/></div>
          
          {/* Projects is now a Server Component */}
          <div id="projects" className="w-full"><Projects/></div>
          
          <div id="techstack" className="w-full"><Techstack/></div>
          <div id="journey" className="w-full"><Journey/></div>
          <div id="contact" className="w-full"><Contact/></div>
      </div>

      {/* THE ENDING */}
      <Footer />

      {/* NEW: The AI Chatbot floating above everything else */}
      <Chatbot />
    </div>
  )
}