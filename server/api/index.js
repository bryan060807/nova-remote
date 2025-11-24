export default function handler(req, res) {
res.status(200).json({
message: '✅ Nova Remote API is online',
endpoints: ['/api/pair', '/api/command', '/api/discover'],
});
}