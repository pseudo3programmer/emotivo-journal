
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { PenLine, Calendar, Settings, Star } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'New Entry', icon: <PenLine className="w-5 h-5" /> },
    { path: '/timeline', label: 'Timeline', icon: <Calendar className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center items-center animate-slide-up">
      <div className="glass-card px-6 py-3 flex space-x-10 transition-all duration-300 ease-out shadow-lg hover:shadow-xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 group",
                isActive 
                  ? "text-accent scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative">
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <Star className="relative inline-flex h-3 w-3 text-accent" />
                  </span>
                )}
                <span className={cn(
                  "p-1.5 rounded-full transition-all duration-300 group-hover:bg-accent/10",
                  isActive ? "bg-accent/20" : ""
                )}>
                  {item.icon}
                </span>
              </span>
              <span className="text-xs mt-1.5 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;
