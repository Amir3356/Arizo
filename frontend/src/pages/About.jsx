import React from 'react';
import Footer from '../components/common/Footer';
import CompanyOverview from '../components/sections/CompanyOverview';
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
      <CompanyOverview />
      <PurposeMissionVision />
      <CoreValues />
      <LeadershipTeam />
      <OurHistory />
      <CompanyImpact />
      <OurCulture />
      <WorkWithUs />
      <Footer />
    </>
  );
};

export default About;