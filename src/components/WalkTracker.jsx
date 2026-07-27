import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Footprints, Play, Pause, RotateCcw, Users, CheckCircle2, Flame, Heart } from 'lucide-react';

export const WalkTracker = () => {
  const { walkMinutesLogged, husbandWalkCompleted, addWalkMinutes } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [withHusbandMode, setWithHusbandMode] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isWalking) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  const toggleWalk = () => setIsWalking(!isWalking);
  const resetWalk = () => {
    setIsWalking(false);
    setSeconds(0);
  };

  const finishWalk = () => {
    const minsCompleted = Math.max(1, Math.round(seconds / 60));
    addWalkMinutes(minsCompleted, withHusbandMode);
    setIsWalking(false);
    setSeconds(0);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedSteps = Math.round((seconds / 60) * 120);

  return (
    <div className="ios-glass-card p-5 md:p-6 border-teal-500/30 bg-gradient-to-br from-teal-950/30 via-slate-900/90 to-slate-950 space-y-5 overflow-hidden w-full">
      
      {/* Header */}
      <div className="flex flex-col space-y-2 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex-shrink-0">
              <Footprints className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-display text-white leading-tight">Outdoor Walk</h2>
              <p className="text-xs text-slate-400">Target: 30–55 Minutes Daily</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> {walkMinutesLogged} Mins Logged
          </div>
        </div>
      </div>

      {/* Main Stopwatch Card */}
      <div className="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Walk Stopwatch</span>
          
          <button
            onClick={() => setWithHusbandMode(!withHusbandMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border self-start sm:self-auto ${
              withHusbandMode 
                ? 'bg-pink-500/20 text-pink-300 border-pink-500/50' 
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>{withHusbandMode ? 'Walking with Husband 👫' : '+ Husband Mode'}</span>
          </button>
        </div>

        {/* Big Timer */}
        <div className="flex flex-col items-center justify-center py-6 rounded-2xl bg-slate-900/90 border border-teal-500/20 w-full text-center">
          <div className="text-5xl md:text-6xl font-black font-mono text-teal-300 tracking-wider mb-1">
            {formatTimer(seconds)}
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Estimated ~{estimatedSteps} Steps
          </span>
        </div>

        {/* Action Controls - Wrapped & Responsive */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 w-full">
          <button
            onClick={toggleWalk}
            className="ios-btn-primary flex-1 min-w-[130px] py-3 text-xs md:text-sm font-extrabold"
          >
            {isWalking ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isWalking ? 'Pause Walk' : 'Start Walking'}</span>
          </button>

          <button
            onClick={finishWalk}
            disabled={seconds < 5}
            className="px-4 py-3 rounded-2xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 disabled:opacity-30 text-xs font-bold border border-teal-500/40 flex items-center justify-center gap-1.5 min-w-[100px]"
          >
            <CheckCircle2 className="w-4 h-4" /> Finish & Log
          </button>

          <button
            onClick={resetWalk}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Evening Husband Walk Card */}
      <div className="p-4 md:p-5 rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-950/30 via-slate-900 to-slate-950 space-y-3 w-full">
        <div className="flex items-center gap-2 text-pink-400 font-extrabold text-xs">
          <Heart className="w-4 h-4 fill-pink-500/40" /> 6:15 PM Sunset Walk With Husband
        </div>
        
        <h4 className="text-base font-bold text-white leading-tight font-display">
          Walking Together Encouraged 👫
        </h4>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          "Taking your husband for the evening walk builds mutual health discipline, releases daily stress, and keeps both of you motivated."
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-300 font-bold">Partner Walk Status:</span>
          <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
            husbandWalkCompleted 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {husbandWalkCompleted ? 'Completed Today! 🎉' : 'Scheduled 6:15 PM'}
          </span>
        </div>
      </div>

      {/* Quick Manual Log */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <span className="text-xs font-bold text-slate-300 flex-shrink-0">Quick Manual Log:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => addWalkMinutes(15, false)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-teal-300 border border-white/5"
          >
            +15 mins
          </button>
          <button 
            onClick={() => addWalkMinutes(30, true)}
            className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-xs font-bold text-pink-300 border border-pink-500/40"
          >
            +30 mins (with Husband)
          </button>
        </div>
      </div>

    </div>
  );
};
