import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';
import PaymentModal from '../components/PaymentModal';

export default function UserProfileView() {
  const { 
    vehicles, 
    setDefaultVehicle, 
    payments, 
    setPrimaryPayment, 
    history,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile');
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // General & Security states
  const [bioLogin, setBioLogin] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [notifExpiry, setNotifExpiry] = useState(true);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  const tabs = [
    { id: 'profile', label: 'General & Security', icon: 'person' },
    { id: 'vehicles', label: 'Saved Vehicles', icon: 'directions_car', badge: vehicles.length },
    { id: 'payments', label: 'Payment Methods', icon: 'payments', badge: payments.length },
    { id: 'stats', label: 'Parking Stats & History', icon: 'analytics' },
  ];

  return (
    <div className="flex flex-col w-full text-on-surface">
      
      {/* Interactive Dashboard Banner / Profile Overview */}
      <div className="relative w-full overflow-hidden bg-surface-container-low px-container-margin md:px-space-xl py-space-xl border-b border-surface-container-high">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative z-10">
          <div className="flex items-center space-x-space-md">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-surface-container-high ring-4 ring-primary-container/40 shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5bvRdWVC7p9MesXQArQVjMgCtcxzoeW5NMAfuQN6x5_pwVnCOx3LKfDQRNXqpELEVFQUCjoEWGswiEpFxpWfqhGiS5iHcsmToBdfNYipmV6M3M8F8HgyfE5778DBh1pHihPt85W0iWjbm7IaBOiwfgQUkAbE8xzvOBkEf2pPXhxsCY8tNiDhWmKPw4RTDytvTxRlGvVL64_GzDSP5dObdYB7KKj037uV62M8uztKUiCnvtIFHy1-A"
                  alt="Mark Cruz"
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-primary-container text-on-primary-container px-space-2xs py-0.5 rounded-full text-label-sm font-semibold shadow-md flex items-center space-x-1">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>ELITE</span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-space-2xs">
                <span className="text-label-sm uppercase tracking-wider text-primary font-bold">
                  SanPark Elite Member
                </span>
                <span className="text-outline">•</span>
                <span className="text-body-sm text-secondary">Member since 2022</span>
              </div>
              <h1 className="text-headline-xl font-headline-xl text-on-surface mt-0.5">Mark Cruz</h1>
              <p className="text-body-md text-secondary">mark.cruz@sanpark.io • +63 917 555 0192</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm bg-surface-container p-space-md rounded-xl shadow-xl border border-surface-container-highest w-full md:w-auto">
            <div className="flex items-center space-x-space-sm pr-space-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
              </div>
              <div>
                <div className="text-body-sm text-secondary font-medium">Loyalty Balance</div>
                <div className="text-headline-md font-headline-md text-on-surface font-bold">
                  2,450 <span className="text-primary text-body-md font-normal">pts</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast("Elite Perks: 2 Free Weekend Passes & 15% Charging Rebate Active!")}
              className="bg-primary-container text-on-primary-container px-space-md py-2 rounded-lg text-label-lg font-semibold hover:brightness-110 transition-all shadow-md flex items-center space-x-space-2xs"
            >
              <span className="material-symbols-outlined text-[18px]">redeem</span>
              <span>Redeem Rewards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-surface/90 backdrop-blur-md px-container-margin md:px-space-xl border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto flex space-x-space-lg overflow-x-auto">
          {tabs.map(t => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                id={`tab-btn-${t.id}`}
                onClick={() => setActiveTab(t.id)}
                className={`py-space-md text-label-lg font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center space-x-space-2xs ${
                  isActive
                    ? 'border-primary-container text-on-surface'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                <span>{t.label}</span>
                {t.badge !== undefined && (
                  <span className="bg-surface-container-high px-1.5 py-0.2 rounded-full text-xs text-primary font-mono ml-1">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-container-margin md:px-space-xl py-space-lg space-y-space-xl">
        
        {/* TAB 1: GENERAL & SECURITY */}
        {activeTab === 'profile' && (
          <div className="space-y-space-lg animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              
              {/* Personal Info Form */}
              <div className="lg:col-span-2 bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md border border-surface-container-high">
                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
                  <h2 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-space-2xs">
                    <span className="material-symbols-outlined text-primary">badge</span>
                    <span>Personal Information</span>
                  </h2>
                  <button 
                    onClick={() => showToast("Edit profile opened")}
                    className="text-label-md text-primary hover:underline flex items-center space-x-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="text-label-md text-secondary block mb-space-3xs">Full Name</label>
                    <input
                      readOnly
                      type="text"
                      value="Mark Cruz"
                      className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high"
                    />
                  </div>
                  <div>
                    <label className="text-label-md text-secondary block mb-space-3xs">Email Address</label>
                    <input
                      readOnly
                      type="email"
                      value="mark.cruz@sanpark.io"
                      className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high"
                    />
                  </div>
                  <div>
                    <label className="text-label-md text-secondary block mb-space-3xs">Mobile Number</label>
                    <input
                      readOnly
                      type="text"
                      value="+63 917 555 0192"
                      className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-label-md text-secondary block mb-space-3xs">Default Region</label>
                    <input
                      readOnly
                      type="text"
                      value="Metro Manila, Philippines"
                      className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings Card */}
              <div className="bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md flex flex-col justify-between border border-surface-container-high">
                <div>
                  <h2 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-space-2xs pb-space-xs border-b border-surface-container-high">
                    <span className="material-symbols-outlined text-primary">security</span>
                    <span>Security &amp; Access</span>
                  </h2>

                  <div className="space-y-space-md mt-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-label-lg font-semibold text-on-surface">Biometric Login</div>
                        <div className="text-body-sm text-secondary">FaceID / TouchID instant payment</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioLogin}
                          onChange={(e) => {
                            setBioLogin(e.target.checked);
                            showToast(e.target.checked ? "Biometric login enabled" : "Biometric login disabled");
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-label-lg font-semibold text-on-surface">Two-Factor Auth</div>
                        <div className="text-body-sm text-secondary">SMS code on VIP bay bookings</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={twoFactor}
                          onChange={(e) => {
                            setTwoFactor(e.target.checked);
                            showToast(e.target.checked ? "Two-Factor Auth enabled" : "Two-Factor Auth disabled");
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Password change email sent to mark.cruz@sanpark.io")}
                  className="w-full mt-space-md bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-xs rounded-lg text-label-lg font-semibold transition-all border border-surface-container-highest"
                >
                  Change Account Password
                </button>
              </div>

            </div>

            {/* Notification Preferences */}
            <div className="bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md border border-surface-container-high">
              <h2 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-space-2xs pb-space-xs border-b border-surface-container-high">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <span>Notification &amp; Alert Preferences</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex items-start justify-between p-space-md bg-surface-container-low rounded-lg border border-surface-container-highest">
                  <div>
                    <div className="text-label-lg font-semibold text-on-surface">Parking Expiry Push</div>
                    <div className="text-body-sm text-secondary mt-1">Get warned 15 mins before your session expires.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifExpiry}
                    onChange={(e) => setNotifExpiry(e.target.checked)}
                    className="accent-primary w-5 h-5 mt-1 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-between p-space-md bg-surface-container-low rounded-lg border border-surface-container-highest">
                  <div>
                    <div className="text-label-lg font-semibold text-on-surface">Promo &amp; Rewards Alerts</div>
                    <div className="text-body-sm text-secondary mt-1">Receive alerts on double loyalty point weekends.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPromo}
                    onChange={(e) => setNotifPromo(e.target.checked)}
                    className="accent-primary w-5 h-5 mt-1 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-between p-space-md bg-surface-container-low rounded-lg border border-surface-container-highest">
                  <div>
                    <div className="text-label-lg font-semibold text-on-surface">SMS Receipts</div>
                    <div className="text-body-sm text-secondary mt-1">Instant billing summaries sent via SMS.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSms}
                    onChange={(e) => setNotifSms(e.target.checked)}
                    className="accent-primary w-5 h-5 mt-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SAVED VEHICLES */}
        {activeTab === 'vehicles' && (
          <div className="space-y-space-lg animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">Registered Vehicles</h2>
                <p className="text-body-md text-secondary">
                  Manage license plates associated with your automatic barrier ANPR recognition.
                </p>
              </div>
              <button
                id="add-vehicle-btn"
                onClick={() => setVehicleModalOpen(true)}
                className="bg-primary-container text-on-primary-container px-space-md py-space-xs rounded-lg text-label-lg font-semibold hover:brightness-110 transition-all shadow-md flex items-center space-x-space-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add New Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {vehicles.map(v => (
                <div
                  key={v.id}
                  className={`bg-surface-container p-space-lg rounded-xl shadow-md relative overflow-hidden flex flex-col justify-between border ${
                    v.isDefault ? 'border-primary shadow-primary/20' : 'border-surface-container-high'
                  }`}
                >
                  {v.isDefault && (
                    <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full text-label-sm font-semibold">
                      Default Active
                    </div>
                  )}
                  {v.isEv && !v.isDefault && (
                    <div className="absolute top-4 right-4 bg-tertiary-container/20 text-tertiary px-2.5 py-1 rounded-full text-label-sm font-semibold flex items-center space-x-1">
                      <span className="material-symbols-outlined text-[12px]">bolt</span>
                      <span>EV Compatible</span>
                    </div>
                  )}

                  <div>
                    <div className={`w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-space-md ${
                      v.isEv ? 'text-tertiary' : 'text-primary'
                    }`}>
                      <span className="material-symbols-outlined text-[24px]">
                        {v.isEv ? 'ev_station' : 'directions_car'}
                      </span>
                    </div>

                    <h3 className="text-headline-md font-headline-md text-on-surface">{v.model}</h3>
                    <p className="text-body-sm text-secondary mt-0.5">{v.type} • {v.color}</p>

                    <div className="mt-space-md inline-block bg-surface-container-lowest px-3 py-1.5 rounded text-label-lg font-semibold text-on-surface tracking-wider font-mono border border-surface-container-highest">
                      {v.plate}
                    </div>
                  </div>

                  <div className="mt-space-lg pt-space-xs border-t border-surface-container-high flex items-center justify-between text-body-sm">
                    <span className="text-secondary">{v.rfid ? 'RFID & ANPR Linked' : 'Standard Plate'}</span>
                    {!v.isDefault ? (
                      <button
                        onClick={() => setDefaultVehicle(v.id)}
                        className="text-primary hover:underline font-semibold"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PAYMENT METHODS */}
        {activeTab === 'payments' && (
          <div className="space-y-space-lg animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">Payment Methods</h2>
                <p className="text-body-md text-secondary">
                  Linked e-wallets and credit cards for frictionless automated boom gate exit.
                </p>
              </div>
              <button
                id="add-payment-btn"
                onClick={() => setPaymentModalOpen(true)}
                className="bg-primary-container text-on-primary-container px-space-md py-space-xs rounded-lg text-label-lg font-semibold hover:brightness-110 transition-all shadow-md flex items-center space-x-space-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">add_card</span>
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {payments.map(p => (
                <div
                  key={p.id}
                  className={`bg-surface-container p-space-lg rounded-xl shadow-md flex flex-col justify-between border-l-4 ${
                    p.isPrimary ? 'border-primary' : p.accentColor || 'border-surface-container-high'
                  } border-t border-r border-b border-surface-container-high`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-label-sm font-semibold ${
                        p.isPrimary ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-secondary'
                      }`}>
                        {p.isPrimary ? 'Primary' : p.badge}
                      </span>
                    </div>

                    <h3 className="text-headline-md font-headline-md text-on-surface">{p.name}</h3>
                    <p className="text-body-sm text-secondary mt-0.5 font-mono">{p.detail}</p>
                  </div>

                  <div className="mt-space-lg pt-space-xs border-t border-surface-container-high flex items-center justify-between text-body-sm">
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>Connected</span>
                    </span>
                    {!p.isPrimary && (
                      <button
                        onClick={() => setPrimaryPayment(p.id)}
                        className="text-primary hover:underline font-semibold"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STATISTICS & HISTORY */}
        {activeTab === 'stats' && (
          <div className="space-y-space-lg animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">Parking Analytics &amp; History</h2>
                <p className="text-body-md text-secondary">Summary of your urban parking patterns this month.</p>
              </div>
              <div className="bg-surface-container px-space-md py-space-xs rounded-lg text-label-md text-secondary flex items-center space-x-2 border border-surface-container-highest">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>Active Billing Cycle</span>
              </div>
            </div>

            {/* Stats Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              <div className="bg-surface-container p-space-lg rounded-xl shadow-md border border-surface-container-high">
                <div className="text-body-sm text-secondary font-medium">Total Hours Parked</div>
                <div className="text-headline-xl font-headline-xl text-on-surface mt-2 flex items-baseline space-x-2 font-bold">
                  <span>42.5</span>
                  <span className="text-body-md text-primary font-normal">hours</span>
                </div>
                <div className="text-body-sm text-emerald-400 mt-2 flex items-center space-x-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+12% vs last month</span>
                </div>
              </div>

              <div className="bg-surface-container p-space-lg rounded-xl shadow-md border border-surface-container-high">
                <div className="text-body-sm text-secondary font-medium">Total Parking Sessions</div>
                <div className="text-headline-xl font-headline-xl text-on-surface mt-2 flex items-baseline space-x-2 font-bold">
                  <span>18</span>
                  <span className="text-body-md text-primary font-normal">visits</span>
                </div>
                <div className="text-body-sm text-secondary mt-2">Avg. duration: 2.3 hours</div>
              </div>

              <div className="bg-surface-container p-space-lg rounded-xl shadow-md border border-surface-container-high">
                <div className="text-body-sm text-secondary font-medium">Total Spend Saved</div>
                <div className="text-headline-xl font-headline-xl text-on-surface mt-2 flex items-baseline space-x-2 font-bold">
                  <span>₱1,420</span>
                  <span className="text-body-md text-primary font-normal">via Elite Perks</span>
                </div>
                <div className="text-body-sm text-primary mt-2">Free weekend vouchers applied</div>
              </div>
            </div>

            {/* Favorite Malls & Recent Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              <div className="bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md border border-surface-container-high">
                <h3 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-2">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                  <span>Favorite Malls Visited</span>
                </h3>
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container-highest">
                    <div className="flex items-center space-x-space-sm">
                      <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center font-bold text-primary">
                        SM
                      </div>
                      <div>
                        <div className="text-label-lg font-semibold text-on-surface">SM Megamall</div>
                        <div className="text-body-sm text-secondary">Ortigas Center • 12 visits</div>
                      </div>
                    </div>
                    <span className="text-label-md text-primary font-bold">68%</span>
                  </div>

                  <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container-highest">
                    <div className="flex items-center space-x-space-sm">
                      <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center font-bold text-primary">
                        AM
                      </div>
                      <div>
                        <div className="text-label-lg font-semibold text-on-surface">Ayala Malls Manila Bay</div>
                        <div className="text-body-sm text-secondary">Parañaque • 6 visits</div>
                      </div>
                    </div>
                    <span className="text-label-md text-primary font-bold">32%</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <h3 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    <span>Recent Parking Sessions</span>
                  </h3>
                  <button 
                    onClick={() => showToast("Showing complete 12-month activity")}
                    className="text-label-md text-primary hover:underline font-semibold"
                  >
                    View All History
                  </button>
                </div>

                <div className="space-y-space-sm">
                  {history.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-surface-container-highest">
                      <div className="flex items-center space-x-space-md">
                        <span className="material-symbols-outlined text-primary text-[24px]">local_parking</span>
                        <div>
                          <div className="text-label-lg font-semibold text-on-surface">{item.mall}</div>
                          <div className="text-body-sm text-secondary">{item.date} • {item.duration} • {item.vehicle}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-label-lg font-bold text-on-surface">{item.amount}</div>
                        <div className="text-body-sm text-emerald-400">{item.method}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      <VehicleModal
        isOpen={vehicleModalOpen}
        onClose={() => setVehicleModalOpen(false)}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

    </div>
  );
}
