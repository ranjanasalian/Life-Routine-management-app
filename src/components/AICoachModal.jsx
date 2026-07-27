import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles } from 'lucide-react';

export const AICoachModal = () => {
  const { 
    aiMessages, 
    sendAICoachMessage, 
    waterConsumedMl, 
    husbandWalkCompleted,
    hairFallLevel
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendAICoachMessage(inputMsg);
    setInputMsg('');
  };

  const quickQuestions = [
    "How is my hydration doing today?",
    "How to encourage my husband for today's walk?",
    "High protein dinner ideas for tonight?",
    "Why is my hair fall improving?"
  ];

  return (
    <div className="glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 glow-emerald">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/30">
            <Bot className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">Ranju's AI Wellness Companion</h2>
            <p className="text-xs md:text-sm text-slate-400">Intelligent, positive mentor guiding your daily discipline & habits</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Active Learning Companion
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Proactive Insights Panel */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Habit Insights</h3>

          {/* Hydration */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">💧 Water Intake</span>
              <span className="text-[10px] text-slate-400 font-mono">{waterConsumedMl} / 2,500 ml</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              {waterConsumedMl >= 2000 
                ? "Excellent hydration level! Your energy and skin moisture are well supported." 
                : "You're at " + waterConsumedMl + " ml. Keep your water bottle beside your desk!"}
            </p>
          </div>

          {/* Husband Walk */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400">🚶 Husband Partner Walk</span>
              <span className="text-[10px] text-slate-400 font-mono">{husbandWalkCompleted ? 'Completed' : 'Scheduled 6:15 PM'}</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              {husbandWalkCompleted 
                ? "Awesome consistency! Walking together strengthens mutual fitness." 
                : "Gentle Reminder: Take your husband for today's 6:15 PM sunset walk!"}
            </p>
          </div>

          {/* Hair Health */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400">🌿 Hair Health</span>
              <span className="text-[10px] text-slate-400 font-mono">Rating: {hairFallLevel}</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              Hair fall parameters show steady improvement. Ensure protein with every meal!
            </p>
          </div>

        </div>

        {/* Chat Console */}
        <div className="lg:col-span-8 glass-card p-5 md:p-6 border-white/10 bg-slate-950/90 flex flex-col h-[480px] justify-between">
          
          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
            {aiMessages.map((msg, index) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={index} className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  {isAi && (
                    <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-sm font-bold border border-emerald-500/30">
                      🌿
                    </div>
                  )}

                  <div className={`p-4 rounded-2xl max-w-md text-xs md:text-sm leading-relaxed ${
                    isAi 
                      ? 'bg-slate-900/90 border border-white/10 text-slate-200 shadow-md font-medium' 
                      : 'btn-primary text-slate-950 font-bold rounded-br-none shadow-lg'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1.5 ${isAi ? 'text-slate-500' : 'text-slate-950/70 font-semibold'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendAICoachMessage(q)}
                className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-semibold whitespace-nowrap border border-white/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask your AI Wellness Mentor anything..."
              className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-white/10 text-xs md:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              type="submit"
              className="btn-primary p-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center"
            >
              <Send className="w-4 h-4 fill-slate-950" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
