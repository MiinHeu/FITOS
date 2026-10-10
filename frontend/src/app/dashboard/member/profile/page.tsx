"use client"
import { useState } from 'react'

const membershipRows = [
  { label: 'Gói', value: 'Perform' },
  { label: 'Studio', value: 'Pulse District 2' },
  { label: 'HLV được chỉ định', value: 'Coach Văn Quân' },
  { label: 'Hạn sử dụng', value: '30/08/2025' },
  { label: 'Buổi còn lại', value: '6 buổi PT' },
]

const classTypes = [
  { label: 'Yoga', defaultChecked: true },
  { label: 'HIIT', defaultChecked: true },
  { label: 'Cycling', defaultChecked: false },
  { label: 'Strength', defaultChecked: true },
  { label: 'Boxing', defaultChecked: false },
]

interface NotifSetting {
  label: string
  defaultOn: boolean
}

const notifSettings: NotifSetting[] = [
  { label: 'Nhắc nhở đặt lịch', defaultOn: true },
  { label: 'Cập nhật lớp học', defaultOn: true },
  { label: 'Gợi ý từ AI Coach', defaultOn: true },
  { label: 'Thông báo gia hạn', defaultOn: false },
]

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on ? '#D7FF3F' : '#DADCD3',
        cursor: 'pointer',
        position: 'relative' as const,
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute' as const,
          top: 2,
          left: on ? 22 : 2,
          transition: 'left 0.2s',
        }}
      />
    </div>
  )
}

export default function ProfilePage() {
  const [goal, setGoal] = useState('Giảm mỡ + Tăng cơ')
  const [sessionsPerWeek, setSessionsPerWeek] = useState(4)
  const [checkedClasses, setCheckedClasses] = useState<Record<string, boolean>>(
    Object.fromEntries(classTypes.map(c => [c.label, c.defaultChecked]))
  )
  const [notifOn, setNotifOn] = useState<Record<string, boolean>>(
    Object.fromEntries(notifSettings.map(n => [n.label, n.defaultOn]))
  )

  function toggleClass(label: string) {
    setCheckedClasses(prev => ({ ...prev, [label]: !prev[label] }))
  }

  function toggleNotif(label: string) {
    setNotifOn(prev => ({ ...prev, [label]: !prev[label] }))
  }

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
          Hồ sơ &amp; Mục tiêu
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {/* LEFT column */}
        <div>
          {/* Profile card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 16,
              }}
            >
              T
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111310', marginBottom: 4 }}>
              Nguyễn Thị Trâm
            </div>
            <div style={{ fontSize: 13, color: '#5E625A', marginBottom: 2 }}>
              tramnguyen@gmail.com
            </div>
            <div style={{ fontSize: 13, color: '#5E625A', marginBottom: 2 }}>
              0901 234 567
            </div>
            <div style={{ fontSize: 13, color: '#8A8E85', marginBottom: 0 }}>
              Tham gia từ: 01/03/2025
            </div>
            <button
              style={{
                marginTop: 16,
                background: '#D7FF3F',
                color: '#111310',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>

          {/* Goals card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 16 }}>
              Mục tiêu tập luyện
            </div>

            {/* Primary goal */}
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Mục tiêu chính
              </label>
              <input
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 14,
                  width: '100%',
                  boxSizing: 'border-box' as const,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Weekly target */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Số buổi/tuần
              </label>
              <input
                type="number"
                value={sessionsPerWeek}
                onChange={e => setSessionsPerWeek(Number(e.target.value))}
                min={1}
                max={7}
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 14,
                  width: '100%',
                  boxSizing: 'border-box' as const,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Preferred class types */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 10,
                }}
              >
                Loại lớp yêu thích
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px 16px',
                }}
              >
                {classTypes.map(c => (
                  <label
                    key={c.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 14,
                      color: '#111310',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedClasses[c.label]}
                      onChange={() => toggleClass(c.label)}
                      style={{ accentColor: '#D7FF3F', width: 16, height: 16 }}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              style={{
                marginTop: 4,
                background: '#D7FF3F',
                color: '#111310',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Lưu mục tiêu
            </button>
          </div>
        </div>

        {/* RIGHT column */}
        <div>
          {/* Studio membership card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 4 }}>
              Hội viên studio
            </div>
            {membershipRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: i < membershipRows.length - 1 ? '1px solid #DADCD3' : 'none',
                }}
              >
                <span style={{ fontSize: 13, color: '#5E625A' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#111310' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Notification preferences card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 24,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 4 }}>
              Cài đặt thông báo
            </div>
            {notifSettings.map((n, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < notifSettings.length - 1 ? '1px solid #DADCD3' : 'none',
                }}
              >
                <span style={{ fontSize: 14, color: '#111310' }}>{n.label}</span>
                <Toggle on={notifOn[n.label]} onClick={() => toggleNotif(n.label)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
