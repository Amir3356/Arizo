import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ScrollToHash from './components/common/ScrollToHash';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Project from './pages/Project';
import AdminPortfolio from './pages/AdminPortfolio';
import Contact from './pages/Contact';
import TestParticles from './components/TestParticles';
import ChatBot from './components/common/ChatBot';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const savedTheme = localStorage.getItem('ariva-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/project" element={<Project />} />
        <Route path="/portfolio" element={<Project />} />
        <Route path="/admin" element={<AdminPortfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test-particles" element={<TestParticles />} />
      </Routes>
      {!isAdminRoute && <ChatBot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;