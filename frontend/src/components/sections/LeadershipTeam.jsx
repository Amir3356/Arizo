import React, { useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';
import LeaderThree from './LeaderThree';
import { LeaderHeader, SectionTitle } from './LeaderWebflow';
import { useGsapAnimations, fadeInUpVariants, staggerContainer } from './LeaderGsap';
import { leadershipData, ExecutiveCard, ManagementCard } from './LeadershipContent';

const LeadershipTeam = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const executivesRef = useRef(null);
  const managementRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const executives = leadershipData.filter(l => l.role === 'Executive Leadership');
  const managementTeam = leadershipData.filter(l => l.role === 'Management Team');

  // Apply GSAP animations
  useGsapAnimations(titleRef, executivesRef, managementRef, sectionRef);

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section ref={sectionRef} className="py-20 px-[5%] relative overflow-hidden bg-transparent">
      {/* 3D Background */}
      <LeaderThree opacity={0.2} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <LeaderHeader 
          controls={controls}
          fadeInUpVariants={fadeInUpVariants}
        />

        {/* Executive Section */}
        <div className="mb-16">
          <SectionTitle title="Executive Leadership" count={`${executives.length} Leader`} delay={0.6} />
          
          <div ref={executivesRef} className="grid md:grid-cols-2 gap-6">
            {executives.map((leader, index) => (
              <ExecutiveCard 
                key={index}
                leader={leader}
                controls={controls}
                staggerContainer={staggerContainer}
              />
            ))}
          </div>
        </div>

        {/* Management Team Section */}
        <div>
          <SectionTitle title="Management Team" count={`${managementTeam.length} Members`} delay={0.7} />
          
          <div ref={managementRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementTeam.map((leader, index) => (
              <ManagementCard 
                key={index}
                leader={leader}
                controls={controls}
                fadeInUpVariants={fadeInUpVariants}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;