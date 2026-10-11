const today = new Date('2025-07-15');

const datePills = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() + i);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days[d.getDay()],
    date: d.getDate(),
    month: d.toLocaleString('en-GB', { month: 'short' }),
    isToday: i === 0,
  };
});

const classes = [
  { name: 'HIIT Circuit', trainer: 'Jordan T.', time: '06:00', spots: 4, category: 'HIIT' },
  { name: 'Yoga Flow', trainer: 'Aisha M.', time: '07:30', spots: 8, category: 'Yoga' },
  { name: 'Spin Endurance', trainer: 'Marcus L.', time: '09:00', spots: 2, category: 'Cycling' },
  { name: 'Boxing Fundamentals', trainer: 'Sarah K.', time: '10:30', spots: 10, category: 'Boxing' },
  { name: 'Power Yoga', trainer: 'Aisha M.', time: '12:00', spots: 6, category: 'Yoga' },
  { name: 'Lunchtime HIIT', trainer: 'Jordan T.', time: '13:00', spots: 3, category: 'HIIT' },
];

const tabs = ['All', 'HIIT', 'Yoga', 'Cycling', 'Boxing'];

export default function BookClassPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              MEMBER · BOOK
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Book a Class</h1>
            <p className="text-sm text-[#5E625A] mt-1">Browse and reserve your next session</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Date strip */}
        <div className="flex gap-2 mb-6">
          {datePills.map((d, i) => (
            <button
              key={i}
              className={`flex-1 rounded-xl border py-3 text-center transition-colors ${
                d.isToday
                  ? 'bg-[#171A16] border-[#171A16] text-[#ECEDE6]'
                  : 'bg-white border-[#DADCD3] text-[#5E625A] hover:border-[#526B00]'
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em]">{d.day}</p>
              <p className="text-lg font-bold mt-0.5">{d.date}</p>
              <p className="text-[10px] opacity-70">{d.month}</p>
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                tab === 'All'
                  ? 'bg-[#D7FF3F] border-[#D7FF3F] text-[#526B00]'
                  : 'bg-white border-[#DADCD3] text-[#5E625A] hover:border-[#526B00]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Class cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls, i) => (
            <div key={i} className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] bg-[#F0F0EB] text-[#5E625A] px-2 py-0.5 rounded-full">
                  {cls.category}
                </span>
                <span className="text-xs font-semibold text-[#526B00] bg-[#D7FF3F] px-2 py-0.5 rounded-full">
                  {cls.time}
                </span>
              </div>
              <p className="text-base font-bold text-[#111310] mb-1">{cls.name}</p>
              <p className="text-xs text-[#5E625A] mb-4">with {cls.trainer}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${cls.spots <= 3 ? 'text-orange-600' : 'text-[#5E625A]'}`}>
                  {cls.spots} {cls.spots === 1 ? 'spot' : 'spots'} left
                </span>
                <button className="bg-[#171A16] text-[#ECEDE6] font-semibold rounded-lg px-3 py-1.5 text-xs hover:opacity-90">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
