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
    signOut,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('garage');
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showQuickAddDrawer, setShowQuickAddDrawer] = useState(false);

  // Security Toggles
  const [bioLogin, setBioLogin] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  // Editable Account & Security state
  const [profileName, setProfileName] = useState('Mark Cruz');
  const [profileEmail, setProfileEmail] = useState('mark.cruz@sanpark.io');
  const [profileMobile, setProfileMobile] = useState('+63 917 555 0192');
  const [profileRegion, setProfileRegion] = useState('Metro Manila (GMT+8)');
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Backup draft state for cancel functionality
  const [draftName, setDraftName] = useState('Mark Cruz');
  const [draftEmail, setDraftEmail] = useState('mark.cruz@sanpark.io');
  const [draftMobile, setDraftMobile] = useState('+63 917 555 0192');
  const [draftRegion, setDraftRegion] = useState('Metro Manila (GMT+8)');

  const handleStartEdit = () => {
    setDraftName(profileName);
    setDraftEmail(profileEmail);
    setDraftMobile(profileMobile);
    setDraftRegion(profileRegion);
    setIsEditingSettings(true);
  };

  const handleCancelEdit = () => {
    setProfileName(draftName);
    setProfileEmail(draftEmail);
    setProfileMobile(draftMobile);
    setProfileRegion(draftRegion);
    setIsEditingSettings(false);
  };

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim()) {
      showToast("Full Name and Email Address cannot be empty.");
      return;
    }
    setIsEditingSettings(false);
    setIsSavedSuccess(true);
    showToast("Account & Security details saved successfully!");
    setTimeout(() => setIsSavedSuccess(false), 4000);
  };

  // Quick add vehicle form state
  const [newVehType, setNewVehType] = useState('Sedan / Hatchback');
  const [newVehPlate, setNewVehPlate] = useState('');
  const [newVehModel, setNewVehModel] = useState('');
  const [newVehAnpr, setNewVehAnpr] = useState(true);

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    if (!newVehPlate.trim() || !newVehModel.trim()) {
      showToast("Please enter vehicle plate and make/model.");
      return;
    }
    showToast(`Vehicle ${newVehModel} (${newVehPlate.toUpperCase()}) registered successfully!`);
    setShowQuickAddDrawer(false);
    setNewVehPlate('');
    setNewVehModel('');
  };

  return (
    <div className="w-full flex-grow py-space-lg px-container-margin md:px-space-xl text-on-surface">

      {/* Modals */}
      <VehicleModal
        isOpen={vehicleModalOpen}
        onClose={() => setVehicleModalOpen(false)}
      />
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto space-y-space-lg">


        {/* Executive Two-Column Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

          {/* ================= LEFT COLUMN (4 Cols): Profile Sidebar Identity Card ================= */}
          <aside className="lg:col-span-4 space-y-space-md">

            {/* Unified Identity Card */}
            <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg relative overflow-hidden shadow-xl">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col items-center text-center relative z-10">

                {/* Avatar with Status Ring */}
                <div className="relative mb-space-md">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-surface-container-highest p-0.5 bg-background shadow-2xl">
                    <img
                      alt="Mark Cruz"
                      className="w-full h-full object-cover rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5bvRdWVC7p9MesXQArQVjMgCtcxzoeW5NMAfuQN6x5_pwVnCOx3LKfDQRNXqpELEVFQUCjoEWGswiEpFxpWfqhGiS5iHcsmToBdfNYipmV6M3M8F8HgyfE5778DBh1pHihPt85W0iWjbm7IaBOiwfgQUkAbE8xzvOBkEf2pPXhxsCY8tNiDhWmKPw4RTDytvTxRlGvVL64_GzDSP5dObdYB7KKj037uV62M8uztKUiCnvtIFHy1-A"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center px-space-2xs py-0.5 rounded-full text-[10px] font-bold bg-primary-container text-on-primary-container shadow-md border border-surface-container">
                    <span className="material-symbols-outlined text-[11px] mr-0.5">star</span>
                    ELITE
                  </span>
                </div>

                {/* Identity Details */}
                <h2 className="text-headline-md font-headline-md text-on-surface">{profileName}</h2>
                <p className="text-body-xs text-secondary font-medium mt-0.5">Corporate &amp; Executive Commuter</p>

                <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high border border-surface-container-highest text-body-xs font-semibold text-primary">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Elite Member • Since 2022</span>
                </div>

                <div className="w-full h-px bg-surface-container-high my-space-md"></div>

                {/* Verified Contact Summary */}
                <div className="w-full space-y-space-2xs text-left text-body-xs text-secondary">
                  <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-surface-container-highest">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                      <span className="truncate text-on-surface font-medium">{profileEmail}</span>
                    </div>
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  </div>

                  <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-surface-container-highest">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                      <span className="truncate text-on-surface font-medium">{profileMobile}</span>
                    </div>
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  </div>

                  <div className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container-low border border-surface-container-highest">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">location_city</span>
                      <span className="truncate text-on-surface font-medium">Metro Manila, PH</span>
                    </div>
                    <span className="text-[11px] text-secondary">Primary</span>
                  </div>
                </div>

                {/* Quick Profile Actions */}
                <div className="w-full grid grid-cols-2 gap-space-2xs mt-space-md">
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      handleStartEdit();
                    }}
                    className="w-full py-space-2xs px-space-xs rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-md font-semibold border border-surface-container-highest flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      signOut();
                      showToast("Signed out of SanPark");
                    }}
                    className="w-full py-space-2xs px-space-xs rounded-lg bg-primary-container/10 hover:bg-primary-container/20 text-primary hover:text-primary text-label-md font-semibold border border-primary-container/30 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Compact Loyalty & Rewards Card */}
            <div className="bg-gradient-to-br from-surface-container to-surface-container-high border border-surface-container-highest rounded-2xl p-space-md shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary-container/15 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                  </div>
                  <div>
                    <span className="text-body-xs font-semibold uppercase tracking-wider text-secondary">SanPark Perks</span>
                    <div className="text-[11px] text-on-surface-variant">Tier 3 Loyalty Balance</div>
                  </div>
                </div>
                <span className="text-body-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">+350 this mo.</span>
              </div>

              <div className="bg-background/80 border border-surface-container-highest rounded-xl p-3.5 mb-space-md flex items-baseline justify-between">
                <span className="text-body-xs text-secondary">Available Balance</span>
                <div className="text-right">
                  <span className="text-headline-lg font-bold text-on-surface">2,450</span>
                  <span className="text-body-xs font-bold text-primary ml-1">PTS</span>
                </div>
              </div>

              <button
                onClick={() => showToast("Redeem rewards catalog opened!")}
                className="w-full py-2.5 px-space-md rounded-lg bg-primary-container hover:bg-primary-container/90 text-on-primary-container text-label-md font-bold tracking-wide uppercase shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">redeem</span>
                <span>Redeem Rewards</span>
              </button>
            </div>

            {/* Quick Statistics Snapshot */}
            <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-md text-body-xs">
              <div className="text-secondary font-semibold uppercase tracking-wider text-[11px] mb-space-xs flex items-center justify-between">
                <span>Activity Snapshot</span>
                <span className="text-on-surface-variant">Sep 2026</span>
              </div>
              <div className="grid grid-cols-2 gap-space-2xs text-center">
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest">
                  <div className="text-headline-sm font-bold text-on-surface">42.5 h</div>
                  <div className="text-[11px] text-secondary">Total Parked</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest">
                  <div className="text-headline-sm font-bold text-emerald-400">₱1,420</div>
                  <div className="text-[11px] text-secondary">Saved via Elite</div>
                </div>
              </div>
            </div>

          </aside>

          {/* ================= RIGHT COLUMN (8 Cols): Tabbed Detailed Content ================= */}
          <section className="lg:col-span-8 space-y-space-md">

            {/* Sub-Nav Tabs */}
            <div className="bg-surface-container p-1.5 rounded-xl border border-surface-container-highest flex space-x-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('garage')}
                className={`flex-1 py-2 px-3.5 rounded-lg text-label-md font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${activeTab === 'garage'
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">directions_car</span>
                <span>My Vehicles &amp; Garage</span>
                <span className="ml-0.5 px-1.5 py-0.2 bg-surface-container-highest rounded-full text-[10px] text-on-surface">{vehicles.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2 px-3.5 rounded-lg text-label-md font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${activeTab === 'history'
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">history</span>
                <span>Parking History &amp; Passes</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 px-3.5 rounded-lg text-label-md font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${activeTab === 'settings'
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">settings</span>
                <span>Account &amp; Security</span>
              </button>
            </div>

            {/* TAB PANEL 1: GARAGE & VEHICLES */}
            {activeTab === 'garage' && (
              <div className="space-y-space-md animate-in fade-in duration-150">

                {/* Primary Saved Vehicles Section */}
                <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-space-md border-b border-surface-container-high gap-space-xs">
                    <div>
                      <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">garage</span>
                        <span>Registered Vehicles &amp; Fleet ({vehicles.length})</span>
                      </h3>
                      <p className="text-body-xs text-secondary mt-0.5">Smart barrier authorization, instant ANPR license recognition, and RFID credentials</p>
                    </div>

                    <button
                      onClick={() => setShowQuickAddDrawer(!showQuickAddDrawer)}
                      className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>+ Add New Vehicle</span>
                    </button>
                  </div>

                  {/* Quick Add Vehicle Drawer */}
                  {showQuickAddDrawer && (
                    <form onSubmit={handleQuickAddSubmit} className="mt-space-md p-space-md rounded-xl bg-surface-container-low border border-surface-container-highest shadow-inner space-y-space-sm animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="text-body-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">drive_eta</span>
                          <span>Quick Register Vehicle</span>
                        </div>
                        <button type="button" className="text-secondary hover:text-on-surface" onClick={() => setShowQuickAddDrawer(false)}>
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                        <div>
                          <label className="block text-[11px] font-semibold text-secondary mb-1">Vehicle Type</label>
                          <select
                            value={newVehType}
                            onChange={(e) => setNewVehType(e.target.value)}
                            className="w-full bg-surface-container-high border border-surface-container-highest rounded-lg px-3 py-2 text-body-xs text-on-surface focus:outline-none focus:border-primary"
                          >
                            <option>Sedan / Hatchback</option>
                            <option>SUV / Crossover</option>
                            <option>Electric Vehicle (EV)</option>
                            <option>Motorcycle / Scooter</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-secondary mb-1">Plate Number</label>
                          <input
                            type="text"
                            placeholder="e.g. NCD-1234"
                            value={newVehPlate}
                            onChange={(e) => setNewVehPlate(e.target.value)}
                            className="w-full bg-surface-container-high border border-surface-container-highest rounded-lg px-3 py-2 text-body-xs text-on-surface focus:outline-none focus:border-primary font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-secondary mb-1">Make &amp; Model</label>
                          <input
                            type="text"
                            placeholder="e.g. Toyota Corolla Cross"
                            value={newVehModel}
                            onChange={(e) => setNewVehModel(e.target.value)}
                            className="w-full bg-surface-container-high border border-surface-container-highest rounded-lg px-3 py-2 text-body-xs text-on-surface focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="pt-space-xs border-t border-surface-container-high flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer text-body-xs text-on-surface-variant">
                          <input
                            type="checkbox"
                            checked={newVehAnpr}
                            onChange={(e) => setNewVehAnpr(e.target.checked)}
                            className="w-4 h-4 rounded text-primary bg-surface-container border-surface-container-highest focus:ring-0"
                          />
                          <span>Enable Auto-Barrier ANPR Instant Gate Lift</span>
                        </label>

                        <button type="submit" className="px-space-md py-1.5 bg-primary-container text-on-primary-container text-label-md font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer">
                          Save Vehicle
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Registered Vehicles List */}
                  <div className="space-y-space-xs mt-space-md">
                    {vehicles.map((v) => (
                      <div key={v.id} className={`p-space-md rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md ${v.isDefault
                        ? 'bg-surface-container-low border-l-4 border-l-primary border-surface-container-highest'
                        : 'bg-surface-container-low border-surface-container-highest'
                        }`}>
                        <div className="flex items-center space-x-3.5">
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${v.isEv ? 'bg-blue-950/40 text-blue-400' : 'bg-surface-container-high text-primary'}`}>
                            <span className="material-symbols-outlined text-[24px]">{v.isEv ? 'electric_car' : 'directions_car'}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-title-md font-bold text-on-surface">{v.model}</span>
                              {v.isDefault && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-container/20 text-primary border border-primary/30">
                                  PRIMARY / DEFAULT
                                </span>
                              )}
                              {v.isEv && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/30 text-blue-300 border border-blue-700/30">
                                  EV READY
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                ANPR Active
                              </span>
                            </div>
                            <div className="text-body-xs text-secondary mt-1 flex items-center gap-2">
                              <span>{v.type || 'Sedan'} • {v.color || 'Standard'}</span>
                              <span>•</span>
                              <span className="text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px] text-primary">nfc</span> RFID Tag Linked
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-space-sm">
                          <span className="font-mono text-body-xs px-2.5 py-1 rounded bg-background border border-surface-container-highest text-on-surface tracking-widest font-semibold">
                            {v.plate}
                          </span>
                          <div className="flex items-center gap-2">
                            {!v.isDefault && (
                              <button
                                onClick={() => setDefaultVehicle(v.id)}
                                className="text-body-xs font-semibold text-primary hover:underline"
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              onClick={() => showToast(`Manage settings for ${v.model}`)}
                              className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-body-xs font-semibold text-on-surface border border-surface-container-highest"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Linked Payment Methods Card */}
                <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg shadow-md">
                  <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
                    <div>
                      <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                        <span>Linked Payment Methods</span>
                      </h3>
                      <p className="text-body-xs text-secondary mt-0.5">Automated cashless payments for swift barrier exit</p>
                    </div>
                    <button
                      onClick={() => setPaymentModalOpen(true)}
                      className="text-label-md font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">add_card</span>
                      <span>Add Method</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs mt-space-md">
                    {payments.map((p) => (
                      <div key={p.id} className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest relative">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs">
                            {p.icon ? <span className="material-symbols-outlined text-[18px]">{p.icon}</span> : p.name.charAt(0)}
                          </div>
                          {p.isPrimary ? (
                            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
                              Primary
                            </span>
                          ) : (
                            <span className="text-[10px] text-secondary">Backup</span>
                          )}
                        </div>
                        <div className="text-body-xs font-bold text-on-surface">{p.name}</div>
                        <div className="text-[11px] text-secondary mt-0.5">{p.detail || 'Connected'}</div>
                        <div className="mt-3 pt-2 border-t border-surface-container-high flex items-center justify-between text-[11px]">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">check_circle</span>
                            Connected
                          </span>
                          {!p.isPrimary && (
                            <button
                              onClick={() => setPrimaryPayment(p.id)}
                              className="text-secondary hover:text-on-surface"
                            >
                              Make Primary
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB PANEL 2: PARKING HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-space-md animate-in fade-in duration-150">
                <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg shadow-md">
                  <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high flex-wrap gap-2">
                    <div>
                      <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">manage_history</span>
                        <span>All Parking Passes &amp; Validations</span>
                      </h3>
                      <p className="text-body-xs text-secondary mt-0.5">Complete digital logs of all parking stays across all accredited facilities</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast("Filtered history by current month")}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high text-body-xs font-medium text-on-surface border border-surface-container-highest hover:bg-surface-bright"
                      >
                        Filter by Month
                      </button>
                      <button
                        onClick={() => showToast("Exporting parking logs to PDF...")}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high text-body-xs font-medium text-on-surface border border-surface-container-highest hover:bg-surface-bright"
                      >
                        Export PDF
                      </button>
                    </div>
                  </div>

                  <div className="mt-space-md space-y-space-xs">
                    {history.map((h) => (
                      <div key={h.id} className="p-3.5 bg-surface-container-low border border-surface-container-highest rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs text-body-xs hover:border-surface-bright transition-all">
                        <div>
                          <div className="font-bold text-on-surface">{h.mall}</div>
                          <div className="text-secondary mt-0.5">{h.date} • {h.duration} • Toyota Vios</div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-space-md">
                          <div className="text-right">
                            <div className="font-bold text-on-surface font-mono">{h.amount}</div>
                            <div className="text-[10px] text-emerald-400">+18 SanPark Pts</div>
                          </div>
                          <button
                            onClick={() => showToast(`Viewing digital e-Receipt for ${h.mall}`)}
                            className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-body-xs font-semibold text-on-surface border border-surface-container-highest flex items-center gap-1 transition-all"
                          >
                            <span className="material-symbols-outlined text-[14px]">receipt</span>
                            <span>e-Receipt</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL 3: ACCOUNT & SECURITY */}
            {activeTab === 'settings' && (
              <div className="space-y-space-md animate-in fade-in duration-150">
                <form onSubmit={handleSaveProfile} className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg shadow-md space-y-space-md">
                  <div className="pb-space-md border-b border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                        <span>Account &amp; Security Settings</span>
                      </h3>
                      <p className="text-body-xs text-secondary mt-0.5">
                        {isEditingSettings ? "Edit your identity credentials and security preferences below" : "Personal identity details, biometric ANPR authorizations, and security settings"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isSavedSuccess && (
                        <span className="text-body-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-lg animate-fadeIn">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Saved</span>
                        </span>
                      )}
                      
                      {!isEditingSettings ? (
                        <button
                          type="button"
                          onClick={handleStartEdit}
                          className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit Details</span>
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/30 text-body-xs font-bold uppercase tracking-wide">
                          Editing Mode
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Personal Info Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-md">
                    <div>
                      <label className="block text-body-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        readOnly={!isEditingSettings}
                        value={profileName} 
                        onChange={(e) => setProfileName(e.target.value)}
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${
                          isEditingSettings 
                            ? 'bg-surface-container-high border border-primary ring-1 ring-primary/40 text-on-surface' 
                            : 'bg-surface-container-low border border-surface-container-highest text-on-surface-variant cursor-default'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-body-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        readOnly={!isEditingSettings}
                        value={profileEmail} 
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${
                          isEditingSettings 
                            ? 'bg-surface-container-high border border-primary ring-1 ring-primary/40 text-on-surface' 
                            : 'bg-surface-container-low border border-surface-container-highest text-on-surface-variant cursor-default'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-body-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">Mobile Number</label>
                      <input 
                        type="text" 
                        readOnly={!isEditingSettings}
                        value={profileMobile} 
                        onChange={(e) => setProfileMobile(e.target.value)}
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none font-mono ${
                          isEditingSettings 
                            ? 'bg-surface-container-high border border-primary ring-1 ring-primary/40 text-on-surface' 
                            : 'bg-surface-container-low border border-surface-container-highest text-on-surface-variant cursor-default'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-body-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">Time Zone &amp; Region</label>
                      <input 
                        type="text" 
                        readOnly={!isEditingSettings}
                        value={profileRegion} 
                        onChange={(e) => setProfileRegion(e.target.value)}
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${
                          isEditingSettings 
                            ? 'bg-surface-container-high border border-primary ring-1 ring-primary/40 text-on-surface' 
                            : 'bg-surface-container-low border border-surface-container-highest text-on-surface-variant cursor-default'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Security Toggles */}
                  <div className="divide-y divide-surface-container-high mt-space-lg pt-space-2xs border-t border-surface-container-high space-y-2">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-body-sm font-semibold text-on-surface">Biometric Quick Barrier Authorization</div>
                        <div className="text-body-xs text-secondary">Use FaceID or Fingerprint sensor to approve rapid barrier exit payments.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioLogin}
                          onChange={(e) => {
                            setBioLogin(e.target.checked);
                            showToast(e.target.checked ? "Biometric quick barrier enabled" : "Biometric quick barrier disabled");
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </label>
                    </div>

                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-body-sm font-semibold text-on-surface">Two-Factor Authentication (2FA)</div>
                        <div className="text-body-xs text-secondary">Send SMS one-time verification passcode for extended multi-day parking.</div>
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

                  <div className="pt-space-md border-t border-surface-container-high flex flex-wrap items-center justify-between gap-space-xs">
                    <span className="text-body-xs text-secondary">
                      {isEditingSettings ? "Click Save Changes to preserve your updated profile details." : "Click Edit Details above to modify your personal information."}
                    </span>

                    <div className="flex items-center space-x-space-xs">
                      {isEditingSettings ? (
                        <>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-md font-semibold border border-surface-container-highest transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                          >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            <span>Save Changes</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => showToast("Password change email sent to " + profileEmail)}
                            className="px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-label-md font-semibold border border-surface-container-highest transition-colors cursor-pointer"
                          >
                            Change Password
                          </button>

                          <button
                            type="button"
                            onClick={handleStartEdit}
                            className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            <span>Edit Details</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}

          </section>

        </div>

      </div>
    </div>
  );
}
