import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { YOGA_POSES } from '../data/scheduleData';
import { Play, Pause, RotateCcw, CheckCircle2, Heart, Volume2, ShieldCheck, Flower2 } from 'lucide-react';

export const YogaStudio = () => {
  const { yogaSessionCompleted, completeYogaSession } = useApp();
  const [selectedPoseIndex, setSelectedPoseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(YOGA_POSES[0].durationSec);

  const activePose = YOGA_POSES[selectedPoseIndex];

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (selectedPoseIndex < YOGA_POSES.length - 1) {
        setSelectedPoseIndex(prev => prev + 1);
        setTimeLeft(YOGA_POSES[selectedPoseIndex + 1].durationSec);
      } else {
        completeYogaSession();
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, selectedPoseIndex, completeYogaSession]);

  const handleSelectPose = (index) => {
    setSelectedPoseIndex(index);
    setIsActive(false);
    setTimeLeft(YOGA_POSES[index].durationSec);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(activePose.durationSec);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="ios-glass-card p-5 md:p-6 border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-slate-900/90 to-slate-950 space-y-5 overflow-hidden w-full">
      
      {/* Header */}
      <div className="flex flex-col space-y-2 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex-shrink-0">
              <Heart className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-display text-white leading-tight">Yoga Sanctuary</h2>
              <p className="text-xs text-slate-400">20-Minute Restorative Sequence</p>
            </div>
          </div>

          {yogaSessionCompleted && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Session Complete!
            </span>
          )}
        </div>
      </div>

      {/* Poses Deck */}
      <div className="space-y-2.5">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Yoga Flow Sequence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {YOGA_POSES.map((pose, index) => {
            const isCurrent = index === selectedPoseIndex;
            return (
              <div
                key={pose.id}
                onClick={() => handleSelectPose(index)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-rose-950/60 border-rose-500/60 text-white font-bold' 
                    : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-[10px] font-extrabold ${
                      isCurrent ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{pose.name}</h4>
                      <span className="text-[10px] text-slate-400">{pose.displayDuration}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-rose-400 font-bold">
                    {isCurrent ? 'Active' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Pose Guide */}
      <div className="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4 w-full">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <Flower2 className="w-3.5 h-3.5" /> Pose {selectedPoseIndex + 1} of 4
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-rose-400" /> Ambient Voice Audio
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading text-white">
          {activePose.name}
        </h3>

        {/* Timer Box */}
        <div className="flex flex-col items-center justify-center py-6 rounded-2xl bg-slate-900/90 border border-rose-500/30 w-full relative">
          <div className="text-5xl md:text-6xl font-black font-mono text-rose-400 tracking-wider mb-2">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTimer}
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {isActive ? <Pause className="w-4 h-4 fill-current mr-1" /> : <Play className="w-4 h-4 fill-current mr-1" />}
              <span>{isActive ? 'Pause' : 'Start Pose'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              title="Reset Pose Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Benefit */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs space-y-0.5">
          <div className="flex items-center gap-1 text-rose-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Wellness Benefit:
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed font-medium">{activePose.benefit}</p>
        </div>

        {/* Steps */}
        <div className="space-y-1.5 pt-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step-by-Step Guidance:</h4>
          <ul className="space-y-1.5">
            {activePose.instructions.map((step, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 font-medium">
                <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[9px] font-extrabold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[11px]">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={completeYogaSession}
        className="w-full ios-btn-primary py-3 text-xs font-extrabold shadow-lg"
      >
        <CheckCircle2 className="w-4 h-4" /> Log Full 20-Min Session Complete
      </button>

    </div>
  );
};
