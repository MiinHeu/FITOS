"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TODAY_INDEX = 2; // Wednesday

const CLASS_TYPES = ['All', 'Yoga', 'HIIT', 'Cycling', 'Strength', 'Boxing'];

const CLASSES = [
  { name: 'Yoga Flow', instructor: 'Coach Thanh Hà', time: '07:00', duration: '60 phút', spots: 5, type: 'Yoga' },
  { name: 'HIIT Blast', instructor: 'Coach Minh Tuấn', time: '08:30', duration: '45 phút', spots: 12, type: 'HIIT' },
  { name: 'Cycling Power', instructor: 'Coach Phương Linh', time: '09:00', duration: '50 phút', spots: 3, type: 'Cycling' },
  { name: 'Strength Lab', instructor: 'Coach Văn Quân', time: '10:30', duration: '60 phút', spots: 8, type: 'Strength' },
  { name: 'Boxing Basics', instructor: 'Coach Đức Anh', time: '17:00', duration: '60 phút', spots: 0, type: 'Boxing' },
  { name: 'Yin Yoga', instructor: 'Coach Mai Anh', time: '18:00', duration: '75 phút', spots: 10, type: 'Yoga' },
  { name: 'HIIT Circuit', instructor: 'Coach Hoàng Nam', time: '19:00', duration: '45 phút', spots: 2, type: 'HIIT' },
  { name: 'Power Cycling', instructor: 'Coach Ngọc Bích', time: '20:00', duration: '50 phút', spots: 6, type: 'Cycling' },
];

const TYPE_BADGE: Record<string, { bg: string; color: string }> = {
  Yoga:     { bg: '#F3E8FF', color: '#7C3AED' },
  HIIT:     { bg: '#FFF3E0', color: '#B87000' },
  Cycling:  { bg: '#E9EDFF', color: '#3B4FA8' },
  Strength: { bg: '#E8FFAA', color: '#526B00' },
  Boxing:   { bg: '#FFE4E1', color: '#B91C1C' },
};

export default function ClassesPage() {
  const [activeDay, setActiveDay] = useState(TODAY_INDEX);
  const [activeType, setActiveType] = useState('All');

  const filtered = activeType === 'All' ? CLASSES : CLASSES.filter(c => c.type === activeType);

  return (
    <div style={{ background: '#F5F5F0', minHeight: '100vh', paddingTop: 80 }}>
      <Header />

      {/* Hero */}
      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#526B00',
              marginBottom: 8,
            }}
          >
            CLASSES · PULSE DISTRICT 2
          </p>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111310', marginBottom: 10 }}>
            Find your class.
          </h1>
          <p style={{ fontSize: 16, color: '#5E625A' }}>
            Yoga, HIIT, Cycling, Strength — pick what moves you.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #DADCD3', padding: '16px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Day tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {DAYS.map((day, idx) => (
              <button
                key={day}
                onClick={() => setActiveDay(idx)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  background: activeDay === idx ? '#D7FF3F' : '#F5F5F0',
                  color: activeDay === idx ? '#111310' : '#5E625A',
                  transition: 'all 0.15s',
                }}
              >
                {idx === TODAY_INDEX ? `${day} (Today)` : day}
              </button>
            ))}
          </div>

          {/* Class type chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CLASS_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  border: activeType === type ? 'none' : '1px solid #DADCD3',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  background: activeType === type ? '#D7FF3F' : 'transparent',
                  color: activeType === type ? '#111310' : '#5E625A',
                  transition: 'all 0.15s',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Class cards grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 28px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {filtered.map((cls) => {
            const badge = TYPE_BADGE[cls.type] ?? { bg: '#F5F5F0', color: '#5E625A' };
            return (
              <div
                key={cls.name}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid #DADCD3',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {/* Type badge */}
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: badge.bg,
                      color: badge.color,
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 6,
                      padding: '3px 10px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cls.type}
                  </span>
                </div>

                {/* Name */}
                <p style={{ fontSize: 18, fontWeight: 700, color: '#111310', margin: 0 }}>
                  {cls.name}
                </p>

                {/* Instructor */}
                <p style={{ fontSize: 13, color: '#5E625A', margin: 0 }}>
                  {cls.instructor}
                </p>

                {/* Time + duration */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" fill="none" stroke="#8A8E85" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span style={{ fontSize: 13, color: '#8A8E85' }}>
                    {cls.time} · {cls.duration}
                  </span>
                </div>

                {/* Spots */}
                <div>
                  {cls.spots > 0 ? (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#526B00',
                        background: '#E8FFAA',
                        borderRadius: 6,
                        padding: '3px 10px',
                      }}
                    >
                      {cls.spots} chỗ còn lại
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#B91C1C',
                        background: '#FFE4E1',
                        borderRadius: 6,
                        padding: '3px 10px',
                      }}
                    >
                      Hết chỗ
                    </span>
                  )}
                </div>

                {/* Book button */}
                {cls.spots > 0 ? (
                  <button
                    style={{
                      background: '#D7FF3F',
                      color: '#111310',
                      borderRadius: 10,
                      padding: '12px 16px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    Đặt lịch
                  </button>
                ) : (
                  <button
                    style={{
                      background: 'transparent',
                      border: '1px solid #DADCD3',
                      color: '#111310',
                      borderRadius: 10,
                      padding: '12px 16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    Waitlist
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Info strip */}
      <section
        style={{
          background: '#D7FF3F',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 16, fontWeight: 700, color: '#111310', margin: 0 }}>
          Miễn phí buổi đầu tiên cho hội viên mới 🎉
        </p>
      </section>

      <Footer />
    </div>
  );
}
