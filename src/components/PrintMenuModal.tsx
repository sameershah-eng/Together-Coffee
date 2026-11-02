import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Coffee } from 'lucide-react';
import { MENU_ITEMS, Category, formatPrice } from '../data/menu';

interface PrintMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintMenuModal: React.FC<PrintMenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories: Exclude<Category, 'All'>[] = [
    'Specials',
    'Coffee',
    'Cold Drinks',
    'Tea',
    'Habesha Kitchen',
    'Bites & Pastries',
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md no-print"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-3xl bg-[#FDFBF7] text-[#1A0F0A] rounded-2xl shadow-2xl p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar for modal (hidden when printing) */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10 no-print">
            <span className="text-xs font-mono uppercase tracking-wider text-black/50">
              Printable Menu Preview
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1A0F0A] text-[#F6EEE3] rounded-lg text-xs font-medium hover:bg-[#3B2218] transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                onClick={onClose}
                aria-label="Close printable menu"
                className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Paper Menu Content */}
          <div className="space-y-8 font-sans">
            {/* Header */}
            <div className="text-center space-y-1 pb-6 border-b border-black/15">
              <div className="flex justify-center mb-2">
                <Coffee className="w-6 h-6 text-[#D9A441]" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A0F0A]">
                Together Coffee
              </h1>
              <p className="text-xs tracking-[0.2em] uppercase font-mono text-black/60">
                7 Cumbernauld Road · Glasgow G31 2SW · East End
              </p>
              <p className="text-xs text-black/60 italic font-serif">
                Coffee, culture & authentic Eritrean & Ethiopian flavours
              </p>
            </div>

            {/* Menu Categories */}
            <div className="space-y-8">
              {categories.map(cat => {
                const itemsInCat = MENU_ITEMS.filter(i => i.category === cat);
                if (itemsInCat.length === 0) return null;

                return (
                  <div key={cat} className="space-y-3">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold border-b border-[#D9A441]/40 pb-1 text-[#3B2218] flex items-center justify-between">
                      <span>{cat}</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {itemsInCat.map(item => (
                        <div key={item.id} className="flex justify-between items-baseline gap-2 pb-1.5 border-b border-black/5">
                          <div>
                            <div className="font-medium text-sm text-[#1A0F0A]">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-black/60 line-clamp-1 max-w-[240px]">
                              {item.description}
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#1A0F0A] shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="pt-6 border-t border-black/15 text-center text-xs text-black/50 space-y-1">
              <p>Please notify our team of any food allergies prior to ordering.</p>
              <p>Monday–Friday 11:00–20:00 · Saturday 09:00–21:00 · Sunday Closed</p>
              <p className="font-mono">Order ahead via WhatsApp: +44 7778 324873</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
