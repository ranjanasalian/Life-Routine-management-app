import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Calendar, Award, Users, Sparkles } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, activeProfile } = useApp();

  const navItems = [
    { id: 'today', label: 'Today', icon: Sun },
    { id: 'schedule', label: 'Flow', icon: Calendar },
    { id: 'journeys', label: 'Journeys', icon: Award },
    { id: 'couple', label: 'Couple', icon: Users },
    { id: 'health', label: 'Health', icon: Sparkles }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-[#05070c] via-[#05070c]/95 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav className="ios-glass-card p-2 border-white/10 flex items-center justify-around shadow-2xl bg-slate-950/80 backdrop-blur-3xl rounded-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'couple' && activeProfile === 'couple') || (item.id === 'health' && (activeTab === 'yoga' || activeTab === 'nutrition' || activeTab === 'wellness' || activeTab === 'ai_coach' || activeTab === 'progress'));
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-emerald-400 font-extrabold scale-105' 
                    : 'text-slate-500 hover:text-slate-300 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-1 tracking-tight font-sans">
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
