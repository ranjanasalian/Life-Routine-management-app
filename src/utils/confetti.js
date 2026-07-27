import confetti from 'canvas-confetti';

export const triggerCelebration = (type = 'standard') => {
  try {
    const fire = typeof confetti === 'function' 
      ? confetti 
      : (confetti && typeof confetti.default === 'function') 
        ? confetti.default 
        : null;

    if (fire) {
      if (type === 'major') {
        fire({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#10b981', '#14b8a6', '#f59e0b', '#ec4899']
        });
      } else {
        fire({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#14b8a6', '#f59e0b', '#38bdf8']
        });
      }
    }
  } catch (err) {
    console.warn('Confetti trigger fallback', err);
  }
};
