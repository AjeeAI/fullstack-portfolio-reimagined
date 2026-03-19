'use client';

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion'; 
import { 
  PiUserCircleFill, 
  PiCloudArrowUpBold, 
  PiCheckBold, 
  PiSpinnerGapBold, 
  PiLinkBold, 
  PiImageSquareBold,
  PiFilePdfBold 
} from 'react-icons/pi';

const CLOUDINARY_CLOUD_NAME = "dzt3imk5w"; 
const CLOUDINARY_UPLOAD_PRESET = "portfolio_assets"; 

export default function AboutManager() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File States
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    bio1: '',
    bio2: '',
    profileImage: '', // Holds the Image URL
    link: '',         // Holds the CV URL
    skills: '' 
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "metadata", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            link: data.link || '',
            profileImage: data.profileImage || '',
            skills: data.skills ? data.skills.join(', ') : ''
          });
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchAboutData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCVChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedCV(file);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
      method: "POST",
      body: data,
    });
    const uploaded = await res.json();
    return uploaded.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.profileImage;
      let finalCVUrl = formData.link;

      if (selectedImage) finalImageUrl = await uploadToCloudinary(selectedImage);
      if (selectedCV) finalCVUrl = await uploadToCloudinary(selectedCV);

      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== "");

      await setDoc(doc(db, "metadata", "about"), {
        ...formData,
        profileImage: finalImageUrl,
        link: finalCVUrl,
        skills: skillsArray,
        updatedAt: serverTimestamp()
      });

      alert("Identity Synchronized Successfully!");
      setSelectedImage(null);
      setSelectedCV(null);
      setPreviewUrl('');
    } catch (error) {
      alert("Transmission Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-black/40 text-white rounded-xl px-4 py-3 border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all text-sm mb-4 placeholder:text-slate-600";

  if (loading) return <div className="p-10 text-slate-500 animate-pulse font-outfit uppercase tracking-widest text-xs">Fetching Identity...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight mb-2 flex items-center gap-3">
            <PiUserCircleFill className="text-purple-500" /> Profile Management
          </h1>
          <p className="text-slate-400 font-light text-sm">Update your public identity and professional assets.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl bg-white/[0.02] border border-white/5 p-8 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT: Upload Triggers */}
          <div className="flex flex-col items-center gap-8">
             <div className="flex flex-col items-center gap-3 w-full">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Avatar Preview</label>
                <div className="relative group cursor-pointer w-48 h-48">
                    <img 
                      src={previewUrl || formData.profileImage || "https://res.cloudinary.com/dzt3imk5w/image/upload/v1773067601/avatar2_s1brjn.jpg"} 
                      className="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-purple-500/50 transition-all"
                      alt="Avatar"
                    />
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                       <PiCloudArrowUpBold size={32} />
                       <span className="text-[10px] uppercase font-bold mt-2 text-center">Upload New<br/>Photo</span>
                       <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                </div>
             </div>

             <div className="w-full flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">CV File (PDF)</label>
                <label className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${selectedCV ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-purple-500/40 bg-white/5'}`}>
                   <PiFilePdfBold size={24} className={selectedCV ? 'text-green-400' : 'text-slate-400'} />
                   <span className="text-[9px] font-bold mt-2 text-center text-slate-300 uppercase truncate max-w-full px-2">
                      {selectedCV ? selectedCV.name : 'Click to Upload PDF'}
                   </span>
                   <input type="file" className="hidden" onChange={handleCVChange} accept="application/pdf" />
                </label>
             </div>
          </div>

          {/* RIGHT: Explicit Text Controls */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
               <div className="md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block">Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} className={inputStyle} placeholder="Full Name" />
               </div>

               {/* RE-ADDED: Image URL Field */}
               <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block flex items-center gap-1">
                    <PiImageSquareBold className="text-purple-400" /> Direct Image URL
                  </label>
                  <input name="profileImage" value={formData.profileImage} onChange={handleChange} className={inputStyle} placeholder="Paste Image Link..." />
               </div>

               {/* CV URL Field */}
               <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block flex items-center gap-1">
                    <PiLinkBold className="text-purple-400" /> CV Download Link
                  </label>
                  <input name="link" value={formData.link} onChange={handleChange} className={inputStyle} placeholder="Paste PDF Link..." />
               </div>
            </div>

            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block">Primary Bio (Intro)</label>
            <textarea name="bio1" value={formData.bio1} onChange={handleChange} rows={3} className={inputStyle} placeholder="Hi! I am..." />

            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block">Secondary Bio (Expertise)</label>
            <textarea name="bio2" value={formData.bio2} onChange={handleChange} rows={3} className={inputStyle} placeholder="With expertise in..." />

            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1 mb-2 block">Skills (Comma Separated)</label>
            <input name="skills" value={formData.skills} onChange={handleChange} className={inputStyle} placeholder="React, Python, Next.js..." />

            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-xl mt-4"
            >
              {isSubmitting ? <PiSpinnerGapBold className="animate-spin" size={20} /> : <PiCheckBold size={20} />}
              {isSubmitting ? "Syncing Identity..." : "Save Profile Changes"}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}