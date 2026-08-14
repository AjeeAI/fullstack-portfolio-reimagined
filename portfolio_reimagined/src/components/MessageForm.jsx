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
            
        } catch (error) {
            console.error("Error saving message:", error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // DUAL STYLING: Clean slate background with blue focus for Light Mode, glass with purple focus for Dark Mode
    const inputStyle = "w-full bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white rounded-xl px-4 border border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/[0.07] focus:outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm sm:text-base shadow-sm dark:shadow-none";
    const labelStyle = "text-slate-600 dark:text-slate-400 mb-2 text-xs uppercase tracking-widest font-bold ml-1 transition-colors duration-300";

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
                                <label className={labelStyle}>Name</label>
                                <input name='name' value={formData.name} placeholder='John Doe' onChange={handleChange} type='text' className={`${inputStyle} h-12`} required />
                            </motion.div>
                            <motion.div variants={fadeIn("up")} className='flex flex-col w-full'>
                                <label className={labelStyle}>Email</label>
                                <input name='email' value={formData.email} placeholder='john@example.com' onChange={handleChange} type='email' className={`${inputStyle} h-12`} required />
                            </motion.div>
                        </div>
                        
                        <motion.div variants={fadeIn("up")} className='flex flex-col'>
                            <label className={labelStyle}>Subject</label>
                            <input name='subject' value={formData.subject} placeholder='Project Inquiry' onChange={handleChange} type='text' className={`${inputStyle} h-12`} required />
                        </motion.div>

                        <motion.div variants={fadeIn("up")} className='flex flex-col'>
                            <label className={labelStyle}>Message</label>
                            <textarea name='message' value={formData.message} placeholder='Tell me about your project...' onChange={handleChange} rows={5} className={`${inputStyle} py-3 resize-none`} required />
                        </motion.div>
                        
                        <motion.button 
                            variants={fadeIn("up")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={loading}
                            // DUAL STYLING: Solid Dark Slate for Light Mode, Neon Gradient for Dark Mode
                            className='w-full h-14 bg-slate-900 hover:bg-slate-800 dark:bg-gradient-to-r dark:from-violet-600 dark:to-indigo-600 text-white rounded-xl font-bold flex justify-center items-center gap-3 border border-transparent dark:border-white/10 shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300'
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
                            <FaCheckCircle className="text-green-500 dark:text-green-400 text-7xl mb-6 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-colors duration-300" />
                        </motion.div>
                        
                        <h2 className="text-slate-900 dark:text-white text-3xl font-bold font-outfit mb-3 italic tracking-tight transition-colors duration-300">Transmission Received</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-light max-w-sm transition-colors duration-300">
                            Thank you! Your message has been encrypted and sent. I'll get back to you within <span className="text-blue-600 dark:text-purple-400 font-medium transition-colors duration-300">24 hours</span>.
                        </p>

                        <motion.button
                            onClick={() => setSent(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            // DUAL STYLING: Tailwind hover classes handle the color shift instead of Framer Motion
                            className="mt-10 text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-blue-600 dark:hover:text-[#A855F7] font-bold transition-colors duration-300"
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