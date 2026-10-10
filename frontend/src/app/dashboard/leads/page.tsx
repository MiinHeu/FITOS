"use client";
import { useState } from 'react';
import Link from 'next/link';

const statusTabs = ["All", "New", "Contacted", "Trial", "Converted", "Lost"];

const leadsData = [
  {
    name: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@gmail.com',
    phone: '0901 234 567',
    source: 'Walk-in',
    status: 'New',
    lastContact: '2 giờ trước',
    trialDate: '15/07/2025',
  },
  {
    name: 'Trần Minh Đức',
    email: 'duc.tran@email.vn',
    phone: '0912 345 678',
    source: 'Referral',
    status: 'Contacted',
    lastContact: 'Hôm qua',
    trialDate: '16/07/2025',
  },
  {
    name: 'Lê Thu Hương',
    email: 'huong.le@yahoo.com',
    phone: '0923 456 789',
    source: 'Instagram',
    status: 'Trial',
    lastContact: '3 ngày trước',
    trialDate: '12/07/2025',
  },
  {
    name: 'Phạm Văn Khôi',
    email: 'khoi.pham@outlook.com',
    phone: '0934 567 890',
    source: 'Facebook',
    status: 'Converted',
    lastContact: '1 tuần trước',
    trialDate: '05/07/2025',
  },
  {
    name: 'Hoàng Yến Nhi',
    email: 'nhi.hoang@gmail.com',
    phone: '0945 678 901',
    source: 'Walk-in',
    status: 'New',
    lastContact: '30 phút trước',
    trialDate: '18/07/2025',
  },
  {
    name: 'Đặng Quốc Bảo',
    email: 'bao.dang@email.vn',
    phone: '0956 789 012',
    source: 'Website',
    status: 'Contacted',
    lastContact: '2 ngày trước',
    trialDate: '20/07/2025',
  },
];

const statusBadgeStyle: Record<string, { background: string; color: string }> = {
  New:       { background: '#E8FFAA', color: '#526B00' },
  Contacted: { background: '#E9EDFF', color: '#3B4FA8' },
  Trial:     { background: '#FFF3E0', color: '#B87000' },
  Converted: { background: '#E8F5E9', color: '#2E7D32' },
  Lost:      { background: '#F5F5F5', color: '#8A8E85' },
};

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#526B00',
              marginBottom: 4,
            }}
          >
            RECEPTIONIST · PULSE DISTRICT 2
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            CRM Leads
          </h1>
          <p style={{ fontSize: 14, color: '#8A8E85', marginTop: 4, marginBottom: 0 }}>
            Manage prospects and follow-ups
          </p>
        </div>
        <button
          style={{
            background: '#D7FF3F',
            color: '#111310',
            borderRadius: 10,
            padding: '10px 20px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          + Add lead
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          padding: '24px 28px',
        }}
      >
        {[
          { label: 'Total Leads',       value: '142', delta: '+18 this month',        deltaColor: '#526B00' },
          { label: 'New This Week',     value: '23',  delta: '+6 vs last week',        deltaColor: '#526B00' },
          { label: 'Trials Scheduled',  value: '11',  delta: 'Next: tomorrow, 9:00',   deltaColor: '#8A8E85' },
          { label: 'Converted',         value: '34',  delta: '31.4% conversion',       deltaColor: '#526B00' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
            }}
          >
            <p style={{ fontSize: 12, color: '#8A8E85', marginBottom: 8, marginTop: 0 }}>
              {stat.label}
            </p>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 12, color: stat.deltaColor, marginTop: 4, marginBottom: 0 }}>
              {stat.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Search input */}
        <div style={{ position: 'relative' }}>
          <svg
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 14,
              height: 14,
              color: '#8A8E85',
            }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            placeholder="Search leads..."
            style={{
              width: 240,
              background: '#F5F5F0',
              border: '1px solid #DADCD3',
              borderRadius: 10,
              padding: '8px 12px 8px 36px',
              fontSize: 13,
              color: '#111310',
              outline: 'none',
            }}
          />
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#171A16' : '#F5F5F0',
                color: activeTab === tab ? '#ECEDE6' : '#5E625A',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: activeTab === tab ? 600 : 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leads table */}
      <div style={{ padding: '0 28px 28px' }}>
        <div
          style={{
            marginTop: 24,
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F5F5F0' }}>
                {['NAME', 'PHONE', 'SOURCE', 'STATUS', 'LAST CONTACT', 'TRIAL DATE', 'ACTIONS'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '10px 16px',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#8A8E85',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textAlign: 'left',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadsData.map((lead, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid #DADCD3' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = '#F9F9F6';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                  }}
                >
                  {/* Name */}
                  <td style={{ padding: '14px 16px', fontSize: 13 }}>
                    <p style={{ fontWeight: 700, color: '#111310', margin: 0 }}>{lead.name}</p>
                    <p style={{ fontSize: 11, color: '#8A8E85', margin: '2px 0 0' }}>{lead.email}</p>
                  </td>
                  {/* Phone */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#111310' }}>
                    {lead.phone}
                  </td>
                  {/* Source */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#111310' }}>
                    {lead.source}
                  </td>
                  {/* Status */}
                  <td style={{ padding: '14px 16px', fontSize: 13 }}>
                    <span
                      style={{
                        ...statusBadgeStyle[lead.status],
                        borderRadius: 20,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  {/* Last Contact */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#111310' }}>
                    {lead.lastContact}
                  </td>
                  {/* Trial Date */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#111310' }}>
                    {lead.trialDate}
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '14px 16px', fontSize: 13 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        style={{
                          background: '#F5F5F0',
                          color: '#111310',
                          borderRadius: 8,
                          padding: '5px 12px',
                          fontSize: 12,
                          fontWeight: 500,
                          border: '1px solid #DADCD3',
                          cursor: 'pointer',
                        }}
                      >
                        View
                      </button>
                      <button
                        style={{
                          background: '#F5F5F0',
                          color: '#111310',
                          borderRadius: 8,
                          padding: '5px 12px',
                          fontSize: 16,
                          fontWeight: 500,
                          border: '1px solid #DADCD3',
                          cursor: 'pointer',
                          lineHeight: 1,
                        }}
                      >
                        ···
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
