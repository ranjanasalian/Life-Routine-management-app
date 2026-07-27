import React from 'react';
import { useApp } from '../context/AppContext';
import { ProfileSwitcher } from './ProfileSwitcher';
import { Bell, Shield, RotateCcw } from 'lucide-react';

export const Header = () => {
  const { activeProfileId, currentProfileData = {}, resetDay, setActiveTab } = useApp();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const isCouple = activeProfileId === 'couple';
  const userName = isCouple 
    ? "Our Journey" 
    : (currentProfileData.userName || 'User');

  const avatar = isCouple ? '👫' : (currentProfileData.avatar || '🌿');
  const streak = isCouple ? (currentProfileData.coupleStreakDays || 7) : (currentProfileData.streakDays || 7);

  return (
    <header className="space-y-3">
      {/* Dynamic Profile Switcher */}
      <ProfileSwitcher />

      <div className="px-4 sm:px-6 max-w-xl mx-auto space-y-2">
        {/* Date Bar & Header Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
            {currentDate}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('notifications')}
              className="p-2 rounded-full bg-slate-900/80 text-amber-400 hover:text-amber-300 border border-amber-500/20 transition-colors"
              title="Notification Centre"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className="p-2 rounded-full bg-slate-900/80 text-purple-400 hover:text-purple-300 border border-purple-500/20 transition-colors"
              title="Data Privacy & Memory Controls"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                if (window.confirm("Restart onboarding setup?")) {
                  resetDay();
                }
              }}
              className="p-2 rounded-full bg-slate-900/80 text-slate-500 hover:text-slate-300 border border-white/10 transition-colors"
              title="Restart Setup"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Greeting Banner */}
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight flex items-center gap-2">
            <span>{userName}</span>
            <span>{avatar}</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
