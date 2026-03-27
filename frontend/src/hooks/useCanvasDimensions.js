import { useState, useEffect } from 'react';

const getCanvasDimensions = () => {
  if (typeof window === 'undefined') return { width: 280, height: 280 };
  if (window.innerWidth < 480) return { width: 200, height: 200 };
  if (window.innerWidth < 640) return { width: 240, height: 240 };
  if (window.innerWidth < 768) return { width: 280, height: 280 };
  if (window.innerWidth < 1024) return { width: 320, height: 320 };
  return { width: 400, height: 400 };
};

const useCanvasDimensions = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasDimensions());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return canvasSize;
};

export default useCanvasDimensions;