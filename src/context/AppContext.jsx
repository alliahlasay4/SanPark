import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PARKING_HUBS, 
  INITIAL_VEHICLES, 
  INITIAL_PAYMENTS, 
  INITIAL_MANAGER_SESSIONS, 
  INITIAL_USER_HISTORY,
  INITIAL_SLOTS 
} from '../data/parkingData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeView, setActiveView] = useState('find-parking');
  const [hubs, setHubs] = useState(INITIAL_PARKING_HUBS);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [sessions, setSessions] = useState(INITIAL_MANAGER_SESSIONS);
  const [history, setHistory] = useState(INITIAL_USER_HISTORY);
  
  // Floor plan & booking modal state
  const [floorPlanModalOpen, setFloorPlanModalOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState(INITIAL_PARKING_HUBS[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeLevel, setActiveLevel] = useState('B1');
  const [slotsState, setSlotsState] = useState(INITIAL_SLOTS);

  // Mall Manager Controls
  const [surgePricingActive, setSurgePricingActive] = useState(true);
  const [maintenanceB2Lock, setMaintenanceB2Lock] = useState(false);
  const [valetOverflowQueue, setValetOverflowQueue] = useState(false);

  // Toast / notification banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const selectedVehicle = vehicles.find(v => v.isDefault) || vehicles[0];

  const setDefaultVehicle = (id) => {
    setVehicles(prev => prev.map(v => ({
      ...v,
      isDefault: v.id === id
    })));
    showToast("Default vehicle updated");
  };

  const addVehicle = (newVehicle) => {
    const vehicleObj = {
      id: `v-${Date.now()}`,
      ...newVehicle,
      isDefault: vehicles.length === 0,
    };
    setVehicles(prev => [...prev, vehicleObj]);
    showToast(`Registered vehicle: ${vehicleObj.model}`);
  };

  const setPrimaryPayment = (id) => {
    setPayments(prev => prev.map(p => ({
      ...p,
      isPrimary: p.id === id
    })));
    showToast("Primary payment method updated");
  };

  const addPaymentMethod = (newPayment) => {
    const paymentObj = {
      id: `p-${Date.now()}`,
      ...newPayment,
      isPrimary: false,
    };
    setPayments(prev => [...prev, paymentObj]);
    showToast(`Added payment method: ${paymentObj.name}`);
  };

  const openFloorPlan = (hub) => {
    setSelectedHub(hub);
    setSelectedSlot(null);
    setFloorPlanModalOpen(true);
  };

  const closeFloorPlan = () => {
    setFloorPlanModalOpen(false);
    setSelectedSlot(null);
  };

  const selectSlot = (slotId) => {
    setSelectedSlot(slotId);
  };

  const bookSlot = (hub, slotId) => {
    if (!slotId) return;
    
    // Mark slot as occupied
    setSlotsState(prev => {
      const currentLevelSlots = prev[activeLevel] || [];
      const updated = currentLevelSlots.map(s => s.id === slotId ? { ...s, status: 'occupied' } : s);
      return {
        ...prev,
        [activeLevel]: updated
      };
    });

    // Reduce slot count in hub
    setHubs(prev => prev.map(h => h.id === hub.id ? { ...h, slotsLeft: Math.max(0, h.slotsLeft - 1) } : h));

    // Add session to manager portal
    const newSession = {
      id: `ses-${Date.now()}`,
      vehicle: selectedVehicle.model,
      plate: selectedVehicle.plate.replace(/[^A-Za-z0-9-]/g, ' ').trim(),
      category: selectedVehicle.isEv ? 'EV' : 'SED',
      bay: `${activeLevel}-${slotId}`,
      driver: 'Mark Cruz',
      duration: 'Just reserved',
      remaining: '04:00:00 remaining',
      status: 'Active Session',
      amount: Math.round(hub.baseRate * (surgePricingActive ? 1.2 : 1.0) * 4)
    };
    setSessions(prev => [newSession, ...prev]);

    closeFloorPlan();
    showToast(`Successfully locked slot ${slotId} at ${hub.name}!`);
    setActiveView('my-bookings');
  };

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      hubs,
      vehicles,
      selectedVehicle,
      setDefaultVehicle,
      addVehicle,
      payments,
      setPrimaryPayment,
      addPaymentMethod,
      sessions,
      history,
      floorPlanModalOpen,
      openFloorPlan,
      closeFloorPlan,
      selectedHub,
      selectedSlot,
      selectSlot,
      activeLevel,
      setActiveLevel,
      slotsState,
      bookSlot,
      surgePricingActive,
      setSurgePricingActive,
      maintenanceB2Lock,
      setMaintenanceB2Lock,
      valetOverflowQueue,
      setValetOverflowQueue,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
