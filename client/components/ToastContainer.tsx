'use client';

import React from 'react';
import { useStore } from '../lib/context/StoreContext';
import { CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl glass-dark text-white border border-rose-gold/30"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'info' ? (
                <Info className="w-5 h-5 text-rose-300 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              <p className="text-xs sm:text-sm font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white transition p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
