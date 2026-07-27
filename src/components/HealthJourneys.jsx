import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, TrendingUp, TrendingDown, Heart, ShieldCheck, Award, Zap, Sun } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Heart,
  Zap,
  Sun
};

export const HealthJourneys = () => {
  const { activeProfile, ranju, manish } = useApp();

  const journeys = activeProfile === 'manish' ? manish.journeys : ranju.journeys;
  const userName = activeProfile === 'manish' ? 'Manish' : 'Ranju';

  return (
    <div className="space-y-6 w-full">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-white">{userName}'s Dedicated Health Journeys</h2>
            <p className="text-xs text-slate-400">Targeted long-term goal tracking & AI milestone recommendations</p>
          </div>
        </div>
      </div>

      {/* Journeys List */}
      <div className="space-y-4">
        {journeys.map((journey) => {
          const Icon = ICON_MAP[journey.icon] || Sparkles;

          return (
            <div key={journey.id} className="ios-glass-card p-5 border-white/10 space-y-4 w-full">
              
              {/* Journey Title Header */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-white">{journey.title}</h3>
                    <span className="text-[11px] font-semibold text-emerald-400">{journey.status}</span>
                  </div>
                </div>

                <span className="text-xs font-black text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  {journey.progressPct}% Achieved
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${journey.progressPct}%` }}
                />
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {journey.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-medium block">{m.label}</span>
                    <span className="text-xs font-bold text-white block">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* AI Recommendations */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1 text-xs">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> AI Companion Recommendation:
                </div>
                <ul className="space-y-1">
                  {journey.recommendations.map((rec, i) => (
                    <li key={i} className="text-slate-300 text-[11px] flex items-start gap-1.5 font-medium">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
