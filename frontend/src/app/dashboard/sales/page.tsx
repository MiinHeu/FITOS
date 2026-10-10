"use client";

interface Transaction {
  name: string;
  plan: string;
  amount: string;
  method: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
}

const transactions: Transaction[] = [
  { name: 'Nguyễn Thị Trâm', plan: 'Perform',        amount: '1,490,000 ₫', method: 'Chuyển khoản',   status: 'paid',    date: '15/07/2025' },
  { name: 'Lê Văn Hùng',     plan: 'Move',            amount: '890,000 ₫',   method: 'Tiền mặt',       status: 'paid',    date: '15/07/2025' },
  { name: 'Phạm Minh Châu',  plan: 'PT Focus',        amount: '3,200,000 ₫', method: 'Thẻ ngân hàng',  status: 'paid',    date: '14/07/2025' },
  { name: 'Trần Thị Lan',    plan: 'Perform',         amount: '1,490,000 ₫', method: 'Chuyển khoản',   status: 'pending', date: '14/07/2025' },
  { name: 'Hoàng Đức Mạnh',  plan: 'Gói PT 10 buổi', amount: '6,500,000 ₫', method: 'Thẻ ngân hàng',  status: 'paid',    date: '13/07/2025' },
  { name: 'Vũ Thị Hoa',      plan: 'Move',            amount: '890,000 ₫',   method: 'Tiền mặt',       status: 'paid',    date: '13/07/2025' },
  { name: 'Đỗ Quang Huy',    plan: 'Perform',         amount: '1,490,000 ₫', method: 'Chuyển khoản',   status: 'failed',  date: '12/07/2025' },
  { name: 'Bùi Thị Ngọc',   plan: 'Gói PT 5 buổi',  amount: '3,500,000 ₫', method: 'Thẻ ngân hàng',  status: 'paid',    date: '12/07/2025' },
  { name: 'Ngô Minh Tú',     plan: 'PT Focus',        amount: '3,200,000 ₫', method: 'Chuyển khoản',   status: 'paid',    date: '11/07/2025' },
  { name: 'Lý Thị Mai',      plan: 'Move',            amount: '890,000 ₫',   method: 'Tiền mặt',       status: 'paid',    date: '11/07/2025' },
];

const statusBadge: Record<Transaction['status'], { background: string; color: string; label: string }> = {
  paid:    { background: '#E8FFAA', color: '#526B00', label: 'Đã thanh toán' },
  pending: { background: '#FFF3E0', color: '#B87000', label: 'Chờ xử lý' },
  failed:  { background: '#FFE4E1', color: '#B91C1C', label: 'Thất bại' },
};

const summaryCards = [
  { label: 'Doanh thu hôm nay', amount: '4,850,000 ₫',  delta: '+12.4% so với hôm qua' },
  { label: 'Tháng này',         amount: '86,420,000 ₫', delta: '+8.1% so với tháng trước' },
  { label: 'Chờ thanh toán',    amount: '2,300,000 ₫',  delta: '3 giao dịch đang chờ' },
  { label: 'Giá trị TB đơn',   amount: '1,215,000 ₫',  delta: '+5.3% so với tháng trước' },
];

const gridCols = '2fr 1.5fr 1.5fr 1fr 1fr 1fr';
const tableColumns = ['THÀNH VIÊN', 'GÓI', 'SỐ TIỀN', 'PHƯƠNG THỨC', 'TRẠNG THÁI', 'NGÀY'];

export default function SalesPage() {
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
            Bán hàng &amp; Đơn hàng
          </h1>
        </div>
        <button
          style={{
            background: '#D7FF3F',
            color: '#111310',
            border: 'none',
            borderRadius: 10,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Bán mới
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        {/* Revenue summary cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {summaryCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid #DADCD3',
                padding: 20,
              }}
            >
              <p style={{ fontSize: 12, color: '#8A8E85', margin: '0 0 8px 0' }}>{card.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#111310', margin: '0 0 6px 0' }}>
                {card.amount}
              </p>
              <p style={{ fontSize: 12, color: '#526B00', margin: 0 }}>{card.delta}</p>
            </div>
          ))}
        </div>

        {/* Recent transactions table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#111310',
              padding: '16px 20px',
              margin: 0,
              borderBottom: '1px solid #DADCD3',
            }}
          >
            Giao dịch gần đây
          </p>

          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              background: '#F5F5F0',
              padding: '10px 20px',
            }}
          >
            {tableColumns.map((col) => (
              <span
                key={col}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#8A8E85',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {transactions.map((tx, i) => {
            const badge = statusBadge[tx.status];
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: gridCols,
                  padding: '14px 20px',
                  alignItems: 'center',
                  borderBottom: i < transactions.length - 1 ? '1px solid #DADCD3' : 'none',
                }}
              >
                {/* Member */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
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
                    {tx.name.charAt(0)}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>{tx.name}</span>
                </div>

                {/* Plan */}
                <span style={{ fontSize: 13, color: '#5E625A' }}>{tx.plan}</span>

                {/* Amount */}
                <span style={{ fontSize: 13, fontWeight: 700, color: '#111310' }}>{tx.amount}</span>

                {/* Method */}
                <span style={{ fontSize: 13, color: '#5E625A' }}>{tx.method}</span>

                {/* Status badge */}
                <span
                  style={{
                    display: 'inline-block',
                    background: badge.background,
                    color: badge.color,
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 6,
                    padding: '3px 10px',
                  }}
                >
                  {badge.label}
                </span>

                {/* Date */}
                <span style={{ fontSize: 13, color: '#8A8E85' }}>{tx.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
