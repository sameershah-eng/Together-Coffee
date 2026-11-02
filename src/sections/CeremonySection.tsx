import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { IMAGES } from '../data/images';
import { HabeshaDivider } from '../components/HabeshaDivider';

interface CeremonySectionProps {
  onBookCeremony: () => void;
}

export const CeremonySection: React.FC<CeremonySectionProps> = ({ onBookCeremony }) => {
  const rounds = [
    {
      num: '01',
      name: 'Abol',
      title: 'The First Round',
      meaning: 'Contemplation & Awakening',
      desc: 'The strongest and boldest cup, poured slowly from the height of the clay jebena. It commands presence and welcomes guests into the circle.',
    },
    {
      num: '02',
      name: 'Tona',
      title: 'The Second Round',
      meaning: 'Conversation & Fellowship',
      desc: 'Fresh water is added to the grounds and re-boiled. The coffee turns smoother and mellow, opening up heartfelt stories and shared laughter.',
    },
    {
      num: '03',
      name: 'Baraka',
      title: 'The Third Round',
      meaning: 'The Blessing of Peace',
      desc: 'A final, delicate pour that seals friendship and bestows blessings upon the home. Served with fresh popcorn and sweet Habesha biscuits.',
    },
  ];

  return (
    <section id="ceremony" className="py-20 sm:py-32 bg-gradient-to-b from-[#1A0F0A] via-[#3B2218]/40 to-[#1A0F0A] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D9A441]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <HabeshaDivider className="mb-12" />

        {/* Split Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Overlapping Authentic Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image: Clay Jebena Pot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#D9A441]/30 bg-[#3B2218]"
              >
                <img
                  src={IMAGES.ceremonyJebena}
                  alt="Authentic clay Jebena coffee pot pouring buna"
                  className="w-full h-full object-cover warm-filter"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 text-xs font-mono uppercase tracking-widest text-[#D9A441] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  Clay Jebena Pot Brewing
                </div>
              </motion.div>

              {/* Offset Secondary Image: Popcorn & Finjal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden sm:block absolute -bottom-8 -right-4 w-48 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D9A441]/50 bg-[#1A0F0A]"
              >
                <img
                  src={IMAGES.ceremonyPopcorn}
                  alt="Traditional coffee ceremony with woven basket of popcorn"
                  className="w-full h-full object-cover warm-filter"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Right: Persuasive Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-xs font-mono uppercase tracking-widest text-[#D9A441]">
              <Flame className="w-3.5 h-3.5 text-[#E8873A]" />
              <span>THE BUNA RITUAL</span>
            </div>

            <h2 className="font-serif text-[clamp(2.2rem,6.5vw,3.6rem)] font-bold text-[#F6EEE3] leading-tight">
              An ancient ritual of friendship & hospitality
            </h2>

            <div className="space-y-4 text-white/75 text-base sm:text-lg leading-relaxed font-sans">
              <p>
                In Eritrea and Ethiopia, coffee is never rushed. It is a slow, sacred ceremony called <span className="text-[#D9A441] font-semibold">Buna</span>—a centuries-old ritual where raw green beans are washed, roasted over fragrant coals, ground by hand, and brewed three times in a traditional clay <span className="italic">jebena</span>.
              </p>
              <p>
                As frankincense incense dances through the room and fresh popcorn is shared, conversation flows freely between neighbours, travellers, and old friends. That is why we named our space <strong className="text-[#F6EEE3] font-semibold">Together Coffee</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onBookCeremony}
                className="h-13 px-7 rounded-2xl bg-gold-gradient text-[#1A0F0A] font-semibold text-sm sm:text-base inline-flex items-center gap-2.5 shadow-lg shadow-[#D9A441]/20 hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Book a ceremony for your group</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Three Animated Round Cards */}
        <div className="mt-20 sm:mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9A441]">
              THE THREE ROUNDS OF BUNA
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6EEE3] mt-1">
              From Awakening to Blessing
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rounds.map((round, idx) => (
              <motion.div
                key={round.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/5 rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#D9A441]/50 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-1 rounded-md border border-[#D9A441]/25">
                      Round {round.num}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#D9A441]/40 group-hover:text-[#D9A441] transition-colors" />
                  </div>

                  <h4 className="font-serif text-2xl font-bold text-[#F6EEE3]">
                    {round.name}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#D9A441] mt-0.5 mb-3">
                    {round.meaning}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {round.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/40 italic">
                  Traditional East African custom
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
