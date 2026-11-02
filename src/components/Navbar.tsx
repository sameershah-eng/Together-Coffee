import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Phone, 
  Instagram, 
  Facebook, 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Sparkles,
  Coffee,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOpeningHours } from '../hooks/useOpeningHours';

interface NavItem {
  id: string;
  label: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', number: '01' },
  { id: 'menu', label: 'Menu', number: '02' },
  { id: 'ceremony', label: 'Ceremony', number: '03' },
  { id: 'about', label: 'About', number: '04' },
  { id: 'gallery', label: 'Gallery', number: '05' },
  { id: 'visit', label: 'Visit', number: '06' },
  { id: 'contact', label: 'Contact', number: '07' },
];

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen, lastAddedTime } = useCart();
  const { isOpen, statusText } = useOpeningHours();

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | 'none'>('none');
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);

  // High-performance scroll tracking with requestAnimationFrame and direction detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          // Reading progress line calculation
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)));
          }

          // Sticky transparency trigger threshold
          setIsScrolled(currentScrollY > 15);

          // Scroll direction detection (with 4px deadzone for micro-jitters)
          if (Math.abs(delta) > 4) {
            setScrollDirection(delta > 0 ? 'down' : 'up');
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(item.id);
              }
            });
          },
          { rootMargin: '-25% 0px -55% 0px' }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - offset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Sticky Top Header Container */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] gpu-accel ${
          isScrolled
            ? 'py-1.5 sm:py-2.5'
            : 'py-2.5 sm:py-4 md:py-5'
        }`}
      >
        {/* Real-time reading progress line with glowing golden tip */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/5 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#E8873A] via-[#D9A441] to-[#F2C76E] shadow-[0_0_8px_rgba(217,164,65,0.7)] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-2.5 xs:px-3.5 sm:px-6 lg:px-8">
          {/* 
            Ultra-Efficient Sticky & Transparent Glass Bar
            - Fully responsive on all mobile screens (320px up to 4K)
            - Transparent & floating when at top
            - Translucent frosted glass when scrolling down (blur-2xl bg-[#1A0F0A]/65)
            - Translucent golden-sheen frosted glass when scrolling up (blur-2xl bg-[#1A0F0A]/78)
          */}
          <nav
            aria-label="Main Navigation"
            className={`w-full flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl sm:rounded-full px-2.5 xs:px-3 sm:px-5 lg:px-6 ${
              isScrolled
                ? scrollDirection === 'up'
                  ? 'h-13 sm:h-15 bg-[#1A0F0A]/82 backdrop-blur-2xl border border-[#D9A441]/45 shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(217,164,65,0.18)]'
                  : 'h-13 sm:h-15 bg-[#1A0F0A]/70 backdrop-blur-xl border border-[#D9A441]/30 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(217,164,65,0.1)]'
                : 'h-14 sm:h-17 bg-black/35 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20'
            }`}
          >
            {/* Zone 1: Logo Wordmark & Animated Steam Coffee Emblem */}
            <a
              href="#hero"
              onClick={e => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="group flex items-center gap-2 sm:gap-3 shrink min-w-0 select-none py-1"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D9A441]/25 to-[#E8873A]/10 border border-[#D9A441]/45 flex items-center justify-center text-[#D9A441] group-hover:scale-105 group-hover:border-[#D9A441] group-hover:shadow-[0_0_16px_rgba(217,164,65,0.4)] transition-all duration-300 shadow-md shadow-black/40 shrink-0">
                {/* Micro Animated Steam lines */}
                <div className="absolute -top-1.5 sm:-top-2 flex gap-0.5 pointer-events-none">
                  <span className="w-0.5 h-1.5 sm:h-2 bg-[#D9A441] rounded-full animate-steam-1" />
                  <span className="w-0.5 h-2 sm:h-2.5 bg-[#D9A441] rounded-full animate-steam-2" />
                  <span className="w-0.5 h-1.5 sm:h-2 bg-[#D9A441] rounded-full animate-steam-3" />
                </div>
                {/* Coffee Cup SVG */}
                <svg
                  className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.5 7h-14a.5.5 0 0 0-.5.5v9a4.5 4.5 0 0 0 4.5 4.5h5a4.5 4.5 0 0 0 4.5-4.5V13h.5a3.5 3.5 0 0 0 3.5-3.5A2.5 2.5 0 0 0 19 7h-.5zm-1 8.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3V8.5h11v7zm2-7a1 1 0 0 1 1 1 2 2 0 0 1-2 2h-.5v-3h1.5z" />
                </svg>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#F6EEE3] group-hover:text-[#D9A441] transition-colors truncate">
                    Together Coffee
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] hidden xs:inline-block animate-pulse shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase font-mono tracking-wider sm:tracking-widest text-[#D9A441]/90">
                  <span className="truncate">Glasgow East End</span>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  {/* Live status badge embedded in logo area */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-sans font-medium text-white/80">
                    <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-beacon-ripple' : 'bg-amber-400'}`} />
                    <span>{isOpen ? 'Open' : 'Closed'}</span>
                  </span>
                </div>
              </div>
            </a>

            {/* Zone 2: Desktop Navigation Links with Smooth Gliding Indicator */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 whitespace-nowrap rounded-full ${
                      isActive
                        ? 'text-[#D9A441] font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBubble"
                        className="absolute inset-0 bg-[#D9A441]/12 rounded-full border border-[#D9A441]/45 -z-10 shadow-[0_0_12px_rgba(217,164,65,0.25)]"
                        transition={{ type: 'spring', damping: 28, stiffness: 420 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Zone 3: High-Attention CTAs (Quick Call + Responsive WhatsApp + Cart + Mobile Menu) */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
              {/* Desktop Quick Call pill */}
              <a
                href="tel:+447778324873"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/85 hover:text-white text-xs font-medium transition-all active:scale-95"
                title="Call Together Coffee directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>07778 324873</span>
              </a>

              {/* WhatsApp Button - Scaled intelligently across all breakpoints */}
              <a
                href="https://wa.me/447778324873"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                className="relative overflow-hidden group inline-flex items-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gold-gradient text-[#1A0F0A] font-semibold text-xs tracking-wide shadow-md shadow-[#D9A441]/30 hover:shadow-[#D9A441]/50 hover:scale-[1.03] active:scale-[0.97] transition-all whitespace-nowrap animate-attention-pulse shrink-0"
              >
                {/* Light Sweep Shimmer Effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none animate-shine-sweep" />

                <Sparkles className="w-3.5 h-3.5 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold hidden sm:inline">Order on WhatsApp</span>
                <span className="font-bold sm:hidden text-[10px] xs:text-[11px]">Order</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 hidden xs:inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Cart Trigger with Bouncy Badge & Halo */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open shopping cart with ${totalItems} items`}
                className={`relative w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shrink-0 ${
                  totalItems > 0
                    ? 'bg-[#D9A441]/25 border border-[#D9A441]/70 text-[#D9A441] shadow-[0_0_14px_rgba(217,164,65,0.35)]'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5" />
                {totalItems > 0 && (
                  <motion.span
                    key={lastAddedTime}
                    initial={{ scale: 0.3, y: -2 }}
                    animate={{ scale: [1.35, 1], y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 xs:w-5 xs:h-5 rounded-full bg-[#E8873A] text-white text-[9px] xs:text-[10px] font-bold font-mono flex items-center justify-center border-2 border-[#1A0F0A] shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Custom Morphing Hamburger Button for Mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="lg:hidden w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shrink-0"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  className="w-4 xs:w-4.5 sm:w-5 h-0.5 bg-[#F6EEE3] rounded-full origin-center transition-transform"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-4 xs:w-4.5 sm:w-5 h-0.5 bg-[#F6EEE3] rounded-full transition-opacity"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  className="w-4 xs:w-4.5 sm:w-5 h-0.5 bg-[#F6EEE3] rounded-full origin-center transition-transform"
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop with smooth blur fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Slide-in Drawer Panel */}
            <motion.aside
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-[88vw] max-w-[360px] h-full bg-[#1A0F0A] text-[#F6EEE3] border-l border-[#D9A441]/35 shadow-2xl flex flex-col justify-between p-5 xs:p-6 overflow-y-auto no-scrollbar z-10"
            >
              {/* Header inside drawer */}
              <div className="space-y-4 pt-safe">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D9A441]/20 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441]">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight">
                      Together Coffee
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Live Open/Closed Status Chip with Ripple */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-beacon-ripple' : 'bg-amber-400'}`} />
                  <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span className={isOpen ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                    {statusText}
                  </span>
                </div>
              </div>

              {/* Staggered Navigation Links */}
              <nav aria-label="Mobile navigation links" className="my-5 space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 + index * 0.04 }}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full h-11 xs:h-12 flex items-center justify-between text-left group border-b border-white/5 active:bg-white/5 px-1 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#D9A441]/70 group-hover:text-[#D9A441]">
                          {item.number}
                        </span>
                        <span
                          className={`font-serif text-xl xs:text-2xl font-medium transition-colors ${
                            isActive
                              ? 'text-gold-gradient font-bold'
                              : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#D9A441] transition-colors" />
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom Quick Contact & Actions */}
              <div className="space-y-3 pt-3 border-t border-white/10 pb-safe">
                <a
                  href="https://wa.me/447778324873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 xs:h-12 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-xs xs:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/25 active:scale-[0.98] transition-transform animate-shine-sweep relative overflow-hidden"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+447778324873"
                  className="w-full h-10 xs:h-11 rounded-xl bg-white/5 border border-white/10 text-white/90 hover:text-white text-xs font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Call: +44 7778 324873</span>
                </a>

                <div className="text-[11px] text-white/60 space-y-1 pt-1">
                  <a
                    href="https://maps.app.goo.gl/6j2yLaxnhq2rfpvK7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#D9A441] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
                    <span className="truncate">7 Cumbernauld Rd, Glasgow G31 2SW</span>
                    <ArrowUpRight className="w-3 h-3 text-white/40 shrink-0" />
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2.5 pt-1">
                  <a
                    href="https://www.instagram.com/togethercoffee2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@togethercoffee2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.37a6.34 6.34 0 0 0-6.62 6.32 6.35 6.35 0 0 0 6.35 6.31 6.34 6.34 0 0 0 6.34-6.31V9.75a8.28 8.28 0 0 0 4.98 1.63v-3.45a4.87 4.87 0 0 1-1.8-.24z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61580454590425"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
