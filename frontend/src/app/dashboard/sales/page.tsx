"use client";

interface Transaction {
  date: string;
  member: string;
  plan: string;
  amount: string;
  method: string;
  status: 'paid' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { date: '15 Jul 2025', member: 'Nguyễn Thị Trâm', plan: 'Perform', amount: '$149', method: 'Bank Transfer', status: 'paid' },
  { date: '15 Jul 2025', member: 'Lê Văn Hùng', plan: 'Move', amount: '$89', method: 'Cash', status: 'paid' },
  { date: '14 Jul 2025', member: 'Phạm Minh Châu', plan: 'PT Focus × 8', amount: '$320', method: 'Card', status: 'paid' },
  { date: '14 Jul 2025', member: 'Trần Thị Lan', plan: 'Perform', amount: '$149', method: 'Bank Transfer', status: 'pending' },
  { date: '13 Jul 2025', member: 'Hoàng Đức Mạnh', plan: 'PT × 10 sessions', amount: '$650', method: 'Card', status: 'paid' },
  { date: '13 Jul 2025', member: 'Vũ Thị Hoa', plan: 'Move', amount: '$89', method: 'Cash', status: 'paid' },
  { date: '12 Jul 2025', member: 'Đỗ Quang Huy', plan: 'Perform', amount: '$149', method: 'Bank Transfer', status: 'failed' },
  { date: '12 Jul 2025', member: 'Bùi Thị Ngọc', plan: 'PT Focus × 5', amount: '$350', method: 'Card', status: 'paid' },
];

const statusBadge: Record<Transaction['status'], { background: string; color: string; label: string }> = {
  paid:    { background: '#F0FDF4', color: '#15803D', label: 'Paid' },
  pending: { background: '#FEFCE8', color: '#A16207', label: 'Pending' },
  failed:  { background: '#FFF0F0', color: '#D93030', label: 'Failed' },
};

const monthlyRevenue = [
  { month: 'Jan', value: 52 },
  { month: 'Feb', value: 48 },
  { month: 'Mar', value: 61 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 67 },
  { month: 'Jun', value: 72 },
  { month: 'Jul', value: 85 },
];

export default function SalesPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            OPERATE
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>Sales &amp; Revenue</h1>
        </div>
        {/* Date range mock */}
        <div
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-[#DADCD3]"
          style={{ background: '#fff', color: '#5E625A' }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Jul 1 – Jul 15, 2025
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Monthly Revenue', value: '$12,400', change: '▲8% vs last month', changeColor: '#526B00' },
            { label: 'Memberships Sold', value: '28', change: '+5 vs last month', changeColor: '#526B00' },
            { label: 'PT Sessions', value: '45', change: '12 this week', changeColor: '#5E625A' },
            { label: 'Avg Transaction', value: '$443', change: '▲3% vs last month', changeColor: '#526B00' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#DADCD3] p-5">
              <p className="text-xs mb-2" style={{ color: '#5E625A' }}>{card.label}</p>
              <p className="text-[28px] font-bold" style={{ color: '#111310' }}>{card.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.changeColor }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="bg-white rounded-xl border border-[#DADCD3] p-5 mb-6">
          <h2 className="text-sm font-bold mb-5" style={{ color: '#111310' }}>Monthly Revenue</h2>
          <div className="flex items-end gap-3" style={{ height: 140 }}>
            {monthlyRevenue.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-md"
                  style={{
                    height: `${bar.value * 1.5}px`,
                    background: i === monthlyRevenue.length - 1 ? '#D7FF3F' : '#DADCD3',
                  }}
                />
                <span className="text-[10px]" style={{ color: '#5E625A' }}>{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F0F0EB]">
            <h2 className="text-sm font-bold" style={{ color: '#111310' }}>Recent Transactions</h2>
          </div>

          {/* Header */}
          <div
            className="grid px-5 py-3 text-xs font-medium uppercase tracking-wide"
            style={{
              background: '#F5F5F0',
              color: '#5E625A',
              gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1.2fr 1fr',
            }}
          >
            {['Date', 'Member', 'Plan / Item', 'Amount', 'Method', 'Status'].map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#F0F0EB]">
            {transactions.map((tx, i) => {
              const badge = statusBadge[tx.status];
              return (
                <div
                  key={i}
                  className="grid px-5 py-3 items-center hover:bg-[#FAFAF8]"
                  style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1.2fr 1fr' }}
                >
                  <span className="text-sm" style={{ color: '#5E625A' }}>{tx.date}</span>

                  {/* Member */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#F0F0EB', color: '#111310' }}
                    >
                      {tx.member.charAt(0)}
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#111310' }}>{tx.member}</span>
                  </div>

                  <span className="text-sm" style={{ color: '#5E625A' }}>{tx.plan}</span>
                  <span className="text-sm font-semibold" style={{ color: '#111310' }}>{tx.amount}</span>
                  <span className="text-sm" style={{ color: '#5E625A' }}>{tx.method}</span>

                  {/* Status */}
                  <div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.background, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
