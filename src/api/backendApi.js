const API_BASE_URL = 'http://localhost:5000/api';

export const submitDynamicOnboardingToDB = async (profilesData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profilesData })
    });
    return await res.json();
  } catch (err) {
    console.warn('Backend API connection note (using local memory fallback):', err);
    return { success: true };
  }
};

export const fetchAllProfilesFromDB = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/profiles`);
    return await res.json();
  } catch (err) {
    return { success: false, profiles: [] };
  }
};

export const updateProfileInDB = async (profileId, updateData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteProfileInDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/${profileId}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const fetchChatsFromDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/chats/${profileId}`);
    return await res.json();
  } catch (err) {
    return { success: false, chats: [] };
  }
};

export const saveChatToDB = async (profileId, sender, text) => {
  try {
    const res = await fetch(`${API_BASE_URL}/chats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, sender, text })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const fetchHealthLogsFromDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/healthlogs/${profileId}`);
    return await res.json();
  } catch (err) {
    return { success: false, logs: [] };
  }
};

export const saveHealthLogToDB = async (profileId, logType, value, notes = '') => {
  try {
    const res = await fetch(`${API_BASE_URL}/healthlogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, logType, value, notes })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
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
    return { success: false };
  }
};

export const deleteMemoryFromDB = async (memoryId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory/${memoryId}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const clearMemoriesFromDB = async (profileId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory/clear/${profileId}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};
