import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, UtensilsCrossed, Moon, CheckCircle2, Flame, Award, Heart, Play } from 'lucide-react';

export const CoupleMode = () => {
  const { couple, toggleMission, addWalkMinutes, setActiveTab } = useApp();

  return (
    <div className="space-y-6 w-full">
      
      {/* Header Banner */}
      <div className="ios-glass-card p-6 border-pink-500/30 bg-gradient-to-br from-pink-950/30 via-slate-900 to-slate-950 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Users className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">Ranju & Manish's Shared Journey 👫</h2>
            <p className="text-xs text-slate-300 font-medium">Building healthy habits, walking together, and celebrating life milestones</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/40">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" /> {couple.coupleStreakDays} Day Dual Streak
          </span>
        </div>
      </div>

      {/* Shared Daily Mission Goals */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4 w-full">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> Today's Shared Couple Goals
        </h3>

        <div className="space-y-3">
          {couple.goals.map((goal) => {
            const isDone = goal.completed;

            return (
              <div 
                key={goal.id}
                onClick={() => toggleMission(goal.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isDone 
                    ? 'bg-pink-950/40 border-pink-500/50 text-pink-200' 
                    : 'bg-slate-950/60 border-white/5 text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className={`text-sm font-bold ${isDone ? 'line-through opacity-70' : 'text-white'}`}>
                      {goal.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">{goal.description}</p>
                    <p className="text-[10px] text-pink-300/80 italic">💡 {goal.why}</p>
                  </div>

                  <div className="flex-shrink-0">
                    <CheckCircle2 className={`w-6 h-6 ${isDone ? 'text-pink-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Walk Together CTA */}
        <button
          onClick={() => {
            addWalkMinutes(30, true);
            setActiveTab('today');
          }}
          className="w-full ios-btn-primary py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Start 6:15 PM Sunset Walk Together (30 Mins)</span>
        </button>
      </div>

      {/* Shared Milestones */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4 w-full">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Couple Milestone Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {couple.milestones.map((m) => (
            <div key={m.id} className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/30 text-center space-y-1">
              <span className="text-2xl block mb-1">👫</span>
              <h4 className="text-xs font-bold text-white font-heading">{m.title}</h4>
              <p className="text-[10px] text-slate-400 leading-snug">{m.desc}</p>
              <span className="inline-block mt-2 text-[9px] font-extrabold text-pink-300 bg-pink-500/20 px-2.5 py-0.5 rounded-full border border-pink-500/40">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
