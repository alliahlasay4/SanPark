import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function MyBookingsView() {
  const { setActiveView, history, selectedVehicle, showToast } = useApp();
  
  // Dynamic add-ons state
  const basePrice = 450;
  const [addonEv, setAddonEv] = useState(false);
  const [addonExpress, setAddonExpress] = useState(false);
  const [addonWash, setAddonWash] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('gcash');

  // Countdown timer: 09:45
  const [secondsRemaining, setSecondsRemaining] = useState(9 * 60 + 45);

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
    showToast(`Payment of ₱${totalDue.toFixed(2)} confirmed via ${selectedPayment.toUpperCase()}! Pass activated.`);
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
            onClick={() => setActiveView('find-parking')}
            className="px-space-sm py-space-xs rounded-lg bg-primary-container text-on-primary-container text-label-md font-label-md flex items-center space-x-space-2xs shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:opacity-90 transition-opacity"
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
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8t2MnBlzjEzlEV8-z6E1NwXPylOqKYpiU3o-XOSpnyiirF5n_aBnVoSVTuMat7Trl76_Q4oBHMhRcb2wdjqieqtLbY0HgdvFDAdcHGNkNin4kpVFkRpG8IpPTL32UpuLCBX7XrjI8sBJqOWWkZruFdHSdy4aarxKWKEVBfF92YZiKll7rtpyaU5Bbwls-VcGA6uSNP8t1T_Gt42SQhbRqXGCjnZt4AgH-w10K8Y5wabNdZkygvW_j')`
                }}
              />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-headline-md font-headline-md text-on-surface">Shangri-La The Fort Mall</h3>
                    <p className="text-body-sm text-on-surface-variant">BGC, Taguig City • Level B2, Slot #142</p>
                  </div>
                  <span className="text-headline-sm font-headline-sm text-primary font-bold">₱450.00</span>
                </div>
                <div className="mt-space-sm flex flex-wrap gap-space-2xs">
                  <span className="bg-surface-container-high text-secondary px-space-2xs py-space-3xs rounded text-label-md border border-surface-container-highest">
                    Standard Guaranteed Pass
                  </span>
                  <span className="bg-surface-container-high text-secondary px-space-2xs py-space-3xs rounded text-label-md border border-surface-container-highest">
                    {selectedVehicle?.model} ({selectedVehicle?.plate})
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Add-ons Panel */}
            <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-md border border-surface-container-high">
              <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Enhance Your Booking</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                
                <label className={`flex items-center justify-between p-space-xs rounded-lg border transition-colors cursor-pointer ${
                  addonEv ? 'bg-primary-container/10 border-primary' : 'bg-surface-container border-surface-container-high hover:border-outline'
                }`}>
                  <div className="flex items-center space-x-space-2xs">
                    <input
                      type="checkbox"
                      id="addon-ev"
                      checked={addonEv}
                      onChange={(e) => setAddonEv(e.target.checked)}
                      className="w-4 h-4 rounded accent-primary-container"
                    />
                    <span className="text-body-sm text-on-surface font-medium">EV Fast Charge</span>
                  </div>
                  <span className="text-body-sm text-primary font-semibold">+₱150</span>
                </label>

                <label className={`flex items-center justify-between p-space-xs rounded-lg border transition-colors cursor-pointer ${
                  addonExpress ? 'bg-primary-container/10 border-primary' : 'bg-surface-container border-surface-container-high hover:border-outline'
                }`}>
                  <div className="flex items-center space-x-space-2xs">
                    <input
                      type="checkbox"
                      id="addon-express"
                      checked={addonExpress}
                      onChange={(e) => setAddonExpress(e.target.checked)}
                      className="w-4 h-4 rounded accent-primary-container"
                    />
                    <span className="text-body-sm text-on-surface font-medium">Express Pass</span>
                  </div>
                  <span className="text-body-sm text-primary font-semibold">+₱50</span>
                </label>

                <label className={`flex items-center justify-between p-space-xs rounded-lg border transition-colors cursor-pointer ${
                  addonWash ? 'bg-primary-container/10 border-primary' : 'bg-surface-container border-surface-container-high hover:border-outline'
                }`}>
                  <div className="flex items-center space-x-space-2xs">
                    <input
                      type="checkbox"
                      id="addon-wash"
                      checked={addonWash}
                      onChange={(e) => setAddonWash(e.target.checked)}
                      className="w-4 h-4 rounded accent-primary-container"
                    />
                    <span className="text-body-sm text-on-surface font-medium">Car Wash</span>
                  </div>
                  <span className="text-body-sm text-primary font-semibold">+₱300</span>
                </label>

              </div>
            </div>

            {/* Payment Method Toggles */}
            <div className="mb-space-md">
              <h4 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">Select Payment Method</h4>
              <div className="grid grid-cols-3 gap-space-2xs">
                {[
                  { id: 'gcash', label: 'GCash', icon: 'account_balance_wallet' },
                  { id: 'maya', label: 'Maya', icon: 'payments' },
                  { id: 'card', label: 'Card', icon: 'credit_card' },
                ].map(p => (
                  <button
                    key={p.id}
                    id={`pay-${p.id}`}
                    onClick={() => setSelectedPayment(p.id)}
                    className={`flex flex-col items-center justify-center p-space-xs rounded-lg font-semibold transition-all border ${
                      selectedPayment === p.id
                        ? 'bg-primary-container text-on-primary-container border-primary shadow-md'
                        : 'bg-surface-container-high text-on-surface border-surface-container-highest hover:bg-surface-bright'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">{p.icon}</span>
                    <span className="text-label-md">{p.label}</span>
                  </button>
                ))}
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
                SP-9482-BGC
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
                <span className="text-label-lg font-label-lg text-on-surface font-semibold">Uptown Mall BGC</span>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded-lg border border-surface-container-highest">
                <span className="text-body-sm text-on-surface-variant block">Assigned Bay</span>
                <span className="text-label-lg font-label-lg text-primary font-mono font-bold">P3-A12 (VIP)</span>
              </div>
            </div>

            {/* Wallet Integration Buttons */}
            <div className="grid grid-cols-2 gap-space-xs mb-space-md">
              <button 
                onClick={() => showToast("Added SanPark pass to Apple Wallet")}
                className="flex items-center justify-center space-x-space-2xs bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-xs px-space-xs rounded-lg transition-colors text-label-md border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[18px]">wallet</span>
                <span>Apple Wallet</span>
              </button>
              <button 
                onClick={() => showToast("Added SanPark pass to Google Wallet")}
                className="flex items-center justify-center space-x-space-2xs bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-xs px-space-xs rounded-lg transition-colors text-label-md border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span>Google Wallet</span>
              </button>
            </div>

            {/* Deep Links for GPS Navigation */}
            <div className="grid grid-cols-2 gap-space-xs">
              <a
                href="https://waze.com/ul?q=Uptown+Mall+BGC"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-space-2xs bg-primary-container text-on-primary-container py-space-xs px-space-xs rounded-lg hover:opacity-90 transition-opacity text-label-md font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">near_me</span>
                <span>Navigate Waze</span>
              </a>
              <a
                href="https://maps.google.com/?q=Uptown+Mall+BGC"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-space-2xs bg-surface-container-high text-on-surface py-space-xs px-space-xs rounded-lg hover:bg-surface-bright transition-colors text-label-md border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[18px]">map</span>
                <span>Google Maps</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
