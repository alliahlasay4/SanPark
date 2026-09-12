import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function NewReservationModal({ isOpen, onClose, onReservationCreated }) {
  const { hubs, vehicles, showToast } = useApp();

  const [selectedHubId, setSelectedHubId] = useState(hubs[0]?.id || 'megamall');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 'v1');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('14:00');
  const [durationHours, setDurationHours] = useState(2);
  const [level, setLevel] = useState('B1');
  const [bayType, setBayType] = useState('standard');

  if (!isOpen) return null;

  const currentHub = hubs.find(h => h.id === selectedHubId) || hubs[0];
  const currentVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  const baseRate = currentHub?.baseRate || 50;
  const bayExtra = bayType === 'vip' ? 50 : bayType === 'ev' ? 150 : 0;
  const estimatedTotal = (baseRate * durationHours) + bayExtra;

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationRef = `SP-${Math.floor(1000 + Math.random() * 9000)}-${currentHub.name.slice(0, 3).toUpperCase()}`;

    const newReservation = {
      id: `res-${Date.now()}`,
      ref: reservationRef,
      hub: currentHub,
      mall: currentHub.name,
      vehicle: currentVehicle,
      date,
      time,
      duration: `${durationHours} hour${durationHours > 1 ? 's' : ''}`,
      level,
      bayType,
      amount: `₱${estimatedTotal.toFixed(2)}`,
    };

    if (onReservationCreated) {
      onReservationCreated(newReservation);
    }

    showToast(`Reservation confirmed for ${currentHub.name}! Ref #${reservationRef}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container max-w-lg w-full p-space-lg rounded-2xl shadow-2xl border border-surface-container-highest max-h-[90vh] overflow-y-auto space-y-space-md">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
          <div className="flex items-center space-x-space-2xs">
            <div className="w-9 h-9 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <div>
              <h3 className="text-headline-md font-headline-md text-on-surface">New Reservation</h3>
              <p className="text-body-xs text-secondary">Guaranteed slot hold with instant ANPR barrier sync</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-secondary hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-space-md">
          
          {/* Mall / Hub Selection */}
          <div>
            <label className="text-label-md text-secondary block mb-space-3xs font-medium">
              Target Parking Hub / Mall
            </label>
            <select
              value={selectedHubId}
              onChange={(e) => setSelectedHubId(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
            >
              {hubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} — {hub.slotsLeft} slots left (₱{hub.baseRate}/hr)
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="text-label-md text-secondary block mb-space-3xs font-medium">
              Registered Vehicle
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.model} ({v.plate}) {v.isEv ? '• EV Plug-in' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs font-medium">
                Reservation Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs font-medium">
                Expected Arrival Time
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Duration Chips */}
          <div>
            <label className="text-label-md text-secondary block mb-space-3xs font-medium">
              Estimated Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 8].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => setDurationHours(hrs)}
                  className={`py-2 px-1 text-center rounded-lg text-label-sm font-semibold transition-all border cursor-pointer ${
                    durationHours === hrs
                      ? 'bg-primary-container text-on-primary-container border-transparent shadow-sm'
                      : 'bg-surface-container-low text-secondary border-surface-container-highest/50 hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {hrs === 8 ? 'Whole Day' : `${hrs} Hr${hrs > 1 ? 's' : ''}`}
                </button>
              ))}
            </div>
          </div>

          {/* Level & Bay Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs font-medium">
                Preferred Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
              >
                <option value="B1">Level B1 (Fast Exit)</option>
                <option value="B2">Level B2 (Standard)</option>
                <option value="B3">Level B3 (Covered Hub)</option>
                <option value="P2">Parkade P2 (Direct Lift)</option>
              </select>
            </div>
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs font-medium">
                Bay Category
              </label>
              <select
                value={bayType}
                onChange={(e) => setBayType(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary transition-colors"
              >
                <option value="standard">Standard Slot</option>
                <option value="vip">VIP Barrier Pass (+₱50)</option>
                <option value="ev">EV Fast Charging Bay (+₱150)</option>
              </select>
            </div>
          </div>

          {/* Pricing Calculation Summary Box */}
          <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex items-center justify-between">
            <div>
              <span className="text-label-sm text-secondary block">Guaranteed Rate Hold</span>
              <span className="text-body-xs text-on-surface-variant">15-minute grace period on arrival</span>
            </div>
            <div className="text-right">
              <span className="text-body-xs text-secondary block">Estimated Total</span>
              <span className="text-headline-sm font-headline-sm text-primary font-bold">
                ₱{estimatedTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-space-xs flex items-center justify-end space-x-space-xs border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-secondary text-label-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md font-semibold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(229,9,20,0.3)] flex items-center space-x-1.5"
            >
              <span>Confirm &amp; Lock Slot</span>
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
