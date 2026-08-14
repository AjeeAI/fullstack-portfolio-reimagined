'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PiDiamondFill } from "react-icons/pi";

const Preloader = ({ finishLoading }) => {

  useEffect(() => {
    // Cut down the artificial wait time from 3+ seconds to just 1 second.
    // Respects the user's time and shows off how fast your Next.js app actually is!
    const timer = setTimeout(finishLoading, 1000);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -30, // Subtle slide up instead of a drastic jump
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      // DUAL STYLING: Crisp white for Light Mode, Deep dark for Dark Mode
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030014] transition-colors duration-300 font-inter"
    >
      <motion.div
        animate={{ 
          scale: [0.95, 1],
          opacity: [0, 1]
        }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* LOGO */}
        <PiDiamondFill 
            size={48} 
            className="text-blue-600 dark:text-purple-500 drop-shadow-sm dark:drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-colors duration-300"
        />

        {/* ELEGANT, MINIMALIST LOADER (No fake text) */}
        <div className="w-32 h-[2px] bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                // DUAL STYLING: Corporate blue to neon purple
                className="h-full bg-blue-600 dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-400"
            />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;