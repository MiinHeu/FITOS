"use client";
import { useState } from 'react';
import Link from 'next/link';

const TIME_SLOTS = ['07:00', '08:00', '09:00', '10:00', '12:00', '17:00', '18:00', '19:00', '20:00'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#F5F5F0',
  border: '1px solid #DADCD3',
  borderRadius: 8,
  padding: '9px 12px',
  fontSize: 13,
  color: '#111310',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: '#5E625A',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export default function CreateLeadPage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Link
          href="/dashboard/leads"
          style={{
            background: '#F5F5F0',
            border: '1px solid #DADCD3',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 13,
            color: '#111310',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111310', margin: 0 }}>
          Create lead &amp; schedule trial
        </h1>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 24,
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          {/* Card 1 — Lead information */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 20, margin: '0 0 20px 0' }}>
              Lead information
            </h2>

            {/* Full name */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Full name</label>
              <input type="text" style={inputStyle} />
            </div>

            {/* Phone number */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Phone number</label>
              <input type="tel" style={inputStyle} />
            </div>

            {/* Email address */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email address</label>
              <input type="email" style={inputStyle} />
            </div>

            {/* Source */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Source</label>
              <select style={inputStyle}>
                <option>Walk-in</option>
                <option>Referral</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Website</option>
                <option>Other</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                rows={3}
                placeholder="Add notes about this lead..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Card 2 — Trial scheduling */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111310', margin: '0 0 20px 0' }}>
              Schedule trial
            </h2>

            {/* Trial date */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Trial date</label>
              <input type="date" style={inputStyle} />
            </div>

            {/* Preferred time */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Preferred time</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    style={
                      selectedTime === slot
                        ? {
                            background: '#D7FF3F',
                            border: '1px solid #D7FF3F',
                            borderRadius: 8,
                            padding: '8px 14px',
                            fontSize: 13,
                            color: '#111310',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }
                        : {
                            background: '#F5F5F0',
                            border: '1px solid #DADCD3',
                            borderRadius: 8,
                            padding: '8px 14px',
                            fontSize: 13,
                            color: '#111310',
                            cursor: 'pointer',
                          }
                    }
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Assign trainer */}
            <div>
              <label style={labelStyle}>Assign trainer</label>
              <select style={inputStyle}>
                <option>Auto-assign</option>
                <option>Coach Minh Trần</option>
                <option>Coach An Phạm</option>
                <option>Coach Quân Lê</option>
                <option>Coach Mai Vũ</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Summary */}
        <div>
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
              position: 'sticky',
              top: 24,
            }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111310', margin: '0 0 20px 0' }}>
              Summary
            </h2>

            {/* Summary rows */}
            {[
              { label: 'Name', value: '—' },
              { label: 'Phone', value: '—' },
              { label: 'Source', value: '—' },
              { label: 'Trial date', value: '—' },
              { label: 'Trainer', value: 'Auto-assign' },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #F0F0EA',
                  padding: '10px 0',
                }}
              >
                <span style={{ fontSize: 12, color: '#8A8E85' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#111310' }}>{row.value}</span>
              </div>
            ))}

            {/* Create lead button */}
            <button
              style={{
                width: '100%',
                background: '#D7FF3F',
                color: '#111310',
                borderRadius: 10,
                padding: '12px 0',
                fontSize: 14,
                fontWeight: 700,
                marginTop: 24,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create lead
            </button>

            {/* Disclaimer */}
            <p
              style={{
                fontSize: 11,
                color: '#8A8E85',
                textAlign: 'center',
                marginTop: 12,
                lineHeight: 1.5,
              }}
            >
              A confirmation will be sent to the lead&apos;s email and phone number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
