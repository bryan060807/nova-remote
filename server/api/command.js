import { sendCommandToTV } from './utils/tv.js';


export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method Not Allowed' });
}


const { action } = req.body;
if (!action) {
return res.status(400).json({ error: 'Missing action' });
}


try {
const result = await sendCommandToTV(action);
res.status(200).json(result);
} catch (error) {
console.error('❌ Command error:', error);
res.status(500).json({ success: false, error: 'Failed to send command' });
}
}