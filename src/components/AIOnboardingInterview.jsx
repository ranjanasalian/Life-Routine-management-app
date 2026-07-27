import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { submitDynamicOnboardingToDB } from '../api/backendApi';
import { Sparkles, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';

export const AIOnboardingInterview = ({ onComplete }) => {
  const { setDynamicProfilesAndCompleteOnboarding } = useApp();

  // Phase steps: 'intro' -> 'primary_interview' -> 'family_prompt' -> 'family_interview' -> 'summary'
  const [phase, setPhase] = useState('intro');

  // Primary User Data
  const [primaryData, setPrimaryData] = useState({
    relationship: 'primary',
    userName: '',
    age: '',
    gender: '',
    heightCm: '',
    weightKg: '',
    targetWeightKg: '',
    wakeTime: '',
    sleepTime: '',
    occupation: '',
    activityLevel: 'Moderate',
    exerciseDays: '3-4 days',
    waterTargetMl: '2500',
    dietType: 'Non-vegetarian',
    allergies: 'None',
    usualFoods: '',
    beveragesHabit: 'Tea / Coffee',
    healthConcerns: '',
    medicalConditions: '',
    medications: '',
    limitations: '',
    healthGoals: '',
    targetAchievements: '',
    remindersDesired: 'Water, walks, meals, sleep',
    additionalNotes: ''
  });

  // Family Member Data
  const [familyData, setFamilyData] = useState({
    relationship: 'husband', // 'husband' | 'wife' | 'child' | 'parent' | 'friend' | 'other'
    userName: '',
    age: '',
    gender: '',
    heightCm: '',
    weightKg: '',
    targetWeightKg: '',
    wakeTime: '',
    sleepTime: '',
    occupation: '',
    activityLevel: 'Moderate',
    exerciseDays: '1-2 days',
    waterTargetMl: '3000',
    dietType: 'Non-vegetarian',
    allergies: 'None',
    usualFoods: '',
    beveragesHabit: 'Tea / Coffee',
    healthConcerns: '',
    medicalConditions: '',
    medications: '',
    limitations: '',
    healthGoals: '',
    targetAchievements: '',
    remindersDesired: '8,000 steps walk, detox water, early sleep',
    additionalNotes: ''
  });

  const [hasFamilyMember, setHasFamilyMember] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');

  // Primary Questions Sequence
  const primaryQuestions = [
    { key: 'userName', question: "What's your name? What would you like me to call you?", placeholder: "e.g., Ranju" },
    { key: 'age', question: "How old are you?", placeholder: "e.g., 30" },
    { key: 'gender', question: "What's your gender? (Optional)", placeholder: "e.g., Female / Male / Prefer not to say" },
    { key: 'heightCm', question: "What's your height in cm?", placeholder: "e.g., 165" },
    { key: 'weightKg', question: "What's your current weight in kg?", placeholder: "e.g., 60" },
    { key: 'targetWeightKg', question: "What's your target weight in kg? (Optional)", placeholder: "e.g., 54" },
    { key: 'wakeTime', question: "What time do you usually wake up?", placeholder: "e.g., 7:30 AM" },
    { key: 'sleepTime', question: "What time do you usually go to bed?", placeholder: "e.g., 10:45 PM" },
    { key: 'occupation', question: "What's your occupation?", placeholder: "e.g., Designer / Business / Homemaker" },
    { key: 'activityLevel', question: "How active are you during the day?", placeholder: "e.g., Sedentary / Lightly active / Moderate / Very active" },
    { key: 'exerciseDays', question: "How many days a week do you exercise?", placeholder: "e.g., 3-4 days a week" },
    { key: 'waterTargetMl', question: "Approximately how much water do you drink each day?", placeholder: "e.g., 1.5 Litres (1500 ml)" },
    { key: 'dietType', question: "Are you vegetarian, non-vegetarian, or eggetarian?", placeholder: "e.g., Non-vegetarian" },
    { key: 'allergies', question: "Do you have any food allergies or dietary restrictions?", placeholder: "e.g., None or Dairy sensitive" },
    { key: 'usualFoods', question: "What foods do you usually eat?", placeholder: "e.g., Rice, Dal, Eggs, Chicken, Vegetables, Chapati" },
    { key: 'beveragesHabit', question: "Do you drink tea, coffee, or soft drinks regularly?", placeholder: "e.g., 2 cups tea daily" },
    { key: 'healthConcerns', question: "What health concerns would you like me to help you with?", placeholder: "e.g., Severe hair fall, dull skin, sleeping late, low water intake" },
    { key: 'medicalConditions', question: "Do you have any diagnosed medical conditions to keep in mind? (Optional)", placeholder: "e.g., None or Thyroid" },
    { key: 'medications', question: "Are you taking any regular medications? (Optional)", placeholder: "e.g., None or Hair supplements" },
    { key: 'limitations', question: "Are there any injuries or physical limitations that affect exercise? (Optional)", placeholder: "e.g., None" },
    { key: 'healthGoals', question: "What are your top health goals over the next few months?", placeholder: "e.g., Hair recovery, glowing skin, fitness, energy" },
    { key: 'remindersDesired', question: "Is there anything specific you'd like me to remind you about every day?", placeholder: "e.g., Water intake, morning walk, 20-min yoga, sleep before 11 PM" },
    { key: 'additionalNotes', question: "Is there anything else you'd like me to know so I can support you better?", placeholder: "Type freely here..." }
  ];

  // Family Questions Sequence
  const familyQuestions = [
    { key: 'relationship', question: "What is their relationship to you?", placeholder: "e.g., Husband / Wife / Child / Parent / Friend" },
    { key: 'userName', question: "What is their name?", placeholder: "e.g., Manish" },
    { key: 'age', question: "How old are they?", placeholder: "e.g., 34" },
    { key: 'weightKg', question: "What is their current weight in kg?", placeholder: "e.g., 95" },
    { key: 'targetWeightKg', question: "What is their target weight in kg?", placeholder: "e.g., 80" },
    { key: 'wakeTime', question: "What time do they usually wake up?", placeholder: "e.g., 7:15 AM" },
    { key: 'sleepTime', question: "What time do they usually sleep?", placeholder: "e.g., 10:15 PM" },
    { key: 'healthConcerns', question: "What are their main health concerns?", placeholder: "e.g., Recurring painful boils, dust allergy, frequent sneezing, overweight, sleeping late" },
    { key: 'healthGoals', question: "What are their top health goals?", placeholder: "e.g., 8,000 daily steps, boil reduction, gradual fat loss, early sleep" },
    { key: 'additionalNotes', question: "Is there anything else I should keep in mind for them?", placeholder: "Type freely here..." }
  ];

  const handlePrimaryAnswer = (e) => {
    e.preventDefault();
    const currentQ = primaryQuestions[questionIndex];
    const key = currentQ.key;
    const val = inputVal.trim() || currentQ.placeholder.replace('e.g., ', '');
    
    setPrimaryData(prev => ({ ...prev, [key]: val }));
    setInputVal('');

    if (questionIndex < primaryQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      // Step 1 complete -> ask if user wants to add family member
      setPhase('family_prompt');
    }
  };

  const handleFamilyAnswer = (e) => {
    e.preventDefault();
    const currentQ = familyQuestions[questionIndex];
    const key = currentQ.key;
    const val = inputVal.trim() || currentQ.placeholder.replace('e.g., ', '');

    setFamilyData(prev => ({ ...prev, [key]: val }));
    setInputVal('');

    if (questionIndex < familyQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      // Family interview complete -> show summary
      setPhase('summary');
    }
  };

  const handleFinishOnboarding = async () => {
    const profilesArray = [primaryData];
    if (hasFamilyMember) {
      profilesArray.push(familyData);
    }

    // Submit to MongoDB
    await submitDynamicOnboardingToDB(profilesArray);

    // Save to context state
    setDynamicProfilesAndCompleteOnboarding(profilesArray);
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05070c] text-slate-100 flex flex-col justify-between max-w-xl mx-auto px-4 py-6 font-sans overflow-y-auto no-scrollbar">
      
      {/* Top Header */}
      <div className="space-y-2 text-center pt-2">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-[2px] mx-auto shadow-xl shadow-emerald-500/20 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl">
            🌿
          </div>
        </div>
        <h1 className="text-2xl font-bold font-display text-white">AI Personal Life Companion</h1>
        <p className="text-xs text-slate-400 font-medium">Personalised Onboarding Interview</p>
      </div>

      {/* PHASE 0: INTRO GREETING */}
      {phase === 'intro' && (
        <div className="ios-glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-6 my-auto">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" /> WELCOME TO LIFE ROUTINE MANAGEMENT
          </div>

          <h2 className="text-xl font-bold font-display text-white leading-relaxed">
            "Hello! 👋 I'm your AI Wellness Companion. I'm here to help you build a healthier lifestyle by understanding you, your goals, and your daily routine. Before we begin, I'd like to get to know you."
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            I will ask you a few short questions one by one. You can answer in your own words, and I will remember everything to create a personalized routine just for you.
          </p>

          <button
            onClick={() => {
              setPhase('primary_interview');
              setQuestionIndex(0);
            }}
            className="w-full ios-btn-primary py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Begin Profile Creation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PHASE 1: PRIMARY USER INTERVIEW */}
      {phase === 'primary_interview' && (
        <div className="ios-glass-card p-6 border-emerald-500/30 space-y-6 my-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Question {questionIndex + 1} of {primaryQuestions.length}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Primary Profile</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 space-y-2">
            <p className="text-sm font-bold text-white font-display leading-snug">
              "{primaryQuestions[questionIndex].question}"
            </p>
          </div>

          <form onSubmit={handlePrimaryAnswer} className="space-y-4">
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={primaryQuestions[questionIndex].placeholder}
              rows={3}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-medium"
              autoFocus
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setInputVal(primaryQuestions[questionIndex].placeholder.replace('e.g., ', ''));
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                Use sample response
              </button>

              <button
                type="submit"
                className="ios-btn-primary px-6 py-3 text-xs font-extrabold flex items-center gap-1.5"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PHASE 2: FAMILY MEMBER CHOICE PROMPT */}
      {phase === 'family_prompt' && (
        <div className="ios-glass-card p-6 md:p-8 border-cyan-500/30 space-y-6 my-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
            <UserPlus className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            "Would you like to add another person to your wellness journey?"
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            You can add your husband, wife, child, parent, friend, or anyone else you'd like to include so I can personalize their routine and create a shared journey for both of you.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setHasFamilyMember(true);
                setPhase('family_interview');
                setQuestionIndex(0);
              }}
              className="flex-1 ios-btn-primary bg-cyan-400 hover:bg-cyan-300 text-slate-950 py-3.5 text-xs font-extrabold"
            >
              Yes, Add Person
            </button>
            <button
              onClick={() => {
                setHasFamilyMember(false);
                setPhase('summary');
              }}
              className="flex-1 ios-btn-secondary py-3.5 text-xs font-semibold"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: FAMILY MEMBER INTERVIEW */}
      {phase === 'family_interview' && (
        <div className="ios-glass-card p-6 border-cyan-500/30 space-y-6 my-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-cyan-400" /> Family Question {questionIndex + 1} of {familyQuestions.length}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Person 2 Profile</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 space-y-2">
            <p className="text-sm font-bold text-white font-display leading-snug">
              "{familyQuestions[questionIndex].question}"
            </p>
          </div>

          <form onSubmit={handleFamilyAnswer} className="space-y-4">
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={familyQuestions[questionIndex].placeholder}
              rows={3}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-medium"
              autoFocus
            />

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setInputVal(familyQuestions[questionIndex].placeholder.replace('e.g., ', ''));
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                Use sample response
              </button>

              <button
                type="submit"
                className="ios-btn-primary px-6 py-3 text-xs font-extrabold bg-cyan-400 text-slate-950 flex items-center gap-1.5"
              >
                <span>Save Answer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PHASE 3: AI SUMMARY CARD */}
      {phase === 'summary' && (
        <div className="ios-glass-card p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-6 my-auto">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI WELLNESS SUMMARY GENERATED
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            "Thank you {primaryData.userName || 'there'}! Here's what I've learned:"
          </h2>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/90 border border-white/10 text-xs text-slate-200 leading-relaxed font-medium">
            <p>• <strong>Primary Profile ({primaryData.userName || 'You'})</strong>: Your health goals focus on {primaryData.healthGoals || 'improving hair health, skin glow, fitness, and energy'}.</p>
            <p>• <strong>Reported Concerns</strong>: {primaryData.healthConcerns || 'Building a disciplined daily schedule and staying consistent'}.</p>
            <p>• <strong>Schedule & Hydration</strong>: Wake time {primaryData.wakeTime || '7:30 AM'}, sleep target {primaryData.sleepTime || '10:45 PM'}, water target {primaryData.waterTargetMl || '2500'} ml.</p>

            {hasFamilyMember && (
              <p className="pt-2 border-t border-white/10 text-cyan-300">
                • <strong>Family Member ({familyData.userName || 'Person 2'} - {familyData.relationship})</strong>: Created profile for {familyData.userName} focusing on {familyData.healthGoals || 'fitness and health'}. Reported concerns: {familyData.healthConcerns || 'weight loss and stamina'}.
              </p>
            )}
          </div>

          <p className="text-xs text-slate-300 font-medium">
            "I'll use this information to create a wellness plan tailored specifically for you{hasFamilyMember ? ` and ${familyData.userName}` : ''}."
          </p>

          <button
            onClick={handleFinishOnboarding}
            className="w-full ios-btn-primary py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch My Life Companion</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-600 pb-2">
        AI-Powered Personal Life Companion • Dynamic Multi-Profile System
      </footer>

    </div>
  );
};
