import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchMemoriesFromDB, deleteMemoryFromDB, clearMemoriesFromDB } from '../api/backendApi';
import { Shield, Trash2, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AIMemoryPrivacyView = () => {
  const { activeProfileId, currentProfileData = {} } = useApp();
  const [memories, setMemories] = useState([]);
  const [msg, setMsg] = useState('');

  const userName = currentProfileData?.userName || 'User';

  const loadMemories = async () => {
    const res = await fetchMemoriesFromDB(activeProfileId);
    if (res.success && Array.isArray(res.memories)) {
      setMemories(res.memories);
    }
  };

  useEffect(() => {
    loadMemories();
  }, [activeProfileId]);

  const handleDeleteOne = async (id) => {
    setMemories(prev => prev.filter(m => (m._id || m.id) !== id));
    await deleteMemoryFromDB(id);
    setMsg('Memory deleted.');
    setTimeout(() => setMsg(''), 2000);
  };

  const handleClearAll = async () => {
    if (window.confirm(`Clear all AI memory notes for ${userName}?`)) {
      setMemories([]);
      await clearMemoriesFromDB(activeProfileId);
      setMsg('All memory notes cleared.');
      setTimeout(() => setMsg(''), 2000);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile: currentProfileData, memories }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${userName}_companion_memory_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 w-full pb-6">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">AI Memory & Data Privacy Controls</h2>
            <p className="text-xs text-slate-400 font-medium">Full ownership of your health data, memory logs & JSON backups</p>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleExportJSON}
          className="ios-btn-primary py-3.5 text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Export Data (JSON)
        </button>

        <button
          onClick={handleClearAll}
          className="px-4 py-3.5 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Clear All Memories
        </button>
      </div>

      {msg && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
          {msg}
        </div>
      )}

      {/* Memory List with Individual Delete */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stored Memory Log Entries:</h3>

        {memories.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-4">No stored memory notes found for {userName}.</p>
        ) : (
          <div className="space-y-2">
            {memories.map((mem) => {
              const memId = mem._id || mem.id;
              return (
                <div key={memId} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-purple-400 font-extrabold uppercase">{mem.category || 'note'}</span>
                    <p className="text-xs text-slate-200 font-medium">{mem.note}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteOne(memId)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-white/10 transition-colors"
                    title="Delete Memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
