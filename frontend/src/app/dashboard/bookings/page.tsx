"use client";
import { useState } from 'react';

interface Booking {
  time: string;
  cls: string;
  member: string;
  status: 'booked' | 'checked-in' | 'no-show';
}

const bookings: Booking[] = [
  { time: '07:00', cls: 'Yoga Flow',      member: 'Phạm Minh Châu',  status: 'checked-in' },
  { time: '07:00', cls: 'Yoga Flow',      member: 'Bùi Thị Ngọc',   status: 'checked-in' },
  { time: '08:30', cls: 'HIIT Blast',     member: 'Lê Văn Hùng',    status: 'checked-in' },
  { time: '09:00', cls: 'Cycling Power',  member: 'Lý Thị Mai',     status: 'checked-in' },
  { time: '09:00', cls: 'Cycling Power',  member: 'Trần Thị Lan',   status: 'booked' },
  { time: '17:00', cls: 'Boxing Basics',  member: 'Ngô Minh Tú',    status: 'no-show' },
  { time: '18:30', cls: 'Strength Lab',   member: 'Nguyễn Thị Trâm',status: 'booked' },
  { time: '18:30', cls: 'Strength Lab',   member: 'Hoàng Đức Mạnh', status: 'no-show' },
  { time: '19:00', cls: 'HIIT Circuit',   member: 'Đỗ Quang Huy',   status: 'booked' },
  { time: '19:00', cls: 'Yin Yoga',       member: 'Vũ Thị Hoa',     status: 'booked' },
];

const statusBadge: Record<Booking['status'], { background: string; color: string; label: string }> = {
  'checked-in': { background: '#F0FDF4', color: '#15803D', label: 'Checked In' },
  'booked':     { background: '#EFF6FF', color: '#1D4ED8', label: 'Booked' },
  'no-show':    { background: '#FFF0F0', color: '#D93030', label: 'No-Show' },
};

export default function BookingsPage() {
  const [search, setSearch] = useState('');

  const filtered = bookings.filter((b) =>
    search === '' ||
    b.member.toLowerCase().includes(search.toLowerCase()) ||
    b.cls.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            OPERATE
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>Bookings &amp; Check-in</h1>
        </div>
        <span className="text-sm" style={{ color: '#5E625A' }}>{today}</span>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

        {/* Check-in strip */}
        <div className="bg-white rounded-xl border border-[#DADCD3] p-4 flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#5E625A' }}
              fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member name or class..."
              className="w-full border border-[#DADCD3] rounded-lg px-4 py-2 text-sm pl-9 focus:outline-none"
              style={{ color: '#111310' }}
            />
          </div>

          <button
            className="text-sm font-semibold rounded-lg px-4 py-2 flex-shrink-0"
            style={{ background: '#D7FF3F', color: '#111310' }}
          >
            Check in
          </button>

          {/* QR icon button */}
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#DADCD3]"
            style={{ background: '#fff', color: '#5E625A' }}
            title="Scan QR"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h1M19 14h2M14 19h2M17 17h2M19 19v2" />
            </svg>
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's Bookings", value: '48', change: 'Total registered', changeColor: '#5E625A' },
            { label: 'Checked In', value: '32', change: '67% arrived', changeColor: '#526B00' },
            { label: 'No-Shows', value: '4', change: '8% of bookings', changeColor: '#D93030' },
            { label: 'Available Spots', value: '16', change: 'Across all classes', changeColor: '#5E625A' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#DADCD3] p-5">
              <p className="text-xs mb-2" style={{ color: '#5E625A' }}>{card.label}</p>
              <p className="text-[28px] font-bold" style={{ color: '#111310' }}>{card.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.changeColor }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          {/* Header */}
          <div
            className="grid px-5 py-3 text-xs font-medium uppercase tracking-wide"
            style={{
              background: '#F5F5F0',
              color: '#5E625A',
              gridTemplateColumns: '1fr 2fr 2fr 1.5fr 1fr',
            }}
          >
            {['Time', 'Class', 'Member', 'Status', 'Actions'].map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F0F0EB]">
            {filtered.map((row, i) => {
              const badge = statusBadge[row.status];
              const initials = row.member.split(' ').slice(-2).map((w) => w[0]).join('');
              return (
                <div
                  key={i}
                  className="grid px-5 py-3 items-center hover:bg-[#FAFAF8]"
                  style={{ gridTemplateColumns: '1fr 2fr 2fr 1.5fr 1fr' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#111310' }}>{row.time}</span>

                  <span className="text-sm" style={{ color: '#111310' }}>{row.cls}</span>

                  {/* Member */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#F0F0EB', color: '#111310' }}
                    >
                      {initials}
                    </div>
                    <span className="text-sm" style={{ color: '#111310' }}>{row.member}</span>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.background, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div>
                    <button
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-[#DADCD3]"
                      style={{ background: '#F5F5F0', color: '#111310' }}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-center py-10" style={{ color: '#5E625A' }}>No bookings match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
