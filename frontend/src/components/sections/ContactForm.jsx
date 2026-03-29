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
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.phone ? `Phone: ${formData.phone}` : '',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setShowSuccess(true);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
            <span className="text-lg">{isLoading ? '⏳' : '→'}</span>
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
        
        {showError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-lg"
            style={{ 
              backgroundColor: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
              color: '#dc2626'
            }}
          >
            ✗ Failed to send message. Please try again later.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;