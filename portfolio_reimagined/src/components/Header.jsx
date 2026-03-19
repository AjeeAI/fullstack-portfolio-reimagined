'use client'; 

import React, { useState, useEffect } from 'react'
import { PiDiamondFill } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className='fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-full max-w-4xl xl:max-w-6xl h-12 sm:h-14 flex justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-[100]'
    >
        
        {/* Logo Section */}
        <div className='flex items-center gap-3 sm:gap-4'>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer"
            >
                <PiDiamondFill 
                  size={24} 
                  className="sm:w-[30px] sm:h-[30px] bg-white/20 backdrop-blur-md rounded p-1 border border-white/20 shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
                  color='#A855F7' 
                />
            </motion.div>
            <p className='text-white font-bold text-lg sm:text-xl lg:text-2xl tracking-wide drop-shadow-md'>
                Ajee
            </p>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex justify-center items-center gap-5 lg:gap-8'>
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="relative group px-2 py-1"
              >
                {/* NAV LINK HOVER: Added a subtle scale and color pop */}
                <motion.span 
                  whileHover={{ scale: 1.1, color: "#C084FC" }}
                  whileTap={{ scale: 0.95 }}
                  className={activeSection === link.id ? 'text-purple-400 font-semibold transition-colors block' : 'text-white/80 hover:text-purple-400 transition-colors font-medium block'}
                >
                    {link.name}
                </motion.span>

                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  />
                )}
              </Link>
            ))}

            {/* THE MAIN CTA: Added your specific Glow and Scale props here */}
            <motion.a 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              href='/files/My Dev CV.pdf' 
              target='_blank' 
              download 
              className='text-white text-sm lg:text-md font-bold bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-2.5 rounded-xl border border-white/10 shadow-lg shadow-purple-500/20'
            >
                Download CV
            </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button className='md:hidden text-white' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className='absolute top-full left-0 right-0 mt-3 bg-[#030014]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl md:hidden overflow-hidden'
                >
                    <div className='flex flex-col p-5 space-y-2 items-center'>
                        {navLinks.map((link) => (
                          <Link 
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <motion.span 
                               whileTap={{ scale: 0.9 }}
                               className={activeSection === link.id ? 'text-purple-400 font-bold text-lg py-2 block' : 'text-white/90 text-lg py-2 text-center font-medium block'}
                            >
                                {link.name}
                            </motion.span>
                          </Link>
                        ))}
                        
                        <motion.a 
                          whileTap={{ scale: 0.95 }}
                          href='/files/My Dev CV.pdf' 
                          target='_blank' 
                          download 
                          className='text-white font-bold text-lg py-3 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-xl w-full mt-4 text-center shadow-lg shadow-purple-500/20'
                        >
                            Download CV
                        </motion.a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  )
}

export default Header