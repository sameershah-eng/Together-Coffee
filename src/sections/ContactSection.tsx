import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, Coffee, Utensils, MessageSquare, ArrowRight, ArrowLeft, Check, Loader2, Phone, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { IMAGES } from '../data/images';

export type EnquiryType = 'Table Reservation' | 'Coffee Ceremony Booking' | 'Catering / Large Order' | 'General Enquiry';

interface FormData {
  enquiryType: EnquiryType;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  budgetRange: string;
  message: string;
  consent: boolean;
}

const initialFormData: FormData = {
  enquiryType: 'Table Reservation',
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '14:00',
  guests: 2,
  budgetRange: '£100–£250',
  message: '',
  consent: true,
};

export const ContactSection: React.FC<{ initialType?: EnquiryType }> = ({ initialType = 'Table Reservation' }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    enquiryType: initialType,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // UK Phone format validation (+44... or 07...)
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(\+44|0)[1-9]\d{8,9}$/.test(cleaned);
  };

  // Date validation (not in past, not Sunday)
  const validateDate = (dateStr: string) => {
    if (!dateStr) return 'Please select a date.';
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      return 'Date cannot be in the past.';
    }
    if (selected.getDay() === 0) {
      return 'We are closed on Sundays. Please choose Monday to Saturday.';
    }
    return '';
  };

  const validateStep2 = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      errs.phone = 'Please provide a valid UK phone number (e.g. 07778 324873).';
    }

    if (formData.enquiryType === 'Table Reservation' || formData.enquiryType === 'Coffee Ceremony Booking') {
      const dateErr = validateDate(formData.date);
      if (dateErr) errs.date = dateErr;
    }

    if (!formData.consent) {
      errs.consent = 'Please confirm agreement to be contacted regarding this enquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * INTEGRATION NOTE FOR CLIENT:
   * To wire up live email delivery to togethercoffee2025@outlook.com:
   * Option A (Formspree):
   *   await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } });
   * Option B (EmailJS):
   *   emailjs.send("service_id", "template_id", formData, "public_key");
   * Option C (Web3Forms):
   *   await fetch("https://api.web3forms.com/submit", { method: "POST", body: JSON.stringify({ access_key: "YOUR_KEY", ...formData }) });
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const getWhatsAppEnquiryUrl = () => {
    const firstName = formData.fullName.split(' ')[0] || 'Friend';
    const lines = [
      `Hi Together Coffee! My name is ${firstName}.`,
      `I'd like to make an enquiry:`,
      `• Type: ${formData.enquiryType}`,
      formData.date ? `• Preferred Date: ${formData.date} at ${formData.time}` : '',
      formData.guests ? `• Guests: ${formData.guests}` : '',
      formData.enquiryType === 'Catering / Large Order' ? `• Budget Range: ${formData.budgetRange}` : '',
      formData.message ? `• Notes: ${formData.message}` : '',
      `• Contact: ${formData.phone} / ${formData.email}`,
    ].filter(Boolean);

    return `https://wa.me/447778324873?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden bg-[#1A0F0A]">
      {/* Background Atmosphere Image with Dark Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={IMAGES.espressoMachine}
          alt="Together Coffee bar atmosphere"
          className="w-full h-full object-cover filter blur-md brightness-[0.22] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/80 to-[#1A0F0A]" />
        <div className="absolute inset-0 bg-radial-at-c from-[#D9A441]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Persuasive Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9A441] font-semibold">
              BOOK · CELEBRATE · GATHER
            </span>

            <h2 className="font-serif text-[clamp(2.2rem,6.5vw,3.6rem)] font-bold text-[#F6EEE3] leading-tight">
              Planning a catch-up, celebration, or{' '}
              <span className="text-gold-gradient italic font-normal">
                coffee ceremony
              </span>
              ?
            </h2>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              Tell us what you have in mind and we'll get back to you the same day. Whether it's an intimate buna ritual or private catering, we'd love to host you.
            </p>

            {/* Three Trust Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center shrink-0 border border-[#D9A441]/30">
                  <Users className="w-4 h-4" />
                </div>
                <span>Group bookings and celebratory tables welcome</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center shrink-0 border border-[#D9A441]/30">
                  <Coffee className="w-4 h-4" />
                </div>
                <span>Private buna coffee ceremonies with fresh popcorn</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center shrink-0 border border-[#D9A441]/30">
                  <Utensils className="w-4 h-4" />
                </div>
                <span>Authentic Habesha catering for Glasgow offices & events</span>
              </div>
            </div>

            {/* Quick direct contact row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
              <a
                href="https://wa.me/447778324873"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+447778324873"
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Call +44 7778 324873</span>
              </a>
              <a
                href="mailto:togethercoffee2025@outlook.com"
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E8873A]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2-Step Frosted Glass Form Card */}
          <div className="lg:col-span-7 bg-[#1A0F0A]/90 backdrop-blur-xl rounded-3xl border border-[#D9A441]/40 p-6 sm:p-10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6EEE3]">
                      Thanks, {formData.fullName.split(' ')[0]}!
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base mt-2 max-w-md mx-auto">
                      We've received your <strong className="text-[#D9A441]">{formData.enquiryType}</strong> enquiry. Our team will review the details and respond to you the same day.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-white/5 rounded-2xl p-4 text-left text-xs space-y-1.5 max-w-md mx-auto border border-white/10">
                    <div className="text-white/50 font-mono uppercase tracking-wider text-[10px]">
                      Enquiry Summary
                    </div>
                    <div className="text-white/90"><strong>Type:</strong> {formData.enquiryType}</div>
                    {formData.date && <div className="text-white/90"><strong>Date:</strong> {formData.date} at {formData.time} ({formData.guests} guests)</div>}
                    <div className="text-white/90"><strong>Phone:</strong> {formData.phone}</div>
                    <div className="text-white/90"><strong>Email:</strong> {formData.email}</div>
                  </div>

                  {/* Also Send on WhatsApp Button */}
                  <div className="space-y-3 max-w-md mx-auto">
                    <a
                      href={getWhatsAppEnquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Also send details on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-white/50 hover:text-[#D9A441] underline underline-offset-4"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Form State (Step 1 or 2) */
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#D9A441] font-bold">
                        Step {step} of 2
                      </span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/70">
                        {step === 1 ? 'Select enquiry type' : 'Provide your details'}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-[#D9A441]' : 'bg-white/20'}`} />
                      <span className={`w-8 h-1 rounded-full ${step === 2 ? 'bg-[#D9A441]' : 'bg-white/20'}`} />
                    </div>
                  </div>

                  {/* STEP 1: Select Enquiry Type */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      className="space-y-4"
                    >
                      <p className="text-sm font-medium text-white/80">
                        How can Together Coffee best assist you today?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            type: 'Table Reservation' as EnquiryType,
                            desc: 'Reserve a table for coffee, lunch or brunch',
                            icon: Users,
                          },
                          {
                            type: 'Coffee Ceremony Booking' as EnquiryType,
                            desc: 'Experience a traditional 3-round buna ritual',
                            icon: Coffee,
                          },
                          {
                            type: 'Catering / Large Order' as EnquiryType,
                            desc: 'Authentic injera platters for events & offices',
                            icon: Utensils,
                          },
                          {
                            type: 'General Enquiry' as EnquiryType,
                            desc: 'Questions about our menu, beans or hours',
                            icon: MessageSquare,
                          },
                        ].map(item => {
                          const Icon = item.icon;
                          const isSelected = formData.enquiryType === item.type;
                          return (
                            <button
                              key={item.type}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, enquiryType: item.type }))}
                              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[105px] ${
                                isSelected
                                  ? 'border-[#D9A441] bg-[#D9A441]/15 text-[#F6EEE3] shadow-md shadow-[#D9A441]/10'
                                  : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full mb-2">
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#D9A441]' : 'text-white/40'}`} />
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-[#D9A441] text-[#1A0F0A] flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className="font-serif text-base font-semibold block leading-tight">
                                  {item.type}
                                </span>
                                <span className="text-[11px] text-white/50 block mt-1">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="h-12 px-6 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#D9A441]/20 active:scale-95 transition-transform"
                        >
                          <span>Continue to details</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Adapted Details */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-4"
                    >
                      {/* Full Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Hana Tesfay"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3.5 text-sm text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441]"
                          />
                          {errors.fullName && (
                            <span className="text-[11px] text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fullName}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                            UK Phone Number *
                          </label>
                          <input
                            type="tel"
                            inputMode="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="07778 324873"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3.5 text-sm text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441]"
                          />
                          {errors.phone && (
                            <span className="text-[11px] text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3.5 text-sm text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441]"
                        />
                        {errors.email && (
                          <span className="text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Date & Time if Reservation or Ceremony */}
                      {(formData.enquiryType === 'Table Reservation' || formData.enquiryType === 'Coffee Ceremony Booking') && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1 sm:col-span-1">
                            <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                              Date *
                            </label>
                            <input
                              type="date"
                              value={formData.date}
                              onChange={e => setFormData({ ...formData, date: e.target.value })}
                              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3 text-xs sm:text-sm text-[#F6EEE3] focus:outline-none focus:border-[#D9A441]"
                            />
                            {errors.date && (
                              <span className="text-[10px] text-red-400 block">{errors.date}</span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                              Preferred Time
                            </label>
                            <select
                              value={formData.time}
                              onChange={e => setFormData({ ...formData, time: e.target.value })}
                              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3 text-xs sm:text-sm text-[#F6EEE3] focus:outline-none focus:border-[#D9A441]"
                            >
                              <option value="11:30" className="bg-[#1A0F0A]">11:30 (Morning)</option>
                              <option value="13:00" className="bg-[#1A0F0A]">13:00 (Lunch)</option>
                              <option value="15:00" className="bg-[#1A0F0A]">15:00 (Afternoon Buna)</option>
                              <option value="17:00" className="bg-[#1A0F0A]">17:00 (Early Evening)</option>
                              <option value="18:30" className="bg-[#1A0F0A]">18:30 (Dinner)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                              Guests
                            </label>
                            <div className="flex items-center h-12 bg-white/5 border border-white/10 rounded-xl px-2 justify-between">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                                className="w-8 h-8 rounded text-white/70 hover:text-white"
                              >
                                -
                              </button>
                              <span className="font-mono text-sm font-semibold">{formData.guests}</span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, guests: Math.min(30, formData.guests + 1) })}
                                className="w-8 h-8 rounded text-white/70 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Catering budget range */}
                      {formData.enquiryType === 'Catering / Large Order' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                              Event Date
                            </label>
                            <input
                              type="date"
                              value={formData.date}
                              onChange={e => setFormData({ ...formData, date: e.target.value })}
                              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3 text-xs sm:text-sm text-[#F6EEE3] focus:outline-none focus:border-[#D9A441]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                              Budget Range
                            </label>
                            <select
                              value={formData.budgetRange}
                              onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-3 text-xs sm:text-sm text-[#F6EEE3] focus:outline-none focus:border-[#D9A441]"
                            >
                              <option value="£50–£100" className="bg-[#1A0F0A]">£50 – £100</option>
                              <option value="£100–£250" className="bg-[#1A0F0A]">£100 – £250</option>
                              <option value="£250–£500" className="bg-[#1A0F0A]">£250 – £500</option>
                              <option value="£500+" className="bg-[#1A0F0A]">£500+</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Message textarea with character counter */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-white/60 font-mono">
                          <label>Message / Dietary notes</label>
                          <span>{formData.message.length}/500</span>
                        </div>
                        <textarea
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          maxLength={500}
                          rows={3}
                          placeholder="Tell us about special requests, dietary restrictions, or celebration notes..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-[#F6EEE3] placeholder:text-white/30 focus:outline-none focus:border-[#D9A441] resize-none"
                        />
                      </div>

                      {/* Consent checkbox */}
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/70">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={e => setFormData({ ...formData, consent: e.target.checked })}
                            className="mt-0.5 w-4 h-4 rounded text-[#D9A441] border-white/20 focus:ring-0 bg-white/10"
                          />
                          <span>
                            I agree to be contacted by Together Coffee via phone or email regarding this enquiry.
                          </span>
                        </label>
                        {errors.consent && (
                          <span className="text-[11px] text-red-400 block mt-1">{errors.consent}</span>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="pt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="h-12 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 h-12 rounded-xl bg-gold-gradient text-[#1A0F0A] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D9A441]/20 active:scale-[0.98] transition-transform disabled:opacity-75"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending Enquiry...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Enquiry</span>
                              <Check className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
