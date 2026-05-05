import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Trash2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const HistoryView = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/history/${id}`);
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting history entry:', error);
      alert('Failed to delete entry');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold font-display flex items-center gap-3">
            <Clock className="text-indigo-500" size={32} />
            Recent Translations
          </h2>
          <p className="text-slate-500 mt-2">Your last 50 speech-to-sign conversions</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-slate-400 italic">No translation history found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id}
              className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex-1 space-y-1 sm:space-y-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-indigo-500 font-bold bg-indigo-500/5 px-2 py-0.5 sm:py-1 rounded">Tamil</span>
                  <p className="text-base sm:text-lg font-medium">{item.tamil}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:flex-row sm:items-center gap-3 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-500/10">
                <p className="text-xs sm:text-sm font-semibold text-slate-400 font-mono tracking-tight">
                  {formatDate(item.timestamp)}
                </p>
                
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                  title="Delete Entry"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
