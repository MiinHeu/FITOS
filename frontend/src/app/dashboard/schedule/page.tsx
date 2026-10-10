"use client";

const schedule = [
  { day: 0, name: 'Yoga Flow', time: '07:00', instructor: 'Coach Thanh Hà', spots: '12/15', type: 'Yoga' },
  { day: 0, name: 'HIIT Blast', time: '08:30', instructor: 'Coach Minh Tuấn', spots: '18/20', type: 'HIIT' },
  { day: 0, name: 'PT Session', time: '10:00', instructor: 'Coach Văn Quân', spots: '1/1', type: 'PT' },
  { day: 0, name: 'Strength Lab', time: '18:30', instructor: 'Coach Đức Anh', spots: '14/16', type: 'Strength' },
  { day: 1, name: 'Yin Yoga', time: '07:00', instructor: 'Coach Mai Anh', spots: '10/15', type: 'Yoga' },
  { day: 1, name: 'Cycling Power', time: '09:00', instructor: 'Coach Phương Linh', spots: '20/20', type: 'Cycling' },
  { day: 1, name: 'HIIT Circuit', time: '19:00', instructor: 'Coach Hoàng Nam', spots: '15/20', type: 'HIIT' },
  { day: 2, name: 'Boxing Basics', time: '08:00', instructor: 'Coach Đức Anh', spots: '8/12', type: 'HIIT' },
  { day: 2, name: 'Yoga Flow', time: '09:30', instructor: 'Coach Thanh Hà', spots: '11/15', type: 'Yoga' },
  { day: 2, name: 'PT Session', time: '11:00', instructor: 'Coach Minh Tuấn', spots: '1/1', type: 'PT' },
  { day: 2, name: 'Cycling Power', time: '18:00', instructor: 'Coach Ngọc Bích', spots: '19/20', type: 'Cycling' },
  { day: 3, name: 'Strength Lab', time: '07:30', instructor: 'Coach Văn Quân', spots: '12/16', type: 'Strength' },
  { day: 3, name: 'HIIT Blast', time: '08:30', instructor: 'Coach Minh Tuấn', spots: '20/20', type: 'HIIT' },
  { day: 3, name: 'Yin Yoga', time: '19:00', instructor: 'Coach Mai Anh', spots: '9/15', type: 'Yoga' },
  { day: 4, name: 'Cycling Power', time: '07:00', instructor: 'Coach Phương Linh', spots: '18/20', type: 'Cycling' },
  { day: 4, name: 'PT Session', time: '09:00', instructor: 'Coach Văn Quân', spots: '1/1', type: 'PT' },
  { day: 4, name: 'Boxing Basics', time: '17:00', instructor: 'Coach Đức Anh', spots: '10/12', type: 'HIIT' },
  { day: 4, name: 'Strength Lab', time: '19:30', instructor: 'Coach Minh Tuấn', spots: '13/16', type: 'Strength' },
  { day: 5, name: 'HIIT Blast', time: '08:00', instructor: 'Coach Hoàng Nam', spots: '17/20', type: 'HIIT' },
  { day: 5, name: 'Yoga Flow', time: '09:30', instructor: 'Coach Thanh Hà', spots: '14/15', type: 'Yoga' },
  { day: 5, name: 'Cycling Power', time: '10:30', instructor: 'Coach Ngọc Bích', spots: '16/20', type: 'Cycling' },
  { day: 6, name: 'Strength Lab', time: '09:00', instructor: 'Coach Văn Quân', spots: '15/16', type: 'Strength' },
  { day: 6, name: 'Yin Yoga', time: '10:30', instructor: 'Coach Mai Anh', spots: '12/15', type: 'Yoga' },
];

const typeColor: Record<string, string> = {
  Yoga: '#7C3AED',
  HIIT: '#F97316',
  Cycling: '#3B82F6',
  Strength: '#22C55E',
  PT: '#D7FF3F',
};

const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export default function SchedulePage() {
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
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: 4,
              color: '#526B00',
            }}
          >
            MANAGER
          </span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
            Lịch lớp &amp; PT
          </h1>
        </div>
        <button
          style={{
            background: '#D7FF3F',
            color: '#111310',
            borderRadius: 10,
            padding: '10px 20px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Thêm lớp
        </button>
      </div>

      {/* Weekly calendar */}
      <div style={{ padding: '24px 28px' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 12,
            }}
          >
            {dayLabels.map((day, colIndex) => (
              <div key={colIndex}>
                {/* Column header */}
                <span
                  style={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#8A8E85',
                    marginBottom: 12,
                    textAlign: 'center',
                  }}
                >
                  {day}
                </span>

                {/* Class cards for this day */}
                {schedule
                  .filter((item) => item.day === colIndex)
                  .map((item, cardIndex) => (
                    <div
                      key={cardIndex}
                      style={{
                        background: '#F5F5F0',
                        borderRadius: 8,
                        padding: '8px 10px',
                        marginBottom: 8,
                        borderLeft: `3px solid ${typeColor[item.type]}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#111310',
                          marginBottom: 2,
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#5E625A', marginBottom: 2 }}>
                        {item.time}
                      </div>
                      <div style={{ fontSize: 11, color: '#8A8E85', marginBottom: 4 }}>
                        {item.instructor}
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          background: '#ECEDE6',
                          color: '#5E625A',
                          borderRadius: 20,
                          padding: '1px 7px',
                          fontSize: 10,
                          fontWeight: 600,
                        }}
                      >
                        {item.spots}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
