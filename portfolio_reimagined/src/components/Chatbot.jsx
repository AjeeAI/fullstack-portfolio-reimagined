"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
// NEW: Import ReactMarkdown
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Ajee's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [threadId] = useState(() => {
    return typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : 'session_' + Math.random().toString(36).substr(2, 9);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          thread_id: threadId 
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentAiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        currentAiText += chunk;

        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].content = currentAiText;
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Failed to fetch chat:", error);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].content = "Sorry, I'm having trouble connecting right now. Please try again later!";
        return updatedMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0a0514]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-white/5 border-b border-purple-500/20 p-4 flex justify-between items-center text-white shrink-0">
            <div>
              <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Ajee AI</h3>
              <p className="text-xs text-gray-400">Ask about my portfolio</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-gray-300 p-1.5 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl rounded-br-sm shadow-lg shadow-purple-900/20" 
                      : "bg-white/5 border border-white/10 text-gray-200 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {/* NEW: Render Markdown for AI, raw text for the user */}
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="marker:text-purple-400" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1].role === "user" && (
               <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center h-10">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-black/20 border-t border-purple-500/20 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm transition-all"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2.5 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/30"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* --- FLOATING ACTION BUTTON --- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        >
          <MessageCircle size={28} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;