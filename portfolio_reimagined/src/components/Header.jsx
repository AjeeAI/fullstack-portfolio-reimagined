import React, { useState } from 'react'
import { PiDiamondFill } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   location = useLocation();

  return (
    <div className='my-4 mx-4 sm:mx-6 lg:mx-auto w-full max-w-4xl xl:max-w-6xl h-12 sm:h-14 flex justify-between items-center bg-gradient-custom px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-md shadow-xl sticky top-0 z-50'>
        
        {/* Logo Section */}
        <div className='flex items-center gap-3 sm:gap-4'>
            <PiDiamondFill 
              size={24} 
              className="sm:w-[30px] sm:h-[30px] bg-gray-100 rounded" 
              color='orange'
            />
            <p className='text-white font-bold text-lg sm:text-xl lg:text-2xl'>
                Ajee
            </p>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex justify-center items-center gap-4 lg:gap-6 xl:gap-8'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : 'text-white text-sm lg:text-md hover:text-orange-300 transition-colors'}>
                Home
            </NavLink>
            <NavLink to="/projects" className='text-white text-sm lg:text-md hover:text-orange-300 transition-colors'>
                Projects
            </NavLink>
            <NavLink to="/about" className='text-white text-sm lg:text-md hover:text-orange-300 transition-colors'>
                About
            </NavLink>
            <NavLink to="/contact" className='text-white text-sm lg:text-md hover:text-orange-300 transition-colors'>
                Contact
            </NavLink>

             
                <a href='/files/My Dev CV.pdf' target='_blank' download className='text-white text-sm lg:text-md hover:text-orange-300 transition-colors'>
                    Download CV
                </a>
            
        </div>

        {/* Mobile Menu Button */}
        <button 
            className='md:hidden text-white'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
            <div className='absolute top-full left-0 right-0 bg-gradient-custom rounded-b-md shadow-xl md:hidden'>
                <div className='flex flex-col p-4 space-y-4 items-center'>

                    <NavLink 
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                       className={({ isActive }) =>
                                isActive
                                ? 'm-active'
                                : 'text-white text-md py-2 hover:text-orange-300 transition-colors text-left'
                            }
                    >
                        Home
                    </NavLink>

                    <NavLink 
                        to="/projects"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                                isActive
                                ? 'm-active'
                                : 'text-white text-md py-2 hover:text-orange-300 transition-colors text-left'
                            }
                    >
                        Projects
                    </NavLink>

                    <NavLink 
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                                isActive
                                ? 'm-active'
                                : 'text-white text-md py-2 hover:text-orange-300 transition-colors text-left'
                            }
                    >
                        About
                    </NavLink>

                    <NavLink 
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                                isActive
                                ? 'm-active'
                                : 'text-white text-md py-2 hover:text-orange-300 transition-colors text-left'
                            }
                    >
                        Contact
                    </NavLink>

                </div>
            </div>
        )}
    </div>
  )
}

export default Header
