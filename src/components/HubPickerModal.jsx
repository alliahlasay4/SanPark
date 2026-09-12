import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function HubPickerModal({ isOpen, onClose }) {
  const { hubs, vehicles, openFloorPlan, createPendingReservation, showToast } = useApp();

  // Selected Hub
  const [selectedHubId, setSelectedHubId] = useState(hubs[0]?.id || 'megamall');

  // Selected Vehicle
  const defaultVeh = vehicles.find(v => v.isDefault) || vehicles[0];
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVeh?.id || '');
  const [customPlate, setCustomPlate] = useState('');
  const [isAddingNewVehicle, setIsAddingNewVehicle] = useState(false);

  // Advance Reservation Details
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const [reservationDate, setReservationDate] = useState(todayStr);
  const [entryTime, setEntryTime] = useState('10:00');
  const [durationHours, setDurationHours] = useState(4);

  if (!isOpen) return null;

  const currentHub = hubs.find(h => h.id === selectedHubId) || hubs[0];
  const activeVehicleObj = vehicles.find(v => v.id === selectedVehicleId) || defaultVeh;

  const calculatedCost = (currentHub?.baseRate || 50) * durationHours;

  const handleProceed = () => {
    if (isAddingNewVehicle && !customPlate.trim()) {
      showToast("Please enter a vehicle license plate");
      return;
    }

    const vehiclePlate = isAddingNewVehicle 
      ? customPlate.toUpperCase() 
      : activeVehicleObj?.plate || 'NCR • NUI-8821';

    const vehicleName = isAddingNewVehicle
      ? 'Custom Vehicle'
      : activeVehicleObj?.model || 'Toyota Vios';

    const formattedEntryTime = (() => {
      if (!entryTime) return '10:00 AM';
      if (entryTime.includes('AM') || entryTime.includes('PM')) return entryTime;
      const [hStr, mStr] = entryTime.split(':');
      let h = parseInt(hStr, 10);
      if (isNaN(h)) return entryTime;
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${mStr || '00'} ${ampm}`;
    })();

    createPendingReservation({
      hub: currentHub,
      vehicle: { model: vehicleName, plate: vehiclePlate },
      reservationDate,
      entryTime: formattedEntryTime,
      durationHours,
    });

    showToast(
      `Configured for ${currentHub.name} (${vehicleName} - ${vehiclePlate}) on ${reservationDate} for ${formattedEntryTime} (${durationHours} hrs).`
    );

    openFloorPlan(currentHub);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-xs sm:p-space-md">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-surface-container border border-surface-container-highest rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-fadeIn">
        
        {/* Header */}
        <div className="px-space-lg py-space-md border-b border-surface-container-highest flex items-center justify-between bg-surface-container-high/60 shrink-0">
          <div className="flex items-center space-x-space-xs">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">edit_calendar</span>
            </div>
            <div>
              <h2 className="text-title-lg font-title-lg text-on-surface">New Reservation &amp; Advance Parking</h2>
              <p className="text-body-sm text-on-surface-variant">Configure location, vehicle, schedule &amp; view interactive floor plan</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-highest/60 hover:bg-surface-bright text-on-surface-variant flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-space-md sm:p-space-lg overflow-y-auto space-y-space-lg max-h-[72vh]">
          
          {/* Section 1: Mall Selection */}
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <label className="text-label-md font-semibold text-on-surface flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">domain</span>
                <span>1. Select Parking Destination Mall</span>
              </label>
              <span className="text-body-xs text-on-surface-variant">{hubs.length} Hubs Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              {hubs.map((hub) => {
                const isSelected = hub.id === selectedHubId;
                return (
                  <div
                    key={hub.id}
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`p-space-sm rounded-xl border transition-all cursor-pointer flex items-center space-x-space-xs ${
                      isSelected
                        ? 'bg-surface-container-highest/90 border-primary shadow-[0_0_12px_rgba(229,9,20,0.15)]'
                        : 'bg-surface-container-low border-surface-container-highest hover:border-surface-bright hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-surface-container-highest bg-surface-container">
                      <img 
                        src={hub.image} 
                        alt={hub.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-label-md font-semibold text-on-surface truncate">{hub.name}</h4>
                        {isSelected && (
                          <span className="material-symbols-outlined text-primary text-[16px] shrink-0">check_circle</span>
                        )}
                      </div>
                      <p className="text-body-xs text-on-surface-variant truncate">{hub.distance} • ₱{hub.baseRate}/hr</p>
                      <p className="text-[11px] text-emerald-400 font-medium">{hub.slotsLeft} slots available</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Vehicle Selection */}
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <label className="text-label-md font-semibold text-on-surface flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">directions_car</span>
                <span>2. Select Vehicle</span>
              </label>
              <button 
                type="button"
                onClick={() => setIsAddingNewVehicle(!isAddingNewVehicle)}
                className="text-body-xs text-primary hover:underline flex items-center space-x-1"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isAddingNewVehicle ? 'list' : 'add'}
                </span>
                <span>{isAddingNewVehicle ? 'Choose Saved Vehicle' : '+ Add New Vehicle'}</span>
              </button>
            </div>

            {!isAddingNewVehicle ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                {vehicles.map((v) => {
                  const isSelected = v.id === selectedVehicleId;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-space-xs px-space-sm rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-surface-container-highest/90 border-primary'
                          : 'bg-surface-container-low border-surface-container-highest hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {v.isEv ? 'electric_car' : 'directions_car'}
                        </span>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-label-md font-semibold text-on-surface">{v.model}</span>
                            {v.isDefault && (
                              <span className="px-1.5 py-0.2 text-[10px] rounded bg-primary/20 text-primary font-bold">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="text-body-xs text-on-surface-variant">{v.plate}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="material-symbols-outlined text-primary text-[18px]">radio_button_checked</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-space-sm bg-surface-container-low border border-surface-container-highest rounded-xl space-y-2">
                <p className="text-body-xs text-on-surface-variant">Enter plate number for temporary/new vehicle reservation:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. NBO-9988"
                    value={customPlate}
                    onChange={(e) => setCustomPlate(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container-high border border-surface-container-highest text-on-surface text-body-sm focus:outline-none focus:border-primary uppercase tracking-wider font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Advance Schedule & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            
            {/* Date & Entry Time */}
            <div className="space-y-space-xs">
              <label className="text-label-md font-semibold text-on-surface flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                <span>3. Date &amp; Entry Time</span>
              </label>

              {/* Date Presets */}
              <div className="flex items-center space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setReservationDate(todayStr)}
                  className={`px-3 py-1 rounded-lg text-body-xs font-medium transition-colors ${
                    reservationDate === todayStr
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-bright'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setReservationDate(tomorrowStr)}
                  className={`px-3 py-1 rounded-lg text-body-xs font-medium transition-colors ${
                    reservationDate === tomorrowStr
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-bright'
                  }`}
                >
                  Tomorrow
                </button>
              </div>

              {/* Custom Date Input & Entry Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-on-surface-variant mb-1 block">Reservation Date</label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-high border border-surface-container-highest text-on-surface text-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-on-surface-variant mb-1 block">Expected Arrival</label>
                  <input
                    type="time"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-high border border-surface-container-highest text-on-surface text-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Parking Duration */}
            <div className="space-y-space-xs">
              <label className="text-label-md font-semibold text-on-surface flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
                <span>4. Parking Duration</span>
              </label>

              <div className="grid grid-cols-4 gap-1.5">
                {[2, 4, 8, 12].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDurationHours(hrs)}
                    className={`py-2 rounded-lg text-label-md font-semibold transition-all flex flex-col items-center justify-center ${
                      durationHours === hrs
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-bright border border-surface-container-highest'
                    }`}
                  >
                    <span>{hrs} hrs</span>
                    <span className="text-[10px] opacity-80">₱{currentHub.baseRate * hrs}</span>
                  </button>
                ))}
              </div>

              {/* Summary Rate Calculation banner */}
              <div className="p-2.5 rounded-xl bg-surface-container-high border border-surface-container-highest flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-on-surface-variant block">Estimated Base Fee</span>
                  <span className="text-label-md font-bold text-on-surface">
                    ₱{currentHub.baseRate} × {durationHours} hrs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-on-surface-variant block">Est. Subtotal</span>
                  <span className="text-title-md font-extrabold text-primary">₱{calculatedCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-space-lg py-space-md border-t border-surface-container-highest bg-surface-container-high/60 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-space-xs rounded-lg bg-surface-container-highest text-on-surface text-label-md font-label-md hover:bg-surface-bright transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleProceed}
            className="px-space-md py-space-xs rounded-lg bg-primary text-white text-label-md font-label-md flex items-center space-x-space-2xs shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:bg-primary/90 transition-all cursor-pointer"
          >
            <span>Proceed to Floor Plan &amp; Select Bay</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
}
