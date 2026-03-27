import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="w-full h-full"
        options={{
          fpsLimit: 60,
          particles: {
            color: { value: "#00d4aa" },
            links: { 
              color: "#00d4aa", 
              distance: 150, 
              enable: true, 
              opacity: 0.2,
              width: 1
            },
            move: { 
              enable: true, 
              speed: 1,
              direction: "none",
              random: false,
              straight: false
            },
            number: { 
              value: 50,
              density: {
                enable: true,
                area: 800
              }
            },
            opacity: { 
              value: 0.3,
              random: false
            },
            size: {
              value: { min: 1, max: 3 },
              random: true
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              }
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5
                }
              }
            }
          },
          detectRetina: true
        }}
      />
    </div>
  );
};

export default ParticlesBackground;