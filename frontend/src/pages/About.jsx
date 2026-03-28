import React from 'react';
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

const About = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <CompanyOverview />
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