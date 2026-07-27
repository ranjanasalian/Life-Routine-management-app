const STORAGE_KEY = 'RANJU_LIFE_ROUTINE_APP_V1';

export const loadAppState = (defaultState) => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return { ...defaultState, ...parsed };
    }
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
  }
  return defaultState;
};

export const saveAppState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};
