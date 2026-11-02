import React from 'react';

interface HabeshaDividerProps {
  className?: string;
  light?: boolean;
}

export const HabeshaDivider: React.FC<HabeshaDividerProps> = ({ className = '', light = false }) => {
  const strokeColor = light ? '#D9A441' : '#D9A441';
  const fillColor = light ? 'rgba(217, 164, 65, 0.15)' : 'rgba(217, 164, 65, 0.2)';

  return (
    <div className={`flex items-center justify-center w-full my-6 overflow-hidden select-none pointer-events-none ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D9A441]/40 to-[#D9A441]" />
      <div className="mx-4 flex items-center gap-1.5 opacity-90">
        <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Traditional Habesha geometric diamond/cross weave */}
          <path d="M20 1L26 8L20 15L14 8L20 1Z" fill={fillColor} stroke={strokeColor} strokeWidth="1" />
          <path d="M8 4L13 8L8 12L3 8L8 4Z" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
          <path d="M32 4L37 8L32 12L27 8L32 4Z" fill="none" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
          <circle cx="20" cy="8" r="1.5" fill={strokeColor} />
        </svg>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D9A441]/40 to-[#D9A441]" />
    </div>
  );
};
