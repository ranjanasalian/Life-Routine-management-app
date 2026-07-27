import React, { createContext, useContext, useState, useEffect } from 'react';
import { RANJU_TIMELINE, RANJU_MISSIONS, RANJU_MEALS, RANJU_JOURNEYS } from '../data/ranjuData';
import { MANISH_TIMELINE, MANISH_MISSIONS, MANISH_MEALS, MANISH_JOURNEYS } from '../data/manishData';
import { COUPLE_GOALS, COUPLE_MILESTONES } from '../data/coupleData';
import { loadAppState, saveAppState } from '../utils/storage';
import { triggerCelebration } from '../utils/confetti';
import { saveChatToDB } from '../api/backendApi';

const AppContext = createContext(null);

const defaultInitialState = {
  isOnboarded: false,
  activeProfileId: 'primary_user',

  profiles: [],

  couple: {
    coupleWalkCompleted: false,
    coupleDinnerCompleted: false,
    coupleStreakDays: 7,
    goals: COUPLE_GOALS,
    milestones: COUPLE_MILESTONES
  },

  aiMessages: {},

  notifications: []
};

const cleanPronouns = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/My Health Goals/gi, '')
    .replace(/\bmy\b/gi, 'your')
    .replace(/\bmine\b/gi, 'yours')
    .replace(/\bI\b/g, 'you')
    .replace(/\s+/g, ' ')
    .trim();
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => loadAppState(defaultInitialState));
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const switchProfile = (profileId) => {
    setState(prev => ({ ...prev, activeProfileId: profileId }));
  };

  const setDynamicProfilesAndCompleteOnboarding = (profilesArray) => {
    setState(prev => {
      const formatted = profilesArray.map((p, i) => {
        const isPrimary = p.relationship === 'primary' || i === 0;
        const pid = isPrimary ? 'primary_user' : `family_${p.relationship}_${Date.now()}_${i}`;
        const isManishOrHusband = (p.userName && p.userName.toLowerCase().includes('manish')) || p.relationship === 'husband';
        
        return {
          profileId: pid,
          relationship: p.relationship || (isPrimary ? 'primary' : 'family'),
          userName: p.userName || (isPrimary ? 'Primary User' : 'Family Member'),
          avatar: isPrimary ? '🌿' : (isManishOrHusband ? '⚡' : '🌸'),
          age: parseInt(p.age) || 30,
          weightKg: parseInt(p.weightKg) || 60,
          targetWeightKg: parseInt(p.targetWeightKg) || 55,
          wakeTime: p.wakeTime || '7:30 AM',
          sleepTime: p.sleepTime || '10:45 PM',
          waterConsumedMl: 1000,
          waterTargetMl: parseInt(p.waterTargetMl) || (isManishOrHusband ? 3000 : 2500),
          walkMinutesLogged: 15,
          walkStepsLogged: isManishOrHusband ? 4500 : 2500,
          walkStepsTarget: isManishOrHusband ? 8000 : 5000,
          healthConcerns: typeof p.healthConcerns === 'string' ? p.healthConcerns.split(',').map(s => s.trim()).filter(Boolean) : (p.healthConcerns || []),
          healthGoals: typeof p.healthGoals === 'string' ? p.healthGoals.split(',').map(s => s.trim()).filter(Boolean) : (p.healthGoals || []),
          timeline: isManishOrHusband ? MANISH_TIMELINE : RANJU_TIMELINE,
          missions: isManishOrHusband ? MANISH_MISSIONS : RANJU_MISSIONS,
          mealsData: isManishOrHusband ? MANISH_MEALS : RANJU_MEALS,
          journeys: isManishOrHusband ? MANISH_JOURNEYS : RANJU_JOURNEYS,
          yesterdayCompletionPct: isManishOrHusband ? 85 : 82,
          streakDays: isManishOrHusband ? 8 : 7
        };
      });

      triggerCelebration('major');

      return {
        ...prev,
        isOnboarded: true,
        activeProfileId: formatted[0]?.profileId || 'primary_user',
        profiles: formatted,
        aiMessages: {},
        notifications: []
      };
    });
  };

  const currentProfileData = state.activeProfileId === 'couple'
    ? state.couple
    : ((state.profiles && state.profiles.length > 0)
        ? (state.profiles.find(p => p.profileId === state.activeProfileId) || state.profiles[0])
        : {});

  const isManishOrHusband = currentProfileData?.relationship === 'husband' || (currentProfileData?.userName && currentProfileData.userName.toLowerCase().includes('manish'));

  // Active completion %
  const activeTimeline = currentProfileData?.timeline || [];
  const activeMissions = currentProfileData?.missions || [];
  const totalItems = activeTimeline.length + activeMissions.length;
  const completedTimeline = activeTimeline.filter(t => t.completed).length;
  const completedMissions = activeMissions.filter(m => m.completed).length;
  const overallCompletionPct = totalItems > 0 
    ? Math.round(((completedTimeline + completedMissions) / totalItems) * 100)
    : 80;

  // Actions
  const toggleMission = (id) => {
    setState(prev => {
      const pid = prev.activeProfileId;
      if (pid === 'couple') {
        const updatedGoals = (prev.couple?.goals || []).map(g => g.id === id ? { ...g, completed: !g.completed } : g);
        triggerCelebration('standard');
        return { ...prev, couple: { ...prev.couple, goals: updatedGoals } };
      }

      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === pid) {
          const updatedMissions = (p.missions || []).map(m => m.id === id ? { ...m, completed: !m.completed } : m);
          return { ...p, missions: updatedMissions };
        }
        return p;
      });

      triggerCelebration('standard');
      return { ...prev, profiles: updatedProfiles };
    });
  };

  const toggleTimelineItem = (id) => {
    setState(prev => {
      const pid = prev.activeProfileId;
      if (pid === 'couple') return prev;

      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === pid) {
          const updatedTimeline = (p.timeline || []).map(item => item.id === id ? { ...item, completed: !item.completed } : item);
          return { ...p, timeline: updatedTimeline };
        }
        return p;
      });

      triggerCelebration('standard');
      return { ...prev, profiles: updatedProfiles };
    });
  };

  const addWater = (amountMl = 500) => {
    setState(prev => {
      const pid = prev.activeProfileId;
      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === pid) {
          const target = p.waterTargetMl || 2500;
          const next = Math.min(target, (p.waterConsumedMl || 0) + amountMl);
          return { ...p, waterConsumedMl: next };
        }
        return p;
      });
      triggerCelebration('standard');
      return { ...prev, profiles: updatedProfiles };
    });
  };

  const addWalkMinutes = (minutes = 30, withPartner = false) => {
    setState(prev => {
      const pid = prev.activeProfileId;
      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === pid) {
          return {
            ...p,
            walkMinutesLogged: (p.walkMinutesLogged || 0) + minutes,
            walkStepsLogged: (p.walkStepsLogged || 0) + (minutes * 120)
          };
        }
        return p;
      });

      triggerCelebration('standard');

      if (withPartner) {
        const updatedCoupleGoals = (prev.couple?.goals || []).map(g => g.id === 'cg1' ? { ...g, completed: true } : g);
        return {
          ...prev,
          profiles: updatedProfiles,
          couple: {
            ...prev.couple,
            coupleWalkCompleted: true,
            goals: updatedCoupleGoals
          }
        };
      }

      return { ...prev, profiles: updatedProfiles };
    });
  };

  const completeYogaSession = () => {
    setState(prev => {
      triggerCelebration('major');
      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === prev.activeProfileId) {
          return { ...p, yogaSessionCompleted: true };
        }
        return p;
      });
      return { ...prev, profiles: updatedProfiles };
    });
  };

  const logMeal = (type, mealName) => {
    setState(prev => {
      const pid = prev.activeProfileId;
      const updatedProfiles = (prev.profiles || []).map(p => {
        if (p.profileId === pid) {
          return {
            ...p,
            loggedMeals: { ...(p.loggedMeals || {}), [type]: mealName }
          };
        }
        return p;
      });
      triggerCelebration('standard');
      return { ...prev, profiles: updatedProfiles };
    });
  };

  const sendAICoachMessage = (userText) => {
    if (!userText || !userText.trim()) return;

    const pid = state.activeProfileId || 'primary_user';
    const profileObj = (state.profiles || []).find(p => p.profileId === pid) || state.profiles[0] || {};
    const name = profileObj.userName || 'there';
    const isHusband = profileObj.relationship === 'husband' || (name && name.toLowerCase().includes('manish'));
    
    const water = profileObj.waterConsumedMl || 0;
    const waterTarget = profileObj.waterTargetMl || (isHusband ? 3000 : 2500);
    const walk = profileObj.walkStepsLogged || 0;
    const walkTarget = profileObj.walkStepsTarget || (isHusband ? 8000 : 5000);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: userText.trim(), timestamp };

    const lower = userText.toLowerCase();
    let replyText = '';

    // INTENT 1: Daily Plan / Schedule / What to do
    if (
      lower.includes('plan') || 
      lower.includes('today') || 
      lower.includes('start') || 
      lower.includes('what to do') || 
      lower.includes('tell me') || 
      lower.includes('schedule') || 
      lower.includes('routine') ||
      lower.includes('guide')
    ) {
      if (isHusband) {
        replyText = `Good Morning, ${name} ⚡! Here is your personalized daily plan for gradual fat loss & boil reduction:

1. 💧 Anti-Boil Hydration (7:15 AM): Drink 500 ml warm water to lower internal body heat.
2. 🏃‍♂️ Morning Walk (7:45 AM): 30-min brisk walk (4,000 steps) to boost fat metabolism.
3. 🥗 High-Fiber Breakfast (9:00 AM): Sprouts salad + 2 boiled eggs to preserve muscle mass.
4. 💧 Midday Hydration (11:30 AM): Drink 3.0L detox water (cucumber/mint) throughout the day.
5. 👫 Sunset Walk Together (6:15 PM): Join Ranju for evening walk to hit your 8,000 steps target!
6. 🌙 Early Sleep (10:15 PM): Bedtime before 10:30 PM to regulate Ghrelin appetite hormones.`;
      } else {
        replyText = `Good Morning, ${name} 🌿! Here is your personalized daily plan for hair health, skin glow & fitness:

1. 💧 Scalp Hydration (7:30 AM): Sip warm lemon water to flush toxins.
2. 🏃‍♀️ Morning Walk (8:30 AM): 30-min walk to boost scalp circulation.
3. 🥗 Protein Breakfast (9:15 AM): Eggs/Dal/Sprouts to supply keratin amino acids for hair roots.
4. 🧘‍♀️ Restorative Yoga (5:30 PM): 20 mins Child's Pose & Downward Dog to strengthen root anchorage.
5. 👫 Evening Walk (6:15 PM): 30 mins walking together.
6. 🌙 Restorative Sleep (10:45 PM): Sleep early to allow overnight hair cell regeneration.`;
      }
    } 
    // INTENT 2: Hair & Scalp
    else if (lower.includes('hair') || lower.includes('scalp') || lower.includes('fall')) {
      replyText = `${name}, to strengthen your hair roots and reverse hair fall:

1. Protein Focus: Eat boiled eggs, dal, or sprouts today for keratin synthesis.
2. Micronutrients: Ensure Vitamin D, B12, Iron, and Zinc intake.
3. Scalp Circulation: Practice 20 mins of restorative yoga at 5:30 PM.
4. Early Sleep: Go to bed before 10:45 PM for cell repair.`;
    } 
    // INTENT 3: Boils / Skin Heat / Detox
    else if (lower.includes('boil') || lower.includes('heat') || lower.includes('skin') || lower.includes('glow')) {
      if (isHusband || lower.includes('boil')) {
        replyText = `${name}, to reduce recurring skin boils and clear body heat:

1. 3.0L Detox Hydration: Drink cucumber, mint, and lemon water all day.
2. Zero Processed Sugar: Avoid fried snacks & refined sugars that trigger pore inflammation.
3. Fiber Lunch: Eat large cucumber/tomato salad with lean protein.`;
      } else {
        replyText = `${name}, to enhance natural skin glow and collagen:

1. 2.5L Water Target: Hydration keeps skin plump and flushes toxins.
2. Antioxidants: Eat fresh berries, green leafy vegetables, and citrus.
3. Restful Sleep: Sleeping by 10:45 PM reduces dark circles and dullness.`;
      }
    } 
    // INTENT 4: Hydration
    else if (lower.includes('water') || lower.includes('drink') || lower.includes('hydrate')) {
      replyText = `${name}, you have logged ${water} ml out of your ${waterTarget} ml daily target. Drink 500 ml right now to maintain peak energy!`;
    } 
    // INTENT 5: Walking / Weight / Steps
    else if (lower.includes('walk') || lower.includes('step') || lower.includes('weight') || lower.includes('fat')) {
      replyText = `${name}, to reach your 8,000 steps walking goal and support fat loss:

1. Current Progress: ${walk} steps logged out of ${walkTarget} target steps.
2. Evening Walk: Join the 6:15 PM sunset walk to complete the remaining steps!`;
    } 
    // FALLBACK
    else {
      replyText = `I'm right here with you, ${name}! Following your daily Life Timeline step-by-step will help you achieve your health goals. Ask me for today's plan anytime!`;
    }

    const aiMsg = { sender: 'ai', text: replyText, timestamp };

    setState(prev => {
      const existing = prev.aiMessages?.[pid] || [];
      return {
        ...prev,
        aiMessages: {
          ...prev.aiMessages,
          [pid]: [...existing, userMsg, aiMsg]
        }
      };
    });

    saveChatToDB(pid, 'user', userText.trim());
    saveChatToDB(pid, 'ai', replyText);
  };

  const resetDay = () => {
    setState(prev => ({
      ...prev,
      isOnboarded: false,
      profiles: [],
      aiMessages: {},
      notifications: []
    }));
    triggerCelebration('major');
  };

  return (
    <AppContext.Provider value={{
      ...state,
      currentProfileData,
      isManishOrHusband,
      activeProfile: state.activeProfileId,
      activeProfileId: state.activeProfileId,
      timeline: activeTimeline,
      missions: activeMissions,
      waterConsumedMl: currentProfileData?.waterConsumedMl || 0,
      waterTargetMl: currentProfileData?.waterTargetMl || 2500,
      walkMinutesLogged: currentProfileData?.walkMinutesLogged || 0,
      walkStepsLogged: currentProfileData?.walkStepsLogged || 0,
      yogaSessionCompleted: currentProfileData?.yogaSessionCompleted || false,
      overallCompletionPct,
      activeTab,
      setActiveTab,
      switchProfile,
      setDynamicProfilesAndCompleteOnboarding,
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
