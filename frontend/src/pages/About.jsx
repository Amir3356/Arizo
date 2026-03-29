import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/common/Footer';
import ParticlesBackground from '../components/common/ParticlesBackground';
import CompanyOverview from '../components/sections/CompanyOverview/index';
import PurposeMissionVision from '../components/sections/PurposeMissionVision';
import CoreValues from '../components/sections/CoreValues';
import LeadershipTeam from '../components/sections/LeadershipTeam';
import OurHistory from '../components/sections/OurHistory';
import CompanyImpact from '../components/sections/CompanyImpact';
import OurCulture from '../components/sections/OurCulture';
import WorkWithUs from '../components/sections/WorkWithUs';

const MarqueeStrip = () => {
  const marqueeItems = [
    '🚀 150+ Projects Delivered',
    '⭐ 100% Client Satisfaction',
    '🏢 50+ Active Clients',
    '🕐 24/7 Support',
    '🏆 Top-rated in Ethiopia',
    '💡 Innovative Solutions',
  ];

  return (
    <div className="relative overflow-hidden py-4 border-y border-[rgba(0,212,170,0.2)] bg-[rgba(0,212,170,0.03)]">
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="text-[var(--accent)] font-semibold text-sm tracking-wide flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <CompanyOverview />
        <MarqueeStrip />
        <PurposeMissionVision />
        <CoreValues />
        <LeadershipTeam />
        <OurHistory />
        <CompanyImpact />
        <OurCulture />
        <WorkWithUs />
        <Footer />
      </div>
    </>
  );
};

export default About;