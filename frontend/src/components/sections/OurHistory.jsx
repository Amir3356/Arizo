import React, { useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { History3DBackground } from './HistoryThree';
import { milestonesData, TimelineItem } from './HistoryData';
import { useGsapHistoryAnimations, fadeInUpVariants } from './HistoryAnimations';
import { HistoryProgress } from './HistoryProgress';
import { HistoryParticles } from './HistoryParticles';
import { useLenisSmoothScroll } from './HistoryLenis';

const OurHistory = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Initialize Lenis smooth scroll
  useLenisSmoothScroll();

  // GSAP Animations
  useGsapHistoryAnimations(sectionRef, titleRef, timelineRef, setProgress);

  // Framer Motion animations
  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-[5%] relative overflow-hidden bg-transparent"
      style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0,212,170,0.03) 0%, transparent 50%)' }}
    >
      {/* 3D Background */}
      <History3DBackground opacity={0.2} progress={progress} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span 
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
              style={{ 
                color: 'var(--accent)',
                backgroundColor: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.2)'
              }}
            >
              Our Journey
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
            Our History
          </h2>
        </div>

        {/* Progress Indicator */}
        <HistoryProgress progress={progress} />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Vertical Line with Animated Gradient */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden md:block">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent"
              style={{ height: `${progress * 100}%` }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--accent)]/20 to-transparent" />
          </div>
          
          <div className="space-y-12 md:space-y-0">
            {milestonesData.map((milestone, index) => (
              <TimelineItem
                key={index}
                year={milestone.year}
                title={milestone.title}
                description={milestone.description}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles Effect */}
        <HistoryParticles />
      </div>
    </section>
  );
};

export default OurHistory;