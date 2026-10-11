const leads = [
  { name: 'Emma Clarke', source: 'Walk-in', status: 'New', date: '15 Jul 2025', nextAction: 'Call today', staff: 'Jordan T.' },
  { name: 'Liam Patterson', source: 'Instagram', status: 'Contacted', date: '14 Jul 2025', nextAction: 'Send trial offer', staff: 'Sarah M.' },
  { name: 'Ava Thompson', source: 'Referral', status: 'Trial', date: '13 Jul 2025', nextAction: 'Follow up post-trial', staff: 'Jordan T.' },
  { name: 'Noah Williams', source: 'Facebook', status: 'Converted', date: '12 Jul 2025', nextAction: '—', staff: 'Sarah M.' },
  { name: 'Olivia Johnson', source: 'Website', status: 'New', date: '15 Jul 2025', nextAction: 'Call today', staff: 'Marcus L.' },
  { name: 'William Davis', source: 'Walk-in', status: 'Lost', date: '10 Jul 2025', nextAction: '—', staff: 'Jordan T.' },
  { name: 'Isabella Martinez', source: 'Google Ads', status: 'Contacted', date: '13 Jul 2025', nextAction: 'Schedule trial', staff: 'Sarah M.' },
  { name: 'James Anderson', source: 'Referral', status: 'Trial', date: '11 Jul 2025', nextAction: 'Conversion call', staff: 'Marcus L.' },
];

const statusPill: Record<string, string> = {
  New: 'bg-yellow-50 text-yellow-700',
  Contacted: 'bg-blue-50 text-blue-700',
  Trial: 'bg-[#D7FF3F] text-[#526B00]',
  Converted: 'bg-green-50 text-green-700',
  Lost: 'bg-red-50 text-red-700',
};

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              GROW · CRM
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Leads</h1>
            <p className="text-sm text-[#5E625A] mt-1">Track and convert prospective members</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm">
            + Add lead
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">New This Week</p>
            <p className="text-3xl font-bold text-[#111310]">12</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +4 vs last week</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Contacted</p>
            <p className="text-3xl font-bold text-[#111310]">28</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">In pipeline</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Trial Scheduled</p>
            <p className="text-3xl font-bold text-[#111310]">9</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Next: tomorrow</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Converted This Month</p>
            <p className="text-3xl font-bold text-[#111310]">34</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ 34% conversion rate</p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-6">
          {['All', 'New', 'Contacted', 'Trial', 'Converted', 'Lost'].map((tab) => (
            <span
              key={tab}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border border-[#DADCD3] ${tab === 'All' ? 'bg-[#D7FF3F] text-[#526B00] border-[#D7FF3F]' : 'bg-white text-[#5E625A]'}`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] px-6 py-3 bg-[#F5F5F0]">
            {['Name', 'Source', 'Status', 'Date', 'Next action', 'Staff'].map((col) => (
              <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {leads.map((lead, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] px-6 items-center border-t border-[#DADCD3] py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#111310]">{lead.name}</p>
                </div>
                <span className="text-sm text-[#5E625A]">{lead.source}</span>
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusPill[lead.status] ?? 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {lead.status}
                  </span>
                </div>
                <span className="text-sm text-[#5E625A]">{lead.date}</span>
                <span className="text-sm text-[#5E625A]">{lead.nextAction}</span>
                <span className="text-sm text-[#5E625A]">{lead.staff}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
