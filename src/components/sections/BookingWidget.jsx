import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Calendar, Users, Search, Loader2, Sparkles, Check, Clock, Plane, ChevronDown } from 'lucide-react';
import { AirportCombobox } from '../ui/AirportCombobox';
import { AppleDatePicker } from '../ui/AppleDatePicker';
import { MagneticButton } from '../ui/MagneticButton';
import { formatCurrency } from '../../lib/utils';
import { useLenis } from '../layout/SmoothScroll';
import { useCenteredPopover } from '../../hooks/useCenteredPopover';

const tripTypes = [
  { id: 'round-trip', label: 'Round Trip' },
  { id: 'one-way', label: 'One Way' },
  { id: 'multi-city', label: 'Private Jet Multi-Leg' },
];

const cabinClasses = [
  { id: 'business', label: 'Business Elite' },
  { id: 'first', label: 'First Class Suite' },
  { id: 'private', label: 'Dedicated Private Jet Charter' },
];

export function BookingWidget({ onSelectFlight }) {
  const [tripType, setTripType] = useState('round-trip');
  const [origin, setOrigin] = useState('DXB');
  const [destination, setDestination] = useState('MLE');
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('first');
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const passengerDropdownRef = useRef(null);

  const { popoverRef: passengerPopoverRef, popoverStyle: passengerPopoverStyle } = useCenteredPopover({
    isOpen: isPassengerDropdownOpen,
    defaultWidth: 320,
    minPadding: 16,
    externalContainerRef: passengerDropdownRef,
  });

  // Close passenger dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (passengerDropdownRef.current && !passengerDropdownRef.current.contains(e.target)) {
        setIsPassengerDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPassengerDropdownOpen) {
        setIsPassengerDropdownOpen(false);
      }
    };
    if (isPassengerDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPassengerDropdownOpen]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { scrollTo } = useLenis() || {};

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      setErrorMessage('Please specify both departure and arrival airports.');
      return;
    }
    if (origin === destination) {
      setErrorMessage('Departure and destination airports cannot be identical.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setSearchResults(null);

    setTimeout(() => {
      setIsLoading(false);
      setSearchResults([
        {
          id: 'flight-1',
          operator: 'SkyVoyage Premier Charter',
          aircraft: 'Bombardier Global 7500',
          tailNumber: 'SV-750B',
          duration: '4h 15m Non-stop',
          timeDepart: '10:30 AM',
          timeArrive: '04:45 PM',
          price: 6450,
          inclusions: ['Private Stateroom', 'Vintage Dom Pérignon', 'Dedicated Cabin Steward'],
        },
        {
          id: 'flight-2',
          operator: 'Executive Wing Alliance',
          aircraft: 'Gulfstream G650ER',
          tailNumber: 'SV-650G',
          duration: '4h 05m Non-stop',
          timeDepart: '02:15 PM',
          timeArrive: '08:20 PM',
          price: 5900,
          inclusions: ['Lie-flat 82" Bed', 'Executive Conference Table', 'Starlink 220Mbps In-flight'],
        },
      ]);
    }, 800);
  };

  const handleSelectResult = (flight) => {
    if (onSelectFlight) {
      onSelectFlight({
        ...flight,
        origin,
        destination,
        departDate,
        returnDate,
        passengers,
        cabinClass,
      });
    }
    // Scroll directly to contact inquiry
    if (scrollTo) {
      scrollTo('#contact');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="booking-widget" className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12">
      <div className="glass-widget rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 bg-white/95 relative shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)]">
        {/* Top Radial Glow Accent inside self-contained boundary */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-sky-200/40 rounded-full blur-3xl" />
        </div>

        {/* Trip Type Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 mb-6 border-b border-slate-200/80 pb-4 overflow-x-auto no-scrollbar">
          {tripTypes.map((tab) => {
            const isActive = tripType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTripType(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 shrink-0 min-h-[44px] flex items-center cursor-pointer ${
                  isActive ? 'text-sky-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTripTab"
                    className="absolute inset-0 rounded-xl bg-sky-50 border border-sky-300/80 shadow-xs"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.id === 'multi-city' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Booking Input Fields Form */}
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Origin Airport */}
            <div className="md:col-span-3">
              <AirportCombobox
                id="origin-airport"
                label="Departure City"
                value={origin}
                onChange={setOrigin}
                placeholder="Origin"
              />
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center pb-1">
              <button
                type="button"
                onClick={handleSwapAirports}
                aria-label="Swap departure and arrival airports"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-600 flex items-center justify-center transition-all duration-300 hover:rotate-180 focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer shadow-xs"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Airport */}
            <div className="md:col-span-3">
              <AirportCombobox
                id="destination-airport"
                label="Destination City"
                value={destination}
                onChange={setDestination}
                placeholder="Arrival"
              />
            </div>

            {/* Departure & Return Dates */}
            <div className="md:col-span-3 grid grid-cols-2 gap-2">
              <AppleDatePicker
                id="depart-date"
                label="Departure"
                value={departDate}
                onChange={(newDate) => {
                  setDepartDate(newDate);
                  if (returnDate && returnDate < newDate) {
                    setReturnDate(newDate);
                  }
                }}
                minDate={new Date().toISOString().split('T')[0]}
                align="center"
              />

              <AppleDatePicker
                id="return-date"
                label={tripType === 'one-way' ? 'Return (N/A)' : 'Return'}
                value={tripType === 'one-way' ? '' : returnDate}
                onChange={setReturnDate}
                minDate={departDate || new Date().toISOString().split('T')[0]}
                disabled={tripType === 'one-way'}
                disabledPlaceholder="One Way"
                align="center"
              />
            </div>

            {/* Passengers & Class Trigger */}
            <div className="md:col-span-2 relative" ref={passengerDropdownRef}>
              <label htmlFor="passengers-btn" className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5 truncate">
                Guests & Cabin
              </label>
              <button
                type="button"
                id="passengers-btn"
                aria-haspopup="dialog"
                aria-expanded={isPassengerDropdownOpen}
                onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                className={`w-full min-h-[48px] px-3 py-2.5 rounded-xl bg-slate-50 border text-left flex items-center justify-between text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs ${
                  isPassengerDropdownOpen
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white text-slate-900'
                    : 'border-slate-200 hover:border-sky-400 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Users className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate font-semibold">{passengers} Guests</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ml-1 ${
                    isPassengerDropdownOpen ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>

              {/* Passengers & Class Popover (Opens to Bottom) */}
              <AnimatePresence>
                {isPassengerDropdownOpen && (
                  <motion.div
                    ref={passengerPopoverRef}
                    style={passengerPopoverStyle}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full mt-2.5 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-5 rounded-[24px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.18)] z-50 select-none"
                  >
                    <div className="mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">Guests Count</span>
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-sm font-semibold text-slate-900">{passengers} Passengers</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => setPassengers(Math.min(16, passengers + 1))}
                            className="w-8 h-8 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-600 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">Cabin Category</span>
                      <div className="space-y-1.5">
                        {cabinClasses.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCabinClass(item.id)}
                            className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center justify-between cursor-pointer transition-colors ${
                              cabinClass === item.id ? 'bg-sky-50 text-sky-800 border border-sky-300' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-semibold">{item.label}</span>
                            {cabinClass === item.id && <Check className="w-3.5 h-3.5 text-sky-600" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPassengerDropdownOpen(false)}
                      className="w-full mt-4 py-2.5 text-xs font-bold rounded-xl bg-sky-600 text-white hover:bg-sky-500 cursor-pointer shadow-xs transition-colors"
                    >
                      Confirm Selection
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 text-xs text-rose-500 flex items-center gap-1.5 font-semibold" role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant VIP Availability</span>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-slate-500">Fixed Hourly Rates &amp; Zero Repositioning Surcharges</span>
            </div>

            <MagneticButton
              type="submit"
              variant="gold"
              disabled={isLoading}
              className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold shadow-[0_10px_25px_rgba(245,158,11,0.35)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  <span>Scanning Global Hangars...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-1" />
                  <span>Search Flights</span>
                </>
              )}
            </MagneticButton>
          </div>
        </form>

        {/* Mock Animated Results Preview Drawer */}
        <AnimatePresence>
          {searchResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 pt-6 border-t border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold">
                    2 Private Jets Cleared for Flight ({origin} → {destination})
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Quotes Guaranteed for 24h</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((flight) => (
                  <div
                    key={flight.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200 hover:border-sky-400 transition-colors flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">{flight.operator}</span>
                        <span className="text-xs font-mono text-slate-500 font-semibold">{flight.tailNumber}</span>
                      </div>
                      <div className="font-display font-bold text-lg text-slate-900 mb-1">{flight.aircraft}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-mono mb-3">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          {flight.duration}
                        </span>
                        <span>•</span>
                        <span>{flight.timeDepart} – {flight.timeArrive}</span>
                      </div>
                      <ul className="space-y-1 mb-4 text-xs text-slate-600">
                        {flight.inclusions.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Charter Quote</div>
                        <div className="text-xl font-display font-extrabold text-slate-900">{formatCurrency(flight.price)}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectResult(flight)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-bold hover:shadow-[0_0_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                      >
                        Select &amp; Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
