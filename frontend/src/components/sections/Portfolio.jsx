import React from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const websiteProjects = [
    {
      name: 'Exporting Gratia',
      url: 'https://www.exportinggratia.com/',
      description: 'Export management solutions platform',
      category: 'E-commerce & Export'
    },
    {
      name: 'Yosamme Charonics Technology',
      url: 'https://yosammecharonicstechnologysolutions.com/',
      description: 'Technology solutions and services',
      category: 'Tech Solutions'
    },
    {
      name: 'Almigan',
      url: 'https://almigan.ae/',
      description: 'Business consulting and services',
      category: 'Consulting'
    },
    {
      name: 'Elway Consultancy',
      url: 'https://www.elwayconsultancy.com/',
      description: 'Professional consultancy services',
      category: 'Consulting'
    },
    {
      name: 'Zigeba House Agent',
      url: 'https://zigebahouseagent.com/',
      description: 'Real estate and property management',
      category: 'Real Estate'
    },
    {
      name: 'Measho Tours',
      url: 'https://meashotours.com/',
      description: 'Travel and tourism services',
      category: 'Tourism'
    }
  ];

  const erpProjects = [
    {
      name: 'Addis Ketema Building',
      description: 'Comprehensive ERP solution for building management',
      features: ['Tenant Management', 'Payment Processing', 'Maintenance Tracking'],
      icon: '🏢'
    },
    {
      name: 'Pangea School',
      description: 'Complete school management ERP system',
      features: ['Student Information', 'Grade Management', 'Parent Portal', 'Fee Collection'],
      icon: '🏫'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 px-[5%] relative min-h-screen" style={{ backgroundColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Our Work
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Portfolio <span style={{ color: 'var(--accent)' }}>Showcase</span>
          </h2>
          
          <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            We proudly showcase our work in website design, ERP software, mobile applications, and branding services
          </p>
        </div>

        {/* Website Projects Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
              🌐
            </div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--heading)' }}>
              Website Design & Development Projects
            </h3>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {websiteProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => handleProjectClick(project.url)}
                className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{ 
                  backgroundColor: 'rgba(20,27,48,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,212,170,0.1)'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}
                  >
                    🌐
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'rgba(0,212,170,0.1)',
                    color: 'var(--accent)'
                  }}>
                    {project.category}
                  </span>
                </div>
                
                <h4 className="text-base sm:text-lg font-bold mb-2 text-white group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h4>
                
                <p className="text-xs sm:text-sm text-white/60 mb-3">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
                  <span>View Project</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ERP Projects Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
              ⚙️
            </div>
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--heading)' }}>
              ERP Software Projects
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {erpProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group rounded-xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ 
                  backgroundColor: 'rgba(20,27,48,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,212,170,0.1)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {project.name}
                    </h4>
                    <p className="text-xs text-white/60">{project.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'rgba(0,212,170,0.1)',
                        color: 'var(--muted)'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;