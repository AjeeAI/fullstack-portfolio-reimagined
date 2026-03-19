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

    // CYBER-PURPLE GLASSMORPHISM STYLE
    const glassCardStyle = "bg-white/[0.07] backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 group";

    if (!projects || projects.length === 0) {
        return (
            <div className="mt-20 flex flex-col items-center justify-center w-full">
                <h1 className="text-white font-bold text-2xl font-outfit">Selected Projects</h1>
                <p className="text-gray-400 mt-4">No projects found in the database.</p>
            </div>
        );
    }

    return (
        <>
            <motion.div 
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                // THE MOBILE FIX: Trigger on scroll for home, trigger instantly for full archive
                whileInView={isHomePage ? "show" : undefined}
                animate={!isHomePage ? "show" : undefined}
                viewport={{ once: true, amount: 0 }} 
                className='mt-24 flex flex-col justify-between items-center relative w-full z-10' 
                id="projects"
            >
                <motion.span variants={fadeIn("up", 0.1)} className='text-purple-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]'>
                    My Portfolio
                </motion.span>
                
                <motion.h1 variants={fadeIn("up", 0.2)} className='text-white font-bold text-4xl lg:text-5xl font-outfit mb-4 italic'>
                    {isHomePage ? "Selected Projects" : "All Projects"}
                </motion.h1>
                
                <motion.p variants={fadeIn("up", 0.3)} className='text-gray-400 max-w-2xl text-center px-4 leading-relaxed font-light'>
                    {isHomePage 
                        ? "A curated selection of my most impactful work, ranging from AI-powered systems to seamless mobile experiences."
                        : "A comprehensive list of all my technical projects and contributions."}
                </motion.p>

                {/* PROJECT GRID */}
                <motion.div 
                    variants={staggerContainer(0.1, 0.4)}
                    className='flex w-full flex-wrap justify-center items-stretch px-4 mt-16 gap-8'
                >
                    {projects.map((project, index) => (
                        <motion.div 
                            key={project.id} 
                            variants={glassReveal}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.3)",
                                borderColor: "rgba(168, 85, 247, 0.4)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex flex-col w-full max-w-[350px] rounded-3xl overflow-hidden ${glassCardStyle}`}
                        >
                            {/* Thumbnail */}
                            <Link href={`/project/${project.id}`} className="w-full h-48 overflow-hidden shrink-0 cursor-pointer block">
                                <img 
                                    src={project.thumbnail} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                            </Link>

                            <div className='flex flex-col p-6 flex-grow'>
                                <Link href={`/project/${project.id}`}>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors cursor-pointer">
                                        {project.name}
                                    </h3>
                                </Link>
                                
                                <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed font-light">{project.details}</p>
                                
                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.stack?.map((stackItem, index) => (
                                        <span key={index} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                            {stackItem}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-3">
                                    <div className="flex gap-3">
                                        {/* LIVE DEMO (Purple Gradient) */}
                                        {project.live_link ? (
                                            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <motion.div 
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className='w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl flex justify-center items-center hover:shadow-lg hover:shadow-purple-600/20 transition-all font-bold text-xs uppercase tracking-widest border border-white/10'
                                                >
                                                    Live Demo
                                                </motion.div>
                                            </a>
                                        ) : (
                                            <div className="flex-1 opacity-30 cursor-not-allowed">
                                                <div className='w-full py-2.5 bg-gray-800 text-gray-500 rounded-xl flex justify-center items-center font-bold text-xs uppercase'>
                                                    Private
                                                </div>
                                            </div>
                                        )}

                                        {/* GITHUB (Glass style) */}
                                        {project.github_link ? (
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <motion.div 
                                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className='w-full py-2.5 bg-white/5 text-white border border-white/10 rounded-xl flex justify-center items-center transition-all font-bold text-xs uppercase tracking-widest'
                                                >
                                                    GitHub
                                                </motion.div>
                                            </a>
                                        ) : (
                                            <div className="flex-1 opacity-30 cursor-not-allowed">
                                                <div className='w-full py-2.5 bg-gray-800 text-gray-500 rounded-xl flex justify-center items-center font-bold text-xs uppercase'>
                                                    Code
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* VIDEO BUTTON */}
                                    {project.video_link ? (
                                        <motion.button 
                                            whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(168, 85, 247, 0.8)" }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setActiveVideo(project.video_link)} 
                                            className="w-full py-2 border border-purple-500/30 text-purple-400 rounded-xl flex justify-center items-center transition-all font-bold text-xs uppercase tracking-widest"
                                        >
                                            Watch Video
                                        </motion.button>
                                    ) : (
                                        <div className='w-full py-2 border border-white/5 text-gray-600 rounded-xl flex justify-center items-center font-bold text-[10px] uppercase cursor-not-allowed'>
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
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)", backgroundColor: "rgba(168, 85, 247, 1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 bg-transparent border-2 border-purple-500 text-white rounded-full font-bold transition-all duration-300"
                            >
                                View Full Archive
                            </motion.button>
                        </Link>
                    </motion.div>
                )}

                {/* Final CTA Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-20 py-24 w-full flex flex-col items-center bg-white/[0.02] border-y border-white/5 backdrop-blur-sm"
                >
                    <p className='text-white text-3xl font-bold font-outfit text-center'>Ready to build something intelligent?</p>
                    <p className='text-gray-400 text-center text-lg mt-3 px-3 max-w-xl font-light'>I'm currently available for freelance projects and high-impact full-time roles.</p>

                    <Link href="/#contact">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className='mt-10 bg-gradient-to-r from-purple-600 to-indigo-500 px-10 py-4 rounded-full text-white font-bold transition-all duration-300 border border-white/10 shadow-lg shadow-purple-600/20'
                        >
                            Start a Conversation
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* VIDEO MODAL */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" 
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#030014]/90 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-white/10" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex justify-center items-center bg-white/5 hover:bg-purple-500 text-white rounded-full border border-white/10 transition-all duration-300" 
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

                            <div className="bg-white/5 p-4 flex justify-center items-center">
                                <p className="text-[10px] uppercase tracking-[0.5em] text-purple-500 font-bold">
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