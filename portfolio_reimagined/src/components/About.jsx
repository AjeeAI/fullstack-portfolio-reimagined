import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3, 
  FaPython, 
  FaDatabase, 
  FaFire, 
  FaPhp, 
  FaGit 
} from 'react-icons/fa';
import { SiFlutter, SiDart, SiFastapi } from 'react-icons/si';
import React from 'react';

// 1. Next.js Link import
import Link from 'next/link';

const About = () => {
    const skills = [
  { name: "Flutter", icon: <SiFlutter className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "Dart", icon: <SiDart className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "React", icon: <FaReact className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "Javascript", icon: <FaJs className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "HTML", icon: <FaHtml5 className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "CSS", icon: <FaCss3 className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "FastAPI", icon: <SiFastapi className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "Python", icon: <FaPython className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "MySQL", icon: <FaDatabase className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "Firebase", icon: <FaFire className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "PHP", icon: <FaPhp className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> },
  { name: "Git", icon: <FaGit className="w-8 h-8 sm:w-10 sm:h-10" color='white'/> } 
];

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col font-outfit'>
        {/* About Section */}
        <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 xl:gap-20 mt-8 sm:mt-10 w-full'>
            {/* Profile Image */}
            <div className='flex justify-center items-center lg:justify-start'>
                {/* 2. Direct path to the public/assets folder */}
                <img 
                    src="https://res.cloudinary.com/dzt3imk5w/image/upload/v1773067601/avatar2_s1brjn.jpg"
                    alt='Profile Image'
                    className='rounded-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-cover'
                />
            </div>

            {/* About Text */}
            <div className='w-full lg:w-[70%] flex flex-col justify-start items-center lg:items-start text-center lg:text-left'>
                <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6'>
                    About me
                </h1>
                <p className='text-white text-sm sm:text-base lg:text-lg leading-relaxed'>
                    Hi! I am Ajijolaoluwa Adesoji, a fullstack developer passionate about building efficient, scalable applications. With deep experience in mobile development with Flutter, dynamic frontends with React, and robust backend systems with FastAPI, I thrive on creating seamless user experiences from concept to deployment.
                </p>

                {/* 3. Replaced 'to' with 'href' for Next.js Link */}
                <Link href="/#contact">
                    <button className='w-32 sm:w-36 h-10 sm:h-12 text-white bg-green-500 rounded-xl font-bold mt-6 sm:mt-8 lg:mt-10 hover:bg-green-600 transition-colors text-sm sm:text-base'>
                        Contact Me
                    </button>
                </Link>
            </div>
        </div>
        
        {/* Skills Section */}
        <div className='flex flex-col justify-center items-center mt-12 sm:mt-16 lg:mt-20'>
            <h2 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 font-outfit'>
                My Tech Stack
            </h2>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 w-full max-w-4xl'>
                {skills.map((skill) => (
                    <div 
                        key={skill.name} 
                        className='flex flex-col w-full aspect-square justify-center items-center gap-2 sm:gap-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105 p-2 sm:p-4'
                    >
                        <div className='text-white'>
                            {skill.icon}
                        </div>
                        <p className='text-white font-medium text-xs sm:text-sm text-center'>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default About