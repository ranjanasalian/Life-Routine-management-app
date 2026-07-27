import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { submitOnboardingToDB } from '../api/backendApi';
import { Bot, Send, Sparkles, User, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const AIOnboardingInterview = ({ onCompleteOnboarding }) => {
  const { setProfilesAndCompleteOnboarding } = useApp();

  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: ranju_questions, 2: manish_questions, 3: finishing
  const [ranjuIndex, setRanjuIndex] = useState(0);
  const [manishIndex, setManishIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');

  // Ranju Answers
  const [ranjuAnswers, setRanjuAnswers] = useState({
    age: '30',
    heightCm: '165',
    weightKg: '60',
    targetWeightKg: '54',
    wakeTime: '7:30 AM',
    sleepTime: '10:45 PM',
    waterIntake: '1.5 Litres',
    exerciseHabits: 'Light yoga and daily walking',
    healthConcerns: 'I have severe hair fall, dull skin, low water intake, and I sleep late.',
    healthGoals: 'Healthy hair recovery, glowing skin, fit body, improving energy, and better routine.'
  });

  // Manish Answers
  const [manishAnswers, setManishAnswers] = useState({
    age: '34',
    heightCm: '178',
    weightKg: '95',
    targetWeightKg: '80',
    wakeTime: '7:15 AM',
    sleepTime: '10:15 PM',
    waterIntake: '2.0 Litres',
    exerciseHabits: 'Sedentary, minimal exercise',
    healthConcerns: 'My husband weighs around 95 kg, has recurring painful boils, dust allergy & frequent sneezing, sleeps late.',
    healthGoals: 'Lose weight gradually (95kg to 80kg), reduce recurring skin boils, 8,000 daily steps, metabolic fat loss.'
  });

  const ranjuQuestions = [
    { key: 'age', question: "Welcome Ranju 🌿 Let's start with your profile. What is your age?" },
    { key: 'heightCm', question: "What is your height in centimeters?" },
    { key: 'weightKg', question: "What is your current weight in kg?" },
    { key: 'targetWeightKg', question: "What is your target weight goal in kg?" },
    { key: 'wakeTime', question: "What time do you usually wake up?" },
    { key: 'sleepTime', question: "What time do you usually go to sleep?" },
    { key: 'healthConcerns', question: "Please describe your main health concerns in your own words (e.g. hair fall, skin, sleep)..." }
  ];

  const manishQuestions = [
    { key: 'weightKg', question: "Wonderful! Now let's set up your husband Manish's profile ⚡ What is Manish's weight in kg?" },
    { key: 'healthConcerns', question: "Please describe Manish's main health concerns in your own words (e.g. recurring boils, dust allergy, sleep, weight loss)..." },
    { key: 'healthGoals', question: "What are Manish's main health goals (e.g. 8,000 daily steps, boil reduction, gradual weight loss)?" }
  ];

  const handleRanjuAnswer = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const key = ranjuQuestions[ranjuIndex].key;
    setRanjuAnswers(prev => ({ ...prev, [key]: inputVal }));
    setInputVal('');

    if (ranjuIndex < ranjuQuestions.length - 1) {
      setRanjuIndex(prev => prev + 1);
    } else {
      setCurrentStep(2); // move to Manish interview
    }
  };

  const handleManishAnswer = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const key = manishQuestions[manishIndex].key;
    setManishAnswers(prev => ({ ...prev, [key]: inputVal }));
    setInputVal('');

    if (manishIndex < manishQuestions.length - 1) {
      setManishIndex(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    setCurrentStep(3);
    // Submit to MongoDB
    await submitOnboardingToDB(ranjuAnswers, manishAnswers);
    setTimeout(() => {
      setProfilesAndCompleteOnboarding(ranjuAnswers, manishAnswers);
      if (onCompleteOnboarding) onCompleteOnboarding();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col justify-between max-w-xl mx-auto px-4 py-8 font-sans">
      
      {/* Top Header */}
      <div className="space-y-2 text-center pt-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-400 p-[2px] mx-auto shadow-xl shadow-emerald-500/20 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl">
            🌿
          </div>
        </div>
        <h1 className="text-2xl font-bold font-display text-white">AI Personal Life Companion</h1>
        <p className="text-xs text-slate-400 font-medium">Phase 1: Personalised Profile & Health Interview</p>
      </div>

      {/* Step 0: Warm Intro */}
      {currentStep === 0 && (
        <div className="ios-glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-6 my-auto">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" /> WELCOME TO YOUR JOURNEY
          </div>

          <h2 className="text-xl font-bold font-display text-white leading-tight">
            "Hello Ranju, I'm your AI Wellness Companion. Before I can guide you, I'd like to understand you and your husband so I can build your personalised wellness journey."
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            I will remember your health goals, concerns (*hair fall, dull skin, 95kg weight loss, recurring boils*), and guide you day by day.
          </p>

          <button
            onClick={() => setCurrentStep(1)}
            className="w-full ios-btn-primary py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Begin Profile Interview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1: Ranju Interview */}
      {currentStep === 1 && (
        <div className="ios-glass-card p-6 border-emerald-500/30 space-y-6 my-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" /> Ranju's Profile (Step {ranjuIndex + 1} of {ranjuQuestions.length})
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Ranju 🌿</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
            <p className="text-sm font-bold text-white font-display leading-snug">
              "{ranjuQuestions[ranjuIndex].question}"
            </p>
          </div>

          <form onSubmit={handleRanjuAnswer} className="space-y-4">
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your response here..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-medium"
              autoFocus
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const key = ranjuQuestions[ranjuIndex].key;
                  setInputVal(ranjuAnswers[key] || '');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                Use suggested answer
              </button>

              <button
                type="submit"
                className="ios-btn-primary px-6 py-3 text-xs font-extrabold flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Manish Interview */}
      {currentStep === 2 && (
        <div className="ios-glass-card p-6 border-cyan-500/30 space-y-6 my-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-400" /> Manish's Profile (Step {manishIndex + 1} of {manishQuestions.length})
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Manish ⚡</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
            <p className="text-sm font-bold text-white font-display leading-snug">
              "{manishQuestions[manishIndex].question}"
            </p>
          </div>

          <form onSubmit={handleManishAnswer} className="space-y-4">
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type Manish's details here..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-medium"
              autoFocus
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const key = manishQuestions[manishIndex].key;
                  setInputVal(manishAnswers[key] || '');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                Use suggested answer
              </button>

              <button
                type="submit"
                className="ios-btn-primary px-6 py-3 text-xs font-extrabold flex items-center gap-1.5 bg-cyan-400 text-slate-950"
              >
                <span>Save Response</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Generating Custom Profiles & Saving to MongoDB */}
      {currentStep === 3 && (
        <div className="ios-glass-card p-8 border-emerald-500/30 text-center space-y-4 my-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Generating Personalised Companion Plans...</h3>
          <p className="text-xs text-slate-400 font-medium">
            Saving profiles to MongoDB & building custom nutrient plans for Ranju's hair recovery and Manish's weight loss & boil reduction.
          </p>
        </div>
      )}

      {/* Footer info */}
      <footer className="text-center text-[11px] text-slate-600 pb-4">
        AI-Powered Personal Life Companion • MongoDB Database Backend
      </footer>

    </div>
  );
};
