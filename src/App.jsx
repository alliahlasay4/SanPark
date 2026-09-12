import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloorPlanModal from './components/FloorPlanModal';

// Ensure manual scroll restoration so page reloads and navigations start at top
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an in-page section with an anchor (e.g. #quick-search), preserve anchor scrolling
    if (hash) return;
    
    // Always reset window scroll position to the very top on route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

// Pages
import LandingPage from './pages/LandingPage';
import FindParkingPage from './pages/FindParkingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MallManagerPage from './pages/MallManagerPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import CustomerReservationsPage from './pages/CustomerReservationsPage';

function ToastContainer() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-surface-container-high text-on-surface border border-primary/50 px-space-md py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-body-md font-medium backdrop-blur-xl">
        <span className="material-symbols-outlined text-primary text-[20px]">info</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

function RoleLanding() {
  const { userRole } = useApp();
  return userRole === 'admin' ? <Navigate to="/mall-manager" replace /> : <FindParkingPage />;
}

function AdminRoute({ children }) {
  const { userRole } = useApp();
  return userRole === 'admin' ? children : <Navigate to="/" replace />;
}

function UserRoute({ children }) {
  const { userRole } = useApp();
  return userRole === 'user' ? children : <Navigate to="/login" replace />;
}

function MainLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Global Navbar shown only on internal routes, LandingPage has its own dedicated guest navbar */}
      {!isLanding && <Navbar />}
      
      {/* Spacer for fixed top navbar on internal pages */}
      <main className={`flex-grow flex flex-col w-full ${!isLanding ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/find-parking" element={<FindParkingPage />} />
          <Route path="/my-bookings" element={<UserRoute><MyBookingsPage /></UserRoute>} />
          <Route path="/mall-manager" element={<AdminRoute><MallManagerPage /></AdminRoute>} />
          <Route path="/customer-reservations" element={<AdminRoute><CustomerReservationsPage /></AdminRoute>} />
          <Route path="/analytics" element={<AdminRoute><AdminAnalyticsPage /></AdminRoute>} />
          <Route path="/admin-operations" element={<AdminRoute><Navigate to="/analytics" replace /></AdminRoute>} />
          <Route path="/account" element={<UserProfilePage />} />
          <Route path="/user-profile" element={<Navigate to="/account" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <FloorPlanModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
