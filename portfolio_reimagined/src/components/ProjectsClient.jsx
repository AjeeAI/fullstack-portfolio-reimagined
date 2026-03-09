'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';

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

// Added 'isHomePage' prop to control the "View All" button
export default function ProjectsClient({ projects, isHomePage }) {
    const [activeVideo, setActiveVideo] = useState(null);

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
            <div className='mt-10 flex flex-col justify-between items-center relative w-full' id="projects">
                {/* Headers only show on Home Page or based on your design preference */}
                <h1 className='text-white font-bold text-2xl font-outfit'>
                    {isHomePage ? "Selected Projects" : "All Projects"}
                </h1>
                <p className='text-white font-md my-3 text-center px-4'>
                    {isHomePage 
                        ? "Here is a selection of my recent Projects. Click a project to see full details."
                        : "A comprehensive list of all my technical projects and contributions."}
                </p>

                <div className='flex w-full flex-wrap justify-center items-center px-4'>
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="flex flex-col w-full max-w-80 h-[32rem] justify-start items-center bg-gray-800 shadow-md rounded-lg m-4 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white/5"
                        >
                            <Link href={`/project/${project.id}`} className="w-full h-48 mb-4 overflow-hidden shrink-0 cursor-pointer">
                                <img 
                                    src={project.thumbnail} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover rounded-t-lg hover:brightness-110 transition-all" 
                                />
                            </Link>

                            <div className='flex flex-col justify-between items-center px-4 text-center flex-grow pb-4 w-full'>
                                <div className="w-full">
                                    <Link href={`/project/${project.id}`}>
                                        <h3 className="text-lg font-bold text-white mb-2 hover:text-purple-400 transition-colors cursor-pointer">
                                            {project.name}
                                        </h3>
                                    </Link>
                                    
                                    <p className="text-sm text-gray-300 mb-3 line-clamp-3">{project.details}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                                        {project.stack?.map((stackItem, index) => (
                                            <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                                {stackItem}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-3 w-full mb-5">
                                    <div className="flex gap-3 justify-center w-full">
                                        {project.live_link && (
                                            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <div className='w-full h-10 bg-purple-500 text-white rounded-lg flex justify-center items-center hover:bg-purple-700 transition-colors font-medium text-sm'>
                                                    Live Demo
                                                </div>
                                            </a>
                                        )}
                                        {project.github_link && (
                                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <div className='w-full h-10 bg-white text-black rounded-lg flex justify-center items-center hover:bg-gray-100 transition-colors font-medium text-sm'>
                                                    GitHub
                                                </div>
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex justify-center w-full">
                                        {project.video_link ? (
                                            <button onClick={() => setActiveVideo(project.video_link)} className="w-40 h-10 border border-purple-500 text-purple-400 rounded-lg flex justify-center items-center hover:bg-purple-500/10 transition-colors font-medium cursor-pointer text-sm">
                                                Watch Video
                                            </button>
                                        ) : (
                                            <div className='w-40 h-10 border border-gray-600 text-gray-500 rounded-lg flex justify-center items-center font-medium text-sm'>
                                                No Video
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SHOW MORE BUTTON: Only appears on Home Page */}
                {isHomePage && (
                    <div className="mt-12 mb-8">
                        <Link href="/projects">
                            <button className="px-10 py-4 bg-transparent border-2 border-purple-600 text-white rounded-full font-bold hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/20">
                                View All Projects
                            </button>
                        </Link>
                    </div>
                )}

                {/* Collaboration text only shows on home page or at bottom of all projects */}
                <p className='text-white text-2xl font-bold mt-10 font-outfit text-center'>Interested in collaborating?</p>
                <p className='text-white text-center text-md mt-3 px-3'>Let's build something amazing together. Reach out to discuss your project.</p>

                <Link href="/#contact">
                    <button className='bg-purple-800 px-6 h-10 rounded-lg my-4 text-white hover:bg-purple-700 transition-colors'>
                        Get in Touch
                    </button>
                </Link>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setActiveVideo(null)}>
                    <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 z-10 w-8 h-8 flex justify-center items-center bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors" onClick={() => setActiveVideo(null)}>✕</button>
                        <div className="relative pt-[56.25%] w-full">
                            <iframe className="absolute top-0 left-0 w-full h-full" src={getEmbedUrl(activeVideo)} title="Project Video Demo" frameBorder="0" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}