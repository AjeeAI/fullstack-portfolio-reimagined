'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, float, glassReveal } from '@/utils/variants';

// ICONS
import { FaReact, FaJs, FaPython, FaDatabase, FaFire, FaGit } from 'react-icons/fa';
import { SiFlutter, SiDart, SiFastapi, SiNextdotjs, SiVercel, SiLangchain } from 'react-icons/si';

// --- THE ICON MAPPER ---
const getSkillIcon = (name) => {
  const iconMap = {
    "Next.js": <SiNextdotjs className="w-8 h-8 sm:w-10 sm:h-10" />,
    "React": <FaReact className="w-8 h-8 sm:w-10 sm:h-10" />,
    "LangChain": <SiLangchain className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Python": <FaPython className="w-8 h-8 sm:w-10 sm:h-10" />,
    "FastAPI": <SiFastapi className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Flutter": <SiFlutter className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Dart": <SiDart className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Javascript": <FaJs className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Firebase": <FaFire className="w-8 h-8 sm:w-10 sm:h-10" />,
    "MySQL": <FaDatabase className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Vercel": <SiVercel className="w-8 h-8 sm:w-10 sm:h-10" />,
    "Git": <FaGit className="w-8 h-8 sm:w-10 sm:h-10" />
  };
  return iconMap[name] || <FaFire className="w-8 h-8 sm:w-10 sm:h-10" />;
};

// --- THE FORMATTING PARSER (Updated for Dual-Theme) ---
const formatText = (text) => {
  if (!text) return "";
  const highlights = [
    { word: "Ajijolaoluwa Adesoji", classes: "text-slate-900 dark:text-white font-semibold transition-colors duration-300" },
    { word: "Next.js", classes: "text-blue-600 dark:text-purple-400 font-medium transition-colors duration-300" },
    { word: "Flutter", classes: "text-blue-600 dark:text-purple-400 font-medium transition-colors duration-300" },
    { word: "FastAPI", classes: "text-blue-600 dark:text-purple-400 font-medium transition-colors duration-300" }
  ];

  let formatted = [text];

  highlights.forEach(({ word, classes }) => {
    formatted = formatted.flatMap((part) => {
      if (typeof part !== 'string') return part;
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return part.split(regex).map((subPart, i) => 
        subPart.toLowerCase() === word.toLowerCase() 
          ? <span key={i} className={classes}>{subPart}</span> 
          : subPart
      );
    });
  });

  return formatted;
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, "metadata", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching about section:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-blue-600/20 dark:text-purple-500/10 font-outfit italic tracking-widest animate-pulse transition-colors duration-300">
      SYNCING...
    </div>
  );
  
  if (!aboutData) return null;

  return (
    <motion.div 
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className='w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col font-outfit relative z-10 py-20'
    >
        <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 xl:gap-20 w-full'>
            <motion.div variants={fadeIn("right", 0.2)} className='relative group'>
                {/* DUAL STYLING: Blue glow for Light Mode, Purple glow for Dark Mode */}
                <motion.div variants={float} animate="animate" className='absolute -inset-4 bg-blue-400/20 dark:bg-purple-600/20 rounded-full blur-[50px] -z-10 transition-colors duration-500' />
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-purple-600 dark:to-violet-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>
                <img 
                  src={aboutData.profileImage}
                  alt={aboutData.name}
                  className='relative rounded-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-cover border-4 border-white dark:border-white/10 shadow-md dark:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]'
                />
            </motion.div>

            <div className='w-full lg:w-[70%] flex flex-col justify-start items-center lg:items-start text-center lg:text-left'>
                <motion.span variants={fadeIn("up", 0.3)} className='text-blue-600 dark:text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-colors duration-300'>
                    Get to know me
                </motion.span>
                <motion.h1 variants={fadeIn("up", 0.4)} className='text-slate-900 dark:text-white text-4xl lg:text-6xl font-bold mb-6 italic tracking-tight transition-colors duration-300'>
                    About me
                </motion.h1>
                
                <motion.p variants={fadeIn("up", 0.5)} className='text-slate-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light transition-colors duration-300'>
                   {formatText(aboutData.bio1)}
                </motion.p>
                <motion.p variants={fadeIn("up", 0.6)} className='text-slate-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 max-w-2xl font-light transition-colors duration-300'>
                   {formatText(aboutData.bio2)}
                </motion.p>

                <motion.div variants={fadeIn("up", 0.7)}>
                  <Link href="/#contact">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        // DUAL STYLING: Solid slate in Light Mode, Purple gradient in Dark Mode
                        className='px-10 py-4 text-white bg-slate-900 hover:bg-slate-800 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 rounded-2xl font-bold mt-10 shadow-md hover:shadow-lg dark:shadow-lg dark:shadow-purple-600/20 border border-transparent dark:border-white/10 tracking-widest uppercase text-xs transition-all duration-300'
                      >
                          Let's Talk
                      </motion.button>
                  </Link>
                </motion.div>
            </div>
        </div>
        
        <div className='flex flex-col justify-center items-center mt-32'>
            <motion.div variants={fadeIn("up", 0.2)} className='flex flex-col items-center mb-16'>
                <h2 className='text-slate-900 dark:text-white font-bold text-3xl lg:text-5xl mb-3 font-outfit italic transition-colors duration-300'>My Tech Stack</h2>
                {/* DUAL STYLING: Blue center gradient in light mode, Purple gradient in dark mode */}
                <div className='h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 dark:via-purple-500 to-transparent rounded-full shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300'></div>
            </motion.div>

            <motion.div variants={staggerContainer(0.05, 0.2)} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-5xl'>
                {aboutData.skills?.map((skillName) => (
                    <motion.div 
                      key={skillName} 
                      variants={glassReveal} 
                      whileHover={{ scale: 1.05 }} 
                      // DUAL STYLING: Clean white tile for light mode, Cyber glass for dark mode
                      className='flex flex-col w-full aspect-square justify-center items-center gap-4 rounded-3xl transition-all duration-300 group cursor-default
                        bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300
                        dark:bg-white/5 dark:backdrop-blur-2xl dark:border-white/10 dark:shadow-2xl dark:hover:border-[rgba(168,85,247,0.4)] dark:hover:bg-[rgba(255,255,255,0.08)]'
                    >
                        <div className='text-slate-400 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-500 dark:group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'>
                            {getSkillIcon(skillName)}
                        </div>
                        <p className='text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-slate-900 dark:group-hover:text-white transition-colors'>
                            {skillName}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.div>
  )
}

export default About;