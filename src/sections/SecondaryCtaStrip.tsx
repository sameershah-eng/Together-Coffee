import React from 'react';
import { ArrowRight, Coffee, MessageCircle } from 'lucide-react';

export const SecondaryCtaStrip: React.FC = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative py-12 sm:py-16 bg-gradient-to-r from-[#3B2218] via-[#1A0F0A] to-[#3B2218] border-y border-[#D9A441]/30 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[#D9A441] text-xs font-mono uppercase tracking-widest font-semibold">
            <Coffee className="w-4 h-4" />
            <span>FRESHLY ROASTED ON DEMAND</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6EEE3]">
            Fancy a coffee right now? Order ahead & skip the wait.
          </h3>
          <p className="text-xs sm:text-sm text-white/70">
            Tell us your order on WhatsApp and your hot drinks and fresh bites will be packaged and ready for collection on Cumbernauld Road.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href="https://wa.me/447778324873?text=Hi%20Together%20Coffee!%20I'd%20like%20to%20order%20ahead%20for%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/20 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={scrollToMenu}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-[#F6EEE3] border border-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
          </button>
        </div>
      </div>
    </div>
  );
};
