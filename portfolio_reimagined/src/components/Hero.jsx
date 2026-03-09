import React from 'react'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

// 1. Changed import to Next.js Link
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center bg-gradient-custom p-6'>
       <div className='p-4 w-full'>
        <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight font-outfit break-words'>
         Ajijolaoluwa Adesoji-Fullstack Developer
        </p>

        <p className='text-sm sm:text-base md:text-lg text-white mt-5 text-center'>
          Building seamless web experiences across mobile and web
        </p>

        <div className='flex flex-wrap justify-center mt-10 gap-4 md:gap-10 w-full'>
            {/* 2. Changed 'to' to 'href' */}
            <Link href="/#projects">
                <button className='border-2 w-36 sm:w-40 h-12 bg-orange-500 text-black font-bold rounded-xl'>
                    View Projects
                </button>
            </Link>

            {/* 2. Changed 'to' to 'href' */}
            <Link href="/#contact">
                <button className='border-2 border-white w-36 sm:w-40 h-12 text-white rounded-xl font-bold'>
                    Contact Me
                </button>
            </Link>
        </div>

        <div className='flex justify-center mt-10 gap-6 md:gap-10'>
            <div>
                {/* 3. Added rel="noopener noreferrer" for security */}
                <a href='https://github.com/AjeeAI' target='_blank' rel='noopener noreferrer'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <FaGithub size={30} color='white' className='rounded-full hover:bg-gray-700'/>
                <p className='text-white text-sm'>Github</p>
                </div>
                </a>
            </div>

            <div>
                {/* 3. Added rel="noopener noreferrer" for security */}
                <a href='https://www.linkedin.com/in/ajeeflutterdev/' target='_blank' rel='noopener noreferrer'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <FaLinkedin size={30} color='white' className=' hover:bg-gray-700'/>
                <p className='text-white text-sm'>LinkedIn</p>
                </div>
                </a>
            </div>

            <div>
                {/* 3. Added rel="noopener noreferrer" for security */}
                <a href='https://x.com/ajeeaidev' target='_blank' rel='noopener noreferrer'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <FaXTwitter size={30} color='white' className=' hover:bg-gray-700'/>
                <p className='text-white text-sm'>Twitter</p>
                </div>
                </a>
            </div>
        </div>
       </div>
    </div>
  )
}

export default Hero