import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Sparkles, X, Droplets, Footprints, Heart, Moon } from 'lucide-react';

export const NotificationToast = () => {
  const { notifications } = useApp();
  const [visibleNotif, setVisibleNotif] = useState(null);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisibleNotif(notifications[0]);
      const timer = setTimeout(() => {
        setVisibleNotif(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!visibleNotif) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-float">
      <div className="glass-panel p-4 border-emerald-500/40 bg-slate-900/95 shadow-2xl flex items-start gap-3 relative">
        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>

        <div className="flex-1 space-y-1 pr-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-400">{visibleNotif.title}</h4>
            <span className="text-[10px] text-slate-500">{visibleNotif.time}</span>
          </div>
          <p className="text-xs text-slate-200 leading-snug">{visibleNotif.message}</p>
        </div>

        <button 
          onClick={() => setVisibleNotif(null)}
          className="text-slate-500 hover:text-slate-300 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
