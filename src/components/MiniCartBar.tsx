import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menu';

export const MiniCartBar: React.FC = () => {
  const { totalItems, subtotal, isCartOpen, setIsCartOpen } = useCart();

  // Show only on mobile when cart has items and drawer is closed
  const isVisible = totalItems > 0 && !isCartOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 pb-safe bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/95 to-transparent pointer-events-none"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full h-13 px-4 rounded-2xl bg-gold-gradient text-[#1A0F0A] font-semibold flex items-center justify-between shadow-xl shadow-[#D9A441]/30 active:scale-[0.98] transition-transform pointer-events-auto"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1A0F0A]/20 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#1A0F0A]" />
              </div>
              <span className="text-sm font-bold">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm">
                {formatPrice(subtotal)}
              </span>
              <div className="flex items-center text-xs uppercase tracking-wider font-bold bg-[#1A0F0A] text-[#D9A441] px-2.5 py-1 rounded-lg">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
