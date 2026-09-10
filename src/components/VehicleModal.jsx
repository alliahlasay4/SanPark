import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function VehicleModal({ isOpen, onClose }) {
  const { addVehicle } = useApp();
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('Sedan');
  const [color, setColor] = useState('Graphite Gray');
  const [isEv, setIsEv] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model || !plate) return;
    addVehicle({
      model,
      plate,
      type,
      color,
      isEv,
      rfid: true
    });
    setModel('');
    setPlate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container max-w-md w-full p-space-lg rounded-xl shadow-2xl border border-surface-container-highest space-y-space-md">
        
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
          <h3 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary">directions_car</span>
            <span>Add New Vehicle</span>
          </h3>
          <button onClick={onClose} className="text-secondary hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          <div>
            <label className="text-label-md text-secondary block mb-space-3xs">Vehicle Model / Make</label>
            <input
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Mazda 3 Speed or BYD Atto 3"
              className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary"
            />
          </div>

          <div>
            <label className="text-label-md text-secondary block mb-space-3xs">License Plate Number</label>
            <input
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="e.g. NCR • NBH-4821"
              className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md font-mono outline-none border border-surface-container-high focus:border-primary uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-xs">
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs">Body Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Electric">Electric / EV</option>
              </select>
            </div>

            <div>
              <label className="text-label-md text-secondary block mb-space-3xs">Exterior Color</label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Metallic Black"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary"
              >
              </input>
            </div>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={isEv}
              onChange={(e) => setIsEv(e.target.checked)}
              className="accent-primary w-4 h-4 rounded"
            />
            <span className="text-body-sm text-on-surface">EV or Plug-in Hybrid (requires EV charging bays)</span>
          </label>

          <div className="pt-space-xs flex items-center justify-end space-x-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-secondary text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md font-semibold hover:opacity-90 transition-opacity"
            >
              Save Vehicle
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
