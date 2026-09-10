export const INITIAL_PARKING_HUBS = [
  {
    id: 'megamall',
    name: 'SM Megamall Parking Hub',
    address: 'EDSA corner J. Vargas Ave, Mandaluyong City',
    distance: '0.4 km away',
    baseRate: 50,
    slotsLeft: 42,
    totalSlots: 500,
    badgeColor: 'bg-primary-container text-on-primary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHU_d4AG2z66CaunzwymQVHCByFCq2VzDKzMXMQ5ItoQQ_XRMoeMayLB4B4vAxak6IyczcVAU2XEUqTCXR0Ls4lFKFOH63D4FilQ8WajJ7GHwpGX2lfHMNi2JLsT2j996myqHGR-0XC0gqX6bB5HQ9lCbV1j_nPFbs3KzBQJzOefoCC4eDnueIjiIBh_Gu-6NH-pWBvbXBELmj1erQbZ-9EtS8oolY3a9V4E07vQPXz-tjzRnt4c_H',
    amenities: ['ev', 'covered', 'secure', 'valet'],
    amenityLabels: ['EV Charging', 'Covered', '24/7 CCTV', 'Valet Available'],
    coords: { top: '35%', left: '45%' },
    lat: 14.5835,
    lng: 121.0565,
  },
  {
    id: 'ayala-manila-bay',
    name: 'Ayala Malls Manila Bay',
    address: 'Diosdado Macapagal Blvd, Parañaque',
    distance: '1.8 km away',
    baseRate: 45,
    slotsLeft: 18,
    totalSlots: 350,
    badgeColor: 'bg-tertiary-container text-on-tertiary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBdfOKFJegxgkfG_1TruHrU-L5vkWogn8O9nur2isURtTh0n5enuwZagPPmXxY6_NPa-dk6Th_YbbpZgdbsGPrqH_uUb3Ba3UiSSFNVSJD3sBvdIilFFE0TBRzU63w86fOfeY1dF_OJ32VbsyyYpkjygEyTJ09PigNRDnxEkwOgIjKX_I9rrCy-0nGBMb9YzWq5PP0-VleIBcuzSeTM5QacY-tGpMjM7QpzxyIkhDinG9CeDZvznX_',
    amenities: ['covered', 'secure', 'wide'],
    amenityLabels: ['Covered', '24/7 CCTV', 'Wide Bays'],
    coords: { top: '65%', left: '25%' },
    lat: 14.5283,
    lng: 120.9839,
  },
  {
    id: 'bgc-highstreet',
    name: 'BGC High Street Central',
    address: 'Bonifacio Global City, Taguig',
    distance: '3.1 km away',
    baseRate: 70,
    slotsLeft: 8,
    totalSlots: 280,
    badgeColor: 'bg-primary-container text-on-primary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXcUlfQ4TqZAkksG3GqCVWRn30XNQ5j8RIaiRJVI5A6JDev6gTeAI4orRSeN2PbKdhOmGmz1e7UQPmhO981NwRrJBdjt22q-WkToAmACZwSN7He0k9ZMRmMVidtXHket8CfmPQJC21j_0rZSaGqhpCnSGly3Hla2YsbJMFlBsVkhWkmQ9btej0xHp6_53lLz3tRnooZIhyMRblgnvQIN7Gwqg9YVq1c8G85LxPzFyMh6yTgzvcCW9d',
    amenities: ['ev', 'secure', 'automated'],
    amenityLabels: ['EV Fast Charge', '24/7 CCTV', 'Automated Gate'],
    coords: { top: '50%', left: '75%' },
    lat: 14.5516,
    lng: 121.0493,
  },
  {
    id: 'uptown-mall',
    name: 'Uptown Mall BGC',
    address: '9th Ave corner 36th Street, BGC, Taguig',
    distance: '3.5 km away',
    baseRate: 60,
    slotsLeft: 22,
    totalSlots: 400,
    badgeColor: 'bg-secondary-container text-on-secondary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8t2MnBlzjEzlEV8-z6E1NwXPylOqKYpiU3o-XOSpnyiirF5n_aBnVoSVTuMat7Trl76_Q4oBHMhRcb2wdjqieqtLbY0HgdvFDAdcHGNkNin4kpVFkRpG8IpPTL32UpuLCBX7XrjI8sBJqOWWkZruFdHSdy4aarxKWKEVBfF92YZiKll7rtpyaU5Bbwls-VcGA6uSNP8t1T_Gt42SQhbRqXGCjnZt4AgH-w10K8Y5wabNdZkygvW_j',
    amenities: ['ev', 'covered', 'secure', 'valet'],
    amenityLabels: ['EV Fast Charge', 'Covered', 'VIP Valet', '24/7 Guarded'],
    coords: { top: '42%', left: '68%' },
    lat: 14.5562,
    lng: 121.0531,
  }
];

export const INITIAL_SLOTS = {
  B1: [
    { id: 'A-01', type: 'EV Fast Charge', status: 'available' },
    { id: 'A-02', type: 'EV Fast Charge', status: 'occupied' },
    { id: 'A-03', type: 'EV Fast Charge', status: 'available' },
    { id: 'A-04', type: 'EV Fast Charge', status: 'occupied' },
    { id: 'A-05', type: 'VIP Reserved', status: 'occupied' },
    { id: 'A-06', type: 'Standard', status: 'available' },
    { id: 'A-07', type: 'Standard', status: 'available' },
    { id: 'A-08', type: 'Standard', status: 'available' },
    { id: 'A-09', type: 'Standard', status: 'occupied' },
    { id: 'A-10', type: 'Standard', status: 'available' },
    { id: 'A-11', type: 'Standard', status: 'available' },
    { id: 'A-12', type: 'Standard', status: 'available' },
    { id: 'A-13', type: 'Standard', status: 'occupied' },
    { id: 'A-14', type: 'Standard', status: 'available' },
    { id: 'A-15', type: 'Standard', status: 'available' },
    { id: 'A-16', type: 'Standard', status: 'occupied' },
    { id: 'A-17', type: 'Standard', status: 'available' },
    { id: 'A-18', type: 'Standard', status: 'available' },
    { id: 'A-19', type: 'Standard', status: 'available' },
    { id: 'A-20', type: 'Standard', status: 'available' },
  ],
  B2: [
    { id: 'B-01', type: 'Standard', status: 'available' },
    { id: 'B-02', type: 'Standard', status: 'available' },
    { id: 'B-03', type: 'Standard', status: 'occupied' },
    { id: 'B-04', type: 'Standard', status: 'available' },
    { id: 'B-05', type: 'Standard', status: 'available' },
    { id: 'B-06', type: 'EV Fast Charge', status: 'available' },
    { id: 'B-07', type: 'EV Fast Charge', status: 'occupied' },
    { id: 'B-08', type: 'Standard', status: 'available' },
    { id: 'B-09', type: 'Standard', status: 'available' },
    { id: 'B-10', type: 'Standard', status: 'occupied' },
    { id: 'B-11', type: 'Standard', status: 'available' },
    { id: 'B-12', type: 'Standard', status: 'available' },
  ],
  B3: [
    { id: 'C-01', type: 'Standard', status: 'available' },
    { id: 'C-02', type: 'Standard', status: 'available' },
    { id: 'C-03', type: 'Standard', status: 'available' },
    { id: 'C-04', type: 'Standard', status: 'occupied' },
    { id: 'C-05', type: 'Standard', status: 'occupied' },
    { id: 'C-06', type: 'Standard', status: 'available' },
    { id: 'C-07', type: 'Standard', status: 'available' },
    { id: 'C-08', type: 'Standard', status: 'available' },
  ]
};

export const INITIAL_VEHICLES = [
  {
    id: 'v1',
    model: 'Toyota Vios',
    type: 'Sedan',
    color: 'Silver Metallic',
    plate: 'NCR • NUI-8821',
    isDefault: true,
    isEv: false,
    rfid: true,
  },
  {
    id: 'v2',
    model: 'Honda Civic RS',
    type: 'Sedan',
    color: 'Championship White',
    plate: 'CALABARZON • S7-K992',
    isDefault: false,
    isEv: false,
    rfid: false,
  },
  {
    id: 'v3',
    model: 'Tesla Model 3',
    type: 'Electric',
    color: 'Solid Black',
    plate: 'EV • 3881-TM',
    isDefault: false,
    isEv: true,
    rfid: true,
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: 'p1',
    type: 'gcash',
    name: 'GCash Wallet',
    detail: '+63 917 ••• 0192',
    isPrimary: true,
    icon: 'account_balance_wallet',
    badge: 'Primary',
    accentColor: 'border-blue-500'
  },
  {
    id: 'p2',
    type: 'maya',
    name: 'Maya Wallet',
    detail: '+63 917 ••• 0192',
    isPrimary: false,
    icon: 'payments',
    badge: 'Backup',
    accentColor: 'border-emerald-500'
  },
  {
    id: 'p3',
    type: 'card',
    name: 'Visa •••• 4092',
    detail: 'Exp: 08/26 • BPI Platinum',
    isPrimary: false,
    icon: 'credit_card',
    badge: 'Credit',
    accentColor: 'border-surface-container-high'
  }
];

export const INITIAL_MANAGER_SESSIONS = [
  {
    id: 'ses-1',
    vehicle: 'Toyota Fortuner',
    plate: 'ABC-1234',
    category: 'SUV',
    bay: 'B1-Zone A (EV #04)',
    driver: 'Mark Zuckerberg',
    duration: '2h 15m',
    remaining: '01:45:20 remaining',
    status: 'Active Session',
    amount: 270.00
  },
  {
    id: 'ses-2',
    vehicle: 'Honda Civic Type R',
    plate: 'NCR-8888',
    category: 'SED',
    bay: 'GF-VIP 02',
    driver: 'Sarah Connor',
    duration: '45 mins',
    remaining: 'Checked in 14:10',
    status: 'Active Session',
    amount: 150.00
  },
  {
    id: 'ses-3',
    vehicle: 'Tesla Model Y',
    plate: 'EV-7711',
    category: 'EV',
    bay: 'B1-Zone B (EV Fast)',
    driver: 'Elon Ramos',
    duration: '1h 10m',
    remaining: '00:50:00 remaining',
    status: 'Active Session',
    amount: 220.00
  },
  {
    id: 'ses-4',
    vehicle: 'BMW 330e',
    plate: 'BGC-2024',
    category: 'SED',
    bay: 'B2-Zone C #19',
    driver: 'Cassandra Santos',
    duration: '3h 30m',
    remaining: '00:15:30 remaining',
    status: 'Expiring Soon',
    amount: 350.00
  },
  {
    id: 'ses-5',
    vehicle: 'Mitsubishi Montero',
    plate: 'NAL-9182',
    category: 'SUV',
    bay: 'B3-Zone A #08',
    driver: 'Gabriel Mercado',
    duration: '5h 00m',
    remaining: 'Completed 13:45',
    status: 'Completed',
    amount: 250.00
  }
];

export const INITIAL_USER_HISTORY = [
  {
    id: 'h1',
    mall: 'SM Megamall - Mega Fashion Hall Basement 2',
    date: 'Oct 24, 2024',
    duration: '2 hours 15 mins',
    vehicle: 'Toyota Vios (NUI-8821)',
    amount: '₱150.00',
    method: 'Paid via GCash'
  },
  {
    id: 'h2',
    mall: 'Ayala Malls Manila Bay - Parkade Level 3',
    date: 'Oct 21, 2024',
    duration: '1 hour 45 mins',
    vehicle: 'Toyota Vios (NUI-8821)',
    amount: '₱120.00',
    method: 'Paid via Visa 4092'
  },
  {
    id: 'h3',
    mall: 'Greenbelt 5 Parking - Makati CBD',
    date: 'Oct 18, 2024',
    duration: '3 hours 10 mins',
    vehicle: 'Toyota Vios (NUI-8821)',
    amount: '₱180.00',
    method: 'Paid via GCash'
  }
];
