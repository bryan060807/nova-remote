// server/api/pair.js
// Handles WebSocket pairing with LG WebOS TV

import express from 'express';
import WebSocket from 'ws';

const router = express.Router();
let connectedTV = null;
let tvSocket = null;

router.get('/pair', async (req, res) => {
  const tvIP = process.env.TV_IP || '192.168.12.81'; // fallback IP
  try {
    tvSocket = new WebSocket(`ws://${tvIP}:3000`);

    tvSocket.on('open', () => {
      console.log('Connected to LG TV via WebSocket');
      tvSocket.send(
        JSON.stringify({
          type: 'register',
          payload: {
            pairingType: 'PROMPT',
            manifest: {
              appId: 'com.nova.remote',
              manifestVersion: 1,
              permissions: [
                'LAUNCH',
                'CONTROL_AUDIO',
                'CONTROL_POWER',
                'CONTROL_INPUT_MEDIA_PLAYBACK',
                'CONTROL_TV',
              ],
            },
          },
        })
      );
    });

    tvSocket.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.type === 'registered') {
        connectedTV = tvIP;
        console.log('Paired successfully with TV');
        res.json({ success: true, message: 'Paired successfully', ip: tvIP });
      }
    });

    tvSocket.on('error', (err) => {
      console.error('WebSocket error:', err);
      res.status(500).json({ error: 'Connection failed' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Pairing process failed' });
  }
});

export { tvSocket, connectedTV };
export default router;
