import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import HubPickerModal from '../components/HubPickerModal';

function formatDisplayTime(timeStr) {
  if (!timeStr) return '10:00 AM';
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${mStr || '00'} ${ampm}`;
}

// Brand SVG Logos
function GCashLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#007DFE" />
      <path
        d="M16 6.5C10.75 6.5 6.5 10.75 6.5 16S10.75 25.5 16 25.5c4.7 0 8.6-3.4 9.35-7.9h-4.3c-.65 2.2-2.7 3.8-5.05 3.8-2.98 0-5.4-2.42-5.4-5.4s2.42-5.4 5.4-5.4c2.15 0 4 1.25 4.86 3.05l3.8-1.8C23.2 8.7 19.8 6.5 16 6.5z"
        fill="white"
      />
      <rect x="15" y="14" width="8.5" height="4" rx="1.5" fill="white" />
    </svg>
  );
}

function MayaLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#28BE00" />
      <path
        d="M8.5 22.5V13.8c0-2.4 1.8-4.3 4.2-4.3 1.8 0 3.3 1.1 3.9 2.7.6-1.6 2.1-2.7 3.9-2.7 2.4 0 4.2 1.9 4.2 4.3v8.7h-3.4v-8.2c0-1-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v8.2h-3.4v-8.2c0-1-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v8.2H8.5z"
        fill="white"
      />
    </svg>
  );
}

function CardLogo({ className = "w-6 h-6", isSelected = false }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="6"
        width="26"
        height="20"
        rx="3.5"
        fill={isSelected ? "#ffffff" : "#262626"}
        stroke={isSelected ? "#ffffff" : "#525252"}
        strokeWidth="1.2"
      />
      <rect x="3" y="11" width="26" height="4.5" fill={isSelected ? "#E50914" : "#131313"} />
      <rect x="6" y="18.5" width="4.5" height="3.5" rx="0.8" fill="#F59E0B" />
      <circle cx="21" cy="20.2" r="2.8" fill="#EF4444" fillOpacity="0.9" />
      <circle cx="24" cy="20.2" r="2.8" fill="#F59E0B" fillOpacity="0.9" />
    </svg>
  );
}

function AppleWalletLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#000000" />
      <path d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5V7z" fill="#007AFF" />
      <path d="M5 10.5a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 1.5 1.5v2H5v-2z" fill="#34C759" />
      <path d="M5 14a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 1.5 1.5v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3z" fill="#FF9500" />
      <circle cx="8" cy="16.5" r="1.2" fill="white" />
    </svg>
  );
}

function GooglePayLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#FFFFFF" />
      <path d="M18.2 12.2c0-.5-.04-1-.13-1.4H12v2.7h3.5a3 3 0 0 1-1.3 2v1.7h2.1c1.2-1.1 1.9-2.8 1.9-5z" fill="#4285F4"/>
      <path d="M12 18.5c1.8 0 3.2-.6 4.3-1.6l-2.1-1.7c-.6.4-1.3.6-2.2.6-1.7 0-3.1-1.1-3.6-2.7H6.2v1.7A6.5 6.5 0 0 0 12 18.5z" fill="#34A853"/>
      <path d="M8.4 13.1a3.9 3.9 0 0 1 0-2.2V9.2H6.2a6.5 6.5 0 0 0 0 5.6l2.2-1.7z" fill="#FBBC05"/>
      <path d="M12 8.2c1 0 1.9.3 2.6 1l1.9-1.9A6.5 6.5 0 0 0 12 5.5a6.5 6.5 0 0 0-5.8 3.7l2.2 1.7c.5-1.6 1.9-2.7 3.6-2.7z" fill="#EA4335"/>
    </svg>
  );
}

function WazeLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.4 12.8c.4-.9.6-1.9.6-2.9C20 5.4 15.9 2 11 2S2 5.4 2 9.9c0 3.5 2.3 6.5 5.6 7.5.3 1.2 1.2 2.6 2.7 2.6h.4c.3 0 .7-.1 1-.3.8-.5 1.7-.7 2.6-.7 1.2 0 2.3.4 3.2 1.1.4.3.9.5 1.4.5 1.5 0 2.4-1.4 2.7-2.6 1.4-.7 2.4-2.1 2.4-3.7 0-.7-.2-1.3-.6-1.5z"
        fill="#33CCFF"
      />
      <circle cx="8" cy="9.5" r="1.3" fill="#1C1C1E" />
      <circle cx="14" cy="9.5" r="1.3" fill="#1C1C1E" />
      <circle cx="7.5" cy="18.5" r="1.8" fill="#1C1C1E" />
      <circle cx="15.5" cy="18.5" r="1.8" fill="#1C1C1E" />
      <path d="M10 13c.6.6 1.4 1 2.2 1s1.6-.4 2.2-1" stroke="#1C1C1E" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GoogleMapsLogo({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" fill="#EA4335" />
      <path d="M12 2c2.21 0 4.21.9 5.66 2.34L14.5 7.5c-.65-.65-1.55-1.05-2.5-1.05-1.93 0-3.5 1.57-3.5 3.55 0 .5.1.98.3 1.4l-3.2 2.45C4.6 12.45 4 11.3 4 10c0-4.42 3.58-8 8-8z" fill="#4285F4" />
      <path d="M12 6.45c1.93 0 3.5 1.57 3.5 3.55 0 1.25-.65 2.35-1.63 2.97l3.18 2.45C18.6 13.9 20 12.1 20 10c0-4.42-3.58-8-8-8v4.45z" fill="#FBBC04" />
      <path d="M12 13.55c-1.93 0-3.5-1.57-3.5-3.55 0-.5.1-.98.3-1.4L5.6 6.15C4.6 7.55 4 9.2 4 11c0 3.32 3.1 7.28 8 11.2V13.55z" fill="#34A853" />
      <circle cx="12" cy="10" r="3.2" fill="#FFFFFF" />
      <circle cx="12" cy="10" r="2.2" fill="#EA4335" />
    </svg>
  );
}

export default function MyBookingsView() {
  const { setActiveView, history, selectedVehicle, activeReservation, showToast } = useApp();
  
  // Modal state
  const [isHubPickerOpen, setIsHubPickerOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  const effectiveBooking = activeReservation || activeBooking;

  // Dynamic add-ons state
  const basePrice = effectiveBooking 
    ? (effectiveBooking.basePrice || (effectiveBooking.hub?.baseRate || 50) * (effectiveBooking.durationHours || 4)) 
    : 200;
  const [addonEv, setAddonEv] = useState(false);
  const [addonExpress, setAddonExpress] = useState(false);
  const [addonWash, setAddonWash] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('gcash');

  // Countdown timer: 09:45
  const [secondsRemaining, setSecondsRemaining] = useState(9 * 60 + 45);

  const handleReservationCreated = (newRes) => {
    setActiveBooking(newRes);
    setSecondsRemaining(15 * 60);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalDue = basePrice + 
    (addonEv ? 150 : 0) + 
    (addonExpress ? 50 : 0) + 
    (addonWash ? 300 : 0);

  const handlePayNow = () => {
    const paymentLabel =
      selectedPayment === 'gcash' ? 'GCash' :
      selectedPayment === 'maya' ? 'Maya' :
      selectedPayment === 'card' ? 'Credit / Debit Card' : selectedPayment.toUpperCase();
    showToast(`Payment of ₱${totalDue.toFixed(2)} confirmed via ${paymentLabel}! Pass activated.`);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      
      {/* Top Navigation & Header Section */}
      <div className="w-full px-container-margin md:px-space-xl pt-space-lg pb-space-md flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center space-x-space-3xs mb-space-3xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary">confirmation_number</span>
            <span className="text-label-md uppercase tracking-wider font-semibold">SanPark Access Control</span>
          </div>
          <h1 className="text-headline-xl font-headline-xl text-on-surface">My Bookings &amp; Digital Pass</h1>
        </div>

        <div className="flex items-center space-x-space-xs">
          <button 
            onClick={() => showToast("Exporting parking receipt history (PDF)...")}
            className="px-space-sm py-space-xs rounded-lg bg-surface-container-high text-on-surface text-label-md font-label-md flex items-center space-x-space-2xs hover:bg-surface-bright transition-colors border border-surface-container-highest"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>History Export</span>
          </button>
          <button 
            type="button"
            id="new-reservation-btn"
            onClick={() => setIsHubPickerOpen(true)}
            className="px-space-sm py-space-xs rounded-lg bg-primary-container text-on-primary-container text-label-md font-label-md flex items-center space-x-space-2xs shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Reservation</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="w-full px-container-margin md:px-space-xl pb-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        
        {/* Left Column: Active & Pending Passes (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-space-lg">
          
          {/* Pending Reservation with Live Countdown Timer */}
          <div className="w-full bg-surface-container rounded-xl p-space-md relative overflow-hidden shadow-xl border border-surface-container-high">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-surface-container-high gap-space-xs">
              <div className="flex items-center space-x-space-xs">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-container"></span>
                </span>
                <span className="text-label-sm uppercase tracking-wider text-primary font-bold">
                  Pending Confirmation
                </span>
              </div>
              
              <div className="flex items-center space-x-space-2xs bg-surface-container-high px-space-xs py-space-3xs rounded-lg border border-surface-container-highest">
                <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
                <span className="text-label-md text-on-surface font-mono font-bold" id="countdown-timer">
                  {formatTimer(secondsRemaining)}
                </span>
                <span className="text-body-sm text-on-surface-variant">hold remaining</span>
              </div>
            </div>

            <div className="py-space-md flex flex-col md:flex-row gap-space-md items-start">
              <div
                className="w-full md:w-32 h-32 rounded-lg bg-cover bg-center shrink-0 border border-surface-container-highest"
                style={{
                  backgroundImage: `url('${effectiveBooking?.hub?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHU_d4AG2z66CaunzwymQVHCByFCq2VzDKzMXMQ5ItoQQ_XRMoeMayLB4B4vAxak6IyczcVAU2XEUqTCXR0Ls4lFKFOH63D4FilQ8WajJ7GHwpGX2lfHMNi2JLsT2j996myqHGR-0XC0gqX6bB5HQ9lCbV1j_nPFbs3KzBQJzOefoCC4eDnueIjiIBh_Gu-6NH-pWBvbXBELmj1erQbZ-9EtS8oolY3a9V4E07vQPXz-tjzRnt4c_H'}')`
                }}
              />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-headline-md font-headline-md text-on-surface">
                      {effectiveBooking?.mall || 'SM Megamall Parking Hub'}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      {effectiveBooking?.address || 'EDSA corner J. Vargas Ave'} • Level {effectiveBooking?.level || 'B1'}, Bay {effectiveBooking?.slotId || 'A-06'}
                    </p>
                    {effectiveBooking?.date && (
                      <div className="text-body-xs font-medium text-on-surface-variant mt-1.5 flex items-center space-x-1.5 flex-wrap">
                        <span className="material-symbols-outlined text-[15px] text-primary">event_available</span>
                        <span className="font-semibold text-on-surface">Scheduled Entry:</span>
                        <span className="text-on-surface">{effectiveBooking.date}</span>
                        <span className="text-on-surface-variant/60">•</span>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[11px] tracking-wide">
                          {formatDisplayTime(effectiveBooking.entryTime)}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-headline-sm font-headline-sm text-primary font-bold">
                    ₱{basePrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-space-sm flex flex-wrap gap-space-2xs">
                  <span className="bg-surface-container-high text-secondary px-space-2xs py-space-3xs rounded text-label-md border border-surface-container-highest">
                    {effectiveBooking?.durationHours ? `${effectiveBooking.durationHours} Hours Guaranteed Pass` : '4 Hours Guaranteed Pass'}
                  </span>
                  <span className="bg-surface-container-high text-secondary px-space-2xs py-space-3xs rounded text-label-md border border-surface-container-highest">
                    {effectiveBooking?.vehicle?.model || selectedVehicle.model} ({effectiveBooking?.vehicle?.plate || selectedVehicle.plate})
                  </span>
                </div>
              </div>
            </div>

            {/* Facility Add-ons */}
            <div className="mb-space-md">
              <h4 className="text-label-sm font-bold uppercase tracking-wider text-primary mb-space-xs">
                FACILITY ADD-ONS
              </h4>
              <div className="space-y-space-2xs">
                {[
                  {
                    id: 'addon-ev',
                    checked: addonEv,
                    onChange: setAddonEv,
                    title: 'EV 60kW DC Fast Charge',
                    desc: 'Top-up to 80% with automated plug-in',
                    price: '+₱150',
                  },
                  {
                    id: 'addon-express',
                    checked: addonExpress,
                    onChange: setAddonExpress,
                    title: 'VIP Express Barrier Clearance',
                    desc: 'Instant green light without full halt',
                    price: '+₱50',
                  },
                  {
                    id: 'addon-wash',
                    checked: addonWash,
                    onChange: setAddonWash,
                    title: 'Waterless Eco Car Handwash',
                    desc: 'Completed while parked at bay',
                    price: '+₱300',
                  },
                ].map((addon) => (
                  <label
                    key={addon.id}
                    htmlFor={addon.id}
                    className={`flex items-center justify-between p-3.5 px-4 rounded-xl cursor-pointer transition-all border ${
                      addon.checked
                        ? 'bg-surface-container-high border-primary/40 shadow-sm'
                        : 'bg-[#181616] border-surface-container-highest/40 hover:border-surface-container-highest hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                      <input
                        type="checkbox"
                        id={addon.id}
                        checked={addon.checked}
                        onChange={(e) => addon.onChange(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all shrink-0 ${
                          addon.checked
                            ? 'bg-white border-white text-black'
                            : 'bg-white/10 border-white/40 hover:border-white'
                        }`}
                      >
                        {addon.checked && (
                          <span className="material-symbols-outlined text-[16px] font-black leading-none select-none text-black">
                            check
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-body-sm font-semibold text-on-surface leading-tight">
                          {addon.title}
                        </div>
                        <div className="text-label-sm text-secondary font-normal leading-tight mt-0.5">
                          {addon.desc}
                        </div>
                      </div>
                    </div>
                    <span className="text-body-md font-bold text-primary shrink-0 ml-3">
                      {addon.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-space-md">
              <h4 className="text-label-sm font-bold uppercase tracking-wider text-primary mb-space-xs">
                PAYMENT METHOD
              </h4>
              <div className="grid grid-cols-3 gap-space-2xs">
                {[
                  {
                    id: 'gcash',
                    label: 'GCash',
                    sub: 'Linked',
                    brandColor: 'text-[#007DFE]',
                    renderIcon: () => <GCashLogo className="w-6 h-6 mb-1.5" />
                  },
                  {
                    id: 'maya',
                    label: 'Maya',
                    sub: 'Instant',
                    brandColor: 'text-[#28BE00]',
                    renderIcon: () => <MayaLogo className="w-6 h-6 mb-1.5" />
                  },
                  {
                    id: 'card',
                    label: 'Card',
                    sub: 'Debit / Credit',
                    brandColor: 'text-on-surface',
                    renderIcon: (sel) => <CardLogo className="w-6 h-6 mb-1.5" isSelected={sel} />
                  },
                ].map((p) => {
                  const isSelected = selectedPayment === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      id={`pay-${p.id}`}
                      onClick={() => setSelectedPayment(p.id)}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-container border-transparent shadow-[0_4px_16px_rgba(229,9,20,0.35)]'
                          : 'bg-[#181616] border-surface-container-highest/40 hover:border-surface-container-highest hover:bg-surface-container-high'
                      }`}
                    >
                      {p.renderIcon(isSelected)}
                      <span
                        className={`text-body-md font-bold leading-tight ${
                          isSelected ? 'text-white' : p.brandColor
                        }`}
                      >
                        {p.label}
                      </span>
                      <span
                        className={`text-label-sm font-medium leading-tight mt-1 ${
                          isSelected ? 'text-white/90' : 'text-secondary'
                        }`}
                      >
                        {p.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Due & Confirm Button */}
            <div className="flex items-center justify-between pt-space-sm border-t border-surface-container-high">
              <div>
                <span className="text-body-sm text-on-surface-variant block">Total Due (Inc. Add-ons)</span>
                <span className="text-headline-lg font-headline-lg text-on-surface" id="total-display">
                  ₱{totalDue.toFixed(2)}
                </span>
              </div>
              <button
                id="confirm-pay-btn"
                onClick={handlePayNow}
                className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary-container text-label-lg font-label-lg hover:opacity-90 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Confirm &amp; Pay Now</span>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </button>
            </div>

          </div>

          {/* Past & Completed Reservations */}
          <div className="w-full bg-surface-container rounded-xl p-space-md border border-surface-container-high shadow-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-md">Recent History</h3>
            <div className="space-y-space-sm">
              {history.map(item => (
                <div key={item.id} className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-surface-container-highest">
                  <div className="flex items-center space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">local_parking</span>
                    </div>
                    <div>
                      <h4 className="text-headline-sm font-headline-sm text-on-surface">{item.mall}</h4>
                      <p className="text-body-sm text-on-surface-variant">{item.date} • {item.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-headline-sm font-headline-sm text-on-surface block">{item.amount}</span>
                    <span className="text-label-sm text-emerald-400 uppercase font-semibold">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: High-Contrast Digital Pass Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="sticky top-20 bg-surface-container rounded-2xl p-space-lg shadow-2xl relative overflow-hidden border border-surface-container-high">
            
            {/* Glow effects */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md">
              <div className="flex items-center space-x-space-2xs">
                <span className="material-symbols-outlined text-primary-container text-[24px]">qr_code_2</span>
                <span className="text-headline-sm font-headline-sm text-on-surface tracking-tight">Active Digital Pass</span>
              </div>
              <span className="bg-primary-container/20 text-primary px-space-xs py-space-3xs rounded-full text-label-sm font-bold uppercase tracking-wider border border-primary/30">
                Ready to Scan
              </span>
            </div>

            {/* Pass Header Info */}
            <div className="text-center mb-space-md">
              <span className="text-body-sm text-on-surface-variant uppercase tracking-widest block mb-1">
                Booking Reference #
              </span>
              <span className="text-headline-lg font-mono font-bold text-on-surface tracking-wider bg-surface-container-high px-space-sm py-space-3xs rounded-lg inline-block border border-surface-container-highest">
                {effectiveBooking?.ref || 'SP-9482-MEG'}
              </span>
            </div>

            {/* QR Code & Barcode Visual Box */}
            <div className="bg-surface p-space-md rounded-xl flex flex-col items-center justify-center mb-space-md shadow-inner border border-surface-container-high">
              <div className="w-48 h-48 bg-white p-space-2xs rounded-lg flex items-center justify-center mb-space-sm shadow-md">
                <span className="material-symbols-outlined text-[160px] text-surface select-none">
                  qr_code_2
                </span>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="font-mono tracking-widest text-on-surface text-headline-sm select-none">
                  ||| | |||| ||| || ||| |||||
                </div>
                <span className="text-body-sm text-on-surface-variant mt-1">
                  Hold close to entrance barrier scanner (ANPR backup active)
                </span>
              </div>
            </div>

            {/* Parking Details Grid */}
            <div className="grid grid-cols-2 gap-space-xs mb-space-md">
              <div className="bg-surface-container-low p-space-xs rounded-lg border border-surface-container-highest">
                <span className="text-body-sm text-on-surface-variant block">Mall Location</span>
                <span className="text-label-lg font-label-lg text-on-surface font-semibold truncate block">
                  {effectiveBooking?.mall || 'SM Megamall Parking Hub'}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded-lg border border-surface-container-highest">
                <span className="text-body-sm text-on-surface-variant block">Assigned Bay</span>
                <span className="text-label-lg font-label-lg text-primary font-mono font-bold truncate block">
                  Level {effectiveBooking?.level || 'B1'}-Bay {effectiveBooking?.slotId || 'A-06'} ({(effectiveBooking?.bayType || 'Standard').toUpperCase()})
                </span>
              </div>
            </div>

            {/* Wallet Integration Buttons */}
            <div className="grid grid-cols-2 gap-space-xs mb-space-md">
              <button 
                onClick={() => showToast("Added SanPark pass to Apple Wallet")}
                className="flex items-center justify-center space-x-2 bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-xs px-space-xs rounded-lg transition-colors text-label-md border border-surface-container-highest font-medium"
              >
                <AppleWalletLogo className="w-5 h-5 shrink-0" />
                <span>Apple Wallet</span>
              </button>
              <button 
                onClick={() => showToast("Added SanPark pass to Google Pay")}
                className="flex items-center justify-center space-x-2 bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-xs px-space-xs rounded-lg transition-colors text-label-md border border-surface-container-highest font-medium"
              >
                <GooglePayLogo className="w-5 h-5 shrink-0" />
                <span>Google Pay</span>
              </button>
            </div>

            {/* Deep Links for GPS Navigation */}
            <div className="grid grid-cols-2 gap-space-xs">
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(effectiveBooking?.mall || 'SM Megamall')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-primary-container text-on-primary-container py-space-xs px-space-xs rounded-lg hover:opacity-90 transition-opacity text-label-md font-semibold shadow-md"
              >
                <WazeLogo className="w-5 h-5 shrink-0" />
                <span>Navigate Waze</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(effectiveBooking?.mall || 'SM Megamall')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-surface-container-high text-on-surface py-space-xs px-space-xs rounded-lg hover:bg-surface-bright transition-colors text-label-md border border-surface-container-highest font-medium"
              >
                <GoogleMapsLogo className="w-5 h-5 shrink-0" />
                <span>Google Maps</span>
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Hub Picker Modal */}
      <HubPickerModal
        isOpen={isHubPickerOpen}
        onClose={() => setIsHubPickerOpen(false)}
      />

    </div>
  );
}
