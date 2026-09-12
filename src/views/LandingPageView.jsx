import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LandingPageView() {
  const { hubs, openFloorPlan } = useApp();
  const navigate = useNavigate();

  // Search Widget State
  const [destination, setDestination] = useState('SM Megamall, Mandaluyong');
  const [dateOption, setDateOption] = useState('Today');
  const [timeWindow, setTimeWindow] = useState('2:00 PM - 5:00 PM');
  const [vehicleType, setVehicleType] = useState('sedan');
  const [isScanning, setIsScanning] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('driver');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Helper to find matching hub from destination
  const getMatchedHub = () => {
    const term = destination.toLowerCase();
    return hubs.find(h => 
      h.name.toLowerCase().includes(term) || 
      h.address.toLowerCase().includes(term) ||
      term.includes(h.name.toLowerCase()) ||
      term.includes('megamall') && h.id === 'megamall' ||
      term.includes('bgc') && h.id === 'bgc-highstreet' ||
      term.includes('ayala') && h.id === 'ayala-manila-bay'
    ) || hubs[0];
  };

  const handleRunAvailabilityCheck = (e) => {
    if (e) e.preventDefault();
    setIsScanning(true);
    setAvailabilityResult(null);

    setTimeout(() => {
      const matched = getMatchedHub();
      setIsScanning(false);
      setAvailabilityResult({
        spots: matched ? matched.slotsLeft : 42,
        hubName: matched ? matched.name : destination,
        rate: matched ? matched.baseRate : 50,
        hub: matched
      });
    }, 700);
  };

  const handlePrefillHub = (hubName, targetHub = null) => {
    setDestination(hubName);
    const searchSection = document.getElementById('quick-search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Scan immediately
    setIsScanning(true);
    setAvailabilityResult(null);
    setTimeout(() => {
      const hubToUse = targetHub || hubs.find(h => h.name.toLowerCase().includes(hubName.toLowerCase())) || hubs[0];
      setIsScanning(false);
      setAvailabilityResult({
        spots: hubToUse.slotsLeft,
        hubName: hubToUse.name,
        rate: hubToUse.baseRate,
        hub: hubToUse
      });
    }, 600);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 800);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'quick-search') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = document.getElementById('dest-input');
        if (input) {
          setTimeout(() => {
            input.focus({ preventScroll: true });
          }, 350);
        }
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      
      {/* Top Subtle Background Flare */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* 1. HERO SECTION */}
        <section id="home" className="w-full px-container-margin md:px-space-xl pt-10 pb-space-lg max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-space-2xs px-space-xs py-space-3xs rounded-full bg-surface-container-high border border-surface-container-highest shadow-sm mb-space-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
            </span>
            <span className="font-label-sm text-label-sm text-secondary tracking-wide uppercase">
              Manila Metro Grid Telemetry Online
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-xl text-[36px] sm:text-[52px] lg:text-[62px] sm:leading-[1.12] text-on-surface tracking-tight max-w-4xl font-bold">
            Smart Parking,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-primary-container">
              Reserved Before You Arrive.
            </span>
          </h1>

          {/* Supporting Subtext */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-md leading-relaxed">
            Find guaranteed parking spaces, book EV fast chargers, and drive through barrier gates with automatic license plate recognition across Manila's premier commercial centers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-lg">
            <button 
              onClick={() => scrollToSection('quick-search')}
              className="inline-flex items-center gap-space-2xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg transition-all duration-200 shadow-[0_0_24px_rgba(229,9,20,0.35)] hover:shadow-[0_0_32px_rgba(229,9,20,0.6)] hover:bg-primary hover:text-on-primary-fixed active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">local_parking</span>
              <span>Find Parking Now</span>
            </button>

            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex items-center gap-space-2xs px-space-lg py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors hover:bg-surface-container-highest active:scale-95 cursor-pointer border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">play_circle</span>
              <span>How It Works</span>
            </button>
          </div>

          {/* Quick-Search Reservation Widget */}
          <div 
            id="quick-search"
            className="w-full max-w-5xl mt-space-xl p-space-sm sm:p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/80 shadow-2xl scroll-mt-28"
          >
            <form onSubmit={handleRunAvailabilityCheck} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-space-xs items-end text-left">
              
              {/* Destination Field */}
              <div className="lg:col-span-4 flex flex-col gap-space-3xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider flex items-center gap-1" htmlFor="dest-input">
                  <span className="material-symbols-outlined text-[14px] text-primary">pin_drop</span> Destination Hub
                </label>
                <div className="relative flex items-center">
                  <input
                    id="dest-input"
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      if (availabilityResult) setAvailabilityResult(null);
                    }}
                    placeholder="Enter mall or venue"
                    className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors"
                  />
                </div>
              </div>

              {/* Date Selector */}
              <div className="lg:col-span-2 flex flex-col gap-space-3xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider flex items-center gap-1" htmlFor="date-input">
                  <span className="material-symbols-outlined text-[14px] text-secondary">event</span> Date
                </label>
                <select
                  id="date-input"
                  value={dateOption}
                  onChange={(e) => {
                    setDateOption(e.target.value);
                    if (availabilityResult) setAvailabilityResult(null);
                  }}
                  className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors cursor-pointer"
                >
                  <option value="Today">Today, Oct 28</option>
                  <option value="Tomorrow">Tomorrow, Oct 29</option>
                  <option value="Weekend">This Weekend</option>
                </select>
              </div>

              {/* Time Slot Window */}
              <div className="lg:col-span-3 flex flex-col gap-space-3xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider flex items-center gap-1" htmlFor="time-input">
                  <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span> Window
                </label>
                <select
                  id="time-input"
                  value={timeWindow}
                  onChange={(e) => {
                    setTimeWindow(e.target.value);
                    if (availabilityResult) setAvailabilityResult(null);
                  }}
                  className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors cursor-pointer"
                >
                  <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM (Peak)</option>
                  <option value="Now - Next 3 Hours">Now (Next 3 Hours)</option>
                  <option value="Morning: 9:00 AM - 1:00 PM">Morning (9:00 AM - 1:00 PM)</option>
                  <option value="Evening: 6:00 PM - 10:00 PM">Evening (6:00 PM - 10:00 PM)</option>
                </select>
              </div>

              {/* Vehicle Type Selector */}
              <div className="lg:col-span-3 flex flex-col gap-space-3xs">
                <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider flex items-center gap-1" htmlFor="vehicle-type">
                  <span className="material-symbols-outlined text-[14px] text-secondary">directions_car</span> Vehicle
                </label>
                <select
                  id="vehicle-type"
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                    if (availabilityResult) setAvailabilityResult(null);
                  }}
                  className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors cursor-pointer"
                >
                  <option value="Sedan / Compact">Sedan / Compact</option>
                  <option value="SUV / MPV">SUV / MPV</option>
                  <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>
              </div>

              {/* Action Ribbon & Feedback */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-12 mt-space-2xs pt-space-xs border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                
                <div className="flex items-center gap-space-2xs text-secondary font-label-md text-label-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {isScanning ? (
                      <span className="text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined animate-spin text-[14px] text-primary">progress_activity</span>
                        Scanning telemetry nodes across NCR...
                      </span>
                    ) : availabilityResult ? (
                      <span>
                        <span className="text-emerald-400 font-bold">🟢 {availabilityResult.spots} spots available</span> at{' '}
                        <strong className="text-on-surface">{availabilityResult.hubName}</strong> from{' '}
                        <span className="text-primary font-bold">₱{availabilityResult.rate}/hr</span>
                      </span>
                    ) : (
                      'Ready to query 38 hubs across NCR'
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {!availabilityResult ? (
                    <button
                      id="btn-check-avail"
                      type="submit"
                      disabled={isScanning}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-2xs px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_0_16px_rgba(229,9,20,0.3)] hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isScanning ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">bolt</span>
                          <span>Check Availability</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      id="btn-lock-slot"
                      type="button"
                      onClick={() => {
                        if (availabilityResult.hub) {
                          openFloorPlan(availabilityResult.hub);
                        } else {
                          navigate('/find-parking', { state: { searchQuery: destination } });
                        }
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-space-lg py-space-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-label-lg text-label-lg shadow-lg shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer animate-in fade-in"
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Lock Slot</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Trust Metric Ribbon */}
          <div className="w-full max-w-5xl mt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm px-space-sm py-space-2xs rounded-lg bg-surface-container-lowest/80 border border-surface-container-high/40 text-secondary">
            <div className="flex items-center gap-space-2xs text-left">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Over 145,000 drivers parked across SM Megamall, BGC High Street, &amp; Ayala Malls
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                99.98% ANPR Gate Reliability
              </span>
              <span className="hidden sm:inline font-label-sm text-label-sm text-outline">•</span>
              <span className="font-label-sm text-label-sm text-secondary">Avg Entry &lt; 2.4s</span>
            </div>
          </div>
        </section>
      </div>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="w-full py-space-xl px-container-margin md:px-space-xl bg-surface-container-lowest border-t border-b border-surface-container-high/60 scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                Frictionless Flow
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-space-3xs">
                How It Works
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Say goodbye to ticket dispensers, lost tokens, and snaking entrance queues. SanPark bridges booking directly to physical barrier gates.
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            
            {/* Step 1 */}
            <div className="p-space-lg rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between group hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-md">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                    <span className="material-symbols-outlined text-[24px]">search_check</span>
                  </span>
                  <span className="font-headline-lg text-headline-lg text-secondary-container">01</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-2xs">
                  Search &amp; Reserve
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Choose your preferred mall, floor level, or EV bay in advance. Lock your spot and rate with zero surprise surge pricing.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-secondary border-t border-surface-container-high/40">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                <span className="font-label-sm text-label-sm">Guaranteed hold for 15 mins</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-space-lg rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between group hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-md">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                    <span className="material-symbols-outlined text-[24px]">document_scanner</span>
                  </span>
                  <span className="font-headline-lg text-headline-lg text-secondary-container">02</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-2xs">
                  Arrive &amp; Auto-Enter
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Overhead ANPR cameras read your registered plate number and lift barrier gates in under 2.4 seconds. No roll-downs, no physical cards.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-secondary border-t border-surface-container-high/40">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">speed</span>
                <span className="font-label-sm text-label-sm">Optical license recognition</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-space-lg rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between group hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-md">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                    <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                  </span>
                  <span className="font-headline-lg text-headline-lg text-secondary-container">03</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-2xs">
                  Tap-Out &amp; Pay
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Drive out without stopping. Exact duration is tallied down to the minute and automatically debited via SanWallet or linked GCash.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center gap-space-2xs text-secondary border-t border-surface-container-high/40">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">receipt_long</span>
                <span className="font-label-sm text-label-sm">Instant digital BIR receipts</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES (4 Focused Cards) */}
      <section id="features" className="w-full py-space-xl px-container-margin md:px-space-xl max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col gap-space-xl">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
              Built For Precision
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-space-3xs">
              Engineered for Frictionless Parking
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
              High-availability hardware integrations combine with real-time slot sensor meshes across the capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            
            {/* Capability 1 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high shadow-sm flex gap-space-md items-start hover:border-primary/40 hover:bg-surface-container transition-all">
              <div className="p-space-xs rounded-lg bg-surface-container-highest text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">garage</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Guaranteed Stalls
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs leading-relaxed">
                  Never circle crowded parking decks again. Your reserved stall stays locked in the cloud and on terminal display boards, protected by a 15-minute arrival grace cushion.
                </p>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high shadow-sm flex gap-space-md items-start hover:border-primary/40 hover:bg-surface-container transition-all">
              <div className="p-space-xs rounded-lg bg-surface-container-highest text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">ev_charger</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Integrated EV Fast Charging
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs leading-relaxed">
                  Reserve designated 60kW DC fast charging stalls equipped with standard CCS2 connectors. Replenish battery levels with zero idle penalties while you dine or conduct meetings.
                </p>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high shadow-sm flex gap-space-md items-start hover:border-primary/40 hover:bg-surface-container transition-all">
              <div className="p-space-xs rounded-lg bg-surface-container-highest text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">pin_invoke</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Touchless ANPR FastPass
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs leading-relaxed">
                  Proprietary optical license plate scanning neural nets read reflective plates instantly under all ambient weather and night conditions for effortless hands-free pass-through.
                </p>
              </div>
            </div>

            {/* Capability 4 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high shadow-sm flex gap-space-md items-start hover:border-primary/40 hover:bg-surface-container transition-all">
              <div className="p-space-xs rounded-lg bg-surface-container-highest text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">payments</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Transparent Rates &amp; SanWallet
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs leading-relaxed">
                  Clear, transparent tariffs starting at ₱50/hour. Re-charge effortlessly with GCash, Maya, credit card, or enterprise fleet balance accounts with compliant electronic invoices.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PARTNER LOCATIONS / POPULAR HUBS */}
      <section className="w-full py-space-xl px-container-margin md:px-space-xl bg-surface-container-lowest border-t border-surface-container-high/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                Network Coverage
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-space-3xs">
                Popular Hubs &amp; Live Occupancy
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              Live sensor sync active
            </span>
          </div>

          {/* Hub Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            
            {/* Hub 1: SM Megamall */}
            {(() => {
              const megaHub = hubs.find(h => h.id === 'megamall') || hubs[0];
              const pctOccupied = Math.round(((megaHub.totalSlots - megaHub.slotsLeft) / megaHub.totalSlots) * 100);
              return (
                <div key="mega" className="p-space-md rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between shadow-md hover:border-primary-container/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs">
                      <span className="px-space-xs py-space-3xs rounded bg-surface-container-high font-label-sm text-label-sm text-primary font-medium">
                        Mandaluyong
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary">Floor B1-B3</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {megaHub.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {megaHub.address}
                    </p>

                    {/* Occupancy bar */}
                    <div className="mt-space-md">
                      <div className="flex justify-between font-label-sm text-label-sm mb-space-3xs">
                        <span className="text-on-surface">{pctOccupied}% Occupied</span>
                        <span className="text-primary font-semibold">{megaHub.slotsLeft} Vacant Spots</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: `${pctOccupied}%` }} />
                      </div>
                    </div>

                    <div className="mt-space-md flex flex-wrap gap-space-2xs">
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">ev_charger</span> EV Fast Charging
                      </span>
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">shield</span> 24/7 Monitored
                      </span>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-surface-container-high/40">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      ₱{megaHub.baseRate}
                      <span className="font-body-sm text-body-sm text-secondary font-normal"> / hour</span>
                    </span>
                    <button
                      onClick={() => openFloorPlan(megaHub)}
                      className="px-space-sm py-space-2xs rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Hub 2: BGC High Street */}
            {(() => {
              const bgcHub = hubs.find(h => h.id === 'bgc-highstreet') || hubs[2] || hubs[0];
              const pctOccupied = Math.round(((bgcHub.totalSlots - bgcHub.slotsLeft) / bgcHub.totalSlots) * 100);
              return (
                <div key="bgc" className="p-space-md rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between shadow-md hover:border-primary-container/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs">
                      <span className="px-space-xs py-space-3xs rounded bg-surface-container-high font-label-sm text-label-sm text-primary font-medium">
                        Taguig
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary">Parkade 2 &amp; 3</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {bgcHub.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {bgcHub.address}
                    </p>

                    {/* Occupancy bar */}
                    <div className="mt-space-md">
                      <div className="flex justify-between font-label-sm text-label-sm mb-space-3xs">
                        <span className="text-on-surface">{pctOccupied}% Occupied</span>
                        <span className="text-tertiary font-semibold">{bgcHub.slotsLeft} Vacant Spots</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: `${pctOccupied}%` }} />
                      </div>
                    </div>

                    <div className="mt-space-md flex flex-wrap gap-space-2xs">
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">concierge</span> Valet Concierge
                      </span>
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">videocam</span> Optical ANPR
                      </span>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-surface-container-high/40">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      ₱{bgcHub.baseRate}
                      <span className="font-body-sm text-body-sm text-secondary font-normal"> / hour</span>
                    </span>
                    <button
                      onClick={() => openFloorPlan(bgcHub)}
                      className="px-space-sm py-space-2xs rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Hub 3: Ayala Malls Manila Bay */}
            {(() => {
              const ayalaHub = hubs.find(h => h.id === 'ayala-manila-bay') || hubs[1] || hubs[0];
              const pctOccupied = Math.round(((ayalaHub.totalSlots - ayalaHub.slotsLeft) / ayalaHub.totalSlots) * 100);
              return (
                <div key="ayala" className="p-space-md rounded-xl bg-surface-container border border-surface-container-high flex flex-col justify-between shadow-md hover:border-primary-container/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-space-2xs">
                      <span className="px-space-xs py-space-3xs rounded bg-surface-container-high font-label-sm text-label-sm text-primary font-medium">
                        Parañaque
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary">Basement 1 Hub</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {ayalaHub.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {ayalaHub.address}
                    </p>

                    {/* Occupancy bar */}
                    <div className="mt-space-md">
                      <div className="flex justify-between font-label-sm text-label-sm mb-space-3xs">
                        <span className="text-on-surface">{pctOccupied}% Occupied</span>
                        <span className="text-tertiary font-semibold">{ayalaHub.slotsLeft} Vacant Spots</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: `${pctOccupied}%` }} />
                      </div>
                    </div>

                    <div className="mt-space-md flex flex-wrap gap-space-2xs">
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">electric_bolt</span> Supercharger Hub
                      </span>
                      <span className="px-space-2xs py-space-3xs rounded bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">local_mall</span> Direct Mall Lift
                      </span>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-surface-container-high/40">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      ₱{ayalaHub.baseRate}
                      <span className="font-body-sm text-body-sm text-secondary font-normal"> / hour</span>
                    </span>
                    <button
                      onClick={() => openFloorPlan(ayalaHub)}
                      className="px-space-sm py-space-2xs rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>

          <div className="flex justify-center pt-space-xs">
            <button
              onClick={() => navigate('/find-parking')}
              className="inline-flex items-center gap-2 px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md border border-surface-container-high transition-colors cursor-pointer"
            >
              <span>View All 38 Connected Facilities on Live Map</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. INQUIRY & CONTACT SECTION */}
      <section id="contact" className="w-full py-space-xl px-container-margin md:px-space-xl max-w-7xl mx-auto scroll-mt-24">
        <div className="rounded-2xl bg-surface-container-low border border-surface-container-high/80 p-space-lg sm:p-space-xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            
            {/* Left Column: Info & Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                  Connect With Us
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-space-3xs">
                  Have Questions or Want to Partner?
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs leading-relaxed">
                  Whether you are a daily commuter needing reservation assistance, a property developer aiming to monetize garage capacity, or a commercial fleet manager, we are on standby.
                </p>

                <div className="mt-space-lg flex flex-col gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </span>
                    <div>
                      <div className="font-label-sm text-label-sm text-secondary uppercase">Driver &amp; Partner Desk</div>
                      <div className="font-body-md text-body-md text-on-surface font-medium">dispatch@sanpark.ph</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-sm">
                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </span>
                    <div>
                      <div className="font-label-sm text-label-sm text-secondary uppercase">24/7 Toll-Free Hotline</div>
                      <div className="font-body-md text-body-md text-on-surface font-medium">(02) 8820-SPARK / 77275</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-sm">
                    <span className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                    </span>
                    <div>
                      <div className="font-label-sm text-label-sm text-secondary uppercase">Commercial Host Integrations</div>
                      <div className="font-body-md text-body-md text-on-surface font-medium">partners@sanpark.ph</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-space-lg pt-space-md text-secondary font-label-sm text-label-sm border-t border-surface-container-high/40">
                Need fast resolution? Check our{' '}
                <button 
                  onClick={() => navigate('/find-parking')}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  Driver Help Center &amp; Gate FAQs →
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 bg-surface-container border border-surface-container-high p-space-md sm:p-space-lg rounded-xl">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-space-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-space-3xs">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider" htmlFor="contact-name">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Gabriel Reyes"
                      className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-space-3xs">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider" htmlFor="contact-email">
                      Work / Personal Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-space-3xs">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider" htmlFor="inquiry-type">
                    Inquiry Purpose
                  </label>
                  <select
                    id="inquiry-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors cursor-pointer"
                  >
                    <option value="driver">Driver Support &amp; Active Reservation Help</option>
                    <option value="property">Property / Mall Host Partnership</option>
                    <option value="fleet">Enterprise &amp; Ride-Hailing Fleet Solutions</option>
                    <option value="ev">EV Charger Network Host Program</option>
                  </select>
                </div>

                <div className="flex flex-col gap-space-3xs">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider" htmlFor="contact-message">
                    Message Details
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us how we can assist you..."
                    className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-space-xs focus:outline-none focus:bg-surface-container-highest border border-surface-container-highest transition-colors resize-none"
                  />
                </div>

                {contactSuccess && (
                  <div className="p-space-sm rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-body-sm text-body-sm flex items-center gap-space-2xs animate-in fade-in">
                    <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                    <span>Your inquiry has been received. Ticket #SP-8924 opened. Our team will contact you shortly!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="mt-space-2xs inline-flex items-center justify-center gap-space-2xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_0_16px_rgba(229,9,20,0.3)] hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingContact ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="w-full py-space-xl px-container-margin md:px-space-xl max-w-7xl mx-auto mb-space-lg">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container-high to-surface-container border border-surface-container-high/80 p-space-lg sm:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-2xl">
          {/* Ambient Glow Behind CTA */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-container/15 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="flex flex-col gap-space-2xs max-w-xl text-center md:text-left z-10">
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              Ready to skip the parking queue?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Find guaranteed spots, auto-entry through smart barrier gates, and live slot reservations across Metro Manila.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-sm z-10">
            <button
              onClick={() => scrollToSection('quick-search')}
              className="inline-flex items-center gap-space-2xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-[0_0_24px_rgba(229,9,20,0.4)] hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">local_parking</span>
              <span>Reserve a Spot</span>
            </button>

            <button
              onClick={() => navigate('/find-parking')}
              className="inline-flex items-center gap-space-2xs px-space-md py-space-sm rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors border border-surface-container-high cursor-pointer"
            >
              <span>Explore Live Map</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
