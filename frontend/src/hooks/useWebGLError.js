import { useState, useEffect } from 'react';

const useWebGLError = () => {
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    const handleContextLoss = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost, reloading...');
      setWebGLError(true);
      setTimeout(() => {
        setWebGLError(false);
      }, 1000);
    };
    
    window.addEventListener('webglcontextlost', handleContextLoss);
    
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLoss);
    };
  }, []);

  return webGLError;
};

export default useWebGLError;