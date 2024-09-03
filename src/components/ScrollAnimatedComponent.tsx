import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollAnimatedComponentProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}

const ScrollAnimatedComponent: React.FC<ScrollAnimatedComponentProps> = ({ direction, children }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (componentRef.current) {
      let fromValue: string;

      switch (direction) {
        case 'left':
          fromValue = '-100%';
          break;
        case 'right':
          fromValue = '100%';
          break;
        case 'top':
          fromValue = '-100%';
          break;
        case 'bottom':
          fromValue = '100%';
          break;
      }

      gsap.fromTo(
        componentRef.current,
        direction === 'left' || direction === 'right' ? { x: fromValue, opacity: 0 } : { y: fromValue, opacity: 0 },
        {
          x: direction === 'left' || direction === 'right' ? '0%' : undefined,
          y: direction === 'top' || direction === 'bottom' ? '0%' : undefined,
          opacity: 1.5,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: componentRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play none none none',
            once: true, 
            immediateRender: false,
          },
        }
      );
    }
  }, [direction]);

  return (
    <div ref={componentRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default ScrollAnimatedComponent;
