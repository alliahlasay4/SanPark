import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminAnalyticsView() {
  const { hubs, showToast } = useApp();
  const [timeRange, setTimeRange] = useState('24H');

  const chartDataSets = {
    '24H': {
      pathArea: "M0,150 Q100,120 200,90 T400,60 T600,110 T800,40 L800,200 L0,200 Z",
      pathLine: "M0,150 Q100,120 200,90 T400,60 T600,110 T800,40",
      points: [
        { cx: 200, cy: 90, label: '06:00 AM - 420 cars' },
        { cx: 400, cy: 60, label: '12:00 PM - 890 cars (Peak Surge)' },
        { cx: 600, cy: 110, label: '06:00 PM - 640 cars' },
        { cx: 800, cy: 40, label: 'Live - 912 cars' }
      ]
    },
    '7D': {
      pathArea: "M0,160 Q120,130 250,70 T500,85 T650,45 T800,60 L800,200 L0,200 Z",
      pathLine: "M0,160 Q120,130 250,70 T500,85 T650,45 T800,60",
      points: [
        { cx: 250, cy: 70, label: 'Wed - 4,820 visits' },
        { cx: 500, cy: 85, label: 'Fri - 5,100 visits' },
        { cx: 650, cy: 45, label: 'Sat - 7,420 visits (Surge)' },
        { cx: 800, cy: 60, label: 'Sun - 6,800 visits' }
      ]
    },
    '30D': {
      pathArea: "M0,140 Q150,110 300,95 T550,50 T700,75 T800,30 L800,200 L0,200 Z",
      pathLine: "M0,140 Q150,110 300,95 T550,50 T700,75 T800,30",
      points: [
        { cx: 300, cy: 95, label: 'Week 1 - 28,400 visits' },
        { cx: 550, cy: 50, label: 'Payday Weekend - 41,200 visits' },
        { cx: 700, cy: 75, label: 'Week 3 - 32,100 visits' },
        { cx: 800, cy: 30, label: 'Current Month - 128,450 total' }
      ]
    }
  };

  const activeChart = chartDataSets[timeRange];

  return (
    <div className="flex flex-col w-full text-on-surface">
      
      {/* Top Stats / Header Bar */}
      <section className="w-full px-container-margin md:px-space-xl py-space-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md border-b border-surface-container-high bg-surface-container-lowest">
        <div className="flex flex-col">
          <div className="flex items-center space-x-space-2xs mb-space-3xs">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-label-sm uppercase tracking-wider text-on-surface-variant font-headline-sm font-semibold">
              Live Operations Center
            </span>
            <span className="text-label-sm text-secondary">/ Metro Manila Network Alpha</span>
          </div>
          <h1 className="text-headline-xl font-headline-xl text-on-surface">
            System Analytics &amp; Hardware Diagnostics
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="bg-surface-container-high px-space-md py-space-2xs rounded-lg flex items-center space-x-space-sm border border-surface-container-highest">
            <span className="material-symbols-outlined text-primary-container text-[24px]">hub</span>
            <div>
              <div className="text-label-md text-secondary">Active Hubs</div>
              <div className="text-headline-sm text-on-surface font-semibold">14 Malls Connected</div>
            </div>
          </div>

          <div className="bg-surface-container-high px-space-md py-space-2xs rounded-lg flex items-center space-x-space-sm border border-surface-container-highest">
            <span className="material-symbols-outlined text-tertiary text-[24px]">sync</span>
            <div>
              <div className="text-label-md text-secondary">API Sync Status</div>
              <div className="text-headline-sm text-emerald-400 font-semibold">99.98% Operational</div>
            </div>
          </div>

          <button 
            onClick={() => showToast("Exported System Diagnostic & Revenue Report (.CSV)")}
            className="bg-primary-container hover:bg-primary-container/90 text-on-primary-container px-space-md py-space-2xs rounded-lg font-label-lg transition-all flex items-center space-x-space-2xs shadow-lg shadow-primary-container/20"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="w-full px-container-margin md:px-space-xl py-space-lg flex flex-col gap-space-lg">
        
        {/* Bento Grid: Revenue Trends + Facility Hardware Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          
          {/* Revenue & Occupancy Trend Graphs (8 Cols) */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden border border-surface-container-high shadow-md">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm mb-space-md">
              <div>
                <div className="text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Turnover &amp; Surge Telemetry
                </div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">
                  Hourly Parking Turnover &amp; Peak Surge
                </h2>
              </div>

              <div className="flex items-center space-x-space-2xs bg-surface-container-high p-1 rounded-lg border border-surface-container-highest">
                {['24H', '7D', '30D'].map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded text-label-md font-semibold transition-all ${
                      timeRange === range
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG Chart Visualization */}
            <div className="w-full h-64 relative flex items-end pt-space-md pb-space-sm">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full h-[1px] bg-outline"></div>
                <div className="w-full h-[1px] bg-outline"></div>
                <div className="w-full h-[1px] bg-outline"></div>
                <div className="w-full h-[1px] bg-outline"></div>
              </div>

              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E50914" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E50914" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path d={activeChart.pathArea} fill="url(#redGradient)" />
                {/* Line graph */}
                <path
                  d={activeChart.pathLine}
                  fill="none"
                  stroke="#E50914"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
                {/* Data points */}
                {activeChart.points.map((pt, idx) => (
                  <g key={idx} className="cursor-pointer group">
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r="5"
                      fill="#E50914"
                      className="transition-transform group-hover:scale-150"
                    />
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r="10"
                      fill="#E50914"
                      opacity="0.25"
                      className="animate-ping"
                    />
                    <title>{pt.label}</title>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex items-center justify-between pt-space-md text-body-sm text-on-surface-variant border-t border-surface-container-high">
              <span>00:00 AM</span>
              <span>06:00 AM</span>
              <span className="text-primary font-semibold">12:00 PM (Peak Surge Window)</span>
              <span>06:00 PM</span>
              <span>11:59 PM</span>
            </div>
          </div>

          {/* Facility Hardware Status (4 Cols) */}
          <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between border border-surface-container-high shadow-md">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <h2 className="text-headline-md font-headline-md text-on-surface">Hardware Diagnostics</h2>
                <span className="material-symbols-outlined text-secondary text-[24px]">dns</span>
              </div>

              <div className="flex flex-col gap-space-md">
                {/* Barrier Boom Gates */}
                <div className="bg-surface-container p-space-sm rounded-lg flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-center space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">fitbit_jumping_jacks</span>
                    </div>
                    <div>
                      <div className="text-label-lg font-label-lg text-on-surface">Barrier Boom Gates</div>
                      <div className="text-body-sm text-secondary">42/44 Units Active</div>
                    </div>
                  </div>
                  <span className="px-space-2xs py-space-3xs rounded bg-emerald-500/10 text-emerald-400 text-label-sm font-label-sm font-semibold">
                    Optimal
                  </span>
                </div>

                {/* CCTV Uptime */}
                <div className="bg-surface-container p-space-sm rounded-lg flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-center space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                    <div>
                      <div className="text-label-lg font-label-lg text-on-surface">ANPR Camera Uptime</div>
                      <div className="text-body-sm text-secondary">128/128 Streams</div>
                    </div>
                  </div>
                  <span className="px-space-2xs py-space-3xs rounded bg-emerald-500/10 text-emerald-400 text-label-sm font-label-sm font-semibold">
                    99.9%
                  </span>
                </div>

                {/* EV Chargers */}
                <div className="bg-surface-container p-space-sm rounded-lg flex items-center justify-between border border-surface-container-highest">
                  <div className="flex items-center space-x-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-amber-400">
                      <span className="material-symbols-outlined">ev_station</span>
                    </div>
                    <div>
                      <div className="text-label-lg font-label-lg text-on-surface">EV Fast Chargers</div>
                      <div className="text-body-sm text-secondary">16 Charging, 2 Offline</div>
                    </div>
                  </div>
                  <span className="px-space-2xs py-space-3xs rounded bg-amber-500/10 text-amber-400 text-label-sm font-label-sm font-semibold">
                    Warning
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm border-t border-surface-container flex items-center justify-between text-body-sm text-secondary">
              <span>Auto-diagnostic check</span>
              <span className="text-on-surface font-medium">Just now (Live WebSocket)</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Connected Malls Network Matrix & Event Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
          
          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container-high">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-md flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">hub</span>
              <span>Connected Hub Network Health</span>
            </h3>
            <div className="space-y-space-xs">
              {hubs.map((hub, idx) => (
                <div key={hub.id} className="flex items-center justify-between p-space-xs rounded-lg bg-surface-container border border-surface-container-highest">
                  <div>
                    <div className="text-on-surface font-semibold text-body-md">{hub.name}</div>
                    <div className="text-body-sm text-secondary">{hub.slotsLeft} of {hub.totalSlots} bays free</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-label-sm text-emerald-400 font-mono">14ms latency</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md border border-surface-container-high">
            <h3 className="text-headline-md font-headline-md text-on-surface mb-space-md flex items-center space-x-2">
              <span className="material-symbols-outlined text-tertiary">history_toggle_drop</span>
              <span>Live ANPR Event Stream</span>
            </h3>
            <div className="space-y-space-xs text-body-sm font-mono">
              {[
                { time: '14:32:10', event: 'ANPR Gate B1-Entry: Recognized plate NCR-8888 (Boom lifted)', status: 'Success' },
                { time: '14:30:45', event: 'EV Charger #02: Fast charging initialized for Tesla Model Y', status: 'Active' },
                { time: '14:28:12', event: 'Slot P3-A12 reserved by SP-9482-BGC via mobile app', status: 'Locked' },
                { time: '14:25:00', event: 'Surge algorithm adjusted BGC rate to ₱70/hr (+20%)', status: 'Applied' },
              ].map((log, i) => (
                <div key={i} className="p-space-xs rounded-lg bg-surface-container flex items-center justify-between border border-surface-container-highest">
                  <span className="text-secondary">{log.time}</span>
                  <span className="text-on-surface truncate max-w-[280px] sm:max-w-none">{log.event}</span>
                  <span className="text-emerald-400 text-[11px] uppercase font-bold">{log.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
