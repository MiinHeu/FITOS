"use client";
import { useState } from 'react';

type ViewMode = 'week' | 'list';

const schedule = [
  { day: 0, time: '07:00', name: 'Yoga Flow',      instructor: 'Coach Thanh Hà',    spots: '12/15', type: 'Yoga' },
  { day: 0, time: '08:30', name: 'HIIT Blast',     instructor: 'Coach Minh Tuấn',   spots: '18/20', type: 'HIIT' },
  { day: 0, time: '18:30', name: 'Strength Lab',   instructor: 'Coach Đức Anh',     spots: '14/16', type: 'Strength' },
  { day: 1, time: '07:00', name: 'Yin Yoga',       instructor: 'Coach Mai Anh',     spots: '10/15', type: 'Yoga' },
  { day: 1, time: '09:00', name: 'Cycling Power',  instructor: 'Coach Phương Linh', spots: '20/20', type: 'Cycling' },
  { day: 1, time: '19:00', name: 'HIIT Circuit',   instructor: 'Coach Hoàng Nam',   spots: '15/20', type: 'HIIT' },
  { day: 2, time: '08:00', name: 'Boxing Basics',  instructor: 'Coach Đức Anh',     spots: '8/12',  type: 'Boxing' },
  { day: 2, time: '09:30', name: 'Yoga Flow',      instructor: 'Coach Thanh Hà',    spots: '11/15', type: 'Yoga' },
  { day: 2, time: '18:00', name: 'Cycling Power',  instructor: 'Coach Ngọc Bích',   spots: '19/20', type: 'Cycling' },
  { day: 3, time: '07:30', name: 'Strength Lab',   instructor: 'Coach Văn Quân',    spots: '12/16', type: 'Strength' },
  { day: 3, time: '08:30', name: 'HIIT Blast',     instructor: 'Coach Minh Tuấn',   spots: '20/20', type: 'HIIT' },
  { day: 3, time: '19:00', name: 'Yin Yoga',       instructor: 'Coach Mai Anh',     spots: '9/15',  type: 'Yoga' },
  { day: 4, time: '07:00', name: 'Cycling Power',  instructor: 'Coach Phương Linh', spots: '18/20', type: 'Cycling' },
  { day: 4, time: '17:00', name: 'Boxing Basics',  instructor: 'Coach Đức Anh',     spots: '10/12', type: 'Boxing' },
  { day: 4, time: '19:30', name: 'Strength Lab',   instructor: 'Coach Minh Tuấn',   spots: '13/16', type: 'Strength' },
  { day: 5, time: '08:00', name: 'HIIT Blast',     instructor: 'Coach Hoàng Nam',   spots: '17/20', type: 'HIIT' },
  { day: 5, time: '09:30', name: 'Yoga Flow',      instructor: 'Coach Thanh Hà',    spots: '14/15', type: 'Yoga' },
  { day: 5, time: '10:30', name: 'Cycling Power',  instructor: 'Coach Ngọc Bích',   spots: '16/20', type: 'Cycling' },
  { day: 6, time: '09:00', name: 'Strength Lab',   instructor: 'Coach Văn Quân',    spots: '15/16', type: 'Strength' },
  { day: 6, time: '10:30', name: 'Yin Yoga',       instructor: 'Coach Mai Anh',     spots: '12/15', type: 'Yoga' },
];

const typeStyle: Record<string, { bg: string; text: string; dot: string }> = {
  Yoga:     { bg: '#F5F3FF', text: '#6D28D9', dot: '#7C3AED' },
  HIIT:     { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  Strength: { bg: '#F0FDF4', text: '#15803D', dot: '#22C55E' },
  Cycling:  { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  Boxing:   { bg: '#FFF1F2', text: '#BE123C', dot: '#F43F5E' },
};

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayDates  = ['14', '15', '16', '17', '18', '19', '20'];
const todayCol  = 1; // Tuesday highlighted

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            OPERATE
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>Class Schedule</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Week / List toggle */}
          <div className="flex items-center rounded-lg border border-[#DADCD3] overflow-hidden">
            {(['week', 'list'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="text-xs font-medium px-4 py-2 capitalize"
                style={{
                  background: viewMode === mode ? '#D7FF3F' : '#fff',
                  color: viewMode === mode ? '#526B00' : '#5E625A',
                }}
              >
                {mode === 'week' ? 'Week' : 'List'}
              </button>
            ))}
          </div>
          <button
            className="text-sm font-semibold rounded-lg px-4 py-2"
            style={{ background: '#D7FF3F', color: '#111310' }}
          >
            + Add Class
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

        {viewMode === 'week' ? (
          <>
            {/* Week navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#DADCD3]"
                style={{ background: '#fff', color: '#5E625A' }}
              >
                ‹
              </button>
              <span className="text-sm font-semibold" style={{ color: '#111310' }}>This Week · Jul 14–20, 2025</span>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#DADCD3]"
                style={{ background: '#fff', color: '#5E625A' }}
              >
                ›
              </button>
            </div>

            {/* Weekly grid */}
            <div className="grid grid-cols-7 gap-3">
              {dayLabels.map((day, colIndex) => {
                const isToday = colIndex === todayCol;
                const dayClasses = schedule.filter((c) => c.day === colIndex);
                return (
                  <div key={colIndex}>
                    {/* Day header */}
                    <div
                      className="text-center mb-3 py-2 rounded-lg"
                      style={{ background: isToday ? '#D7FF3F' : 'transparent' }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: isToday ? '#526B00' : '#5E625A' }}
                      >
                        {day}
                      </p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: isToday ? '#526B00' : '#111310' }}
                      >
                        {dayDates[colIndex]}
                      </p>
                    </div>

                    {/* Class pills */}
                    <div className="space-y-2">
                      {dayClasses.map((cls, ci) => {
                        const style = typeStyle[cls.type] ?? typeStyle.HIIT;
                        return (
                          <div
                            key={ci}
                            className="rounded-lg p-2 cursor-pointer"
                            style={{ background: style.bg }}
                          >
                            <p className="text-xs font-bold truncate" style={{ color: style.text }}>{cls.name}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: style.text, opacity: 0.8 }}>{cls.time}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-6">
              {Object.entries(typeStyle).map(([type, style]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: style.dot }} />
                  <span className="text-xs" style={{ color: '#5E625A' }}>{type}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* List view */
          <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
            <div
              className="grid px-5 py-3 text-xs font-medium uppercase tracking-wide"
              style={{
                background: '#F5F5F0',
                color: '#5E625A',
                gridTemplateColumns: '1fr 2fr 2fr 1.5fr 1fr',
              }}
            >
              {['Day', 'Time & Class', 'Instructor', 'Type', 'Spots'].map((col) => (
                <span key={col}>{col}</span>
              ))}
            </div>

            <div className="divide-y divide-[#F0F0EB]">
              {[...schedule]
                .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
                .map((cls, i) => {
                  const style = typeStyle[cls.type] ?? typeStyle.HIIT;
                  return (
                    <div
                      key={i}
                      className="grid px-5 py-3 items-center hover:bg-[#FAFAF8]"
                      style={{ gridTemplateColumns: '1fr 2fr 2fr 1.5fr 1fr' }}
                    >
                      <span className="text-sm font-medium" style={{ color: '#111310' }}>{dayLabels[cls.day]}</span>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#111310' }}>{cls.name}</p>
                        <p className="text-xs" style={{ color: '#5E625A' }}>{cls.time}</p>
                      </div>
                      <span className="text-sm" style={{ color: '#5E625A' }}>{cls.instructor}</span>
                      <div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: style.bg, color: style.text }}
                        >
                          {cls.type}
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: '#5E625A' }}>{cls.spots}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
