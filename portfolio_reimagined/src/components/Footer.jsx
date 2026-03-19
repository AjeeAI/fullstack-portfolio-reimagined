'use client';

import React from 'react';
import { PiDiamondFill } from "react-icons/pi";
import { FaArrowUp, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 px-6 relative z-10 overflow-hidden border-t border-white/5 bg-[#030014]/50 backdrop-blur-md">
      
      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* 1. BRANDING & LOGO */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <PiDiamondFill size={20} className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            <span className="text-white font-bold text-xl tracking-tight">Ajee.ai</span>
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-medium">
            Architecting Intelligent Systems
          </p>
        </div>

        {/* 2. COPYRIGHT (The Centerpiece) */}
        <div className="text-center">
            <p className="text-slate-400 text-sm font-light">
              &copy; {new Date().getFullYear()} <span className="text-white font-medium">Ajijolaoluwa Adesoji</span>.
            </p>
            <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-1">
                Built with Next.js & Pure Logic
            </p>
        </div>

        {/* 3. ACTIONS: Back to Top & Socials */}
        <div className="flex items-center gap-6">
          {/* Social Icons (Muted to keep focus on button) */}
          <div className="flex gap-4">
            <a href="https://github.com/AjeeAI" target="_blank" className="text-slate-500 hover:text-purple-400 transition-colors">
                <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ajeeflutterdev/" target="_blank" className="text-slate-500 hover:text-purple-400 transition-colors">
                <FaLinkedin size={20} />
            </a>
          </div>

          {/* THE GLOW BUTTON */}
          <button 
            onClick={scrollToTop}
            className="group relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-500 shadow-xl"
            aria-label="Back to Top"
          >
            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <FaArrowUp className="text-slate-400 group-hover:text-purple-400 group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </div>

      </div>

      {/* Final Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex justify-center">
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rounded-full"></div>
      </div>
    </footer>
  );
};

export default Footer;