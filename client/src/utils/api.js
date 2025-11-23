// api.js - Centralized API communication for Nova Remote
// Handles communication with the Node.js backend server

const API_BASE_URL = 'http://localhost:5000/api';

// Discover LG TV on the network
export async function discoverTV() {
  try {
    const response = await fetch(`${API_BASE_URL}/discover-lg-tv`);
    return await response.json();
  } catch (error) {
    console.error('Error discovering TV:', error);
    return { ip: null };
  }
}

// Pair with the discovered LG TV
export async function pairTV() {
  try {
    const response = await fetch(`${API_BASE_URL}/pair`);
    return await response.json();
  } catch (error) {
    console.error('Error pairing with TV:', error);
    return { success: false, message: 'Pairing failed' };
  }
}

// Send a command to the paired TV
export async function sendCommand(action) {
  try {
    const response = await fetch(`${API_BASE_URL}/send-command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending command:', error);
    return { success: false, message: 'Command failed' };
  }
}

// Export a single unified API object for easier imports
export const NovaAPI = {
  discoverTV,
  pairTV,
  sendCommand,
};

export default NovaAPI;
