import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Make THREE available globally
window.THREE = THREE;

const VantaBackground = ({ opacity = 0.15, color1 = '#00d4aa', color2 = '#008f74' }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Dynamically import vanta to avoid issues
    const loadVanta = async () => {
      try {
        const VANTA = await import('vanta');
        const effect = VANTA.default.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color1: 0x00d4aa,
          color2: 0x008f74,
          birdSize: 0.80,
          wingSpan: 25.00,
          speedLimit: 5.00,
          separation: 40.00,
          alignment: 30.00,
          cohesion: 30.00,
          quantity: 3.00,
          backgroundAlpha: 0.0
        });
        setVantaEffect(effect);
      } catch (err) {
        console.warn('Vanta effect failed to load:', err);
        setError(true);
      }
    };

    if (vantaRef.current && !error) {
      loadVanta();
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [error]);

  // If there's an error or on mobile, don't render Vanta
  if (error || window.innerWidth < 768) {
    return <div className="fixed inset-0 z-0 bg-[var(--bg)]" style={{ opacity }} />;
  }

  return (
    <div 
      ref={vantaRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default VantaBackground;