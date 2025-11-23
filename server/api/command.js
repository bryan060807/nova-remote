// server/api/command.js
// Sends control commands to LG WebOS TV through established WebSocket connection

import express from 'express';
import { tvSocket } from './pair.js';

const router = express.Router();

router.post('/send-command', express.json(), async (req, res) => {
  const { action } = req.body;

  if (!tvSocket || tvSocket.readyState !== 1) {
    return res.status(400).json({ error: 'TV not connected or WebSocket closed' });
  }

  let uri = '';
  switch (action) {
    case 'volumeUp':
      uri = 'ssap://audio/volumeUp';
      break;
    case 'volumeDown':
      uri = 'ssap://audio/volumeDown';
      break;
    case 'mute':
      uri = 'ssap://audio/setMute';
      break;
    case 'powerOff':
      uri = 'ssap://system/turnOff';
      break;
    case 'launchApp':
      uri = 'ssap://system.launcher/launch';
      break;
    default:
      return res.status(400).json({ error: 'Unknown command' });
  }

  try {
    tvSocket.send(JSON.stringify({ id: 'cmd_1', type: 'request', uri }));
    console.log(`Command sent: ${action}`);
    res.json({ success: true, message: `Command '${action}' sent` });
  } catch (error) {
    console.error('Command error:', error);
    res.status(500).json({ error: 'Failed to send command' });
  }
});

export default router;
