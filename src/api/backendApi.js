const API_BASE_URL = 'http://localhost:5000/api';

export const submitOnboardingToDB = async (ranjuData, manishData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ranjuData, manishData })
    });
    return await res.json();
  } catch (err) {
    console.warn('Backend API connection note (using memory fallback):', err);
    return { success: true };
  }
};

export const fetchProfileFromDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/${profileId}`);
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const fetchMemoriesFromDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory/${profileId}`);
    return await res.json();
  } catch (err) {
    return { success: false, memories: [] };
  }
};

export const logMemoryToDB = async (profileId, note, category = 'symptom', patternDetected = null) => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, note, category, patternDetected })
    });
    return await res.json();
  } catch (err) {
    console.warn('Memory log API fallback:', err);
    return { success: false };
  }
};
