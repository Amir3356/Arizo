import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, content, icon }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000]"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[2001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="pointer-events-auto w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(15, 21, 38, 0.98) 0%, rgba(10, 14, 26, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,170,0.3)',
                scrollbarWidth: 'thin'
              }}
            >
              {/* Custom Scrollbar Styles */}
              <style jsx>{`
                .modal-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .modal-scroll::-webkit-scrollbar-track {
                  background: rgba(255,255,255,0.05);
                  border-radius: 3px;
                }
                .modal-scroll::-webkit-scrollbar-thumb {
                  background: var(--accent);
                  border-radius: 3px;
                }
              `}</style>
              
              <div className="modal-scroll">
                {/* Header with Gradient Accent */}
                <div className="relative p-6 pb-0">
                  <div 
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
                  />
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group"
                    style={{ 
                      backgroundColor: 'rgba(0,212,170,0.1)',
                      border: '1px solid rgba(0,212,170,0.3)'
                    }}
                  >
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--accent)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ 
                        backgroundColor: 'rgba(0,212,170,0.15)',
                        border: '1px solid rgba(0,212,170,0.3)'
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h2 
                        className="text-2xl md:text-3xl font-bold"
                        style={{ color: 'var(--heading)' }}
                      >
                        {title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                          Premium Service
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-0 space-y-6">
                  {content.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: 'rgba(0,212,170,0.1)' }}
                        >
                          <span className="text-sm" style={{ color: 'var(--accent)' }}>
                            {index === 0 ? '✨' : '🎯'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 
                            className="text-lg md:text-xl font-semibold mb-2"
                            style={{ color: 'var(--accent)' }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                            {item.description}
                          </p>
                          {item.bullets && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                              {item.bullets.map((bullet, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + (idx * 0.05) }}
                                  className="flex items-center gap-2 p-2 rounded-lg"
                                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                >
                                  <svg 
                                    className="w-4 h-4 flex-shrink-0"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    style={{ color: 'var(--accent)' }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-xs md:text-sm" style={{ color: 'var(--muted)' }}>
                                    {bullet}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer with CTA */}
                <div className="sticky bottom-0 p-6 border-t" style={{ 
                  borderColor: 'rgba(255,255,255,0.1)',
                  background: 'linear-gradient(to top, rgba(15,21,38,0.98), rgba(15,21,38,0.95))',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,170,0.1)' }}>
                        <span className="text-lg">💬</span>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>Ready to get started?</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--heading)' }}>Let's discuss your project</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        style={{ 
                          border: '1px solid rgba(255,255,255,0.2)',
                          backgroundColor: 'transparent',
                          color: 'var(--muted)'
                        }}
                      >
                        Close
                      </button>
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                        style={{ 
                          backgroundColor: 'var(--accent)',
                          color: 'var(--bg)'
                        }}
                      >
                        Get Started
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;