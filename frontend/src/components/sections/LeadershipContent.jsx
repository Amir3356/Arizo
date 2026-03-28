import React from 'react';
import { motion } from 'framer-motion';
import { cardHoverVariants, imageHoverVariants, textHoverVariants } from './LeaderWebflow';
import hiwotImg from '../../assets/Hiwot Adugna Content creator.jpg';
import henokImg from '../../assets/Henok Belachew Fullstack Developer.jpg';
import hemenImg from '../../assets/Hemen Aklilu Customer Support.jpg';
import tesfalidetImg from '../../assets/Tesfalidet Debesay Founder, G.Manager.jpg';

// Leadership Data
export const leadershipData = [
  {
    name: 'Tesfalidet Debesay',
    title: 'Founder & General Manager',
    company: 'Ariva Systems Solutions',
    description: 'Visionary leader with extensive experience in software development and business management, driving Ariva Systems Solutions towards excellence in the Ethiopian tech industry.',
    image: tesfalidetImg,
    icon: '👨‍💼',
    role: 'Executive Leadership'
  },
  {
    name: 'Hiwot Adugna',
    title: 'Content Creator & Marketing Specialist',
    company: 'Ariva Systems Solutions',
    description: 'Creative content strategist specializing in digital marketing, brand storytelling, and engaging content creation that connects businesses with their target audience.',
    image: hiwotImg,
    icon: '🎨',
    role: 'Management Team'
  },
  {
    name: 'Henok Belachew',
    title: 'Full Stack Developer',
    company: 'Ariva Systems Solutions',
    description: 'Expert full-stack developer with proficiency in modern web technologies, delivering robust and scalable applications that meet client requirements.',
    image: henokImg,
    icon: '💻',
    role: 'Management Team'
  },
  {
    name: 'Hemen Aklilu',
    title: 'Customer Support Specialist',
    company: 'Ariva Systems Solutions',
    description: 'Dedicated customer support professional committed to ensuring client satisfaction through timely responses, problem-solving, and exceptional service delivery.',
    image: hemenImg,
    icon: '🤝',
    role: 'Management Team'
  }
];

// Executive Card Component
export const ExecutiveCard = ({ leader, controls, staggerContainer }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-all group cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-48 lg:w-56 h-64 md:h-auto overflow-hidden relative"
          whileHover="hover"
          variants={imageHoverVariants}
        >
          <img 
            src={leader.image} 
            alt={leader.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += `
                <div class="w-full h-full flex items-center justify-center text-5xl" style="background: rgba(0,212,170,0.1)">
                  ${leader.icon}
                </div>
              `;
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>
        
        <div className="flex-1 p-6">
          <motion.h3 
            className="text-xl font-bold mb-1 text-white"
            whileHover="hover"
            variants={textHoverVariants}
          >
            {leader.name}
          </motion.h3>
          <p className="text-sm text-white mb-2">{leader.title}</p>
          <p className="text-xs text-white mb-3">{leader.company}</p>
          <p className="text-sm text-white leading-relaxed">{leader.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Management Card Component
export const ManagementCard = ({ leader, controls, fadeInUpVariants }) => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className="bg-[rgba(20,27,48,0.9)] backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-all group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <motion.div 
          className="w-full h-64 overflow-hidden"
          whileHover="hover"
          variants={imageHoverVariants}
        >
          <img 
            src={leader.image} 
            alt={leader.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += `
                <div class="w-full h-full flex items-center justify-center text-5xl" style="background: rgba(0,212,170,0.1)">
                  ${leader.icon}
                </div>
              `;
            }}
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-lg font-bold mb-1 text-white"
          whileHover="hover"
          variants={textHoverVariants}
        >
          {leader.name}
        </motion.h3>
        <p className="text-sm text-white mb-2">{leader.title}</p>
        <p className="text-xs text-white mb-3">{leader.company}</p>
        <p className="text-sm text-white leading-relaxed">{leader.description}</p>
      </div>
    </motion.div>
  );
};

// Default export
export default {
  leadershipData,
  ExecutiveCard,
  ManagementCard
};