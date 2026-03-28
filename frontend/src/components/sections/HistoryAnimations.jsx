import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Capital S and T

gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
export const useGsapHistoryAnimations = (sectionRef, titleRef, timelineRef, setProgress) => {
  useEffect(() => {
    if (typeof gsap === 'undefined') return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef?.current) {
        gsap.fromTo(titleRef.current,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Parallax background effect
      if (sectionRef?.current) {
        gsap.to(sectionRef.current, {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      // Progress bar animation
      if (timelineRef?.current) {
        gsap.to({}, {
          duration: 2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
              if (setProgress) setProgress(self.progress);
            }
          }
        });
      }
    });

    return () => ctx.revert();
  }, [sectionRef, titleRef, timelineRef, setProgress]);
};

// Framer Motion variants
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};