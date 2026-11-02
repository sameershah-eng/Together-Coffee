import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, AlertCircle, Sparkles } from 'lucide-react';
import { MenuItem, formatPrice } from '../data/menu';
import { useCart, CartOptionChoice } from '../context/CartContext';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: number }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [imgError, setImgError] = useState(false);

  // Initialize default options whenever item changes
  useEffect(() => {
    if (item && item.customisationGroups) {
      const defaults: { [groupId: string]: number } = {};
      item.customisationGroups.forEach(group => {
        defaults[group.id] = group.defaultIndex || 0;
      });
      setSelectedOptions(defaults);
      setQuantity(1);
      setSpecialInstructions('');
      setImgError(false);
    }
  }, [item]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [item, onClose]);

  if (!item) return null;

  // Calculate live total price
  let optionsDeltaTotal = 0;
  const chosenOptionsList: CartOptionChoice[] = [];

  if (item.customisationGroups) {
    item.customisationGroups.forEach(group => {
      const selectedIndex = selectedOptions[group.id] ?? (group.defaultIndex || 0);
      const opt = group.options[selectedIndex];
      if (opt) {
        optionsDeltaTotal += opt.priceDelta;
        if (opt.priceDelta > 0 || opt.name !== group.options[0]?.name) {
          chosenOptionsList.push({
            groupLabel: group.label,
            optionName: opt.name,
            priceDelta: opt.priceDelta,
          });
        }
      }
    });
  }

  const unitPrice = item.price + optionsDeltaTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(item, chosenOptionsList, quantity, specialInstructions);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal / Sheet Container */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full sm:max-w-lg bg-[#1A0F0A] text-[#F6EEE3] rounded-t-3xl sm:rounded-3xl border border-[#D9A441]/30 shadow-2xl overflow-hidden max-h-[90svh] flex flex-col z-10"
        >
          {/* Mobile Drag Handle */}
          <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto my-3 shrink-0" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-[#F6EEE3] hover:text-[#D9A441] border border-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable content body */}
          <div className="overflow-y-auto no-scrollbar flex-1 pb-24 sm:pb-20">
            {/* Image Header with fallback */}
            <div className="relative w-full aspect-[16/10] bg-[#3B2218] overflow-hidden">
              {!imgError ? (
                <img
                  src={item.image}
                  alt={item.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover warm-filter"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3B2218] to-[#1A0F0A] text-[#D9A441] p-6 text-center">
                  <Sparkles className="w-8 h-8 mb-2 opacity-60" />
                  <p className="font-serif text-lg text-[#F6EEE3]">{item.name}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-transparent to-black/30" />
              
              {/* Category tag */}
              <div className="absolute bottom-3 left-5 flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D9A441] bg-[#1A0F0A]/80 px-2.5 py-1 rounded-md border border-[#D9A441]/30 backdrop-blur-sm">
                  {item.category}
                </span>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-sans text-white/90 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-6 space-y-5">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F6EEE3] leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#D9A441] shrink-0">
                    {formatPrice(unitPrice)}
                  </span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Allergens warning if present */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-300/80 bg-amber-950/30 p-2.5 rounded-xl border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Allergens: {item.allergens.join(', ')}</span>
                </div>
              )}

              {/* Customisation Options */}
              {item.customisationGroups && item.customisationGroups.map(group => (
                <div key={group.id} className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                    {group.label}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {group.options.map((opt, optIndex) => {
                      const isSelected = (selectedOptions[group.id] ?? (group.defaultIndex || 0)) === optIndex;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [group.id]: optIndex }))}
                          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#D9A441] bg-[#D9A441]/15 text-[#F6EEE3]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{opt.name}</span>
                          <span className="text-[11px] font-mono text-[#D9A441] mt-1">
                            {opt.priceDelta > 0 ? `+${formatPrice(opt.priceDelta)}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Special instructions textarea */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                  Special Requests / Allergy Notes
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. extra hot, dressing on the side, oat milk preference..."
                  rows={2}
                  maxLength={150}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar with Stepper & Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-[#1A0F0A]/95 backdrop-blur-xl border-t border-white/10 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-white/10 rounded-xl border border-white/10 p-1 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg active:scale-95 transition-transform"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-mono font-semibold text-sm sm:text-base">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-gold-gradient text-[#1A0F0A] font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/20 active:scale-[0.98] transition-transform"
            >
              <span>Add to order</span>
              <span className="font-mono font-bold">· {formatPrice(totalPrice)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
