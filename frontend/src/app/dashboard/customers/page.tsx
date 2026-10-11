const members = [
  { name: 'Sophie Turner', email: 'sophie.turner@email.com', plan: 'Perform', status: 'Active', since: '01 Mar 2025', nextPayment: '01 Aug 2025' },
  { name: 'James Hargreaves', email: 'j.hargreaves@email.com', plan: 'Move', status: 'Active', since: '15 Jan 2025', nextPayment: '15 Aug 2025' },
  { name: 'Priya Sharma', email: 'priya.sharma@email.com', plan: 'PT Focus', status: 'Active', since: '10 Feb 2025', nextPayment: '10 Aug 2025' },
  { name: 'Oliver Webb', email: 'o.webb@email.com', plan: 'Perform', status: 'Active', since: '20 Nov 2024', nextPayment: '20 Jul 2025' },
  { name: 'Chloe Adams', email: 'chloe.adams@email.com', plan: 'Move', status: 'Active', since: '05 Apr 2025', nextPayment: '05 Aug 2025' },
  { name: 'Harry Wilson', email: 'h.wilson@email.com', plan: 'Perform', status: 'On Hold', since: '12 Dec 2024', nextPayment: '—' },
  { name: 'Grace Mitchell', email: 'g.mitchell@email.com', plan: 'Move', status: 'Active', since: '22 Jun 2025', nextPayment: '22 Jul 2025' },
  { name: 'Ethan Brown', email: 'e.brown@email.com', plan: 'PT Focus', status: 'Active', since: '08 Mar 2025', nextPayment: '08 Aug 2025' },
  { name: 'Isabella Moore', email: 'i.moore@email.com', plan: 'Perform', status: 'Churned', since: '15 Sep 2024', nextPayment: '—' },
  { name: 'Jack Taylor', email: 'jack.taylor@email.com', plan: 'Move', status: 'Active', since: '30 May 2025', nextPayment: '30 Jul 2025' },
];

const statusPill: Record<string, string> = {
  Active: 'bg-green-50 text-green-700',
  'On Hold': 'bg-amber-50 text-amber-700',
  Churned: 'bg-red-50 text-red-700',
};

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              OPERATE · MEMBERS
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Customers</h1>
            <p className="text-sm text-[#5E625A] mt-1">All active and inactive members</p>
          </div>
          <button className="bg-[#171A16] text-[#ECEDE6] font-semibold rounded-lg px-4 py-2 text-sm">
            Export
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Active</p>
            <p className="text-3xl font-bold text-[#111310]">2,412</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +3% vs last month</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Churned This Month</p>
            <p className="text-3xl font-bold text-[#111310]">8</p>
            <p className="text-xs text-red-600 mt-1 font-medium">▼ 0.3% churn rate</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Avg. Tenure</p>
            <p className="text-3xl font-bold text-[#111310]">11.3</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">months</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">On Hold</p>
            <p className="text-3xl font-bold text-[#111310]">14</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Paused memberships</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full max-w-sm bg-white border border-[#DADCD3] rounded-lg px-4 py-2 text-sm text-[#111310] placeholder-[#8A8E85] focus:outline-none focus:ring-2 focus:ring-[#D7FF3F]"
            readOnly
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1.2fr_1.2fr] px-6 py-3 bg-[#F5F5F0]">
            {['Name', 'Email', 'Plan', 'Status', 'Member since', 'Next payment'].map((col) => (
              <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {members.map((m, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_2fr_1fr_1fr_1.2fr_1.2fr] px-6 items-center border-t border-[#DADCD3] py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F0F0EB] flex items-center justify-center text-xs font-bold text-[#111310] flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-[#111310] truncate">{m.name}</span>
                </div>
                <span className="text-sm text-[#5E625A] truncate">{m.email}</span>
                <span className="text-sm text-[#5E625A]">{m.plan}</span>
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusPill[m.status] ?? 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {m.status}
                  </span>
                </div>
                <span className="text-sm text-[#5E625A]">{m.since}</span>
                <span className="text-sm text-[#5E625A]">{m.nextPayment}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
