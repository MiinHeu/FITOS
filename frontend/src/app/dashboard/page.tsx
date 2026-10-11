export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              STUDIO MANAGER · CITY CENTRE
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Dashboard</h1>
            <p className="text-sm text-[#5E625A] mt-1">Tuesday, 15 July 2025</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm">
            + New lead
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* Stat cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {/* MRR */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">MRR</p>
            <p className="text-3xl font-bold text-[#111310]">£18,450</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +12% vs last month</p>
          </div>

          {/* Active Members */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Active Members</p>
            <p className="text-3xl font-bold text-[#111310]">2,412</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +3% vs last month</p>
          </div>

          {/* Classes Today */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Classes Today</p>
            <p className="text-3xl font-bold text-[#111310]">8</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">156 / 196 booked</p>
          </div>

          {/* Class Fill Rate */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Class Fill Rate</p>
            <p className="text-3xl font-bold text-[#111310]">79.6%</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +4% vs last week</p>
          </div>
        </div>

        {/* Second stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Lead Conversion</p>
            <p className="text-3xl font-bold text-[#111310]">34%</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">This month</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">PT Sessions</p>
            <p className="text-3xl font-bold text-[#111310]">24</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Today</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">New Leads</p>
            <p className="text-3xl font-bold text-[#111310]">87</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">▲ +9 this week</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Trials Active</p>
            <p className="text-3xl font-bold text-[#111310]">34</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Scheduled this week</p>
          </div>
        </div>

        {/* Revenue + Member Funnel */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Revenue placeholder chart */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">Revenue</p>
            <h2 className="text-base font-bold text-[#111310] mb-4">Monthly Revenue — July 2025</h2>
            <div className="h-52 bg-[#F5F5F0] rounded-xl flex items-center justify-center">
              <span className="text-sm text-[#8A8E85]">Revenue chart</span>
            </div>
          </div>

          {/* Member funnel */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">CRM</p>
            <h2 className="text-base font-bold text-[#111310] mb-4">Member Funnel</h2>
            <div className="space-y-4">
              {[
                { label: 'Leads', count: 87, pct: 100 },
                { label: 'Trials', count: 34, pct: 39 },
                { label: 'Members', count: 2412, pct: 100 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#111310]">{row.label}</span>
                    <span className="text-sm font-bold text-[#111310]">{row.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F0F0EB]">
                    <div
                      className="h-2 rounded-full bg-[#D7FF3F]"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class occupancy + Expiring memberships */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {/* Class occupancy this week */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">Schedule</p>
            <h2 className="text-base font-bold text-[#111310] mb-4">Class Occupancy This Week</h2>
            <div className="space-y-4">
              {[
                { time: '07:00', name: 'Engine Room', trainer: 'Coach Minh', fill: 13, max: 18 },
                { time: '09:00', name: 'Cycling Power', trainer: 'Coach Linh', fill: 20, max: 20 },
                { time: '12:15', name: 'Mobility Reset', trainer: 'Coach An', fill: 8, max: 18 },
                { time: '18:30', name: 'Strength Lab', trainer: 'Coach Quân', fill: 14, max: 16 },
                { time: '19:45', name: 'Boxing Basics', trainer: 'Coach Mai', fill: 20, max: 20 },
              ].map((cls) => {
                const pct = Math.round((cls.fill / cls.max) * 100);
                return (
                  <div key={cls.time + cls.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#111310]">{cls.time}</span>
                        <span className="text-sm font-medium text-[#111310]">{cls.name}</span>
                        <span className="text-xs text-[#8A8E85]">{cls.trainer}</span>
                      </div>
                      <span className="text-xs text-[#8A8E85]">{cls.fill}/{cls.max}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#F0F0EB]">
                      <div
                        className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-red-400' : pct >= 80 ? 'bg-amber-400' : 'bg-[#D7FF3F]'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expiring memberships */}
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">Members</p>
            <h2 className="text-base font-bold text-[#111310] mb-4">Expiring Memberships</h2>
            <div className="space-y-3">
              {[
                { name: 'Sophie Turner', plan: 'Perform', renewal: '17 Jul 2025', days: 2 },
                { name: 'James Hargreaves', plan: 'Move', renewal: '20 Jul 2025', days: 5 },
                { name: 'Priya Sharma', plan: 'PT Focus', renewal: '24 Jul 2025', days: 9 },
                { name: 'Oliver Webb', plan: 'Perform', renewal: '27 Jul 2025', days: 12 },
                { name: 'Chloe Adams', plan: 'Move', renewal: '30 Jul 2025', days: 15 },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F0F0EB] flex items-center justify-center text-xs font-bold text-[#111310] flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111310] truncate">{m.name}</p>
                    <p className="text-xs text-[#8A8E85]">{m.plan} · {m.renewal}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${m.days <= 3 ? 'bg-red-50 text-red-700' : m.days <= 7 ? 'bg-amber-50 text-amber-700' : 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {m.days}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priorities strip */}
        <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">Actions</p>
          <h2 className="text-base font-bold text-[#111310] mb-4">Today&apos;s Priorities</h2>
          <div className="flex gap-4">
            {[
              { label: 'Follow up 12 leads', urgency: 'High' },
              { label: '14 trial conversions due this week', urgency: 'High' },
              { label: '2 payment failures', urgency: 'Med' },
            ].map((item) => (
              <div key={item.label} className="flex-1 bg-[#F5F5F0] rounded-xl p-4 flex flex-col gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full self-start ${item.urgency === 'High' ? 'bg-[#D7FF3F] text-[#526B00]' : 'bg-[#DADCD3] text-[#5E625A]'}`}>
                  {item.urgency}
                </span>
                <p className="text-sm font-medium text-[#111310]">{item.label}</p>
                <button className="bg-[#171A16] text-[#ECEDE6] font-semibold rounded-lg px-4 py-2 text-sm self-start mt-auto">
                  Take action
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
