import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { IMAGES } from '../data/images';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    src: IMAGES.ceremonyBuna,
    title: 'The Buna Ceremony',
    subtitle: 'Fresh popcorn & clay pot brewing',
  },
  {
    id: 'g-2',
    src: IMAGES.veggiePlatter,
    title: 'Injera Feast Platter',
    subtitle: 'Colourful slow-cooked vegan stews',
  },
  {
    id: 'g-3',
    src: IMAGES.latteArtTable,
    title: 'Specialty Latte Art',
    subtitle: 'Crafted daily on Cumbernauld Road',
  },
  {
    id: 'g-4',
    src: IMAGES.interiorSeating,
    title: 'Cosy Velvet Seating',
    subtitle: 'Traditional Habesha wall baskets',
  },
  {
    id: 'g-5',
    src: IMAGES.fulMedames,
    title: 'Traditional Ful Medames',
    subtitle: 'With avocado, boiled eggs & fresh bread',
  },
  {
    id: 'g-6',
    src: IMAGES.icedDrinksMuffin,
    title: 'Iced Drinks & Treats',
    subtitle: 'Signature iced matcha & bakery treats',
  },
  {
    id: 'g-7',
    src: IMAGES.ceremonyJebena,
    title: 'Clay Jebena Pour',
    subtitle: 'The second round of buna',
  },
  {
    id: 'g-8',
    src: IMAGES.chocolateCake,
    title: 'Decadent Chocolate Cake',
    subtitle: 'Fresh bakery selection',
  },
];

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = '';
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_PHOTOS.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-[#1A0F0A] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              MOMENTS & FLAVOURS
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,6.5vw,3.6rem)] font-bold text-[#F6EEE3] mt-2 leading-tight">
              Life at Together Coffee
            </h2>
          </div>

          <a
            href="https://www.instagram.com/togethercoffee2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D9A441]/40 text-xs sm:text-sm font-semibold text-[#F6EEE3] hover:text-[#D9A441] transition-all self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-[#E8873A]" />
            <span>Follow @togethercoffee2025 (1,300+ friends)</span>
          </a>
        </div>

        {/* 2-column mobile, 3-4 column desktop Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -4 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-[#3B2218] border border-white/10 shadow-lg"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover warm-filter group-hover:scale-106 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-5" />
              
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9A441] block">
                  {photo.subtitle}
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-white">
                  {photo.title}
                </h4>
              </div>

              {/* Tap to zoom hint */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Swipe/Keyboard Support */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={activePhotoIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[85vh] z-10 flex flex-col items-center"
            >
              <img
                src={GALLERY_PHOTOS[activePhotoIndex].src}
                alt={GALLERY_PHOTOS[activePhotoIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              />
              <div className="text-center mt-3 text-white">
                <h4 className="font-serif text-lg font-bold">
                  {GALLERY_PHOTOS[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-[#D9A441] font-mono">
                  {GALLERY_PHOTOS[activePhotoIndex].subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
