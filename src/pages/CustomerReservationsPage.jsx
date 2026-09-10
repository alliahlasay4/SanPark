import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CustomerReservationsPage() {
  const navigate = useNavigate();
  const { customerReservations, setActiveView } = useApp();

  return (
    <div className="w-full px-container-margin py-space-lg md:px-space-xl">
      <div className="mb-space-lg flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-1 flex items-center gap-2 text-label-md uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined text-[18px]">badge</span>
            Admin Operations
          </div>
          <h1 className="text-headline-xl font-headline-xl text-on-surface">Customer Reservations</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">Bookings created by the admin on behalf of customers.</p>
        </div>
        <button
          type="button"
          onClick={() => { setActiveView('find-parking'); navigate('/'); }}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-space-md py-space-xs text-label-lg font-semibold text-on-primary-container shadow-lg shadow-primary-container/20"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Book for Customer
        </button>
      </div>

      {customerReservations.length === 0 ? (
        <div className="rounded-xl border border-surface-container-high bg-surface-container p-10 text-center">
          <span className="material-symbols-outlined text-[48px] text-secondary">assignment_ind</span>
          <h2 className="mt-3 text-headline-md font-headline-md text-on-surface">No customer reservations yet</h2>
          <p className="mx-auto mt-2 max-w-md text-body-sm text-on-surface-variant">Find an available hub and use Book for Customer to create an audited reservation.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-surface-container-high bg-surface-container shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-body-sm">
              <thead className="border-b border-surface-container-highest bg-surface-container-low text-label-sm uppercase tracking-wider text-secondary">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Created By</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {customerReservations.map(reservation => (
                  <tr key={reservation.id} className="border-b border-surface-container-highest last:border-0">
                    <td className="px-4 py-4"><div className="font-semibold text-on-surface">{reservation.customerName}</div><div className="text-xs text-on-surface-variant">{reservation.customerEmail}</div></td>
                    <td className="px-4 py-4"><div className="text-on-surface">{reservation.customerPlate}</div><div className="text-xs text-on-surface-variant">{reservation.vehicle}</div></td>
                    <td className="px-4 py-4"><div className="text-on-surface">{reservation.bay}</div><div className="text-xs text-on-surface-variant">{reservation.duration}</div></td>
                    <td className="px-4 py-4"><div className="text-on-surface">{reservation.createdBy}</div><div className="text-xs text-on-surface-variant">{reservation.createdAt}</div></td>
                    <td className="px-4 py-4"><span className="rounded-full border border-emerald-500/30 bg-emerald-950/30 px-2 py-1 text-xs font-semibold text-emerald-400">{reservation.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
