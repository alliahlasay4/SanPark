import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function FloorPlanModal() {
  const navigate = useNavigate();
  const { 
    floorPlanModalOpen, 
    closeFloorPlan, 
    selectedHub, 
    selectedSlot, 
    selectSlot, 
    activeLevel, 
    setActiveLevel, 
    slotsState,
    bookSlot,
    surgePricingActive 
  } = useApp();

  if (!floorPlanModalOpen || !selectedHub) return null;

  const currentSlots = slotsState[activeLevel] || [];
  const currentRate = Math.round(selectedHub.baseRate * (surgePricingActive ? 1.2 : 1.0));

  const handleProceedCheckout = () => {
    if (!selectedSlot) return;
    bookSlot(selectedHub, selectedSlot);
    navigate('/my-bookings');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container w-full max-w-4xl rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-space-md bg-surface-container-high flex items-center justify-between border-b border-surface-container-highest">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-headline-lg font-headline-lg text-on-surface" id="modal-title">
                {selectedHub.name}
              </h2>
              {surgePricingActive && (
                <span className="bg-primary-container/20 text-primary text-label-sm px-2 py-0.5 rounded font-semibold">
                  +20% Surge Active
                </span>
              )}
            </div>
            <p className="text-body-sm text-secondary">
              Level {activeLevel} Basement • Interactive Bay Selector • {selectedHub.distance}
            </p>
          </div>
          <button
            id="close-floorplan-btn"
            onClick={closeFloorPlan}
            className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Level Switcher & Legend */}
        <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container-high">
          <div className="flex items-center space-x-space-2xs">
            <span className="text-label-md text-secondary mr-2 hidden sm:inline">Select Level:</span>
            {['B1', 'B2', 'B3'].map(lvl => (
              <button
                key={lvl}
                id={`btn-${lvl}`}
                onClick={() => setActiveLevel(lvl)}
                className={`px-space-md py-1.5 rounded-lg text-label-md font-semibold transition-all ${
                  activeLevel === lvl
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-space-sm text-label-sm text-secondary">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded bg-surface-container-highest border border-outline/40"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded bg-primary-container"></span>
              <span className="text-on-surface font-medium">Selected</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded bg-surface-container-lowest opacity-40"></span>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded bg-tertiary-container/30 border border-tertiary"></span>
              <span className="text-tertiary">EV Bay</span>
            </div>
          </div>
        </div>

        {/* Floor Plan Slots Grid Canvas */}
        <div className="p-space-md overflow-y-auto flex-grow bg-surface-container-lowest/50">
          <div className="border border-dashed border-surface-container-high rounded-xl p-space-md">
            
            <div className="flex items-center justify-between text-label-sm text-secondary mb-4 pb-2 border-b border-surface-container-high">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-primary text-[18px]">south</span>
                <span>ENTRY BARRIER &amp; BOOM GATE</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>EXIT TERMINAL</span>
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">north</span>
              </div>
            </div>

            {/* Parking Slot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-space-xs">
              {currentSlots.map(slot => {
                const isOccupied = slot.status === 'occupied';
                const isSelected = selectedSlot === slot.id;
                const isEv = slot.type.includes('EV');

                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    disabled={isOccupied}
                    onClick={() => selectSlot(slot.id)}
                    className={`p-3 rounded-lg text-center transition-all flex flex-col items-center justify-center border ${
                      isOccupied
                        ? 'bg-surface-container-lowest opacity-35 cursor-not-allowed border-transparent text-secondary'
                        : isSelected
                        ? 'bg-primary-container text-on-primary-container border-primary shadow-lg scale-105 ring-2 ring-primary/40'
                        : isEv
                        ? 'bg-surface-container-high hover:bg-tertiary/20 text-on-surface border-tertiary/30 hover:border-tertiary cursor-pointer'
                        : 'bg-surface-container-high hover:bg-primary/20 text-on-surface border-transparent hover:border-primary cursor-pointer'
                    }`}
                  >
                    <div className="text-headline-sm font-bold flex items-center space-x-1">
                      <span>{slot.id}</span>
                      {isEv && <span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span>}
                    </div>
                    <div className="text-[11px] mt-0.5">
                      {isOccupied ? (
                        <span className="text-error font-medium">Occupied</span>
                      ) : isSelected ? (
                        <span className="font-semibold text-white">Chosen</span>
                      ) : (
                        <span className="text-secondary">{slot.type}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-center text-label-sm text-secondary">
              Central Driving Lane • Max Clear Height 2.2m • Sensor-Assisted Ultrasound Guidance
            </div>
          </div>
        </div>

        {/* Modal Footer Checkout Summary */}
        <div className="p-space-md bg-surface-container-high flex flex-col sm:flex-row items-center justify-between border-t border-surface-container-highest gap-space-sm">
          <div className="flex items-center space-x-space-sm w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-md">
              <span className="material-symbols-outlined text-[24px]">local_parking</span>
            </div>
            <div>
              <div className="text-label-md text-secondary">
                Selected Bay: <strong className="text-on-surface text-body-lg font-bold">{selectedSlot || 'None'}</strong>
                {selectedSlot && <span className="ml-2 text-primary font-medium font-mono">({activeLevel})</span>}
              </div>
              <div className="text-headline-sm text-primary font-semibold">
                ₱{currentRate} <span className="text-body-sm text-secondary font-normal">/ hour</span>
              </div>
            </div>
          </div>

          <button
            id="proceed-checkout-btn"
            disabled={!selectedSlot}
            onClick={handleProceedCheckout}
            className={`w-full sm:w-auto px-space-xl py-3 rounded-lg font-headline-sm text-label-lg transition-all flex items-center justify-center space-x-2 ${
              selectedSlot
                ? 'bg-primary-container text-on-primary-container hover:bg-primary-container/90 shadow-xl shadow-primary-container/30 cursor-pointer'
                : 'bg-surface-container-lowest text-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            <span>Lock &amp; Reserve Slot</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
}
