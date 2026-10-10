"use client";
import { useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  name: string;
  plan: string;
}

const searchResults: SearchResult[] = [
  { name: 'Nguyễn Thị Trâm', plan: 'Perform' },
  { name: 'Lê Văn Hùng',     plan: 'Move' },
  { name: 'Phạm Minh Châu',  plan: 'PT Focus' },
];

interface Plan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
}

const plans: Plan[] = [
  { id: 'move',    name: 'Move',     price: 890000,   priceLabel: '890,000' },
  { id: 'perform', name: 'Perform',  price: 1490000,  priceLabel: '1,490,000' },
  { id: 'pt',      name: 'PT Focus', price: 3200000,  priceLabel: '3,200,000' },
];

interface Addon {
  id: string;
  label: string;
  price: number;
  priceLabel: string;
}

const addons: Addon[] = [
  { id: 'pt_session', label: 'Buổi PT',           price: 500000, priceLabel: '500,000 ₫/buổi' },
  { id: 'locker',     label: 'Tủ locker',          price: 150000, priceLabel: '150,000 ₫/tháng' },
  { id: 'towel',      label: 'Dịch vụ khăn tắm',  price: 100000, priceLabel: '100,000 ₫/tháng' },
];

const paymentMethods = [
  { id: 'cash',     label: 'Tiền mặt',     icon: '💵' },
  { id: 'card',     label: 'Thẻ ngân hàng', icon: '💳' },
  { id: 'transfer', label: 'Chuyển khoản', icon: '📲' },
];

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

export default function CreateSalePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<SearchResult | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkedAddons, setCheckedAddons] = useState<Set<string>>(new Set());
  const [discount, setDiscount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('cash');

  const toggleAddon = (id: string) => {
    setCheckedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const planObj = plans.find((p) => p.id === selectedPlan);
  const addonItems = addons.filter((a) => checkedAddons.has(a.id));
  const subtotal =
    (planObj ? planObj.price : 0) +
    addonItems.reduce((sum, a) => sum + a.price, 0);
  const discountNum = parseInt(discount.replace(/\D/g, '') || '0', 10);
  const total = Math.max(0, subtotal - discountNum);

  const showResults = searchQuery.length > 0 && !selectedMember;

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '20px 28px 24px',
        }}
      >
        <Link
          href="/dashboard/sales"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: '#5E625A',
            textDecoration: 'none',
            marginBottom: 8,
          }}
        >
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
          Tạo đơn bán hàng
        </h1>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* LEFT COLUMN */}
        <div>
          {/* Member search card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111310', margin: '0 0 12px 0' }}>
              Tìm hội viên
            </p>

            {/* Search input */}
            <div style={{ position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
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
                type="text"
                placeholder="Nhập tên hoặc số điện thoại..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedMember(null);
                }}
                style={{
                  width: '100%',
                  paddingLeft: 40,
                  paddingRight: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 13,
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111310',
                }}
              />
            </div>

            {/* Selected member display */}
            {selectedMember && (
              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: '#F5F5F0',
                  borderRadius: 10,
                  border: '1px solid #DADCD3',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#D7FF3F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#111310',
                    flexShrink: 0,
                  }}
                >
                  {selectedMember.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111310', margin: 0 }}>
                    {selectedMember.name}
                  </p>
                  <p style={{ fontSize: 12, color: '#8A8E85', margin: '2px 0 0 0' }}>
                    Gói hiện tại: {selectedMember.plan}
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedMember(null); setSearchQuery(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#8A8E85',
                    padding: 4,
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Search results dropdown */}
            {showResults && (
              <div
                style={{
                  marginTop: 8,
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                {searchResults.map((r, i) => (
                  <div
                    key={r.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      borderBottom: i < searchResults.length - 1 ? '1px solid #DADCD3' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: '#E8FFAA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#526B00',
                        flexShrink: 0,
                      }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111310', margin: 0 }}>
                        {r.name}
                      </p>
                      <p style={{ fontSize: 12, color: '#8A8E85', margin: '2px 0 0 0' }}>
                        {r.plan}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMember(r);
                        setSearchQuery(r.name);
                      }}
                      style={{
                        background: '#D7FF3F',
                        border: 'none',
                        borderRadius: 8,
                        padding: '6px 14px',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#111310',
                        cursor: 'pointer',
                      }}
                    >
                      Chọn
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plan selector card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111310', margin: '0 0 12px 0' }}>
              Chọn gói
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
              }}
            >
              {plans.map((p) => {
                const isSelected = selectedPlan === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(isSelected ? null : p.id)}
                    style={{
                      background: isSelected ? '#FAFFF0' : '#fff',
                      border: isSelected ? '2px solid #D7FF3F' : '1px solid #DADCD3',
                      borderRadius: 12,
                      padding: '16px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#111310',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#526B00', margin: 0 }}>
                      đ{p.priceLabel}
                      <span style={{ fontSize: 11, fontWeight: 400, color: '#8A8E85' }}>
                        /tháng
                      </span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111310', margin: '0 0 12px 0' }}>
              Dịch vụ bổ sung
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {addons.map((addon) => {
                const checked = checkedAddons.has(addon.id);
                return (
                  <label
                    key={addon.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: checked ? '1px solid #D7FF3F' : '1px solid #DADCD3',
                      background: checked ? '#FAFFF0' : '#fff',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon.id)}
                      style={{ width: 16, height: 16, accentColor: '#D7FF3F', cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>
                        {addon.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#8A8E85' }}>{addon.priceLabel}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — order summary (sticky) */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111310', margin: '0 0 16px 0' }}>
              Tóm tắt đơn hàng
            </p>

            {/* Selected items */}
            {!planObj && addonItems.length === 0 && (
              <p style={{ fontSize: 13, color: '#8A8E85', margin: '0 0 16px 0' }}>
                Chưa chọn sản phẩm
              </p>
            )}
            {planObj && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13, color: '#5E625A' }}>Gói {planObj.name}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>
                  đ{planObj.priceLabel}
                </span>
              </div>
            )}
            {addonItems.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13, color: '#5E625A' }}>{a.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>
                  {formatVND(a.price)}
                </span>
              </div>
            ))}

            {/* Subtotal */}
            {(planObj || addonItems.length > 0) && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px solid #DADCD3',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 13, color: '#5E625A' }}>Tạm tính</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>
                  {formatVND(subtotal)}
                </span>
              </div>
            )}

            {/* Discount input */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#8A8E85', display: 'block', marginBottom: 6 }}>
                Giảm giá
              </label>
              <input
                type="text"
                placeholder="0 ₫"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: 13,
                  border: '1px solid #DADCD3',
                  borderRadius: 8,
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: '#111310',
                }}
              />
            </div>

            {/* Divider + total */}
            <div
              style={{
                borderTop: '1px solid #DADCD3',
                paddingTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111310' }}>Tổng cộng</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#111310' }}>
                {formatVND(total)}
              </span>
            </div>

            {/* Payment method selector */}
            <p style={{ fontSize: 12, color: '#8A8E85', margin: '0 0 10px 0' }}>
              Phương thức thanh toán
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                marginBottom: 20,
              }}
            >
              {paymentMethods.map((m) => {
                const active = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    style={{
                      background: active ? '#D7FF3F' : '#F5F5F0',
                      border: active ? '1.5px solid #B8D900' : '1px solid #DADCD3',
                      borderRadius: 10,
                      padding: '10px 6px',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{m.icon}</div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: active ? '#111310' : '#5E625A',
                      }}
                    >
                      {m.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confirm button */}
            <button
              style={{
                background: '#D7FF3F',
                color: '#111310',
                border: 'none',
                borderRadius: 10,
                width: '100%',
                padding: '14px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
