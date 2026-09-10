import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-high py-space-lg mt-auto">
      <div className="w-full px-container-margin md:px-space-xl flex flex-col md:flex-row items-center justify-between text-body-sm text-on-surface-variant gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span>© 2024 SanPark Smart Parking Platform. All rights reserved.</span>
        </div>
        <div className="flex space-x-space-md text-secondary">
          <a className="hover:text-on-surface transition-colors cursor-pointer" href="#privacy">Privacy Policy</a>
          <a className="hover:text-on-surface transition-colors cursor-pointer" href="#terms">Terms of Service</a>
          <a className="hover:text-on-surface transition-colors cursor-pointer" href="#support">Support &amp; ANPR API</a>
        </div>
      </div>
    </footer>
  );
}
