import { useEffect, useState } from 'react';

export type AnimationType = 'none' | 'bubbling' | 'grasshopper' | 'pendulum' | 'appearance' | 'explosion' | 'ghost';

interface UseCardAnimationProps {
  isActive: boolean;
  isVisited: boolean;
  animationType: AnimationType;
  delay?: number;
  index?: number;
}

export const useCardAnimation = ({
  isActive,
  isVisited,
  animationType,
  delay = 300,
  index = 0
}: UseCardAnimationProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (animationType === 'none') {
      setShouldAnimate(true);
      return;
    }

    if (isActive && !isVisited) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay + (index * 100)); // Добавляем задержку для каждой карточки
      return () => clearTimeout(timer);
    } else if (isVisited) {
      setShouldAnimate(true);
    }
  }, [isActive, isVisited, animationType, delay, index]);

  const getAnimationClasses = () => {
    if (animationType === 'none') {
      return 'animate-none';
    }

    if (!shouldAnimate) {
      return 'animate-initial';
    }

    const baseClass = `animate-${animationType}`;
    const delayClass = index > 0 ? `animate-delay-${Math.min(index * 100, 1000)}` : '';
    
    return `${baseClass} ${delayClass}`.trim();
  };

  return {
    shouldAnimate,
    animationClasses: getAnimationClasses()
  };
};