import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, Clock, VolumeX, Sparkles } from 'lucide-react';

export const NotificationCentreView = () => {
  const { currentProfileData = {} } = useApp();

  const [reminders, setReminders] = useState([
    { id: 1, type: 'water', title: 'Hydration Station', time: '8:00 AM', enabled: true, snoozed: false },
    { id: 2, type: 'walk', title: 'Morning Brisk Walk', time: '8:30 AM', enabled: true, snoozed: false },
    { id: 3, type: 'meal', title: 'Protein-Rich Breakfast', time: '9:15 AM', enabled: true, snoozed: false },
    { id: 4, type: 'yoga', title: 'Restorative Hair Yoga', time: '5:30 PM', enabled: true, snoozed: false },
    { id: 5, type: 'walk', title: 'Sunset Couple Walk', time: '6:15 PM', enabled: true, snoozed: false },
    { id: 6, type: 'sleep', title: 'Screen Cut-off & Bedtime', time: '10:15 PM', enabled: true, snoozed: false }
  ]);

  const userName = currentProfileData?.userName || 'User';

  const toggleEnable = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleSnooze = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, snoozed: true } : r));
  };

  return (
    <div className="space-y-6 w-full pb-6">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">Notification & Reminder Centre</h2>
            <p className="text-xs text-slate-400 font-medium">Manage, snooze & customize reminder times for {userName}</p>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Daily Reminders:</h3>

        <div className="space-y-3">
          {reminders.map((r) => (
            <div key={r.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${r.enabled ? 'bg-slate-950/80 border-white/10' : 'bg-slate-950/30 border-white/5 opacity-50'}`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {r.time}
                  </span>
                  {r.snoozed && <span className="text-[10px] font-bold text-slate-400">(Snoozed +15m)</span>}
                </div>
                <h4 className="text-sm font-bold text-white">{r.title}</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSnooze(r.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-white/10"
                >
                  Snooze
                </button>

                <button
                  onClick={() => toggleEnable(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${r.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}`}
                >
                  {r.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
