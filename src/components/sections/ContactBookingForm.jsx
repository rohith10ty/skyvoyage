import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';
import { airports } from '../../data/airports';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please provide your full legal name.'),
  email: z.string().email('Please enter a valid executive email address.'),
  phone: z.string().min(7, 'Please provide a direct contact or mobile number.'),
  destination: z.string().min(2, 'Please select or enter your desired destination.'),
  travelDate: z.string().min(1, 'Please specify your anticipated departure date.'),
  passengers: z.string().min(1, 'Please select number of guests.'),
  message: z.string().optional(),
});

export function ContactBookingForm({ prefillDestination = '', prefillPackage = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      travelDate: '',
      passengers: '2',
      message: '',
    },
  });

  useEffect(() => {
    if (prefillDestination) {
      setValue('destination', prefillDestination);
    }
  }, [prefillDestination, setValue]);

  useEffect(() => {
    if (prefillPackage) {
      setValue('message', `Inquiry concerning: ${prefillPackage}`);
    }
  }, [prefillPackage, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Dynamic import confetti
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284C7', '#00B4D8', '#F59E0B', '#10B981'],
      });
    } catch (e) {
      // Graceful fallback
    }
  };

  const handleResetForm = () => {
    reset();
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="VIP DESK &amp; RESERVATIONS"
          title="Commission Your"
          highlight="Bespoke Voyage"
          subtitle="Direct flight coordination with our private aviation desk. Within 90 seconds, a dedicated flight concierge is assigned to your itinerary."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Concierge & Global Hangars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Private Terminal Lounges</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Enjoy zero-wait tarmac clearance at our executive FBO suites across major global finance and leisure centers.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Dedicated Flight Desk (24/7)
                    </span>
                    <a href="tel:+18008927597" className="text-base font-display font-bold text-slate-900 hover:text-sky-600 transition-colors">
                      +1 (800) 892-SKYS (7597)
                    </a>
                    <span className="text-xs text-emerald-600 font-medium block mt-0.5">• Satellite phone enabled</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Charter Inquiries &amp; Manifest
                    </span>
                    <a href="mailto:concierge@skyvoyage.luxury" className="text-base font-display font-bold text-slate-900 hover:text-sky-600 transition-colors">
                      concierge@skyvoyage.luxury
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Executive Aviation Centers
                    </span>
                    <span className="text-sm text-slate-800 block font-semibold">
                      Geneva (GVA) • Dubai (DWC) • Teterboro (TEB)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Guaranteed Dispatch
                    </span>
                    <span className="text-sm text-slate-800 block font-semibold">
                      Wheels-up readiness in as little as 2 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-sky-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Wyvern Wingman</span>
                </span>
                <span>•</span>
                <span className="text-amber-600 font-bold">IS-BAO Stage 3</span>
                <span>•</span>
                <span>NBAA Member</span>
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form + Zod */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 px-4 text-center flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-6 shadow-md">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold mb-2">
                      RESERVATION DOSSIER LOGGED
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3">
                      Flight Operations Notified
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed mb-8">
                      Thank you. Your bespoke inquiry has been routed to our Senior Flight Operations Desk. A tailored flight plan and charter proposal will arrive within 15 minutes.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Lord Julian Vance"
                          {...register('fullName')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-500 mt-1 font-sans">{errors.fullName.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Direct Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="vance@familyoffice.com"
                          {...register('email')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400"
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-500 mt-1 font-sans">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Phone / Mobile *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          {...register('phone')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400"
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-500 mt-1 font-sans">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Destination */}
                      <div>
                        <label htmlFor="destination" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Desired Destination *
                        </label>
                        <input
                          id="destination"
                          type="text"
                          placeholder="e.g. Maldives, Paris, Dubai"
                          {...register('destination')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400"
                        />
                        {errors.destination && (
                          <p className="text-xs text-rose-500 mt-1 font-sans">{errors.destination.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Travel Date */}
                      <div>
                        <label htmlFor="travelDate" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Anticipated Date *
                        </label>
                        <input
                          id="travelDate"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          {...register('travelDate')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 [color-scheme:light]"
                        />
                        {errors.travelDate && (
                          <p className="text-xs text-rose-500 mt-1 font-sans">{errors.travelDate.message}</p>
                        )}
                      </div>

                      {/* Guests */}
                      <div>
                        <label htmlFor="passengers" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                          Number of Guests *
                        </label>
                        <select
                          id="passengers"
                          {...register('passengers')}
                          className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 [color-scheme:light]"
                        >
                          <option value="1">1 Passenger (Solo Executive)</option>
                          <option value="2">2 Passengers (Couple / Duo)</option>
                          <option value="4">4 Passengers (Family / Core Team)</option>
                          <option value="8">8 Passengers (Midsize Jet Manifest)</option>
                          <option value="12">12+ Passengers (Large Group / Sovereign Charter)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message / Special Requests */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-1.5">
                        Specific Aircraft or Itinerary Requirements (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="e.g. Lie-flat master bedroom preferred, dietary restrictions, pet onboard, helicopter transfer required..."
                        {...register('message')}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-slate-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-[50px] rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-display font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Routing to Flight Operations...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Dispatch Booking Request</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 pt-1 text-center font-medium">
                      <span>🔒 256-bit Encrypted Private Manifest</span>
                      <span>•</span>
                      <span>Zero Spam Guarantee</span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
