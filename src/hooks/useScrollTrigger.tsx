import { useState, useEffect, useRef } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { threshold = 0.3, rootMargin = '0px' } = options;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasTriggered]); // Remove options from dependencies to prevent infinite re-renders

  return { ref, isVisible, hasTriggered };
};