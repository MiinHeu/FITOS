"use client";
import { useState } from 'react';

const statusTabs = ['All', 'New', 'Contacted', 'Trial', 'Converted', 'Lost'];

const leadsData = [
  { name: 'Nguyễn Thị Lan', email: 'lan.nguyen@gmail.com', phone: '0901 234 567', source: 'Walk-in', status: 'New', lastContact: '2 hours ago' },
  { name: 'Trần Minh Đức', email: 'duc.tran@email.vn', phone: '0912 345 678', source: 'Referral', status: 'Contacted', lastContact: 'Yesterday' },
  { name: 'Lê Thu Hương', email: 'huong.le@yahoo.com', phone: '0923 456 789', source: 'Instagram', status: 'Trial', lastContact: '3 days ago' },
  { name: 'Phạm Văn Khôi', email: 'khoi.pham@outlook.com', phone: '0934 567 890', source: 'Facebook', status: 'Converted', lastContact: '1 week ago' },
  { name: 'Hoàng Yến Nhi', email: 'nhi.hoang@gmail.com', phone: '0945 678 901', source: 'Walk-in', status: 'New', lastContact: '30 min ago' },
  { name: 'Đặng Quốc Bảo', email: 'bao.dang@email.vn', phone: '0956 789 012', source: 'Website', status: 'Lost', lastContact: '2 days ago' },
];

const statusStyles: Record<string, { background: string; color: string }> = {
  New:       { background: '#EFF6FF', color: '#1D4ED8' },
  Contacted: { background: '#FEFCE8', color: '#A16207' },
  Trial:     { background: '#D7FF3F', color: '#526B00' },
  Converted: { background: '#F0FDF4', color: '#15803D' },
  Lost:      { background: '#F5F5F0', color: '#5E625A' },
};

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = leadsData.filter((lead) => {
    const matchTab = activeTab === 'All' || lead.status === activeTab;
    const matchSearch =
      search === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    return matchTab && matchSearch;
  });

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            GROW
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>CRM Leads</h1>
        </div>
        <button
          className="text-sm font-semibold rounded-lg px-4 py-2"
          style={{ background: '#D7FF3F', color: '#111310' }}
        >
          + Add Lead
        </button>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

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
              placeholder="Search leads..."
              className="flex-1 max-w-sm border border-[#DADCD3] rounded-lg px-4 py-2 text-sm pl-9 focus:outline-none bg-white"
              style={{ color: '#111310', width: 280 }}
            />
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-2 ml-auto">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                style={{
                  background: activeTab === tab ? '#D7FF3F' : '#fff',
                  color: activeTab === tab ? '#526B00' : '#5E625A',
                  border: '1px solid',
                  borderColor: activeTab === tab ? '#D7FF3F' : '#DADCD3',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: '32', change: '+4 this week', changeColor: '#526B00' },
            { label: 'New This Week', value: '8', change: '+3 vs last week', changeColor: '#526B00' },
            { label: 'Trial Scheduled', value: '5', change: 'Next: tomorrow', changeColor: '#5E625A' },
            { label: 'Conversion Rate', value: '24%', change: '+2pts this month', changeColor: '#526B00' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#DADCD3] p-5">
              <p className="text-xs mb-2" style={{ color: '#5E625A' }}>{card.label}</p>
              <p className="text-[28px] font-bold" style={{ color: '#111310' }}>{card.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.changeColor }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          {/* Table header */}
          <div
            className="grid px-5 py-3 text-xs font-medium uppercase tracking-wide"
            style={{
              background: '#F5F5F0',
              color: '#5E625A',
              gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr 1fr',
            }}
          >
            {['Name', 'Phone', 'Status', 'Source', 'Last Contact', 'Actions'].map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F0F0EB]">
            {filtered.map((lead, i) => {
              const badge = statusStyles[lead.status] ?? statusStyles.Lost;
              return (
                <div
                  key={i}
                  className="grid px-5 py-3 items-center hover:bg-[#FAFAF8]"
                  style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr 1fr' }}
                >
                  {/* Name + email */}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#111310' }}>{lead.name}</p>
                    <p className="text-xs" style={{ color: '#5E625A' }}>{lead.email}</p>
                  </div>

                  {/* Phone */}
                  <span className="text-sm" style={{ color: '#111310' }}>{lead.phone}</span>

                  {/* Status pill */}
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.background, color: badge.color }}
                    >
                      {lead.status}
                    </span>
                  </div>

                  {/* Source */}
                  <span className="text-sm" style={{ color: '#5E625A' }}>{lead.source}</span>

                  {/* Last contact */}
                  <span className="text-sm" style={{ color: '#5E625A' }}>{lead.lastContact}</span>

                  {/* Actions */}
                  <div>
                    <button
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-[#DADCD3]"
                      style={{ background: '#F5F5F0', color: '#111310' }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-center py-10" style={{ color: '#5E625A' }}>No leads match your filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
