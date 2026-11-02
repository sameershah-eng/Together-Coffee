import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Central gold dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D9A441] pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#D9A441]/80 pointer-events-none z-[9998]"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? 'rgba(217, 164, 65, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      />
    </>
  );
};
