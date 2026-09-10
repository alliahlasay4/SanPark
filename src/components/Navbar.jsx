import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { selectedVehicle, vehicles, setDefaultVehicle } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Find Parking', icon: 'explore', match: ['/', '/find-parking'] },
    { path: '/my-bookings', label: 'My Bookings', icon: 'confirmation_number', match: ['/my-bookings'] },
    { path: '/mall-manager', label: 'Mall Manager Portal', icon: 'storefront', match: ['/mall-manager'] },
    { path: '/analytics', label: 'System Analytics', icon: 'analytics', match: ['/analytics', '/admin-operations'] },
    { path: '/account', label: 'Account', icon: 'person', match: ['/account', '/user-profile'] },
  ];

  const isLinkActive = (match) => {
    return match.includes(location.pathname);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-container-margin md:px-space-xl flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/"
          className="flex items-center space-x-space-sm cursor-pointer select-none"
        >
          <img
            alt="SanPark Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4C8hFEwX2EhMyv493LYvOK55yK9lF7Z1loCqWpS5SRBcl5prMkCNthe0oxmAJw7-8OENvdRBEEQgBU0t3UHwVG7Bh0CuLnOop47e6DdESu-dt3NIlotkH66xZO0Z_X5kXRMFm_7QAB7Lrwgs28ltnhnzf3SLCfS0KVEn5Yh3W4owGf2kh1pKM_HW8DlUfP6SjDKiTocUdLjFDYh4BViSsIvWItZ9zjqXGnlHDzPeVOJBVx2y-RaYH"
          />
          <div className="flex flex-col">
            <span className="text-headline-sm font-headline-sm tracking-tight text-on-surface">SanPark</span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold -mt-1 hidden sm:block">
              Obsidian Smart Platform
            </span>
          </div>
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

        {/* Header Right Actions */}
        <div className="flex items-center space-x-space-sm relative">
          
          {/* Active Vehicle Switcher */}
          <div className="relative">
            <button
              id="vehicle-switcher-btn"
              onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
              className="hidden sm:flex items-center bg-surface-container-high hover:bg-surface-bright px-space-2xs py-space-3xs rounded-lg text-label-md text-secondary transition-colors border border-surface-container-highest"
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
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-body-sm transition-colors ${
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

          {/* User Profile Avatar */}
          <button
            id="nav-user-avatar-btn"
            onClick={() => navigate('/account')}
            className={`w-9 h-9 rounded-full ring-2 transition-all overflow-hidden flex items-center justify-center ${
              isLinkActive(['/account', '/user-profile']) ? 'ring-primary-container' : 'ring-surface-container-high hover:ring-primary'
            }`}
            title="Mark Cruz (Elite Member)"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5bvRdWVC7p9MesXQArQVjMgCtcxzoeW5NMAfuQN6x5_pwVnCOx3LKfDQRNXqpELEVFQUCjoEWGswiEpFxpWfqhGiS5iHcsmToBdfNYipmV6M3M8F8HgyfE5778DBh1pHihPt85W0iWjbm7IaBOiwfgQUkAbE8xzvOBkEf2pPXhxsCY8tNiDhWmKPw4RTDytvTxRlGvVL64_GzDSP5dObdYB7KKj037uV62M8uztKUiCnvtIFHy1-A"
              alt="Mark Cruz"
              className="w-full h-full object-cover"
            />
          </button>

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
