import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { selectedVehicle, vehicles, setDefaultVehicle, userRole, currentUser, signOut } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navLinks = userRole === 'admin' ? [
    { path: '/mall-manager', label: 'Mall Manager', icon: 'storefront', match: ['/mall-manager'] },
    { path: '/find-parking', label: 'Find Parking', icon: 'explore', match: ['/find-parking'] },
    { path: '/customer-reservations', label: 'Customer Reservations', icon: 'assignment_ind', match: ['/customer-reservations'] },
    { path: '/analytics', label: 'Analytics', icon: 'analytics', match: ['/analytics', '/admin-operations'] },
  ] : [
    { path: '/find-parking', label: 'Find Parking', icon: 'explore', match: ['/find-parking'] },
    { path: '/my-bookings', label: 'My Bookings', icon: 'confirmation_number', match: ['/my-bookings'] },
    { path: '/account', label: 'Account', icon: 'person', match: ['/account', '/user-profile'] },
  ];

  const isLinkActive = (match) => {
    return match.includes(location.pathname);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-container-margin md:px-space-xl flex items-center justify-between">
        
        {/* Left: Brand Logo & Desktop Navigation */}
        <div className="flex items-center gap-space-lg">
          <Link 
            to={userRole === 'admin' ? '/mall-manager' : (userRole === 'user' ? '/find-parking' : '/')}
            className="flex items-center gap-space-2xs group cursor-pointer select-none"
          >
            <img
              alt="SanPark Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VCUScEd7qExXKKROO-4dVgtyJurYJ4A2lGbNq4hWXKATfN9AqM0m2hA8a_FQfCpAmoGjABN0af8-fwUZEKlKr4xymJN7QRzzkxdMMi8B8wScOo3VnHMXPRPiyZTJ5OD7nSPylsxB7y6I0aWkcHz2eNIQLGNu-z-5zqaO5pqWsoZgh-OHikECubPxEMwfBOg4QPvEtg1oiVrdO1KRczqAxy84n8xnLYCiiO4w2w9HGsG3CNr5Gro-GUH5E"
            />
            <span className="font-headline-md text-headline-md tracking-tight">
              <span className="text-on-surface">San</span>
              <span className="text-primary-container font-bold">Park</span>
            </span>
            {userRole === 'admin' && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-highest text-primary border border-primary/30 uppercase tracking-wider hidden sm:inline-flex">
                Admin
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map(link => {
              const active = isLinkActive(link.match);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-${link.path.replace('/', '') || 'find-parking'}`}
                  className={`px-3 py-1.5 rounded-lg text-body-md font-medium transition-all duration-150 flex items-center space-x-1.5 ${
                    active
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-md shadow-primary-container/20'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-space-sm relative">
          
          {/* Quick Reserve CTA */}
          <Link
            to="/find-parking"
            id="nav-reserve-cta"
            className="hidden sm:inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-primary-container text-on-primary-container text-body-sm font-semibold shadow-[0_0_12px_rgba(229,9,20,0.3)] hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">local_parking</span>
            <span>Reserve a Spot</span>
          </Link>

          {/* Guest Auth Buttons or Authenticated Controls */}
          {(!currentUser || userRole === 'guest') ? (
            <div className="flex items-center gap-space-xs sm:gap-space-sm">
              <button
                type="button"
                onClick={() => navigate('/login', { state: { tab: 'login' } })}
                className="text-on-surface hover:text-primary transition-colors font-label-md text-label-md font-medium px-2 py-1 cursor-pointer"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => navigate('/login', { state: { tab: 'signup' } })}
                className="inline-flex items-center justify-center px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_16px_rgba(229,9,20,0.3)] hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 cursor-pointer"
              >
                Reserve a Spot
              </button>
            </div>
          ) : (
            <>
              {/* Active Vehicle Switcher: personal control for regular users only */}
              {userRole !== 'admin' && (
              <div className="relative">
                <button
                  id="vehicle-switcher-btn"
                  onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                  className="hidden sm:flex items-center bg-surface-container-high hover:bg-surface-bright px-space-2xs py-space-3xs rounded-lg text-label-md text-secondary transition-colors border border-surface-container-highest cursor-pointer"
                  title="Click to switch active vehicle"
                >
                  <span className="material-symbols-outlined text-[16px] mr-1 text-primary">directions_car</span>
                  <span className="text-on-surface font-medium truncate max-w-[130px]">{selectedVehicle?.model}</span>
                  <span className="material-symbols-outlined text-[16px] ml-1 text-secondary">expand_more</span>
                </button>

                {vehicleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface-container border border-surface-container-highest rounded-xl shadow-2xl p-2 z-50 animate-in fade-in">
                    <div className="text-label-sm uppercase tracking-wider text-secondary px-2 py-1">Switch Active Vehicle</div>
                    {vehicles.map(v => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setDefaultVehicle(v.id);
                          setVehicleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-body-sm transition-colors cursor-pointer ${
                          v.isDefault ? 'bg-primary-container/20 text-on-surface font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        <div>
                          <div className="text-on-surface">{v.model}</div>
                          <div className="text-[11px] font-mono text-secondary">{v.plate}</div>
                        </div>
                        {v.isDefault && (
                          <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              )}

              {/* Account Menu */}
              <div className="relative">
                <button
                  id="nav-user-avatar-btn"
                  onClick={() => setAccountMenuOpen(current => !current)}
                  className={`w-9 h-9 rounded-full ring-2 transition-all overflow-hidden flex items-center justify-center cursor-pointer ${
                    accountMenuOpen || isLinkActive(['/account', '/user-profile']) ? 'ring-primary-container' : 'ring-surface-container-high hover:ring-primary'
                  }`}
                  title={`${currentUser?.name || 'SanPark account'} menu`}
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5bvRdWVC7p9MesXQArQVjMgCtcxzoeW5NMAfuQN6x5_pwVnCOx3LKfDQRNXqpELEVFQUCjoEWGswiEpFxpWfqhGiS5iHcsmToBdfNYipmV6M3M8F8HgyfE5778DBh1pHihPt85W0iWjbm7IaBOiwfgQUkAbE8xzvOBkEf2pPXhxsCY8tNiDhWmKPw4RTDytvTxRlGvVL64_GzDSP5dObdYB7KKj037uV62M8uztKUiCnvtIFHy1-A"
                    alt={currentUser?.name || 'SanPark account'}
                    className="w-full h-full object-cover"
                  />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container/95 shadow-2xl backdrop-blur-xl" role="menu">
                    <div className="border-b border-surface-container-high px-4 py-3">
                      <div className="text-body-sm font-semibold text-on-surface">{currentUser?.name}</div>
                      <div className="mt-0.5 truncate text-[11px] font-mono text-secondary">{currentUser?.email}</div>
                      <span className="mt-2 inline-flex rounded-full border border-primary/30 bg-primary-container/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {userRole === 'admin' ? 'Administrator' : 'Driver account'}
                      </span>
                    </div>
                    <div className="p-2">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => { setAccountMenuOpen(false); navigate('/account'); }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-body-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px] text-primary">person</span>
                        <span>Profile</span>
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => { setAccountMenuOpen(false); signOut(); navigate('/'); }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-body-sm text-on-surface-variant transition hover:bg-red-950/40 hover:text-red-300 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px] text-red-400">logout</span>
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-surface-container border-b border-surface-container-high p-4 flex flex-col space-y-2">
          {navLinks.map(link => {
            const active = isLinkActive(link.match);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-body-md font-medium transition-colors flex items-center space-x-2 ${
                  active
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
