import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  quote: string;
  highlight: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    id: 'r-1',
    name: 'Hana',
    location: 'Dennistoun, Glasgow',
    highlight: 'Authentic Buna Ceremony',
    quote: 'The traditional buna ceremony took me straight back home. The freshly roasted beans, the clay jebena, and the frankincense aroma made a Saturday afternoon with my family unforgettable.',
    rating: 5,
  },
  {
    id: 'r-2',
    name: 'Callum',
    location: 'East End, Glasgow',
    highlight: 'Best Flat White in G31',
    quote: 'Hands down the best flat white on Cumbernauld Road. Incredible espresso roast, friendly team, and the toasted paninis are top notch. This spot has quickly become my daily morning habit.',
    rating: 5,
  },
  {
    id: 'r-3',
    name: 'Selam',
    location: 'Glasgow',
    highlight: 'Unmatched Shiro & Injera',
    quote: 'The Shiro and Veggie Platter are so flavourful and cooked with authentic berbere. The injera is freshly rolled and soft. Such a warm, welcoming atmosphere where you can sit and relax.',
    rating: 5,
  },
  {
    id: 'r-4',
    name: 'Fiona',
    location: 'Merchant City',
    highlight: 'Delicious Iced Matcha & Cakes',
    quote: 'Found Together Coffee through Instagram and had to try their iced matcha and chocolate cake. The space is cosy, the yellow coffee cups are charming, and the staff treat you like a regular from day one.',
    rating: 5,
  },
  {
    id: 'r-5',
    name: 'Yonas',
    location: 'Parkhead, Glasgow',
    highlight: 'True Habesha Hospitality',
    quote: 'Glasgow needed an authentic Habesha café done with this level of care and specialty coffee craftsmanship. The Ful Medames breakfast is hearty and delicious. 10/10 recommend!',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextReview = () => {
    setCurrentIndex(prev => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex];

  return (
    <section
      className="py-20 sm:py-28 bg-[#1A0F0A] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
            COMMUNITY LOVE
          </span>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.2rem)] font-bold text-[#F6EEE3] mt-2">
            Words from our guests
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-gradient-to-br from-[#3B2218]/60 via-[#1A0F0A] to-[#3B2218]/40 rounded-3xl border border-[#D9A441]/30 p-7 sm:p-12 shadow-2xl min-h-[300px] flex flex-col justify-between">
          <Quote className="w-10 h-10 text-[#D9A441]/25 absolute top-6 right-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Stars & Tag */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#D9A441]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
                  {current.highlight}
                </span>
              </div>

              {/* Quote */}
              <p className="font-serif text-lg sm:text-2xl text-[#F6EEE3] leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Author */}
              <div className="pt-2">
                <div className="font-sans font-bold text-base text-[#F6EEE3]">
                  {current.name}
                </div>
                <div className="text-xs font-mono text-white/50">
                  {current.location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls & Indicators */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to review by ${r.name}`}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? 'w-6 bg-[#D9A441]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
