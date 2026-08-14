"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Use environment variable for the API URL, fallback to localhost for local testing
const api_url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Ajee's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Generate or retrieve a unique thread ID that survives page refreshes
  const [threadId] = useState(() => {
    if (typeof window !== "undefined") {
      const existingId = sessionStorage.getItem("ajee_chat_session");
      if (existingId) return existingId;

      const newId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : 'session_' + Math.random().toString(36).substr(2, 9);
      
      sessionStorage.setItem("ajee_chat_session", newId);
      return newId;
    }
    return "default_ssr_session";
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // NEW: Keep-Awake Ping Logic for Render
  useEffect(() => {
    const keepAwake = async () => {
      try {
        await fetch(`${api_url}/health`); 
        console.log("Pinged backend to keep it awake 🚀");
      } catch (error) {
        console.error("Failed to ping backend:", error);
      }
    };

    keepAwake();
    const interval = setInterval(keepAwake, 480000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Add an empty assistant message placeholder to hold the typing dots / incoming stream
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(`${api_url}/api/chat`, {
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
        <div className="mb-4 w-80 sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right
          bg-white border-slate-200 shadow-2xl rounded-2xl
          dark:bg-[#0a0514]/95 dark:backdrop-blur-xl dark:border-purple-500/20 dark:border"
        >
          
          {/* Header */}
          <div className="p-4 flex justify-between items-center shrink-0 border-b transition-colors duration-300
            bg-slate-50 border-slate-200 text-slate-900
            dark:bg-white/5 dark:border-purple-500/20 dark:text-white"
          >
            <div>
              <h3 className="font-bold text-lg bg-clip-text text-transparent transition-all duration-300
                bg-gradient-to-r from-blue-600 to-indigo-600
                dark:from-purple-400 dark:to-blue-400"
              >
                Ajee AI
              </h3>
              <p className="text-xs transition-colors duration-300 text-slate-500 dark:text-gray-400">Ask about my portfolio</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 rounded-full transition-colors duration-300
                text-slate-400 hover:bg-slate-200 hover:text-slate-600
                dark:text-gray-300 dark:hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent
            scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400
            dark:scrollbar-thumb-purple-600/50 dark:hover:scrollbar-thumb-purple-400/80"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm leading-relaxed transition-colors duration-300 ${
                    msg.role === "user" 
                      ? "rounded-2xl rounded-br-sm text-white shadow-md bg-blue-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-blue-600 dark:shadow-purple-900/20" 
                      : "rounded-2xl rounded-bl-sm border bg-slate-100 border-slate-200 text-slate-800 dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
                  }`}
                >
                  {/* Render raw text for user, typing indicator for empty AI bubble, or Markdown for finished/streaming AI text */}
                  {msg.role === "user" ? (
                    msg.content
                  ) : msg.content === "" && isTyping ? (
                    <div className="flex gap-1.5 items-center h-5 px-2">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-blue-500 dark:bg-purple-400"></span>
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce delay-75 bg-blue-500 dark:bg-purple-400"></span>
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce delay-150 bg-blue-500 dark:bg-purple-400"></span>
                    </div>
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="marker:text-blue-500 dark:marker:text-purple-400" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
                        a: ({node, ...props}) => <a className="underline underline-offset-2 transition-colors text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center gap-2 shrink-0 transition-colors duration-300
            bg-slate-50 border-slate-200
            dark:bg-black/20 dark:border-purple-500/20"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 text-sm transition-all duration-300
                bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500
                dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:focus:ring-purple-500"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-full text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md
                bg-blue-600 hover:bg-blue-700
                dark:bg-gradient-to-r dark:from-purple-600 dark:to-blue-600 dark:shadow-purple-900/30"
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
          className="p-4 text-white rounded-full transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group
            bg-blue-600 hover:bg-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.4)]
            dark:bg-gradient-to-r dark:from-purple-600 dark:to-blue-600 dark:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <MessageCircle size={28} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;