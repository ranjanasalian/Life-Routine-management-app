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

export const LifeTimeline = () => {
  const { activeProfile, currentProfileData, timeline = [], toggleTimelineItem, addWater, setActiveTab } = useApp();

  const isManish = activeProfile === 'manish';
  const isCouple = activeProfile === 'couple';
  const activeTimeline = Array.isArray(timeline) && timeline.length > 0 
    ? timeline 
    : (Array.isArray(currentProfileData?.timeline) ? currentProfileData.timeline : []);

  const handleAction = (item) => {
    if (item.actionType === 'water') {
      addWater(500);
    } else if (item.actionType === 'yoga') {
      setActiveTab('health');
    } else if (item.actionType === 'meal') {
      setActiveTab('health');
    } else if (item.actionType === 'reflection') {
      setActiveTab('health');
    } else {
      toggleTimelineItem(item.id);
    }
  };

  return (
    <div className="ios-glass-card p-5 md:p-6 border-white/10 space-y-6 w-full">
      
      {/* Timeline Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display text-white">
            {isCouple ? "Our Shared Life Timeline 👫" : `${isManish ? "Manish's" : "Ranju's"} Life Timeline`}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {isManish ? 'Guiding 8,000 steps & metabolic fat loss' : 'Guiding hair recovery, glowing skin & yoga'}
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          {activeTimeline.filter(t => t.completed).length} / {activeTimeline.length} Done
        </span>
      </div>

      {/* Sequential Time Nodes */}
      <div className="space-y-4">
        {activeTimeline.map((item, index) => {
          const isDone = item.completed;
          const isHusbandWalk = item.actionType === 'walk_husband';

          return (
            <div 
              key={item.id || index}
              className={`p-4 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-slate-950/40 border-white/5 opacity-60' 
                  : isHusbandWalk
                    ? 'bg-gradient-to-r from-pink-950/30 via-slate-900 to-slate-950 border-pink-500/30 shadow-md'
                    : 'bg-slate-950/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    {item.duration && (
                      <span className="text-[11px] text-slate-400 font-semibold">• {item.duration}</span>
                    )}
                    {isHusbandWalk && (
                      <span className="text-[10px] font-extrabold text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> Walk Together 👫
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {item.description}
                  </p>

                  {item.why && (
                    <p className="text-[11px] text-slate-400 italic pt-0.5">
                      💡 <strong className="text-emerald-400 font-semibold">Why this matters:</strong> {item.why}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
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
                        <Play className="w-3 h-3 fill-slate-950" /> {item.actionText || 'Start'}
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
