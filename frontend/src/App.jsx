import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TranslatorView from './components/TranslatorView';
import HistoryView from './components/HistoryView';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [currentSigns, setCurrentSigns] = useState([]); // List of {type: 'gif'|'letter', url: string}
  const [status, setStatus] = useState('Ready to listen');
  
  const recognitionRef = useRef(null);
  const signOutputRef = useRef(null);

  useEffect(() => {
    if (currentSigns.length > 0 && window.innerWidth < 1024) {
      signOutputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSigns]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      setStatus('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'ta-IN';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
    };

      recognitionRef.current.onresult = async (event) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        setStatus('Translating...');
        
        try {
          const response = await axios.post(`${API_BASE_URL}/translate`, { text: currentTranscript });
          const { tamil, english } = response.data;
          setTranslatedText(tamil);
          processSignMapping(english, tamil);
        } catch (error) {
          console.error('Translation error:', error);
          setStatus('Error in translation');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setStatus(`Error: ${event.error}`);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (status === 'Translating...') setStatus('Ready');
      };
    }, []);

    const toggleListening = () => {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        setTranscript('');
        setTranslatedText('');
        setCurrentSigns([]);
        recognitionRef.current.start();
      }
    };

    const processSignMapping = async (englishText, tamilText) => {
      setStatus('Loading signs...');
      const normalized = englishText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
      
      // Check if it's a known phrase (GIF)
      try {
        const checkGif = await axios.get(`${API_BASE_URL}/check-asset/gif/${normalized}`);
        if (checkGif.data.exists) {
          setCurrentSigns([{ type: 'gif', url: `${API_BASE_URL}${checkGif.data.url}`, word: tamilText }]);
          setStatus('Displaying sign');
        } else {
          // Fallback to letters
          const letters = normalized.split('').filter(char => /[a-z]/.test(char));
          const letterAssets = await Promise.all(letters.map(async (char) => {
            const checkLetter = await axios.get(`${API_BASE_URL}/check-asset/letter/${char}`);
            return checkLetter.data.exists ? { type: 'letter', url: `${API_BASE_URL}${checkLetter.data.url}`, char, word: tamilText } : null;
          }));
          setCurrentSigns(letterAssets.filter(asset => asset !== null));
          setStatus(letterAssets.length > 0 ? 'Spelling out...' : 'No sign found');
        }
      } catch (error) {
        console.error('Sign mapping error:', error);
        setStatus('Error loading signs');
      }
    };

    const handleSignComplete = () => {
      setCurrentSigns([]);
      setStatus('Ready');
    };

  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans selection:bg-indigo-500/30 transition-colors duration-500">
        <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
        
        <Routes>
          <Route path="/" element={
            <TranslatorView 
              isListening={isListening}
              onToggle={toggleListening}
              status={status}
              transcript={transcript}
              translatedText={translatedText}
              currentSigns={currentSigns}
              handleSignComplete={handleSignComplete}
              signOutputRef={signOutputRef}
            />
          } />
          <Route path="/history" element={<HistoryView />} />
        </Routes>

        <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-500/10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-slate-400 text-sm font-medium">&copy; 2026 TamilSign AI.</p>
            <p className="text-slate-600 text-[10px] uppercase tracking-widest">Premium Accessibility Bridge</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
