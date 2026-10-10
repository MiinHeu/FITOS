"use client"
import { useState } from 'react'

const weekPlan = [
  { day: 'Thứ 2', exercises: [{name: 'Squat', detail: '4 × 6'}, {name: 'Romanian Deadlift', detail: '3 × 8'}, {name: 'Leg Press', detail: '3 × 10'}] },
  { day: 'Thứ 3', exercises: [{name: 'Bench Press', detail: '4 × 6'}, {name: 'Dumbbell Fly', detail: '3 × 12'}, {name: 'Tricep Pushdown', detail: '3 × 12'}] },
  { day: 'Thứ 4', exercises: [{name: 'Pull-up', detail: '4 × 6'}, {name: 'Barbell Row', detail: '3 × 8'}, {name: 'Bicep Curl', detail: '3 × 10'}] },
  { day: 'Thứ 5', exercises: [{name: 'Overhead Press', detail: '4 × 6'}, {name: 'Lateral Raise', detail: '3 × 12'}] },
  { day: 'Thứ 6', exercises: [{name: 'Deadlift', detail: '5 × 3'}, {name: 'Hip Thrust', detail: '3 × 10'}, {name: 'Plank', detail: '3 × 60s'}] },
  { day: 'Thứ 7', exercises: [{name: 'HIIT Run', detail: '20 phút'}, {name: 'Core Circuit', detail: '3 vòng'}] },
]

const exercises = [
  { name: 'Bench Press', category: 'Push', muscle: 'Ngực' },
  { name: 'Overhead Press', category: 'Push', muscle: 'Vai' },
  { name: 'Push-up', category: 'Push', muscle: 'Ngực' },
  { name: 'Pull-up', category: 'Pull', muscle: 'Lưng' },
  { name: 'Barbell Row', category: 'Pull', muscle: 'Lưng' },
  { name: 'Bicep Curl', category: 'Pull', muscle: 'Cánh tay' },
  { name: 'Squat', category: 'Legs', muscle: 'Chân' },
  { name: 'Deadlift', category: 'Legs', muscle: 'Sau đùi' },
  { name: 'Leg Press', category: 'Legs', muscle: 'Đùi' },
  { name: 'Plank', category: 'Core', muscle: 'Bụng' },
  { name: 'Russian Twist', category: 'Core', muscle: 'Bụng' },
  { name: 'HIIT Run', category: 'Cardio', muscle: 'Toàn thân' },
]

const categories = ['All', 'Push', 'Pull', 'Legs', 'Core', 'Cardio']

export default function WorkoutBuilderPage() {
  const [activeWeek, setActiveWeek] = useState(1)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredExercises = activeCategory === 'All'
    ? exercises
    : exercises.filter(e => e.category === activeCategory)

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
        <div>
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
            TRAINER
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            Workout Plan Builder
          </h1>
        </div>
        <button
          style={{
            background: '#D7FF3F',
            color: '#111310',
            border: 'none',
            borderRadius: 10,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Lưu kế hoạch
        </button>
      </div>

      {/* Main content */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: 24,
        }}
      >
        {/* LEFT — main area */}
        <div>
          {/* Plan name input */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#5E625A',
                marginBottom: 6,
                display: 'block',
              }}
            >
              Tên kế hoạch
            </label>
            <input
              defaultValue="Kế hoạch 4 tuần - Nguyễn Thị Trâm"
              style={{
                border: '1px solid #DADCD3',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 15,
                fontWeight: 600,
                width: '100%',
                boxSizing: 'border-box' as const,
                outline: 'none',
                color: '#111310',
                background: '#fff',
              }}
            />
          </div>

          {/* Week selector tabs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                style={{
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeWeek === week ? 'none' : '1px solid #DADCD3',
                  background: activeWeek === week ? '#D7FF3F' : '#fff',
                  color: activeWeek === week ? '#111310' : '#5E625A',
                }}
              >
                Week {week}
              </button>
            ))}
          </div>

          {/* Day cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              marginTop: 20,
            }}
          >
            {weekPlan.map(dayData => (
              <div
                key={dayData.day}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #DADCD3',
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#8A8E85',
                    textTransform: 'uppercase' as const,
                    marginBottom: 12,
                  }}
                >
                  {dayData.day}
                </div>
                {dayData.exercises.map((ex, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: '#DADCD3', fontSize: 14, lineHeight: 1 }}>⋮⋮</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111310', flex: 1 }}>
                      {ex.name}
                    </span>
                    <span style={{ fontSize: 12, color: '#5E625A' }}>{ex.detail}</span>
                  </div>
                ))}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#526B00',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 8,
                    padding: 0,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
                  Thêm bài tập
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — exercise library */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: 24,
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111310', marginBottom: 12 }}>
              Thư viện bài tập
            </div>
            <input
              placeholder="Tìm bài tập..."
              style={{
                width: '100%',
                border: '1px solid #DADCD3',
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 13,
                boxSizing: 'border-box' as const,
                outline: 'none',
                color: '#111310',
              }}
            />

            {/* Category chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap' as const,
                gap: 6,
                marginTop: 10,
                marginBottom: 12,
              }}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    borderRadius: 20,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid #DADCD3',
                    background: activeCategory === cat ? '#D7FF3F' : '#fff',
                    color: activeCategory === cat ? '#111310' : '#5E625A',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise list */}
            <div style={{ maxHeight: 400, overflowY: 'auto' as const }}>
              {filteredExercises.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #DADCD3',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>{ex.name}</div>
                    <div style={{ fontSize: 11, color: '#8A8E85' }}>{ex.muscle}</div>
                  </div>
                  <button
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#E8FFAA',
                      color: '#526B00',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
