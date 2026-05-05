import React from 'react';
import SignDisplay from './SignDisplay';
import TranscriptView from './TranscriptView';
import SpeechControls from './SpeechControls';

const TranslatorView = ({ 
  isListening, 
  onToggle, 
  status, 
  transcript, 
  translatedText, 
  currentSigns, 
  handleSignComplete,
  signOutputRef 
}) => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      <section className="space-y-8">
        <div className="glass-card p-8 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-display">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse" />
            Speech Input
          </h2>
          <div className="flex-1 flex flex-col justify-center">
            <SpeechControls 
              isListening={isListening} 
              onToggle={onToggle} 
              status={status} 
            />
            <TranscriptView 
              transcript={transcript} 
              translatedText={translatedText} 
            />
          </div>
        </div>
      </section>

      <section ref={signOutputRef} className="glass-card p-8 min-h-[500px] flex flex-col scroll-mt-24">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-display">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          Sign Language Output
        </h2>
        <div className="flex-1 flex items-center justify-center">
          <SignDisplay 
            key={JSON.stringify(currentSigns)} 
            signs={currentSigns} 
            onComplete={handleSignComplete}
          />
        </div>
      </section>
    </main>
  );
};

export default TranslatorView;
