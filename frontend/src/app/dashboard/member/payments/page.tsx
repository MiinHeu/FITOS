const payments = [
  { date: '14 Jul 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 Jun 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 May 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 Apr 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 Mar 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 Feb 2025', description: 'Perform — Monthly', amount: '£49.00', status: 'Paid' },
  { date: '14 Jan 2025', description: 'Move → Perform upgrade', amount: '£20.00', status: 'Paid' },
  { date: '14 Dec 2024', description: 'Move — Monthly', amount: '£29.00', status: 'Paid' },
];

const statusStyle: Record<string, string> = {
  Paid: 'bg-green-50 text-green-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Failed: 'bg-red-50 text-red-700',
};

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              MEMBER · PAYMENTS
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Payments &amp; Membership</h1>
            <p className="text-sm text-[#5E625A] mt-1">Manage your subscription and billing history</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Membership card */}
        <div className="bg-[#171A16] rounded-2xl p-7 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Current plan</p>
              <h2 className="text-3xl font-bold text-[#ECEDE6] mb-1">Perform</h2>
              <p className="text-[#8A8E85] text-sm">Full gym access + group classes</p>
            </div>
            <span className="text-xs font-semibold bg-[#D7FF3F] text-[#111310] px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="flex items-end justify-between mt-6 pt-6 border-t border-[#2A2E29]">
            <div>
              <p className="text-[11px] text-[#8A8E85] mb-1">Monthly price</p>
              <p className="text-2xl font-bold text-[#ECEDE6]">£49 <span className="text-sm font-normal text-[#8A8E85]">/ month</span></p>
              <p className="text-xs text-[#8A8E85] mt-1">Next payment: 14 Aug 2025</p>
            </div>
            <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90">
              Manage membership
            </button>
          </div>
        </div>

        {/* Payment history */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-3">Payment history</p>
          <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
            <div className="grid px-6 py-3 bg-[#F5F5F0]" style={{ gridTemplateColumns: '1.5fr 3fr 1fr 1fr' }}>
              {['Date', 'Description', 'Amount', 'Status'].map((col) => (
                <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                  {col}
                </span>
              ))}
            </div>
            <div>
              {payments.map((payment, i) => (
                <div
                  key={i}
                  className="grid px-6 py-3.5 items-center border-t border-[#DADCD3]"
                  style={{ gridTemplateColumns: '1.5fr 3fr 1fr 1fr' }}
                >
                  <span className="text-sm text-[#5E625A]">{payment.date}</span>
                  <span className="text-sm font-medium text-[#111310]">{payment.description}</span>
                  <span className="text-sm font-semibold text-[#111310]">{payment.amount}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${statusStyle[payment.status] ?? 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
