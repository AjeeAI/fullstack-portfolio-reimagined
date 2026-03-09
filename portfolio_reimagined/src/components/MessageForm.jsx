'use client'; // Required for form state

import React, { useState } from 'react'
import { db } from '@/lib/firebase'; // Ensure this points to your firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MessageForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            setLoading(true);
            
            // Add directly to Firebase Firestore
            await addDoc(collection(db, "messages"), {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                createdAt: serverTimestamp() // Tracks when it was sent
            });
            
            alert('Thank you for your message! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
            
        } catch (error) {
            console.error("Error saving message:", error);
            alert('There was an error sending your message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full max-w-md lg:max-w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:gap-6 w-full'>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                    <div className='flex flex-col w-full'>
                        <label className='text-gray-100 mb-2 text-sm sm:text-base'>Name</label>
                        <input 
                            name='name'
                            value={formData.name}
                            placeholder='Your Name'
                            onChange={handleChange}
                            type='text'
                            className='w-full h-12 bg-gray-700 text-white rounded-lg px-4 border border-gray-600 focus:border-purple-500 focus:outline-none text-sm sm:text-base'
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='text-gray-100 mb-2 text-sm sm:text-base'>Email</label>
                        <input 
                            name='email'
                            value={formData.email}
                            placeholder='your.email@example.com'
                            onChange={handleChange}
                            type='email'
                            className='w-full h-12 bg-gray-700 text-white rounded-lg px-4 border border-gray-600 focus:border-purple-500 focus:outline-none text-sm sm:text-base'
                            required
                        />
                    </div>
                </div>
                
                <div className='flex flex-col'>
                    <label className='text-gray-100 mb-2 text-sm sm:text-base'>Subject</label>
                    <input 
                        name='subject'
                        value={formData.subject}
                        placeholder='Subject of your message'
                        onChange={handleChange}
                        type='text'
                        className='w-full h-12 bg-gray-700 text-white rounded-lg px-4 border border-gray-600 focus:border-purple-500 focus:outline-none text-sm sm:text-base'
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-100 mb-2 text-sm sm:text-base'>Message</label>
                    <textarea 
                        name='message'
                        value={formData.message}
                        placeholder='Your message here...'
                        onChange={handleChange}
                        rows={4}
                        className='w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none resize-none text-sm sm:text-base'
                        required
                    />
                </div>
                
                <button 
                    type='submit'
                    className='w-full h-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400'
                    disabled={loading}
                >
                    {loading ? (
                        <svg fill='white' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'>
                            <circle cx="4" cy="12" r="0">
                                <animate begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/>
                                <animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/>
                                <animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/>
                                <animate id="spinner_lo66" begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/>
                                <animate id="spinner_z0Or" begin="spinner_lo66.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/>
                            </circle>
                            <circle cx="4" cy="12" r="3">
                                <animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/>
                                <animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/>
                                <animate id="spinner_JsnR" begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/>
                                <animate id="spinner_Aguh" begin="spinner_JsnR.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/>
                                <animate begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/>
                            </circle>
                            <circle cx="12" cy="12" r="3">
                                <animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/>
                                <animate id="spinner_hSjk" begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/>
                                <animate id="spinner_UHR2" begin="spinner_hSjk.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/>
                                <animate begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/>
                                <animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/>
                            </circle>
                            <circle cx="20" cy="12" r="3">
                                <animate id="spinner_4v5M" begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"/>
                                <animate id="spinner_OLMs" begin="spinner_4v5M.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"/>
                                <animate begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"/>
                                <animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"/>
                                <animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"/>
                            </circle>
                        </svg>
                    ) : "Send message"}
                </button>
            </form>
        </div>
    )
}

export default MessageForm