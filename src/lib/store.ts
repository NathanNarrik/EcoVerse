import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  dorm: string;
  points: number;
}

export interface LeaderboardEntry extends User {
  rank: number;
}

export interface DormStats {
  name: string;
  points: number;
  memberCount: number;
  rank: number;
}

interface AppState {
  currentUser: User;
  users: User[];
  lastAction: string | null;
  showAchievement: boolean;
  
  // Actions
  addPoints: (points: number, action: string) => void;
  setShowAchievement: (show: boolean) => void;
  getSchoolLeaderboard: () => LeaderboardEntry[];
  getDormLeaderboard: () => DormStats[];
}

// ASU Initial seeded data
const initialUsers: User[] = [
  { id: '1', name: 'Alex Rivera', dorm: 'Barrett Honors', points: 125 },
  { id: '2', name: 'Maya Patel', dorm: 'Hassayampa', points: 142 },
  { id: '3', name: 'Jordan Kim', dorm: 'Barrett Honors', points: 98 },
  { id: '4', name: 'Sam Wilson', dorm: 'Vista del Sol', points: 85 },
  { id: '5', name: 'Riley Davis', dorm: 'Hassayampa', points: 118 },
  { id: '6', name: 'Casey Martinez', dorm: 'Barrett Honors', points: 91 },
  { id: '7', name: 'Morgan Lee', dorm: 'Tooker House', points: 165 },
  { id: '8', name: 'Quinn Taylor', dorm: 'Hassayampa', points: 102 },
  { id: '9', name: 'Avery Thompson', dorm: 'Vista del Sol', points: 78 },
  { id: '10', name: 'Phoenix Chen', dorm: 'Tooker House', points: 134 },
  { id: '11', name: 'Dakota Reyes', dorm: 'Vista del Sol', points: 156 },
  { id: '12', name: 'Sage Martinez', dorm: 'Tooker House', points: 89 },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: { id: '1', name: 'Alex Rivera', dorm: 'Barrett Honors', points: 125 },
  users: initialUsers,
  lastAction: null,
  showAchievement: false,

  addPoints: (points: number, action: string) => {
    const { currentUser, users } = get();
    const updatedUser = { ...currentUser, points: currentUser.points + points };
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    
    set({
      currentUser: updatedUser,
      users: updatedUsers,
      lastAction: action,
      showAchievement: true,
    });
  },

  setShowAchievement: (show: boolean) => {
    set({ showAchievement: show });
  },

  getSchoolLeaderboard: (): LeaderboardEntry[] => {
    const { users } = get();
    return users
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  },

  getDormLeaderboard: (): DormStats[] => {
    const { users } = get();
    const dormStats = new Map<string, { points: number; memberCount: number }>();
    
    users.forEach(user => {
      const current = dormStats.get(user.dorm) || { points: 0, memberCount: 0 };
      dormStats.set(user.dorm, {
        points: current.points + user.points,
        memberCount: current.memberCount + 1,
      });
    });

    return Array.from(dormStats.entries())
      .map(([name, stats]) => ({ name, ...stats, rank: 0 }))
      .sort((a, b) => b.points - a.points)
      .map((dorm, index) => ({ ...dorm, rank: index + 1 }));
  },
}));