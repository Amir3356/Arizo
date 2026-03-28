import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToHash;
