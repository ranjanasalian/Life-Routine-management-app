import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const MorningCheckInModal = ({ onClose }) => {
  const { currentProfileData = {}, sendAICoachMessage } = useApp();
  
  const [sleepQuality, setSleepQuality] = useState('7.5 Hours (Good)');
  const [energyLevel, setEnergyLevel] = useState('High');
  const [mood, setMood] = useState('Motivated');
  const [discomfort, setDiscomfort] = useState('None');

  const userName = currentProfileData?.userName || 'User';

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = `Morning Check-In for ${userName}: Sleep=${sleepQuality}, Energy=${energyLevel}, Mood=${mood}, Discomfort=${discomfort}.`;
    sendAICoachMessage(note);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md ios-glass-card p-6 md:p-8 border-emerald-500/40 bg-slate-950 space-y-5">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sun className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Morning Check-In</h3>
            <p className="text-xs text-slate-400">Good Morning, {userName}! Let's customize today's plan.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">How did you sleep last night?</label>
            <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white">
              <option value="7.5 Hours (Good)">7.5 Hours (Restful)</option>
              <option value="Under 6 Hours (Poor)">Under 6 Hours (Poor)</option>
              <option value="8+ Hours (Excellent)">8+ Hours (Excellent)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">How's your energy today?</label>
            <select value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white">
              <option value="High">High & Ready</option>
              <option value="Moderate">Moderate</option>
              <option value="Low / Exhausted">Low / Exhausted</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">How's your mood today?</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white">
              <option value="Motivated">Motivated & Calm</option>
              <option value="Stressed">Stressed</option>
              <option value="Peaceful">Peaceful</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Any pain, hair fall, or discomfort?</label>
            <input type="text" value={discomfort} onChange={(e) => setDiscomfort(e.target.value)} placeholder="e.g. Mild hair fall or None" className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white" />
          </div>

        </div>

        <button type="submit" className="w-full ios-btn-primary py-3.5 text-xs font-extrabold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Check-In & Adjust Plan</span>
        </button>

      </form>
    </div>
  );
};
