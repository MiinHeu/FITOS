'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TYPES = ['All', 'HIIT', 'Yoga', 'Cycling', 'Boxing', 'Pilates', 'Running'];

const allClasses = [
  { id: 1, name: 'HIIT & Strength', time: '06:00', trainer: 'Coach Sarah', spots: 14, type: 'HIIT', day: 'Mon', duration: '45 min', level: 'All levels' },
  { id: 2, name: 'Yoga Flow', time: '07:30', trainer: 'Coach Emma', spots: 8, type: 'Yoga', day: 'Mon', duration: '60 min', level: 'Beginner–Int.' },
  { id: 3, name: 'Cycling Power', time: '09:00', trainer: 'Coach Marcus', spots: 3, type: 'Cycling', day: 'Mon', duration: '45 min', level: 'Intermediate' },
  { id: 4, name: 'Box & Burn', time: '17:30', trainer: 'Coach Leo', spots: 12, type: 'Boxing', day: 'Tue', duration: '60 min', level: 'All levels' },
  { id: 5, name: 'Pilates Core', time: '18:30', trainer: 'Coach Nina', spots: 6, type: 'Pilates', day: 'Tue', duration: '45 min', level: 'Beginner' },
  { id: 6, name: 'Evening Run Club', time: '19:00', trainer: 'Coach Dan', spots: 20, type: 'Running', day: 'Tue', duration: '60 min', level: 'All levels' },
  { id: 7, name: 'Morning HIIT', time: '06:30', trainer: 'Coach Sarah', spots: 10, type: 'HIIT', day: 'Wed', duration: '30 min', level: 'Advanced' },
  { id: 8, name: 'Restorative Yoga', time: '10:00', trainer: 'Coach Emma', spots: 12, type: 'Yoga', day: 'Wed', duration: '75 min', level: 'All levels' },
  { id: 9, name: 'Spin Express', time: '12:00', trainer: 'Coach Marcus', spots: 5, type: 'Cycling', day: 'Thu', duration: '30 min', level: 'All levels' },
];

export default function ClassesPage() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [activeType, setActiveType] = useState('All');

  const filtered = allClasses.filter(
    (c) => c.day === activeDay && (activeType === 'All' || c.type === activeType)
  );

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#F5F5F0] py-16">
          <div className="max-w-[1280px] mx-auto px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-3">CLASS TIMETABLE</p>
            <h1 className="text-[52px] font-bold text-[#111310] mb-4">Find your class</h1>
            <p className="text-lg text-[#5E625A] max-w-md">Browse and book from 40+ weekly classes — something for every level.</p>
          </div>
        </section>

        {/* Sticky filter bar */}
        <div className="bg-white sticky top-16 z-30 border-b border-[#DADCD3]">
          <div className="max-w-[1280px] mx-auto px-10 py-4">
            {/* Day pills */}
            <div className="flex items-center gap-2 mb-3">
              {DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeDay === d
                      ? 'bg-[#171A16] text-white'
                      : 'bg-[#F5F5F0] text-[#5E625A] hover:bg-[#DADCD3]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            {/* Type chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeType === t
                      ? 'bg-[#D7FF3F] text-[#111310]'
                      : 'bg-[#F5F5F0] text-[#8A8E85] hover:bg-[#DADCD3]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Classes grid */}
        <section className="bg-white py-10">
          <div className="max-w-[1280px] mx-auto px-10">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-bold text-[#111310] mb-2">No classes on this day</p>
                <p className="text-sm text-[#8A8E85]">Try a different day or type</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((c) => (
                  <div key={c.id} className="bg-white border border-[#DADCD3] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#526B00] bg-[#F5F5F0] px-2 py-1 rounded-full">{c.type}</span>
                      <span className="text-xs text-[#8A8E85]">{c.time} · {c.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#111310] mb-1">{c.name}</h3>
                    <p className="text-sm text-[#8A8E85] mb-1">{c.trainer}</p>
                    <p className="text-xs text-[#5E625A] mb-4">{c.level}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${ c.spots <= 5 ? 'text-red-500' : 'text-[#5E625A]' }`}>
                        {c.spots <= 0 ? 'Full' : `${c.spots} spots left`}
                      </span>
                      <a href="/register" className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-1.5 text-xs hover:bg-[#C4E82E] transition-colors">Book</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Info strip */}
        <section className="bg-[#D7FF3F] py-6">
          <div className="max-w-[1280px] mx-auto px-10 text-center">
            <p className="text-sm font-bold text-[#111310]">🎉 First class is FREE for new members — <a href="/register" className="underline">Register now</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
