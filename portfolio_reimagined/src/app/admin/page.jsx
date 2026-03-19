// src/app/admin/page.jsx
'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PiDiamondFill } from 'react-icons/pi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard'); // Redirect to the secure area
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4 font-outfit relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <PiDiamondFill size={40} className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          </motion.div>
          <h1 className="text-white text-2xl font-bold tracking-widest uppercase">Command Center</h1>
          <p className="text-slate-400 text-xs tracking-widest mt-2 uppercase">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1">Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 text-white rounded-xl px-4 h-12 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 placeholder:text-slate-700"
              placeholder="admin@system.io"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 text-white rounded-xl px-4 h-12 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 placeholder:text-slate-700"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 border border-purple-400/20"
          >
            {loading ? "Authenticating..." : "Initialize Session"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}