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

## 🧪 Testing

SanPark includes both an **automated end-to-end (E2E) test suite** and a **manual verification checklist** covering all five pages.

---

### Automated E2E Testing (Puppeteer)

The test script [`test-e2e.js`](./test-e2e.js) uses **Puppeteer** to launch a headless Chrome browser, navigate every page, interact with UI elements, and capture screenshots and an animated screen recording as evidence.

#### Prerequisites

- Google Chrome installed at its default path
- Dev server running locally (`npm run dev`)
- Install test dependencies:

```bash
npm install puppeteer-core pngjs gifenc
```

#### Run the Tests

```bash
# 1. Start the dev server (in a separate terminal)
npm run dev

# 2. Run the E2E test script
node test-e2e.js
```

#### What the E2E Script Tests

| Step | Page | Actions Verified |
|:-----|:-----|:-----------------|
| 1 | **Find Parking** (`/`) | Page loads, EV Charging filter click, reset to All Spots |
| 2 | **Floor Plan Modal** | Opens SM Megamall floor plan, switches to Level B2, selects slot A-10, proceeds to checkout |
| 3 | **My Bookings** (`/my-bookings`) | Page loads after checkout redirect, toggles EV Fast Charge & Car Wash add-ons, selects Maya payment |
| 4 | **Mall Manager** (`/mall-manager`) | Page loads, toggles Peak Surge & Maintenance Lock switches, searches "Civic" in live sessions |
| 5 | **System Analytics** (`/analytics`) | Page loads, toggles 7D chart time range |
| 6 | **User Profile** (`/account`) | Page loads, switches to Saved Vehicles tab, Payment Methods tab, and Parking Stats tab |

#### Test Outputs

The script automatically generates and saves the following artifacts:

| File | Description |
|:-----|:------------|
| `01_find_parking_page.png` | Find Parking home view |
| `02_floorplan_modal.png` | Floor plan bay selector modal |
| `03_my_bookings_page.png` | My Bookings active pass view |
| `04_my_bookings_addons_maya.png` | Add-ons selected + Maya payment |
| `05_mall_manager_page.png` | Mall Manager overview |
| `06_mall_manager_filtered.png` | Live sessions filtered by "Civic" |
| `07_system_analytics_page.png` | System Analytics dashboard |
| `08_user_profile_page.png` | User Profile general tab |
| `09_saved_vehicles_tab.png` | Saved Vehicles tab |
| `10_payment_methods_tab.png` | Payment Methods tab |
| `11_parking_stats_tab.png` | Parking Stats & History tab |
| `sanpark_screen_recording.gif` | Full animated screen recording walkthrough |

---

### Manual Verification Checklist

The following features were manually verified on `http://localhost:3000`:

#### 🗺️ Find Parking (`/`)
- [x] Page loads with dark Obsidian Parking theme
- [x] Live parking ticker updates available slot count
- [x] Amenity filter buttons (All, EV Charging, Covered, 24/7 CCTV) filter parking cards
- [x] Interactive vector map shows radar ping animations on hub pins
- [x] "Floor Plan" button opens the bay selector modal
- [x] Slot selection in modal updates price summary
- [x] "Proceed to Reserve" redirects to `/my-bookings`

#### 🎟️ My Bookings (`/my-bookings`)
- [x] Active reservation pass and hold countdown timer display correctly
- [x] EV Fast Charge, Express Pass, and Car Wash add-ons recalculate total price in real time
- [x] GCash, Maya, and Card payment toggles switch active state
- [x] Digital QR pass and barcode render in high contrast
- [x] Apple Wallet / Google Wallet and Waze / Google Maps deep-link buttons are present

#### 🏬 Mall Manager Portal (`/mall-manager`)
- [x] Telemetry bento grid shows Revenue, Occupancy, Active Bookings, and EV demand
- [x] SVG capacity donut chart renders correctly
- [x] Peak Hours Surge Pricing toggle updates rates
- [x] Maintenance Lockdown switch reflects state change
- [x] Live sessions table supports text search by plate or user name

#### 📊 System Analytics (`/analytics`)
- [x] Operations Center status indicators display (latency, hubs, uptime)
- [x] SVG area chart renders with gradient fill
- [x] 24H / 7D / 30D time range buttons switch chart dataset
- [x] Hardware diagnostics show Barrier Booms, ANPR Cameras, and EV Charger counts
- [x] Live ANPR event log stream displays entries

#### 👤 User Profile (`/account`)
- [x] Elite membership banner with loyalty point balance displays
- [x] General & Security tab loads with biometric and 2FA toggles
- [x] Saved Vehicles tab shows registered vehicles
- [x] Add Vehicle modal opens and closes correctly
- [x] Payment Methods tab shows linked e-wallets and cards
- [x] Parking Stats & History tab shows monthly usage analytics

---

## 📄 License

This project is licensed under the MIT License.
