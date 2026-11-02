import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1900; // ~1.9s duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 400);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onComplete, 300);
  };

  const brandLetters = "Together Coffee".split("");

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A0F0A] text-[#F6EEE3] px-6 select-none"
        >
          {/* Subtle warm glow background */}
          <div className="absolute w-72 h-72 rounded-full bg-[#D9A441]/10 blur-3xl pointer-events-none" />

          {/* Animated Jebena Pot & Steam */}
          <div className="relative mb-8 flex flex-col items-center">
            {/* Animated steam lines */}
            <div className="flex gap-2 mb-2 h-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-4, -18],
                    opacity: [0, 0.8, 0],
                    scaleX: [1, 1.4],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: 'easeOut',
                  }}
                  className="w-1 h-5 rounded-full bg-gradient-to-t from-[#D9A441] to-transparent"
                />
              ))}
            </div>

            {/* Jebena Coffee Pot SVG Silhouette */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#D9A441]"
            >
              {/* Jebena Neck & Spout */}
              <motion.path
                d="M32 14V6M32 6C30 6 29 4 32 3C35 4 34 6 32 6ZM26 18L32 14L38 18M38 18V28M26 18V28"
                stroke="#D9A441"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              {/* Curved Pot Body */}
              <motion.path
                d="M20 32C16 38 17 48 24 54C28 57 36 57 40 54C47 48 48 38 44 32C42 29 38 28 32 28C26 28 22 29 20 32Z"
                stroke="#D9A441"
                strokeWidth="2.5"
                fill="rgba(217, 164, 65, 0.08)"
                initial={{ pathLength: 0, scale: 0.95 }}
                animate={{ pathLength: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Handle */}
              <motion.path
                d="M41 22C49 24 53 34 44 42"
                stroke="#D9A441"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
              {/* Ring Base */}
              <motion.ellipse
                cx="32"
                cy="58"
                rx="10"
                ry="3"
                stroke="#D9A441"
                strokeWidth="1.8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </svg>
          </div>

          {/* Wordmark Letter-by-Letter Reveal */}
          <div className="flex items-center space-x-[2px] font-serif text-2xl sm:text-3xl tracking-wider text-[#F6EEE3] mb-3">
            {brandLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.045,
                  ease: 'easeOut',
                }}
                className={char === " " ? "w-2" : ""}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D9A441] mb-8 font-sans font-medium"
          >
            GLASGOW EAST END · EST. 2025
          </motion.p>

          {/* Gold Progress Bar */}
          <div className="w-48 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#E8873A] via-[#D9A441] to-[#F2C76E]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Skip button for rapid accessibility */}
          <button
            onClick={handleSkip}
            className="mt-8 text-xs text-white/40 hover:text-[#D9A441] transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-[#D9A441]/40"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
