import React from 'react';
import { useApp } from '../context/AppContext';

export const ProfileSwitcher = () => {
  const { profiles = [], activeProfileId, switchProfile } = useApp();

  const profileTabs = [
    ...profiles.map(p => ({
      id: p.profileId,
      label: p.userName || (p.relationship === 'primary' ? 'You' : 'Family'),
      icon: p.avatar || (p.relationship === 'husband' ? '⚡' : '🌿'),
      subLabel: p.relationship !== 'primary' ? p.relationship : ''
    })),
    { id: 'couple', label: 'Our Journey', icon: '👫', subLabel: 'Shared' }
  ];

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 pt-4">
      <div className="ios-glass-card p-1.5 border-white/10 flex items-center justify-between gap-1 bg-slate-950/80 rounded-full overflow-x-auto no-scrollbar">
        {profileTabs.map((p) => {
          const isActive = activeProfileId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => switchProfile(p.id)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 border whitespace-nowrap ${
                isActive 
                  ? 'bg-slate-900 text-white border-white/20 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/40'
              }`}
            >
              <span className="text-sm">{p.icon}</span>
              <span className="truncate">{p.label}</span>
              {p.subLabel && <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">({p.subLabel})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
