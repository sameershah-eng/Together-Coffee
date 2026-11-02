import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Clock, User, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menu';
import { useOpeningHours } from '../hooks/useOpeningHours';

export const CartDrawer: React.FC = () => {
  const {
    state,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderType,
    setCustomerName,
    setPickupTime,
    setSpecialNotes,
    getWhatsAppOrderUrl,
  } = useCart();

  const { pickupSlots, isOpen, statusText } = useOpeningHours();

  // Handle escape key
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsCartOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  const handleOrderWhatsApp = () => {
    const url = getWhatsAppOrderUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer: Bottom sheet on mobile, right panel on desktop */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full sm:max-w-md bg-[#1A0F0A] text-[#F6EEE3] rounded-t-3xl sm:rounded-none sm:rounded-l-3xl border-t sm:border-t-0 sm:border-l border-[#D9A441]/30 shadow-2xl flex flex-col max-h-[90svh] sm:max-h-full sm:h-full z-10"
          >
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto my-3 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6EEE3]">
                    Your Order
                  </h2>
                  <span className="text-xs text-white/50">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {state.items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-white/40 hover:text-red-400 p-2 transition-colors flex items-center gap-1"
                    title="Clear order"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Opening Status Notice in Cart */}
            <div className="px-5 py-2.5 bg-[#3B2218]/40 border-b border-white/5 flex items-center justify-between text-xs">
              <span className="text-white/60">Café Status:</span>
              <span className={`font-medium ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                {statusText}
              </span>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D9A441]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#F6EEE3]">
                      Your order is empty
                    </h3>
                    <p className="text-sm text-white/50 mt-1 max-w-xs">
                      Explore our specialty coffees, fresh buna ceremonies and Habesha dishes.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const menuElem = document.getElementById('menu');
                      menuElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-sm active:scale-95 transition-transform"
                  >
                    Browse the menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Order Type Toggle: Collection vs Dine in */}
                  <div className="bg-white/5 p-1 rounded-xl flex border border-white/10">
                    <button
                      type="button"
                      onClick={() => setOrderType('Collection')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        state.orderType === 'Collection'
                          ? 'bg-[#D9A441] text-[#1A0F0A] shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Collection / Takeaway
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Dine in')}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        state.orderType === 'Dine in'
                          ? 'bg-[#D9A441] text-[#1A0F0A] shadow-md'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Dine In (Table)
                    </button>
                  </div>

                  {/* Item Rows */}
                  <div className="space-y-3">
                    {state.items.map(item => (
                      <div
                        key={item.cartItemId}
                        className="bg-white/5 rounded-2xl p-3 border border-white/10 flex gap-3 items-center"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-[#3B2218] overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover warm-filter"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-sm font-semibold text-[#F6EEE3] truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              aria-label={`Remove ${item.name}`}
                              className="text-white/40 hover:text-red-400 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Options list */}
                          {item.options.length > 0 && (
                            <p className="text-[11px] text-[#D9A441]/90 line-clamp-1 mt-0.5">
                              {item.options.map(o => o.optionName).join(', ')}
                            </p>
                          )}

                          {item.specialInstructions && (
                            <p className="text-[10px] text-white/40 italic line-clamp-1">
                              Note: {item.specialInstructions}
                            </p>
                          )}

                          {/* Price & Stepper Row */}
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-xs font-bold text-[#D9A441]">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>

                            {/* Qty Stepper */}
                            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white rounded active:scale-90"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-medium">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white rounded active:scale-90"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pickup Time & Name inputs */}
                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                        Preferred Pickup / Ready Time
                      </label>
                      <select
                        value={state.pickupTime}
                        onChange={e => setPickupTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-[#F6EEE3] focus:border-[#D9A441] focus:outline-none"
                      >
                        <option value="" className="bg-[#1A0F0A]">As soon as possible (~15–20 mins)</option>
                        {pickupSlots.map(slot => (
                          <option key={slot} value={slot} className="bg-[#1A0F0A]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5 mb-1.5">
                        <User className="w-3.5 h-3.5 text-[#D9A441]" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={state.customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Hana / Callum"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-[#F6EEE3] placeholder:text-white/30 focus:border-[#D9A441] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Checkout Footer */}
            {state.items.length > 0 && (
              <div className="p-5 bg-[#1A0F0A]/95 border-t border-white/10 backdrop-blur-xl shrink-0 pb-safe space-y-3">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-mono text-xl font-bold text-[#F6EEE3]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="w-full h-13 bg-gold-gradient text-[#1A0F0A] font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/25 active:scale-[0.98] transition-transform"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[11px] text-center text-white/40">
                  Opens WhatsApp with your items ready to confirm with Together Coffee.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
