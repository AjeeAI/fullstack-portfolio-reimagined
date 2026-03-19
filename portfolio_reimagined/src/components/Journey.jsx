'use client';

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, drawLine } from "@/utils/variants";

const Journey = () => {
  // SHARED PURPLE GLASS STYLE
  const glassCardStyle = "bg-white/[0.08] backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl transition-all duration-500 hover:border-purple-500/50 hover:bg-white/[0.12] group";

  const journeyData = [
    {
      title: "AI-Integrated Web & Mobile Apps",
      label: "Innovation",
      side: "left",
      details: "Built cross-platform applications integrating complex features and LLM-driven intelligence, enabling smart data processing and real-time multimodal inputs.",
      highlights: ["End-to-end development with OpenAI/Gemini APIs", "FastAPI/Node for complex data flow management", "Optimized for intelligence and responsiveness"],
      tags: ['Next.js 15', 'OpenAI', 'Flutter']
    },
    {
      title: "Secure IoT & Smart Architectures",
      label: "Security",
      side: "right",
      details: "Implemented advanced authentication using Mutually Orthogonal Latin Squares to enhance the security of connected devices and data pipelines.",
      highlights: ["Robust authentication for distributed systems", "Security analysis on AI endpoints", "Mathematical logic applied to engineering"],
      tags: ['IoT', 'MOLS', 'Python']
    },
    {
      title: "Web & AI Backend Integration",
      label: "Fullstack",
      side: "left",
      details: "Designed and deployed scalable applications using Next.js and React, backed by intelligent server-side logic and database management.",
      highlights: ["FastAPI and MySQL for scalable storage", "API creation for AI model interoperability", "Clean architecture & prompt engineering"],
      tags: ['React', 'FastAPI', 'Vector DB']
    },
    {
      title: "Real-World AI Challenges",
      label: "UX Focus",
      side: "right",
      details: "Developed solutions bridging the gap between human needs and AI capabilities through smart interactive tools and multimedia dashboards.",
      highlights: ["UX for complex AI interaction", "Handling multimodal inputs (audio/GPS)", "Rapid AI use-case validation"],
      tags: ['RAG', 'UX Design', 'Multimedia']
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-32 relative z-10 font-outfit">
      
      {/* SECTION HEADER ANIMATION */}
      <motion.div 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center mb-20"
      >
        <span className="text-purple-500 font-bold text-xs uppercase tracking-[0.4em] mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">The Roadmap</span>
        <h2 className="text-white font-bold text-4xl lg:text-5xl italic tracking-tight">My Journey</h2>
      </motion.div>

      {/* === DESKTOP TIMELINE === */}
      <div className="hidden md:block relative">
        
        {/* 1. ANIMATED CENTER LINE (Draws on Scroll) */}
        <motion.div 
          variants={drawLine}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent -translate-x-1/2 origin-top"
        />

        <motion.div 
          variants={staggerContainer(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {journeyData.map((item, idx) => (
            <div key={idx} className={`relative flex items-center justify-between mb-24 ${item.side === 'right' ? 'flex-row-reverse' : ''}`}>
              
              {/* Card Side */}
              <motion.div 
                variants={fadeIn(item.side === 'left' ? 'right' : 'left', 0.2)}
                className="w-[45%]"
              >
                <div className={`${glassCardStyle} ${item.side === 'left' ? 'text-right' : 'text-left'}`}>
                  <span className="text-purple-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">{item.label}</span>
                  <p className="text-white font-bold text-2xl mb-3 italic">{item.title}</p>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm mb-4">{item.details}</p>
                  
                  <div className={`flex flex-col ${item.side === 'left' ? 'items-end' : 'items-start'}`}>
                    <p className="text-white font-bold text-[10px] uppercase mb-2 tracking-widest">Key highlights:</p>
                    <ul className="text-purple-100/60 text-[11px] space-y-1 list-none">
                      {item.highlights.map((h, i) => (
                        <li key={i}>{item.side === 'left' ? `${h} •` : `• ${h}`}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`mt-6 flex flex-wrap gap-2 ${item.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 2. THE CENTER DOT (Glows as it enters) */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  className={`h-px w-10 bg-gradient-to-r ${item.side === 'left' ? 'from-purple-500 to-transparent' : 'from-transparent to-purple-500'}`} 
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] border-2 border-white z-20"
                />
              </div>

              {/* Empty Space for the other side */}
              <div className="w-[45%]"></div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* === MOBILE LAYOUT (Stack with Vertical Left Line) === */}
      <div className="md:hidden relative border-l border-purple-500/30 pl-8 ml-2 space-y-12">
        {journeyData.map((card, idx) => (
          <motion.div 
            key={idx}
            variants={fadeIn("up", idx * 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${glassCardStyle} relative`}
          >
            {/* Mobile Dot */}
            <div className="absolute -left-[37px] top-8 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,1)] border-2 border-white"></div>
            
            <span className="text-purple-500 font-bold text-[10px] uppercase tracking-widest mb-2 block">{card.label}</span>
            <p className="text-white font-bold text-xl italic">{card.title}</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed font-light">{card.details}</p>
            
            <div className="mt-5 flex flex-wrap gap-2">
                {card.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    {tag}
                  </span>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Journey;