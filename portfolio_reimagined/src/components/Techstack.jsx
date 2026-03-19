'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, glassReveal, float } from '@/utils/variants';

const Techstack = () => {

  const skillsData = [
    {
      category: "Frontend",
      icon: "💻",
      technologies: ["Next.js", "React", "HTML", "CSS", "JavaScript", "Tailwind CSS"]
    },
    {
      category: "Backend",
      icon: "⚙️", 
      technologies: ["FastAPI", "Python", "MySQL", "PHP", "Firebase", "Supabase"]
    },
    {
      category: "Mobile",
      icon: "📱",
      technologies: ["Flutter", "Dart", "Flutterflow"]
    },
    {
      category: "AI & Data",
      icon: "🧠",
      technologies: ["LangChain", "LangGraph", "RAG", "Vector DBs"]
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className='flex flex-col items-center my-32 relative z-10'
    >
      {/* SECTION HEADER: Staggered Fade In */}
      <motion.span 
        variants={fadeIn("up", 0.1)}
        className='text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]'
      >
        Expertise
      </motion.span>
      
      <motion.h1 
        variants={fadeIn("up", 0.2)}
        className='text-white font-bold text-4xl lg:text-5xl font-outfit mb-4 italic tracking-tight'
      >
        Tech Stack
      </motion.h1>
      
      <motion.p 
        variants={fadeIn("up", 0.3)}
        className='text-slate-400 text-center mb-16 px-4 max-w-2xl leading-relaxed font-light'
      >
        Building intelligent, scalable systems with a focus on performance, clean architecture, and modern AI integration.
      </motion.p>

      {/* SKILL CARDS GRID */}
      <motion.div 
        variants={staggerContainer(0.1, 0.4)}
        className='flex flex-wrap justify-center items-stretch gap-8 px-4 w-full max-w-7xl'
      >
        {skillsData.map((skillCategory) => (
          <motion.div 
            key={skillCategory.category}
            variants={glassReveal}
            // THE MAGNETIC GLOW EFFECT
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.3)",
              borderColor: "rgba(168, 85, 247, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col w-full sm:w-80 bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 group cursor-default"
          >
            <div className="flex flex-col mb-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 group-hover:rotate-12 transition-transform duration-500">
                  {skillCategory.icon}
                </span>
                <p className='text-white font-bold text-2xl tracking-tight italic'>{skillCategory.category}</p>
              </div>
              
              {/* Animated Accent Line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)]"
              />
            </div>
            
            <div className="flex-grow grid grid-cols-2 gap-3">
              {skillCategory.technologies.map((tech) => (
                <motion.div 
                  key={tech}
                  whileHover={{ scale: 1.05, color: "#D8B4FE" }}
                  className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-3 flex justify-center items-center transition-all duration-300 group/pill"
                >
                  <p className='text-slate-400 font-bold text-[10px] uppercase tracking-wider group-hover/pill:text-white transition-colors text-center'>
                    {tech}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* BACKGROUND AMBIENT GLOW (Animated Float) */}
      <motion.div 
        variants={float}
        animate="animate"
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
      />
    </motion.div>
  )
}

export default Techstack;