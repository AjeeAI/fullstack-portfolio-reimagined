'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Assuming you have react-icons installed

export default function NavigationHelper() {
  const [showButton, setShowButton] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // ==========================================
    // 1. SCROLL SPY LOGIC (URL Hash Tracking)
    // ==========================================
    const sectionIds = ['hero', 'about', 'projects', 'techstack', 'journey', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section takes up at least 50% of the viewport
          if (entry.isIntersecting) {
            // Update the URL silently without reloading or jumping
            window.history.replaceState(null, '', `/#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 } // 50% visibility trigger
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // ==========================================
    // 2. SCROLL TO TOP LOGIC (Auto-Hide Glassmorphism)
    // ==========================================
    let timeoutId;

    const resetTimer = () => {
      // Clear existing timer
      clearTimeout(timeoutId);
      setIsFading(false);
      
      // Calculate halfway point of the page
      const halfway = (document.documentElement.scrollHeight - window.innerHeight) / 2;

      if (window.scrollY > halfway) {
        setShowButton(true);
        
        // Start the 3-second countdown to disappear
        timeoutId = setTimeout(() => {
          setIsFading(true); // Trigger the fade out animation
          setTimeout(() => setShowButton(false), 300); // Wait for animation to finish before removing from DOM
        }, 3000);
      } else {
        setShowButton(false);
      }
    };

    // Listen for scrolling and mouse movements to reset the 3-second timer
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    return () => {
      // Cleanup on unmount
      observer.disconnect();
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If button shouldn't show, return nothing (null)
  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-[99] p-4 rounded-full 
        /* Glassmorphism Classes */
        bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
        text-purple-400 hover:bg-white/20 hover:text-white hover:scale-110 
        transition-all duration-300 ease-in-out
        ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <FaArrowUp size={20} />
    </button>
  );
}