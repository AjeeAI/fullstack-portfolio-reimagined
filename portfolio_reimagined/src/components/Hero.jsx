'use client'; 

import React from 'react'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, float } from '@/utils/variants';

const Hero = () => {
  return (
    <motion.div 
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      animate="show"
      className='relative w-full min-h-screen flex justify-center items-center px-6 pt-32 pb-12 overflow-hidden z-10'
    >
        
        {/* AMBIENT BACKGROUND GLOW: Soft blue in light mode, purple in dark mode */}
        <motion.div 
          variants={float}
          animate="animate"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-400/20 dark:bg-purple-600/10 blur-[120px] rounded-full -z-10 transition-colors duration-500"
        />

        <div className='p-4 w-full max-w-5xl mx-auto flex flex-col items-center'>
        
          {/* 1. THE NAME */}
          <motion.h1 
            variants={fadeIn("up", 0.2)}
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-[1.1] font-outfit break-words tracking-tight'
          >
            <span className="text-slate-900 dark:text-white transition-colors duration-300">Hi, I'm </span> 
            {/* DUAL GRADIENT: Crisp corporate gradient for light, neon for dark */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 drop-shadow-sm italic transition-all duration-300">
              Ajijolaoluwa
            </span>
          </motion.h1>

          {/* 2. THE TITLE */}
          <motion.h2 
            variants={fadeIn("up", 0.4)}
            className='text-lg sm:text-2xl md:text-3xl text-slate-600 dark:text-gray-300 font-medium text-center mt-6 font-outfit tracking-[0.15em] uppercase transition-colors duration-300'
          >
            Fullstack Developer 
            {/* SEPARATOR: Blue in light, glowing purple in dark */}
            <span className="text-blue-500 dark:text-purple-500 mx-2 drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300">|</span> 
            AI Solutions Builder
          </motion.h2>

          {/* 3. THE STORY */}
          <motion.p 
            variants={fadeIn("up", 0.6)}
            className='text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 mt-6 text-center max-w-2xl leading-relaxed font-light transition-colors duration-300'
          >
            Architecting high-performance web systems and intelligent mobile applications. 
            Powered by <span className="text-blue-600 dark:text-purple-300 font-medium transition-colors duration-300">Next.js</span>, <span className="text-blue-600 dark:text-purple-300 font-medium transition-colors duration-300">Flutter</span>, and <span className="text-blue-600 dark:text-purple-300 font-medium transition-colors duration-300">LLMs</span>.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div 
            variants={fadeIn("up", 0.8)}
            className='flex flex-wrap justify-center mt-10 gap-6 w-full'
          >
              <Link href="/#projects">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // PRIMARY BUTTON: Solid dark slate for light mode, neon gradient for dark mode
                    className='relative group px-10 py-4 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-indigo-600 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all duration-300 border border-transparent dark:border-white/10 shadow-md dark:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  >
                      View Projects
                  </motion.button>
              </Link>

              <Link href="/#contact">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // SECONDARY BUTTON: Crisp white for light mode, glassmorphism for dark mode
                    className='px-10 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none rounded-2xl font-bold transition-all duration-300'
                  >
                      Get in Touch
                  </motion.button>
              </Link>
          </motion.div>

          {/* SOCIAL LINKS */}
          <motion.div 
            variants={fadeIn("up", 1.0)}
            className='flex justify-center mt-14 gap-12 border-t border-slate-200 dark:border-white/5 pt-8 w-full max-w-lg transition-colors duration-300'
          >
              <SocialLink href='https://github.com/AjeeAI' icon={<FaGithub size={26}/>} label="GitHub" />
              <SocialLink href='https://www.linkedin.com/in/ajeeflutterdev/' icon={<FaLinkedin size={26}/>} label="LinkedIn" />
              <SocialLink href='https://x.com/ajeeaidev' icon={<FaXTwitter size={26}/>} label="Twitter" />
          </motion.div>
        </div>
    </motion.div>
  )
}

const SocialLink = ({ href, icon, label }) => (
  <motion.a 
    href={href} 
    target='_blank' 
    rel='noopener noreferrer' 
    whileHover={{ y: -5 }}
    // DUAL STYLING: Shifted from Framer Motion color to Tailwind hover classes
    className='group flex flex-col items-center gap-2 transition-colors duration-300 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#A855F7]'
  >
      {icon}
      <span className='text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300'>{label}</span>
  </motion.a>
);

export default Hero;