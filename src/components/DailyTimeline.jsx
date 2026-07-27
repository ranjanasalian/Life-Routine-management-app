import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  Droplets, 
  Footprints, 
  Utensils, 
  Salad, 
  UserCheck, 
  HeartHandshake, 
  Users, 
  UtensilsCrossed, 
  Moon, 
  Sparkles,
  CheckCircle2,
  Clock,
  Play,
  Heart
} from 'lucide-react';

const ICON_MAP = {
  Sun,
  Droplets,
  Footprints,
  Utensils,
  Salad,
  UserCheck,
  HeartHandshake,
  Users,
  UtensilsCrossed,
  Moon,
  Sparkles
};

export const DailyTimeline = () => {
  const { timeline, toggleTimelineItem, addWater, setActiveTab } = useApp();

  const handleAction = (item) => {
    if (item.actionType === 'water') {
      addWater(500);
    } else if (item.actionType === 'yoga') {
      setActiveTab('yoga');
    } else if (item.actionType === 'meal') {
      setActiveTab('nutrition');
    } else if (item.actionType === 'reflection') {
      setActiveTab('health');
    } else {
      toggleTimelineItem(item.id);
    }
  };

  return (
    <div className="ios-glass-card p-6 border-white/10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Daily Flow</h2>
          <p className="text-xs text-slate-400 font-medium">Timeline schedule from 7:30 AM to bedtime</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-white/5">
          {timeline.filter(t => t.completed).length} / {timeline.length}
        </span>
      </div>

      {/* Stream */}
      <div className="space-y-4">
        {timeline.map((item) => {
          const isDone = item.completed;
          const isHusbandWalk = item.actionType === 'walk_husband';

          return (
            <div 
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-slate-950/40 border-white/5 opacity-60' 
                  : isHusbandWalk
                    ? 'bg-gradient-to-r from-pink-950/30 via-slate-900 to-slate-950 border-pink-500/30'
                    : 'bg-slate-950/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {item.time}
                    </span>
                    {isHusbandWalk && (
                      <span className="text-[10px] font-bold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> Husband Walk 👫
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleAction(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isDone 
                        ? 'bg-slate-800 text-slate-400' 
                        : 'ios-btn-primary py-2 px-4 text-xs'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-slate-950" /> {item.actionText}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
