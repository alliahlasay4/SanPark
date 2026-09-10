import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function MallManagerView() {
  const { 
    sessions, 
    surgePricingActive, 
    setSurgePricingActive,
    maintenanceB2Lock,
    setMaintenanceB2Lock,
    valetOverflowQueue,
    setValetOverflowQueue,
    showToast
  } = useApp();

  const [tableSearch, setTableSearch] = useState('');
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);

  const filteredSessions = sessions.filter(s => {
    if (filterActiveOnly && !s.status.includes('Active')) return false;
    if (!tableSearch.trim()) return true;
    const q = tableSearch.toLowerCase();
    return s.vehicle.toLowerCase().includes(q) ||
           s.plate.toLowerCase().includes(q) ||
           s.driver.toLowerCase().includes(q) ||
           s.bay.toLowerCase().includes(q);
  });

  const handleOverrideZone = () => {
    showToast("Zone emergency override activated: manual barrier release enabled for Level 1");
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      
      {/* Header / Sub-nav Context Bar */}
      <div className="w-full px-container-margin md:px-space-xl py-space-md flex flex-col md:flex-row md:items-center md:justify-between gap-space-sm bg-surface-container-lowest border-b border-surface-container-high">
        <div className="flex items-center space-x-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-on-primary-container text-[22px]">storefront</span>
          </div>
          <div>
            <h1 className="text-headline-lg font-headline-lg tracking-tight text-on-surface">
              Mall Manager Portal
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              SM Megamall Central Atrium &amp; Basement Level 1-3 Space Command
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-space-sm">
          <div className="flex items-center bg-surface-container-high px-space-xs py-space-3xs rounded-lg text-label-md text-secondary border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
            <span>Live Sync Active</span>
          </div>
          <button
            onClick={handleOverrideZone}
            className="bg-primary-container text-on-primary-container px-space-sm py-space-2xs rounded-lg text-label-lg hover:opacity-90 transition-opacity flex items-center space-x-space-3xs shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Override Zone</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full px-container-margin md:px-space-xl py-space-lg flex flex-col space-y-space-lg">
        
        {/* Top Metrics Cards (4-column bento) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-grid-gutter">
          
          {/* Metric 1 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-colors shadow-md border border-surface-container-high">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-label-md uppercase tracking-wider font-semibold">Total Revenue Today</span>
              <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
            </div>
            <div className="my-space-sm">
              <span className="text-headline-xl font-headline-xl text-on-surface font-bold">₱48,250</span>
              <div className="flex items-center mt-1 text-label-sm text-emerald-400">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                <span>+18.4% vs yesterday</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[82%]"></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-colors shadow-md border border-surface-container-high">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-label-md uppercase tracking-wider font-semibold">Current Occupancy</span>
              <span className="material-symbols-outlined text-tertiary text-[22px]">local_parking</span>
            </div>
            <div className="my-space-sm">
              <span className="text-headline-xl font-headline-xl text-on-surface font-bold">
                {maintenanceB2Lock ? '87%' : '78%'}
              </span>
              <div className="flex items-center mt-1 text-label-sm text-on-surface-variant">
                <span>{maintenanceB2Lock ? '390 of 445 bays (B2 Locked)' : '390 of 500 bays filled'}</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className={`h-full ${maintenanceB2Lock ? 'bg-amber-500 w-[87%]' : 'bg-tertiary w-[78%]'}`}></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-colors shadow-md border border-surface-container-high">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-label-md uppercase tracking-wider font-semibold">Active Bookings</span>
              <span className="material-symbols-outlined text-primary-fixed text-[22px]">bookmark_check</span>
            </div>
            <div className="my-space-sm">
              <span className="text-headline-xl font-headline-xl text-on-surface font-bold">{sessions.length + 138}</span>
              <div className="flex items-center mt-1 text-label-sm text-emerald-400">
                <span className="material-symbols-outlined text-[14px] mr-1">schedule</span>
                <span>12 arriving next 15m</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-fixed h-full w-[65%]"></div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-colors shadow-md border border-surface-container-high">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-label-md uppercase tracking-wider font-semibold">EV Station Usage</span>
              <span className="material-symbols-outlined text-tertiary-container text-[22px]">ev_station</span>
            </div>
            <div className="my-space-sm">
              <span className="text-headline-xl font-headline-xl text-on-surface font-bold">94%</span>
              <div className="flex items-center mt-1 text-label-sm text-amber-400">
                <span className="material-symbols-outlined text-[14px] mr-1">bolt</span>
                <span>High Demand (1 free port)</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary-container h-full w-[94%]"></div>
            </div>
          </div>

        </div>

        {/* Middle Section: Capacity Donut & Interactive Space Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-grid-gutter">
          
          {/* Donut Progress & Breakdown (1 col) */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-md border border-surface-container-high">
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="text-headline-md font-headline-md text-on-surface">Capacity Distribution</h2>
              <span className="text-label-sm text-emerald-400 font-medium">Real-time Telemetry</span>
            </div>

            {/* Custom Visual Donut Container */}
            <div className="relative w-48 h-48 mx-auto my-space-sm flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle
                  className="stroke-surface-container-high"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  strokeWidth="12"
                />
                {/* Segment 1: Standard (50%) */}
                <circle
                  className="text-primary-container"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset="50"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                {/* Segment 2: EV / VIP (28%) */}
                <circle
                  className="text-tertiary-container"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset="180"
                  strokeWidth="12"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-headline-xl font-headline-xl font-bold">
                  {maintenanceB2Lock ? '87%' : '78%'}
                </span>
                <span className="text-label-sm text-on-surface-variant">Occupied</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-space-2xs mt-space-md text-body-sm">
              <div className="flex items-center space-x-space-2xs">
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                <span className="text-on-surface-variant">Standard (250)</span>
              </div>
              <div className="flex items-center space-x-space-2xs">
                <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                <span className="text-on-surface-variant">EV Charging (50)</span>
              </div>
              <div className="flex items-center space-x-space-2xs">
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="text-on-surface-variant">VIP / PWD (40)</span>
              </div>
              <div className="flex items-center space-x-space-2xs">
                <span className="w-3 h-3 rounded-full bg-surface-container-high border border-outline/50"></span>
                <span className="text-on-surface-variant">Available ({maintenanceB2Lock ? '55' : '110'})</span>
              </div>
            </div>
          </div>

          {/* Interactive Space Control Panel (2 cols) */}
          <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-md border border-surface-container-high">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <h2 className="text-headline-md font-headline-md text-on-surface">
                    Interactive Space Control Panel
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Manage dynamic pricing surges and maintenance lockdowns instantly.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]">tune</span>
              </div>

              {/* Controls Stack */}
              <div className="space-y-space-md">
                
                {/* Control Item 1: Peak Hours Switch */}
                <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-start space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="material-symbols-outlined text-primary">bolt</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-space-2xs">
                        <span className="text-headline-sm text-on-surface">Peak Hours Surge Pricing</span>
                        <span className={`text-label-sm px-2 py-0.5 rounded font-semibold ${
                          surgePricingActive 
                            ? 'bg-primary-container text-on-primary-container' 
                            : 'bg-surface-container-high text-secondary'
                        }`} id="rate-badge">
                          {surgePricingActive ? 'Active (+20%)' : 'Standard Rates'}
                        </span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant">
                        {surgePricingActive 
                          ? 'Standard rates automatically scaled by 1.2x across all facilities.' 
                          : 'Dynamic pricing disabled; normal base rates applied.'}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="peak-toggle"
                      checked={surgePricingActive}
                      onChange={(e) => {
                        setSurgePricingActive(e.target.checked);
                        showToast(e.target.checked ? "Surge pricing enabled (+20%)" : "Surge pricing disabled");
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>

                {/* Control Item 2: Maintenance Slot Block */}
                <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-start space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
                      <span className="material-symbols-outlined text-amber-400">engineering</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-space-2xs">
                        <span className="text-headline-sm text-on-surface">Basement Level 2 Maintenance Lock</span>
                        <span className={`text-label-sm px-2 py-0.5 rounded font-semibold ${
                          maintenanceB2Lock 
                            ? 'bg-amber-500 text-black' 
                            : 'bg-surface-container-high text-secondary'
                        }`} id="maint-badge">
                          {maintenanceB2Lock ? 'Locked (45 bays)' : 'Normal Operations'}
                        </span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant">
                        Block 45 slots in Level 2 Zone B for scheduled power washing &amp; lighting upgrades.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="maint-toggle"
                      checked={maintenanceB2Lock}
                      onChange={(e) => {
                        setMaintenanceB2Lock(e.target.checked);
                        showToast(e.target.checked ? "Basement Level 2 blocked for maintenance" : "Basement Level 2 reopened");
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>

                {/* Control Item 3: Valet Overflow Gate */}
                <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-start space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center mt-0.5">
                      <span className="material-symbols-outlined text-tertiary">car_rental</span>
                    </div>
                    <div>
                      <span className="text-headline-sm text-on-surface">Valet Overflow Priority Queue</span>
                      <p className="text-body-sm text-on-surface-variant">
                        Route incoming drivers directly to Level 3 reserve bays during rush hour.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valetOverflowQueue}
                      onChange={(e) => {
                        setValetOverflowQueue(e.target.checked);
                        showToast(e.target.checked ? "Valet overflow priority routing active" : "Valet overflow normal");
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-tertiary-container"></div>
                  </label>
                </div>

              </div>
            </div>

            <div className="mt-space-md pt-space-md flex items-center justify-between text-body-sm text-on-surface-variant border-t border-surface-container-high">
              <span>Last automated rule sync: 2 mins ago</span>
              <button 
                onClick={() => showToast("Audited: 12 automatic adjustments in the last 24h")}
                className="text-primary hover:underline flex items-center space-x-1"
              >
                <span>View full rule audit log</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

          </div>

        </div>

        {/* Recent Reservations Table Section */}
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container-high">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-space-md gap-space-sm">
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Recent Reservations &amp; Live Sessions
              </h2>
              <p className="text-body-sm text-on-surface-variant">
                Real-time feed of check-ins, active durations, and revenue generated.
              </p>
            </div>

            <div className="flex items-center space-x-space-xs">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none material-symbols-outlined text-secondary text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search plate or user..."
                  className="bg-surface-container text-on-surface pl-10 pr-4 py-2 rounded-lg text-body-md focus:outline-none focus:ring-1 focus:ring-primary w-64 border border-surface-container-highest"
                />
              </div>
              <button
                onClick={() => setFilterActiveOnly(!filterActiveOnly)}
                className={`px-space-sm py-2 rounded-lg text-label-lg flex items-center space-x-space-3xs border transition-colors ${
                  filterActiveOnly
                    ? 'bg-primary-container text-on-primary-container border-primary'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span>{filterActiveOnly ? 'Active Only' : 'All Feeds'}</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-label-md text-on-surface-variant uppercase tracking-wider bg-surface-container/60">
                  <th className="py-space-xs px-space-sm rounded-l-lg">Vehicle / Plate</th>
                  <th className="py-space-xs px-space-sm">Bay / Level</th>
                  <th className="py-space-xs px-space-sm">Driver</th>
                  <th className="py-space-xs px-space-sm">Duration / Time</th>
                  <th className="py-space-xs px-space-sm">Status</th>
                  <th className="py-space-xs px-space-sm text-right rounded-r-lg">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-md">
                {filteredSessions.map(row => (
                  <tr key={row.id} className="hover:bg-surface-container/40 transition-colors">
                    <td className="py-space-sm px-space-sm">
                      <div className="flex items-center space-x-space-xs">
                        <div className={`w-8 h-8 rounded bg-surface-container-high flex items-center justify-center font-headline-sm text-xs font-bold ${
                          row.category === 'EV' ? 'text-tertiary' : 'text-primary'
                        }`}>
                          {row.category}
                        </div>
                        <div>
                          <div className="font-headline-sm text-on-surface font-semibold">{row.vehicle}</div>
                          <span className="text-body-sm text-on-surface-variant font-mono">{row.plate}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-sm text-on-surface-variant font-mono text-sm">
                      {row.bay}
                    </td>
                    <td className="py-space-sm px-space-sm text-on-surface">
                      {row.driver}
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <div className="text-on-surface">{row.duration}</div>
                      <span className="text-body-sm text-amber-400 font-mono">{row.remaining}</span>
                    </td>
                    <td className="py-space-sm px-space-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-semibold ${
                        row.status === 'Completed'
                          ? 'bg-surface-container-high text-secondary'
                          : row.status === 'Expiring Soon'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/15 text-emerald-400'
                      }`}>
                        {row.status.includes('Active') && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                        )}
                        {row.status}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-sm text-right font-headline-sm font-bold text-on-surface">
                      ₱{row.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
