import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('ariva-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.style.borderBottomColor = window.scrollY > 50 ? 'var(--border)' : 'transparent';
      }
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
    { path: '/project', label: 'Project' },
    { path: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] px-[5%] h-[70px] flex items-center justify-between transition-colors duration-300">
        <Link to="/" className="logo font-jakarta font-bold text-2xl text-[var(--heading)] tracking-tight">
          Ariva<span className="text-[var(--accent)]">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                isActive(item.path) ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <div 
            className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={toggleTheme}
          >
            <span className="text-base leading-none">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
            <div className="w-11 h-6 bg-[var(--toggle-bg)] rounded-full relative border border-[var(--border)] transition-colors duration-300">
              <div 
                className={`w-[18px] h-[18px] rounded-full bg-[var(--toggle-thumb)] absolute top-[2px] transition-transform duration-300 shadow-md ${
                  theme === 'light' ? 'translate-x-[20px]' : 'translate-x-[3px]'
                }`}
              ></div>
            </div>
            <span className="text-xs font-medium text-[var(--muted)] font-jakarta">
              {theme === 'light' ? 'Light' : 'Dark'}
            </span>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <div 
            className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full px-2.5 py-1.5 cursor-pointer transition-all duration-300"
            onClick={toggleTheme}
          >
            <span className="text-sm leading-none">
              {theme === 'light' ? '☀️' : '🌙'}
            </span>
            <span className="text-[10px] font-medium text-[var(--muted)] font-jakarta">
              {theme === 'light' ? 'Light' : 'Dark'}
            </span>
          </div>
          
          <div className="mobile-menu-btn flex flex-col gap-1 cursor-pointer" onClick={toggleMenu}>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={{ top: '70px' }}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>
        
        <div 
          className={`absolute right-0 top-0 bottom-0 w-64 bg-[var(--nav-bg)] backdrop-blur-xl border-l border-[var(--border)] transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col py-8 px-6 gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors py-3 px-4 rounded-lg hover:bg-[rgba(0,212,170,0.1)] ${
                  isActive(item.path) ? 'text-[var(--accent)] bg-[rgba(0,212,170,0.1)]' : 'text-[var(--text)]'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;