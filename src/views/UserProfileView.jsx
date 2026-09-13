import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import VehicleModal from '../components/VehicleModal';
import PaymentModal from '../components/PaymentModal';

export default function UserProfileView() {
  const navigate = useNavigate();
  const {
    hubs,
    vehicles,
    setDefaultVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    payments,
    setPrimaryPayment,
    history,
    signOut,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('garage');
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showQuickAddDrawer, setShowQuickAddDrawer] = useState(false);

  // Parking History Filter States
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyFacilityFilter, setHistoryFacilityFilter] = useState('all');
  const [historyVehicleFilter, setHistoryVehicleFilter] = useState('all');
  const [historyMonthFilter, setHistoryMonthFilter] = useState('all');
  const [historyMethodFilter, setHistoryMethodFilter] = useState('all');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // History filtering logic
  const filteredHistory = history.filter(item => {
    if (historySearchQuery.trim()) {
      const q = historySearchQuery.toLowerCase();
      const matches = 
        item.mall.toLowerCase().includes(q) ||
        (item.ref && item.ref.toLowerCase().includes(q)) ||
        item.vehicle.toLowerCase().includes(q) ||
        (item.bayType && item.bayType.toLowerCase().includes(q)) ||
        (item.method && item.method.toLowerCase().includes(q));
      if (!matches) return false;
    }

    if (historyFacilityFilter !== 'all') {
      if (item.facilityId !== historyFacilityFilter && !item.mall.toLowerCase().includes(historyFacilityFilter.toLowerCase())) {
        return false;
      }
    }

    if (historyVehicleFilter !== 'all') {
      if (item.vehicleId !== historyVehicleFilter && !item.vehicle.toLowerCase().includes(historyVehicleFilter.toLowerCase())) {
        return false;
      }
    }

    if (historyMonthFilter !== 'all') {
      if (item.month !== historyMonthFilter && !item.date.includes(historyMonthFilter)) {
        return false;
      }
    }

    if (historyMethodFilter !== 'all') {
      if (item.method !== historyMethodFilter && !item.paymentDetail?.toLowerCase().includes(historyMethodFilter.toLowerCase())) {
        return false;
      }
    }

    if (historyStatusFilter !== 'all') {
      if (item.status !== historyStatusFilter) {
        return false;
      }
    }

    return true;
  });

  const totalFilteredSpent = filteredHistory.reduce((sum, h) => {
    const amt = h.numericAmount || parseFloat((h.amount || '0').replace(/[^0-9.]/g, '')) || 0;
    return sum + amt;
  }, 0);

  const totalFilteredPoints = filteredHistory.reduce((sum, h) => sum + (h.pointsEarned || 15), 0);

  const hasActiveHistoryFilters = 
    historySearchQuery.trim() !== '' ||
    historyFacilityFilter !== 'all' ||
    historyVehicleFilter !== 'all' ||
    historyMonthFilter !== 'all' ||
    historyMethodFilter !== 'all' ||
    historyStatusFilter !== 'all';

  const handleResetHistoryFilters = () => {
    setHistorySearchQuery('');
    setHistoryFacilityFilter('all');
    setHistoryVehicleFilter('all');
    setHistoryMonthFilter('all');
    setHistoryMethodFilter('all');
    setHistoryStatusFilter('all');
    showToast("Cleared all history filters");
  };

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
    addVehicle({
      model: newVehModel.trim(),
      plate: newVehPlate.trim().toUpperCase(),
      type: newVehType,
      color: 'Standard',
      isEv: newVehType.includes('EV') || newVehType.includes('Electric'),
      anpr: newVehAnpr,
      rfid: true
    });
    setShowQuickAddDrawer(false);
    setNewVehPlate('');
    setNewVehModel('');
  };

  const handleOpenAddVehicle = () => {
    setEditingVehicle(null);
    setVehicleModalOpen(true);
  };

  const handleOpenManageModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleModalOpen(true);
  };

  return (
    <div className="w-full flex-grow py-space-lg px-container-margin md:px-space-xl text-on-surface">

      {/* Modals */}
      <VehicleModal
        isOpen={vehicleModalOpen}
        onClose={() => {
          setVehicleModalOpen(false);
          setEditingVehicle(null);
        }}
        vehicleToEdit={editingVehicle}
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
                      navigate('/login');
                    }}
                    className="w-full py-space-2xs px-space-xs rounded-lg bg-primary-container/10 hover:bg-primary-container/20 text-primary hover:text-primary text-label-md font-semibold border border-primary-container/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                      onClick={handleOpenAddVehicle}
                      className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md font-bold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>+ Add New Vehicle</span>
                    </button>
                  </div>

                  {/* Registered Vehicles List */}
                  <div className="space-y-space-xs mt-space-md">
                    {vehicles.map((v) => (
                      <div
                        key={v.id}
                        className={`p-space-md rounded-2xl border transition-all hover:border-surface-bright flex flex-col md:flex-row md:items-center justify-between gap-space-md ${
                          v.isDefault
                            ? 'bg-surface-container-low border-l-4 border-l-primary border-surface-container-highest shadow-md'
                            : 'bg-surface-container-low border-surface-container-highest'
                        }`}
                      >
                        {/* Left: Icon & Main Vehicle Info */}
                        <div className="flex items-start sm:items-center space-x-3.5 min-w-0 flex-1">
                          <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border ${
                            v.isEv 
                              ? 'bg-blue-950/50 border-blue-800/40 text-blue-400 shadow-sm' 
                              : 'bg-surface-container-high border-surface-container-highest text-primary'
                          }`}>
                            <span className="material-symbols-outlined text-[26px]">
                              {v.isEv ? 'electric_car' : 'directions_car'}
                            </span>
                          </div>

                          <div className="min-w-0 space-y-1">
                            {/* Title & Badges Row */}
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-title-md font-bold text-on-surface tracking-tight">{v.model}</h4>
                              
                              {v.isDefault && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-container/20 text-primary border border-primary/30 uppercase tracking-wider whitespace-nowrap">
                                  Primary / Default
                                </span>
                              )}
                              {v.isEv && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/30 text-blue-300 border border-blue-700/30 whitespace-nowrap">
                                  EV Ready
                                </span>
                              )}
                              {v.anpr !== false && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 whitespace-nowrap">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  ANPR Active
                                </span>
                              )}
                            </div>

                            {/* Attributes Sub-row */}
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-body-xs text-secondary">
                              <span className="font-medium text-on-surface-variant">
                                {v.type || 'Sedan'}{v.color ? ` • ${v.color}` : ''}
                              </span>
                              <span className="text-outline/40">•</span>
                              <span className="inline-flex items-center gap-1 text-on-surface-variant whitespace-nowrap">
                                <span className="material-symbols-outlined text-[14px] text-primary">nfc</span>
                                <span>RFID Tag Linked</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Plate Badge & Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-space-md shrink-0 w-full md:w-auto pt-space-xs md:pt-0 border-t md:border-t-0 border-surface-container-high/60">
                          {/* License Plate Badge */}
                          <div className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest border border-surface-container-highest text-on-surface font-mono text-body-xs font-bold tracking-wider shadow-inner whitespace-nowrap select-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-secondary">badge</span>
                            <span>{v.plate}</span>
                          </div>

                          {/* Buttons */}
                          <div className="flex items-center gap-2">
                            {!v.isDefault && (
                              <button
                                type="button"
                                onClick={() => setDefaultVehicle(v.id)}
                                className="px-3 py-1.5 rounded-lg text-body-xs font-semibold text-primary hover:text-primary/80 hover:bg-primary-container/10 transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Set as Default
                              </button>
                            )}
                            
                            <button
                              type="button"
                              onClick={() => handleOpenManageModal(v)}
                              className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-body-xs font-semibold text-on-surface border border-surface-container-highest hover:border-primary/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
                            >
                              <span className="material-symbols-outlined text-[15px]">tune</span>
                              <span>Manage</span>
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
                <div className="bg-surface-container border border-surface-container-highest rounded-2xl p-space-lg shadow-md space-y-space-md">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-surface-container-high gap-space-xs">
                    <div>
                      <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">manage_history</span>
                        <span>All Parking Passes &amp; Validations ({filteredHistory.length})</span>
                      </h3>
                      <p className="text-body-xs text-secondary mt-0.5">Complete digital logs of all parking stays across all accredited facilities</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Exporting ${filteredHistory.length} filtered parking log(s) to PDF...`)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high text-body-xs font-semibold text-on-surface border border-surface-container-highest hover:bg-surface-bright flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">picture_as_pdf</span>
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Control Ribbon */}
                  <div className="bg-surface-container-low border border-surface-container-highest rounded-xl p-space-sm space-y-space-xs">
                    {/* Search Bar */}
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">search</span>
                      <input
                        type="text"
                        value={historySearchQuery}
                        onChange={(e) => setHistorySearchQuery(e.target.value)}
                        placeholder="Search by facility, reference ID (e.g. SP-8821), or plate..."
                        className="w-full bg-surface-container-high text-on-surface text-body-xs rounded-lg pl-9 pr-8 py-2 border border-surface-container-highest focus:outline-none focus:border-primary transition-colors"
                      />
                      {historySearchQuery && (
                        <button
                          type="button"
                          onClick={() => setHistorySearchQuery('')}
                          className="absolute right-2 text-secondary hover:text-on-surface p-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                    </div>

                    {/* Filter Select Dropdowns Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                      {/* Facility Dropdown */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1 block">Facility</label>
                        <select
                          value={historyFacilityFilter}
                          onChange={(e) => setHistoryFacilityFilter(e.target.value)}
                          className="w-full bg-surface-container-high border border-surface-container-highest text-on-surface text-body-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="all">All Facilities</option>
                          {hubs.map(h => (
                            <option key={h.id} value={h.id}>{h.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Vehicle Dropdown */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1 block">Vehicle</label>
                        <select
                          value={historyVehicleFilter}
                          onChange={(e) => setHistoryVehicleFilter(e.target.value)}
                          className="w-full bg-surface-container-high border border-surface-container-highest text-on-surface text-body-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="all">All Vehicles</option>
                          {vehicles.map(v => (
                            <option key={v.id} value={v.id}>{v.model} ({v.plate})</option>
                          ))}
                        </select>
                      </div>

                      {/* Time / Month Dropdown */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1 block">Month / Period</label>
                        <select
                          value={historyMonthFilter}
                          onChange={(e) => setHistoryMonthFilter(e.target.value)}
                          className="w-full bg-surface-container-high border border-surface-container-highest text-on-surface text-body-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="all">All Time</option>
                          <option value="Sep 2026">Sep 2026 (This Month)</option>
                          <option value="Aug 2026">Aug 2026</option>
                          <option value="Jul 2026">Jul 2026</option>
                        </select>
                      </div>

                      {/* Payment Method Dropdown */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1 block">Payment Method</label>
                        <select
                          value={historyMethodFilter}
                          onChange={(e) => setHistoryMethodFilter(e.target.value)}
                          className="w-full bg-surface-container-high border border-surface-container-highest text-on-surface text-body-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option value="all">All Methods</option>
                          <option value="GCash">GCash Wallet</option>
                          <option value="Visa">Visa Card</option>
                          <option value="Maya">Maya Wallet</option>
                          <option value="SanWallet">SanWallet Balance</option>
                        </select>
                      </div>
                    </div>

                    {/* Filter Status Bar & Reset Option */}
                    {hasActiveHistoryFilters && (
                      <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-body-xs">
                        <span className="text-primary font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">filter_list</span>
                          <span>Filters active: {filteredHistory.length} of {history.length} passes match</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleResetHistoryFilters}
                          className="text-secondary hover:text-on-surface underline font-medium cursor-pointer"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Summary KPI Cards */}
                  <div className="grid grid-cols-3 gap-space-xs text-body-xs">
                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-highest">
                      <div className="text-secondary text-[11px] font-medium">Filtered Stays</div>
                      <div className="text-title-md font-bold text-on-surface">{filteredHistory.length} Visits</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-highest">
                      <div className="text-secondary text-[11px] font-medium">Total Paid</div>
                      <div className="text-title-md font-bold text-emerald-400 font-mono">₱{totalFilteredSpent.toFixed(2)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-highest">
                      <div className="text-secondary text-[11px] font-medium">Points Earned</div>
                      <div className="text-title-md font-bold text-primary">+{totalFilteredPoints} PTS</div>
                    </div>
                  </div>

                  {/* History Item Cards List */}
                  <div className="space-y-space-xs">
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((h) => (
                        <div
                          key={h.id}
                          className="p-space-md bg-surface-container-low border border-surface-container-highest rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:border-primary/40 transition-all shadow-sm"
                        >
                          {/* Left Info */}
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-body-md text-on-surface">{h.mall}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container-highest text-secondary border border-surface-container-high">
                                {h.ref || 'SP-PASS'}
                              </span>
                              {h.status === 'EV Pass Validated' ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/40 text-blue-300 border border-blue-800/40 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">electric_car</span>
                                  {h.status}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                                  {h.status || 'Completed'}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-body-xs text-secondary">
                              <span>{h.date}</span>
                              <span>•</span>
                              <span>{h.duration}</span>
                              <span>•</span>
                              <span className="text-on-surface-variant font-medium">{h.vehicle}</span>
                              {h.bayType && (
                                <>
                                  <span>•</span>
                                  <span className="text-primary font-medium">{h.bayType}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Right Payment & Receipt Button */}
                          <div className="flex items-center justify-between md:justify-end gap-space-md pt-space-2xs md:pt-0 border-t md:border-t-0 border-surface-container-high/60">
                            <div className="text-left md:text-right">
                              <div className="font-bold text-on-surface font-mono text-body-md">{h.amount}</div>
                              <div className="text-[11px] text-secondary flex items-center gap-1">
                                <span>{h.paymentDetail || h.method}</span>
                                <span className="text-emerald-400 font-bold">+{h.pointsEarned || 15} Pts</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedReceipt(h)}
                              className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-body-xs font-semibold text-on-surface border border-surface-container-highest flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
                            >
                              <span className="material-symbols-outlined text-[15px] text-primary">receipt_long</span>
                              <span>e-Receipt</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-space-xl text-center bg-surface-container-low border border-surface-container-highest rounded-xl space-y-space-xs">
                        <span className="material-symbols-outlined text-[36px] text-secondary">filter_alt_off</span>
                        <h4 className="text-body-md font-bold text-on-surface">No parking passes match your selected filters</h4>
                        <p className="text-body-xs text-secondary">Try searching for a different keyword or resetting your filter criteria.</p>
                        <button
                          type="button"
                          onClick={handleResetHistoryFilters}
                          className="mt-2 px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary-container text-body-xs font-bold shadow-md cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Digital e-Receipt Modal */}
            {selectedReceipt && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
                <div className="bg-surface-container max-w-lg w-full rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden flex flex-col my-8">
                  {/* Modal Header */}
                  <div className="px-space-lg py-space-md bg-surface-container-high border-b border-surface-container-highest flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-primary-container/30 border border-primary/30 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                      </div>
                      <div>
                        <h3 className="text-title-md font-bold text-on-surface">Digital Tax e-Receipt</h3>
                        <p className="text-body-xs text-secondary font-mono">Ref: {selectedReceipt.ref || 'SP-EOR-991201'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(null)}
                      className="w-8 h-8 rounded-full bg-surface-container-lowest hover:bg-surface-bright flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  {/* Receipt Canvas Container */}
                  <div className="p-space-lg space-y-space-md max-h-[75vh] overflow-y-auto bg-surface-container-lowest/40">
                    {/* Thermal Receipt Paper Card */}
                    <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-space-lg shadow-inner space-y-space-md relative overflow-hidden">
                      {/* Decorative Top Accent Ribbon */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-cyan-400"></div>

                      {/* Merchant Header */}
                      <div className="text-center space-y-1 pb-space-sm border-b border-dashed border-surface-container-high">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-container/30 text-primary border border-primary/20">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          <span>SANPARK PHILIPPINES INC.</span>
                        </div>
                        <h4 className="text-title-md font-extrabold text-on-surface tracking-tight">Official Electronic Tax Receipt</h4>
                        <p className="text-[11px] text-secondary font-mono">TIN: {selectedReceipt.tin || '009-842-115-000-VAT'}</p>
                        <p className="text-[10px] text-secondary font-mono">BIR Permit No: BIR-2026-SP-99214-MNL</p>
                        <p className="text-[10px] text-secondary font-mono">{selectedReceipt.terminal || 'Terminal Gate 1 (Main Entry)'}</p>
                      </div>

                      {/* Status & Total Banner */}
                      <div className="text-center p-space-md bg-surface-container-low/90 rounded-xl border border-surface-container-highest space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold block">Total Amount Paid</span>
                        <div className="text-headline-lg font-black text-on-surface font-mono tracking-tight">{selectedReceipt.amount}</div>
                        <div className="flex items-center justify-center gap-2 pt-0.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span>
                            <span>Payment Verified • {selectedReceipt.status || 'Completed'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Session Metadata Grid */}
                      <div className="grid grid-cols-2 gap-space-xs text-body-xs bg-surface-container-low/40 p-space-sm rounded-xl border border-surface-container-high/60">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Facility / Hub</span>
                          <span className="font-semibold text-on-surface block leading-tight">{selectedReceipt.mall}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Bay Assignment</span>
                          <span className="font-bold text-primary block leading-tight">{selectedReceipt.bayType || 'Standard Bay'}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Date</span>
                          <span className="font-medium text-on-surface font-mono">{selectedReceipt.date}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Stay Duration</span>
                          <span className="font-medium text-on-surface font-mono">{selectedReceipt.duration}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Entry Timestamp</span>
                          <span className="font-medium text-on-surface font-mono">{selectedReceipt.entryTime || '09:00 AM'}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-secondary uppercase font-semibold block">Exit Timestamp</span>
                          <span className="font-medium text-on-surface font-mono">{selectedReceipt.exitTime || '01:30 PM'}</span>
                        </div>
                      </div>

                      {/* Itemized Calculation Breakdown */}
                      <div className="space-y-space-xs text-body-xs">
                        <div className="flex items-center justify-between text-[11px] font-bold text-secondary uppercase tracking-wider pb-1 border-b border-surface-container-high">
                          <span>Description</span>
                          <span>Amount</span>
                        </div>

                        <div className="flex justify-between py-0.5 text-on-surface">
                          <div>
                            <span className="font-medium">Parking Rate ({selectedReceipt.category || 'Standard'})</span>
                            <span className="block text-[10px] text-secondary font-mono">
                              {selectedReceipt.hours || '4.0'} hrs @ ₱{(selectedReceipt.ratePerHour || 50).toFixed(2)}/hr
                            </span>
                          </div>
                          <span className="font-mono font-medium">₱{((selectedReceipt.hours || 4) * (selectedReceipt.ratePerHour || 50)).toFixed(2)}</span>
                        </div>

                        <div className="pt-2 border-t border-dashed border-surface-container-high space-y-1 text-secondary text-[11px]">
                          <div className="flex justify-between">
                            <span>Subtotal (Net of VAT)</span>
                            <span className="font-mono text-on-surface">{selectedReceipt.subtotal || '₱178.57'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Value Added Tax (12% VAT)</span>
                            <span className="font-mono text-on-surface">{selectedReceipt.vat || '₱21.43'}</span>
                          </div>
                          <div className="flex justify-between font-bold text-on-surface pt-1 border-t border-surface-container-high text-body-xs">
                            <span>Total Amount Due</span>
                            <span className="font-mono text-primary text-body-sm">{selectedReceipt.amount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment & Audit Info */}
                      <div className="space-y-space-xs text-[11px] bg-surface-container-low/60 p-space-sm rounded-xl border border-surface-container-high">
                        <div className="flex justify-between">
                          <span className="text-secondary">Vehicle Registered</span>
                          <span className="font-medium text-on-surface">{selectedReceipt.vehicle} ({selectedReceipt.plate || 'N/A'})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Payment Method</span>
                          <span className="font-medium text-on-surface">{selectedReceipt.paymentDetail || selectedReceipt.method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">Transaction ID</span>
                          <span className="font-mono text-on-surface font-semibold">{selectedReceipt.transactionId || 'TXN-SP-881920'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary">SanPark Rewards</span>
                          <span className="font-bold text-emerald-400">+{selectedReceipt.pointsEarned || 20} PTS Earned</span>
                        </div>
                      </div>

                      {/* Barcode graphic */}
                      <div className="pt-space-xs border-t border-dashed border-surface-container-high text-center space-y-1.5">
                        <div className="bg-white/90 p-2.5 rounded-lg inline-block w-full max-w-[260px] shadow-sm">
                          {/* CSS simulated barcode lines */}
                          <div className="h-10 w-full flex items-center justify-between gap-[2px]">
                            {[3,1,2,4,1,3,2,1,4,2,1,3,1,2,3,4,1,2,1,3,2,4,1,2,3,1,2,4,1,3].map((w, idx) => (
                              <div key={idx} className="h-full bg-slate-900" style={{ width: `${w * 2.5}px` }}></div>
                            ))}
                          </div>
                          <span className="text-[10px] font-mono tracking-widest text-slate-800 font-bold block mt-1">
                            *{selectedReceipt.ref || 'SP-EOR-991201'}*
                          </span>
                        </div>
                        <p className="text-[10px] text-secondary font-mono tracking-tight">
                          BIR Electronic Receipt • System Generated • Non-transferable
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="p-space-md bg-surface-container-high border-t border-surface-container-highest flex items-center justify-between gap-space-xs">
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Printing Tax e-Receipt (${selectedReceipt.ref || 'SP-EOR'})...`);
                        window.print();
                      }}
                      className="flex-1 py-2 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface text-body-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">print</span>
                      <span>Print</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Downloading PDF e-Receipt (${selectedReceipt.ref || 'SP-EOR'})...`);
                        setSelectedReceipt(null);
                      }}
                      className="flex-1 py-2 rounded-xl bg-primary-container text-on-primary-container text-body-xs font-bold shadow-md hover:bg-primary-container/90 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Download PDF</span>
                    </button>
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
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${isEditingSettings
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
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${isEditingSettings
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
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none font-mono ${isEditingSettings
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
                        className={`w-full rounded-lg px-3.5 py-2 text-body-sm transition-all focus:outline-none ${isEditingSettings
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
