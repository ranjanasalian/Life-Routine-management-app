import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Apple, Salad, Egg, CheckCircle2, PieChart, Sparkles } from 'lucide-react';

export const NutritionGuide = () => {
  const { 
    activeProfile,
    ranju,
    manish,
    logMeal, 
    toggleFruit, 
    toggleVeg
  } = useApp();

  const isManish = activeProfile === 'manish';
  const profileData = isManish ? manish : ranju;
  const mealsData = profileData.mealsData;
  const loggedMeals = profileData.loggedMeals;

  return (
    <div className="space-y-5 w-full">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 space-y-3 overflow-hidden w-full">
        
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" /> {isManish ? "MANISH'S FAT LOSS DIET" : "RANJU'S HAIR & SKIN DIET"}
          </span>
          <span className="text-[10px] font-mono text-emerald-400">Nutrient Focus</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold font-heading text-white">
            {isManish ? 'High-Fiber & Metabolic Nutrition' : 'Keratin & Collagen Nutrition'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {isManish 
              ? 'Designed to lower insulin spikes, accelerate body fat loss, and cleanse internal heat causing skin boils.' 
              : 'Formulated with Protein, Zinc, Iron, Vitamin D, B12, and Omega-3 to reverse hair fall and boost skin glow.'}
          </p>
        </div>

        {/* Macro ratio */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-sm md:text-base font-black text-emerald-400 block font-heading">{isManish ? '60%' : '50%'}</span>
            <span className="text-[10px] font-bold text-slate-300">{isManish ? 'Fiber/Salad' : 'Veggies'}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-teal-500/30">
            <span className="text-sm md:text-base font-black text-teal-400 block font-heading">{isManish ? '15%' : '25%'}</span>
            <span className="text-[10px] font-bold text-slate-300">{isManish ? 'Complex Carbs' : 'Brown Rice'}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/30">
            <span className="text-sm md:text-base font-black text-amber-400 block font-heading">{isManish ? '25%' : '25%'}</span>
            <span className="text-[10px] font-bold text-slate-300">Lean Protein</span>
          </div>
        </div>

      </div>

      {/* Meals Suggestions */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Utensils className="w-4 h-4 text-emerald-400" /> Curated Meal Recommendations
        </h3>

        <div className="space-y-4">
          
          {/* Breakfast */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" /> Breakfast
              </span>
              {loggedMeals.breakfast && (
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {mealsData.breakfast.map((m) => {
                const isSelected = loggedMeals.breakfast === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('breakfast', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                      isSelected 
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">{m.protein} protein</span>
                    </div>
                    <p className="text-[10px] text-emerald-300/90 font-medium italic">💡 {m.why}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lunch */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Salad className="w-4 h-4 text-teal-400" /> Lunch
              </span>
              {loggedMeals.lunch && (
                <span className="text-[10px] font-extrabold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {mealsData.lunch.map((m) => {
                const isSelected = loggedMeals.lunch === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('lunch', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                      isSelected 
                        ? 'bg-teal-950/50 border-teal-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-teal-400 font-mono font-bold">{m.protein} protein</span>
                    </div>
                    <p className="text-[10px] text-teal-300/90 font-medium italic">💡 {m.why}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dinner */}
          <div className="ios-glass-card p-4 border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" /> Dinner
              </span>
              {loggedMeals.dinner && (
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">Logged</span>
              )}
            </div>

            <div className="space-y-2">
              {mealsData.dinner.map((m) => {
                const isSelected = loggedMeals.dinner === m.name;
                return (
                  <div
                    key={m.id}
                    onClick={() => logMeal('dinner', m.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                      isSelected 
                        ? 'bg-amber-950/50 border-amber-500/60 text-white font-bold' 
                        : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{m.name}</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">{m.protein} protein</span>
                    </div>
                    <p className="text-[10px] text-amber-300/90 font-medium italic">💡 {m.why}</p>
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
