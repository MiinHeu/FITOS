const bookings = [
  { cls: 'HIIT & Strength', member: 'Sophie Turner', time: '06:00', status: 'Checked In', date: '14 Jul 2025' },
  { cls: 'HIIT & Strength', member: 'James Hargreaves', time: '06:00', status: 'Checked In', date: '14 Jul 2025' },
  { cls: 'HIIT & Strength', member: 'Priya Sharma', time: '06:00', status: 'No-Show', date: '13 Jul 2025' },
  { cls: 'Cycling Power', member: 'Oliver Webb', time: '09:00', status: 'Booked', date: '14 Jul 2025' },
  { cls: 'Cycling Power', member: 'Chloe Adams', time: '09:00', status: 'Checked In', date: '14 Jul 2025' },
  { cls: 'Yoga Flow', member: 'Grace Mitchell', time: '10:30', status: 'Booked', date: '14 Jul 2025' },
  { cls: 'Yoga Flow', member: 'Ethan Brown', time: '10:30', status: 'Checked In', date: '13 Jul 2025' },
  { cls: 'Boxing Basics', member: 'Harry Wilson', time: '18:30', status: 'No-Show', date: '13 Jul 2025' },
  { cls: 'Boxing Basics', member: 'Isabella Moore', time: '18:30', status: 'Booked', date: '14 Jul 2025' },
  { cls: 'Strength Lab', member: 'Jack Taylor', time: '18:30', status: 'Checked In', date: '14 Jul 2025' },
  { cls: 'Strength Lab', member: 'Sophie Turner', time: '18:30', status: 'Checked In', date: '14 Jul 2025' },
  { cls: 'HIIT Blast', member: 'Liam Patterson', time: '19:30', status: 'Booked', date: '14 Jul 2025' },
];

const statusPill: Record<string, string> = {
  'Booked': 'bg-blue-50 text-blue-700',
  'Checked In': 'bg-green-50 text-green-700',
  'No-Show': 'bg-red-50 text-red-700',
};

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              OPERATE · CHECK-IN
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Bookings</h1>
            <p className="text-sm text-[#5E625A] mt-1">Today — Tuesday 15 July 2025</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm">
            Check in member
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* Next class check-in strip */}
        <div className="bg-white border border-[#DADCD3] rounded-xl p-5 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#D7FF3F] rounded-lg px-3 py-1.5 flex-shrink-0">
              <span className="text-xs font-bold text-[#526B00]">NEXT CLASS</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#111310]">HIIT &amp; Strength — 06:00</p>
              <p className="text-xs text-[#8A8E85]">In 45 minutes · 14/16 checked in</p>
            </div>
          </div>
          <button className="bg-[#171A16] text-[#ECEDE6] font-semibold rounded-lg px-4 py-2 text-sm">
            View class
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Total Bookings Today</p>
            <p className="text-3xl font-bold text-[#111310]">156</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Across 8 classes</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Checked In</p>
            <p className="text-3xl font-bold text-[#111310]">84</p>
            <p className="text-xs text-[#526B00] mt-1 font-medium">54% arrived</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">No-Shows</p>
            <p className="text-3xl font-bold text-[#111310]">12</p>
            <p className="text-xs text-red-600 mt-1 font-medium">8% of bookings</p>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8E85] mb-2">Cancellations</p>
            <p className="text-3xl font-bold text-[#111310]">8</p>
            <p className="text-xs text-[#5E625A] mt-1 font-medium">Before cutoff</p>
          </div>
        </div>

        {/* Bookings table */}
        <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_2fr_1fr_1.2fr_1.2fr] px-6 py-3 bg-[#F5F5F0]">
            {['Class', 'Member', 'Time', 'Status', 'Booking date'].map((col) => (
              <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {bookings.map((b, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_2fr_1fr_1.2fr_1.2fr] px-6 items-center border-t border-[#DADCD3] py-3"
              >
                <span className="text-sm font-medium text-[#111310]">{b.cls}</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F0F0EB] flex items-center justify-center text-xs font-bold text-[#111310] flex-shrink-0">
                    {b.member.charAt(0)}
                  </div>
                  <span className="text-sm text-[#111310]">{b.member}</span>
                </div>
                <span className="text-sm font-semibold text-[#111310]">{b.time}</span>
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusPill[b.status] ?? 'bg-[#F0F0EB] text-[#5E625A]'}`}>
                    {b.status}
                  </span>
                </div>
                <span className="text-sm text-[#5E625A]">{b.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
