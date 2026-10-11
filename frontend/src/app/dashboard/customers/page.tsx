"use client";
import { useState } from 'react';

interface Member {
  name: string;
  email: string;
  plan: string;
  joinDate: string;
  status: string;
  expires: string;
}

const members: Member[] = [
  { name: 'Nguyễn Thị Trâm', email: 'tram.nguyen@gmail.com', plan: 'Perform', joinDate: '01 Mar 2025', status: 'active', expires: '30 Aug 2025' },
  { name: 'Lê Văn Hùng', email: 'hung.le@email.vn', plan: 'Move', joinDate: '15 Jan 2025', status: 'active', expires: '14 Aug 2025' },
  { name: 'Phạm Minh Châu', email: 'chau.pham@yahoo.com', plan: 'PT Focus', joinDate: '10 Feb 2025', status: 'active', expires: '09 Sep 2025' },
  { name: 'Trần Thị Lan', email: 'lan.tran@outlook.com', plan: 'Perform', joinDate: '15 Jul 2024', status: 'expiring', expires: '17 Jul 2025' },
  { name: 'Hoàng Đức Mạnh', email: 'manh.hoang@gmail.com', plan: 'Move', joinDate: '20 Jun 2025', status: 'expiring', expires: '19 Jul 2025' },
  { name: 'Vũ Thị Hoa', email: 'hoa.vu@gmail.com', plan: 'Perform', joinDate: '05 Apr 2025', status: 'active', expires: '04 Oct 2025' },
];

const statusBadge: Record<string, { background: string; color: string; label: string }> = {
  active:   { background: '#F0FDF4', color: '#15803D', label: 'Active' },
  expiring: { background: '#FEFCE8', color: '#A16207', label: 'Expiring' },
  expired:  { background: '#FFF0F0', color: '#D93030', label: 'Expired' },
  inactive: { background: '#F5F5F0', color: '#5E625A', label: 'Inactive' },
};

const filterTabs = ['All', 'Active', 'Expiring', 'Inactive'];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = members.filter((m) => {
    const matchSearch =
      search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Active' && m.status === 'active') ||
      (activeFilter === 'Expiring' && m.status === 'expiring') ||
      (activeFilter === 'Inactive' && (m.status === 'inactive' || m.status === 'expired'));
    return matchSearch && matchFilter;
  });

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            GROW
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>Members</h1>
        </div>
        <button
          className="text-sm font-semibold rounded-lg px-4 py-2"
          style={{ background: '#D7FF3F', color: '#111310' }}
        >
          + Add Member
        </button>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Members', value: '248', change: '+12 this month', changeColor: '#526B00' },
            { label: 'Active', value: '231', change: '93% of total', changeColor: '#5E625A' },
            { label: 'Expiring Soon', value: '14', change: 'Next 30 days', changeColor: '#A16207' },
            { label: 'New This Month', value: '12', change: '+3 vs last month', changeColor: '#526B00' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#DADCD3] p-5">
              <p className="text-xs mb-2" style={{ color: '#5E625A' }}>{card.label}</p>
              <p className="text-[28px] font-bold" style={{ color: '#111310' }}>{card.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.changeColor }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative">
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
              placeholder="Search members..."
              className="border border-[#DADCD3] rounded-lg px-4 py-2 text-sm pl-9 focus:outline-none bg-white"
              style={{ color: '#111310', width: 280 }}
            />
          </div>

          {/* Type filter pills */}
          <div className="flex items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: activeFilter === tab ? '#D7FF3F' : '#fff',
                  color: activeFilter === tab ? '#526B00' : '#5E625A',
                  border: '1px solid',
                  borderColor: activeFilter === tab ? '#D7FF3F' : '#DADCD3',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Members table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          {/* Header */}
          <div
            className="grid px-5 py-3 text-xs font-medium uppercase tracking-wide"
            style={{
              background: '#F5F5F0',
              color: '#5E625A',
              gridTemplateColumns: '2.5fr 1fr 1.2fr 1.2fr 1.2fr 1fr',
            }}
          >
            {['Member', 'Plan', 'Join Date', 'Status', 'Expires', 'Actions'].map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F0F0EB]">
            {filtered.map((m, i) => {
              const badge = statusBadge[m.status] ?? statusBadge.inactive;
              const initials = m.name.split(' ').slice(-2).map((w) => w[0]).join('');
              return (
                <div
                  key={i}
                  className="grid px-5 py-3 items-center hover:bg-[#FAFAF8]"
                  style={{ gridTemplateColumns: '2.5fr 1fr 1.2fr 1.2fr 1.2fr 1fr' }}
                >
                  {/* Member avatar + name + email */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#F0F0EB', color: '#111310' }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#111310' }}>{m.name}</p>
                      <p className="text-xs" style={{ color: '#5E625A' }}>{m.email}</p>
                    </div>
                  </div>

                  {/* Plan */}
                  <span className="text-sm" style={{ color: '#5E625A' }}>{m.plan}</span>

                  {/* Join Date */}
                  <span className="text-sm" style={{ color: '#5E625A' }}>{m.joinDate}</span>

                  {/* Status */}
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.background, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Expires */}
                  <span className="text-sm" style={{ color: '#5E625A' }}>{m.expires}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
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
            <p className="text-sm text-center py-10" style={{ color: '#5E625A' }}>No members match your filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
