import React from 'react'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center bg-gradient-custom p-6'>
       <div className='p-4 w-full'> {/* Added w-full */}
        <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold text-center leading-tight font-outfit break-words'>
         Ajijolaoluwa Adesoji-Fullstack Developer
        </p>

        <p className='text-sm sm:text-base md:text-lg text-white mt-5 text-center'>
          Building seamless web experiences across mobile and web
        </p>

        {/* --- FIXED SECTION --- */}
        {/* Added flex-wrap so buttons stack on tiny screens if needed */}
        {/* Changed gap-10 to gap-4 on mobile, gap-10 on larger screens (md:gap-10) */}
        <div className='flex flex-wrap justify-center mt-10 gap-4 md:gap-10 w-full'>
            <Link to="/projects">
                {/* w-36 on mobile to fit better, w-40 on desktop */}
                <button className='border-2 w-36 sm:w-40 h-12 bg-orange-500 text-black font-bold rounded-xl'>
                    View Projects
                </button>
            </Link>

            <Link to="/contact">
                 {/* w-36 on mobile to fit better, w-40 on desktop */}
                <button className='border-2 border-white w-36 sm:w-40 h-12 text-white rounded-xl font-bold'>
                    Contact Me
                </button>
            </Link>
        </div>

        {/* Social Icons - reduced gap for mobile */}
        <div className='flex justify-center mt-10 gap-6 md:gap-10'>
            <div >
                <a href='https://github.com/AjeeAI' target='_blank'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <FaGithub size={30} color='white' className='rounded-full hover:bg-gray-700'/>
                <p className='text-white text-sm'>Github</p>
                </div>
                </a>
            </div>

            <div >
                <a href='https://www.linkedin.com/in/ajeeflutterdev/' target='_blank'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <FaLinkedin size={30} color='white' className=' hover:bg-gray-700'/>
                <p className='text-white text-sm'>LinkedIn</p>
                </div>
                </a>
            </div>

            <div >
                <a href='https://x.com/ajeeaidev' target='_blank'>
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