'use client';

import React from 'react';
import { PiDiamondFill } from "react-icons/pi";
import { FaArrowUp, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 px-6 relative z-10 overflow-hidden transition-colors duration-300 border-t 
      bg-white/80 border-slate-200 backdrop-blur-md
      dark:bg-[#030014]/50 dark:border-white/5"
    >
      
      {/* Background Glows: Blue in Light, Purple in Dark */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full -z-10 blur-[120px] transition-colors duration-700
        bg-blue-400/5 dark:bg-purple-600/5" 
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* 1. BRANDING & LOGO */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <PiDiamondFill 
              size={20} 
              className="transition-all duration-300 text-blue-600 dark:text-purple-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" 
            />
            <span className="font-bold text-xl tracking-tight transition-colors duration-300 text-slate-900 dark:text-white">
              Ajee.ai
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-slate-500 transition-colors duration-300">
            Architecting Intelligent Systems
          </p>
        </div>

        {/* 2. COPYRIGHT (The Centerpiece) */}
        <div className="text-center">
            <p className="text-sm font-light transition-colors duration-300 text-slate-600 dark:text-slate-400">
              &copy; {new Date().getFullYear()} <span className="font-medium text-slate-900 dark:text-white transition-colors duration-300">Ajijolaoluwa Adesoji</span>.
            </p>
            <p className="text-[10px] uppercase tracking-widest mt-1 text-slate-400 dark:text-slate-600 transition-colors duration-300">
                Built with Next.js & Pure Logic
            </p>
        </div>

        {/* 3. ACTIONS: Back to Top & Socials */}
        <div className="flex items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://github.com/AjeeAI" 
              target="_blank" 
              className="text-slate-500 hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
                <FaGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ajeeflutterdev/" 
              target="_blank" 
              className="text-slate-500 hover:text-blue-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
                <FaLinkedin size={20} />
            </a>
          </div>

          {/* THE GLOW BUTTON: High contrast in light mode, neon glass in dark */}
          <button 
            onClick={scrollToTop}
            className="group relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500
              bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:bg-slate-50
              dark:bg-white/5 dark:border-white/10 dark:hover:border-purple-500/50 dark:hover:bg-purple-500/10 dark:shadow-xl"
            aria-label="Back to Top"
          >
            {/* Dark Mode Glow Only */}
            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block"></div>
            
            <FaArrowUp className="transition-all duration-300 text-slate-400 group-hover:-translate-y-1 group-hover:text-blue-600 dark:group-hover:text-purple-400" />
          </button>
        </div>

      </div>

      {/* Final Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-center transition-colors duration-300">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-blue-500/20 dark:via-purple-500/20 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;