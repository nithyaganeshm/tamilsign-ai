import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeechControls = ({ isListening, onToggle, status }) => {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-indigo-500 rounded-full"
            />
          )}
        </AnimatePresence>
        
        <button
          onClick={onToggle}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl ${
            isListening 
              ? 'bg-red-500 hover:bg-red-400 shadow-red-500/30' 
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30'
          }`}
        >
          {isListening ? (
            <MicOff className="text-white" size={32} />
          ) : (
            <Mic className="text-white" size={32} />
          )}
        </button>
      </div>
      
      <div className="text-center">
        <p className={`text-sm font-medium tracking-wide transition-colors ${
          isListening ? 'text-red-400' : 'text-indigo-400'
        }`}>
          {status}
        </p>
        <p className="text-slate-500 text-xs mt-1">
          {isListening ? 'Click to stop' : 'Click to start Tamil recognition'}
        </p>
      </div>
    </div>
  );
};

export default SpeechControls;
