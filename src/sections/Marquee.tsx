import React from 'react';
import { motion } from 'motion/react';

export const Marquee: React.FC = () => {
  const items = [
    'Espresso',
    'Traditional Buna Ceremony',
    'Fresh Injera',
    'Artisan Pastries',
    'Iced Lattes',
    'Shiro Wot',
    'Beef Tibs',
    'Takeaway & Dine In',
    'Cardamom Shai',
    'Glasgow East End',
  ];

  return (
    <div className="relative w-full py-4 bg-[#3B2218]/80 border-y border-[#D9A441]/30 overflow-hidden select-none">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#1A0F0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#1A0F0A] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 24,
        }}
        className="flex whitespace-nowrap items-center w-max"
      >
        {/* Double repeat for seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-wider text-[#D9A441]">
              {text}
            </span>
            <span className="ml-4 sm:ml-6 text-white/30 text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
