import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PaymentModal({ isOpen, onClose }) {
  const { addPaymentMethod } = useApp();
  const [methodType, setMethodType] = useState('gcash');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber) return;

    let paymentObj = {
      type: methodType,
      name: methodType === 'gcash' ? 'GCash Wallet' : methodType === 'maya' ? 'Maya Wallet' : name || 'Credit / Debit Card',
      detail: methodType === 'card' ? `•••• ${accountNumber.slice(-4)}` : accountNumber,
      icon: methodType === 'card' ? 'credit_card' : 'account_balance_wallet',
      badge: methodType === 'card' ? 'Credit' : 'E-Wallet',
      accentColor: methodType === 'gcash' ? 'border-blue-500' : methodType === 'maya' ? 'border-emerald-500' : 'border-surface-container-high'
    };

    addPaymentMethod(paymentObj);
    setName('');
    setAccountNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container max-w-md w-full p-space-lg rounded-xl shadow-2xl border border-surface-container-highest space-y-space-md">
        
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
          <h3 className="text-headline-md font-headline-md text-on-surface flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary">add_card</span>
            <span>Link Payment Method</span>
          </h3>
          <button onClick={onClose} className="text-secondary hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          <div>
            <label className="text-label-md text-secondary block mb-space-3xs">Payment Gateway</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gcash', label: 'GCash', icon: 'account_balance_wallet' },
                { id: 'maya', label: 'Maya', icon: 'payments' },
                { id: 'card', label: 'Card', icon: 'credit_card' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethodType(m.id)}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center text-center transition-all ${
                    methodType === m.id
                      ? 'bg-primary-container text-on-primary-container border-primary font-semibold'
                      : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] mb-1">{m.icon}</span>
                  <span className="text-label-sm">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {methodType === 'card' && (
            <div>
              <label className="text-label-md text-secondary block mb-space-3xs">Cardholder Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mark Cruz"
                className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="text-label-md text-secondary block mb-space-3xs">
              {methodType === 'card' ? 'Card Number (16 Digits)' : 'Mobile Number (+63)'}
            </label>
            <input
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder={methodType === 'card' ? '4123 4567 8901 2345' : '+63 917 555 0192'}
              className="w-full bg-surface-container-low text-on-surface px-space-md py-space-xs rounded-lg text-body-md outline-none border border-surface-container-high focus:border-primary font-mono"
            />
          </div>

          <div className="text-body-sm text-secondary flex items-center space-x-1.5 pt-1">
            <span className="material-symbols-outlined text-emerald-400 text-[16px]">lock</span>
            <span>256-bit encrypted tokenization for instant boom gate exit</span>
          </div>

          <div className="pt-space-xs flex items-center justify-end space-x-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-secondary text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md font-semibold hover:opacity-90 transition-opacity"
            >
              Link Account
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
