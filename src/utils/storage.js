const STORAGE_KEY = 'RANJU_LIFE_ROUTINE_APP_V2';

export const loadAppState = (defaultState) => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object' && parsed.ranju && parsed.manish) {
        return { ...defaultState, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Failed to load state from localStorage, using initial default state', err);
  }
  return defaultState;
};

export const saveAppState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save state to localStorage', err);
  }
};
