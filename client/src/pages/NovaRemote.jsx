import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Mic, Volume2, Power, Tv, Wifi } from '../components/icons';
import { motion } from 'framer-motion';

// Nova Remote: Main page component controlling LG WebOS TV via voice and WebSocket API

export default function NovaRemote() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('Say a command like "Volume up" or "Turn off TV"');
  const [tvIP] = useState('192.168.12.81');
  const [connected, setConnected] = useState(false);

  // Connect to backend and pair automatically
  useEffect(() => {
    async function connectToBackend() {
      try {
        const pair = await fetch(`http://localhost:5000/api/pair`);
        const result = await pair.json();
        if (result.success) {
          setFeedback(`Paired successfully with LG TV at ${tvIP}`);
          setConnected(true);
        } else {
          setFeedback('Pairing failed. Please retry.');
        }
      } catch (error) {
        console.error('Pairing error:', error);
        setFeedback('Error connecting to backend API.');
      }
    }
    connectToBackend();
  }, [tvIP]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Voice control not supported on this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);
      handleCommand(command);
    };

    if (listening) recognition.start();

    return () => recognition.stop();
  }, [listening]);

  // Handle voice commands
  const handleCommand = async (cmd) => {
    let action = '';
    if (cmd.includes('volume up')) {
      action = 'volumeUp';
      setFeedback('Turning volume up.');
    } else if (cmd.includes('volume down')) {
      action = 'volumeDown';
      setFeedback('Turning volume down.');
    } else if (cmd.includes('mute')) {
      action = 'mute';
      setFeedback('Muting the TV.');
    } else if (cmd.includes('power off')) {
      action = 'powerOff';
      setFeedback('Turning off the TV.');
    } else if (cmd.includes('netflix')) {
      action = 'launchApp';
      setFeedback('Opening Netflix.');
    } else {
      setFeedback('Sorry, I didn’t understand that.');
      speakFeedback('Sorry, I didn’t understand that.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      if (data.success) speakFeedback(feedback);
    } catch (err) {
      console.error('Command error:', err);
      setFeedback('Failed to send command.');
    }
  };

  // Text-to-speech feedback
  const speakFeedback = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white p-6">
      <Card className="w-full max-w-md text-center rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Nova Remote
        </h1>

        <motion.div
          className="flex justify-center mb-8"
          animate={{ scale: listening ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button
            onClick={() => setListening(!listening)}
            className={`rounded-full p-10 shadow-lg ${listening ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <Mic className="w-10 h-10" />
          </Button>
        </motion.div>

        <p className="text-lg mb-4 italic">{feedback}</p>

        {transcript && (
          <p className="text-gray-400 mb-6">You said: “{transcript}”</p>
        )}

        <CardContent className="grid grid-cols-3 gap-4 mt-4">
          <Button onClick={() => handleCommand('volume up')} className="bg-gray-700 hover:bg-gray-600"><Volume2 /></Button>
          <Button onClick={() => handleCommand('power off')} className="bg-gray-700 hover:bg-gray-600"><Power /></Button>
          <Button onClick={() => handleCommand('netflix')} className="bg-gray-700 hover:bg-gray-600"><Tv /></Button>
        </CardContent>

        <div className="flex justify-center items-center mt-6 space-x-2 text-gray-400">
          <Wifi className="w-5 h-5" />
          <span>{connected ? `Connected to ${tvIP}` : 'Connecting to LG TV...'}</span>
        </div>
      </Card>

      <footer className="mt-8 text-sm text-gray-400">
        Say commands like “Open Netflix” or “Mute TV” — works best in Chrome.
      </footer>
    </div>
  );
}
