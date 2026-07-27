import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sparkles, CheckCircle2 } from 'lucide-react';

export const EveningReflectionModal = ({ onClose }) => {
  const { currentProfileData = {}, sendAICoachMessage } = useApp();

  const [dayRating, setDayRating] = useState('Great Day');
  const [wentWell, setWentWell] = useState('Completed water & walking goal');
  const [difficulties, setDifficulties] = useState('Slept late');
  const [notesToRemember, setNotesToRemember] = useState('');

  const userName = currentProfileData?.userName || 'User';

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = `Evening Reflection for ${userName}: DayRating=${dayRating}, WentWell=${wentWell}, Difficulties=${difficulties}, RememberNote=${notesToRemember}.`;
    sendAICoachMessage(note);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md ios-glass-card p-6 md:p-8 border-purple-500/40 bg-slate-950 space-y-5">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Moon className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Evening Reflection</h3>
            <p className="text-xs text-slate-400">Reflect on today to improve tomorrow's plan, {userName}.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">How was your overall day?</label>
            <select value={dayRating} onChange={(e) => setDayRating(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white">
              <option value="Great Day">Great Day</option>
              <option value="Good Progress">Good Progress</option>
              <option value="Challenging Day">Challenging Day</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">What went well today?</label>
            <input type="text" value={wentWell} onChange={(e) => setWentWell(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">What was difficult today?</label>
            <input type="text" value={difficulties} onChange={(e) => setDifficulties(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Anything specific for AI to remember for tomorrow?</label>
            <textarea rows={2} value={notesToRemember} onChange={(e) => setNotesToRemember(e.target.value)} placeholder="e.g. Schedule earlier morning walk or reminder for hair oiling" className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white" />
          </div>

        </div>

        <button type="submit" className="w-full ios-btn-primary py-3.5 text-xs font-extrabold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Reflection & Prepare Tomorrow</span>
        </button>

      </form>
    </div>
  );
};
