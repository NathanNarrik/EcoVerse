import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AchievementModal = () => {
  const { showAchievement, lastAction, setShowAchievement } = useAppStore();

  useEffect(() => {
    if (showAchievement) {
      const timer = setTimeout(() => {
        setShowAchievement(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAchievement, setShowAchievement]);

  if (!showAchievement) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="mx-4 p-6 text-center achievement-bounce bg-gradient-primary">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-primary-foreground mb-2">
          Great job!
        </h2>
        <p className="text-primary-foreground mb-4 opacity-90">
          {lastAction}
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">🌵</span>
          <span className="text-xl font-bold text-primary-foreground">+5 Points!</span>
        </div>
        <Button 
          variant="secondary" 
          onClick={() => setShowAchievement(false)}
          className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
        >
          Continue
        </Button>
      </Card>
    </div>
  );
};