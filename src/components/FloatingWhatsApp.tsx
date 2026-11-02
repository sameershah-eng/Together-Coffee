import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingWhatsApp: React.FC = () => {
  const { totalItems, isCartOpen } = useCart();

  // If cart drawer is open, hide to prevent overlap
  if (isCartOpen) return null;

  // Move up on mobile if mini cart bar is visible
  const bottomClass = totalItems > 0 
    ? 'bottom-20 sm:bottom-6' 
    : 'bottom-6';

  return (
    <aside aria-label="Quick contact" className={`fixed right-4 sm:right-6 ${bottomClass} z-40 transition-all duration-300`}>
      <a
        href="https://wa.me/447778324873?text=Hi%20Together%20Coffee!%20I'm%20browsing%20your%20website%20and%20had%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Together Coffee on WhatsApp"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" />

        {/* Desktop Tooltip */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#1A0F0A]/95 text-xs text-[#F6EEE3] border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
