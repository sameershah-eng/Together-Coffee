import React from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MenuItem, formatPrice } from '../data/menu';
import { useCart } from '../context/CartContext';

interface BestsellersProps {
  onSelectItem: (item: MenuItem) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ onSelectItem }) => {
  const { addItem, getItemQuantity } = useCart();

  // Curated 4 bestsellers matching real client photos
  const bestsellers = [
    MENU_ITEMS.find(i => i.id === 'spec-buna-ceremony')!,
    MENU_ITEMS.find(i => i.id === 'hk-veggie-combo')!,
    MENU_ITEMS.find(i => i.id === 'c-habesha-spiced')!,
    MENU_ITEMS.find(i => i.id === 'bp-toasted-panini')!,
  ].filter(Boolean);

  return (
    <section className="py-16 sm:py-24 bg-[#1A0F0A] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#D9A441]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D9A441] font-medium">
                LOCAL FAVOURITES
              </span>
            </div>
            <h2 className="font-serif text-[clamp(1.9rem,6vw,3.2rem)] font-bold text-[#F6EEE3] leading-tight">
              Signature Flavours
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Our most requested specialty roasts, ceremonial brews, and slow-cooked Habesha comfort dishes.
          </p>
        </div>

        {/* Carousel on mobile (scroll-snap-x), Grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0">
          {bestsellers.map(item => {
            const qty = getItemQuantity(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="w-[82vw] sm:w-auto shrink-0 snap-center bg-white/5 rounded-3xl border border-white/10 hover:border-[#D9A441]/50 overflow-hidden flex flex-col justify-between group transition-all shadow-xl shadow-black/30"
              >
                {/* Image Container with Zoom */}
                <div
                  onClick={() => onSelectItem(item)}
                  className="relative aspect-[4/3] bg-[#3B2218] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover warm-filter group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Tag */}
                  <span className="absolute top-3 left-3 text-[11px] font-sans font-semibold text-[#1A0F0A] bg-[#D9A441] px-2.5 py-1 rounded-full shadow-md">
                    Bestseller
                  </span>

                  {/* Price overlay on image */}
                  <div className="absolute bottom-3 right-3 font-mono text-base font-bold text-[#D9A441] bg-[#1A0F0A]/90 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md">
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-serif text-xl font-bold text-[#F6EEE3] group-hover:text-[#D9A441] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="text-xs text-white/50 hover:text-white underline underline-offset-4"
                    >
                      Customise
                    </button>

                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      className={`h-10 px-4 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                        qty > 0
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-gold-gradient text-[#1A0F0A] shadow-md hover:brightness-105'
                      }`}
                    >
                      {qty > 0 ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>In cart ({qty})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
