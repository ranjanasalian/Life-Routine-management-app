import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchHealthLogsFromDB, saveHealthLogToDB } from '../api/backendApi';
import { TrendingUp, Plus, Award, Activity, Heart, Sparkles, Clock } from 'lucide-react';

export const HealthTimelineView = () => {
  const { activeProfileId, currentProfileData = {} } = useApp();
  const [logs, setLogs] = useState([]);
  const [newType, setNewType] = useState('weight');
  const [newValue, setNewValue] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const userName = currentProfileData?.userName || 'User';

  useEffect(() => {
    let isMounted = true;
    const loadLogs = async () => {
      const res = await fetchHealthLogsFromDB(activeProfileId);
      if (isMounted && res.success && Array.isArray(res.logs)) {
        setLogs(res.logs);
      }
    };
    loadLogs();
    return () => { isMounted = false; };
  }, [activeProfileId]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!newValue.trim()) return;

    const val = newValue.trim();
    const note = newNotes.trim();
    setNewValue('');
    setNewNotes('');

    const localLog = {
      _id: Date.now().toString(),
      profileId: activeProfileId,
      logType: newType,
      value: val,
      notes: note,
      createdAt: new Date().toISOString()
    };

    setLogs(prev => [localLog, ...prev]);
    await saveHealthLogToDB(activeProfileId, newType, val, note);
  };

  return (
    <div className="space-y-6 w-full pb-6">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">{userName}'s Health Timeline</h2>
            <p className="text-xs text-slate-400 font-medium">Visual log of weight, water, sleep, hair/skin & symptoms</p>
          </div>
        </div>
      </div>

      {/* Log New Health Entry Form */}
      <form onSubmit={handleAddLog} className="ios-glass-card p-5 border-white/10 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-emerald-400" /> Log New Metric or Observation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="weight">Weight Update (kg)</option>
            <option value="hair_fall">Hair Fall Rating</option>
            <option value="skin_glow">Skin Progress</option>
            <option value="boils">Boil Log / Heat</option>
            <option value="water">Water Intake (ml)</option>
            <option value="sleep">Sleep Hours</option>
            <option value="mood">Mood / Energy</option>
            <option value="achievement">Achievement</option>
          </select>

          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value (e.g. 59.5 kg or Low Hair Fall)"
            className="p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            className="ios-btn-primary py-3 text-xs font-bold"
          >
            Save Entry
          </button>
        </div>
      </form>

      {/* Chronological Health Logs */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timeline Log Stream:</h3>

        {logs.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-4">No health entries logged yet. Add weight or symptom updates above!</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log._id || log.id} className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {log.logType}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {new Date(log.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-sm font-bold text-white pt-1">{log.value}</div>
                {log.notes && <p className="text-xs text-slate-400 italic">"{log.notes}"</p>}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
