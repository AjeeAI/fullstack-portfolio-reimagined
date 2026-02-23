import React, { useEffect } from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Techstack from './components/Techstack'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { useLocation } from 'react-router-dom'

const App = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const id = pathname.replace("/", "") || "hero"   // default to hero section
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

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
