'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { PiPlusBold, PiTrashBold, PiXBold, PiPencilSimpleBold, PiMapPinLineFill, PiBriefcaseBold, PiGraduationCapBold } from 'react-icons/pi';

export default function JourneyManager() {
  const [journeyItems, setJourneyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Edit State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  
  // Submit State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const initialFormState = {
    role: '',
    company: '',
    period: '',
    description: '',
    type: 'work', // 'work' or 'education'
    sortOrder: 0  // 1 is top, 2 is below, etc.
  };
  const [formData, setFormData] = useState(initialFormState);

  // 1. FETCH JOURNEY ITEMS
  const fetchJourney = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "journey"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by the manual Sort Order ascending (1, 2, 3...)
      items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setJourneyItems(items);
    } catch (error) {
      console.error("Error fetching journey:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourney();
  }, []);

  // 2. HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sortOrder' ? Number(value) : value
    }));
  };

  // 3. SUBMIT / UPDATE ITEM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingId) {
        const docRef = doc(db, "journey", editingId);
        await updateDoc(docRef, { ...formData });
      } else {
        await addDoc(collection(db, "journey"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      resetAndCloseForm();
      fetchJourney();
    } catch (error) {
      console.error("Error saving timeline event:", error);
      alert("Failed to save. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. LOAD INTO EDIT FORM
  const handleEditClick = (item) => {
    setFormData({
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
      type: item.type || 'work',
      sortOrder: item.sortOrder || 0
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  // 5. RESET & CLOSE
  const resetAndCloseForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this timeline milestone permanently?")) {
      try {
        await deleteDoc(doc(db, "journey", id));
        fetchJourney();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const inputStyle = "w-full bg-black/40 text-white rounded-xl px-4 py-3 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 placeholder:text-slate-600 text-sm";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight mb-2 flex items-center gap-3">
            <PiMapPinLineFill className="text-purple-500" />
            Journey & Timeline
          </h1>
          <p className="text-slate-400 font-light">Manage your professional experience and education history.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          <PiPlusBold /> New Milestone
        </motion.button>
      </div>

      {/* ADD / EDIT MODAL */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#05001a] border border-purple-500/30 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.15)] relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={resetAndCloseForm}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors z-10"
              >
                <PiXBold size={20} />
              </button>

              <form onSubmit={handleSubmit} className="relative mt-2">
                <h2 className="text-2xl font-bold mb-8 text-purple-400 italic pr-12">
                  {editingId ? "Edit Milestone" : "Add Timeline Milestone"}
                </h2>

                {/* TYPE TOGGLE */}
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'work' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                      formData.type === 'work' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-black/40 border-white/10 text-slate-500 hover:text-white'
                    }`}
                  >
                    <PiBriefcaseBold size={16} /> Work Experience
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'education' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                      formData.type === 'education' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-black/40 border-white/10 text-slate-500 hover:text-white'
                    }`}
                  >
                    <PiGraduationCapBold size={16} /> Education
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">
                      {formData.type === 'work' ? 'Job Title *' : 'Degree / Certificate *'}
                    </label>
                    <input name="role" value={formData.role} onChange={handleChange} required className={inputStyle} placeholder={formData.type === 'work' ? 'Senior AI Engineer' : 'B.Sc. Computer Science'} />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">
                      {formData.type === 'work' ? 'Company *' : 'Institution *'}
                    </label>
                    <input name="company" value={formData.company} onChange={handleChange} required className={inputStyle} placeholder={formData.type === 'work' ? 'Google' : 'MIT'} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Period *</label>
                    <input name="period" value={formData.period} onChange={handleChange} required className={inputStyle} placeholder="Jan 2022 - Present" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Sort Order (1 is top) *</label>
                    <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleChange} required className={inputStyle} min="0" />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className={inputStyle} placeholder="Describe your responsibilities or achievements..." />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-4 rounded-xl disabled:opacity-50 tracking-widest uppercase text-sm border shadow-[0_0_20px_rgba(124,58,237,0.3)] flex justify-center items-center gap-3 transition-colors ${
                    editingId 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500/50 shadow-emerald-500/30' 
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 border-white/10'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : editingId ? 'Save Changes' : 'Deploy Milestone'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TIMELINE LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : journeyItems.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
          <p className="text-slate-500 font-light">Your timeline is empty. Add your first milestone.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {journeyItems.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl group hover:border-purple-500/30 transition-all duration-300 relative flex items-start gap-5"
            >
              {/* Type Icon */}
              <div className="w-12 h-12 rounded-full bg-black/40 border border-white/5 flex items-center justify-center shrink-0 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                {item.type === 'education' ? <PiGraduationCapBold size={24} /> : <PiBriefcaseBold size={24} />}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                  <span className="bg-white/5 text-slate-300 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">
                    {item.period}
                  </span>
                </div>
                <p className="text-purple-300 text-sm font-medium mb-3">{item.company}</p>
                <p className="text-slate-400 text-sm font-light leading-relaxed max-w-3xl whitespace-pre-wrap">{item.description}</p>
                
                {/* Visual Order Indicator */}
                <div className="mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                  Order Index: [{item.sortOrder}]
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleEditClick(item)} 
                  className="bg-black/60 backdrop-blur-md text-white p-2 rounded-lg hover:bg-purple-500 transition-colors" 
                  title="Edit"
                >
                  <PiPencilSimpleBold size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="bg-black/60 backdrop-blur-md text-white p-2 rounded-lg hover:bg-red-500 transition-colors" 
                  title="Delete"
                >
                  <PiTrashBold size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}