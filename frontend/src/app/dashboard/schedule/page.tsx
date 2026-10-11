const days = [
  { label: 'Mon', date: '14' },
  { label: 'Tue', date: '15' },
  { label: 'Wed', date: '16' },
  { label: 'Thu', date: '17' },
  { label: 'Fri', date: '18' },
  { label: 'Sat', date: '19' },
  { label: 'Sun', date: '20' },
];

const classes: { day: number; time: string; name: string; trainer: string; spots: string }[] = [
  { day: 0, time: '07:00', name: 'Engine Room', trainer: 'Coach Minh', spots: '13/18' },
  { day: 0, time: '09:00', name: 'Mobility Reset', trainer: 'Coach An', spots: '8/18' },
  { day: 0, time: '18:30', name: 'Strength Lab', trainer: 'Coach Quân', spots: '14/16' },

  { day: 1, time: '06:00', name: 'HIIT & Strength', trainer: 'Coach Liam', spots: '14/16' },
  { day: 1, time: '09:00', name: 'Cycling Power', trainer: 'Coach Linh', spots: '20/20' },
  { day: 1, time: '18:30', name: 'Boxing Basics', trainer: 'Coach Mai', spots: '10/12' },

  { day: 2, time: '07:00', name: 'Yoga Flow', trainer: 'Coach Sarah', spots: '12/15' },
  { day: 2, time: '18:00', name: 'HIIT Blast', trainer: 'Coach Marcus', spots: '17/20' },

  { day: 3, time: '07:00', name: 'Engine Room', trainer: 'Coach Minh', spots: '16/18' },
  { day: 3, time: '09:00', name: 'Strength Lab', trainer: 'Coach Quân', spots: '12/16' },
  { day: 3, time: '19:00', name: 'Yin Yoga', trainer: 'Coach Sarah', spots: '9/15' },

  { day: 4, time: '07:00', name: 'Cycling Power', trainer: 'Coach Linh', spots: '18/20' },
  { day: 4, time: '17:00', name: 'Boxing Basics', trainer: 'Coach Mai', spots: '10/12' },
  { day: 4, time: '19:30', name: 'Strength Lab', trainer: 'Coach Marcus', spots: '13/16' },

  { day: 5, time: '08:00', name: 'HIIT Blast', trainer: 'Coach Liam', spots: '17/20' },
  { day: 5, time: '09:30', name: 'Yoga Flow', trainer: 'Coach Sarah', spots: '14/15' },

  { day: 6, time: '09:00', name: 'Strength Lab', trainer: 'Coach Quân', spots: '15/16' },
  { day: 6, time: '10:30', name: 'Yin Yoga', trainer: 'Coach Sarah', spots: '12/15' },
];

const todayCol = 1; // Tuesday 15 Jul

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              OPERATE · SCHEDULE
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Schedule</h1>
            <p className="text-sm text-[#5E625A] mt-1">Week of 14–20 July 2025</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm">
            + Add class
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        {/* Week navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#DADCD3] bg-white text-[#5E625A] text-base font-bold hover:bg-[#F5F5F0]">
            ‹
          </button>
          <span className="text-sm font-semibold text-[#111310]">Mon 14 – Sun 20 July</span>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#DADCD3] bg-white text-[#5E625A] text-base font-bold hover:bg-[#F5F5F0]">
            ›
          </button>
        </div>

        {/* 7-column weekly grid */}
        <div className="grid grid-cols-7 gap-3">
          {days.map((day, colIndex) => {
            const isToday = colIndex === todayCol;
            const dayClasses = classes.filter((c) => c.day === colIndex);
            return (
              <div key={colIndex}>
                {/* Day header */}
                <div className={`text-center py-2 rounded-lg mb-3 ${isToday ? 'bg-[#D7FF3F]' : 'bg-transparent'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isToday ? 'text-[#526B00]' : 'text-[#8A8E85]'}`}>
                    {day.label}
                  </p>
                  <p className={`text-lg font-bold ${isToday ? 'text-[#526B00]' : 'text-[#111310]'}`}>
                    {day.date}
                  </p>
                </div>

                {/* Class pills */}
                {dayClasses.map((cls, ci) => (
                  <div key={ci} className="bg-white border border-[#DADCD3] rounded-lg p-2.5 mb-2 text-xs">
                    <p className="font-semibold text-[#111310] truncate">{cls.name}</p>
                    <p className="text-[#8A8E85] mt-0.5">{cls.time}</p>
                    <p className="text-[#5E625A] truncate">{cls.trainer}</p>
                    <p className="text-[#526B00] font-semibold mt-1">{cls.spots}</p>
                  </div>
                ))}

                {dayClasses.length === 0 && (
                  <div className="h-10 flex items-center justify-center">
                    <span className="text-xs text-[#DADCD3]">—</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
