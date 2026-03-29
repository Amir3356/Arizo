import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('ariva-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ariva-theme', newTheme);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/project', label: 'Portfolio' },  
    { path: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center transition-all duration-500 ease-in-out px-[5%] ${
          scrolled ? 'pt-4' : 'pt-0'
        }`}
      >
        <div 
          className={`relative flex items-center justify-between w-full max-w-7xl h-[70px] transition-all duration-500 ease-in-out px-6 sm:px-10 ${
            scrolled 
              ? 'bg-[var(--nav-bg)] backdrop-blur-2xl border border-[var(--border)] rounded-full shadow-2xl' 
              : 'bg-transparent border-b border-[var(--border)]'
          }`}
          style={{
            boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className="logo group flex items-center gap-2 font-jakarta font-black text-xl sm:text-2xl tracking-tighter"
          >
            <span className="text-[var(--heading)]">Ariva</span>
            <span className="relative text-[var(--accent)] overflow-hidden">
              Systems
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)]"
                initial={{ x: '-101%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <span className="hidden sm:inline text-[var(--muted)] text-sm font-medium tracking-normal ml-1">Solutions</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/5 dark:bg-black/20 rounded-full p-1 border border-white/10">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-[13px] font-black uppercase tracking-widest transition-all duration-300 rounded-full group ${
                    isActive(item.path) ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--accent)]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Underline expansion on hover */}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-1/3 ${isActive(item.path) ? 'hidden' : ''}`} />
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="w-[1px] h-6 bg-[var(--border)] mx-4" />
            
            {/* Theme Toggle Button */}
            <button 
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] group overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(0,212,170,0.2)]"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ y: 20, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl"
                >
                  {theme === 'light' ? '☀️' : '🌙'}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Right Menu Group */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-lg"
              onClick={toggleTheme}
            >
              {theme === 'light' ? '☀️' : '🌙'}
            </button>
            
            <button 
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[1100]" 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span className={`w-6 h-[2px] bg-[var(--text)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-[var(--text)] transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-[var(--text)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1050] lg:hidden bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="logo font-black text-3xl text-white mb-8"
              >
                Ariva <span className="text-[var(--accent)]">Systems</span>
              </motion.div>
              
              <div className="flex flex-col items-center gap-4 w-full">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      to={item.path}
                      className={`block w-full text-center py-4 text-2xl font-black uppercase tracking-widest transition-all ${
                        isActive(item.path) ? 'text-[var(--accent)]' : 'text-white/70 hover:text-white'
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-[var(--muted)] text-sm font-bold uppercase tracking-widest"
              >
                Ethiopia's Tech Future
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;