import React from 'react';
import { useApp } from '../context/AppContext';
import { MEAL_OPTIONS } from '../data/scheduleData';
import { Utensils, Apple, Salad, Egg, CheckCircle2, PieChart } from 'lucide-react';

export const NutritionGuide = () => {
  const { 
    loggedMeals, 
    logMeal, 
    dailyFruitLogged, 
    toggleFruit, 
    dailyVegLogged, 
    toggleVeg
  } = useApp();

  return (
    <div className="space-y-5 w-full">
      
      {/* Healthy Plate Guide Visual Banner */}
      <div className="ios-glass-card p-5 md:p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 space-y-4 overflow-hidden w-full">
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" /> HEALTHY PLATE GUIDE
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold font-heading text-white">
            Optimal Macro Balance
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Structure every meal according to these exact proportions to fuel hair regrowth and steady energy:
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-sm md:text-base font-black text-emerald-400 block font-heading">1/2</span>
            <span className="text-[10px] font-bold text-slate-300">Veggies</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-teal-500/30">
            <span className="text-sm md:text-base font-black text-teal-400 block font-heading">1/4</span>
            <span className="text-[10px] font-bold text-slate-300">Rice</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/30">
            <span className="text-sm md:text-base font-black text-amber-400 block font-heading">1/4</span>
            <span className="text-[10px] font-bold text-slate-300">Protein</span>
          </div>
        </div>

        {/* Visual Plate */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-white/10 w-full">
          <div className="relative w-36 h-36 rounded-full border-4 border-slate-700/80 bg-slate-900 overflow-hidden flex items-center justify-center">
            
            <div className="absolute inset-y-0 left-0 w-1/2 bg-emerald-500/25 border-r border-slate-700 flex flex-col items-center justify-center p-1 text-center">
              <Salad className="w-5 h-5 text-emerald-400 mb-0.5" />
              <span className="text-[9px] font-black text-emerald-300">50% Veg</span>
            </div>

            <div className="absolute inset-y-0 right-0 w-1/2 flex flex-col">
              <div className="h-1/2 bg-teal-500/25 border-b border-slate-700 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[9px] font-black text-teal-300">25% Rice</span>
              </div>
              <div className="h-1/2 bg-amber-500/25 flex flex-col items-center justify-center p-1 text-center">
                <Egg className="w-4 h-4 text-amber-400" />
                <span className="text-[9px] font-black text-amber-300">25% Protein</span>
              </div>
            </div>

          </div>
          <span className="text-[11px] font-bold text-slate-400 mt-2">Healthy Plate Model</span>
        </div>

      </div>

      {/* Micro Habits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        
        <div 
          onClick={toggleFruit}
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
            dailyFruitLogged ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' : 'ios-glass-card border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Apple className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Daily Fruit</h4>
              <p className="text-[10px] text-slate-400">Apple / Berries</p>
            </div>
          </div>
          {dailyFruitLogged ? <CheckCircle2 className="w-5 h-5 text-amber-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
        </div>

        <div 
          onClick={toggleVeg}
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
            dailyVegLogged ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'ios-glass-card border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Salad className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">1/2 Veggies</h4>
              <p className="text-[10px] text-slate-400">Greens & Fiber</p>
            </div>
          </div>
          {dailyVegLogged ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-slate-700" />}
        </div>

        <div className="p-4 rounded-2xl ios-glass-card border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
              <Egg className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Protein Target</h4>
              <p className="text-[10px] text-slate-400">Egg / Dal / Fish</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/40">
            Active
          </span>
        </div>

      </div>

      {/* Meals Options */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-heading text-white">Meal Log & Suggestions</h3>

        <div className="space-y-4">
          
          {/* Breakfast */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" /> Breakfast (8:30 AM)
              </span>
              {loggedMeals.breakfast && (
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {MEAL_OPTIONS.breakfast.map((m) => {
                const isSelected = loggedMeals.breakfast === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('breakfast', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">{m.protein}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lunch */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Salad className="w-4 h-4 text-teal-400" /> Lunch (1:00 PM)
              </span>
              {loggedMeals.lunch && (
                <span className="text-[10px] font-extrabold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {MEAL_OPTIONS.lunch.map((m) => {
                const isSelected = loggedMeals.lunch === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('lunch', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-teal-950/50 border-teal-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-teal-400 font-mono font-bold">{m.protein}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dinner */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" /> Dinner (8:00 PM)
              </span>
              {loggedMeals.dinner && (
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {MEAL_OPTIONS.dinner.map((m) => {
                const isSelected = loggedMeals.dinner === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('dinner', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-amber-950/50 border-amber-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">{m.protein}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
