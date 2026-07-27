import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Sparkles, CheckCircle2, Moon } from 'lucide-react';

export const HairSkinCare = () => {
  const { 
    hairFallLevel, 
    logReflection, 
    moodRating,
    reflectionNotes
  } = useApp();

  const [selectedMood, setSelectedMood] = useState(moodRating || 'Good');
  const [selectedHairFall, setSelectedHairFall] = useState(hairFallLevel || 'Low');
  const [notesText, setNotesText] = useState(reflectionNotes || '');

  const handleSaveReflection = () => {
    logReflection(selectedMood, notesText, selectedHairFall);
  };

  return (
    <div className="space-y-5 w-full">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex-shrink-0">
            <UserCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-white">Hair & Beauty Routine</h2>
            <p className="text-xs text-slate-400">Hair fall trends & nightly relaxation</p>
          </div>
        </div>
      </div>

      {/* Hair Fall & Scalp Health */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4 w-full">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Hair Fall & Scalp Wellness
        </h3>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            Observed Hair Fall Level Today:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { level: 'Low', desc: 'Minimal (<20)' },
              { level: 'Medium', desc: 'Moderate (20-50)' },
              { level: 'High', desc: 'Higher (>50)' }
            ].map((item) => {
              const isSelected = selectedHairFall === item.level;
              return (
                <div
                  key={item.level}
                  onClick={() => setSelectedHairFall(item.level)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-purple-950/60 border-purple-500 text-white font-bold' 
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-sm font-black block mb-0.5 font-heading">{item.level}</span>
                  <span className="text-[10px] text-slate-400 leading-snug block">{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scalp Nourishment Habits:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 5-Min Warm Scalp Massage
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> High-Protein Meal (Egg/Dal)
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 2.5L Water Goal
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> 20-Min Restorative Yoga
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200 leading-relaxed font-medium">
          <span className="font-extrabold text-purple-300">🌿 AI Beauty Note: </span>
          "Your hair fall has been steadily improving over the last 3 weeks! Continuing protein with every meal strengthens hair anchorage."
        </div>
      </div>

      {/* Nightly Reflection */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4 w-full">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Moon className="w-4 h-4 text-indigo-400" /> Daily Reflection & Mood
        </h3>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">How was today?</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: 'Excellent', emoji: '😊' },
              { label: 'Good', emoji: '🙂' },
              { label: 'Okay', emoji: '😐' },
              { label: 'Difficult', emoji: '😔' }
            ].map((m) => {
              const isSel = selectedMood === m.label;
              return (
                <button
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSel 
                      ? 'bg-indigo-950/70 border-indigo-500 text-white font-bold' 
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span className="text-[10px] font-semibold">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Reflection & Notes:</label>
          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="What made you smile today? Thoughts..."
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <button
          onClick={handleSaveReflection}
          className="w-full ios-btn-primary py-3 text-xs font-extrabold shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4" /> Save Reflection
        </button>
      </div>

    </div>
  );
};
