import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloorPlanModal from './components/FloorPlanModal';

// Pages
import FindParkingPage from './pages/FindParkingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MallManagerPage from './pages/MallManagerPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import UserProfilePage from './pages/UserProfilePage';

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

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      
      {/* Spacer for fixed top navbar */}
      <main className="flex-grow pt-16 flex flex-col w-full">
        <Routes>
          <Route path="/" element={<FindParkingPage />} />
          <Route path="/find-parking" element={<Navigate to="/" replace />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/mall-manager" element={<MallManagerPage />} />
          <Route path="/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin-operations" element={<Navigate to="/analytics" replace />} />
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
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
