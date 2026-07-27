export const MANISH_TIMELINE = [
  {
    id: 'm-715',
    time: '7:15 AM',
    title: 'Good Morning & Anti-Boil Detox Hydration',
    description: 'Drink 500 ml warm water with cucumber/mint to cool internal heat.',
    icon: 'Sun',
    category: 'water',
    completed: false,
    duration: '10 mins',
    actionText: 'Start Day',
    actionType: 'start_day',
    why: 'Flushes metabolic toxins and reduces body heat that triggers skin boils.'
  },
  {
    id: 'm-745',
    time: '7:45 AM',
    title: 'Morning Power Walk (4,000 Steps)',
    description: '30 Minutes brisk walk to start calorie burn and boost metabolism.',
    icon: 'Footprints',
    category: 'walk',
    completed: false,
    targetValue: 4000,
    unit: 'steps',
    actionText: 'Start Walk',
    actionType: 'walk',
    why: 'Brisk walking mobilizes visceral fat and lowers blood glucose spikes.'
  },
  {
    id: 'm-900',
    time: '9:00 AM',
    title: 'Metabolic Fat-Loss Breakfast',
    description: 'Oats in Water with Seeds & Nuts OR Sprouts Salad + 2 Boiled Eggs.',
    icon: 'Utensils',
    category: 'meal',
    completed: false,
    actionText: 'Log Breakfast',
    actionType: 'meal',
    why: 'High protein & complex carbs keep insulin low and prevent mid-morning hunger.'
  },
  {
    id: 'm-1130',
    time: '11:30 AM',
    title: 'Mid-Morning Hydration (500 ml)',
    description: 'Drink 500 ml water.',
    icon: 'Droplets',
    category: 'water',
    completed: false,
    targetValue: 500,
    unit: 'ml',
    actionText: 'Log 500 ml',
    actionType: 'water',
    why: 'Hydration speeds up fat metabolism and keeps lymphatic detox active.'
  },
  {
    id: 'm-1330',
    time: '1:30 PM',
    title: 'High-Fiber Weight Loss Lunch',
    description: 'Large Bowl Cucumber/Tomato Salad + Grilled Chicken/Paneer + 1 Chapati.',
    icon: 'Salad',
    category: 'meal',
    completed: false,
    actionText: 'Log Lunch',
    actionType: 'meal',
    why: 'Fiber creates satiety while lean protein preserves muscle mass during fat loss.'
  },
  {
    id: 'm-1600',
    time: '4:00 PM',
    title: 'Movement & Anti-Boil Hydration',
    description: 'Stand up, walk 500 steps, drink a glass of water.',
    icon: 'UserCheck',
    category: 'movement',
    completed: false,
    duration: '5 mins',
    actionText: 'Complete Stretch',
    actionType: 'complete',
    why: 'Prevents prolonged sitting pressure and clears skin pores.'
  },
  {
    id: 'm-1815',
    time: '6:15 PM',
    title: 'Sunset Walk With Ranju 👫 (4,000 Steps)',
    description: 'Walk together with Ranju! Reach your 8,000 daily steps goal.',
    icon: 'Users',
    category: 'walk',
    completed: false,
    duration: '35 mins',
    actionText: 'Walk Together',
    actionType: 'walk_husband',
    why: 'Walking together at sunset completes the 8,000 daily step target.'
  },
  {
    id: 'm-2000',
    time: '8:00 PM',
    title: 'Light Fat-Loss Dinner',
    description: 'Chicken Breast Salad OR Yellow Dal Soup + Sautéed Veggies.',
    icon: 'UtensilsCrossed',
    category: 'meal',
    completed: false,
    actionText: 'Log Dinner',
    actionType: 'meal',
    why: 'Carb-conscious dinner prevents overnight fat storage.'
  },
  {
    id: 'm-2200',
    time: '10:00 PM',
    title: 'Early Sleep Wind-Down',
    description: 'Turn off screens, relax body, prepare for restorative early sleep.',
    icon: 'Moon',
    category: 'sleep',
    completed: false,
    duration: '30 mins',
    actionText: 'Wind Down',
    actionType: 'complete',
    why: 'Sleeping before 10:30 PM balances Ghrelin & Leptin appetite hormones.'
  }
];

export const MANISH_MISSIONS = [
  { id: 'mm1', title: '8,000 Steps Walking Goal', completed: false, category: 'walk', icon: 'Footprints' },
  { id: 'mm2', title: 'Drink 3.0 L Detox Water', completed: false, category: 'water', icon: 'Droplets' },
  { id: 'mm3', title: 'High-Fiber Fat Loss Lunch', completed: false, category: 'nutrition', icon: 'Salad' },
  { id: 'mm4', title: 'Walk with Ranju at 6:15 PM', completed: false, category: 'walk', icon: 'Users' },
  { id: 'mm5', title: 'Sleep Before 10:30 PM', completed: false, category: 'sleep', icon: 'Moon' }
];

export const MANISH_MEALS = {
  breakfast: [
    { id: 'mb1', name: 'Sprouts Salad + 2 Boiled Eggs', protein: '18g', calories: '280 kcal', why: 'Low calorie, high protein & fiber for instant satiety.' },
    { id: 'mb2', name: 'Oats Bowl in Water with Flaxseeds', protein: '11g', calories: '250 kcal', why: 'Beta-glucan fiber slows digestion & lowers cholesterol.' },
    { id: 'mb3', name: 'Besan Chilla with Veggies', protein: '14g', calories: '290 kcal', why: 'High-protein chickpea flour breakfast.' }
  ],
  lunch: [
    { id: 'ml1', name: 'Large Salad Bowl + Grilled Chicken + 1 Roti', protein: '35g', calories: '410 kcal', why: 'High volume fiber fills stomach with low caloric density.' },
    { id: 'ml2', name: 'Paneer Sauté + Mixed Veggies + 1 Roti', protein: '24g', calories: '430 kcal', why: 'Sustained energy without post-lunch sleepiness.' },
    { id: 'ml3', name: 'Dal Soup + Cucumber Salad + Brown Rice (1/4 plate)', protein: '16g', calories: '380 kcal', why: 'Cleanses digestive tract and reduces skin inflammation.' }
  ],
  dinner: [
    { id: 'md1', name: 'Chicken Breast + Steamed Broccoli', protein: '36g', calories: '330 kcal', why: 'Ultra-low carb dinner forces body to burn body fat overnight.' },
    { id: 'md2', name: 'Yellow Dal Tadka Soup + Green Salad', protein: '18g', calories: '310 kcal', why: 'Light, anti-inflammatory dinner for detox.' },
    { id: 'md3', name: 'Grilled Fish + Grilled Vegetables', protein: '32g', calories: '350 kcal', why: 'Omega-3 fatty acids heal skin boils and boost metabolism.' }
  ]
};

export const MANISH_JOURNEYS = [
  {
    id: 'weight-loss',
    title: 'Gradual Weight & Fat Loss Journey',
    icon: 'TrendingDown',
    progressPct: 65,
    status: 'On track (-1.5 kg this month)',
    metrics: [
      { label: 'Step Count Target', value: '8,000 Steps / Day' },
      { label: 'Caloric Deficit', value: '-400 kcal daily' },
      { label: 'Water Target', value: '3.0 Litres' }
    ],
    recommendations: [
      'Maintain 8,000 steps daily—splitting into 4k morning + 4k evening walk with Ranju is most effective.',
      'Keep dinner carb-conscious (chicken/fish + veggies) to accelerate overnight fat burning.'
    ]
  },
  {
    id: 'boil-skin-detox',
    title: 'Skin Boil Reduction & Body Detox',
    icon: 'Sparkles',
    progressPct: 75,
    status: 'Significant reduction in recurring boils',
    metrics: [
      { label: 'Hydration Target', value: '3.0 Litres / Day' },
      { label: 'Processed Sugar', value: 'Zero logged' },
      { label: 'Detox Water', value: 'Cucumber & Lemon' }
    ],
    recommendations: [
      'Drink 500 ml warm water first thing in the morning to reduce internal body heat.',
      'Avoid fried snacks and refined sugars that trigger skin pore inflammation.'
    ]
  },
  {
    id: 'lifestyle-stamina',
    title: 'Stamina & Early Sleep Routine',
    icon: 'Zap',
    progressPct: 70,
    status: 'Sleeping earlier (10:30 PM)',
    metrics: [
      { label: 'Sleep Target', value: '7.5 Hours' },
      { label: 'Screen Cutoff', value: '10:00 PM' },
      { label: 'Energy Level', value: 'Vibrant' }
    ],
    recommendations: [
      'Sleeping before 10:30 PM reduces cortisol and curbs late-night craving impulses.'
    ]
  }
];
