import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomeAICenterpiece } from './components/HomeAICenterpiece';
import { LifeTimeline } from './components/LifeTimeline';
import { SettingsView } from './components/SettingsView';
import { ConversationHistoryView } from './components/ConversationHistoryView';
import { HealthTimelineView } from './components/HealthTimelineView';
import { NotificationCentreView } from './components/NotificationCentreView';
import { AIMemoryPrivacyView } from './components/AIMemoryPrivacyView';
import { PreLaunchReviewSummary } from './components/PreLaunchReviewSummary';
import { AIOnboardingInterview } from './components/AIOnboardingInterview';
import { CoupleMode } from './components/CoupleMode';
import { NutritionGuide } from './components/NutritionGuide';
import { BottomNav } from './components/BottomNav';
import { NotificationToast } from './components/NotificationToast';

const MainContent = () => {
  const { activeTab, activeProfileId, isOnboarded, setDynamicProfilesAndCompleteOnboarding } = useApp();
  const [reviewProfiles, setReviewProfiles] = useState(null);

  // Fullscreen Onboarding Interview
  if (!isOnboarded && !reviewProfiles) {
    return (
      <AIOnboardingInterview 
        onComplete={(profilesArray) => {
          setReviewProfiles(profilesArray);
        }} 
      />
    );
  }

  // Pre-Launch Review Summary Screen
  if (!isOnboarded && reviewProfiles) {
    return (
      <PreLaunchReviewSummary
        profilesArray={reviewProfiles}
        onConfirmLaunch={(confirmedProfiles) => {
          setDynamicProfilesAndCompleteOnboarding(confirmedProfiles);
          setReviewProfiles(null);
        }}
      />
    );
  }

  // If Couple Mode is active
  if (activeProfileId === 'couple' && (activeTab === 'today' || activeTab === 'couple')) {
    return (
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-4 space-y-6 pb-28">
        <CoupleMode />
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 py-4 space-y-6 pb-28">
      
      {/* Home AI Centerpiece */}
      {activeTab === 'today' && <HomeAICenterpiece />}

      {/* Timeline View */}
      {activeTab === 'schedule' && <LifeTimeline />}

      {/* Conversation History View */}
      {activeTab === 'history' && <ConversationHistoryView />}

      {/* Health Timeline View */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <HealthTimelineView />
          <NutritionGuide />
        </div>
      )}

      {/* Settings View */}
      {activeTab === 'settings' && <SettingsView />}

      {/* Notification Centre View */}
      {activeTab === 'notifications' && <NotificationCentreView />}

      {/* AI Memory Privacy View */}
      {activeTab === 'privacy' && <AIMemoryPrivacyView />}

    </main>
  );
};

const AppShell = () => {
  const { isOnboarded } = useApp();

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {isOnboarded && <Header />}
      <MainContent />
      {isOnboarded && <BottomNav />}
      {isOnboarded && <NotificationToast />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
