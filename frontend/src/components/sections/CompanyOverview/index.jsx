import React, { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import VantaBackground from './VantaBackground';
import useLenisScroll from './useLenisScroll';
import useGsapAnimations from './useGsapAnimations';
import CompanyHeader from './CompanyHeader';
import CompanyStats from './CompanyStats';
import TrustBadge from './TrustBadge';

const CompanyOverview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Lenis Smooth Scroll
  useLenisScroll();

  // GSAP Animations
  useGsapAnimations(sectionRef, titleRef, contentRef, statsRef, isInView, setIsVisible);

  const stats = [
    { number: '150+', label: 'Projects Delivered', icon: '🚀', color: '#00d4aa' },
    { number: '100%', label: 'Client Satisfaction', icon: '⭐', color: '#00d4aa' },
    { number: '50+', label: 'Active Clients', icon: '🏢', color: '#00d4aa' },
    { number: '24/7', label: 'Support Available', icon: '🕐', color: '#00d4aa' }
  ];

  return (
    <>
      <VantaBackground opacity={0.15} />
      
      <section 
        ref={sectionRef}
        className="relative min-h-screen py-28 px-[5%] overflow-hidden"
        style={{ 
          backgroundColor: 'transparent',
          perspective: '1500px',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
            {/* Left Column - Content */}
            <div ref={contentRef} className="space-y-8">
              <CompanyHeader isVisible={isVisible} />
              <TrustBadge isVisible={isVisible} />
            </div>

            {/* Right Column - Stats */}
            <CompanyStats stats={stats} statsRef={statsRef} isVisible={isVisible} />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CompanyOverview;