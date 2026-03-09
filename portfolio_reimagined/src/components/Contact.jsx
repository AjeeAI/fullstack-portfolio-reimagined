'use client'; // Required for useState and browser APIs like navigator.clipboard

import React, { useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import MessageForm from './MessageForm'

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "ajeeaidev@gmail.com";
    
    const handleCopy = async() => {
       try {
         await navigator.clipboard.writeText(email);
         setCopied(true);
         setTimeout(()=> {setCopied(false)}, 2000);
       } catch (error) {
         console.error("Failed to copy:", error);
       }
    }

  return (
    <div className='flex flex-col items-center my-20  gap-5 w-full px-4 sm:px-6 lg:px-8' id='contact'>
        <h1 className='text-white font-bold text-3xl sm:text-4xl text-center font-outfit'>Get in Touch</h1>
        <p className='text-white text-sm sm:text-md max-w-2xl text-center mb-8 sm:mb-10'>
            Feel free to reach out for collaborations, job opportunities or just to say hi. 
            I am always open to discussing new projects and innovative ideas.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-full max-w-6xl'>
            {/* Contact Info Section */}
            <div className='flex flex-col items-center lg:items-start gap-7 w-full'>
                <div className='flex justify-between items-center w-full max-w-md border border-purple-300 rounded-md px-4 py-3'>
                    <div className='flex justify-start items-center gap-3 sm:gap-5'> 
                        <FaEnvelope size={24} className="sm:w-[30px] sm:h-[30px]" color='white'/>
                        <p className='text-white text-sm sm:text-base'>ajeeaidev@gmail.com</p>
                    </div>
                    <button 
                        className='text-purple-300 hover:text-white px-3 py-1 rounded border border-purple-300 hover:bg-purple-300 hover:bg-opacity-20 transition-colors text-sm sm:text-base' 
                        onClick={handleCopy}
                    >
                        Copy
                    </button>
                    
                </div>
                {copied && <div className="text-green-400 text-sm">Email copied to clipboard!</div>}

                <div className='flex flex-col gap-10 items-center h-50 w-full mt-4'>
                    <p className='text-purple-300 text-center lg:text-left'>Find me on social media</p>

                <div className='flex justify-center gap-6 sm:gap-8 lg:gap-10 w-full'>
                    <div>
                        <a href='https://github.com/AjeeAI' target='_blank' rel='noopener noreferrer'>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <FaGithub size={30} color='white' className='rounded-full hover:bg-gray-700 p-1 transition-colors'/>
                                <p className='text-white text-sm'>Github</p>
                            </div>
                        </a>
                    </div>

                    <div>
                        <a href='https://www.linkedin.com/in/ajeeflutterdev/' target='_blank' rel='noopener noreferrer'>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <FaLinkedin size={30} color='white' className='hover:bg-gray-700 p-1 rounded transition-colors'/>
                                <p className='text-white text-sm'>LinkedIn</p>
                            </div>
                        </a>
                    </div>

                    <div>
                        <a href='https://x.com/ajeeaidev' target='_blank' rel='noopener noreferrer'>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <FaXTwitter size={30} color='white' className='hover:bg-gray-700 p-1 rounded transition-colors'/>
                                <p className='text-white text-sm'>Twitter</p>
                            </div>
                        </a>
                    </div>
                </div>
                </div>
            </div>

            {/* Message Form Section */}
            <div className='flex flex-col items-center lg:items-start gap-7 w-full'>
                <MessageForm/>
            </div>
        </div>
    </div>
  )
}

export default Contact