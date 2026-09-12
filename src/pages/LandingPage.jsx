import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LandingPageView from '../views/LandingPageView';

// ======================= REUSABLE GUEST NAVBAR =======================
export function GuestNavbar({ onSignInClick, onReserveClick }) {
  const { userRole, currentUser, signOut } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth in-page section scrolling
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        if (id === 'quick-search') {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const input = document.getElementById('dest-input');
          if (input) {
            setTimeout(() => {
              input.focus({ preventScroll: true });
            }, 350);
          }
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Find Parking', target: 'quick-search' },
    { label: 'How It Works', target: 'how-it-works' },
    { label: 'Features', target: 'features' },
    { label: 'Contact Us', target: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
      <div className="h-16 w-full px-container-margin md:px-space-xl flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-space-lg">
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="flex items-center gap-space-2xs group cursor-pointer select-none text-left"
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
          </button>

          {/* In-Line Landing Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.target)}
                className="px-space-xs py-space-2xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md text-label-md rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right-Side Authentication Actions */}
        <div className="flex items-center gap-space-sm">
          {(!currentUser || userRole === 'guest') ? (
            <div className="hidden lg:flex items-center gap-space-sm">
              {/* Sign in button (routes to login page in Log In toggle) */}
              <button
                type="button"
                id="guest-signin-btn"
                onClick={onSignInClick || (() => navigate('/login', { state: { tab: 'login' } }))}
                className="text-on-surface hover:text-primary transition-colors font-label-md text-label-md font-medium px-space-xs py-2 rounded-lg hover:bg-surface-container-high cursor-pointer"
              >
                Sign in
              </button>

              {/* Highlighted Reserve a Spot button (routes to login page in Create Account toggle) */}
              <button
                type="button"
                id="guest-reserve-spot-btn"
                onClick={onReserveClick || (() => navigate('/login', { state: { tab: 'signup' } }))}
                className="inline-flex items-center justify-center px-space-md py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_16px_rgba(229,9,20,0.35)] hover:bg-primary hover:text-on-primary-fixed active:scale-95 transition-all cursor-pointer"
              >
                Reserve a Spot
              </button>
            </div>
          ) : (
            /* Authenticated Quick Controls (if logged in user visits landing page) */
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                onClick={() => navigate(userRole === 'admin' ? '/mall-manager' : '/find-parking')}
                className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md px-space-xs py-2 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  scrollTo('home');
                }}
                className="px-space-sm py-2 rounded-lg bg-surface-container-high hover:bg-red-950/40 text-on-surface hover:text-red-300 font-label-md text-label-md transition-colors cursor-pointer border border-surface-container-highest flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-red-400">logout</span>
                <span>Log out</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            id="landing-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-surface-container border-b border-surface-container-high p-4 flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollTo(item.target)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-body-md font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-surface-container-high flex flex-col gap-2">
            {(!currentUser || userRole === 'guest') ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSignInClick) {
                      onSignInClick();
                    } else {
                      navigate('/login', { state: { tab: 'login' } });
                    }
                  }}
                  className="w-full text-center py-2.5 rounded-lg text-body-md font-medium text-on-surface bg-surface-container-high hover:bg-surface-bright transition-colors cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onReserveClick) {
                      onReserveClick();
                    } else {
                      navigate('/login', { state: { tab: 'signup' } });
                    }
                  }}
                  className="w-full text-center py-2.5 rounded-lg text-body-md font-semibold bg-primary-container text-on-primary-container shadow-md transition-colors cursor-pointer"
                >
                  Reserve a Spot
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                  scrollTo('home');
                }}
                className="w-full text-center py-2.5 rounded-lg text-body-md font-medium text-red-300 bg-red-950/40 transition-colors cursor-pointer"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// ======================= LANDING PAGE COMPONENT =======================
export default function LandingPage() {
  const location = useLocation();

  // Handle URL hash on initial load or change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            if (targetId === 'quick-search') {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              const input = document.getElementById('dest-input');
              if (input) {
                setTimeout(() => {
                  input.focus({ preventScroll: true });
                }, 350);
              }
            } else {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.hash]);

  return (
    <div className="relative min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Call Guest Navbar */}
      <GuestNavbar />

      {/* Landing Page Content */}
      <main className="w-full pt-16 flex-grow">
        <LandingPageView />
      </main>

    </div>
  );
}
