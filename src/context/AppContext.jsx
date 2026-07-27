import React, { createContext, useContext, useState, useEffect } from 'react';
import { RANJU_TIMELINE, RANJU_MISSIONS, RANJU_MEALS, RANJU_JOURNEYS } from '../data/ranjuData';
import { MANISH_TIMELINE, MANISH_MISSIONS, MANISH_MEALS, MANISH_JOURNEYS } from '../data/manishData';
import { COUPLE_GOALS, COUPLE_MILESTONES } from '../data/coupleData';
import { loadAppState, saveAppState } from '../utils/storage';
import { triggerCelebration } from '../utils/confetti';

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

  notifications: []
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
        const pid = isPrimary ? 'primary_user' : `family_${p.relationship}_${Date.now()}`;
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
          waterTargetMl: parseInt(p.waterTargetMl) || 2500,
          walkMinutesLogged: 15,
          walkStepsLogged: 3500,
          healthConcerns: typeof p.healthConcerns === 'string' ? [p.healthConcerns] : (p.healthConcerns || []),
          healthGoals: typeof p.healthGoals === 'string' ? [p.healthGoals] : (p.healthGoals || []),
          timeline: isManishOrHusband ? MANISH_TIMELINE : RANJU_TIMELINE,
          missions: isManishOrHusband ? MANISH_MISSIONS : RANJU_MISSIONS,
          mealsData: isManishOrHusband ? MANISH_MEALS : RANJU_MEALS,
          journeys: isManishOrHusband ? MANISH_JOURNEYS : RANJU_JOURNEYS,
          yesterdayCompletionPct: 82,
          streakDays: 7
        };
      });

      triggerCelebration('major');

      return {
        ...prev,
        isOnboarded: true,
        activeProfileId: formatted[0]?.profileId || 'primary_user',
        profiles: formatted,
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

  const resetDay = () => {
    setState(prev => ({
      ...prev,
      isOnboarded: false,
      profiles: [],
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
      resetDay
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
