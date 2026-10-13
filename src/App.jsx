import React, { useState } from 'react';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { BookingWidget } from './components/sections/BookingWidget';
import { FlightCorridor } from './components/sections/FlightCorridor';
import { PopularDestinations } from './components/sections/PopularDestinations';
import { FlightPackages } from './components/sections/FlightPackages';
import { TravelServices } from './components/sections/TravelServices';
import { StatsAndPartners } from './components/sections/StatsAndPartners';
import { AboutUs } from './components/sections/AboutUs';
import { Testimonials } from './components/sections/Testimonials';
import { ContactBookingForm } from './components/sections/ContactBookingForm';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleSelectFlightFromSearch = (flightData) => {
    setSelectedDestination(flightData.destination);
    setSelectedPackage(`${flightData.aircraft} (${flightData.origin} → ${flightData.destination})`);
  };

  const handleSelectDestination = (destinationName) => {
    setSelectedDestination(destinationName);
  };

  const handleSelectPackage = (packageName) => {
    setSelectedPackage(packageName);
  };

  return (
    <SmoothScroll>
      {/* Page Load Preloader */}
      <Preloader />

      {/* Floating Scroll To Top Button with Flight Icon */}
      <ScrollToTop />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Floating Flight Search & Booking Widget */}
        <BookingWidget onSelectFlight={handleSelectFlightFromSearch} />

        {/* 3. Signature Scroll Experience: The Flight Corridor */}
        <FlightCorridor />

        {/* 4. Popular Destinations */}
        <PopularDestinations onSelectDestination={handleSelectDestination} />

        {/* 5. Flight Packages & Offers */}
        <FlightPackages onSelectPackage={handleSelectPackage} />

        {/* 6. Travel Services Bento Grid */}
        <TravelServices />

        {/* 7. Stats Metrics & Airlines Marquee */}
        <StatsAndPartners />

        {/* 8. About Us & Heritage */}
        <AboutUs />

        {/* 9. Verified Testimonials */}
        <Testimonials />

        {/* 10. Contact Concierge & Booking Manifest */}
        <ContactBookingForm
          prefillDestination={selectedDestination}
          prefillPackage={selectedPackage}
        />
      </main>

      {/* 11. Footer */}
      <Footer />
    </SmoothScroll>
  );
}
