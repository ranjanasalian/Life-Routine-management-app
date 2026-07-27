import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Users } from 'lucide-react';

export const ProfileSwitcher = () => {
  const { activeProfile, switchProfile } = useApp();

  const profiles = [
    { id: 'ranju', label: 'Ranju', icon: '🌿', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
    { id: 'manish', label: 'Manish', icon: '⚡', color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300' },
    { id: 'couple', label: 'Our Journey', icon: '👫', color: 'border-pink-500/50 bg-pink-500/10 text-pink-300' }
  ];

  return (
    <div className="max-w-xl mx-auto px-6 pt-6">
      <div className="ios-glass-card p-1.5 border-white/10 flex items-center justify-between gap-1.5 bg-slate-950/80 rounded-full">
        {profiles.map((p) => {
          const isActive = activeProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => switchProfile(p.id)}
              className={`flex-1 py-2.5 px-3 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 border ${
                isActive 
                  ? 'bg-slate-900 text-white border-white/20 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/40'
              }`}
            >
              <span className="text-sm">{p.icon}</span>
              <span className="truncate">{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
