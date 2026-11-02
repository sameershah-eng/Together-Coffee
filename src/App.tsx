/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { MiniCartBar } from './components/MiniCartBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PrintMenuModal } from './components/PrintMenuModal';

import { Hero } from './sections/Hero';
import { Marquee } from './sections/Marquee';
import { Bestsellers } from './sections/Bestsellers';
import { MenuSection } from './sections/MenuSection';
import { CeremonySection } from './sections/CeremonySection';
import { AboutSection } from './sections/AboutSection';
import { GallerySection } from './sections/GallerySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { SecondaryCtaStrip } from './sections/SecondaryCtaStrip';
import { VisitSection } from './sections/VisitSection';
import { ContactSection, EnquiryType } from './sections/ContactSection';
import { Footer } from './sections/Footer';

import { MenuItem } from './data/menu';

function MainApp() {
  const { totalItems } = useCart();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [contactEnquiryType, setContactEnquiryType] = useState<EnquiryType>('Table Reservation');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCeremony = () => {
    setContactEnquiryType('Coffee Ceremony Booking');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#1A0F0A] text-[#F6EEE3] selection:bg-[#D9A441] selection:text-[#1A0F0A] overflow-x-hidden">
      {/* Full-screen Preloader on initial arrival */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main id="main-content">
        <Hero />
        <Marquee />
        <Bestsellers onSelectItem={setSelectedItem} />
        <MenuSection
          onSelectItem={setSelectedItem}
          onOpenPrintMenu={() => setIsPrintMenuOpen(true)}
        />
        <CeremonySection onBookCeremony={handleBookCeremony} />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <SecondaryCtaStrip />
        <VisitSection />
        <ContactSection initialType={contactEnquiryType} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <MiniCartBar />
      <FloatingWhatsApp />
      <Toast />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <PrintMenuModal
        isOpen={isPrintMenuOpen}
        onClose={() => setIsPrintMenuOpen(false)}
      />

      {/* Back to top button (desktop & mobile when cart is empty) */}
      {showBackToTop && !(totalItems > 0 && window.innerWidth < 640) && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed left-4 sm:left-6 bottom-6 z-40 w-11 h-11 rounded-full bg-white/10 hover:bg-[#D9A441] text-white hover:text-[#1A0F0A] border border-white/10 backdrop-blur-md flex items-center justify-center transition-all shadow-xl active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
