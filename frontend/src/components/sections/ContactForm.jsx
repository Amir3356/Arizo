import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ fullName: '', email: '', phone: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="order-2 lg:order-1"
    >
      <div 
        className="rounded-2xl p-6 sm:p-8 transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--bg3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)'
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--heading)]">
          Send Us a Message
        </h3>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--heading)]">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] placeholder:text-[var(--muted)]"
              style={{ 
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--heading)]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] placeholder:text-[var(--muted)]"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)'
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--heading)]">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+251 ..."
                className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] placeholder:text-[var(--muted)]"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)'
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--heading)]">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)] placeholder:text-[var(--muted)] resize-y"
              style={{ 
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            Send Message
            <span className="text-lg">→</span>
          </button>
        </form>
        
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-lg"
            style={{ 
              backgroundColor: 'rgba(0,212,170,0.1)',
              border: '1px solid var(--border)',
              color: 'var(--accent)'
            }}
          >
            ✓ Message sent! We'll get back to you shortly.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;