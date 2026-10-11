"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TODAY_INDEX = 2; // Wednesday

const CLASS_TYPES = ['All', 'Yoga', 'HIIT', 'Strength', 'Boxing', 'Pilates'];

const CLASSES = [
  { name: 'Yoga Flow', instructor: 'Coach Thanh Hà', initials: 'TH', time: '07:00', duration: '60 min', spots: 5, type: 'Yoga' },
  { name: 'HIIT Blast', instructor: 'Coach Minh Tuấn', initials: 'MT', time: '08:30', duration: '45 min', spots: 12, type: 'HIIT' },
  { name: 'Strength Lab', instructor: 'Coach Văn Quân', initials: 'VQ', time: '10:30', duration: '60 min', spots: 8, type: 'Strength' },
  { name: 'Boxing Basics', instructor: 'Coach Đức Anh', initials: 'ĐA', time: '17:00', duration: '60 min', spots: 0, type: 'Boxing' },
  { name: 'Yin Yoga', instructor: 'Coach Mai Anh', initials: 'MA', time: '18:00', duration: '75 min', spots: 10, type: 'Yoga' },
  { name: 'HIIT Circuit', instructor: 'Coach Hoàng Nam', initials: 'HN', time: '19:00', duration: '45 min', spots: 2, type: 'HIIT' },
];

const TYPE_BADGE: Record<string, { bg: string; color: string }> = {
  Yoga:     { bg: '#F3E8FF', color: '#7C3AED' },
  HIIT:     { bg: '#FFF3E0', color: '#B87000' },
  Strength: { bg: '#E8FFAA', color: '#526B00' },
  Boxing:   { bg: '#FFE4E1', color: '#B91C1C' },
  Pilates:  { bg: '#E9EDFF', color: '#3B4FA8' },
};

export default function ClassesPage() {
  const [selectedDay, setSelectedDay] = useState(TODAY_INDEX);
  const [selectedType, setSelectedType] = useState('All');

  const filtered = selectedType === 'All' ? CLASSES : CLASSES.filter((c) => c.type === selectedType);

  return (
    <>
      <Header />
      <main>

        {/* 1. Hero */}
        <section className="pt-24 pb-10 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#526B00' }}>
              CLASSES · PULSE DISTRICT 2
            </p>
            <h1 className="font-bold mb-3" style={{ fontSize: 40, color: '#111310' }}>
              Find your perfect class
            </h1>
            <p style={{ fontSize: 17, color: '#5E625A', maxWidth: 520 }}>
              Yoga, HIIT, Strength, Boxing — pick what moves you. New sessions added every week.
            </p>
          </div>
        </section>

        {/* 2. Sticky filter bar */}
        <div className="sticky z-40 bg-white border-b px-10 py-4" style={{ top: 64, borderColor: '#DADCD3' }}>
          <div className="max-w-[1280px] mx-auto">
            {/* Day tabs */}
            <div className="flex gap-2 flex-wrap mb-3">
              {DAYS.map((day, idx) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(idx)}
                  className="text-sm font-semibold rounded-full px-4 py-1.5 transition-all"
                  style={{
                    background: selectedDay === idx ? '#D7FF3F' : 'transparent',
                    color: selectedDay === idx ? '#111310' : '#5E625A',
                    border: selectedDay === idx ? 'none' : '1px solid #DADCD3',
                  }}
                >
                  {idx === TODAY_INDEX ? `${day} (Today)` : day}
                </button>
              ))}
            </div>
            {/* Type chips */}
            <div className="flex gap-2 flex-wrap">
              {CLASS_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className="text-sm font-semibold rounded-full px-4 py-1.5 transition-all"
                  style={{
                    background: selectedType === type ? '#D7FF3F' : 'transparent',
                    color: selectedType === type ? '#111310' : '#5E625A',
                    border: selectedType === type ? 'none' : '1px solid #DADCD3',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Classes grid */}
        <section className="py-10 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16" style={{ color: '#8A8E85' }}>
                No classes found for this filter. Try a different day or type.
              </div>
            ) : (
              filtered.map((cls) => {
                const badge = TYPE_BADGE[cls.type] ?? { bg: '#F5F5F0', color: '#5E625A' };
                return (
                  <div
                    key={cls.name}
                    className="bg-white rounded-xl border p-5 flex flex-col gap-3"
                    style={{ borderColor: '#DADCD3' }}
                  >
                    {/* Top row: time badge + type chip */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-semibold rounded-full px-2 py-0.5"
                        style={{ background: '#D7FF3F', color: '#111310' }}
                      >
                        {cls.time}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {cls.type}
                      </span>
                    </div>

                    {/* Class name */}
                    <h3 className="font-bold" style={{ fontSize: 16, color: '#111310' }}>{cls.name}</h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center font-bold text-xs rounded-full shrink-0"
                        style={{ width: 28, height: 28, background: '#ECEDE6', color: '#111310' }}
                      >
                        {cls.initials}
                      </div>
                      <span className="text-sm" style={{ color: '#5E625A' }}>{cls.instructor}</span>
                    </div>

                    {/* Bottom row: duration + spots + book button */}
                    <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid #ECEDE6' }}>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: '#8A8E85' }}>⏱ {cls.duration}</span>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: cls.spots === 0 ? '#FFE4E1' : '#E8FFAA',
                            color: cls.spots === 0 ? '#B91C1C' : '#526B00',
                          }}
                        >
                          {cls.spots === 0 ? 'Full' : `${cls.spots} spots`}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-semibold rounded-lg px-3 py-1.5"
                        style={{
                          background: cls.spots === 0 ? 'transparent' : 'transparent',
                          color: '#111310',
                          border: '1px solid #171A16',
                        }}
                      >
                        {cls.spots === 0 ? 'Waitlist' : 'Book now'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* 4. Info strip */}
        <section className="py-8 px-10" style={{ background: '#D7FF3F' }}>
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-bold text-center" style={{ fontSize: 16, color: '#111310' }}>
              🎉 First class is always free — no commitment required
            </p>
            <button
              type="button"
              className="shrink-0 font-semibold rounded-lg px-5 py-2.5 text-sm"
              style={{ background: '#171A16', color: '#ECEDE6' }}
            >
              Sign up now
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
