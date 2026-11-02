import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { useOpeningHours, WEEKLY_SCHEDULE } from '../hooks/useOpeningHours';

export const VisitSection: React.FC = () => {
  const { currentDayIndex, isOpen, statusText } = useOpeningHours();

  return (
    <section id="visit" className="py-20 sm:py-32 bg-[#1A0F0A] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
            FIND US IN GLASGOW EAST END
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,6.5vw,3.6rem)] font-bold text-[#F6EEE3] mt-2 leading-tight">
            Visit Together Coffee
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            A welcoming sanctuary situated on Cumbernauld Road. Join us for a quiet morning brew, an afternoon gathering, or a traditional ceremony.
          </p>
        </div>

        {/* Two-Column Layout: Left Details Card, Right Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Address */}
              <div className="flex items-start gap-3.5 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#D9A441]/10 border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F6EEE3]">
                    Location
                  </h3>
                  <p className="text-sm text-white/75 mt-0.5 leading-relaxed">
                    7 Cumbernauld Road<br />
                    Glasgow G31 2SW<br />
                    United Kingdom
                  </p>
                  <span className="inline-block mt-2 text-xs font-mono text-[#D9A441]">
                    Near Alexandra Park & Dennistoun
                  </span>
                </div>
              </div>

              {/* Live Opening Hours Table */}
              <div className="py-6 border-b border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D9A441]" />
                    <h3 className="font-serif text-base font-bold text-[#F6EEE3]">
                      Opening Hours
                    </h3>
                  </div>
                  <span className={`text-[11px] font-mono font-medium ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {statusText}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {WEEKLY_SCHEDULE.map(sched => {
                    const isToday = sched.dayIndex === currentDayIndex;
                    return (
                      <div
                        key={sched.dayName}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors ${
                          isToday
                            ? 'bg-[#D9A441]/15 text-[#D9A441] font-semibold border border-[#D9A441]/30'
                            : 'text-white/70'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />}
                          {sched.dayName}
                          {isToday && <span className="text-[10px] font-mono opacity-80">(Today)</span>}
                        </span>
                        <span className="font-mono">
                          {sched.isClosed ? 'Closed' : `${sched.openTime} – ${sched.closeTime}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Contact info */}
              <div className="pt-4 space-y-3 text-xs sm:text-sm">
                <a
                  href="tel:+447778324873"
                  className="flex items-center gap-3 text-white/80 hover:text-[#D9A441] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#D9A441] group-hover:scale-110 transition-transform" />
                  <span>+44 7778 324873 (Tap to call)</span>
                </a>

                <a
                  href="mailto:togethercoffee2025@outlook.com"
                  className="flex items-center gap-3 text-white/80 hover:text-[#D9A441] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#D9A441] group-hover:scale-110 transition-transform" />
                  <span className="truncate">togethercoffee2025@outlook.com</span>
                </a>

                <div className="flex items-center gap-2 pt-1 text-xs text-white/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Services: Dine In & Takeaway Available</span>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <a
              href="https://maps.app.goo.gl/6j2yLaxnhq2rfpvK7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/20 active:scale-[0.98] transition-transform"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Right Embedded Interactive Map Card */}
          <div className="lg:col-span-7 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl min-h-[380px] flex flex-col">
            <iframe
              title="Together Coffee Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2238.45564811099!2d-4.2140411!3d55.8672002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888414b4344e7e7%3A0x7d87bc746682701e!2s7%20Cumbernauld%20Rd%2C%20Glasgow%20G31%202SW!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              className="w-full flex-1 min-h-[380px] border-0 filter grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Overlay Badge */}
            <div className="p-3 bg-[#1A0F0A]/90 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>7 Cumbernauld Rd, Glasgow G31 2SW</span>
              <a
                href="https://maps.app.goo.gl/6j2yLaxnhq2rfpvK7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D9A441] hover:underline font-mono"
              >
                Open in App →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
