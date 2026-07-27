export const RANJU_TIMELINE = [
  {
    id: 'r-730',
    time: '7:30 AM',
    title: 'Good Morning & Scalp Hydration',
    description: 'Review today\'s hair & skin focus goals, sip warm water with lemon.',
    icon: 'Sun',
    category: 'mindset',
    completed: false,
    duration: '10 mins',
    actionText: 'Start Day',
    actionType: 'start_day',
    why: 'Hydrates scalp tissues after sleep and gently wakes up digestion.'
  },
  {
    id: 'r-800',
    time: '8:00 AM',
    title: 'Morning Water Hydration (500 ml)',
    description: 'Drink first 500 ml glass of water.',
    icon: 'Droplets',
    category: 'water',
    completed: false,
    targetValue: 500,
    unit: 'ml',
    actionText: 'Log 500 ml',
    actionType: 'water',
    why: 'Nutrient delivery to hair follicles requires peak hydration.'
  },
  {
    id: 'r-830',
    time: '8:30 AM',
    title: 'Morning Fitness Walk',
    description: '30 Minutes light outdoor walk to boost circulation.',
    icon: 'Footprints',
    category: 'walk',
    completed: false,
    targetValue: 30,
    unit: 'mins',
    actionText: 'Start Walk',
    actionType: 'walk',
    why: 'Enhances scalp blood flow and releases morning serotonin.'
  },
  {
    id: 'r-915',
    time: '9:15 AM',
    title: 'Hair Regrowth Protein Breakfast',
    description: '2 Idlis + Sambar + 1 Boiled Egg (rich in Zinc & Biotin).',
    icon: 'Utensils',
    category: 'meal',
    completed: false,
    actionText: 'Log Breakfast',
    actionType: 'meal',
    why: 'Egg protein & zinc rebuild Keratin structure in hair roots.'
  },
  {
    id: 'r-1100',
    time: '11:00 AM',
    title: 'Mid-Morning Hydration (500 ml)',
    description: 'Drink second 500 ml glass of water.',
    icon: 'Droplets',
    category: 'water',
    completed: false,
    targetValue: 500,
    unit: 'ml',
    actionText: 'Log 500 ml',
    actionType: 'water',
    why: 'Keeps skin supple and flushes out metabolic toxins.'
  },
  {
    id: 'r-1300',
    time: '1:00 PM',
    title: 'Healthy Plate Lunch Guide',
    description: '1/2 Plate Veggies, 1/4 Brown Rice, 1/4 Protein (Dal/Paneer/Chicken).',
    icon: 'Salad',
    category: 'meal',
    completed: false,
    actionText: 'Log Lunch',
    actionType: 'meal',
    why: 'Iron & Vitamin B12 support red blood cell hair oxygen supply.'
  },
  {
    id: 'r-1500',
    time: '3:00 PM',
    title: 'Posture & Stretch Break',
    description: '5 Minutes gentle standing stretch & neck rotations.',
    icon: 'UserCheck',
    category: 'movement',
    completed: false,
    duration: '5 mins',
    actionText: 'Complete Stretch',
    actionType: 'complete',
    why: 'Relieves neck tension that restricts blood flow to the head.'
  },
  {
    id: 'r-1730',
    time: '5:30 PM',
    title: 'Restorative Yoga Session',
    description: '20 Minutes pose flow: Cat-Cow, Child\'s Pose, Cobra, Butterfly.',
    icon: 'HeartHandshake',
    category: 'yoga',
    completed: false,
    duration: '20 mins',
    actionText: 'Begin Yoga Flow',
    actionType: 'yoga',
    why: 'Lowers cortisol stress hormones that trigger Telogen Effluvium hair fall.'
  },
  {
    id: 'r-1815',
    time: '6:15 PM',
    title: 'Sunset Walk With Manish 👫',
    description: 'Walk together with Manish. Support each other\'s daily targets!',
    icon: 'Users',
    category: 'walk',
    completed: false,
    duration: '30 mins',
    actionText: 'Walk Together',
    actionType: 'walk_husband',
    why: 'Shared fitness strengthens marital bonding and mutual consistency.'
  },
  {
    id: 'r-2000',
    time: '8:00 PM',
    title: 'Omega-3 Rich Dinner',
    description: 'Steamed Fish / Dal Tadka + Chapati + Veggies.',
    icon: 'UtensilsCrossed',
    category: 'meal',
    completed: false,
    actionText: 'Log Dinner',
    actionType: 'meal',
    why: 'Omega-3 fatty acids nourish hair follicles and boost skin radiance.'
  },
  {
    id: 'r-2215',
    time: '10:15 PM',
    title: 'Bedtime Hair & Skin Care Routine',
    description: 'Scalp massage, silk pillowcase, screen wind-down.',
    icon: 'Moon',
    category: 'sleep',
    completed: false,
    duration: '30 mins',
    actionText: 'Wind Down',
    actionType: 'complete',
    why: 'Deep sleep stimulates cellular hair follicle regeneration.'
  }
];

export const RANJU_MISSIONS = [
  { id: 'rm1', title: 'Drink 2.5 L Water', completed: false, category: 'water', icon: 'Droplets' },
  { id: 'rm2', title: 'Walk 30 Minutes', completed: false, category: 'walk', icon: 'Footprints' },
  { id: 'rm3', title: 'Protein & Zinc Meal', completed: false, category: 'nutrition', icon: 'Apple' },
  { id: 'rm4', title: '20 Mins Hair Yoga', completed: false, category: 'yoga', icon: 'Heart' },
  { id: 'rm5', title: 'Sleep Before 11:00 PM', completed: false, category: 'sleep', icon: 'Moon' }
];

export const RANJU_MEALS = {
  breakfast: [
    { id: 'rb1', name: '2 Idlis + Sambar + 1 Boiled Egg', protein: '14g', calories: '320 kcal', why: 'Egg protein & zinc strengthen hair roots.' },
    { id: 'rb2', name: 'Oats with Warm Milk & Flaxseeds', protein: '12g', calories: '290 kcal', why: 'Omega-3 & Biotin nourish scalp and skin.' },
    { id: 'rb3', name: 'Veg Upma with Roasted Peanuts', protein: '9g', calories: '310 kcal', why: 'Vitamin E & antioxidants boost skin glow.' }
  ],
  lunch: [
    { id: 'rl1', name: 'Balanced Veg Plate (Dal + Veggies + Brown Rice)', protein: '18g', calories: '450 kcal', why: 'Iron & Fiber balance hormone levels.' },
    { id: 'rl2', name: 'Grilled Fish + Broccoli + Quinoa', protein: '32g', calories: '440 kcal', why: 'Omega-3 fatty acids reduce hair follicle inflammation.' },
    { id: 'rl3', name: 'Paneer Sauté + Spinach Curry + 2 Roti', protein: '22g', calories: '500 kcal', why: 'Calcium & Vitamin D promote hair density.' }
  ],
  dinner: [
    { id: 'rd1', name: 'Steamed Fish + Sautéed Veggies', protein: '30g', calories: '380 kcal', why: 'Collagen & Omega-3 repair skin overnight.' },
    { id: 'rd2', name: 'Chicken Breast + Mixed Greens Salad', protein: '32g', calories: '360 kcal', why: 'Lean amino acids synthesize keratin.' },
    { id: 'rd3', name: 'Yellow Dal Tadka + 2 Multi-grain Roti', protein: '16g', calories: '410 kcal', why: 'Comforting, digestible protein for deep sleep.' }
  ]
};

export const RANJU_JOURNEYS = [
  {
    id: 'hair-recovery',
    title: 'Hair Recovery & Root Strength',
    icon: 'Sparkles',
    progressPct: 78,
    status: 'Improving consistently (3-week streak)',
    metrics: [
      { label: 'Hair Fall Rating', value: 'Low (<15 strands)' },
      { label: 'Protein Target', value: 'Achieved (45g+ daily)' },
      { label: 'Scalp Massage', value: '5 mins daily' }
    ],
    recommendations: [
      'Pair boiled egg with morning meal for optimal Zinc absorption.',
      'Maintain 20 minutes Child\'s Pose & Cobra pose to maximize scalp blood flow.'
    ]
  },
  {
    id: 'skin-health',
    title: 'Radiant Skin & Hydration',
    icon: 'Sun',
    progressPct: 85,
    status: 'Glow score elevated',
    metrics: [
      { label: 'Hydration', value: '2.5L / 2.5L Target' },
      { label: 'Antioxidants', value: 'Fresh Fruit Logged' },
      { label: 'Sleep Score', value: '7.5 Hours' }
    ],
    recommendations: [
      'Sip warm water with lemon upon waking to flush toxins.',
      'Use silk pillowcase to prevent moisture friction overnight.'
    ]
  },
  {
    id: 'fitness-energy',
    title: 'Core Fitness & Serotonin',
    icon: 'Heart',
    progressPct: 82,
    status: 'Consistent 7-day walk streak',
    metrics: [
      { label: 'Daily Walking', value: '30-45 Mins' },
      { label: 'Yoga Sessions', value: '4 Sessions / week' },
      { label: 'Energy Level', value: 'High' }
    ],
    recommendations: [
      'Keep evening walk with Manish active—partner walking builds long-term consistency.'
    ]
  }
];
