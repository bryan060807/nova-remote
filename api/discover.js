import { discoverTVs } from './utils/tv.js';


export default async function handler(req, res) {
if (req.method !== 'GET') {
return res.status(405).json({ error: 'Method Not Allowed' });
}


try {
const result = await discoverTVs();
res.status(200).json({ success: true, found: result });
} catch (error) {
console.error('❌ Discovery error:', error);
res.status(500).json({ success: false, error: 'Failed to discover TVs' });
}
}