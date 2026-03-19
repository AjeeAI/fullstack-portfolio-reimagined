'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  PiDiamondFill, 
  PiProjectorScreenChartFill, 
  PiMapPinLineFill, 
  PiSignOutBold, 
  PiSquaresFourFill,
  PiUserCircleFill // Added for About Me
} from 'react-icons/pi';

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // AUTH GUARD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin'); 
      } else {
        setLoading(false); 
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  // UPDATED NAVIGATION ITEMS
  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <PiSquaresFourFill size={20} /> },
    { name: 'Projects', path: '/admin/dashboard/projects', icon: <PiProjectorScreenChartFill size={20} /> },
    { name: 'Journey', path: '/admin/dashboard/journey', icon: <PiMapPinLineFill size={20} /> },
    // THE FIX: Added the About Me link
    { name: 'About Me', path: '/admin/dashboard/about', icon: <PiUserCircleFill size={20} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <PiDiamondFill size={40} className="text-purple-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] flex font-outfit text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/5 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center gap-3 px-8 border-b border-white/5">
            <PiDiamondFill size={24} className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            <span className="font-bold tracking-widest uppercase text-sm">Admin Hub</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-4 py-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path}>
                  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}>
                    {item.icon}
                    <span className="font-medium text-sm tracking-wide">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <PiSignOutBold size={20} />
            <span className="font-medium text-sm tracking-wide">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
        <div className="p-8 lg:p-12 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}