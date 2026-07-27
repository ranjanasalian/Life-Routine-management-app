import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchChatsFromDB } from '../api/backendApi';
import { MessageSquare, Search, Bot, User, Clock } from 'lucide-react';

export const ConversationHistoryView = () => {
  const { activeProfileId, currentProfileData = {}, aiMessages = {} } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [chatLogs, setChatLogs] = useState([]);

  const userName = currentProfileData?.userName || 'User';

  useEffect(() => {
    let isMounted = true;
    const loadChats = async () => {
      const dbRes = await fetchChatsFromDB(activeProfileId);
      if (isMounted) {
        if (dbRes.success && Array.isArray(dbRes.chats) && dbRes.chats.length > 0) {
          setChatLogs(dbRes.chats);
        } else {
          setChatLogs(aiMessages[activeProfileId] || []);
        }
      }
    };
    loadChats();
    return () => { isMounted = false; };
  }, [activeProfileId, aiMessages]);

  const filteredLogs = chatLogs.filter(c => 
    c.text && c.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 w-full pb-6">
      
      {/* Header */}
      <div className="ios-glass-card p-5 border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-slate-950 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">AI Conversation History</h2>
            <p className="text-xs text-slate-400 font-medium">Review past chats & search discussions for {userName}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past conversations (e.g. hair fall, boil, walk, water)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
          />
        </div>
      </div>

      {/* Messages Feed */}
      <div className="ios-glass-card p-5 border-white/10 space-y-4">
        {filteredLogs.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-6">
            No matching conversations found. Start chatting with your AI Companion on the Home screen!
          </p>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-xl text-xs flex-shrink-0 ${msg.sender === 'user' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`p-3.5 rounded-2xl text-xs space-y-1 max-w-[85%] ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-950/40 border border-emerald-500/30 text-slate-100 rounded-tr-none' 
                    : 'bg-slate-950 border border-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                  <span className="text-[9px] text-slate-500 flex items-center justify-end gap-1 font-mono">
                    <Clock className="w-2.5 h-2.5" /> {msg.timestamp || 'Today'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
