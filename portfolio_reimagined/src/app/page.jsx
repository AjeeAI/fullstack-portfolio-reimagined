// src/app/page.jsx
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Techstack from '@/components/Techstack'
import Journey from '@/components/Journey'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center bg-gradient-custom font-inter'>
      <Header/>

      {/* Next.js natively handles hash routing (e.g., yoursite.com/#projects) */}
      <div id="hero"><Hero/></div>
      <div id="about"><About/></div>
      {/* Projects is now a Server Component */}
      <div id="projects"><Projects/></div>
      <div id="techstack"><Techstack/></div>
      <div id="journey"><Journey/></div>
      <div id="contact"><Contact/></div>
    </div>
  )
}