import React from 'react';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';

const Blog = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <section id="blog" className="py-20 px-[5%] min-h-screen">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="section-title">Our Blog</h2>
            <p className="text-[var(--muted)]">Blog content coming soon...</p>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Blog;