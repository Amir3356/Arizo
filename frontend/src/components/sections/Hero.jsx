import React from 'react';
import ParticlesBackground from '../common/ParticlesBackground';
import HeroContent from './HeroContent';
import Hero3DScene from './Hero3DScene';
import useCanvasDimensions from '../../hooks/useCanvasDimensions';
import useWebGLError from '../../hooks/useWebGLError';

const Hero = () => {
  const canvasSize = useCanvasDimensions();
  const webGLError = useWebGLError();

  return (
    <section 
      id="home" 
      className="relative min-h-screen lg:h-[90vh] flex items-center pt-[70px] pb-12 md:pb-16 lg:pb-0 overflow-hidden bg-transparent"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Hero Content Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-[5%] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 relative z-10">
        
        {/* Left Side - Text Content */}
        <HeroContent />
        
        {/* Right Side - 3D Image */}
        <Hero3DScene canvasSize={canvasSize} webGLError={webGLError} />
        
      </div>
    </section>
  );
};

export default Hero;