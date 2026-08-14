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
        // DUAL STYLING: Corporate blue in Light Mode, Neon purple in Dark Mode
        className='text-blue-600 dark:text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-colors duration-300'
      >
        Expertise
      </motion.span>
      
      <motion.h1 
        variants={fadeIn("up", 0.2)}
        className='text-slate-900 dark:text-white font-bold text-4xl lg:text-5xl font-outfit mb-4 italic tracking-tight transition-colors duration-300'
      >
        Tech Stack
      </motion.h1>
      
      <motion.p 
        variants={fadeIn("up", 0.3)}
        className='text-slate-600 dark:text-slate-400 text-center mb-16 px-4 max-w-2xl leading-relaxed font-light transition-colors duration-300'
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
            // THE MAGNETIC GLOW EFFECT (Now handled via Tailwind classes to support dual themes)
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col w-full sm:w-80 rounded-3xl p-8 transition-all duration-300 group cursor-default
              /* Light Mode */
              bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300
              /* Dark Mode */
              dark:bg-white/[0.05] dark:backdrop-blur-3xl dark:border-white/10 dark:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:hover:border-[rgba(168,85,247,0.5)] dark:hover:bg-white/[0.08]"
          >
            <div className="flex flex-col mb-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 group-hover:rotate-12 transition-transform duration-500">
                  {skillCategory.icon}
                </span>
                <p className='text-slate-900 dark:text-white font-bold text-2xl tracking-tight italic transition-colors duration-300'>{skillCategory.category}</p>
              </div>
              
              {/* Animated Accent Line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 rounded-full bg-gradient-to-r shadow-sm dark:shadow-[0_0_12px_rgba(168,85,247,0.6)]
                  from-blue-500 to-indigo-500 dark:from-purple-500 dark:to-indigo-500 transition-colors duration-300"
              />
            </div>
            
            <div className="flex-grow grid grid-cols-2 gap-3">
              {skillCategory.technologies.map((tech) => (
                <motion.div 
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl p-3 flex justify-center items-center transition-all duration-300 group/pill
                    /* Light Mode */
                    bg-slate-50 border border-slate-200 hover:border-blue-300
                    /* Dark Mode */
                    dark:bg-purple-500/5 dark:border-purple-500/10 dark:hover:border-purple-500/30"
                >
                  <p className='font-bold text-[10px] uppercase tracking-wider text-center transition-colors duration-300
                    text-slate-500 group-hover/pill:text-blue-600
                    dark:text-slate-400 dark:group-hover/pill:text-white'
                  >
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
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 blur-[150px] rounded-full pointer-events-none transition-colors duration-700
          bg-blue-400/10 dark:bg-purple-600/10"
      />
    </motion.div>
  )
}

export default Techstack;