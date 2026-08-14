'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer, glassReveal } from '@/utils/variants';

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
}

export default function ProjectsClient({ projects, isHomePage }) {
    const [activeVideo, setActiveVideo] = useState(null);

    // DUAL STYLING
    const glassCardStyle = "bg-white dark:bg-white/[0.07] backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm dark:shadow-2xl transition-all duration-500 group hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-blue-300 dark:hover:border-[rgba(168,85,247,0.4)]";

    if (!projects || projects.length === 0) {
        return (
            <div className="mt-20 flex flex-col items-center justify-center w-full">
                <h1 className="text-slate-900 dark:text-white font-bold text-2xl font-outfit">Selected Projects</h1>
                <p className="text-slate-500 dark:text-gray-400 mt-4">No projects found in the database.</p>
            </div>
        );
    }

    return (
        <>
            <motion.div 
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                whileInView={isHomePage ? "show" : undefined}
                animate={!isHomePage ? "show" : undefined}
                viewport={{ once: true, amount: 0 }} 
                className='mt-24 flex flex-col items-center relative w-full z-10' 
                id="projects"
            >
                <motion.span variants={fadeIn("up", 0.1)} className='text-blue-600 dark:text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-colors duration-300'>
                    My Portfolio
                </motion.span>
                
                <motion.h1 variants={fadeIn("up", 0.2)} className='text-slate-900 dark:text-white font-bold text-4xl lg:text-5xl font-outfit mb-4 italic transition-colors duration-300'>
                    {isHomePage ? "Selected Projects" : "All Projects"}
                </motion.h1>
                
                <motion.p variants={fadeIn("up", 0.3)} className='text-slate-600 dark:text-gray-400 max-w-2xl text-center px-4 leading-relaxed font-light transition-colors duration-300'>
                    {isHomePage 
                        ? "A curated selection of my most impactful work, ranging from AI-powered systems to seamless mobile experiences."
                        : "A comprehensive list of all my technical projects and contributions."}
                </motion.p>

                {/* --- THE UPDATED GRID (3 Per Row) --- */}
                <motion.div 
                    variants={staggerContainer(0.1, 0.4)}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 mt-16'
                >
                    {projects.map((project) => (
                        <motion.div 
                            key={project.id} 
                            variants={glassReveal}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            // REMOVED max-w-[350px] so cards fill the grid column evenly
                            className={`flex flex-col w-full rounded-3xl overflow-hidden ${glassCardStyle}`}
                        >
                            {/* Thumbnail */}
                            <Link href={`/project/${project.id}`} className="w-full h-48 overflow-hidden shrink-0 cursor-pointer block border-b border-slate-100 dark:border-transparent">
                                <img 
                                    src={project.thumbnail} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                            </Link>

                            <div className='flex flex-col p-6 flex-grow'>
                                <Link href={`/project/${project.id}`}>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors cursor-pointer">
                                        {project.name}
                                    </h3>
                                </Link>
                                
                                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed font-light">{project.details}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.stack?.map((stackItem, index) => (
                                        <span key={index} className="bg-slate-100 dark:bg-purple-500/10 border border-slate-200 dark:border-purple-500/20 text-slate-600 dark:text-purple-300 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
                                            {stackItem}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-3">
                                    <div className="flex gap-3">
                                        {project.live_link ? (
                                            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <motion.div 
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className='w-full py-2.5 bg-slate-900 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-500 text-white rounded-xl flex justify-center items-center font-bold text-xs uppercase tracking-widest'
                                                >
                                                    Live Demo
                                                </motion.div>
                                            </a>
                                        ) : (
                                            <div className="flex-1 opacity-50 dark:opacity-30 cursor-not-allowed">
                                                <div className='w-full py-2.5 bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-500 border border-slate-200 dark:border-transparent rounded-xl flex justify-center items-center font-bold text-xs uppercase'>
                                                    Private
                                                </div>
                                            </div>
                                        )}

                                        {project.github_link ? (
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <motion.div 
                                                    whileTap={{ scale: 0.95 }}
                                                    className='w-full py-2.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl flex justify-center items-center font-bold text-xs uppercase tracking-widest'
                                                >
                                                    GitHub
                                                </motion.div>
                                            </a>
                                        ) : (
                                            <div className="flex-1 opacity-50 dark:opacity-30 cursor-not-allowed">
                                                <div className='w-full py-2.5 bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-gray-500 border border-slate-200 dark:border-transparent rounded-xl flex justify-center items-center font-bold text-xs uppercase'>
                                                    Code
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {project.video_link ? (
                                        <motion.button 
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setActiveVideo(project.video_link)} 
                                            className="w-full py-2 border border-slate-200 dark:border-purple-500/30 text-slate-600 dark:text-purple-400 hover:text-blue-600 dark:hover:text-purple-300 hover:border-blue-300 dark:hover:border-purple-500/80 hover:bg-slate-50 dark:hover:bg-purple-500/10 rounded-xl flex justify-center items-center font-bold text-xs uppercase tracking-widest transition-all duration-300"
                                        >
                                            Watch Video
                                        </motion.button>
                                    ) : (
                                        <div className='w-full py-2 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-gray-600 rounded-xl flex justify-center items-center font-bold text-[10px] uppercase cursor-not-allowed'>
                                            No Preview
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {isHomePage && (
                    <motion.div variants={fadeIn("up", 0.5)} className="mt-16 mb-20">
                        <Link href="/projects">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 bg-transparent border-2 border-slate-900 dark:border-purple-500 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-purple-500 dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-full font-bold transition-all duration-300"
                            >
                                View Full Archive
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
                
                {/* (Rest of your component like Final CTA and Modal stays the same...) */}
            </motion.div>

            {/* Video Modal remains unchanged */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 dark:bg-black/90 backdrop-blur-xl p-4" 
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-[#030014]/90 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-slate-200 dark:border-white/10" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex justify-center items-center bg-black/10 hover:bg-black/20 dark:bg-white/5 dark:hover:bg-purple-500 text-slate-900 dark:text-white rounded-full border border-slate-300 dark:border-white/10 transition-all duration-300" 
                                onClick={() => setActiveVideo(null)}
                            >
                                ✕
                            </button>

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

                            <div className="bg-slate-50 dark:bg-white/5 p-4 flex justify-center items-center border-t border-slate-200 dark:border-transparent">
                                <p className="text-[10px] uppercase tracking-[0.5em] text-blue-600 dark:text-purple-500 font-bold">
                                    Interactive Project Preview
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}