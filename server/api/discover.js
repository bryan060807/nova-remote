// server/api/discover.js
// Handles SSDP discovery of LG WebOS TVs on the local network


import dgram from 'dgram';
import express from 'express';


const router = express.Router();


router.get('/discover-lg-tv', async (req, res) => {
const message = Buffer.from(
'M-SEARCH * HTTP/1.1\r\n' +
'HOST: 239.255.255.250:1900\r\n' +
'MAN: "ssdp:discover"\r\n' +
'MX: 3\r\n' +
'ST: urn:lge-com:service:webos-second-screen:1\r\n' +
'\r\n'
);


const socket = dgram.createSocket('udp4');
let tvFound = false;


socket.on('message', (msg, rinfo) => {
const response = msg.toString();
if (response.includes('LG') || response.includes('WebOS')) {
tvFound = true;
res.json({ ip: rinfo.address });
socket.close();
}
});


socket.on('error', (err) => {
console.error('Discovery error:', err);
res.status(500).json({ error: 'Discovery failed' });
socket.close();
});


socket.send(message, 0, message.length, 1900, '239.255.255.250');


setTimeout(() => {
if (!tvFound) {
res.json({ ip: null });
socket.close();
}
}, 5000);
});


export default router;