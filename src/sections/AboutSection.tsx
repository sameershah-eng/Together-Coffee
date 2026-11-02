import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Coffee, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/images';
import { HabeshaDivider } from '../components/HabeshaDivider';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '1,300+', label: 'Instagram Community', icon: Users },
    { value: '3', label: 'Rounds per Buna Ceremony', icon: Coffee },
    { value: '100%', label: 'Made Fresh Daily', icon: Heart },
    { value: '6 Days', label: 'A Week of Good Vibes', icon: Sparkles },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-[#1A0F0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Two-Column Grid: Left Text, Right Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              OUR GLASGOW ROOTS · EST. 2025
            </span>

            <h2 className="font-serif text-[clamp(2.2rem,6.5vw,3.6rem)] font-bold text-[#F6EEE3] leading-tight">
              Bringing East African hospitality to Cumbernauld Road
            </h2>

            <div className="space-y-4 text-white/75 text-base sm:text-lg leading-relaxed font-sans">
              <p>
                Founded in 2025 in Glasgow’s East End, Together Coffee was created out of a desire for a neighbourhood sanctuary where specialty espresso craft meets the warm, slow culinary traditions of Eritrea and Ethiopia.
              </p>
              <p>
                Whether you drop in on your morning commute for a velvety flat white and an all-butter croissant, gather around a shared vegetarian injera feast with friends, or sit down for a traditional clay-pot buna ceremony, our doors are open with genuine warmth.
              </p>
              <p>
                Every dish is prepared from scratch with authentic spices, from vibrant berbere-simmered shiro and slow-braised beef tibs to freshly mashed ful medames.
              </p>
            </div>

            {/* Quote block */}
            <div className="p-5 rounded-2xl bg-[#3B2218]/40 border border-[#D9A441]/30">
              <p className="font-serif italic text-base sm:text-lg text-[#F6EEE3]">
                "Coffee in our culture is an invitation to belong. We built this café so everyone who walks through our door feels at home."
              </p>
              <span className="block mt-2 text-xs font-mono uppercase tracking-wider text-[#D9A441]">
                — Together Coffee Family
              </span>
            </div>
          </div>

          {/* Right Collage Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image: Green Velvet Interior & Wall Hangings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#3B2218]"
              >
                <img
                  src={IMAGES.interiorSeating}
                  alt="Together Coffee Glasgow cosy interior seating with traditional woven baskets"
                  className="w-full h-full object-cover warm-filter"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-sm font-serif text-[#F6EEE3]">
                  A cosy neighbourhood corner designed for slow coffee and great conversations.
                </div>
              </motion.div>

              {/* Offset Image: Coffee counter with yellow cups */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D9A441]/50 bg-[#1A0F0A]"
              >
                <img
                  src={IMAGES.espressoMachine}
                  alt="Together Coffee commercial espresso bar with colourful cups"
                  className="w-full h-full object-cover warm-filter"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Animated Proof Numbers */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center sm:text-left space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 text-[#D9A441]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-gold-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60 font-sans">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <HabeshaDivider className="mt-16" />
      </div>
    </section>
  );
};
