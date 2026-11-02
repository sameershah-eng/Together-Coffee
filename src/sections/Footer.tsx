import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, ArrowRight, Heart, Check } from 'lucide-react';
import { HabeshaDivider } from '../components/HabeshaDivider';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A0F0A] text-[#F6EEE3] border-t border-white/10 relative overflow-hidden pb-safe">
      {/* Decorative Habesha border */}
      <HabeshaDivider className="opacity-70 my-0 pt-6" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand Wordmark & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D9A441]/20 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#F6EEE3]">
                Together Coffee
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Coffee, culture & community in Glasgow’s East End. A cosy home for specialty espresso, traditional clay-pot buna ceremonies, and authentic Eritrean & Ethiopian cooking.
            </p>

            <div className="text-xs text-[#D9A441] font-mono">
              EST. 2025 · 7 CUMBERNAULD ROAD, GLASGOW
            </div>

            {/* Social Icons with hover glow */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/togethercoffee2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 hover:shadow-lg hover:shadow-[#D9A441]/20 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@togethercoffee2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 hover:shadow-lg hover:shadow-[#D9A441]/20 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.37a6.34 6.34 0 0 0-6.62 6.32 6.35 6.35 0 0 0 6.35 6.31 6.34 6.34 0 0 0 6.34-6.31V9.75a8.28 8.28 0 0 0 4.98 1.63v-3.45a4.87 4.87 0 0 1-1.8-.24z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580454590425"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D9A441] hover:border-[#D9A441]/40 hover:shadow-lg hover:shadow-[#D9A441]/20 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D9A441] font-semibold block">
              Quick Links
            </span>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-[#D9A441] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('menu')} className="hover:text-[#D9A441] transition-colors">
                  Menu & Order
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ceremony')} className="hover:text-[#D9A441] transition-colors">
                  Buna Ceremony
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-[#D9A441] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-[#D9A441] transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-[#D9A441] transition-colors">
                  Bookings & Catering
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Services */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D9A441] font-semibold block">
              Hours & Services
            </span>
            <div className="text-xs text-white/70 space-y-1.5 font-sans">
              <p>
                <strong className="text-white">Mon – Fri:</strong> 11:00 – 20:00
              </p>
              <p>
                <strong className="text-white">Saturday:</strong> 09:00 – 21:00
              </p>
              <p>
                <strong className="text-white">Sunday:</strong> Closed
              </p>
              <p className="pt-2 text-[#D9A441] font-mono">
                Services: Dine in & Takeaway
              </p>
              <p className="text-[11px] text-white/50">
                Price range: £ (most items £1–£10)
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D9A441] font-semibold block">
              Stay Connected
            </span>
            <p className="text-xs text-white/70 leading-relaxed">
              Sign up for our seasonal Habesha food specials, ceremony workshops, and community events.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're subscribed! See you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-10 h-10 rounded-xl bg-gold-gradient text-[#1A0F0A] flex items-center justify-center shrink-0 hover:brightness-105 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 space-y-1 text-xs text-white/60">
              <a href="tel:+447778324873" className="block hover:text-[#D9A441] transition-colors">
                Phone: +44 7778 324873
              </a>
              <a href="mailto:togethercoffee2025@outlook.com" className="block hover:text-[#D9A441] transition-colors truncate">
                togethercoffee2025@outlook.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 Together Coffee. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E8873A] fill-current" />
            <span>for Glasgow's East End</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
