import React from 'react';
import { useApp } from '../context/AppContext';
import { ProfileSwitcher } from './ProfileSwitcher';
import { Flame, RotateCcw } from 'lucide-react';

export const Header = () => {
  const { activeProfile, currentProfileData, resetDay } = useApp();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const isCouple = activeProfile === 'couple';
  const userName = isCouple 
    ? "Ranju & Manish" 
    : currentProfileData.userName || (activeProfile === 'manish' ? 'Manish' : 'Ranju');

  const avatar = isCouple ? '👫' : (activeProfile === 'manish' ? '⚡' : '🌿');
  const streak = isCouple ? currentProfileData.coupleStreakDays : currentProfileData.streakDays;
  const lastPct = isCouple ? 85 : currentProfileData.yesterdayCompletionPct;

  return (
    <header className="space-y-4">
      {/* Profile Switcher Dock */}
      <ProfileSwitcher />

      <div className="px-6 max-w-xl mx-auto space-y-3">
        {/* Date & Quick Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
            {currentDate}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> {streak}d Streak
            </span>
            <button
              onClick={() => {
                if (window.confirm("Simulate starting a fresh day?")) {
                  resetDay();
                }
              }}
              className="p-2 rounded-full bg-slate-900/80 text-slate-500 hover:text-slate-300 border border-white/10 transition-colors"
              title="Reset Day Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Greeting Title */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight flex items-center gap-2">
            <span>Good Morning, {userName}</span>
            <span>{avatar}</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Yesterday's completion: <strong className="text-emerald-400 font-bold">{lastPct}%</strong>. Today is tailored for your personal health goals.
          </p>
        </div>
      </div>
    </header>
  );
};
