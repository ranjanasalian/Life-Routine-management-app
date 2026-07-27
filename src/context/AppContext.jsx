import React, { createContext, useContext, useState, useEffect } from 'react';
import { RANJU_TIMELINE, RANJU_MISSIONS, RANJU_MEALS, RANJU_JOURNEYS } from '../data/ranjuData';
import { MANISH_TIMELINE, MANISH_MISSIONS, MANISH_MEALS, MANISH_JOURNEYS } from '../data/manishData';
import { COUPLE_GOALS, COUPLE_MILESTONES } from '../data/coupleData';
import { loadAppState, saveAppState } from '../utils/storage';
import { triggerCelebration } from '../utils/confetti';

const AppContext = createContext(null);

const defaultInitialState = {
  activeProfile: 'ranju', // 'ranju' | 'manish' | 'couple'
  
  // Ranju Data
  ranju: {
    userName: 'Ranju',
    avatar: '🌿',
    yesterdayCompletionPct: 82,
    streakDays: 7,
    waterConsumedMl: 1500,
    waterTargetMl: 2500,
    walkMinutesLogged: 20,
    yogaSessionCompleted: false,
    loggedMeals: { breakfast: '2 Idlis + Sambar + 1 Boiled Egg', lunch: null, dinner: null },
    dailyFruitLogged: true,
    dailyVegLogged: true,
    hairFallLevel: 'Low',
    hairCareLogged: true,
    sleepHours: 7.5,
    moodRating: 'Good',
    timeline: RANJU_TIMELINE,
    missions: RANJU_MISSIONS,
    mealsData: RANJU_MEALS,
    journeys: RANJU_JOURNEYS
  },

  // Manish Data
  manish: {
    userName: 'Manish',
    avatar: '⚡',
    yesterdayCompletionPct: 85,
    streakDays: 8,
    waterConsumedMl: 2000,
    waterTargetMl: 3000,
    walkStepsLogged: 4500,
    walkStepsTarget: 8000,
    loggedMeals: { breakfast: 'Sprouts Salad + 2 Boiled Eggs', lunch: null, dinner: null },
    dailyVegLogged: true,
    boilReductionStatus: 'Significantly Reduced',
    sleepHours: 7.5,
    timeline: MANISH_TIMELINE,
    missions: MANISH_MISSIONS,
    mealsData: MANISH_MEALS,
    journeys: MANISH_JOURNEYS
  },

  // Couple Data
  couple: {
    coupleWalkCompleted: false,
    coupleDinnerCompleted: false,
    coupleStreakDays: 7,
    goals: COUPLE_GOALS,
    milestones: COUPLE_MILESTONES
  },

  // Active AI Messages
  aiMessages: {
    ranju: [
      { sender: 'ai', text: "Good Morning, Ranju 🌿 Yesterday you completed 82% of your routine! Today's restorative yoga and protein breakfast are ready to strengthen hair anchorage and skin glow.", timestamp: '7:30 AM' }
    ],
    manish: [
      { sender: 'ai', text: "Good Morning, Manish ⚡ Today we're targeting 8,000 steps and 3.0L detox water to lower internal body heat and burn fat. Let's start with a morning walk!", timestamp: '7:15 AM' }
    ],
    couple: [
      { sender: 'ai', text: "Welcome to Our Journey 👫 Ranju & Manish! Walking together at 6:15 PM sunset and sharing a healthy dinner builds lifelong habits together.", timestamp: '8:00 AM' }
    ]
  },

  notifications: [
    { id: 1, type: 'water', title: 'Hydration Station', message: 'Time for a glass of water.', time: '8:00 AM', read: false }
  ]
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => loadAppState(defaultInitialState));
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const switchProfile = (profileId) => {
    setState(prev => ({ ...prev, activeProfile: profileId }));
  };

  const currentProfileData = state.activeProfile === 'ranju' 
    ? state.ranju 
    : state.activeProfile === 'manish' 
      ? state.manish 
      : state.couple;

  // Active completion %
  const activeTimeline = currentProfileData.timeline || [];
  const activeMissions = currentProfileData.missions || [];
  const totalItems = activeTimeline.length + activeMissions.length;
  const completedTimeline = activeTimeline.filter(t => t.completed).length;
  const completedMissions = activeMissions.filter(m => m.completed).length;
  const overallCompletionPct = totalItems > 0 
    ? Math.round(((completedTimeline + completedMissions) / totalItems) * 100)
    : 80;

  // Actions
  const toggleMission = (id) => {
    setState(prev => {
      const p = prev.activeProfile;
      if (p === 'couple') {
        const updatedGoals = prev.couple.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
        triggerCelebration('standard');
        return { ...prev, couple: { ...prev.couple, goals: updatedGoals } };
      }

      const profileObj = prev[p];
      const updatedMissions = profileObj.missions.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
      triggerCelebration('standard');
      return {
        ...prev,
        [p]: {
          ...profileObj,
          missions: updatedMissions
        }
      };
    });
  };

  const toggleTimelineItem = (id) => {
    setState(prev => {
      const p = prev.activeProfile;
      if (p === 'couple') return prev;

      const profileObj = prev[p];
      const updatedTimeline = profileObj.timeline.map(item => {
        if (item.id === id) {
          triggerCelebration('standard');
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return {
        ...prev,
        [p]: {
          ...profileObj,
          timeline: updatedTimeline
        }
      };
    });
  };

  const addWater = (amountMl = 500) => {
    setState(prev => {
      const p = prev.activeProfile === 'manish' ? 'manish' : 'ranju';
      const profileObj = prev[p];
      const nextWater = Math.min(profileObj.waterTargetMl, profileObj.waterConsumedMl + amountMl);
      
      triggerCelebration('standard');

      return {
        ...prev,
        [p]: {
          ...profileObj,
          waterConsumedMl: nextWater
        }
      };
    });
  };

  const addWalkMinutes = (minutes = 30, withPartner = false) => {
    setState(prev => {
      const p = prev.activeProfile === 'manish' ? 'manish' : 'ranju';
      const profileObj = prev[p];
      
      triggerCelebration('standard');

      if (withPartner) {
        // Also complete couple walk
        const updatedCoupleGoals = prev.couple.goals.map(g => g.id === 'cg1' ? { ...g, completed: true } : g);
        return {
          ...prev,
          [p]: {
            ...profileObj,
            walkMinutesLogged: (profileObj.walkMinutesLogged || 0) + minutes,
            walkStepsLogged: (profileObj.walkStepsLogged || 0) + (minutes * 120)
          },
          couple: {
            ...prev.couple,
            coupleWalkCompleted: true,
            goals: updatedCoupleGoals
          }
        };
      }

      return {
        ...prev,
        [p]: {
          ...profileObj,
          walkMinutesLogged: (profileObj.walkMinutesLogged || 0) + minutes,
          walkStepsLogged: (profileObj.walkStepsLogged || 0) + (minutes * 120)
        }
      };
    });
  };

  const completeYogaSession = () => {
    setState(prev => {
      triggerCelebration('major');
      return {
        ...prev,
        ranju: {
          ...prev.ranju,
          yogaSessionCompleted: true
        }
      };
    });
  };

  const logMeal = (type, mealName) => {
    setState(prev => {
      const p = prev.activeProfile === 'manish' ? 'manish' : 'ranju';
      const profileObj = prev[p];
      triggerCelebration('standard');
      return {
        ...prev,
        [p]: {
          ...profileObj,
          loggedMeals: {
            ...profileObj.loggedMeals,
            [type]: mealName
          }
        }
      };
    });
  };

  const sendAICoachMessage = (userText) => {
    const p = state.activeProfile;
    const userMsg = { sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    let replyText = `I'm right here with you! Staying consistent brings long-term health.`;
    const lower = userText.toLowerCase();

    if (p === 'ranju') {
      if (lower.includes('hair') || lower.includes('scalp') || lower.includes('fall')) {
        replyText = "Ranju, your hair fall rating is currently Low! Continuing boiled egg protein, Vitamin D, and 20 mins Child's Pose directly strengthens hair root anchorage.";
      } else if (lower.includes('water') || lower.includes('drink')) {
        replyText = `Ranju, you've drunk ${state.ranju.waterConsumedMl} ml of water out of your 2,500 ml goal today. Keep a bottle nearby!`;
      } else if (lower.includes('manish') || lower.includes('husband') || lower.includes('walk')) {
        replyText = "Taking Manish for the 6:15 PM sunset walk builds joint motivation and helps him reach his 8,000 step fat loss goal!";
      }
    } else if (p === 'manish') {
      if (lower.includes('weight') || lower.includes('fat') || lower.includes('steps')) {
        replyText = `Manish, you've logged ${state.manish.walkStepsLogged} steps out of your 8,000 steps goal! Keep your lunch high-fiber to boost metabolism and burn fat.`;
      } else if (lower.includes('boil') || lower.includes('skin') || lower.includes('heat')) {
        replyText = "To reduce recurring skin boils, drink 3.0L detox water (cucumber/mint) and avoid fried snacks & refined sugar.";
      } else if (lower.includes('ranju') || lower.includes('wife')) {
        replyText = "Walking with Ranju at 6:15 PM sunset completes your step target and supports her core fitness!";
      }
    }

    const aiMsg = { sender: 'ai', text: replyText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    setState(prev => ({
      ...prev,
      aiMessages: {
        ...prev.aiMessages,
        [p]: [...(prev.aiMessages[p] || []), userMsg, aiMsg]
      }
    }));
  };

  const resetDay = () => {
    setState(prev => ({
      ...prev,
      ranju: { ...prev.ranju, waterConsumedMl: 0, walkMinutesLogged: 0, yogaSessionCompleted: false, loggedMeals: { breakfast: null, lunch: null, dinner: null } },
      manish: { ...prev.manish, waterConsumedMl: 0, walkStepsLogged: 0, loggedMeals: { breakfast: null, lunch: null, dinner: null } },
      couple: { ...prev.couple, coupleWalkCompleted: false, coupleDinnerCompleted: false }
    }));
    triggerCelebration('major');
  };

  return (
    <AppContext.Provider value={{
      ...state,
      currentProfileData,
      overallCompletionPct,
      activeTab,
      setActiveTab,
      switchProfile,
      toggleMission,
      toggleTimelineItem,
      addWater,
      addWalkMinutes,
      completeYogaSession,
      logMeal,
      sendAICoachMessage,
      resetDay
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
