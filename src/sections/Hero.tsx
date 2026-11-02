import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Clock, Star, MapPin, Coffee } from 'lucide-react';
import { useOpeningHours } from '../hooks/useOpeningHours';
import { IMAGES } from '../data/images';

export const Hero: React.FC = () => {
  const { statusText, isOpen } = useOpeningHours();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    setIsTouch(!isFinePointer);

    if (isFinePointer) {
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20; // -10px to +10px
        const y = (e.clientY / innerHeight - 0.5) * 20;
        setMousePos({ x, y });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVisit = () => {
    document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to Together Coffee"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#1A0F0A]"
    >
      {/* Background Image with Slow Ken Burns Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src={IMAGES.hero}
            alt="Together Coffee Glasgow shopfront on Cumbernauld Road"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
        </motion.div>

        {/* Ambient Warm Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/85 via-transparent to-[#1A0F0A]/80" />
        
        {/* Amber glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D9A441]/15 blur-[120px] pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-24 pb-16 flex flex-col items-start sm:items-center sm:text-center">
        {/* Live Hours Badge & Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold bg-[#D9A441]/10 px-3 py-1 rounded-full border border-[#D9A441]/30 backdrop-blur-md">
            EAST END · GLASGOW
          </span>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] sm:text-xs text-white/90 backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-medium">{statusText}</span>
          </div>
        </motion.div>

        {/* Huge Serif Headline with Staggered Word Reveal */}
        <h1 className="font-serif text-[clamp(2.4rem,8.5vw,5.5rem)] font-bold text-[#F6EEE3] leading-[1.06] tracking-tight mb-5 max-w-4xl text-balance">
          Where every cup brings us{' '}
          <span className="text-gold-gradient italic font-normal">
            together
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-sans leading-relaxed mb-8"
        >
          Specialty coffee, fresh bites and authentic Eritrean & Ethiopian flavours,
          served with genuine warmth on Cumbernauld Road.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10"
        >
          <button
            onClick={scrollToMenu}
            className="group h-13 sm:h-14 px-7 rounded-2xl bg-gold-gradient text-[#1A0F0A] font-semibold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#D9A441]/25 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span>Explore the Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={scrollToVisit}
            className="h-13 sm:h-14 px-7 rounded-2xl bg-white/5 hover:bg-white/10 text-[#F6EEE3] border border-white/15 hover:border-[#D9A441]/40 font-medium text-base flex items-center justify-center gap-2 backdrop-blur-md active:scale-[0.98] transition-all"
          >
            <MapPin className="w-4 h-4 text-[#D9A441]" />
            <span>Visit Us</span>
          </button>
        </motion.div>

        {/* Floating Info Cards (Chips on mobile, positioned with slight desktop parallax) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={!isTouch ? { transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)` } : {}}
          className="w-full flex flex-wrap items-center justify-start sm:justify-center gap-2.5 sm:gap-4 pt-2"
        >
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-white/90">
            <Star className="w-4 h-4 fill-[#D9A441] text-[#D9A441]" />
            <span>Loved by locals</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-white/90">
            <Coffee className="w-4 h-4 text-[#D9A441]" />
            <span>Dine in · Takeaway</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-white/90">
            <span className="font-mono text-[#D9A441] font-semibold">From £2.50</span>
            <span className="text-white/60">· Specialty grade</span>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.button
        onClick={scrollToMenu}
        aria-label="Scroll to menu"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/40 hover:text-[#D9A441] transition-colors"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};
