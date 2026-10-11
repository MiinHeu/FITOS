const stats = [
  { label: 'Total sessions', value: '48' },
  { label: 'This month', value: '9' },
  { label: 'Current streak', value: '12 days' },
  { label: 'Best streak', value: '21 days' },
];

const prs = [
  { exercise: 'Squat', value: '100 kg', icon: '🏋️' },
  { exercise: 'Deadlift', value: '130 kg', icon: '💪' },
  { exercise: 'Bench press', value: '80 kg', icon: '🏋️' },
  { exercise: '5K run', value: '24:30', icon: '🏃' },
  { exercise: 'Plank', value: '3:45', icon: '⏱️' },
  { exercise: 'Pull-ups', value: '12 reps', icon: '💪' },
];

const sessions = [
  { date: '15 Jul', type: 'Upper body strength', duration: '55 min', notes: 'New bench PR +2.5kg' },
  { date: '13 Jul', type: 'Lower body hypertrophy', duration: '60 min', notes: 'Felt strong, added volume' },
  { date: '11 Jul', type: 'Push day', duration: '50 min', notes: 'Solid session' },
  { date: '09 Jul', type: 'Pull day', duration: '52 min', notes: 'Focused on rows' },
  { date: '07 Jul', type: 'HIIT Circuit (class)', duration: '45 min', notes: 'High intensity, great cardio' },
];

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              MEMBER · PROGRESS
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">My Progress</h1>
            <p className="text-sm text-[#5E625A] mt-1">Track your fitness journey</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-[#111310]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-3">Workout frequency</p>
          <div className="h-52 bg-[#F5F5F0] border border-[#DADCD3] rounded-xl flex items-center justify-center">
            <p className="text-sm text-[#8A8E85]">Workout frequency chart</p>
          </div>
        </div>

        {/* Personal records */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-3">Personal records</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {prs.map((pr) => (
              <div key={pr.exercise} className="bg-white border border-[#DADCD3] rounded-xl p-4 text-center">
                <p className="text-2xl mb-2">{pr.icon}</p>
                <p className="text-xs text-[#8A8E85] mb-1">{pr.exercise}</p>
                <p className="text-base font-bold text-[#111310]">{pr.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent sessions */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-3">Recent sessions</p>
          <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
            <div className="grid px-6 py-3 bg-[#F5F5F0]" style={{ gridTemplateColumns: '1fr 2fr 1fr 3fr' }}>
              {['Date', 'Type', 'Duration', 'Notes'].map((col) => (
                <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                  {col}
                </span>
              ))}
            </div>
            <div>
              {sessions.map((session, i) => (
                <div
                  key={i}
                  className="grid px-6 py-3 items-center border-t border-[#DADCD3]"
                  style={{ gridTemplateColumns: '1fr 2fr 1fr 3fr' }}
                >
                  <span className="text-sm text-[#5E625A]">{session.date}</span>
                  <span className="text-sm font-semibold text-[#111310]">{session.type}</span>
                  <span className="text-sm text-[#5E625A]">{session.duration}</span>
                  <span className="text-sm text-[#5E625A]">{session.notes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
