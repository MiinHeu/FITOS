const sales = [
  { date: '15 Jul 2025', member: 'Sophie Turner', plan: 'Perform — Monthly', amount: '£52', method: 'Card', staff: 'Jordan T.', status: 'Paid' },
  { date: '15 Jul 2025', member: 'James Hargreaves', plan: 'Move — Monthly', amount: '£32', method: 'Direct Debit', staff: 'Sarah M.', status: 'Paid' },
  { date: '14 Jul 2025', member: 'Priya Sharma', plan: 'PT Focus × 8', amount: '£320', method: 'Card', staff: 'Marcus L.', status: 'Paid' },
  { date: '14 Jul 2025', member: 'Oliver Webb', plan: 'Perform — Monthly', amount: '£52', method: 'Direct Debit', staff: 'Jordan T.', status: 'Pending' },
  { date: '13 Jul 2025', member: 'Chloe Adams', plan: 'Move — Monthly', amount: '£32', method: 'Cash', staff: 'Sarah M.', status: 'Paid' },
  { date: '13 Jul 2025', member: 'Harry Wilson', plan: 'Perform — Monthly', amount: '£52', method: 'Card', staff: 'Marcus L.', status: 'Failed' },
  { date: '12 Jul 2025', member: 'Grace Mitchell', plan: 'Move — Monthly', amount: '£32', method: 'Direct Debit', staff: 'Jordan T.', status: 'Paid' },
  { date: '12 Jul 2025', member: 'Ethan Brown', plan: 'PT Focus × 5', amount: '£200', method: 'Card', staff: 'Sarah M.', status: 'Paid' },
  { date: '11 Jul 2025', member: 'Jack Taylor', plan: 'Move — Monthly', amount: '£32', method: 'Cash', staff: 'Marcus L.', status: 'Paid' },
  { date: '11 Jul 2025', member: 'Isabella Moore', plan: 'Perform — Monthly', amount: '£52', method: 'Card', staff: 'Jordan T.', status: 'Paid' },
];

const statusPill: Record<string, string> = {
  Paid: 'bg-green-50 text-green-700',
  Pending: 'bg-amber-50 text-amber-700',
  Failed: 'bg-red-50 text-red-700',
};

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              GROW · SALES
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Sales</h1>
            <p className="text-sm text-[#5E625A] mt-1">Revenue and membership sales</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm">
            + Create sale
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Revenue This Month</p>
            <p className="text-3xl font-bold text-[#111310]">£18,450</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +12% vs last month</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">New Sales</p>
            <p className="text-3xl font-bold text-[#111310]">42</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +8 vs last month</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Renewals</p>
            <p className="text-3xl font-bold text-[#111310]">31</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">This month</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Avg. Sale Value</p>
            <p className="text-3xl font-bold text-[#111310]">£52</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +3% vs last month</p>
          </div>
        </div>

        {/* Sales table */}
        <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1.2fr_2fr_2fr_0.8fr_1.2fr_1fr_1fr] px-6 py-3 bg-[#F5F5F0]">
            {['Date', 'Member', 'Plan', 'Amount', 'Payment method', 'Staff', 'Status'].map((col) => (
              <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {sales.map((sale, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.2fr_2fr_2fr_0.8fr_1.2fr_1fr_1fr] px-6 items-center border-t border-[#DADCD3] py-3"
              >
                <span className="text-sm text-[#5E625A]">{sale.date}</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F0F0EB] flex items-center justify-center text-xs font-bold text-[#111310] flex-shrink-0">
                    {sale.member.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[#111310] truncate">{sale.member}</span>
                </div>
                <span className="text-sm text-[#5E625A] truncate">{sale.plan}</span>
                <span className="text-sm font-semibold text-[#111310]">{sale.amount}</span>
                <span className="text-sm text-[#5E625A]">{sale.method}</span>
                <span className="text-sm text-[#5E625A]">{sale.staff}</span>
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusPill[sale.status] ?? 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
