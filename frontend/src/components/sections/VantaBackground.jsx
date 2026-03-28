import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BIRDS from 'vanta/src/vanta.birds';

// Make THREE available globally for Vanta
window.THREE = THREE;

const VantaBackground = ({ opacity = 0.15 }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (!vantaRef.current) return;

    let effect = null;

    const initVanta = () => {
      try {
        effect = BIRDS({
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
        console.warn('Vanta effect failed, using fallback:', err);
        setUseFallback(true);
      }
    };

    initVanta();

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  // Fallback component using Three.js particles
  if (useFallback) {
    return <ThreeParticlesBackground opacity={opacity} />;
  }

  return (
    <div 
      ref={vantaRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity }}
    />
  );
};

// Fallback Three.js Particles Background
const ThreeParticlesBackground = ({ opacity = 0.15 }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || error) return;

    let scene, camera, renderer, particles, geometry, material;
    let animationId;

    try {
      // Setup scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 800;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 15;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d4aa,
        size: 0.08,
        transparent: true,
        opacity: 0.4
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      camera.position.z = 8;

      // Animation
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer && containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (particles) {
          particles.geometry.dispose();
          particles.material.dispose();
        }
      };
    } catch (err) {
      console.warn('Three.js background failed:', err);
      setError(true);
    }
  }, [error]);

  if (error) {
    return <div className="fixed inset-0 z-0 bg-[var(--bg)]" style={{ opacity }} />;
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default VantaBackground;