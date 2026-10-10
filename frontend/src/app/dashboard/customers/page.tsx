"use client";
import { useState } from 'react';

interface Member {
  name: string;
  plan: string;
  status: string;
  joined: string;
  expires: string;
  sessions: string;
}

const members: Member[] = [
  { name: 'Nguyễn Thị Trâm', plan: 'Perform', status: 'active',   joined: '01/03/2025', expires: '30/08/2025', sessions: '12/∞' },
  { name: 'Lê Văn Hùng',     plan: 'Move',    status: 'active',   joined: '15/01/2025', expires: '14/08/2025', sessions: '6/8' },
  { name: 'Phạm Minh Châu',  plan: 'PT Focus', status: 'active',  joined: '10/02/2025', expires: '09/09/2025', sessions: '4/8' },
  { name: 'Trần Thị Lan',    plan: 'Perform', status: 'expiring', joined: '15/07/2024', expires: '17/07/2025', sessions: '30/∞' },
  { name: 'Hoàng Đức Mạnh',  plan: 'Move',    status: 'expiring', joined: '20/06/2025', expires: '19/07/2025', sessions: '7/8' },
  { name: 'Vũ Thị Hoa',      plan: 'Perform', status: 'active',   joined: '05/04/2025', expires: '04/10/2025', sessions: '18/∞' },
  { name: 'Đỗ Quang Huy',    plan: 'Move',    status: 'expired',  joined: '01/12/2024', expires: '28/06/2025', sessions: '8/8' },
  { name: 'Bùi Thị Ngọc',   plan: 'PT Focus', status: 'active',  joined: '20/05/2025', expires: '19/11/2025', sessions: '2/8' },
  { name: 'Ngô Minh Tú',     plan: 'Perform', status: 'frozen',   joined: '10/03/2025', expires: '10/10/2025', sessions: '15/∞' },
  { name: 'Lý Thị Mai',      plan: 'Move',    status: 'active',   joined: '01/06/2025', expires: '31/08/2025', sessions: '4/8' },
];

const statusBadge: Record<string, { background: string; color: string; label: string }> = {
  active:   { background: '#E8FFAA', color: '#526B00', label: 'Hoạt động' },
  expiring: { background: '#FFF3E0', color: '#B87000', label: 'Sắp hết hạn' },
  expired:  { background: '#FFE4E1', color: '#B91C1C', label: 'Hết hạn' },
  frozen:   { background: '#E9EDFF', color: '#3B4FA8', label: 'Tạm dừng' },
};

const planBadge: Record<string, { background: string; color: string }> = {
  Move:       { background: '#F5F5F0', color: '#5E625A' },
  Perform:    { background: '#E8FFAA', color: '#526B00' },
  'PT Focus': { background: '#E9EDFF', color: '#3B4FA8' },
};

const gridCols = '2fr 1fr 1fr 1fr 1fr 1fr 1fr';
const tableColumns = ['THÀNH VIÊN', 'GÓI', 'TRẠNG THÁI', 'NGÀY THAM GIA', 'HẾT HẠN', 'SỐ BUỔI', 'THAO TÁC'];

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

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
            MANAGER
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            Khách hàng &amp; Hội viên
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{
              border: '1px solid #DADCD3',
              background: 'transparent',
              color: '#111310',
              borderRadius: 10,
              padding: '10px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Xuất dữ liệu
          </button>
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
            Thêm hội viên
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>

        {/* 1. Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 20,
          }}
        >
          {[
            { label: 'Tổng hội viên',   value: '642' },
            { label: 'Đang hoạt động',  value: '521' },
            { label: 'Sắp hết hạn',     value: '18' },
            { label: 'Đã rời',          value: '103' },
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
            </div>
          ))}
        </div>

        {/* 2. Search + filter bar */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 20,
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', flex: 1 }}>
            <svg
              style={{
                position: 'absolute',
                left: 12,
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm hội viên..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid #DADCD3',
                borderRadius: 10,
                padding: '10px 14px 10px 38px',
                fontSize: 14,
                color: '#111310',
                outline: 'none',
                background: '#fff',
              }}
            />
          </div>

          {/* Plan filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            style={{
              border: '1px solid #DADCD3',
              borderRadius: 10,
              padding: '10px 14px',
              background: '#fff',
              fontSize: 14,
              color: '#111310',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="All">Tất cả gói</option>
            <option value="Move">Move</option>
            <option value="Perform">Perform</option>
            <option value="PT Focus">PT Focus</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              border: '1px solid #DADCD3',
              borderRadius: 10,
              padding: '10px 14px',
              background: '#fff',
              fontSize: 14,
              color: '#111310',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang hoạt động">Đang hoạt động</option>
            <option value="Hết hạn">Hết hạn</option>
            <option value="Tạm dừng">Tạm dừng</option>
          </select>
        </div>

        {/* 3. Members table */}
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
          {members.map((row, i) => {
            const sb = statusBadge[row.status];
            const pb = planBadge[row.plan] ?? { background: '#F5F5F0', color: '#5E625A' };
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
                  borderBottom: i < members.length - 1 ? '1px solid #DADCD3' : 'none',
                  alignItems: 'center',
                }}
              >
                {/* Member */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
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

                {/* Plan badge */}
                <div>
                  <span
                    style={{
                      background: pb.background,
                      color: pb.color,
                      borderRadius: 20,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {row.plan}
                  </span>
                </div>

                {/* Status badge */}
                <div>
                  <span
                    style={{
                      background: sb.background,
                      color: sb.color,
                      borderRadius: 20,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'inline-block',
                    }}
                  >
                    {sb.label}
                  </span>
                </div>

                {/* Joined */}
                <span style={{ fontSize: 13, color: '#111310' }}>{row.joined}</span>

                {/* Expires */}
                <span style={{ fontSize: 13, color: '#111310' }}>{row.expires}</span>

                {/* Sessions */}
                <span style={{ fontSize: 13, color: '#111310' }}>{row.sessions}</span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span
                    style={{ color: '#526B00', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
                  >
                    Xem
                  </span>
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
                    Gia hạn
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
