import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Crown, Medal, Award } from 'lucide-react';

export const LeaderboardPage = () => {
  const { getSchoolLeaderboard, getDormLeaderboard, currentUser } = useAppStore();
  const schoolLeaderboard = getSchoolLeaderboard();
  const dormLeaderboard = getDormLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1: return 'default';
      case 2: return 'secondary';
      case 3: return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center pt-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">ASU Sustainability Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you stack up against fellow Sun Devils!
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-2xl">🔥</span>
          <span className="text-sm font-medium text-accent">Forks Up for Sustainability!</span>
          <span className="text-2xl">🌵</span>
        </div>
      </div>

      <Tabs defaultValue="school" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="school" className="flex items-center gap-2">
            <Users size={16} />
            All ASU
          </TabsTrigger>
          <TabsTrigger value="dorms" className="flex items-center gap-2">
            <Trophy size={16} />
            Dorm Battle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-4">
          {/* Current User Highlight */}
          <Card className="p-4 bg-gradient-sundevil shadow-achievement">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <h3 className="font-semibold">Your ASU Rank</h3>
                  <p className="text-sm opacity-80">{currentUser.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  {getRankIcon(schoolLeaderboard.find(u => u.id === currentUser.id)?.rank || 0)}
                  <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-white/30">
                    {currentUser.points} pts
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* School Leaderboard */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="text-primary" size={20} />
              Top Sun Devils
            </h3>
            <div className="space-y-3">
              {schoolLeaderboard.map((user) => {
                const isCurrentUser = user.id === currentUser.id;
                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(user.rank)}
                      </div>
                      <div>
                        <h4 className={`font-medium ${isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{user.dorm}</p>
                      </div>
                    </div>
                    <Badge variant={getRankBadgeVariant(user.rank)}>
                      {user.points} pts
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dorms" className="space-y-4">
          {/* Current Dorm Highlight */}
          <Card className="p-4 bg-gradient-accent shadow-achievement">
            <div className="flex items-center justify-between text-accent-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🏠</span>
                </div>
                <div>
                  <h3 className="font-semibold">Your ASU Dorm</h3>
                  <p className="text-sm opacity-80">{currentUser.dorm}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  {getRankIcon(dormLeaderboard.find(d => d.name === currentUser.dorm)?.rank || 0)}
                  <Badge variant="secondary" className="bg-primary/20 text-accent-foreground border-primary/30">
                    {dormLeaderboard.find(d => d.name === currentUser.dorm)?.points || 0} pts
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Dorm Leaderboard */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="text-primary" size={20} />
              ASU Dorm Battle
            </h3>
            <div className="space-y-3">
              {dormLeaderboard.map((dorm) => {
                const isCurrentDorm = dorm.name === currentUser.dorm;
                return (
                  <div
                    key={dorm.name}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      isCurrentDorm ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(dorm.rank)}
                      </div>
                      <div>
                        <h4 className={`font-medium ${isCurrentDorm ? 'text-primary' : ''}`}>
                          {dorm.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {dorm.memberCount} students
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getRankBadgeVariant(dorm.rank)}>
                        {dorm.points} pts
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(dorm.points / dorm.memberCount)} avg
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Competition Info */}
      <Card className="p-4 bg-gradient-earth">
        <h3 className="font-semibold mb-2">🏆 ASU Sustainability Championship</h3>
        <p className="text-sm text-muted-foreground mb-2">
          The winning dorm receives an ASU sustainability grant for green innovations and Sun Devil pride gear!
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Ends in 18 days</span>
          <Badge variant="outline" className="border-primary/30 text-primary">Prize: $5,000 + Swag</Badge>
        </div>
      </Card>
    </div>
  );
};