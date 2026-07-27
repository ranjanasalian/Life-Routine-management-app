import React, { useState } from 'react';
import { Sparkles, Edit2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PreLaunchReviewSummary = ({ profilesArray, onConfirmLaunch }) => {
  const [profiles, setProfiles] = useState(profilesArray);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const openEdit = (pIdx, field, currentVal) => {
    setEditingIdx(pIdx);
    setEditField(field);
    setEditValue(currentVal || '');
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (editingIdx === null || !editField) return;

    setProfiles(prev => {
      const copy = [...prev];
      copy[editingIdx] = { ...copy[editingIdx], [editField]: editValue };
      return copy;
    });

    setEditingIdx(null);
    setEditField('');
    setEditValue('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05070c] text-slate-100 flex flex-col justify-between max-w-xl mx-auto px-4 py-6 font-sans overflow-y-auto no-scrollbar">
      
      {/* Header */}
      <div className="space-y-2 text-center pt-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold font-display text-white">Review Your Companion Plan</h1>
        <p className="text-xs text-slate-400 font-medium">Please review & edit your parameters before launching</p>
      </div>

      {/* Profiles Review Cards */}
      <div className="space-y-6 my-auto py-4">
        {profiles.map((p, idx) => {
          const isPrimary = p.relationship === 'primary' || idx === 0;

          return (
            <div key={idx} className="ios-glass-card p-6 border-emerald-500/30 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{isPrimary ? '🌿' : '⚡'}</span>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      {p.userName || (isPrimary ? 'Primary User' : 'Family Member')}
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-extrabold uppercase">
                      {isPrimary ? 'Primary Profile' : `${p.relationship || 'Family Member'} Profile`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Name */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Name</span>
                    <strong className="text-white font-bold">{p.userName || 'Not set'}</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'userName', p.userName)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Age */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Age</span>
                    <strong className="text-white font-bold">{p.age || 30} years</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'age', p.age)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Height & Weight */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Height / Weight</span>
                    <strong className="text-white font-bold">{p.heightCm || 165} cm / {p.weightKg || 60} kg</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'weightKg', p.weightKg)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Target Weight */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Target Weight</span>
                    <strong className="text-emerald-400 font-bold">{p.targetWeightKg || 55} kg</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'targetWeightKg', p.targetWeightKg)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sleep & Wake */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Sleep / Wake Schedule</span>
                    <strong className="text-white font-bold">{p.wakeTime || '7:30 AM'} - {p.sleepTime || '10:45 PM'}</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'sleepTime', p.sleepTime)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Water Target */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Water Goal</span>
                    <strong className="text-cyan-400 font-bold">{p.waterTargetMl || 2500} ml / day</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'waterTargetMl', p.waterTargetMl)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Meal Preference */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between col-span-1 sm:col-span-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Diet Preference</span>
                    <strong className="text-white font-bold">{p.dietType || 'Non-vegetarian'}</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'dietType', p.dietType)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Health Concerns */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between col-span-1 sm:col-span-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Health Concerns</span>
                    <strong className="text-white font-bold">{Array.isArray(p.healthConcerns) ? p.healthConcerns.join(', ') : (p.healthConcerns || 'None')}</strong>
                  </div>
                  <button onClick={() => openEdit(idx, 'healthConcerns', p.healthConcerns)} className="text-slate-400 hover:text-emerald-400 p-1">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Edit Modal Inline Popup */}
      {editingIdx !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4">
          <form onSubmit={saveEdit} className="w-full max-w-sm ios-glass-card p-6 border-emerald-500/40 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Edit {editField}</h4>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditingIdx(null)} className="px-4 py-2 text-xs text-slate-400 font-bold">
                Cancel
              </button>
              <button type="submit" className="ios-btn-primary px-5 py-2 text-xs font-bold">
                Save Parameter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirm & Launch CTA */}
      <div className="pt-2 pb-4 space-y-2">
        <button
          onClick={() => onConfirmLaunch(profiles)}
          className="w-full ios-btn-primary py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-2xl"
        >
          <CheckCircle2 className="w-5 h-5 text-slate-950 fill-emerald-400" />
          <span>Confirm & Launch Personalised Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[10px] text-center text-slate-500">You can edit any parameter anytime in Settings</p>
      </div>

    </div>
  );
};
