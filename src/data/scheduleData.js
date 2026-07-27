export const DEFAULT_TIMELINE = [
  {
    id: 't-730',
    time: '7:30 AM',
    title: 'Good Morning & Daily Setup',
    description: 'Review today\'s mission goals and hydrate with your first warm glass of water.',
    icon: 'Sun',
    category: 'mindset',
    completed: false,
    duration: '10 mins',
    actionText: 'Start My Day',
    actionType: 'start_day',
    why: 'Sets a peaceful, disciplined tone for the entire morning.'
  },
  {
    id: 't-800',
    time: '8:00 AM',
    title: 'Morning Water Hydration',
    description: 'Drink 500 ml of pure water.',
    icon: 'Droplets',
    category: 'water',
    completed: false,
    targetValue: 500,
    unit: 'ml',
    actionText: 'Log 500 ml',
    actionType: 'water',
    why: 'Rehydrates your body after 7-8 hours of sleep and boosts metabolism.'
  },
  {
    id: 't-830',
    time: '8:30 AM',
    title: 'Morning Walk',
    description: '30 Minutes light outdoor or garden walking session.',
    icon: 'Footprints',
    category: 'walk',
    completed: false,
    targetValue: 30,
    unit: 'mins',
    actionText: 'Start Walk Timer',
    actionType: 'walk',
    why: 'Increases cardiovascular health, boosts morning serotonin, and burns calories.'
  },
  {
    id: 't-915',
    time: '9:15 AM',
    title: 'Nourishing Breakfast',
    description: 'Protein-rich breakfast options: 2 Idlis + Sambar + 1 Boiled Egg OR Oats with Milk OR Veg Upma.',
    icon: 'Utensils',
    category: 'meal',
    completed: false,
    actionText: 'Log Meal',
    actionType: 'meal',
    why: 'Stabilizes blood sugar and fuels brain power for the morning hours.'
  },
  {
    id: 't-1100',
    time: '11:00 AM',
    title: 'Mid-Morning Hydration',
    description: 'Drink another 500 ml of water.',
    icon: 'Droplets',
    category: 'water',
    completed: false,
    targetValue: 500,
    unit: 'ml',
    actionText: 'Log 500 ml',
    actionType: 'water',
    why: 'Keeps skin radiant, aids digestion, and prevents mid-day fatigue.'
  },
  {
    id: 't-1300',
    time: '1:00 PM',
    title: 'Balanced Lunch Plate',
    description: 'Healthy Plate Guide: 1/2 Plate Veggies, 1/4 Plate Rice, 1/4 Plate Protein (Dal/Chicken/Paneer).',
    icon: 'Salad',
    category: 'meal',
    completed: false,
    actionText: 'Log Lunch',
    actionType: 'meal',
    why: 'Maintains lean muscle mass and balances energy without post-meal crashes.'
  },
  {
    id: 't-1500',
    time: '3:00 PM',
    title: 'Movement & Refresh Stretch',
    description: 'Stand up, stretch for 5 minutes, walk around, look away from screens.',
    icon: 'UserCheck',
    category: 'movement',
    completed: false,
    duration: '5 mins',
    actionText: 'Complete Stretch',
    actionType: 'complete',
    why: 'Relieves spinal compression and re-energizes blood circulation.'
  },
  {
    id: 't-1730',
    time: '5:30 PM',
    title: 'Guided Yoga Session',
    description: '20 Minutes session: Cat-Cow, Child\'s Pose, Cobra Pose, Butterfly Pose.',
    icon: 'HeartHandshake',
    category: 'yoga',
    completed: false,
    duration: '20 mins',
    actionText: 'Begin Guided Yoga',
    actionType: 'yoga',
    why: 'Improves flexibility, calms the central nervous system, and reduces hair fall stress.'
  },
  {
    id: 't-1815',
    time: '6:15 PM',
    title: 'Evening Sunset Walk',
    description: 'Walk together with your husband. Encourage each other!',
    icon: 'Users',
    category: 'walk',
    completed: false,
    duration: '25 mins',
    actionText: 'Start Walk Together',
    actionType: 'walk_husband',
    why: 'Fosters bonding, mutual fitness motivation, and gentle evening calorie burn.'
  },
  {
    id: 't-2000',
    time: '8:00 PM',
    title: 'Wholesome Dinner',
    description: 'Suggested options: Chicken + Veggies OR Dal + Chapati OR Fish + Veggies.',
    icon: 'UtensilsCrossed',
    category: 'meal',
    completed: false,
    actionText: 'Log Dinner',
    actionType: 'meal',
    why: 'Light, nutrient-dense dinner supports overnight cellular repair and quality sleep.'
  },
  {
    id: 't-2215',
    time: '10:15 PM',
    title: 'Bedtime Preparation',
    description: 'Reduce screen time, turn off bright lights, read 5 pages, relax.',
    icon: 'Moon',
    category: 'sleep',
    completed: false,
    duration: '30 mins',
    actionText: 'Wind Down',
    actionType: 'complete',
    why: 'Signals melatonin release for deep restorative REM sleep.'
  },
  {
    id: 't-2245',
    time: '10:45 PM',
    title: 'Daily Reflection & Mood Log',
    description: 'Reflect on today\'s achievements, record your mood, and log hair & skin care.',
    icon: 'Sparkles',
    category: 'reflection',
    completed: false,
    actionText: 'Complete Reflection',
    actionType: 'reflection',
    why: 'Builds long-term self-awareness and gratitude.'
  }
];

export const DEFAULT_MISSIONS = [
  { id: 'm1', title: 'Drink 2.5 L Water', completed: false, category: 'water', icon: 'Droplets' },
  { id: 'm2', title: 'Walk 30 Minutes', completed: false, category: 'walk', icon: 'Footprints' },
  { id: 'm3', title: 'Eat One Fresh Fruit', completed: false, category: 'nutrition', icon: 'Apple' },
  { id: 'm4', title: 'Complete 20 Mins Yoga', completed: false, category: 'yoga', icon: 'Heart' },
  { id: 'm5', title: 'Sleep Before 11:00 PM', completed: false, category: 'sleep', icon: 'Moon' }
];

export const YOGA_POSES = [
  {
    id: 'cat-cow',
    name: 'Cat-Cow Pose (Marjaryasana-Bitilasana)',
    durationSec: 300, // 5 mins
    displayDuration: '5 Minutes',
    benefit: 'Warms up spine, massages internal abdominal organs, relieves neck & upper back tension.',
    instructions: [
      'Start on hands and knees with wrists under shoulders, knees under hips.',
      'Inhale: Arch your back, drop belly, lift head and chest towards sky (Cow Pose).',
      'Exhale: Round your spine up, tuck chin to chest, draw belly button in (Cat Pose).',
      'Repeat gently matching your natural breath flow.'
    ],
    tips: 'Keep movement smooth and never strain your neck.'
  },
  {
    id: 'child-pose',
    name: 'Child\'s Pose (Balasana)',
    durationSec: 300,
    displayDuration: '5 Minutes',
    benefit: 'Deeply calms nervous system, stretches lower back & hips, reduces cortisol.',
    instructions: [
      'Kneel on floor, big toes touching, knees wide apart.',
      'Exhale: Lower your torso between thighs, resting forehead gently on the mat.',
      'Extend arms out long in front of you or rest alongside your body.',
      'Breathe deeply into your back ribs for calm relaxation.'
    ],
    tips: 'If forehead doesn\'t reach comfortably, place a cushion underneath.'
  },
  {
    id: 'cobra-pose',
    name: 'Cobra Pose (Bhujangasana)',
    durationSec: 300,
    displayDuration: '5 Minutes',
    benefit: 'Strengthens spine, opens heart & chest, boosts blood circulation to scalp.',
    instructions: [
      'Lie flat on your belly with legs extended, tops of feet flat on mat.',
      'Place hands under shoulders, elbows close to your torso.',
      'Inhale: Press into hands to lift chest off the mat, keeping lower ribs down.',
      'Keep shoulders broad and away from ears. Hold for 30s intervals.'
    ],
    tips: 'Engage core muscles to protect lower back.'
  },
  {
    id: 'butterfly-pose',
    name: 'Butterfly Pose (Baddha Konasana)',
    durationSec: 300,
    displayDuration: '5 Minutes',
    benefit: 'Stretches inner thighs, groin, & knees; improves pelvic circulation and flexibility.',
    instructions: [
      'Sit tall with spine straight, bend knees and bring soles of feet together.',
      'Hold ankles or feet with hands, drawing heels towards pelvis.',
      'Gently flutter knees up and down like butterfly wings for 1 minute.',
      'Inhale lengthen spine; Exhale gently hinge forward from hips.'
    ],
    tips: 'Keep shoulders relaxed and chest open.'
  }
];

export const MEAL_OPTIONS = {
  breakfast: [
    { id: 'b1', name: '2 Idlis + Sambar + 1 Boiled Egg', protein: '14g', calories: '320 kcal', desc: 'High protein, easy to digest, warm sambar spices.' },
    { id: 'b2', name: 'Oats with Warm Milk & Seeds', protein: '12g', calories: '290 kcal', desc: 'Complex carbs with chia & flaxseeds for hair health.' },
    { id: 'b3', name: 'Vegetable Upma with Roasted Peanuts', protein: '9g', calories: '310 kcal', desc: 'Fiber-rich veggies & healthy fats from peanuts.' }
  ],
  lunch: [
    { id: 'l1', name: 'Balanced Veg Plate (Dal + Veggies + Brown Rice)', protein: '18g', calories: '450 kcal', desc: 'Half plate veggies, quarter rice, quarter dal.' },
    { id: 'l2', name: 'Grilled Chicken + Steamed Broccoli + Quinoa', protein: '34g', calories: '480 kcal', desc: 'Lean protein heavy plate for muscle repair.' },
    { id: 'l3', name: 'Paneer Sauté + Mixed Veg Curries + 2 Roti', protein: '22g', calories: '510 kcal', desc: 'Calcium rich paneer with antioxidant veggies.' }
  ],
  dinner: [
    { id: 'd1', name: 'Steamed Fish + Sautéed Veggies', protein: '30g', calories: '380 kcal', desc: 'Omega-3 fatty acids for hair strength and glowing skin.' },
    { id: 'd2', name: 'Chicken Breast + Mixed Salad', protein: '32g', calories: '360 kcal', desc: 'Light, carb-conscious protein dinner.' },
    { id: 'd3', name: 'Yellow Dal Tadka + 2 Multi-grain Chapati', protein: '16g', calories: '410 kcal', desc: 'Comforting, digestible Indian protein dinner.' }
  ]
};

export const INITIAL_AI_INSIGHTS = [
  "Yesterday you completed 82% of your routine! Your hydration and morning walk were spot on.",
  "You slept 7 hours last night. Your body is well-rested for today's 20-minute yoga session.",
  "Notice: Hair fall parameters have decreased over 3 consecutive weeks thanks to your consistent protein intake!",
  "Gentle Reminder: Take your husband for today's 6:15 PM sunset walk. Partner walking boosts motivation for both!"
];
