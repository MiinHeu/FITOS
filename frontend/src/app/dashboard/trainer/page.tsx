import Link from 'next/link';

const sessions = [
  { time: '06:00', name: 'HIIT Circuit', studio: 'Studio A', attendees: 18, capacity: 20 },
  { time: '09:30', name: 'Yoga Flow', studio: 'Studio B', attendees: 12, capacity: 15 },
  { time: '12:00', name: 'Spin Class', studio: 'Cycle Studio', attendees: 22, capacity: 24 },
];

const clients = [
  { name: 'Marcus Webb', next: 'Thu 17 Jul, 07:00', programme: 'Strength Block 3', lastCheckIn: '12 Jul', note: 'Improving pull volume' },
  { name: 'Chloe Hart', next: 'Fri 18 Jul, 06:30', programme: 'Fat Loss Phase', lastCheckIn: '13 Jul', note: 'On track — great consistency' },
  { name: 'Tom Gallagher', next: 'Mon 21 Jul, 08:00', programme: 'Hypertrophy A/B', lastCheckIn: '10 Jul', note: 'Needs to increase protein' },
  { name: 'Priya Nair', next: 'Thu 17 Jul, 09:00', programme: 'Beginners Foundation', lastCheckIn: '14 Jul', note: 'Great progress, form improving' },
  { name: 'James Liu', next: 'Sat 19 Jul, 10:00', programme: 'Athletic Performance', lastCheckIn: '12 Jul', note: 'Passed squat depth milestone' },
  { name: 'Anya Brennan', next: 'Wed 16 Jul, 07:30', programme: 'Post-rehab Strength', lastCheckIn: '09 Jul', note: 'No pain in last 2 sessions' },
  { name: 'Luca Rossi', next: 'Fri 18 Jul, 07:00', programme: 'Strength Block 2', lastCheckIn: '11 Jul', note: 'Deadlift PR this week' },
  { name: 'Sophie King', next: 'Thu 17 Jul, 06:00', programme: 'Fat Loss Phase', lastCheckIn: '13 Jul', note: 'Struggling with recovery' },
];

const quickActions = [
  { label: 'Create workout', description: 'Build a new programme for a client', href: '/dashboard/workout-builder', emoji: '💪' },
  { label: 'Log PT session', description: 'Record notes from a PT session', href: '/dashboard/trainer', emoji: '📋' },
  { label: 'View progress', description: 'Check client stats and PRs', href: '/dashboard/trainer', emoji: '📈' },
];

export default function TrainerPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              TRAINER · DAY VIEW
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Trainer Day</h1>
            <p className="text-sm text-[#5E625A] mt-1">Tuesday 15 July 2025</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90">
            Log session
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Today's timeline */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-4">
            Today's Classes
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {sessions.map((session, i) => (
              <div key={i} className="bg-white border border-[#DADCD3] rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-[#526B00] bg-[#D7FF3F] px-2 py-0.5 rounded-full">
                    {session.time}
                  </span>
                  <span className="text-xs text-[#5E625A]">{session.studio}</span>
                </div>
                <p className="text-base font-bold text-[#111310] mt-2 mb-1">{session.name}</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 bg-[#F0F0EB] rounded-full h-1.5">
                    <div
                      className="bg-[#D7FF3F] h-1.5 rounded-full"
                      style={{ width: `${(session.attendees / session.capacity) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#5E625A]">{session.attendees}/{session.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PT Clients table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
              PT Clients
            </h2>
            <span className="text-xs text-[#5E625A]">{clients.length} clients</span>
          </div>
          <div className="bg-white border border-[#DADCD3] rounded-xl overflow-hidden">
            <div className="grid px-6 py-3 bg-[#F5F5F0]" style={{ gridTemplateColumns: '2fr 2fr 2fr 1fr 3fr' }}>
              {['Name', 'Next session', 'Programme', 'Last check-in', 'Progress note'].map((col) => (
                <span key={col} className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85]">
                  {col}
                </span>
              ))}
            </div>
            <div>
              {clients.map((client, i) => (
                <div
                  key={i}
                  className="grid px-6 py-3 items-center border-t border-[#DADCD3]"
                  style={{ gridTemplateColumns: '2fr 2fr 2fr 1fr 3fr' }}
                >
                  <p className="text-sm font-semibold text-[#111310]">{client.name}</p>
                  <p className="text-sm text-[#5E625A]">{client.next}</p>
                  <p className="text-sm text-[#5E625A]">{client.programme}</p>
                  <p className="text-sm text-[#5E625A]">{client.lastCheckIn}</p>
                  <p className="text-sm text-[#5E625A]">{client.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-4">
            Quick actions
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white border border-[#DADCD3] rounded-xl p-5 hover:border-[#526B00] transition-colors group"
              >
                <p className="text-2xl mb-3">{action.emoji}</p>
                <p className="text-sm font-semibold text-[#111310] mb-1">{action.label}</p>
                <p className="text-xs text-[#5E625A]">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
