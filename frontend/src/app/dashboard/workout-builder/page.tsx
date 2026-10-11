const days = [
  {
    label: 'Monday',
    short: 'Mon',
    exercises: [
      { name: 'Back Squat', sets: 4, reps: 6 },
      { name: 'Romanian Deadlift', sets: 3, reps: 10 },
      { name: 'Leg Press', sets: 3, reps: 12 },
    ],
  },
  {
    label: 'Tuesday',
    short: 'Tue',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 6 },
      { name: 'Incline DB Press', sets: 3, reps: 10 },
    ],
  },
  {
    label: 'Wednesday',
    short: 'Wed',
    exercises: [],
    rest: true,
  },
  {
    label: 'Thursday',
    short: 'Thu',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: 5 },
      { name: 'Pull-up', sets: 3, reps: 8 },
      { name: 'Barbell Row', sets: 3, reps: 8 },
    ],
  },
  {
    label: 'Friday',
    short: 'Fri',
    exercises: [
      { name: 'OHP', sets: 4, reps: 6 },
      { name: 'Lateral Raise', sets: 3, reps: 15 },
    ],
  },
  {
    label: 'Saturday',
    short: 'Sat',
    exercises: [
      { name: '5K Run', sets: 1, reps: 1 },
      { name: 'Plank', sets: 3, reps: 60 },
    ],
  },
  {
    label: 'Sunday',
    short: 'Sun',
    exercises: [],
    rest: true,
  },
];

const categories = [
  'Compound lifts',
  'Cardio',
  'Core & stability',
  'Mobility & stretch',
  'Upper body push',
  'Upper body pull',
  'Lower body',
  'Olympic lifts',
];

export default function WorkoutBuilderPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              TRAINER · PROGRAMMING
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Workout Builder</h1>
            <p className="text-sm text-[#5E625A] mt-1">Design weekly training programmes</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-[#DADCD3] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:bg-[#F5F5F0]">
              Save draft
            </button>
            <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90">
              Publish programme
            </button>
          </div>
        </div>
      </div>

      {/* Week tabs */}
      <div className="bg-white border-b border-[#DADCD3] px-8">
        <div className="flex gap-0">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => (
            <button
              key={week}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                i === 0
                  ? 'border-[#111310] text-[#111310]'
                  : 'border-transparent text-[#8A8E85] hover:text-[#5E625A]'
              }`}
            >
              {week}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex gap-6">
        {/* Day cards grid */}
        <div className="flex-1">
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
            {days.map((day) => (
              <div key={day.short} className="bg-white border border-[#DADCD3] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">{day.label}</p>
                  {day.rest && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#F0F0EB] text-[#5E625A] rounded-full">
                      Rest
                    </span>
                  )}
                </div>

                {day.rest ? (
                  <p className="text-sm text-[#8A8E85] italic">Recovery day</p>
                ) : (
                  <div className="space-y-2 mb-3">
                    {day.exercises.map((ex, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#F5F5F0] rounded-lg px-2.5 py-1.5">
                        <p className="text-xs font-medium text-[#111310]">{ex.name}</p>
                        <span className="text-[10px] text-[#526B00] font-semibold ml-1 whitespace-nowrap">
                          {ex.sets}×{ex.reps}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {!day.rest && (
                  <button className="w-full text-xs text-[#8A8E85] border border-dashed border-[#DADCD3] rounded-lg py-1.5 hover:border-[#526B00] hover:text-[#526B00] transition-colors">
                    + Add exercise
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exercise library sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-white border border-[#DADCD3] rounded-xl p-4 sticky top-6">
            <h3 className="text-sm font-semibold text-[#111310] mb-3">Exercise library</h3>
            <input
              type="text"
              placeholder="Search exercises..."
              className="w-full border border-[#DADCD3] rounded-lg px-3 py-2 text-xs text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent mb-3"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-2">Categories</p>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="w-full text-left text-xs text-[#5E625A] px-2.5 py-2 rounded-lg hover:bg-[#F5F5F0] hover:text-[#111310] transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
