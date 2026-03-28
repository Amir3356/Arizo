import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm the Ariva AI Assistant. How can I help you with your IT or software needs in Ethiopia today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: "API Configuration error: I can't find your Key. Please completely stop and restart your terminal/dev server (npm run dev) so I can load the .env file!" }]);
      setIsLoading(false);
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Diagnostic log
      console.log("ChatBot: Sending request to OpenRouter...");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openrouter/free",
          "messages": [
            { 
              role: "system", 
              content: "You are an AI assistant for Ariva Systems Solutions, the leading tech firm in Ethiopia. You provide detailed information about these core services: \n\n" +
              "1. Website Design & Development across Ethiopia: We build mobile-first responsive designs, performance-optimized fast-loading sites, and intuitive UI/UX interfaces tailored to your business needs.\n" +
              "2. ERP System Development for Business Automation: We streamline workflows to eliminate manual tasks, manage resources (finance, HR, inventory) efficiently, and provide live data analytics dashboards. Our systems offer 99% uptime and can reduce costs by 40% while making operations 3x faster.\n" +
              "3. SEO Services in Addis Ababa: We specialize in local keyword research for the Ethiopian market, technical on-page optimization, and strategic link building to boost your Google rankings.\n" +
              "4. Digital Marketing & Custom Software: We manage high-conversion Facebook & Instagram campaigns, strategic social media marketing, and data-driven content creation to grow your brand.\n\n" +
              "📍 Location: Dembel City Center, Addis Ababa, Ethiopia.\n" +
              "Your core leadership team: Tesfalidet Debesay (Founder & G.Manager), Rosa Awel (Sales & Marketing), Henok Belachew (Fullstack Developer), Hiwot Adugna (Content Creator), and Hemen Aklilu (Customer Support).\n\n" +
              "Your tone is professional, innovative, and friendly. Emphasize Ariva's role as a digital pioneer in Ethiopia. Keep responses concise and helpful." 
            },
            ...messages,
            userMessage
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const specificError = errorData?.error?.message || `Status ${response.status}`;
        console.error("OpenRouter API Error:", response.status, errorData);
        throw new Error(specificError);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("ChatBot Technical Error Details:", error);
      const displayError = error.message.includes("401") 
        ? "Error 401: Your API Key appears to be invalid or unauthenticated." 
        : `Connection Error: ${error.message}`;
      setMessages(prev => [...prev, { role: 'assistant', content: displayError }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000] font-jakarta">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[rgba(20,27,48,0.95)] backdrop-blur-2xl border border-[var(--border)] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[rgba(0,212,170,0.2)] to-transparent border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,212,170,0.3)]">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ariva Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest">AI Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[var(--muted)] hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth custom-scrollbar">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.role === 'user' ? 'bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]' : 'bg-[rgba(0,212,170,0.1)] text-[var(--accent)]'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[var(--accent)] text-white font-medium rounded-tr-none' 
                        : 'bg-[rgba(255,255,255,0.05)] border border-[var(--border)] text-white/90 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] items-center bg-[rgba(255,255,255,0.03)] p-3 rounded-2xl border border-[var(--border)]">
                    <Loader2 size={16} className="text-[var(--accent)] animate-spin" />
                    <span className="text-[11px] text-[var(--muted)] font-medium italic">Assistant is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[var(--surface)] border-t border-[var(--border)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Ariva's services..."
                className="flex-1 bg-transparent border border-[var(--border)] rounded-full px-5 py-2.5 text-xs text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] disabled:opacity-50 disabled:hover:shadow-none transition-all shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-2xl relative overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated Ripple Effect */}
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
      </motion.button>
    </div>
  );
};

export default ChatBot;
