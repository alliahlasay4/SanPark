# SanPark — Smart Urban Parking Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Design System](https://img.shields.io/badge/Theme-Obsidian_Parking-E50914)](https://github.com/alliahlasay4/SanPark)

**SanPark** is a dark-mode-first, high-performance smart urban parking platform engineered for modern commuters, commercial mall operators, and facility managers across Metro Manila.

---

## ✨ Features & Multi-Page Architecture

SanPark is organized into dedicated, accessible pages with URL routes:

### 1. 🗺️ Find Parking & Interactive Map (`/`)
- **Live Amenity Filters**: Filter by *EV Fast Charging*, *Covered Parking*, *24/7 CCTV*, or *All Spots*.
- **Live Network Ticker**: Real-time counter of available parking spaces across Metro Manila.
- **Search & Filter Panel**: Filter by destination, registered vehicle, and scheduled time range.
- **Interactive Simulated Vector Map**: High-contrast dark mode map featuring animated radar pings, custom price pills, and slot availability badges.
- **Interactive Floor Plan Modal**: Select parking bays across Level B1, B2, and B3 with dynamic pricing and instant slot locking.

### 2. 🎟️ My Bookings & Active Digital Pass (`/my-bookings`)
- **Real-Time Hold Countdown Timer**: Live countdown (`09:45`) for pending reservations.
- **Dynamic Add-Ons Calculator**: Real-time calculation for EV Fast Charging (+₱150), Express Pass (+₱50), and Car Wash (+₱300).
- **Instant Payment Gateway Toggles**: Seamless selection between GCash, Maya, and credit/debit card.
- **High-Contrast Digital Pass**: Scannable QR code and barcode for ANPR gate entry.
- **Digital Wallet & GPS Deep Links**: One-tap export to Apple Wallet / Google Wallet and route navigation via Waze or Google Maps.

### 3. 🏬 Mall Manager Portal (`/mall-manager`)
- **Live Sync Telemetry Bento**: Real-time metrics for Today's Revenue, Facility Occupancy, Active Bookings, and EV Station demand.
- **SVG Capacity Donut**: Visual occupancy distribution across Standard, EV, VIP/PWD, and available bays.
- **Interactive Space Control Panel**:
  - **Peak Hours Surge Pricing Toggle**: Dynamically scales hourly rates by +20% across all hubs.
  - **Maintenance Lockdown Switch**: Instantly blocks bays for scheduled cleaning or lighting repairs.
  - **Valet Overflow Priority Queue**: Routes traffic during peak ingress windows.
- **Searchable Sessions Feed**: Live tabular feed of parked vehicles, plate numbers, driver info, and remaining hold times.

### 4. 📊 System Analytics & Hardware Diagnostics (`/analytics`)
- **Operations Center Health**: Network latency, 14 connected mall hubs, and 99.98% API synchronization uptime.
- **Turnover & Surge Telemetry Chart**: Interactive SVG area chart with **24H**, **7D**, and **30D** time range toggles.
- **Hardware Diagnostics**: Live monitoring of Barrier Boom Gates (42/44 active), ANPR Cameras (128/128 streams), and EV Fast Chargers.
- **Real-Time Event Stream**: Live ANPR gate log audits and system event telemetry.

### 5. 👤 User Profile & Account Management (`/account`)
- **Elite Membership Status**: Loyalty points balance (2,450 pts) with reward redemption modal.
- **General & Security**: Biometric authentication toggle, Two-Factor Authentication, and notification alerts.
- **Saved Vehicles**: Register and manage vehicles with ANPR plate recognition and RFID tags (**Add Vehicle** modal included).
- **Payment Methods**: Manage linked e-wallets (GCash, Maya) and credit cards with primary payment designation.
- **Parking History & Analytics**: Monthly parking hours, total visits, and money saved via Elite perks.

---

## 🎨 Design System: "Obsidian Parking"

SanPark adheres strictly to the **Obsidian Parking** design specifications:
- **Foundations**: Obsidian Black (`#131313`) with tonal charcoal layering (`#1C1B1B`, `#201F1F`, `#2A2A2A`).
- **Primary Accent**: Electric Cherry (`#E50914`, `#FFB4AA`) for primary actions and active states.
- **Neon Status Telemetry**: High-contrast emerald (`#00FF66`), amber (`#FFB800`), and ice blue (`#0072D7`).
- **Typography**: Geometric headlines in [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and readable tabular data in [Inter](https://fonts.google.com/specimen/Inter).

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/alliahlasay4/SanPark.git
cd SanPark
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready bundle will be output to the `dist/` folder.

---

## 📁 Project Structure

```
SanPark/
├── public/
├── src/
│   ├── components/
│   │   ├── FloorPlanModal.jsx   # Interactive bay selector modal
│   │   ├── Footer.jsx           # Global footer
│   │   ├── Navbar.jsx           # Top navigation with vehicle switcher & profile
│   │   ├── PaymentModal.jsx     # Add payment method modal
│   │   └── VehicleModal.jsx     # Add new vehicle modal
│   ├── context/
│   │   └── AppContext.jsx       # Central state management & telemetry rules
│   ├── data/
│   │   └── parkingData.js       # Mock datasets for hubs, sessions, slots & cars
│   ├── pages/
│   │   ├── AdminAnalyticsPage.jsx
│   │   ├── FindParkingPage.jsx
│   │   ├── MallManagerPage.jsx
│   │   ├── MyBookingsPage.jsx
│   │   └── UserProfilePage.jsx
│   ├── views/
│   │   ├── AdminAnalyticsView.jsx
│   │   ├── FindParkingView.jsx
│   │   ├── MallManagerView.jsx
│   │   ├── MyBookingsView.jsx
│   │   └── UserProfileView.jsx
│   ├── App.jsx                  # React Router routes & main layout
│   ├── index.css                # Obsidian Parking theme & custom styling
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
├── tailwind.config.js           # Obsidian design system tokens
├── vite.config.js
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License.
