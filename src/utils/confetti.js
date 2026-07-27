import confetti from 'canvas-confetti';

export const triggerCelebration = (type = 'standard') => {
  try {
    if (typeof confetti === 'function') {
      if (type === 'major') {
        // High intensity celebration for full mission completion
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } else {
        // Standard celebration for single task
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#14b8a6', '#f59e0b', '#38bdf8']
        });
      }
    }
  } catch (err) {
    console.log('Confetti trigger fallback', err);
  }
};
