import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, Droplets, Footprints, Utensils, Play, Settings } from 'lucide-react';

export const HomeAICenterpiece = () => {
  const { 
    currentProfileData = {}, 
    timeline = [], 
    missions = [],
    addWater,
    addWalkMinutes,
    sendAICoachMessage,
    aiMessages = {},
    activeProfileId,
    setActiveTab
  } = useApp();

  const [chatInput, setChatInput] = useState('');

  const userName = currentProfileData?.userName || 'User';
  const avatar = currentProfileData?.avatar || '🌿';
  const lastPct = currentProfileData?.yesterdayCompletionPct || 82;
  const concerns = currentProfileData?.healthConcerns || [];
  const goals = currentProfileData?.healthGoals || [];

  const currentAction = (timeline || []).find(item => !item.completed) || {
    title: "All Daily Goals Complete 🎉",
    description: "Relax and enjoy a peaceful, restorative evening.",
    time: "Now"
  };

  const currentProfileMsgs = (aiMessages && aiMessages[activeProfileId] && aiMessages[activeProfileId].length > 0)
    ? aiMessages[activeProfileId]
    : [
        { 
          sender: 'ai', 
          text: `Good Morning, ${userName} ${avatar}! I'm your AI Wellness Companion. Your goals focus on ${goals.slice(0, 2).join(' & ') || 'wellness & routine'}. Ask me anything or tap a suggestion pill below!`, 
          timestamp: '7:30 AM' 
        }
      ];

  const handleSendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const txt = chatInput.trim();
    setChatInput('');
    sendAICoachMessage(txt);
  };

  const handleSuggestionClick = (suggestionText) => {
    sendAICoachMessage(suggestionText);
  };

  const sampleSuggestions = [
    "How do I improve my hair health & reduce hair fall?",
    "How to reduce skin boils & internal heat?",
    "Check my water intake goal for today",
    "Tips for gradual fat loss & 8,000 steps"
  ];

  return (
    <div className="space-y-6 w-full">
      
      {/* Hero AI Companion Card */}
      <div className="ios-glass-card p-6 md:p-8 border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-6">
        
        {/* Top Header & Avatar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg">
              {avatar}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white">
                Good Morning, {userName}
              </h2>
              <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Personal Wellness Companion
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="p-2.5 rounded-full bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Yesterday Summary Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Yesterday's Routine Completion:</span>
            <strong className="text-emerald-400 font-black">{lastPct}%</strong>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {concerns.length > 0 
              ? `Today's tailored plan actively addresses: ${concerns.slice(0, 3).join(', ')}.` 
              : `Great progress! Today is tailored specifically for your target health goals.`}
          </p>
        </div>

        {/* Next Activity Prompt */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
            <Play className="w-3 h-3 fill-emerald-400" /> WHAT TO DO RIGHT NOW ({currentAction.time})
          </span>
          <h3 className="text-base font-bold text-white font-display">{currentAction.title}</h3>
          <p className="text-xs text-slate-300 font-medium">{currentAction.description}</p>
        </div>

        {/* Today's Mission Priorities */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's AI Priorities:</h4>
          <div className="space-y-2">
            {(missions.slice(0, 3)).map((m) => (
              <div key={m.id} className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">{m.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${m.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {m.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => addWater(500)}
            className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>+500ml Water</span>
          </button>

          <button
            onClick={() => addWalkMinutes(30)}
            className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Footprints className="w-4 h-4 text-emerald-400" />
            <span>Log 30m Walk</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Log Meal</span>
          </button>
        </div>

      </div>

      {/* Interactive AI Companion Chat Stream */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Bot className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white font-display">Chat with AI Companion ({userName})</h3>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {sampleSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-[10px] font-medium whitespace-nowrap transition-all"
            >
              💡 {s}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar pr-1 pt-1">
          {currentProfileMsgs.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1 ${
                msg.sender === 'user' 
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-100 rounded-br-none font-medium' 
                  : 'bg-slate-950 border border-white/10 text-slate-200 rounded-bl-none'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <span className="text-[9px] text-slate-500 block text-right font-mono">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Form */}
        <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Ask ${userName}'s AI Companion for suggestions...`}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-medium"
          />
          <button
            type="submit"
            className="ios-btn-primary p-3 rounded-2xl flex-shrink-0"
            title="Send"
          >
            <Send className="w-4 h-4 fill-slate-950" />
          </button>
        </form>
      </div>

    </div>
  );
};
