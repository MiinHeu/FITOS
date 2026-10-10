"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const receiptRows = [
  { label: 'Thành viên',  value: 'Nguyễn Thị Trâm' },
  { label: 'Gói',         value: 'Perform' },
  { label: 'Số tiền',     value: '1,490,000 ₫' },
  { label: 'Phương thức', value: 'Chuyển khoản' },
  { label: 'Ngày',        value: '15/07/2025' },
  { label: 'Mã hóa đơn',  value: '#INV-20250715-0042' },
];

export default function PaymentConfirmedPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F0',
      }}
    >
      <div style={{ maxWidth: 520, width: '100%', padding: 24 }}>
        {/* Checkmark hero */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#D7FF3F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#111310"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 20 L17 29 L32 13" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#111310',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Thanh toán thành công!
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#5E625A',
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          Đã kích hoạt hội viên thành công
        </p>

        {/* Receipt card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
            marginTop: 24,
          }}
        >
          {receiptRows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < receiptRows.length - 1 ? '1px solid #DADCD3' : 'none',
              }}
            >
              <span style={{ fontSize: 13, color: '#5E625A' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            style={{
              flex: 1,
              border: '1px solid #DADCD3',
              background: 'transparent',
              borderRadius: 10,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 600,
              color: '#111310',
              cursor: 'pointer',
            }}
          >
            In hóa đơn
          </button>
          <Link
            href="/dashboard/sales"
            style={{
              flex: 1,
              background: '#171A16',
              color: '#ECEDE6',
              borderRadius: 10,
              padding: '12px 0',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Quay lại bán hàng
          </Link>
        </div>

        {/* Countdown */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 13,
            color: '#8A8E85',
          }}
        >
          {countdown > 0
            ? `Tự động quay lại trong ${countdown}s`
            : 'Đang chuyển hướng...'}
        </p>
      </div>
    </div>
  );
}
