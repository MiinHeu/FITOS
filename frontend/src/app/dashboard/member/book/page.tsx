"use client"
import { useState } from 'react'
import Link from 'next/link'

const classes = [
  { name: 'Yoga Flow', instructor: 'Coach Thanh Hà', time: '07:00–08:00', studio: 'Studio A', spots: 5, type: 'Yoga' },
  { name: 'HIIT Blast', instructor: 'Coach Minh Tuấn', time: '08:30–09:15', studio: 'Studio B', spots: 12, type: 'HIIT' },
  { name: 'Cycling Power', instructor: 'Coach Phương Linh', time: '09:00–09:50', studio: 'Studio C', spots: 3, type: 'Cycling' },
  { name: 'Strength Lab', instructor: 'Coach Văn Quân', time: '18:30–19:30', studio: 'Studio A', spots: 0, type: 'Strength' },
  { name: 'Yin Yoga', instructor: 'Coach Mai Anh', time: '19:00–20:15', studio: 'Studio A', spots: 8, type: 'Yoga' },
]

const trainers = [
  { name: 'Coach Văn Quân', specialty: 'Strength & Powerlifting', available: true },
  { name: 'Coach Minh Tuấn', specialty: 'HIIT & Conditioning', available: true },
  { name: 'Coach Thanh Hà', specialty: 'Yoga & Mindfulness', available: false },
  { name: 'Coach Phương Linh', specialty: 'Cycling & Cardio', available: true },
]

const typeColors: Record<string, { bg: string; color: string }> = {
  Yoga:     { bg: '#E9EDFF', color: '#3B4FA8' },
  HIIT:     { bg: '#D7FF3F', color: '#526B00' },
  Cycling:  { bg: '#FFF3E0', color: '#B87000' },
  Strength: { bg: '#ECEDE6', color: '#5E625A' },
}

function getNext7Days() {
  const days = []
  const dayAbbr = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({ label: dayAbbr[d.getDay()], date: d.getDate(), isToday: i === 0 })
  }
  return days
}

export default function BookSessionPage() {
  const [activeTab, setActiveTab] = useState<'classes' | 'pt'>('classes')
  const [selectedDay, setSelectedDay] = useState(0)
  const next7Days = getNext7Days()

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/dashboard/member"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#ECEDE6',
              color: '#111310',
              textDecoration: 'none',
              fontSize: 18,
            }}
          >
            ←
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            Đặt lịch
          </h1>
        </div>
      </div>

      {/* Tabs row */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '0 28px',
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
        }}
      >
        {(['classes', 'pt'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '16px 0',
              marginRight: 24,
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #D7FF3F' : '2px solid transparent',
              color: activeTab === tab ? '#111310' : '#8A8E85',
            }}
          >
            {tab === 'classes' ? 'Lớp học' : 'Personal Training'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        {activeTab === 'classes' && (
          <div>
            {/* Date strip */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 20,
                overflowX: 'auto' as const,
              }}
            >
              {next7Days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    borderRadius: 10,
                    padding: '10px 14px',
                    textAlign: 'center' as const,
                    cursor: 'pointer',
                    flexShrink: 0,
                    border: selectedDay === i ? 'none' : '1px solid #DADCD3',
                    background: selectedDay === i ? '#D7FF3F' : '#fff',
                    color: selectedDay === i ? '#111310' : '#5E625A',
                    minWidth: 56,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{d.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{d.date}</div>
                </button>
              ))}
            </div>

            {/* Class cards */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              {classes.map((cls, i) => {
                const tc = typeColors[cls.type] ?? { bg: '#ECEDE6', color: '#5E625A' }
                return (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      border: '1px solid #DADCD3',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          background: tc.bg,
                          color: tc.color,
                          borderRadius: 6,
                          padding: '2px 8px',
                          fontSize: 11,
                          fontWeight: 700,
                          marginBottom: 6,
                        }}
                      >
                        {cls.type}
                      </span>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#111310' }}>{cls.name}</div>
                      <div style={{ fontSize: 13, color: '#5E625A', marginTop: 2 }}>
                        {cls.instructor} · {cls.studio}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' as const }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111310' }}>{cls.time}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: cls.spots === 0 ? '#E53E3E' : '#526B00',
                          background: cls.spots === 0 ? '#FFF5F5' : '#E8FFAA',
                          borderRadius: 6,
                          padding: '2px 8px',
                          display: 'inline-block',
                          marginTop: 4,
                          fontWeight: 600,
                        }}
                      >
                        {cls.spots === 0 ? 'Hết chỗ' : `${cls.spots} chỗ trống`}
                      </div>
                      <div>
                        <button
                          style={{
                            marginTop: 8,
                            background: cls.spots === 0 ? '#ECEDE6' : '#D7FF3F',
                            color: cls.spots === 0 ? '#8A8E85' : '#111310',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: cls.spots === 0 ? 'default' : 'pointer',
                          }}
                        >
                          {cls.spots === 0 ? 'Waitlist' : 'Đặt chỗ'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'pt' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {trainers.map((trainer, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid #DADCD3',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#ECEDE6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#111310',
                  }}
                >
                  {trainer.name.split(' ').pop()?.charAt(0) ?? '?'}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#111310',
                    marginTop: 12,
                    textAlign: 'center' as const,
                  }}
                >
                  {trainer.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#5E625A',
                    textAlign: 'center' as const,
                    marginTop: 4,
                  }}
                >
                  {trainer.specialty}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: trainer.available ? '#526B00' : '#E53E3E',
                    background: trainer.available ? '#E8FFAA' : '#FFF5F5',
                    borderRadius: 6,
                    padding: '2px 10px',
                  }}
                >
                  {trainer.available ? 'Còn lịch' : 'Hết lịch'}
                </div>
                <button
                  disabled={!trainer.available}
                  style={{
                    marginTop: 12,
                    width: '100%',
                    background: trainer.available ? '#D7FF3F' : '#ECEDE6',
                    color: trainer.available ? '#111310' : '#8A8E85',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 0',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: trainer.available ? 'pointer' : 'not-allowed',
                  }}
                >
                  Yêu cầu buổi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
