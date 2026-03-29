import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const TelegramSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

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

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();
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
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Ariva Systems Solution"
        },
        body: JSON.stringify({
          "model": "openrouter/auto",
          "messages": [
            { 
              role: "system", 
              content: "You are an AI assistant for Ariva Systems Solutions, the leading tech firm in Ethiopia. You provide detailed information about these core services: \n\n" +
              "1. Website Design & Development across Ethiopia: We build mobile-first responsive designs, performance-optimized fast-loading sites, and intuitive UI/UX interfaces tailored to your business needs.\n" +
              "2. ERP System Development for Business Automation: We streamline workflows to eliminate manual tasks, manage resources (finance, HR, inventory) efficiently, and provide live data analytics dashboards. Our systems offer 99% uptime and can reduce costs by 40% while making operations 3x faster.\n" +
              "3. SEO Services in Addis Ababa: We specialize in local keyword research for the Ethiopian market, technical on-page optimization, and strategic link building to boost your Google rankings.\n" +
              "4. Digital Marketing & Custom Software: We manage high-conversion Facebook & Instagram campaigns, strategic social media marketing, and data-driven content creation to grow your brand.\n\n" +
              "📍 Location: Addis Ababa, Bole Getu Commercial 9th floor/910, Getu Commercial Center.\n" +
              "📞 Phone: +251 944636465 | ✉️ Email: tesfadebesay88@gmail.com\n" +
              "📱 Telegram: https://t.me/ArivaAI | 💬 WhatsApp: https://wa.me/message/XH44342TOTC2O1\n" +
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
      let displayError;
      const msg = error.message.toLowerCase();
      if (error.message.includes("401") || msg.includes("user not found")) {
        displayError = "The AI assistant is temporarily unavailable. Please contact us directly via Telegram or WhatsApp for immediate assistance!";
      } else if (msg.includes("429")) {
        displayError = "Too many requests right now. Please try again in a moment, or reach us on Telegram or WhatsApp.";
      } else if (msg.includes("500") || msg.includes("503")) {
        displayError = "Our AI service is temporarily down. Please contact us via Telegram or WhatsApp and we'll respond shortly!";
      } else {
        displayError = "Sorry, I'm having trouble connecting. Please reach us via Telegram or WhatsApp and we'll get back to you quickly!";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: displayError }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed z-[9999] font-jakarta pointer-events-none [&>*]:pointer-events-auto"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1.25rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-[4.5rem] right-0 w-[min(100vw-1.5rem,350px)] sm:w-[400px] max-h-[min(500px,calc(100dvh-6.5rem))] h-[min(500px,calc(100dvh-6.5rem))] bg-[var(--bg3)] backdrop-blur-2xl border border-[var(--border)] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transition-colors duration-300"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[rgba(0,212,170,0.15)] to-transparent border-b border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,212,170,0.3)]">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h3 className="text-[var(--text)] font-bold text-sm">Ariva Assistant</h3>
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
              <div className="flex gap-2">
                <a
                  href="https://t.me/ArivaAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,136,204,0.15)] border border-[rgba(0,136,204,0.3)] text-[#29b6f6] text-[10px] font-bold hover:bg-[rgba(0,136,204,0.25)] transition-colors"
                >
                  <TelegramSvg />
                  Telegram
                </a>
                <a
                  href="https://wa.me/message/XH44342TOTC2O1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(37,211,102,0.15)] border border-[rgba(37,211,102,0.3)] text-[#25d366] text-[10px] font-bold hover:bg-[rgba(37,211,102,0.25)] transition-colors"
                >
                  <WhatsAppSvg />
                  WhatsApp
                </a>
              </div>
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
                        : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-none transition-colors duration-300'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%] items-center bg-[var(--bg2)] p-3 rounded-2xl border border-[var(--border)]">
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
                className="flex-1 bg-transparent border border-[var(--border)] rounded-full px-5 py-2.5 text-xs text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
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
