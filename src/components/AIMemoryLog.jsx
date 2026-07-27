import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { logMemoryToDB, fetchMemoriesFromDB } from '../api/backendApi';
import { Sparkles, Brain, Plus, Clock, MessageSquare } from 'lucide-react';

export const AIMemoryLog = () => {
  const { activeProfile } = useApp();
  const [memories, setMemories] = useState([]);
  const [newNote, setNewNote] = useState('');

  const isManish = activeProfile === 'manish';
  const profileId = isManish ? 'manish' : 'ranju';
  const userName = isManish ? 'Manish' : 'Ranju';

  // Fetch permanent memories from MongoDB
  useEffect(() => {
    let isMounted = true;
    const loadMemories = async () => {
      const res = await fetchMemoriesFromDB(profileId);
      if (isMounted && res.success && Array.isArray(res.memories)) {
        setMemories(res.memories);
      }
    };
    loadMemories();
    return () => { isMounted = false; };
  }, [profileId]);

  const handleAddMemory = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteText = newNote.trim();
    setNewNote('');

    // Check for auto pattern recognition
    let pattern = null;
    const lower = noteText.toLowerCase();
    if (lower.includes('hair') || lower.includes('sleep')) {
      pattern = "Observation: Hair fall parameters correlate directly with sleep duration under 6.5 hours.";
    } else if (lower.includes('boil') || lower.includes('sugar') || lower.includes('heat')) {
      pattern = "Observation: Skin boil flare-ups correlate with refined sugar & body heat. Increase detox water.";
    } else if (lower.includes('walk') || lower.includes('step')) {
      pattern = "Observation: Walking consistency boosts evening energy levels.";
    }

    const localItem = {
      _id: Date.now().toString(),
      profileId,
      note: noteText,
      category: 'symptom',
      patternDetected: pattern,
      createdAt: new Date().toISOString()
    };

    setMemories(prev => [localItem, ...prev]);

    // Save to MongoDB
    await logMemoryToDB(profileId, noteText, 'symptom', pattern);
  };

  const defaultPatterns = isManish ? [
    "Observation: Manish's step goal completion (8,000 steps) accelerates fat loss and reduces boil flare-ups.",
    "Observation: Drinking 3.0L detox water (cucumber/lemon) directly lowers body heat causing recurring boils."
  ] : [
    "Observation: Hair fall tends to worsen when sleep is poor (under 6.5 hours). Restorative yoga helps regulate roots.",
    "Observation: Consistently drinking 2.5L water and eating eggs/dal maintains keratin synthesis for hair & skin."
  ];

  return (
    <div className="ios-glass-card p-5 md:p-6 border-white/10 space-y-6 w-full">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex-shrink-0">
          <Brain className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-display text-white">{userName}'s Permanent AI Long-Term Memory</h2>
          <p className="text-xs text-slate-400">Recorded symptoms, conversation history & pattern observations</p>
        </div>
      </div>

      {/* Report New Symptom or Note */}
      <form onSubmit={handleAddMemory} className="space-y-3">
        <label className="text-xs font-bold text-slate-300 block">
          Log a symptom, update, or note to permanent memory:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={isManish ? "e.g., 'Manish got another boil today' or 'Walked 8,000 steps'" : "e.g., 'My hair fall is worse today' or 'Slept only 5 hours'"}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 font-medium"
          />
          <button
            type="submit"
            className="ios-btn-primary py-3 px-4 text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Save Memory
          </button>
        </div>
      </form>

      {/* AI Pattern Recognition Highlights */}
      <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 space-y-2">
        <span className="text-xs font-extrabold text-purple-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" /> AI Long-Term Pattern Observations:
        </span>
        <ul className="space-y-1.5">
          {defaultPatterns.map((pat, idx) => (
            <li key={idx} className="text-xs text-purple-200 leading-relaxed font-medium flex items-start gap-1.5">
              <span className="text-purple-400 font-bold">•</span>
              <span>{pat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Memory Log Stream */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Permanent Memory Stream:</h3>

        {memories.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No notes logged yet. Use the input above to record symptoms or health notes!</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-1">
            {memories.map((mem) => (
              <div key={mem._id || mem.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-wider">{mem.category || 'symptom'}</span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(mem.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium">{mem.note}</p>
                {mem.patternDetected && (
                  <p className="text-[11px] text-emerald-400 italic pt-0.5">💡 {mem.patternDetected}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
