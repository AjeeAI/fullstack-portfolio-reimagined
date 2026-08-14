'use client'; 

import React, { useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/variants'
import MessageForm from './MessageForm'

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "ajeeaidev@gmail.com";
    
    const handleCopy = async() => {
       try {
         await navigator.clipboard.writeText(email);
         setCopied(true);
         setTimeout(()=> {setCopied(false)}, 2000);
       } catch (error) {
         console.error("Failed to copy:", error);
       }
    }

    // DUAL STYLING: Clean white card for light mode, glassmorphism for dark mode
    const glassCardStyle = "bg-white dark:bg-white/[0.05] backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm dark:shadow-2xl transition-all duration-500";

  return (
    <motion.div 
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className='flex flex-col items-center my-32 gap-5 w-full px-4 sm:px-6 lg:px-8 relative z-10 font-outfit' 
        id='contact'
    >
        
        {/* === SECTION HEADER === */}
        <motion.span 
            variants={fadeIn("up", 0.1)}
            className='text-blue-600 dark:text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-colors duration-300'
        >
            Contact
        </motion.span>
        
        <motion.h1 
            variants={fadeIn("up", 0.2)}
            className='text-slate-900 dark:text-white font-bold text-4xl lg:text-5xl text-center mb-4 italic tracking-tight transition-colors duration-300'
        >
            Get in Touch
        </motion.h1>
        
        <motion.p 
            variants={fadeIn("up", 0.3)}
            className='text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl text-center mb-16 font-light leading-relaxed transition-colors duration-300'
        >
            Feel free to reach out for collaborations, job opportunities or just to say hi. 
            I am always open to discussing <span className="text-blue-600 dark:text-purple-400 font-medium transition-colors duration-300">new projects</span> and innovative ideas.
        </motion.p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl'>
            
            {/* 1. CONTACT INFO SECTION */}
            <motion.div 
                variants={fadeIn("right", 0.4)}
                className='flex flex-col gap-8 w-full'
            >
                
                {/* Email Card */}
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className={`${glassCardStyle} flex flex-col sm:flex-row justify-between items-center gap-6 group transition-all duration-500 hover:border-blue-300 dark:hover:border-purple-500/30`}
                >
                    <div className='flex items-center gap-5'> 
                        {/* ICON BOX: Blue in Light, Purple in Dark */}
                        <div className="p-3 bg-blue-50 dark:bg-purple-500/10 rounded-2xl border border-blue-100 dark:border-purple-500/20 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-purple-500/20 transition-all duration-500">
                            <FaEnvelope size={24} className="text-blue-600 dark:text-purple-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Me</span>
                            <p className='text-slate-900 dark:text-white text-sm sm:text-base font-medium transition-colors duration-300'>{email}</p>
                        </div>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 rounded-xl border transition-all duration-300 font-bold text-sm sm:text-base ${
                            copied 
                            ? 'bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400 shadow-sm dark:shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                            : 'bg-slate-900 dark:bg-white/5 border-transparent dark:border-white/10 text-white hover:bg-slate-800 dark:hover:bg-purple-500/20 dark:hover:border-purple-500/50 dark:hover:text-purple-300'
                        }`} 
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                </motion.div>

                {/* Social Links Card */}
                <div className={`${glassCardStyle} flex flex-col items-center lg:items-start gap-8`}>
                    <p className='text-slate-500 dark:text-slate-400 font-bold tracking-[0.2em] border-l-2 border-blue-600 dark:border-purple-500 pl-4 uppercase text-[10px] transition-colors duration-300'>Find me online</p>

                    <div className='flex justify-center lg:justify-start gap-10 w-full'>
                        <SocialIcon href='https://github.com/AjeeAI' icon={<FaGithub size={32}/>} label="Github" />
                        <SocialIcon href='https://www.linkedin.com/in/ajeeflutterdev/' icon={<FaLinkedin size={32}/>} label="LinkedIn" />
                        <SocialIcon href='https://x.com/ajeeaidev' icon={<FaXTwitter size={32}/>} label="Twitter" />
                    </div>
                </div>
            </motion.div>

            {/* 2. MESSAGE FORM SECTION */}
            <motion.div 
                variants={fadeIn("left", 0.6)}
                className={`${glassCardStyle} w-full hover:border-blue-300 dark:hover:border-purple-500/20 transition-all duration-500`}
            >
                <MessageForm/>
            </motion.div>
        </div>

        {/* Ambient Background Glow */}
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 blur-[150px] rounded-full pointer-events-none transition-colors duration-700
              bg-blue-400/10 dark:bg-purple-600/10"
        />
    </motion.div>
  )
}

const SocialIcon = ({ href, icon, label }) => (
    <motion.a 
        href={href} 
        target='_blank' 
        rel='noopener noreferrer' 
        className='group'
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.9 }}
    >
        <div className='flex flex-col gap-3 justify-center items-center transition-all duration-300'>
            <div className='text-slate-400 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-all duration-300 dark:group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'>
                {icon}
            </div>
            <p className='text-slate-500 text-[10px] uppercase font-bold tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300'>{label}</p>
        </div>
    </motion.a>
);

export default Contact;