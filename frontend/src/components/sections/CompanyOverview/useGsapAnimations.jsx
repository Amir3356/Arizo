import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = (sectionRef, titleRef, contentRef, statsRef, isInView, setIsVisible) => {
  useEffect(() => {
    if (!isInView) return;
    setIsVisible(true);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
        scrub: 1,
      }
    });

    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { 
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 0 
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut"
        }
      );
    }

    if (contentRef.current && contentRef.current.children) {
      tl.fromTo(contentRef.current.children,
        { 
          y: 100, 
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)"
        },
        "-=0.8"
      );
    }

    if (statsRef.current && statsRef.current.length) {
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          tl.fromTo(stat,
            { 
              scale: 0, 
              opacity: 0,
              rotationY: 180
            },
            {
              scale: 1,
              opacity: 1,
              rotationY: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: "elastic.out(1, 0.5)"
            },
            "-=0.4");
        }
      });
    }

    return () => {
      if (tl) tl.kill();
    };
  }, [isInView, sectionRef, titleRef, contentRef, statsRef, setIsVisible]);
};

export default useGsapAnimations;