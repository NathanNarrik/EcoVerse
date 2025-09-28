import { useAppStore } from '@/lib/store';
import { MascotCactus } from '@/components/MascotCactus';
import { AchievementModal } from '@/components/AchievementModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Thermometer, Droplets } from 'lucide-react';

export const Dashboard = () => {
  const currentUser = useAppStore(state => state.currentUser);

  return (
    <div className="min-h-screen p-4 space-y-6">
      <AchievementModal />
      
      {/* Hero Header */}
      <div className="text-center pt-8 pb-4">
        <div className="mb-4">
          <h1 className="text-5xl font-bold bg-gradient-sundevil bg-clip-text text-transparent mb-3">
            EcoVerse
          </h1>
          <p className="text-lg text-muted-foreground">Your Sustainability Universe</p>
        </div>
        <div className="bg-gradient-earth rounded-2xl p-6 mx-4">
          <h2 className="text-2xl font-semibold mb-2">Welcome back, {currentUser.name}! 👋</h2>
          <p className="text-muted-foreground">Ready to make a positive impact today?</p>
        </div>
      </div>

      {/* Safety Alert Banner */}
      <Card className="p-4 bg-gradient-accent border-warning">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-warning-foreground" size={24} />
          <div className="flex-1">
            <h3 className="font-semibold text-warning-foreground">Heat Warning</h3>
            <p className="text-sm text-warning-foreground/80">
              High temperature today: 110°F. Stay hydrated!
            </p>
          </div>
          <div className="flex items-center gap-1 text-warning-foreground">
            <Thermometer size={20} />
            <span className="font-bold">110°F</span>
          </div>
        </div>
      </Card>

      {/* Enhanced Mascot & Points Section */}
      <div className="mx-4">
        <Card className="p-12 text-center bg-gradient-sundevil relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8">
              <MascotCactus mood="happy" size="xl" />
            </div>
            <h2 className="text-4xl font-bold mb-2 text-primary-foreground">
              {currentUser.name}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge className="text-2xl px-8 py-4 bg-white/20 text-primary-foreground border-white/30 shadow-achievement">
                <span className="points-glow font-bold">{currentUser.points} EcoPoints</span>
              </Badge>
            </div>
            <p className="text-primary-foreground/90 text-xl max-w-md">
              Keep up the amazing eco-friendly work! 🌱✨
            </p>
          </div>
        </Card>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-2 gap-6 mx-4">
        <Card className="p-6 text-center hover-scale bg-gradient-earth">
          <div className="text-4xl mb-3">♻️</div>
          <h3 className="font-semibold text-lg mb-1">This Week</h3>
          <p className="text-3xl font-bold text-primary mb-1">15</p>
          <p className="text-sm text-muted-foreground">Eco Actions</p>
          <div className="mt-3 w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">75% of weekly goal</p>
        </Card>
        
        <Card className="p-6 text-center hover-scale bg-gradient-earth">
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="font-semibold text-lg mb-1">Impact</h3>
          <p className="text-3xl font-bold text-success mb-1">3.2kg</p>
          <p className="text-sm text-muted-foreground">CO₂ Saved</p>
          <div className="mt-3 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <div className="w-2 h-2 bg-muted rounded-full"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Level 3 Impact</p>
        </Card>
      </div>

      {/* Enhanced Daily Challenge & Tip */}
      <div className="mx-4 space-y-4">
        <Card className="p-6 bg-gradient-accent hover-scale">
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-pulse">🎯</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Daily Challenge</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Scan 3 recyclable items today to earn bonus points! 
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{width: '33%'}}></div>
                </div>
                <span className="text-xs font-medium">1/3</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-earth">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold text-lg mb-2">EcoVerse Tip</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stay hydrated with reusable bottles! Our campus hydration stations 
                are perfect for beating the heat while reducing plastic waste. 💧✨
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};