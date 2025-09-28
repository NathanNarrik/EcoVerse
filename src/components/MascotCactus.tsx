import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import mascotRobot from '@/assets/mascot-robot.png';

interface MascotCactusProps {
  mood?: 'happy' | 'excited' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    xl: 'w-48 h-48 text-9xl',
  };

  const getMoodClass = () => {
    if (isAnimating) return 'mascot-cheer';
    if (mood === 'happy') return 'animate-float';
    if (mood === 'excited') return 'mascot-wiggle';
    return '';
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center ${getMoodClass()} relative`}>
      <div className="relative">
        <img 
          src={mascotRobot} 
          alt="EcoVerse Mascot" 
          className="w-full h-full object-contain select-none"
        />
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl animate-bounce">🎉</span>
          </div>
        )}
      </div>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-30"></div>
        </div>
      )}
    </div>
  );
};