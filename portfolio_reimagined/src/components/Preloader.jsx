'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiDiamondFill } from "react-icons/pi";

const Preloader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const loadingStatuses = [
    "Initializing Core...",
    "Loading Neural Pathways...",
    "Checking Project Modules...",
    "Syncing UI Components...",
    "System Ready."
  ];

  useEffect(() => {
    // Progress bar logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 500); // Small delay after reaching 100%
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Approx 3 seconds total

    // Status text logic
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < loadingStatuses.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#030014] font-outfit"
    >
      <div className="relative flex flex-col items-center gap-8 w-full max-w-xs">
        
        {/* PULSING LOGO */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
            <PiDiamondFill 
                size={60} 
                className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]"
            />
            {/* Inner Glow Aura */}
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full -z-10"></div>
        </motion.div>

        {/* LOADING DATA */}
        <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={statusIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold"
                    >
                        {loadingStatuses[statusIndex]}
                    </motion.p>
                </AnimatePresence>
                <p className="text-[10px] font-mono text-slate-500">{progress}%</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                />
            </div>
        </div>

        {/* BACKGROUND GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
      </div>
      
      {/* CORNER DECORATIONS (Cyber style) */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-purple-500/20 rounded-tl-xl"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-purple-500/20 rounded-br-xl"></div>
    </motion.div>
  );
};

export default Preloader;