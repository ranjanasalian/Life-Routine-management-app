import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Edit3, UserPlus, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SettingsView = () => {
  const { profiles = [], activeProfileId, switchProfile, setDynamicProfilesAndCompleteOnboarding, resetDay } = useApp();

  const [activeSettingsIdx, setActiveSettingsIdx] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentP = profiles[activeSettingsIdx] || profiles[0] || {};

  const [formData, setFormData] = useState({
    userName: currentP.userName || '',
    age: currentP.age || 30,
    heightCm: currentP.heightCm || 165,
    weightKg: currentP.weightKg || 60,
    targetWeightKg: currentP.targetWeightKg || 55,
    wakeTime: currentP.wakeTime || '7:30 AM',
    sleepTime: currentP.sleepTime || '10:45 PM',
    waterTargetMl: currentP.waterTargetMl || 2500,
    dietType: currentP.dietType || 'Non-vegetarian',
    healthConcerns: Array.isArray(currentP.healthConcerns) ? currentP.healthConcerns.join(', ') : (currentP.healthConcerns || ''),
    healthGoals: Array.isArray(currentP.healthGoals) ? currentP.healthGoals.join(', ') : (currentP.healthGoals || ''),
    allergies: currentP.allergies || 'None',
    medications: currentP.medications || 'None',
    remindersDesired: currentP.remindersDesired || 'Water, walks, meals, sleep'
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedProfiles = profiles.map((p, idx) => {
      if (idx === activeSettingsIdx) {
        return {
          ...p,
          ...formData,
          age: parseInt(formData.age) || 30,
          heightCm: parseInt(formData.heightCm) || 165,
          weightKg: parseInt(formData.weightKg) || 60,
          targetWeightKg: parseInt(formData.targetWeightKg) || 55,
          waterTargetMl: parseInt(formData.waterTargetMl) || 2500,
          healthConcerns: typeof formData.healthConcerns === 'string' ? formData.healthConcerns.split(',').map(s => s.trim()).filter(Boolean) : [],
          healthGoals: typeof formData.healthGoals === 'string' ? formData.healthGoals.split(',').map(s => s.trim()).filter(Boolean) : []
        };
      }
      return p;
    });

    setDynamicProfilesAndCompleteOnboarding(updatedProfiles);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 w-full pb-6">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
            <Settings className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">Application & Profile Settings</h2>
            <p className="text-xs text-slate-400">Edit any parameter anytime. AI updates recommendations instantly.</p>
          </div>
        </div>
      </div>

      {/* Profiles Tabs Selector */}
      <div className="ios-glass-card p-2 border-white/10 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {profiles.map((p, idx) => (
          <button
            key={p.profileId || idx}
            onClick={() => {
              setActiveSettingsIdx(idx);
              setFormData({
                userName: p.userName || '',
                age: p.age || 30,
                heightCm: p.heightCm || 165,
                weightKg: p.weightKg || 60,
                targetWeightKg: p.targetWeightKg || 55,
                wakeTime: p.wakeTime || '7:30 AM',
                sleepTime: p.sleepTime || '10:45 PM',
                waterTargetMl: p.waterTargetMl || 2500,
                dietType: p.dietType || 'Non-vegetarian',
                healthConcerns: Array.isArray(p.healthConcerns) ? p.healthConcerns.join(', ') : (p.healthConcerns || ''),
                healthGoals: Array.isArray(p.healthGoals) ? p.healthGoals.join(', ') : (p.healthGoals || ''),
                allergies: p.allergies || 'None',
                medications: p.medications || 'None',
                remindersDesired: p.remindersDesired || 'Water, walks, meals, sleep'
              });
            }}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
              activeSettingsIdx === idx 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md' 
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            {p.avatar || '🌿'} {p.userName} ({p.relationship || 'Profile'})
          </button>
        ))}
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile parameters updated! AI Companion recommendations regenerated.</span>
        </div>
      )}

      {/* Edit Settings Form */}
      <form onSubmit={handleSaveSettings} className="ios-glass-card p-6 border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white font-display flex items-center gap-2 pb-2 border-b border-white/10">
          <Edit3 className="w-4 h-4 text-emerald-400" /> Edit Parameters for {currentP.userName || 'Profile'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Full Name</label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => handleChange('userName', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Age (years)</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Height */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Height (cm)</label>
            <input
              type="number"
              value={formData.heightCm}
              onChange={(e) => handleChange('heightCm', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Weight */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Current Weight (kg)</label>
            <input
              type="number"
              value={formData.weightKg}
              onChange={(e) => handleChange('weightKg', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Target Weight */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Target Weight Goal (kg)</label>
            <input
              type="number"
              value={formData.targetWeightKg}
              onChange={(e) => handleChange('targetWeightKg', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Water Goal */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Daily Water Target (ml)</label>
            <input
              type="number"
              value={formData.waterTargetMl}
              onChange={(e) => handleChange('waterTargetMl', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Wake Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Wake-Up Time</label>
            <input
              type="text"
              value={formData.wakeTime}
              onChange={(e) => handleChange('wakeTime', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sleep Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400">Bedtime Sleep Schedule</label>
            <input
              type="text"
              value={formData.sleepTime}
              onChange={(e) => handleChange('sleepTime', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Diet Preference */}
          <div className="space-y-1 col-span-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-400">Diet Preference</label>
            <select
              value={formData.dietType}
              onChange={(e) => handleChange('dietType', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Non-vegetarian">Non-vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </div>

          {/* Health Concerns */}
          <div className="space-y-1 col-span-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-400">Health Concerns (comma separated)</label>
            <textarea
              rows={2}
              value={formData.healthConcerns}
              onChange={(e) => handleChange('healthConcerns', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Health Goals */}
          <div className="space-y-1 col-span-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-slate-400">Top Health Goals (comma separated)</label>
            <textarea
              rows={2}
              value={formData.healthGoals}
              onChange={(e) => handleChange('healthGoals', e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full ios-btn-primary py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Changes & Regenerate AI Plans</span>
        </button>

      </form>

      {/* Reset Simulation Control */}
      <div className="ios-glass-card p-5 border-rose-500/30 text-center space-y-3">
        <h4 className="text-xs font-bold text-rose-400">Reset Application State</h4>
        <p className="text-[11px] text-slate-400">Clear local session data and restart fresh onboarding setup.</p>
        <button
          onClick={() => {
            if (window.confirm("Reset all profiles and restart onboarding?")) {
              resetDay();
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold"
        >
          Reset & Restart Setup
        </button>
      </div>

    </div>
  );
};
