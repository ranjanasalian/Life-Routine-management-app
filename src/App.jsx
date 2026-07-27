import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CurrentActionCard } from './components/CurrentActionCard';
import { TodayMission } from './components/TodayMission';
import { DailyTimeline } from './components/DailyTimeline';
import { WaterTracker } from './components/WaterTracker';
import { YogaStudio } from './components/YogaStudio';
import { WalkTracker } from './components/WalkTracker';
import { NutritionGuide } from './components/NutritionGuide';
import { HealthSanctuary } from './components/HealthSanctuary';
import { BottomNav } from './components/BottomNav';
import { NotificationToast } from './components/NotificationToast';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-xl mx-auto px-4 md:px-6 py-4 space-y-6 pb-28">
      
      {/* Today View */}
      {(activeTab === 'today') && (
        <>
          <CurrentActionCard />
          <TodayMission />
          <WaterTracker />
          <WalkTracker />
          <DailyTimeline />
        </>
      )}

      {/* Schedule / Flow View */}
      {activeTab === 'schedule' && (
        <>
          <CurrentActionCard />
          <DailyTimeline />
        </>
      )}

      {/* Yoga View */}
      {activeTab === 'yoga' && (
        <YogaStudio />
      )}

      {/* Meals / Nutrition View */}
      {activeTab === 'nutrition' && (
        <>
          <WaterTracker />
          <NutritionGuide />
        </>
      )}

      {/* Health / Beauty / AI View */}
      {(activeTab === 'health' || activeTab === 'wellness' || activeTab === 'ai_coach' || activeTab === 'progress') && (
        <HealthSanctuary />
      )}

    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
        <Header />
        <MainContent />
        <BottomNav />
        <NotificationToast />
      </div>
    </AppProvider>
  );
}
