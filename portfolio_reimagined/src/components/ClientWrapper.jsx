'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './Preloader';

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Only show the loader once per session so it doesn't get annoying
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleFinishLoading = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" finishLoading={handleFinishLoading} />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}