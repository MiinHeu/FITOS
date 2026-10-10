"use client";
import { useState } from 'react';

interface Booking {
  name: string;
  cls: string;
  time: string;
  status: string;
  booked: string;
}

const bookings: Booking[] = [
  { name: 'Nguyễn Thị Trâm', cls: 'Strength Lab', time: '18:30', status: 'checked-in', booked: '08:15' },
  { name: 'Lê Văn Hùng', cls: 'HIIT Blast', time: '08:30', status: 'checked-in', booked: '20:00 hôm qua' },
  { name: 'Phạm Minh Châu', cls: 'Yoga Flow', time: '07:00', status: 'booked', booked: '07:30 hôm qua' },
  { name: 'Trần Thị Lan', cls: 'Cycling Power', time: '09:00', status: 'booked', booked: '09:45 hôm qua' },
  { name: 'Hoàng Đức Mạnh', cls: 'Strength Lab', time: '18:30', status: 'no-show', booked: '10:20 hôm qua' },
  { name: 'Vũ Thị Hoa', cls: 'Yin Yoga', time: '19:00', status: 'booked', booked: '11:00 hôm qua' },
  { name: 'Đỗ Quang Huy', cls: 'HIIT Circuit', time: '19:00', status: 'booked', booked: '14:30 hôm qua' },
  { name: 'Bùi Thị Ngọc', cls: 'Yoga Flow', time: '07:00', status: 'checked-in', booked: '06:50 hôm qua' },
  { name: 'Ngô Minh Tú', cls: 'Boxing Basics', time: '17:00', status: 'no-show', booked: '15:00 hôm qua' },
  { name: 'Lý Thị Mai', cls: 'Cycling Power', time: '09:00', status: 'checked-in', booked: '08:00 hôm qua' },
];

const statusBadge: Record<string, { background: string; color: string; label: string }> = {
  'checked-in': { background: '#E8FFAA', color: '#526B00', label: 'Đã check-in' },
  'booked':     { background: '#E9EDFF', color: '#3B4FA8', label: 'Đã đặt' },
  'no-show':    { background: '#FFE4E1', color: '#B91C1C', label: 'Vắng' },
};

const tableColumns = ['THÀNH VIÊN', 'LỚP HỌC', 'GIỜ', 'TRẠNG THÁI', 'THỜI GIAN ĐẶT', 'THAO TÁC'];
const gridCols = '2fr 1.5fr 1fr 1fr 1.5fr 1fr';

export default function BookingsPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: 4,
              color: '#526B00',
            }}
          >
            RECEPTIONIST
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            Đặt lịch &amp; Điểm danh
          </h1>
          <p style={{ fontSize: 13, color: '#8A8E85', marginTop: 4, marginBottom: 0 }}>
            Thứ Ba, 15/07/2025
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
          Check in
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>

        {/* 1. Check-in strip */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#111310',
              margin: '0 0 12px 0',
            }}
          >
            Quét thẻ / Check-in nhanh
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm tên hoặc quét mã thành viên..."
              style={{
                flex: 1,
                border: '1px solid #DADCD3',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 14,
                color: '#111310',
                outline: 'none',
                background: '#fff',
              }}
            />
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
                whiteSpace: 'nowrap',
              }}
            >
              Check in
            </button>
          </div>
        </div>

        {/* 2. Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 20,
          }}
        >
          {[
            { label: 'Checked In', value: '47', sub: 'Hôm nay' },
            { label: 'Booked', value: '63', sub: 'Hôm nay' },
            { label: 'No-shows', value: '8', sub: 'Chưa check-in' },
            { label: 'Capacity', value: '74%', sub: 'Công suất' },
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
              <p style={{ fontSize: 12, color: '#8A8E85', margin: '0 0 8px 0' }}>{stat.label}</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: 12, color: '#8A8E85', marginTop: 4, marginBottom: 0 }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* 3. Bookings table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            style={{
              background: '#F5F5F0',
              padding: '12px 20px',
              display: 'grid',
              gridTemplateColumns: gridCols,
            }}
          >
            {tableColumns.map((col) => (
              <span
                key={col}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#8A8E85',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {bookings.map((row, i) => {
            const badge = statusBadge[row.status];
            const initials = row.name
              .split(' ')
              .slice(-2)
              .map((w) => w[0])
              .join('');
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: gridCols,
                  padding: '14px 20px',
                  borderBottom: i < bookings.length - 1 ? '1px solid #DADCD3' : 'none',
                  alignItems: 'center',
                }}
              >
                {/* Member */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#ECEDE6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#111310',
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>{row.name}</span>
                </div>

                {/* Class */}
                <span style={{ fontSize: 13, color: '#111310' }}>{row.cls}</span>

                {/* Time */}
                <span style={{ fontSize: 13, color: '#111310' }}>{row.time}</span>

                {/* Status badge */}
                <div>
                  <span
                    style={{
                      background: badge.background,
                      color: badge.color,
                      borderRadius: 20,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Booked at */}
                <span style={{ fontSize: 13, color: '#8A8E85' }}>{row.booked}</span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{
                      background: '#F5F5F0',
                      color: '#111310',
                      borderRadius: 8,
                      padding: '4px 10px',
                      fontSize: 12,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Xem
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
