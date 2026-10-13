import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar, ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCenteredPopover } from '../../hooks/useCenteredPopover';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Formats YYYY-MM-DD into "20 Oct 2026"
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    const m = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${m} ${year}`;
  } catch {
    return dateStr;
  }
}

// Formats YYYY-MM-DD into clean "20 Oct" to fit elegantly inside input buttons
export function formatCompactDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    const m = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${m}`;
  } catch {
    return dateStr;
  }
}

export function AppleDatePicker({
  id,
  label,
  value,
  onChange,
  minDate,
  disabled = false,
  disabledPlaceholder = 'N/A',
  placeholder = 'Select date',
  align = 'center', // 'center' | 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const containerRef = useRef(null);

  const { popoverRef, popoverStyle } = useCenteredPopover({
    isOpen,
    defaultWidth: 335,
    minPadding: 16,
    externalContainerRef: containerRef,
  });

  // Parse current value or fallback to today
  const parsedDate = useMemo(() => {
    if (value) {
      const [y, m, d] = value.split('-').map(Number);
      if (y && m && d) return new Date(y, m - 1, d);
    }
    return new Date();
  }, [value]);

  const [viewYear, setViewYear] = useState(() => parsedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => parsedDate.getMonth());
  const [yearPageStart, setYearPageStart] = useState(() => parsedDate.getFullYear());

  // Parse minimum date boundaries
  const { minYear, minMonth, minDay } = useMemo(() => {
    if (!minDate) {
      const today = new Date();
      return {
        minYear: today.getFullYear(),
        minMonth: today.getMonth(),
        minDay: today.getDate()
      };
    }
    const [y, m, d] = minDate.split('-').map(Number);
    return { minYear: y, minMonth: m - 1, minDay: d };
  }, [minDate]);

  // Sync view when opened or when value changes
  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split('-').map(Number);
      if (y && m && d) {
        setViewYear(y);
        setViewMonth(m - 1);
        setYearPageStart(y);
      }
    }
  }, [value, isOpen]);

  // Reset to days view mode on close
  useEffect(() => {
    if (!isOpen) {
      setViewMode('days');
    }
  }, [isOpen]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Calendar math
  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay();
  }, [viewYear, viewMonth]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDayDisabled = (day) => {
    if (!minDate) return false;
    const minDateTime = new Date(minYear, minMonth, minDay).setHours(0, 0, 0, 0);
    const dayTime = new Date(viewYear, viewMonth, day).setHours(0, 0, 0, 0);
    return dayTime < minDateTime;
  };

  const isDaySelected = (day) => {
    if (!value) return false;
    const [y, m, d] = value.split('-').map(Number);
    return y === viewYear && m - 1 === viewMonth && d === day;
  };

  const isDayToday = (day) => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const handleSelectDay = (day) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    if (!isDayDisabled(today.getDate())) {
      onChange?.(dateStr);
      setViewYear(today.getFullYear());
      setViewMonth(today.getMonth());
      setViewMode('days');
      setIsOpen(false);
    }
  };

  const yearsList = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => yearPageStart + i);
  }, [yearPageStart]);

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5 truncate"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`w-full min-h-[48px] px-2.5 sm:px-3 py-2.5 rounded-xl bg-slate-50 border text-left flex items-center justify-between text-xs transition-all duration-200 cursor-pointer shadow-xs ${
          disabled
            ? 'opacity-40 cursor-not-allowed border-slate-200 bg-slate-100/60 text-slate-400'
            : isOpen
            ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white text-slate-900'
            : 'border-slate-200 hover:border-sky-400 text-slate-900'
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 shrink-0" />
          <span className="truncate font-semibold text-xs sm:text-[13px] text-slate-900">
            {disabled
              ? disabledPlaceholder
              : value
              ? formatCompactDate(value)
              : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ml-0.5 sm:ml-1 ${
            isOpen ? 'rotate-180 text-sky-600' : ''
          }`}
        />
      </button>

      {/* Apple WWDC 2025 Calendar Popover */}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            ref={popoverRef}
            style={popoverStyle}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full mt-2.5 z-[60] w-[315px] sm:w-[335px] max-w-[calc(100vw-2rem)] rounded-[30px] p-5 sm:p-6 bg-slate-50/92 backdrop-blur-3xl border border-white/95 shadow-[0_28px_65px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.9)] overflow-hidden select-none"
          >
            {/* Ambient Apple WWDC 2025 Iridescent Aura at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-tr from-teal-200/40 via-purple-200/40 to-rose-200/40 blur-2xl pointer-events-none rounded-b-[30px]" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-28 bg-gradient-to-r from-sky-300/35 via-fuchsia-300/30 to-amber-200/40 blur-2xl pointer-events-none rounded-full" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/40 via-white/10 to-transparent pointer-events-none" />

            {/* ======================================================== */}
            {/* 1. DAYS VIEW MODE (Default)                               */}
            {/* ======================================================== */}
            {viewMode === 'days' && (
              <motion.div
                key="days-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                {/* Header: Left Arrow, Clickable Month & Year Pills, Right Arrow */}
                <div className="relative z-10 flex items-center justify-between mb-4 px-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-white/80 active:scale-95 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  {/* Interactive Month & Year Buttons */}
                  <div className="flex items-center gap-1.5">
                    {/* Month Picker Button */}
                    <button
                      type="button"
                      onClick={() => setViewMode('months')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white border border-white/85 shadow-xs active:scale-95 transition-all text-slate-900 font-semibold text-xs sm:text-[13px] tracking-tight cursor-pointer"
                      title="Select month"
                    >
                      <span>{MONTH_NAMES[viewMonth]}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>

                    {/* Year Picker Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setYearPageStart(viewYear);
                        setViewMode('years');
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white border border-white/85 shadow-xs active:scale-95 transition-all text-slate-900 font-semibold text-xs sm:text-[13px] tracking-tight cursor-pointer"
                      title="Select year"
                    >
                      <span>{viewYear}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-white/80 active:scale-95 transition-all cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[1.8]" />
                  </button>
                </div>

                {/* Weekdays Row: Su Mo Tu We Th Fr Sa */}
                <div className="relative z-10 grid grid-cols-7 mb-3 text-center">
                  {WEEKDAY_NAMES.map((name) => (
                    <div
                      key={name}
                      className="text-[11px] font-normal text-slate-400 tracking-wider py-1 font-sans"
                    >
                      {name}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="relative z-10 grid grid-cols-7 gap-y-2 gap-x-1 text-center font-sans">
                  {/* Empty leading spacer slots */}
                  {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="w-8 h-8 sm:w-9 sm:h-9" />
                  ))}

                  {/* Day numbers */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const isSelected = isDaySelected(day);
                    const disabledDay = isDayDisabled(day);
                    const isToday = isDayToday(day);

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        disabled={disabledDay}
                        onClick={() => handleSelectDay(day)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full flex items-center justify-center text-xs sm:text-sm font-normal transition-all relative ${
                          disabledDay
                            ? 'text-slate-300 opacity-25 cursor-not-allowed pointer-events-none'
                            : isSelected
                            ? 'bg-white text-slate-900 font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-white/90 scale-105 cursor-pointer z-10'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-white/80 active:scale-95 cursor-pointer'
                        }`}
                      >
                        {day}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 bg-sky-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* 2. MONTHS VIEW MODE                                       */}
            {/* ======================================================== */}
            {viewMode === 'months' && (
              <motion.div
                key="months-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative z-10"
              >
                {/* Header: Back to days & Year Stepper */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('days')}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 px-2 py-1 rounded-full hover:bg-white/80 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Days</span>
                  </button>

                  {/* Year Stepper within Month View */}
                  <div className="flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-white/80 shadow-xs">
                    <button
                      type="button"
                      disabled={viewYear <= minYear}
                      onClick={() => setViewYear((y) => Math.max(minYear, y - 1))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setYearPageStart(viewYear);
                        setViewMode('years');
                      }}
                      className="font-bold text-xs sm:text-[13px] text-slate-800 hover:text-sky-600 px-1.5 cursor-pointer"
                    >
                      {viewYear} ▾
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewYear((y) => y + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 12-Month Grid (3x4) */}
                <div className="grid grid-cols-3 gap-2.5 py-1 font-sans">
                  {MONTH_SHORT_NAMES.map((mName, idx) => {
                    const isSelectedMonth = idx === viewMonth;
                    const isPastMonth =
                      viewYear < minYear || (viewYear === minYear && idx < minMonth);

                    return (
                      <button
                        key={mName}
                        type="button"
                        disabled={isPastMonth}
                        onClick={() => {
                          setViewMonth(idx);
                          setViewMode('days');
                        }}
                        className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all relative ${
                          isPastMonth
                            ? 'text-slate-300 opacity-25 cursor-not-allowed pointer-events-none'
                            : isSelectedMonth
                            ? 'bg-white text-slate-900 font-bold shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-white/90 scale-105 cursor-pointer z-10'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-white/80 active:scale-95 cursor-pointer bg-white/40'
                        }`}
                      >
                        {mName}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* 3. YEARS VIEW MODE                                        */}
            {/* ======================================================== */}
            {viewMode === 'years' && (
              <motion.div
                key="years-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative z-10"
              >
                {/* Header: Back & Page Stepper */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('days')}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 px-2 py-1 rounded-full hover:bg-white/80 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Days</span>
                  </button>

                  {/* Decade/Range Stepper */}
                  <div className="flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-white/80 shadow-xs">
                    <button
                      type="button"
                      disabled={yearPageStart <= minYear}
                      onClick={() => setYearPageStart((y) => Math.max(minYear - (minYear % 12), y - 12))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs text-slate-800 px-1.5 font-mono">
                      {yearPageStart}–{yearPageStart + 11}
                    </span>
                    <button
                      type="button"
                      onClick={() => setYearPageStart((y) => y + 12)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 12-Year Grid (3x4) */}
                <div className="grid grid-cols-3 gap-2.5 py-1 font-sans">
                  {yearsList.map((y) => {
                    const isSelectedYear = y === viewYear;
                    const isPastYear = y < minYear;

                    return (
                      <button
                        key={y}
                        type="button"
                        disabled={isPastYear}
                        onClick={() => {
                          setViewYear(y);
                          setViewMode('days');
                        }}
                        className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all relative ${
                          isPastYear
                            ? 'text-slate-300 opacity-25 cursor-not-allowed pointer-events-none'
                            : isSelectedYear
                            ? 'bg-white text-slate-900 font-bold shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-white/90 scale-105 cursor-pointer z-10'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-white/80 active:scale-95 cursor-pointer bg-white/40'
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Minimalist Today Shortcut */}
            <div className="relative z-10 mt-3 pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={handleSelectToday}
                className="text-[11px] font-medium text-slate-500 hover:text-sky-600 transition-colors cursor-pointer py-0.5 px-2 rounded-md hover:bg-white/60"
              >
                Today • {formatDisplayDate(new Date().toISOString().split('T')[0])}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
