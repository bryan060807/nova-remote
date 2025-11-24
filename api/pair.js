import { pairWithTV } from './utils/tv.js';


export default async function handler(req, res) {
if (req.method === 'GET') {
try {
const result = await pairWithTV();
res.status(200).json(result);
} catch (error) {
console.error('❌ Pairing error:', error);
res.status(500).json({ success: false, error: 'Failed to pair with TV' });
}
} else {
res.status(405).json({ error: 'Method Not Allowed' });
}
}