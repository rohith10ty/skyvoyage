import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Plane, Search, ChevronDown, Check, X, Globe, MapPin } from 'lucide-react';
import { airports } from '../../data/airports';
import { useCenteredPopover } from '../../hooks/useCenteredPopover';

export function AirportCombobox({
  label,
  value,
  onChange,
  placeholder = 'Select airport',
  id,
  className = '',
  align = 'center'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'india' | 'international'
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { popoverRef, popoverStyle } = useCenteredPopover({
    isOpen,
    defaultWidth: 420,
    minPadding: 16,
    externalContainerRef: containerRef,
  });

  const selectedAirport = airports.find((a) => a.code === value);

  // Filter airports based on search query or category tabs
  const filteredAirports = useMemo(() => {
    const q = query.trim().toLowerCase();

    // If searching, search across all airports
    if (q) {
      return airports.filter((airport) => {
        const codeMatch = airport.code.toLowerCase().includes(q);
        const cityMatch = airport.city.toLowerCase().includes(q);
        const nameMatch = airport.name.toLowerCase().includes(q);
        const countryMatch = airport.country.toLowerCase().includes(q);
        const aliasMatch = airport.aliases?.some((a) => a.toLowerCase().includes(q));
        return codeMatch || cityMatch || nameMatch || countryMatch || aliasMatch;
      });
    }

    // When not searching, filter by active category tab
    if (activeTab === 'india') {
      return airports.filter((a) => a.region === 'India');
    }
    if (activeTab === 'international') {
      return airports.filter((a) => a.region === 'International');
    }
    return airports;
  }, [query, activeTab]);

  const indianCount = useMemo(() => airports.filter((a) => a.region === 'India').length, []);
  const intlCount = useMemo(() => airports.filter((a) => a.region === 'International').length, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (airport) => {
    onChange(airport.code);
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredAirports.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredAirports.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredAirports[highlightedIndex]) {
        handleSelect(filteredAirports[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 60);
        }}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500 text-left flex items-center justify-between transition-colors group cursor-pointer shadow-xs"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 text-sky-600">
            <Plane className="w-4 h-4" />
          </div>
          <div className="truncate">
            {selectedAirport ? (
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-bold text-slate-900 tracking-wide text-sm">{selectedAirport.code}</span>
                <span className="text-xs text-slate-600 truncate">{selectedAirport.city}, {selectedAirport.country}</span>
              </div>
            ) : (
              <span className="text-slate-400 text-sm">{placeholder}</span>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-sky-600' : ''}`} />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          style={popoverStyle}
          role="listbox"
          className="absolute z-50 mt-2 p-3 rounded-2xl bg-white border border-slate-200/95 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] animate-in fade-in zoom-in-95 duration-150 flex flex-col w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px]"
        >
          {/* Search Input Box */}
          <div className="relative mb-2.5">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search code (HYD, DEL), city, or airport..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Tabs */}
          {!query && (
            <div className="flex items-center gap-1 mb-2 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setHighlightedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'all'
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span>All ({airports.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('india');
                  setHighlightedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'india'
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>India ({indianCount})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('international');
                  setHighlightedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'international'
                    ? 'bg-sky-500 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <Globe className="w-3 h-3 text-sky-400" />
                <span>Global ({intlCount})</span>
              </button>
            </div>
          )}

          {/* Airport List */}
          <div className="max-h-72 overflow-y-auto space-y-1 pr-1 divide-y divide-slate-100/60">
            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport, index) => {
                const isSelected = airport.code === value;
                const isHighlighted = index === highlightedIndex;
                const isIndia = airport.region === 'India';

                return (
                  <div
                    key={airport.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(airport)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isHighlighted
                        ? 'bg-sky-50/90 text-sky-900 shadow-xs'
                        : isSelected
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Code Badge */}
                      <div className={`w-11 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                        isIndia
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-200 text-amber-700'
                          : 'bg-gradient-to-br from-sky-50 to-cyan-50/60 border-sky-200 text-sky-700'
                      }`}>
                        <span className="font-mono font-bold text-xs tracking-wider">{airport.code}</span>
                      </div>

                      {/* City, Country, & Airport Name */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">{airport.city}</span>
                          <span className="text-[11px] text-slate-400 font-medium truncate">• {airport.country}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 truncate max-w-[210px] sm:max-w-[270px]">
                          {airport.name}
                        </span>
                      </div>
                    </div>

                    {/* Selected Checkmark */}
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-6 px-4 text-center">
                <p className="text-xs font-semibold text-slate-600">No airports found matching "{query}"</p>
                <p className="text-[11px] text-slate-400 mt-1">Try searching by 3-letter IATA code (e.g. HYD, DEL, DXB) or city name.</p>
              </div>
            )}
          </div>

          {/* Bottom count badge */}
          <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
            <span>Showing {filteredAirports.length} airports</span>
            <span>SkyVoyage Global Charter</span>
          </div>
        </div>
      )}
    </div>
  );
}
