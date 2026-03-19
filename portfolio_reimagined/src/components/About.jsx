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

// --- THE FORMATTING PARSER ---
const formatText = (text) => {
  if (!text) return "";
  const highlights = [
    { word: "Ajijolaoluwa Adesoji", classes: "text-white font-semibold" },
    { word: "Next.js", classes: "text-purple-400 font-medium" },
    { word: "Flutter", classes: "text-purple-400 font-medium" },
    { word: "FastAPI", classes: "text-purple-400 font-medium" }
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
    <div className="h-96 flex items-center justify-center text-purple-500/10 font-outfit italic tracking-widest animate-pulse">
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
                <motion.div variants={float} animate="animate" className='absolute -inset-4 bg-purple-600/20 rounded-full blur-[50px] -z-10' />
                <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>
                <img 
                  src={aboutData.profileImage}
                  alt={aboutData.name}
                  className='relative rounded-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-cover border-4 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]'
                />
            </motion.div>

            <div className='w-full lg:w-[70%] flex flex-col justify-start items-center lg:items-start text-center lg:text-left'>
                <motion.span variants={fadeIn("up", 0.3)} className='text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]'>
                    Get to know me
                </motion.span>
                <motion.h1 variants={fadeIn("up", 0.4)} className='text-white text-4xl lg:text-6xl font-bold mb-6 italic tracking-tight'>
                    About me
                </motion.h1>
                
                <motion.p variants={fadeIn("up", 0.5)} className='text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light'>
                   {formatText(aboutData.bio1)}
                </motion.p>
                <motion.p variants={fadeIn("up", 0.6)} className='text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 max-w-2xl font-light'>
                   {formatText(aboutData.bio2)}
                </motion.p>

                <motion.div variants={fadeIn("up", 0.7)}>
                  <Link href="/#contact">
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className='px-10 py-4 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold mt-10 shadow-lg shadow-purple-600/20 border border-white/10 tracking-widest uppercase text-xs'
                      >
                          Let's Talk
                      </motion.button>
                  </Link>
                </motion.div>
            </div>
        </div>
        
        <div className='flex flex-col justify-center items-center mt-32'>
            <motion.div variants={fadeIn("up", 0.2)} className='flex flex-col items-center mb-16'>
                <h2 className='text-white font-bold text-3xl lg:text-5xl mb-3 font-outfit italic'>My Tech Stack</h2>
                <div className='h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]'></div>
            </motion.div>

            <motion.div variants={staggerContainer(0.05, 0.2)} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full max-w-5xl'>
                {aboutData.skills?.map((skillName) => (
                    <motion.div key={skillName} variants={glassReveal} whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.08)" }} className='flex flex-col w-full aspect-square justify-center items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl transition-all duration-300 group shadow-2xl cursor-default'>
                        <div className='text-slate-400 group-hover:text-purple-400 transition-colors duration-500 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'>{getSkillIcon(skillName)}</div>
                        <p className='text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors'>{skillName}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.div>
  )
}

export default About;