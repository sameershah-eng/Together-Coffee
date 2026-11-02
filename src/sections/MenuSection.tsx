import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Plus, Minus, Check, Leaf, Flame, Sparkles, Printer } from 'lucide-react';
import { MENU_ITEMS, MenuItem, Category, DietaryTag, formatPrice } from '../data/menu';
import { useCart } from '../context/CartContext';
import { IMAGES } from '../data/images';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenPrintMenu: () => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Coffee',
  'Cold Drinks',
  'Tea',
  'Habesha Kitchen',
  'Bites & Pastries',
  'Specials',
];

const DIETARY_FILTERS: DietaryTag[] = [
  'Vegan',
  'Vegetarian',
  'Gluten-Free',
  'Spicy',
  'Bestseller',
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onOpenPrintMenu }) => {
  const { addItem, updateQuantity, getItemQuantity, state } = useCart();

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);

  // Toggle dietary multi-select filter
  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // Dietary tags filter (must have all selected tags)
      if (selectedDietary.length > 0) {
        const hasAllTags = selectedDietary.every(tag => item.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  // Counts for dietary chips
  const dietaryCounts = useMemo(() => {
    const counts: { [key in DietaryTag]?: number } = {};
    DIETARY_FILTERS.forEach(tag => {
      counts[tag] = MENU_ITEMS.filter(item => item.tags.includes(tag)).length;
    });
    return counts;
  }, []);

  // Today's special item
  const todaySpecial = MENU_ITEMS.find(i => i.id === 'spec-buna-ceremony')!;

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#1A0F0A] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
            COFFEE · KITCHEN · BITES
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,7vw,3.8rem)] font-bold text-[#F6EEE3] mt-2 leading-tight">
            The Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            Handcrafted espresso, chilled refreshments, warm teas, and fresh, slow-cooked Eritrean & Ethiopian specialities prepared daily with love.
          </p>

          <button
            onClick={onOpenPrintMenu}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:text-[#D9A441] hover:border-[#D9A441]/40 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>View Printable Menu</span>
          </button>
        </div>

        {/* Today's Special Feature Banner */}
        <div className="mb-12 bg-gradient-to-r from-[#3B2218]/90 via-[#1A0F0A] to-[#3B2218]/90 rounded-3xl border border-[#D9A441]/40 p-5 sm:p-8 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-full md:w-5/12 aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A0F0A] shrink-0 border border-white/10">
              <img
                src={IMAGES.ceremonyBuna}
                alt="Traditional Buna Ceremony"
                className="w-full h-full object-cover warm-filter"
              />
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold-gradient text-[#1A0F0A] text-xs font-bold uppercase tracking-wider">
                  Today's Special
                </span>
                <span className="text-xs text-[#D9A441] font-mono">Buna Ritual</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6EEE3]">
                {todaySpecial.name}
              </h3>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {todaySpecial.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="font-mono text-2xl font-bold text-[#D9A441]">
                  {formatPrice(todaySpecial.price)}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectItem(todaySpecial)}
                    className="text-xs text-white/60 hover:text-white underline underline-offset-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addItem(todaySpecial)}
                    className="h-11 px-5 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-[#D9A441]/20 active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Special</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Filter Bar (seamlessly below sticky navbar) */}
        <div className="sticky top-[66px] sm:top-[72px] z-30 py-3 bg-[#1A0F0A]/90 backdrop-blur-xl border-y border-white/10 -mx-5 px-5 sm:mx-0 sm:px-0 transition-all duration-300">
          {/* Category Tabs with Animated Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(category => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-[#1A0F0A] font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gold-gradient rounded-full shadow-md"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Dietary multi-select chips */}
          <div className="mt-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search coffee, injera, pastries, vegan..."
                className="w-full h-10 pl-9 pr-9 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-[#F6EEE3] placeholder:text-white/35 focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {DIETARY_FILTERS.map(tag => {
                const isSelected = selectedDietary.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#D9A441]/20 border-[#D9A441] text-[#D9A441]'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {tag === 'Vegan' && <Leaf className="w-3 h-3 text-emerald-400" />}
                    {tag === 'Spicy' && <Flame className="w-3 h-3 text-red-400" />}
                    {tag === 'Bestseller' && <Sparkles className="w-3 h-3 text-[#D9A441]" />}
                    <span>{tag}</span>
                    <span className="font-mono text-[10px] opacity-60">({dietaryCounts[tag]})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mt-8">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-serif text-2xl text-[#F6EEE3]">
                Nothing matches that
              </p>
              <p className="text-sm text-white/50">
                Try searching for "latte", "injera", "sambusa", or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDietary([]);
                  setActiveCategory('All');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredItems.map(item => {
                  const qty = getItemQuantity(item.id);
                  const matchingCartItem = state.items.find(i => i.menuItemId === item.id);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      key={item.id}
                      className="bg-white/5 rounded-2xl border border-white/10 hover:border-[#D9A441]/40 overflow-hidden flex flex-col justify-between transition-all group shadow-md"
                    >
                      {/* Image Click triggers Detail Modal */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-transparent to-transparent opacity-60" />

                        {/* Top corner tag */}
                        {item.tags.length > 0 && (
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                            {item.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md ${
                                  tag === 'Bestseller'
                                    ? 'bg-[#D9A441] text-[#1A0F0A]'
                                    : tag === 'Vegan'
                                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-black/70 text-white/90'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Info & Purchase Area */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div onClick={() => onSelectItem(item)} className="cursor-pointer">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-lg font-bold text-[#F6EEE3] group-hover:text-[#D9A441] transition-colors leading-snug line-clamp-1">
                              {item.name}
                            </h3>
                            <span className="font-mono text-base font-bold text-[#D9A441] shrink-0">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-white/60 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Button: Add or Inline Stepper if already added */}
                        <div className="pt-2">
                          {qty > 0 && matchingCartItem ? (
                            <div className="flex items-center justify-between bg-white/10 rounded-xl p-1 border border-[#D9A441]/40">
                              <button
                                type="button"
                                onClick={() => updateQuantity(matchingCartItem.cartItemId, matchingCartItem.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white active:scale-90"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#D9A441]">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>{qty} in cart</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => updateQuantity(matchingCartItem.cartItemId, matchingCartItem.quantity + 1)}
                                aria-label="Increase quantity"
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white active:scale-90"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onSelectItem(item)}
                                className="text-[11px] text-white/40 hover:text-white underline underline-offset-2 px-1"
                              >
                                Options
                              </button>
                              <button
                                type="button"
                                onClick={() => addItem(item)}
                                className="flex-1 h-10 rounded-xl bg-white/10 hover:bg-gold-gradient hover:text-[#1A0F0A] text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/10 hover:border-transparent active:scale-[0.98] transition-all"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Allergen Notice */}
        <div className="mt-14 p-4 rounded-2xl bg-white/5 border border-white/10 text-center max-w-xl mx-auto text-xs text-white/50 space-y-1">
          <p className="font-semibold text-white/70">Allergen Notice</p>
          <p>
            Please tell our team about any allergies or dietary requirements before ordering. Our kitchen handles gluten, dairy, nuts and sesame.
          </p>
        </div>
      </div>
    </section>
  );
};
