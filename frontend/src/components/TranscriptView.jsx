import React from 'react';
import { motion } from 'framer-motion';

const TranscriptView = ({ transcript, translatedText }) => {
  return (
    <div className="space-y-6 mt-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold font-display">
            Recognized (Tamil)
          </label>
          {transcript && <span className="text-[10px] text-indigo-400 font-medium animate-pulse">Live</span>}
        </div>
        <div className="min-h-[80px] p-5 rounded-2xl bg-slate-500/5 border border-slate-500/10 text-lg leading-relaxed shadow-inner">
          {transcript || <span className="text-slate-500 italic font-light opacity-60">No speech detected yet...</span>}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold font-display">
          Translated (English)
        </label>
        <div className="min-h-[80px] p-5 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 text-lg font-medium leading-relaxed shadow-inner">
          {translatedText || <span className="text-indigo-500/60 italic font-light">Waiting for translation...</span>}
        </div>
      </div>
    </div>
  );
};

export default TranscriptView;
