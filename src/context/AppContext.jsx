import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_TIMELINE, DEFAULT_MISSIONS, INITIAL_AI_INSIGHTS } from '../data/scheduleData';
import { loadAppState, saveAppState } from '../utils/storage';
import { triggerCelebration } from '../utils/confetti';

const AppContext = createContext(null);

const defaultInitialState = {
  userName: 'Ranju',
  yesterdayCompletionPct: 82,
  streakDays: 7,
  waterConsumedMl: 1000, // starting morning progress
  waterTargetMl: 2500,
  walkMinutesLogged: 15,
  husbandWalkCompleted: false,
  yogaSessionCompleted: false,
  loggedMeals: {
    breakfast: '2 Idlis + Sambar + 1 Boiled Egg',
    lunch: null,
    dinner: null
  },
  dailyFruitLogged: true,
  dailyVegLogged: false,
  proteinTargetLogged: true,
  hairCareLogged: true,
  hairFallLevel: 'Low',
  skincareCompleted: true,
  sleepHours: 7.5,
  moodRating: null,
  reflectionNotes: '',
  timeline: DEFAULT_TIMELINE,
  missions: DEFAULT_MISSIONS,
  aiMessages: [
    { sender: 'ai', text: "Good Morning, Ranju 🌿 Welcome back! Yesterday you completed 82% of your routine. Fantastic progress! How are you feeling today?", timestamp: '7:30 AM' }
  ],
  notifications: [
    { id: 1, type: 'water', title: 'Hydration Station', message: 'Time for a glass of water (500 ml).', time: '8:00 AM', read: false }
  ]
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => loadAppState(defaultInitialState));
  const [activeTab, setActiveTab] = useState('today');

  // Save to localStorage on state changes
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Compute overall completion percentage
  const totalItems = state.timeline.length + state.missions.length;
  const completedTimeline = state.timeline.filter(t => t.completed).length;
  const completedMissions = state.missions.filter(m => m.completed).length;
  const overallCompletionPct = Math.round(((completedTimeline + completedMissions) / totalItems) * 100);

  // Actions
  const toggleMission = (id) => {
    setState(prev => {
      const updatedMissions = prev.missions.map(m => 
        m.id === id ? { ...m, completed: !m.completed } : m
      );
      const isCompletedNow = updatedMissions.find(m => m.id === id)?.completed;
      if (isCompletedNow) {
        triggerCelebration('standard');
      }

      // Check if all missions are completed
      const allDone = updatedMissions.every(m => m.completed);
      if (allDone && !prev.missions.every(m => m.completed)) {
        triggerCelebration('major');
      }

      return { ...prev, missions: updatedMissions };
    });
  };

  const toggleTimelineItem = (id) => {
    setState(prev => {
      const updated = prev.timeline.map(item => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) triggerCelebration('standard');
          return { ...item, completed: nextState };
        }
        return item;
      });
      return { ...prev, timeline: updated };
    });
  };

  const addWater = (amountMl = 500) => {
    setState(prev => {
      const nextWater = Math.min(prev.waterTargetMl, prev.waterConsumedMl + amountMl);
      const waterMissionDone = nextWater >= prev.waterTargetMl;
      
      // Update water timeline items & mission automatically if target reached
      const updatedTimeline = prev.timeline.map(t => {
        if (t.category === 'water' && !t.completed && nextWater >= (t.targetValue || 500)) {
          return { ...t, completed: true };
        }
        return t;
      });

      const updatedMissions = prev.missions.map(m => {
        if (m.id === 'm1' && waterMissionDone) {
          return { ...m, completed: true };
        }
        return m;
      });

      triggerCelebration(waterMissionDone ? 'major' : 'standard');

      return {
        ...prev,
        waterConsumedMl: nextWater,
        timeline: updatedTimeline,
        missions: updatedMissions
      };
    });
  };

  const addWalkMinutes = (minutes = 30, withHusband = false) => {
    setState(prev => {
      const nextMins = prev.walkMinutesLogged + minutes;
      const walkMissionDone = nextMins >= 30;

      const updatedMissions = prev.missions.map(m => {
        if (m.id === 'm2' && walkMissionDone) return { ...m, completed: true };
        return m;
      });

      const updatedTimeline = prev.timeline.map(t => {
        if (t.category === 'walk' && !t.completed) return { ...t, completed: true };
        return t;
      });

      triggerCelebration('standard');

      return {
        ...prev,
        walkMinutesLogged: nextMins,
        husbandWalkCompleted: withHusband || prev.husbandWalkCompleted,
        missions: updatedMissions,
        timeline: updatedTimeline
      };
    });
  };

  const completeYogaSession = () => {
    setState(prev => {
      const updatedMissions = prev.missions.map(m => m.id === 'm4' ? { ...m, completed: true } : m);
      const updatedTimeline = prev.timeline.map(t => t.category === 'yoga' ? { ...t, completed: true } : t);
      
      triggerCelebration('major');

      return {
        ...prev,
        yogaSessionCompleted: true,
        missions: updatedMissions,
        timeline: updatedTimeline
      };
    });
  };

  const logMeal = (type, mealName) => {
    setState(prev => ({
      ...prev,
      loggedMeals: {
        ...prev.loggedMeals,
        [type]: mealName
      }
    }));
    triggerCelebration('standard');
  };

  const logReflection = (mood, notes, hairFall) => {
    setState(prev => {
      const updatedTimeline = prev.timeline.map(t => t.category === 'reflection' ? { ...t, completed: true } : t);
      triggerCelebration('major');
      return {
        ...prev,
        moodRating: mood,
        reflectionNotes: notes,
        hairFallLevel: hairFall || prev.hairFallLevel,
        timeline: updatedTimeline
      };
    });
  };

  const toggleFruit = () => {
    setState(prev => {
      const nextFruit = !prev.dailyFruitLogged;
      const updatedMissions = prev.missions.map(m => m.id === 'm3' ? { ...m, completed: nextFruit } : m);
      if (nextFruit) triggerCelebration('standard');
      return { ...prev, dailyFruitLogged: nextFruit, missions: updatedMissions };
    });
  };

  const toggleVeg = () => {
    setState(prev => ({ ...prev, dailyVegLogged: !prev.dailyVegLogged }));
  };

  const toggleHairCare = () => {
    setState(prev => ({ ...prev, hairCareLogged: !prev.hairCareLogged }));
  };

  const addNotification = (title, message) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setState(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications]
    }));
  };

  const sendAICoachMessage = (userText) => {
    const userMsg = { sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    // Generate context-aware response based on Ranju's current metrics
    let replyText = "I'm right here with you, Ranju! You're doing wonderful today.";
    const lower = userText.toLowerCase();

    if (lower.includes('water') || lower.includes('drink')) {
      replyText = `You've drunk ${state.waterConsumedMl} ml of water so far out of your 2,500 ml target. ${state.waterConsumedMl >= 2500 ? "Goal reached! Amazing job staying hydrated 💧" : "Keep a warm water bottle nearby for your next sip!"}`;
    } else if (lower.includes('walk') || lower.includes('husband') || lower.includes('step')) {
      replyText = `You've completed ${state.walkMinutesLogged} minutes of walking today. ${state.husbandWalkCompleted ? "Great job doing the evening walk with your husband! Mutual support makes all the difference." : "Remember to invite your husband for the 6:15 PM sunset walk tonight!"}`;
    } else if (lower.includes('hair') || lower.includes('scalp') || lower.includes('fall')) {
      replyText = `Your hair fall rating is currently ${state.hairFallLevel}. High-protein intake (eggs, dal, fish) paired with low-stress yoga significantly strengthens hair follicles. Keep up your routine!`;
    } else if (lower.includes('yoga') || lower.includes('stretch')) {
      replyText = `Yoga is vital for restorative nervous system balance. Today's poses (Cat-Cow, Child's Pose, Cobra, Butterfly) target spine flexibility and scalp circulation.`;
    } else if (lower.includes('meal') || lower.includes('eat') || lower.includes('food') || lower.includes('protein')) {
      replyText = `Keep using the Healthy Plate Guide: half plate vegetables, one quarter rice, and one quarter protein (like boiled egg, paneer, dal, chicken or fish).`;
    } else if (lower.includes('tired') || lower.includes('sleep') || lower.includes('stress')) {
      replyText = "When energy feels low, don't force intensity. Shift your focus to 5 minutes of Child's Pose, sip a warm herb tea, and prepare for restful early sleep before 11 PM.";
    }

    const aiMsg = { sender: 'ai', text: replyText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    setState(prev => ({
      ...prev,
      aiMessages: [...prev.aiMessages, userMsg, aiMsg]
    }));
  };

  const resetDay = () => {
    setState(prev => ({
      ...prev,
      waterConsumedMl: 0,
      walkMinutesLogged: 0,
      husbandWalkCompleted: false,
      yogaSessionCompleted: false,
      loggedMeals: { breakfast: null, lunch: null, dinner: null },
      dailyFruitLogged: false,
      dailyVegLogged: false,
      moodRating: null,
      reflectionNotes: '',
      timeline: DEFAULT_TIMELINE.map(t => ({ ...t, completed: false })),
      missions: DEFAULT_MISSIONS.map(m => ({ ...m, completed: false }))
    }));
    triggerCelebration('major');
  };

  return (
    <AppContext.Provider value={{
      ...state,
      overallCompletionPct,
      activeTab,
      setActiveTab,
      toggleMission,
      toggleTimelineItem,
      addWater,
      addWalkMinutes,
      completeYogaSession,
      logMeal,
      logReflection,
      toggleFruit,
      toggleVeg,
      toggleHairCare,
      addNotification,
      sendAICoachMessage,
      resetDay
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
