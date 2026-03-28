import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
export const useGsapAnimations = (
  titleRef, 
  executivesRef, 
  managementRef, 
  sectionRef
) => {
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef?.current) {
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Executive cards animation
      if (executivesRef?.current?.children) {
        gsap.fromTo(executivesRef.current.children,
          { x: -100, opacity: 0, rotationY: -30 },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: executivesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Management cards animation
      if (managementRef?.current?.children) {
        gsap.fromTo(managementRef.current.children,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: managementRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect on scroll
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
    });

    return () => ctx.revert();
  }, [titleRef, executivesRef, managementRef, sectionRef]);
};

// Animation variants for Framer Motion
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};