import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenisScroll = (options = {}) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: options.duration || 1.5,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: options.orientation || 'vertical',
      smoothWheel: options.smoothWheel !== false,
      wheelMultiplier: options.wheelMultiplier || 0.8,
      touchMultiplier: options.touchMultiplier || 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [options.duration, options.easing, options.orientation, options.smoothWheel, options.wheelMultiplier, options.touchMultiplier]);
};

export default useLenisScroll;