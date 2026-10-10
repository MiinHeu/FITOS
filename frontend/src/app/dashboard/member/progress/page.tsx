"use client"

const stats = [
  { label: 'Buổi tập tháng này', value: '12' },
  { label: 'Tổng buổi', value: '47' },
  { label: 'Streak hiện tại', value: '3 ngày 🔥' },
  { label: 'Cân nặng đã ghi', value: '68.5 kg' },
]

const weeklyData = [
  { week: 'T1', sessions: 2 },
  { week: 'T2', sessions: 4 },
  { week: 'T3', sessions: 3 },
  { week: 'T4', sessions: 5 },
  { week: 'T5', sessions: 4 },
  { week: 'T6', sessions: 6 },
  { week: 'T7', sessions: 3 },
  { week: 'T8', sessions: 5 },
]

const personalRecords = [
  { exercise: 'Squat', weight: '80 kg', reps: '5 rep', date: '10/07/2025' },
  { exercise: 'Deadlift', weight: '100 kg', reps: '3 rep', date: '05/07/2025' },
  { exercise: 'Bench Press', weight: '60 kg', reps: '5 rep', date: '08/07/2025' },
  { exercise: 'Overhead Press', weight: '40 kg', reps: '6 rep', date: '03/07/2025' },
]

const recentWorkouts = [
  { date: '14/07', name: 'Strength Lab', duration: '60 phút', summary: 'Squat, Deadlift, Leg Press' },
  { date: '12/07', name: 'HIIT Blast', duration: '45 phút', summary: 'HIIT Circuit, Jump Rope' },
  { date: '10/07', name: 'Upper Push', duration: '55 phút', summary: 'Bench Press, OHP, Fly' },
  { date: '08/07', name: 'Pull Day', duration: '60 phút', summary: 'Pull-up, Row, Curl' },
]

const currentWeight = 68.5
const targetWeight = 65.0
const startWeight = 72

const progressPct = Math.round(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100)
const maxSessions = Math.max(...weeklyData.map(d => d.sessions))

export default function MemberProgressPage() {
  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#526B00',
            display: 'block',
            marginBottom: 4,
          }}
        >
          MEMBER
        </span>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
          Tiến trình của bạn
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: '1px solid #DADCD3',
                padding: '20px 24px',
              }}
            >
              <div style={{ fontSize: 12, color: '#5E625A', fontWeight: 600, marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#111310' }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Body metrics card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5E625A', marginBottom: 8 }}>
              Cân nặng hiện tại
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#111310' }}>
              {currentWeight} kg
            </div>
            <div style={{ fontSize: 12, color: '#8A8E85', marginTop: 4 }}>
              Bắt đầu: {startWeight} kg
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5E625A', marginBottom: 8 }}>
              Mục tiêu
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#111310' }}>
              {targetWeight} kg
            </div>
            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                <span>Tiến độ</span>
                <span style={{ fontWeight: 700, color: '#526B00' }}>{progressPct}%</span>
              </div>
              <div
                style={{
                  background: '#ECEDE6',
                  height: 12,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPct}%`,
                    height: '100%',
                    background: '#D7FF3F',
                    borderRadius: 6,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly bar chart */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 20 }}>
            Buổi tập 8 tuần gần nhất
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {weeklyData.map((d, i) => {
              const isLast = i === weeklyData.length - 1
              const barHeight = Math.round((d.sessions / maxSessions) * 100)
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column' as const,
                    alignItems: 'center',
                    gap: 4,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#111310' }}>
                    {d.sessions}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${barHeight}%`,
                      background: isLast ? '#D7FF3F' : '#ECEDE6',
                      borderRadius: '4px 4px 0 0',
                    }}
                  />
                  <div style={{ fontSize: 10, color: '#8A8E85' }}>{d.week}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Personal records table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 16 }}>
            Kỷ lục cá nhân
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
            <thead>
              <tr>
                {['BÀI TẬP', 'TRỌNG LƯỢNG TỐT NHẤT', 'SỐ REP TỐT NHẤT', 'NGÀY ĐẠT'].map(col => (
                  <th
                    key={col}
                    style={{
                      textAlign: 'left' as const,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#8A8E85',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                      paddingBottom: 12,
                      borderBottom: '1px solid #DADCD3',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {personalRecords.map((pr, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: '12px 0',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#111310',
                      borderBottom: i < personalRecords.length - 1 ? '1px solid #DADCD3' : 'none',
                    }}
                  >
                    {pr.exercise}
                  </td>
                  <td
                    style={{
                      padding: '12px 0',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#526B00',
                      borderBottom: i < personalRecords.length - 1 ? '1px solid #DADCD3' : 'none',
                    }}
                  >
                    {pr.weight}
                  </td>
                  <td
                    style={{
                      padding: '12px 0',
                      fontSize: 14,
                      color: '#111310',
                      borderBottom: i < personalRecords.length - 1 ? '1px solid #DADCD3' : 'none',
                    }}
                  >
                    {pr.reps}
                  </td>
                  <td
                    style={{
                      padding: '12px 0',
                      fontSize: 13,
                      color: '#8A8E85',
                      borderBottom: i < personalRecords.length - 1 ? '1px solid #DADCD3' : 'none',
                    }}
                  >
                    {pr.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent workouts */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 16 }}>
            Buổi tập gần đây
          </div>
          {recentWorkouts.map((w, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                padding: '14px 0',
                borderBottom: i < recentWorkouts.length - 1 ? '1px solid #DADCD3' : 'none',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 48,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#5E625A',
                  flexShrink: 0,
                }}
              >
                {w.date}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111310', flex: 1 }}>
                {w.name}
              </div>
              <div style={{ fontSize: 12, color: '#8A8E85', flexShrink: 0 }}>
                {w.duration}
              </div>
              <div style={{ fontSize: 12, color: '#5E625A', flexShrink: 0 }}>
                {w.summary}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
