import { Link } from 'react-router-dom';
import { Home, Scan, FileText, Trophy, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  currentPath: string;
}

export const NavigationBar = ({ currentPath }: NavigationBarProps) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scan', icon: Scan, label: 'Scan' },
    { path: '/report', icon: FileText, label: 'Report' },
    { path: '/leaderboard', icon: Trophy, label: 'Board' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = currentPath === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "nav-item flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium",
                isActive ? "nav-item-active" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};