import React from 'react';
import { Languages, Sun, Moon, History, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();

  return (
    <header className="border-b border-slate-500/10 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Languages className="text-white" size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-xl font-extrabold tracking-tight font-display truncate">
              TamilSign AI
            </h1>
            <p className="hidden xs:block text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-500 font-bold truncate">
              Speech-to-Sign
            </p>
          </div>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-500/5 p-1 rounded-lg sm:rounded-xl border border-slate-500/10">
            <Link 
              to="/" 
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold tracking-widest transition-all ${
                location.pathname === '/' 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-500 hover:text-indigo-500'
              }`}
            >
              <Home size={12} />
              <span className="hidden sm:inline">TRANSLATOR</span>
            </Link>
            <Link 
              to="/history" 
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold tracking-widest transition-all ${
                location.pathname === '/history' 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-500 hover:text-indigo-500'
              }`}
            >
              <History size={12} />
              <span className="hidden sm:inline">HISTORY</span>
            </Link>
          </nav>

          <button 
            onClick={toggleTheme}
            className="p-2 sm:p-3 rounded-lg sm:rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all active:scale-90 shadow-lg shadow-indigo-500/5 shrink-0"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
