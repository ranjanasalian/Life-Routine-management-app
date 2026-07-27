import React from 'react';
import { useApp } from '../context/AppContext';
import { Droplets, Plus, Sparkles } from 'lucide-react';

export const WaterTracker = () => {
  const { waterConsumedMl, waterTargetMl, addWater } = useApp();

  const pct = Math.min(100, Math.round((waterConsumedMl / waterTargetMl) * 100));
  const remainingMl = Math.max(0, waterTargetMl - waterConsumedMl);

  return (
    <div className="ios-glass-card p-5 md:p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900/90 to-slate-950 space-y-5 overflow-hidden w-full">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
          <Droplets className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold font-display text-white leading-tight">Hydration Station</h2>
          <p className="text-xs text-slate-400">Target: 2.5 Litres (2,500 ml) Daily</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Stats & Quick Log */}
        <div className="space-y-4 flex-1 w-full">
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl md:text-5xl font-black font-heading text-cyan-300 tracking-tight">
              {(waterConsumedMl / 1000).toFixed(1)} L
            </span>
            <span className="text-xs md:text-sm text-slate-400 font-semibold">
              / 2.5 L ({pct}% Done)
            </span>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => addWater(250)}
              className="px-4 py-3 rounded-2xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 flex-1 min-w-[120px] justify-center"
            >
              <Plus className="w-3.5 h-3.5" /> +250 ml Glass
            </button>
            <button
              onClick={() => addWater(500)}
              className="px-4 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 flex-1 min-w-[120px] justify-center"
            >
              <Plus className="w-3.5 h-3.5" /> +500 ml Bottle
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Hydration Tip:
            </div>
            <p className="text-slate-400 leading-relaxed font-medium text-[11px]">
              Drinking water in 500 ml portions keeps hair follicles nourished and boosts metabolism.
            </p>
          </div>
        </div>

        {/* Visual Liquid Cylinder */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex-shrink-0 w-32">
          <div className="relative w-20 h-44 bg-slate-900 rounded-2xl border-2 border-slate-700/80 overflow-hidden flex flex-col justify-end p-1">
            
            <div 
              className="w-full bg-gradient-to-t from-cyan-600 via-teal-400 to-cyan-300 rounded-xl transition-all duration-700 relative overflow-hidden"
              style={{ height: `${pct}%` }}
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/50 animate-ping" />
            </div>

            <div className="absolute inset-y-0 right-1.5 flex flex-col justify-between py-3 text-[9px] font-mono text-slate-500 font-bold pointer-events-none">
              <span>2.5L</span>
              <span>1.8L</span>
              <span>1.0L</span>
              <span>0.5L</span>
            </div>

          </div>

          <span className="text-[11px] font-bold text-slate-300 mt-2 text-center">
            {remainingMl > 0 ? `${remainingMl} ml left` : 'Goal Met! 🎉'}
          </span>
        </div>

      </div>

    </div>
  );
};
