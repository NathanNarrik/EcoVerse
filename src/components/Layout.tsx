import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBar } from './NavigationBar';

export const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-earth">
      <main className="pb-20">
        <Outlet />
      </main>
      <NavigationBar currentPath={location.pathname} />
    </div>
  );
};