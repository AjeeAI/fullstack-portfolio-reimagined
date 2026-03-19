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
      <button disabled className="px-8 py-4 border border-white/5 text-gray-600 rounded-2xl font-bold cursor-not-allowed text-center uppercase text-xs tracking-widest">
        No Preview
      </button>
    );
  }

  return (
    <>
      {/* The Button: Styled as a Secondary Glass Action */}
      <button 
        onClick={() => setActiveVideo(videoLink)}
        className="px-8 py-4 bg-white/5 backdrop-blur-md border border-purple-500/30 text-purple-400 rounded-2xl font-bold hover:bg-purple-500/10 hover:border-purple-500 hover:-translate-y-1 transition-all shadow-lg shadow-purple-900/10 text-center uppercase text-xs tracking-widest"
      >
        Watch Video
      </button>

      {/* The Modal: High-End Cyber Glass */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300" 
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#030014]/90 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-white/10" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button: Switched to Purple Theme */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 flex justify-center items-center bg-white/5 hover:bg-purple-500 text-white rounded-full border border-white/10 transition-all duration-300 shadow-xl" 
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
            <div className="bg-white/5 p-4 flex justify-center items-center">
                <p className="text-[10px] uppercase tracking-[0.5em] text-purple-500 font-bold">
                    Interactive Project Preview
                </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}