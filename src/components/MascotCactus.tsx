import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';

interface MascotCactusProps {
  mood?: 'happy' | 'excited' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export const MascotCactus = ({ mood = 'neutral', size = 'md' }: MascotCactusProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const showAchievement = useAppStore(state => state.showAchievement);

  useEffect(() => {
    if (showAchievement) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        useAppStore.getState().setShowAchievement(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showAchievement]);

  const sizeClasses = {
    sm: 'w-16 h-16 text-4xl',
    md: 'w-24 h-24 text-6xl',
    lg: 'w-32 h-32 text-8xl',
  };

  const getMoodClass = () => {
    if (isAnimating) return 'mascot-cheer';
    if (mood === 'happy') return 'animate-float';
    if (mood === 'excited') return 'mascot-wiggle';
    return '';
  };

  const getEmoji = () => {
    if (isAnimating) return '🎉🌵';
    return '🌵';
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${getMoodClass()}`}>
      <span className="select-none">{getEmoji()}</span>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-30"></div>
        </div>
      )}
    </div>
  );
};