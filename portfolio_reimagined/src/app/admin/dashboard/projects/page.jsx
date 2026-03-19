'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { PiPlusBold, PiTrashBold, PiProjectorScreenChartFill, PiXBold, PiLinkBold, PiUploadSimpleBold, PiPencilSimpleBold } from 'react-icons/pi';

// --- CLOUDINARY CONFIGURATION ---
const CLOUDINARY_CLOUD_NAME = "dzt3imk5w"; 
const CLOUDINARY_UPLOAD_PRESET = "portfolio_assets"; 

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState('');

  const [imageMode, setImageMode] = useState('url'); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const initialFormState = {
    name: '',
    details: '',
    thumbnail: '', 
    stack: '',
    live_link: '',
    github_link: '',
    video_link: '',
    featured: false,
    priority: 1 // NEW: Default priority
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort in dashboard: Priority first, then Date
      projs.sort((a, b) => {
        if (a.priority !== b.priority) return (a.priority || 999) - (b.priority || 999);
        return (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0);
      });

      setProjects(projs);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'priority' ? Number(value) : value)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });

    const uploadedImage = await res.json();
    if (uploadedImage.error) throw new Error(uploadedImage.error.message);
    return uploadedImage.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalImageUrl = formData.thumbnail;

      if (imageMode === 'upload' && selectedFile) {
        setStatusText('Uploading Image...');
        finalImageUrl = await uploadImageToCloudinary(selectedFile);
      } else if (imageMode === 'upload' && !selectedFile && !editingId) {
        alert("Please select an image file.");
        setIsSubmitting(false);
        return;
      }

      setStatusText('Saving Project...');
      const stackArray = formData.stack.split(',').map(item => item.trim()).filter(item => item !== '');

      if (editingId) {
        const projectRef = doc(db, "projects", editingId);
        await updateDoc(projectRef, {
          ...formData,
          thumbnail: finalImageUrl,
          stack: stackArray,
        });
      } else {
        await addDoc(collection(db, "projects"), {
          ...formData,
          thumbnail: finalImageUrl,
          stack: stackArray,
          createdAt: serverTimestamp()
        });
      }

      resetAndCloseForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    } finally {
      setIsSubmitting(false);
      setStatusText('');
    }
  };

  const handleEditClick = (project) => {
    setFormData({
      name: project.name,
      details: project.details,
      thumbnail: project.thumbnail,
      stack: project.stack ? project.stack.join(', ') : '', 
      live_link: project.live_link || '',
      github_link: project.github_link || '',
      video_link: project.video_link || '',
      featured: project.featured || false,
      priority: project.priority || 1 // NEW: Load priority
    });
    setEditingId(project.id);
    setImageMode('url'); 
    setPreviewUrl('');
    setSelectedFile(null);
    setIsAdding(true);
  };

  const resetAndCloseForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl('');
    setIsAdding(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project permanently?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const inputStyle = "w-full bg-black/40 text-white rounded-xl px-4 py-3 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.05] focus:outline-none transition-all duration-300 placeholder:text-slate-600 text-sm";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      
      <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight mb-2 flex items-center gap-3">
            <PiProjectorScreenChartFill className="text-purple-500" />
            Project Database
          </h1>
          <p className="text-slate-400 font-light">Manage, add, and update your portfolio projects.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          <PiPlusBold /> New Project
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#05001a] border border-purple-500/30 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.15)] relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button onClick={resetAndCloseForm} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors z-10">
                <PiXBold size={20} />
              </button>

              <form onSubmit={handleSubmit} className="relative mt-2">
                <h2 className="text-2xl font-bold mb-8 text-purple-400 italic pr-12">
                  {editingId ? "Edit Project Details" : "Initialize New Project"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-1">
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Project Name *</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className={inputStyle} placeholder="E.g. AI Content Generator" />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Priority (1 = Top)</label>
                    <input type="number" name="priority" value={formData.priority} onChange={handleChange} required className={inputStyle} min="1" />
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="flex justify-between items-end mb-2">
                      <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 block">Thumbnail *</label>
                      <div className="flex bg-black/60 rounded-lg p-1">
                        <button type="button" onClick={() => setImageMode('url')} className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase transition-all ${imageMode === 'url' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-white'}`}>URL</button>
                        <button type="button" onClick={() => setImageMode('upload')} className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase transition-all ${imageMode === 'upload' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-white'}`}>Upload</button>
                      </div>
                    </div>

                    {imageMode === 'url' ? (
                      <input name="thumbnail" value={formData.thumbnail} onChange={handleChange} required={imageMode === 'url' && !editingId} className={inputStyle} placeholder="https://..." />
                    ) : (
                      <div className="flex items-center gap-2">
                        <label className="flex-1 cursor-pointer bg-black/40 border border-dashed border-purple-500/50 hover:bg-purple-500/20 text-slate-400 hover:text-white transition-all rounded-xl p-2.5 text-center text-xs">
                          {selectedFile ? selectedFile.name : "Select file"}
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-white/10" />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Details *</label>
                  <textarea name="details" value={formData.details} onChange={handleChange} required rows={4} className={inputStyle} placeholder="Describe project..." />
                </div>

                <div className="mb-6">
                  <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Tech Stack (Comma Separated) *</label>
                  <input name="stack" value={formData.stack} onChange={handleChange} required className={inputStyle} placeholder="Next.js, Tailwind..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">Live Link</label>
                    <input name="live_link" value={formData.live_link} onChange={handleChange} className={inputStyle} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">GitHub</label>
                    <input name="github_link" value={formData.github_link} onChange={handleChange} className={inputStyle} placeholder="https://github.com/..." />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2 block">YouTube</label>
                    <input name="video_link" value={formData.video_link} onChange={handleChange} className={inputStyle} placeholder="https://youtube.com/..." />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8 bg-black/40 p-4 rounded-xl border border-white/5">
                  <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-purple-500 rounded cursor-pointer" />
                  <label htmlFor="featured" className="text-white text-sm font-medium cursor-pointer">Feature on Homepage</label>
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
                  {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {statusText}</> : editingId ? 'Save Changes' : 'Deploy Project Record'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
          <p className="text-slate-500 font-light">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-colors relative flex flex-col">
              <div className="h-40 w-full overflow-hidden relative">
                <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                   {project.featured && <div className="bg-purple-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-lg">Featured</div>}
                   <div className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-lg border border-white/10">Prio: {project.priority || 999}</div>
                </div>
                
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <button onClick={() => handleEditClick(project)} className="bg-black/60 backdrop-blur-md text-white p-2 rounded-lg hover:bg-purple-500 transition-colors"><PiPencilSimpleBold size={16} /></button>
                   <button onClick={() => handleDelete(project.id)} className="bg-black/60 backdrop-blur-md text-white p-2 rounded-lg hover:bg-red-500 transition-colors"><PiTrashBold size={16} /></button>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{project.details}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.stack?.map((tech, i) => (
                    <span key={i} className="text-[9px] bg-white/5 text-slate-300 px-2 py-1 rounded-md">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}