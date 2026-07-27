import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CurrentActionCard } from './components/CurrentActionCard';
import { TodayMission } from './components/TodayMission';
import { LifeTimeline } from './components/LifeTimeline';
import { WaterTracker } from './components/WaterTracker';
import { WalkTracker } from './components/WalkTracker';
import { NutritionGuide } from './components/NutritionGuide';
import { HealthJourneys } from './components/HealthJourneys';
import { CoupleMode } from './components/CoupleMode';
import { AIMemoryLog } from './components/AIMemoryLog';
import { AIOnboardingInterview } from './components/AIOnboardingInterview';
import { BottomNav } from './components/BottomNav';
import { NotificationToast } from './components/NotificationToast';

const MainContent = () => {
  const { activeTab, activeProfileId, isOnboarded } = useApp();

  // Fullscreen Onboarding View (hides Header & BottomNav)
  if (!isOnboarded) {
    return <AIOnboardingInterview />;
  }

  // If Couple Mode profile is active and on today/couple tab, render CoupleMode
  if (activeProfileId === 'couple' && (activeTab === 'today' || activeTab === 'couple')) {
    return (
      <main className="max-w-xl mx-auto px-4 md:px-6 py-4 space-y-6 pb-28">
        <CoupleMode />
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 md:px-6 py-4 space-y-6 pb-28">
      
      {/* Today View */}
      {activeTab === 'today' && (
        <>
          <CurrentActionCard />
          <TodayMission />
          <LifeTimeline />
          <WaterTracker />
          <WalkTracker />
        </>
      )}

      {/* Schedule / Flow View */}
      {activeTab === 'schedule' && (
        <>
          <CurrentActionCard />
          <LifeTimeline />
        </>
      )}

      {/* Journeys View */}
      {activeTab === 'journeys' && (
        <HealthJourneys />
      )}

      {/* Couple View */}
      {activeTab === 'couple' && (
        <CoupleMode />
      )}

      {/* Health / Memory / Nutrition View */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <AIMemoryLog />
          <NutritionGuide />
        </div>
      )}

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
      <NotificationToast />
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
