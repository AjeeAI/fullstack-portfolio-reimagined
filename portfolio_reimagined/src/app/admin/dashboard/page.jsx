'use client';

import React, { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; // Switched to onSnapshot
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { PiEnvelopeSimpleFill } from 'react-icons/pi';

export default function DashboardOverview() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // A ref to prevent notifying for all existing messages on initial load
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // 1. Request Browser Permission for Notifications
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }

    // 2. Setup Real-time Listener
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Just now'
      }));

      setMessages(msgs);
      setLoading(false);

      // 3. Trigger Notification for NEW additions only
      if (!isInitialLoad.current) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newMsg = change.doc.data();
            triggerNotification(newMsg);
          }
        });
      }
      
      isInitialLoad.current = false;
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const triggerNotification = (msg) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`New Transmission from ${msg.name}`, {
        body: msg.subject || msg.message.substring(0, 50) + "...",
        icon: '/logo.svg', // Path to your logo
      });
      
      // Optional: Add a subtle notification sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      audio.play().catch(e => console.log("Audio play blocked until user interaction"));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold italic tracking-tight mb-2">System Overview</h1>
        <p className="text-slate-400 font-light">Welcome back, Commander. Monitoring live transmissions.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
          {/* Animated pulse for live status */}
          <div className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </div>
          
          <div className="flex items-center gap-3 text-purple-400">
            <PiEnvelopeSimpleFill size={24} />
            <span className="text-xs uppercase tracking-widest font-bold">Total Messages</span>
          </div>
          <span className="text-4xl font-bold text-white">{messages.length}</span>
        </div>
      </div>

      {/* INBOX TABLE */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
          <h2 className="font-bold tracking-widest uppercase text-sm text-purple-400">Recent Transmissions</h2>
          <span className="text-[10px] text-slate-500 font-mono animate-pulse uppercase">Live Feed Active</span>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-slate-500 text-sm animate-pulse">Decrypting messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-slate-500 text-sm">Inbox is empty.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className="bg-black/20 border border-white/5 p-5 rounded-2xl hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-bold">{msg.subject}</h3>
                      <p className="text-xs text-slate-400 mt-1">From: <span className="text-purple-300">{msg.name}</span> ({msg.email})</p>
                    </div>
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-slate-400">{msg.date}</span>
                  </div>
                  <p className="text-sm text-slate-300 font-light leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}