import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function FindParkingView() {
  const { hubs, openFloorPlan, vehicles, selectedVehicle, setDefaultVehicle, surgePricingActive } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveCount, setLiveCount] = useState(1482);
  const [highlightedHubId, setHighlightedHubId] = useState(null);

  // Simulate real-time ticker fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredHubs = hubs.filter(hub => {
    if (filter !== 'all' && !hub.amenities.includes(filter)) return false;
    if (!searchQuery.trim()) return true;
    const tokens = searchQuery.toLowerCase().split(/[\s,&]+/).filter(Boolean);
    return tokens.some(t => 
      hub.name.toLowerCase().includes(t) || 
      hub.address.toLowerCase().includes(t)
    );
  });

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] text-on-surface">
      
      {/* Top Secondary Filter / Live Ticker Bar */}
      <div className="w-full bg-surface-container-low px-container-margin md:px-space-xl py-space-xs flex flex-wrap items-center justify-between border-b border-surface-container-high gap-space-xs">
        <div className="flex items-center space-x-space-sm overflow-x-auto py-1">
          <span className="text-label-md text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
            Quick Filters:
          </span>
          {[
            { id: 'all', label: 'All Spots' },
            { id: 'ev', label: 'EV Charging' },
            { id: 'covered', label: 'Covered Only' },
            { id: 'secure', label: '24/7 CCTV' },
          ].map(f => (
            <button
              key={f.id}
              id={`filter-${f.id}`}
              onClick={() => setFilter(f.id)}
              className={`px-space-2xs py-1 rounded-lg text-label-md transition-all whitespace-nowrap ${
                filter === f.id
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-space-xs text-label-md text-secondary">
          <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">radar</span>
          <span>
            Live Ticker:{' '}
            <strong className="text-on-surface font-semibold text-emerald-400">
              {liveCount.toLocaleString()} spots
            </strong>{' '}
            available across Metro Manila
          </span>
        </div>
      </div>

      {/* Airbnb-style Split View Container */}
      <div className="flex flex-col lg:flex-row w-full flex-grow relative">
        
        {/* Left Column: Search Panel & Scrollable Cards */}
        <div className="w-full lg:w-[55%] flex flex-col p-container-margin md:p-space-xl overflow-y-auto space-y-space-md">
          
          {/* Sticky Search Panel */}
          <div className="bg-surface/95 backdrop-blur-xl p-space-md rounded-xl shadow-xl border border-surface-container-high space-y-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-2xs bg-surface-container-low p-space-3xs rounded-lg border border-surface-container-highest">
              
              <div className="p-space-2xs flex flex-col justify-center">
                <span className="text-label-sm text-on-surface-variant uppercase font-medium">Destination</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destination (e.g. BGC, Megamall, Manila Bay)..."
                  className="bg-transparent text-on-surface font-headline-sm focus:outline-none w-full text-base"
                />
              </div>

              <div className="p-space-2xs flex flex-col justify-center md:border-l md:border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant uppercase font-medium">Vehicle</span>
                <select
                  value={selectedVehicle?.id}
                  onChange={(e) => setDefaultVehicle(e.target.value)}
                  className="bg-transparent text-on-surface font-headline-sm focus:outline-none w-full cursor-pointer text-sm"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id} className="bg-surface text-on-surface">
                      {v.model} ({v.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-space-2xs flex flex-col justify-center md:border-l md:border-surface-container-high">
                <span className="text-label-sm text-on-surface-variant uppercase font-medium">Time Range</span>
                <span className="text-on-surface font-headline-sm text-sm truncate">Today, 2:00 PM - 6:00 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-space-2xs text-body-sm text-secondary">
                <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
                <span>Instant automated reservation guaranteed</span>
              </div>
              <button 
                onClick={() => setSearchQuery('BGC')}
                className="bg-primary-container hover:bg-primary-container/90 text-on-primary-container px-space-md py-space-xs rounded-lg font-headline-sm text-label-lg flex items-center space-x-space-2xs transition-all shadow-lg shadow-primary-container/20"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Find Spots</span>
              </button>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between pt-2">
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              {filteredHubs.length} Parking Hubs Available
            </h1>
            <span className="text-label-md text-secondary bg-surface-container px-space-2xs py-space-3xs rounded border border-surface-container-highest">
              Sorted by Proximity
            </span>
          </div>

          {/* Parking Cards List */}
          <div className="space-y-space-md" id="parking-cards-container">
            {filteredHubs.length === 0 ? (
              <div className="bg-surface-container p-8 rounded-xl text-center space-y-3">
                <span className="material-symbols-outlined text-secondary text-[48px]">search_off</span>
                <p className="text-headline-sm text-on-surface">No parking hubs match the current filter</p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg text-label-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredHubs.map(hub => {
                const effectiveRate = Math.round(hub.baseRate * (surgePricingActive ? 1.2 : 1.0));
                const isHighlighted = highlightedHubId === hub.id;

                return (
                  <div
                    key={hub.id}
                    id={`hub-card-${hub.id}`}
                    onMouseEnter={() => setHighlightedHubId(hub.id)}
                    onMouseLeave={() => setHighlightedHubId(null)}
                    className={`group bg-surface-container hover:bg-surface-container-high transition-all duration-200 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row border ${
                      isHighlighted ? 'border-primary shadow-primary/20' : 'border-surface-container-highest'
                    }`}
                  >
                    {/* Card Image with badges */}
                    <div
                      className="relative md:w-5/12 h-48 md:h-auto bg-cover bg-center min-h-[160px]"
                      style={{ backgroundImage: `url('${hub.image}')` }}
                    >
                      <div className={`absolute top-space-2xs left-space-2xs ${hub.badgeColor} px-space-2xs py-space-3xs rounded-md text-label-sm font-semibold flex items-center space-x-1 shadow-md`}>
                        <span className="material-symbols-outlined text-[14px]">local_parking</span>
                        <span>{hub.slotsLeft} Slots Left</span>
                      </div>
                      
                      <div className="absolute bottom-space-2xs right-space-2xs bg-surface/85 backdrop-blur-md px-space-2xs py-space-3xs rounded text-label-md font-semibold text-on-surface border border-surface-container-high">
                        ₱{effectiveRate} / hr
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-space-md md:w-7/12 flex flex-col justify-between space-y-space-sm">
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-headline-md font-headline-md group-hover:text-primary transition-colors text-on-surface">
                            {hub.name}
                          </h3>
                          <span className="text-label-md text-secondary whitespace-nowrap ml-2">
                            {hub.distance}
                          </span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          {hub.address}
                        </p>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-space-sm">
                          {hub.amenityLabels.map((lbl, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-surface-container-lowest text-on-surface-variant text-label-sm rounded border border-surface-container-high"
                            >
                              {lbl}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center space-x-space-2xs pt-space-2xs">
                        <button
                          id={`quick-reserve-${hub.id}`}
                          onClick={() => openFloorPlan(hub)}
                          className="flex-1 bg-primary-container hover:bg-primary-container/90 text-on-primary-container py-2 px-space-2xs rounded-lg text-label-md font-semibold text-center transition-all flex items-center justify-center space-x-1 shadow-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">bolt</span>
                          <span>Quick Reserve</span>
                        </button>
                        <button
                          id={`floor-plan-${hub.id}`}
                          onClick={() => openFloorPlan(hub)}
                          className="bg-surface-container-highest hover:bg-surface-bright text-on-surface py-2 px-space-sm rounded-lg text-label-md font-semibold transition-all flex items-center space-x-1 border border-surface-container-high"
                        >
                          <span className="material-symbols-outlined text-[16px]">map</span>
                          <span>Floor Plan</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Interactive Dark-Mode Simulated Map View */}
        <div className="w-full lg:w-[45%] h-[500px] lg:h-[calc(100vh-4rem)] sticky top-16 bg-surface-container-lowest overflow-hidden flex flex-col border-l border-surface-container-high">
          
          <div
            className="w-full h-full bg-cover bg-center relative flex items-center justify-center select-none"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_v8w3BiNRzCaAxP9pfKGuNzQKyWRU6E9sRHm9ay6alxbAs0ge72BGKb45YsooeQIwjGcuncGw4lois4TFL8_ZSZYYPNAs2NPV5e0F67XgMR8kuY-De3Agsj5zyhO4a6UjPSg5InIQRsaubrLlDWh0NE1fj9ZU8-KEo6t6dzgWadiz46_wEXpY9PBDs05CbCpQAbquDrAj9Zo4gKc-60B0pYdGUQ96LWpT_vWo-oFxF4e4B-RTd7nx')`
            }}
          >
            {/* Map Overlay Contrast Layer */}
            <div className="absolute inset-0 bg-surface/30 backdrop-brightness-90 pointer-events-none"></div>

            {/* Custom Interactive Map Markers */}
            {hubs.map((hub) => {
              const effectiveRate = Math.round(hub.baseRate * (surgePricingActive ? 1.2 : 1.0));
              const isSelected = highlightedHubId === hub.id;

              return (
                <div
                  key={hub.id}
                  id={`marker-${hub.id}`}
                  onClick={() => openFloorPlan(hub)}
                  onMouseEnter={() => setHighlightedHubId(hub.id)}
                  onMouseLeave={() => setHighlightedHubId(null)}
                  style={{ top: hub.coords.top, left: hub.coords.left }}
                  className={`absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className={`backdrop-blur-md px-space-xs py-2 rounded-xl shadow-2xl flex items-center space-x-2 border transition-colors ${
                    isSelected 
                      ? 'bg-primary-container text-on-primary-container border-white' 
                      : 'bg-surface-container-high/95 text-on-surface border-primary/50'
                  }`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute -top-1 -right-1"></div>
                    <span className="material-symbols-outlined text-[18px]">local_parking</span>
                    <div>
                      <div className="text-label-md font-bold leading-tight">₱{effectiveRate}/hr</div>
                      <div className={`text-[10px] font-semibold ${isSelected ? 'text-white' : 'text-primary'}`}>
                        {hub.slotsLeft} Left
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rotate-45 mx-auto -mt-1.5 shadow-lg ${
                    isSelected ? 'bg-primary-container' : 'bg-surface-container-high'
                  }`}></div>
                </div>
              );
            })}

            {/* Map Controls Floating UI */}
            <div className="absolute bottom-space-md right-space-md flex flex-col space-y-2 z-30">
              <button 
                onClick={() => setLiveCount(prev => prev + 5)}
                title="Zoom In"
                className="w-10 h-10 bg-surface-container-high hover:bg-surface-bright rounded-lg shadow-xl flex items-center justify-center text-on-surface transition-all border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button 
                onClick={() => setLiveCount(prev => Math.max(10, prev - 5))}
                title="Zoom Out"
                className="w-10 h-10 bg-surface-container-high hover:bg-surface-bright rounded-lg shadow-xl flex items-center justify-center text-on-surface transition-all border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <button 
                onClick={() => setHighlightedHubId('megamall')}
                title="Center Metro Manila Network"
                className="w-10 h-10 bg-primary-container hover:bg-primary-container/90 text-on-primary-container rounded-lg shadow-xl flex items-center justify-center transition-all shadow-primary-container/30"
              >
                <span className="material-symbols-outlined text-[20px]">my_location</span>
              </button>
            </div>

            {/* Map Legend Badge */}
            <div className="absolute top-space-md left-space-md bg-surface/85 backdrop-blur-md px-space-xs py-2 rounded-lg text-label-sm text-secondary flex items-center space-x-2 z-30 border border-surface-container-high shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="font-medium text-on-surface">Live Network Radar • Click pins to open floor plan</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
