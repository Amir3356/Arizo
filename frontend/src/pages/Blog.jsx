import React from 'react';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';
import { motion } from 'framer-motion';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of ERP Systems in Ethiopia',
      excerpt: 'Discover how modern ERP solutions are transforming Ethiopian businesses and driving digital transformation across industries.',
      date: 'March 15, 2024',
      author: 'Tesfalidet Debesay',
      category: 'ERP Solutions',
      readTime: '5 min read',
      icon: '⚙️'
    },
    {
      id: 2,
      title: '10 Tips for Building a High-Performance Website',
      excerpt: 'Learn the essential strategies for creating fast, responsive, and user-friendly websites that rank well on search engines.',
      date: 'March 10, 2024',
      author: 'Henok Belachew',
      category: 'Web Development',
      readTime: '4 min read',
      icon: '🌐'
    },
    {
      id: 3,
      title: 'Why SEO Matters for Ethiopian Businesses',
      excerpt: 'Understanding the importance of search engine optimization and how it can help your business reach more customers.',
      date: 'March 5, 2024',
      author: 'Hiwot Adugna',
      category: 'SEO',
      readTime: '6 min read',
      icon: '🔍'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategies That Work in Ethiopia',
      excerpt: 'Explore effective digital marketing techniques tailored for the Ethiopian market to grow your brand online.',
      date: 'February 28, 2024',
      author: 'Hiwot Adugna',
      category: 'Digital Marketing',
      readTime: '7 min read',
      icon: '📢'
    },
    {
      id: 5,
      title: 'The Importance of Brand Identity in 2024',
      excerpt: 'How strong branding can differentiate your business and create lasting connections with customers.',
      date: 'February 20, 2024',
      author: 'Hemen Aklilu',
      category: 'Branding',
      readTime: '4 min read',
      icon: '🎨'
    },
    {
      id: 6,
      title: 'Custom Software vs. Off-the-Shelf Solutions',
      excerpt: 'Comparing the benefits of custom-built software versus ready-made solutions for your business needs.',
      date: 'February 15, 2024',
      author: 'Tesfalidet Debesay',
      category: 'Software Development',
      readTime: '5 min read',
      icon: '💻'
    }
  ];

  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-[5%] bg-transparent">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full inline-block mb-4"
                style={{ 
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(0,212,170,0.1)',
                  border: '1px solid rgba(0,212,170,0.2)'
                }}
              >
                Our Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[var(--heading)]">
                Insights & <span style={{ color: 'var(--accent)' }}>Updates</span>
              </h1>
              <p className="text-lg text-[var(--text)] max-w-2xl mx-auto">
                Stay updated with the latest trends in technology, digital transformation, and business growth strategies
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 px-[5%]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer relative"
                >
                  {/* Glowing border hover effect (Adapts to light/dark mode) */}
                  <div className="absolute -inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[3px] pointer-events-none
                                  bg-gradient-to-r from-[var(--accent)] to-cyan-400 dark:from-[var(--accent)] dark:to-cyan-400
                                  [data-theme='light']_&_from-[var(--accent)] [data-theme='light']_&_to-teal-500 [data-theme='light']_&_opacity-0 [data-theme='light']_&_group-hover:opacity-[0.85]" 
                  />

                  <div 
                    className="relative z-10 bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden hover:border-transparent transition-all duration-300 h-full shadow-lg hover:shadow-xl"
                  >
                    <div className="p-6">
                      {/* Category and Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span 
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: 'rgba(0,212,170,0.1)',
                            color: 'var(--accent)'
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="text-2xl">{post.icon}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[var(--text)] opacity-80 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <div>
                          <p className="text-xs text-[var(--muted)]">{post.author}</p>
                          <p className="text-xs text-[var(--muted)] opacity-70">{post.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[var(--muted)]">{post.readTime}</span>
                          <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Coming Soon Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ 
                  backgroundColor: 'rgba(0,212,170,0.05)',
                  border: '1px solid rgba(0,212,170,0.2)'
                }}
              >
                <span className="text-xl">📝</span>
                <span className="text-sm text-[var(--text)]">More articles coming soon. Stay tuned!</span>
                <span className="text-xl">✨</span>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;