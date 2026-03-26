import React from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const TestParticles = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      backgroundColor: '#0a0e1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 100 },
            color: { value: "#00d4aa" },
            links: { enable: true, color: "#00d4aa", distance: 150 },
            move: { enable: true, speed: 2 },
            size: { value: 3 }
          }
        }}
      />
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Particles Test</h1>
        <p>If you see moving green particles and lines, it's working!</p>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#8a95b0' }}>
          ✓ Green particles should be moving around
          <br />
          ✓ Lines should connect between particles
          <br />
          ✓ Particles should react to mouse movement
        </p>
      </div>
    </div>
  );
};

export default TestParticles;