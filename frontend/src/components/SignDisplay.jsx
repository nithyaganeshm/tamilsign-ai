import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignDisplay = ({ signs, onComplete }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    if (signs.length > 1 && signs[0].type === 'letter') {
      setCurrentLetterIndex(0);
      const interval = setInterval(() => {
        setCurrentLetterIndex((prev) => {
          if (prev >= signs.length - 1) {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 1500); // Wait 1.5s on last letter then hide
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else if (signs.length === 1 && signs[0].type === 'gif') {
      // For single GIF phrases, wait a bit then auto-hide
      const timer = setTimeout(() => {
        onComplete?.();
      }, 5000); // Show GIF for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [signs, onComplete]);

  if (signs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />
          <div className="relative w-40 h-40 rounded-[2.5rem] border border-slate-500/10 bg-slate-500/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-slate-500/10 border border-slate-500/20 shadow-xl flex items-center justify-center"
            >
              <div className="w-6 h-1 bg-slate-600 rounded-full" />
            </motion.div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-slate-400 font-display uppercase tracking-widest">Awaiting Input</p>
          <p className="text-xs text-slate-600 italic">Sign animations will appear here</p>
        </div>
      </div>
    );
  }

  // Handle single GIF (Phrase)
  if (signs.length === 1 && signs[0].type === 'gif') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-2xl group-hover:bg-indigo-500/30 transition-all" />
          <img
            src={signs[0].url}
            alt={signs[0].word}
            className="relative w-full max-w-[400px] rounded-2xl shadow-2xl border border-slate-800"
          />
        </motion.div>
        <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
          Phrase: {signs[0].word}
        </span>
      </div>
    );
  }

  // Handle Letter Sequence (Spelling)
  const currentLetter = signs[currentLetterIndex];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentLetter.char}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl" />
            <img
              src={currentLetter.url}
              alt={currentLetter.char}
              className="relative w-full max-w-[300px] aspect-square object-cover rounded-2xl shadow-2xl border border-slate-800"
            />
            <div className="absolute top-4 right-4 bg-emerald-500/90 text-white font-bold px-3 py-1 rounded-lg shadow-lg">
              {currentLetter.char.toUpperCase()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          {signs.map((sign, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border transition-all ${
                index === currentLetterIndex
                  ? 'bg-emerald-500 text-white border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-500/5 text-slate-400 border-slate-500/10'
              }`}
            >
              {sign.char.toUpperCase()}
            </div>
          ))}
        </div>
        <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">
          Word: {signs[0].word}
        </p>
      </div>
      
      <p className="text-slate-500 text-xs italic">Spelling out letter by letter...</p>
    </div>
  );
};

export default SignDisplay;
