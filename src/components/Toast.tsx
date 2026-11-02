import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, setIsCartOpen } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1A0F0A]/95 text-[#F6EEE3] border border-[#D9A441]/40 shadow-2xl backdrop-blur-xl max-w-[90vw]"
        >
          <div className="w-7 h-7 rounded-full bg-[#D9A441] text-[#1A0F0A] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-sm font-medium pr-2 truncate">{toastMessage}</span>
          <button
            onClick={() => {
              clearToast();
              setIsCartOpen(true);
            }}
            className="text-xs font-semibold text-[#D9A441] hover:underline flex items-center gap-1 shrink-0 pl-2 border-l border-white/10"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            View
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
