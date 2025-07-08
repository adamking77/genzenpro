import React, { type PropsWithChildren } from 'react';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';

interface ScrollAnimatorProps extends PropsWithChildren {
  threshold?: number;
  rootMargin?: string;
  initialState?: 'fadeUp' | 'fadeDown' | 'fade';
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export function ScrollAnimator({
  children,
  threshold = 0.2,
  rootMargin = '0px',
  initialState = 'fadeUp',
  duration = 1000,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 100
}: ScrollAnimatorProps) {
  const { ref, isVisible } = useScrollTrigger({ threshold, rootMargin });

  const getAnimationClasses = () => {
    const durationClass = duration === 800 ? 'duration-800' : 'duration-1000';
    const base = `transition-all ${durationClass}`;
    
    if (isVisible) {
      return `${base} opacity-100 translate-y-0`;
    }
    
    switch (initialState) {
      case 'fadeUp':
        return `${base} opacity-0 translate-y-10`;
      case 'fadeDown':
        return `${base} opacity-0 -translate-y-10`;
      case 'fade':
        return `${base} opacity-0`;
      default:
        return `${base} opacity-0 translate-y-10`;
    }
  };

  const style = delay > 0 ? {
    transitionDelay: isVisible ? `${delay}ms` : '0ms'
  } : undefined;

  // Handle staggered children
  if (staggerChildren && React.Children.count(children) > 1) {
    return (
      <div ref={ref}>
        {React.Children.map(children, (child, index) => (
          <div 
            key={index}
            className={getAnimationClasses()}
            style={{
              transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={getAnimationClasses()} style={style}>
      {children}
    </div>
  );
}

export default ScrollAnimator;