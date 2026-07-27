import React, { useState } from 'react';
import { HairSkinCare } from './HairSkinCare';
import { AICoachModal } from './AICoachModal';
import { ProgressAnalytics } from './ProgressAnalytics';
import { Sparkles, Bot, BarChart3, UserCheck } from 'lucide-react';

export const HealthSanctuary = () => {
  const [subTab, setSubTab] = useState('beauty');

  return (
    <div className="space-y-6">
      {/* Sub Tab Switcher */}
      <div className="ios-glass-card p-1.5 border-white/10 flex items-center justify-around">
        {[
          { id: 'beauty', label: 'Hair & Beauty', icon: UserCheck },
          { id: 'ai', label: 'AI Mentor', icon: Bot },
          { id: 'trends', label: 'Progress', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {subTab === 'beauty' && <HairSkinCare />}
      {subTab === 'ai' && <AICoachModal />}
      {subTab === 'trends' && <ProgressAnalytics />}
    </div>
  );
};
