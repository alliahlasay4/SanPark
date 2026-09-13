import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function VehicleModal({ isOpen, onClose, vehicleToEdit = null }) {
  const { addVehicle, updateVehicle, deleteVehicle, setDefaultVehicle, showToast } = useApp();

  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('Sedan');
  const [color, setColor] = useState('Silver Metallic');
  const [isEv, setIsEv] = useState(false);
  const [anprActive, setAnprActive] = useState(true);
  const [rfidLinked, setRfidLinked] = useState(true);

  useEffect(() => {
    if (vehicleToEdit) {
      setModel(vehicleToEdit.model || '');
      setPlate(vehicleToEdit.plate || '');
      setType(vehicleToEdit.type || 'Sedan');
      setColor(vehicleToEdit.color || 'Silver Metallic');
      setIsEv(!!vehicleToEdit.isEv);
      setAnprActive(vehicleToEdit.anpr !== false);
      setRfidLinked(vehicleToEdit.rfid !== false);
    } else {
      setModel('');
      setPlate('');
      setType('Sedan');
      setColor('Silver Metallic');
      setIsEv(false);
      setAnprActive(true);
      setRfidLinked(true);
    }
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model.trim() || !plate.trim()) {
      showToast("Please enter both Make/Model and Plate Number.");
      return;
    }

    if (vehicleToEdit) {
      updateVehicle(vehicleToEdit.id, {
        model: model.trim(),
        plate: plate.trim().toUpperCase(),
        type,
        color: color.trim(),
        isEv,
        anpr: anprActive,
        rfid: rfidLinked
      });
    } else {
      addVehicle({
        model: model.trim(),
        plate: plate.trim().toUpperCase(),
        type,
        color: color.trim(),
        isEv,
        anpr: anprActive,
        rfid: rfidLinked
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (vehicleToEdit) {
      deleteVehicle(vehicleToEdit.id);
      onClose();
    }
  };

  const handleMakeDefault = () => {
    if (vehicleToEdit) {
      setDefaultVehicle(vehicleToEdit.id);
      showToast(`${vehicleToEdit.model} is now your default vehicle.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container max-w-lg w-full rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-surface-container-high border-b border-surface-container-highest flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">
                {vehicleToEdit ? 'tune' : 'directions_car'}
              </span>
            </div>
            <div>
              <h3 className="text-title-lg font-bold text-on-surface">
                {vehicleToEdit ? 'Manage Vehicle Details' : 'Register New Vehicle'}
              </h3>
              <p className="text-body-xs text-secondary">
                {vehicleToEdit ? `Edit credentials and settings for ${vehicleToEdit.model}` : 'Add a vehicle to your account for ANPR gate access'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-9 h-9 rounded-full bg-surface-container-lowest hover:bg-surface-bright flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-space-lg overflow-y-auto space-y-space-md">
          
          {/* Make & Model */}
          <div className="space-y-1">
            <label className="text-label-md font-semibold text-on-surface block">
              Make &amp; Model
            </label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Toyota Vios, Honda Civic RS, or Tesla Model 3"
              className="w-full bg-surface-container-low text-on-surface px-space-md py-2.5 rounded-xl text-body-md outline-none border border-surface-container-highest focus:border-primary transition-colors"
            />
          </div>

          {/* License Plate Number */}
          <div className="space-y-1">
            <label className="text-label-md font-semibold text-on-surface block">
              License Plate Number
            </label>
            <input
              type="text"
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="e.g. NCR • NUI-8821 or S7-K992"
              className="w-full bg-surface-container-low text-on-surface px-space-md py-2.5 rounded-xl text-body-md font-mono outline-none border border-surface-container-highest focus:border-primary uppercase tracking-wider transition-colors"
            />
          </div>

          {/* Body Type & Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="space-y-1">
              <label className="text-label-md font-semibold text-on-surface block">
                Body Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-xl text-body-sm outline-none border border-surface-container-highest focus:border-primary cursor-pointer transition-colors"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV / Crossover">SUV / Crossover</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                <option value="MPV / Van">MPV / Van</option>
                <option value="Motorcycle / Scooter">Motorcycle / Scooter</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-label-md font-semibold text-on-surface block">
                Exterior Color / Finish
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Silver Metallic"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-xl text-body-sm outline-none border border-surface-container-highest focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Toggles & Access Controls */}
          <div className="pt-space-xs border-t border-surface-container-high space-y-space-xs">
            <div className="text-label-sm font-semibold uppercase tracking-wider text-secondary">
              Gate Access &amp; Power Capabilities
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-highest cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center space-x-2.5">
                <span className="material-symbols-outlined text-blue-400 text-[20px]">electric_car</span>
                <div>
                  <div className="text-body-sm font-semibold text-on-surface">Electric Vehicle (EV) Ready</div>
                  <div className="text-[11px] text-secondary">Prioritizes EV fast charging bay availability</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isEv}
                onChange={(e) => setIsEv(e.target.checked)}
                className="w-4 h-4 rounded text-primary bg-surface-container border-surface-container-highest accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-highest cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center space-x-2.5">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">videocam</span>
                <div>
                  <div className="text-body-sm font-semibold text-on-surface">ANPR Auto Barrier Gate Lift</div>
                  <div className="text-[11px] text-secondary">Automatic optical plate scanning at entrance booms</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={anprActive}
                onChange={(e) => setAnprActive(e.target.checked)}
                className="w-4 h-4 rounded text-primary bg-surface-container border-surface-container-highest accent-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-highest cursor-pointer hover:bg-surface-container-high transition-colors">
              <div className="flex items-center space-x-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">nfc</span>
                <div>
                  <div className="text-body-sm font-semibold text-on-surface">RFID Tag Linked</div>
                  <div className="text-[11px] text-secondary">Smart windshield transponder for touchless entry</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={rfidLinked}
                onChange={(e) => setRfidLinked(e.target.checked)}
                className="w-4 h-4 rounded text-primary bg-surface-container border-surface-container-highest accent-primary cursor-pointer"
              />
            </label>
          </div>

          {/* Action Footer */}
          <div className="pt-space-sm border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-xs">
            {vehicleToEdit ? (
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-body-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Delete Vehicle</span>
                </button>

                {!vehicleToEdit.isDefault && (
                  <button
                    type="button"
                    onClick={handleMakeDefault}
                    className="px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface border border-surface-container-highest text-body-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">star</span>
                    <span>Set Default</span>
                  </button>
                )}
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-space-md py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-secondary text-body-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-space-lg py-2 rounded-xl bg-primary-container text-on-primary-container text-body-sm font-bold shadow-md hover:bg-primary-container/90 transition-all cursor-pointer"
              >
                {vehicleToEdit ? 'Save Changes' : 'Register Vehicle'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
