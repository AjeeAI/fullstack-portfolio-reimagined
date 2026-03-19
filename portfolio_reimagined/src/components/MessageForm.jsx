'use client'; 

import React, { useState } from 'react'
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/utils/variants';
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

const MessageForm = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addDoc(collection(db, "messages"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            
            setSent(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            // We no longer auto-reset, let the user enjoy the success state!
            
        } catch (error) {
            console.error("Error saving message:", error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full bg-white/[0.03] text-white rounded-xl px-4 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 placeholder:text-slate-600 text-sm sm:text-base";

    return (
        <div className='w-full min-h-[450px] flex items-center justify-center relative'>
            <AnimatePresence mode="wait">
                {!sent ? (
                    // 1. THE FORM (Entry & Exit)
                    <motion.form 
                        key="contact-form"
                        variants={staggerContainer(0.1, 0)}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        onSubmit={handleSubmit} 
                        className='flex flex-col gap-6 w-full'
                    >
                        <div className='flex flex-col sm:flex-row gap-6'>
                            <motion.div variants={fadeIn("up")} className='flex flex-col w-full'>
                                <label className='text-slate-400 mb-2 text-xs uppercase tracking-widest font-bold ml-1'>Name</label>
                                <input name='name' value={formData.name} placeholder='John Doe' onChange={handleChange} type='text' className={`${inputStyle} h-12`} required />
                            </motion.div>
                            <motion.div variants={fadeIn("up")} className='flex flex-col w-full'>
                                <label className='text-slate-400 mb-2 text-xs uppercase tracking-widest font-bold ml-1'>Email</label>
                                <input name='email' value={formData.email} placeholder='john@example.com' onChange={handleChange} type='email' className={`${inputStyle} h-12`} required />
                            </motion.div>
                        </div>
                        
                        <motion.div variants={fadeIn("up")} className='flex flex-col'>
                            <label className='text-slate-400 mb-2 text-xs uppercase tracking-widest font-bold ml-1'>Subject</label>
                            <input name='subject' value={formData.subject} placeholder='Project Inquiry' onChange={handleChange} type='text' className={`${inputStyle} h-12`} required />
                        </motion.div>

                        <motion.div variants={fadeIn("up")} className='flex flex-col'>
                            <label className='text-slate-400 mb-2 text-xs uppercase tracking-widest font-bold ml-1'>Message</label>
                            <textarea name='message' value={formData.message} placeholder='Tell me about your project...' onChange={handleChange} rows={5} className={`${inputStyle} py-3 resize-none`} required />
                        </motion.div>
                        
                        <motion.button 
                            variants={fadeIn("up")}
                            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={loading}
                            className='w-full h-14 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold flex justify-center items-center gap-3 border border-white/10 shadow-lg shadow-purple-500/20'
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                    <FaPaperPlane className="text-white" />
                                </motion.div>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <FaPaperPlane className="text-xs opacity-50" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                ) : (
                    // 2. THE SUCCESS POP (Confirmation state)
                    <motion.div 
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="flex flex-col items-center justify-center text-center p-6 sm:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <FaCheckCircle className="text-green-400 text-7xl mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                        </motion.div>
                        
                        <h2 className="text-white text-3xl font-bold font-outfit mb-3 italic tracking-tight">Transmission Received</h2>
                        <p className="text-slate-400 font-light max-w-sm">
                            Thank you! Your message has been encrypted and sent. I'll get back to you within <span className="text-purple-400 font-medium">24 hours</span>.
                        </p>

                        <motion.button
                            onClick={() => setSent(false)}
                            whileHover={{ scale: 1.05, color: "#A855F7" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold transition-colors"
                        >
                            Send another message?
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MessageForm