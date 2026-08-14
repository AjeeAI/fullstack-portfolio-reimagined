'use client';

import React, { useState } from 'react';

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URL(url).searchParams;
    const videoId = urlParams.get('v');
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  return url;
};

export default function ProjectVideoBtn({ videoLink }) {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!videoLink) {
    return (
      // DUAL STYLING: Disabled state
      <button disabled className="px-8 py-4 border rounded-2xl font-bold cursor-not-allowed text-center uppercase text-xs tracking-widest border-slate-200 dark:border-white/5 text-slate-400 dark:text-gray-600 transition-colors duration-300">
        No Preview
      </button>
    );
  }

  return (
    <>
      {/* The Button: Solid Corporate in Light Mode, Cyber Glass in Dark Mode */}
      <button 
        onClick={() => setActiveVideo(videoLink)}
        className="px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest text-center transition-all hover:-translate-y-1
          /* Light Mode */
          bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-slate-50 shadow-sm
          /* Dark Mode */
          dark:bg-white/5 dark:backdrop-blur-md dark:border-purple-500/30 dark:text-purple-400 dark:hover:bg-purple-500/10 dark:hover:border-purple-500 dark:shadow-lg dark:shadow-purple-900/10"
      >
        Watch Video
      </button>

      {/* The Modal Overlay */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 bg-slate-900/80 dark:bg-black/90 backdrop-blur-sm dark:backdrop-blur-md transition-colors" 
          onClick={() => setActiveVideo(null)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden backdrop-blur-3xl bg-white dark:bg-[#030014]/90 shadow-2xl dark:shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-slate-200 dark:border-white/10 transition-colors duration-300" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button: Dark gray hover in Light Mode, Purple in Dark Mode */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 flex justify-center items-center rounded-full transition-all duration-300 shadow-md dark:shadow-xl
                bg-black/10 hover:bg-black/20 text-slate-900 border border-slate-300
                dark:bg-white/5 dark:hover:bg-purple-500 dark:text-white dark:border-white/10" 
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            {/* Video Container */}
            <div className="relative pt-[56.25%] w-full">
              <iframe 
                className="absolute top-0 left-0 w-full h-full" 
                src={getEmbedUrl(activeVideo)} 
                title="Project Video Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Bottom Modal Branding */}
            <div className="p-4 flex justify-center items-center bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-transparent transition-colors duration-300">
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-blue-600 dark:text-purple-500 transition-colors duration-300">
                    Interactive Project Preview
                </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}