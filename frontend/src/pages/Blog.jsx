import React from 'react';
import Footer from '../components/common/Footer';

const Blog = () => {
  return (
    <>
      <section id="blog" className="py-20 px-[5%] bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title">Our Blog</h2>
          <p className="text-[var(--muted)]">Blog content coming soon...</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;