import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Trophy, Sparkles, TrendingUp, Award, Flame, Droplets, Heart } from 'lucide-react';

export const ProgressAnalytics = () => {
  const { 
    waterConsumedMl, 
    husbandWalkCompleted,
  } = useApp();

  const achievements = [
    { title: '7-Day Consistency Streak', desc: 'Completed routine for 7 consecutive days', icon: Flame, unlocked: true },
    { title: 'Hydration Champion', desc: 'Reached 2.5L water goal repeatedly', icon: Droplets, unlocked: waterConsumedMl >= 2000 },
    { title: 'Yoga Mind', desc: 'Completed 20-min restorative yoga flow', icon: Heart, unlocked: true },
    { title: 'Partner Walker', desc: 'Walked with husband in the evening', icon: Trophy, unlocked: husbandWalkCompleted }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 glow-emerald">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <BarChart3 className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">AI Progress Analysis & Insights</h2>
            <p className="text-xs md:text-sm text-slate-400">Verbal narrative analysis and long-term wellness trend tracking</p>
          </div>
        </div>
      </div>

      {/* AI Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sleep */}
        <div className="glass-card p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
            <TrendingUp className="w-4 h-4" /> SLEEP & RECOVERY TREND
          </div>
          <h3 className="text-lg font-bold font-heading text-white">"You improved your sleep by 45 minutes this week."</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            By turning off screens at 10:15 PM and practicing bedtime wind-down, your deep REM sleep score increased by 18%, giving you sustained morning energy.
          </p>
        </div>

        {/* Hydration */}
        <div className="glass-card p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs">
            <Droplets className="w-4 h-4" /> HYDRATION CONSISTENCY
          </div>
          <h3 className="text-lg font-bold font-heading text-white">"You completed 92% of your water goal overall."</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Your average daily hydration reached 2,400 ml. This high fluid intake has directly contributed to improved digestion and radiant skin texture.
          </p>
        </div>

        {/* Hair */}
        <div className="glass-card p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xs">
            <Sparkles className="w-4 h-4" /> HAIR & BEAUTY PROGRESS
          </div>
          <h3 className="text-lg font-bold font-heading text-white">"Your hair fall parameters show consistent reduction."</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Pairing high protein with every meal alongside scalp circulation yoga poses has noticeably strengthened hair anchorage over 3 consecutive weeks.
          </p>
        </div>

        {/* Habits */}
        <div className="glass-card p-6 border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
            <Trophy className="w-4 h-4" /> HABIT BUILDING & MOTIVATION
          </div>
          <h3 className="text-lg font-bold font-heading text-white">"Your overall routine consistency is improving!"</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            You've logged 7 days uninterrupted streak. You are building sustainable lifelong health habits rather than quick fixes.
          </p>
        </div>

      </div>

      {/* Badges & Celebration System */}
      <div className="glass-card p-6 md:p-8 border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" /> Milestone Badges & Celebrations
          </h3>
          <span className="text-xs font-extrabold text-amber-300 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-500/40">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                  ach.unlocked 
                    ? 'bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/10 glow-amber' 
                    : 'bg-slate-950/40 border-white/5 opacity-50'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/40">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white mb-1 font-heading">{ach.title}</h4>
                <p className="text-xs text-slate-400 leading-snug mb-4 font-medium">{ach.desc}</p>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                  ach.unlocked 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {ach.unlocked ? 'Unlocked 🏆' : 'In Progress'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
