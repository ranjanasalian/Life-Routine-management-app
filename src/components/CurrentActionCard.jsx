import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle2, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const CurrentActionCard = () => {
  const { timeline, toggleTimelineItem, addWater, setActiveTab } = useApp();

  const currentAction = timeline.find(item => !item.completed) || {
    id: 'completed_all',
    title: "All Goals Completed Today 🎉",
    description: "You have completed your daily routine mission. Enjoy a serene, peaceful evening.",
    why: "Consistency builds grace, health, and peace of mind.",
    duration: 'Rest Mode',
    time: 'Now',
    actionText: 'View Daily Reflection',
    actionType: 'reflection_done'
  };

  const handleAction = () => {
    if (currentAction.id === 'completed_all') {
      setActiveTab('health');
      return;
    }

    if (currentAction.actionType === 'water') {
      addWater(500);
    } else if (currentAction.actionType === 'yoga') {
      setActiveTab('yoga');
    } else if (currentAction.actionType === 'walk' || currentAction.actionType === 'walk_husband') {
      setActiveTab('schedule');
    } else if (currentAction.actionType === 'meal') {
      setActiveTab('nutrition');
    } else if (currentAction.actionType === 'reflection') {
      setActiveTab('health');
    } else {
      toggleTimelineItem(currentAction.id);
    }
  };

  return (
    <div className="ios-glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 space-y-6">
      
      {/* Top Header Tag */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> WHAT TO DO RIGHT NOW
        </span>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-emerald-400" /> {currentAction.time}
        </span>
      </div>

      {/* Main Focus Title */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white leading-tight">
          {currentAction.title}
        </h2>
        <p className="text-sm text-slate-300 font-medium leading-relaxed">
          {currentAction.description}
        </p>
      </div>

      {/* Rationale Pill */}
      {currentAction.why && (
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 text-xs text-slate-300 font-medium flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span><strong className="text-emerald-400">Why it matters:</strong> {currentAction.why}</span>
        </div>
      )}

      {/* Direct Action Button */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleAction}
          className="ios-btn-primary flex-1 py-4 text-sm"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{currentAction.actionText || 'Start Task'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {currentAction.id !== 'completed_all' && (
          <button
            onClick={() => toggleTimelineItem(currentAction.id)}
            className="ios-btn-secondary p-4 rounded-2xl"
            title="Mark Done"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </button>
        )}
      </div>

    </div>
  );
};
