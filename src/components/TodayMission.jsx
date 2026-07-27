import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, CheckCircle2, Circle, Trophy, Droplets, Footprints, Apple, Heart, Moon } from 'lucide-react';

const ICON_MAP = {
  water: Droplets,
  walk: Footprints,
  nutrition: Apple,
  yoga: Heart,
  sleep: Moon
};

export const TodayMission = () => {
  const { missions, toggleMission } = useApp();

  const completedCount = missions.filter(m => m.completed).length;
  const isAllDone = completedCount === missions.length;

  return (
    <div className="ios-glass-card p-6 border-white/10 space-y-5">
      
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">Today's Mission</h3>
            <p className="text-xs text-slate-400 font-medium">5 core priority goals for today</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAllDone && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Done!
            </span>
          )}
          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {completedCount} / {missions.length}
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
        <div 
          className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-400/50"
          style={{ width: `${(completedCount / missions.length) * 100}%` }}
        />
      </div>

      {/* Habits List */}
      <div className="space-y-2.5">
        {missions.map((mission) => {
          const isDone = mission.completed;
          const Icon = ICON_MAP[mission.category] || Target;

          return (
            <div
              key={mission.id}
              onClick={() => toggleMission(mission.id)}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                isDone 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                  : 'bg-slate-950/50 border-white/5 text-slate-200 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`p-2.5 rounded-xl ${isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-900 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs md:text-sm font-semibold ${isDone ? 'line-through opacity-70' : 'text-white'}`}>
                  {mission.title}
                </span>
              </div>

              <div>
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 hover:text-emerald-400 transition-colors" />
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
