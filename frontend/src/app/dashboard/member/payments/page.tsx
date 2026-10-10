"use client"

const transactions = [
  { date: '30/06/2025', desc: 'Gói Perform - Tháng 7', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0038' },
  { date: '30/05/2025', desc: 'Gói Perform - Tháng 6', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0031' },
  { date: '30/04/2025', desc: 'Gói Perform - Tháng 5', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0024' },
  { date: '15/04/2025', desc: 'Gói PT 5 buổi', amount: '3,500,000 ₫', status: 'paid', receipt: '#INV-0022' },
  { date: '30/03/2025', desc: 'Gói Perform - Tháng 4', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0018' },
  { date: '28/02/2025', desc: 'Gói Perform - Tháng 3', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0011' },
  { date: '30/01/2025', desc: 'Gói Perform - Tháng 2', amount: '1,490,000 ₫', status: 'paid', receipt: '#INV-0007' },
  { date: '01/01/2025', desc: 'Nâng cấp lên Perform', amount: '600,000 ₫', status: 'paid', receipt: '#INV-0003' },
]

const columns = ['NGÀY', 'MÔ TẢ', 'SỐ TIỀN', 'TRẠNG THÁI', 'HÓA ĐƠN']

export default function PaymentsPage() {
  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#526B00',
            display: 'block',
            marginBottom: 4,
          }}
        >
          MEMBER
        </span>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
          Thanh toán &amp; Hóa đơn
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>

        {/* Current membership card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#5E625A',
                marginBottom: 8,
              }}
            >
              Hội viên hiện tại
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#111310', marginBottom: 8 }}>
              Perform
            </div>
            <span
              style={{
                background: '#E8FFAA',
                color: '#526B00',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              Đang hoạt động
            </span>
            <div style={{ fontSize: 13, color: '#5E625A', marginTop: 8 }}>
              Ngày gia hạn tiếp theo: 30/08/2025
            </div>
            <div style={{ fontSize: 13, color: '#5E625A', marginTop: 4 }}>
              Số tiền: 1,490,000 ₫/tháng
            </div>
          </div>
          <button
            style={{
              border: '1px solid #DADCD3',
              borderRadius: 10,
              padding: '10px 16px',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              color: '#111310',
            }}
          >
            Quản lý
          </button>
        </div>

        {/* Transaction history table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #DADCD3',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: '#111310' }}>
              Lịch sử giao dịch
            </span>
          </div>

          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr',
              padding: '10px 20px',
              borderBottom: '1px solid #DADCD3',
              background: '#F5F5F0',
            }}
          >
            {columns.map(col => (
              <div
                key={col}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#8A8E85',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em',
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {transactions.map((tx, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr',
                padding: '14px 20px',
                borderBottom: i < transactions.length - 1 ? '1px solid #DADCD3' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 13, color: '#5E625A' }}>{tx.date}</div>
              <div style={{ fontSize: 14, color: '#111310' }}>{tx.desc}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111310' }}>{tx.amount}</div>
              <div>
                <span
                  style={{
                    background: '#E8FFAA',
                    color: '#526B00',
                    borderRadius: 20,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Đã thanh toán
                </span>
              </div>
              <div>
                <a
                  href="#"
                  style={{
                    color: '#526B00',
                    fontSize: 13,
                    textDecoration: 'underline',
                  }}
                >
                  {tx.receipt}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
