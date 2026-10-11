"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

const monthlyRevenue = [
  { month: 'Jan', value: 52 },
  { month: 'Feb', value: 48 },
  { month: 'Mar', value: 61 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 67 },
  { month: 'Jun', value: 72 },
  { month: 'Jul', value: 85 },
];

const classOccupancy = [
  { time: '07:00', name: 'Engine Room', instructor: 'Coach Minh', fill: 13, max: 18 },
  { time: '12:15', name: 'Mobility Reset', instructor: 'Coach An', fill: 8, max: 18 },
  { time: '18:30', name: 'Strength Lab', instructor: 'Coach Quân', fill: 14, max: 16 },
  { time: '19:45', name: 'Boxing Basics', instructor: 'Coach Mai', fill: 20, max: 20 },
];

const expiringMembers = [
  { name: 'Hà My', plan: 'Perform', days: 2 },
  { name: 'Đức Anh', plan: 'Move', days: 5 },
  { name: 'Yến Nhi', plan: 'PT Focus', days: 9 },
  { name: 'Minh Khoa', plan: 'Perform', days: 12 },
];

const priorities = [
  { label: 'Follow up with 12 trial members within 24 hours', badge: 'High', urgent: true },
  { label: '3 memberships expire in 2 days — start renewal flow', badge: 'High', urgent: true },
  { label: 'Engine Room (07:00) — 5 spots still available', badge: 'Med', urgent: false },
];

export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => {
      const s = localStorage.getItem('locale') as Locale | null;
      if (s) setLocale(s);
    };
    sync();
    window.addEventListener('locale-changed', sync);
    return () => window.removeEventListener('locale-changed', sync);
  }, []);

  const t = useTranslations(mounted ? locale : 'en');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#526B00' }}>
            OVERVIEW
          </span>
          <h1 className="text-2xl font-bold" style={{ color: '#111310' }}>
            Good morning, Studio
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: '#5E625A' }}>{today}</span>
          <button
            className="text-sm font-semibold rounded-lg px-4 py-2"
            style={{ background: '#D7FF3F', color: '#111310' }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">

        {/* Row 1 — Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Members', value: '248', change: '▲12%', changeColor: '#526B00' },
            { label: 'Revenue MTD', value: '$12,400', change: '▲8%', changeColor: '#526B00' },
            { label: 'Classes Today', value: '14', change: '4 in progress', changeColor: '#5E625A' },
            { label: 'Active Leads', value: '32', change: '▲5 this week', changeColor: '#526B00' },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#DADCD3] p-5"
            >
              <p className="text-xs mb-2" style={{ color: '#5E625A' }}>{card.label}</p>
              <p className="text-[28px] font-bold" style={{ color: '#111310' }}>{card.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.changeColor }}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — Revenue chart + CRM Funnel */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Revenue chart (col-span-2) */}
          <div className="col-span-2 bg-white rounded-xl border border-[#DADCD3] p-5">
            <h2 className="text-sm font-bold mb-5" style={{ color: '#111310' }}>Monthly Revenue</h2>
            <div className="flex items-end gap-3" style={{ height: 140 }}>
              {monthlyRevenue.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-md"
                    style={{
                      height: `${bar.value * 1.5}px`,
                      background: i === monthlyRevenue.length - 1 ? '#D7FF3F' : '#DADCD3',
                    }}
                  />
                  <span className="text-[10px]" style={{ color: '#5E625A' }}>{bar.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CRM Funnel */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <h2 className="text-sm font-bold mb-5" style={{ color: '#111310' }}>Lead Funnel</h2>
            <div className="space-y-3">
              {[
                { stage: 'New', count: 24, pct: 100 },
                { stage: 'Contacted', count: 18, pct: 75 },
                { stage: 'Trial', count: 12, pct: 50 },
                { stage: 'Converted', count: 8, pct: 33 },
                { stage: 'Lost', count: 5, pct: 21 },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs w-20 flex-shrink-0" style={{ color: '#5E625A' }}>{row.stage}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: '#F0F0EB' }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${row.pct}%`, background: '#D7FF3F' }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-6 text-right" style={{ color: '#111310' }}>{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 — Class occupancy + Expiring memberships */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Class occupancy (col-span-2) */}
          <div className="col-span-2 bg-white rounded-xl border border-[#DADCD3] p-5">
            <h2 className="text-sm font-bold mb-5" style={{ color: '#111310' }}>Today&apos;s Classes</h2>
            <div className="space-y-4">
              {classOccupancy.map((cls, i) => {
                const pct = Math.round((cls.fill / cls.max) * 100);
                const barColor = pct >= 100 ? '#FF6B6B' : pct >= 80 ? '#FFB347' : '#D7FF3F';
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-bold w-12 flex-shrink-0" style={{ color: '#111310' }}>{cls.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#111310' }}>{cls.name}</span>
                          <span className="text-xs" style={{ color: '#5E625A' }}>{cls.instructor}</span>
                        </div>
                        <span className="text-xs" style={{ color: '#5E625A' }}>{cls.fill}/{cls.max} seats</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: '#F0F0EB' }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expiring memberships */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <h2 className="text-sm font-bold mb-5" style={{ color: '#111310' }}>Expiring Memberships</h2>
            <div className="space-y-3">
              {expiringMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: '#F0F0EB', color: '#111310' }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#111310' }}>{m.name}</p>
                    <p className="text-xs" style={{ color: '#5E625A' }}>{m.plan}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: m.days <= 3 ? '#FFF0F0' : m.days <= 7 ? '#FFF8E6' : '#F0F0EB',
                      color: m.days <= 3 ? '#D93030' : m.days <= 7 ? '#B87000' : '#5E625A',
                    }}
                  >
                    {m.days}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4 — Today's Priorities */}
        <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
          <h2 className="text-sm font-bold mb-4" style={{ color: '#111310' }}>Today&apos;s Priorities</h2>
          <div className="space-y-2">
            {priorities.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{ background: '#F5F5F0' }}
              >
                <input type="checkbox" className="flex-shrink-0 rounded" style={{ accentColor: '#D7FF3F' }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: item.urgent ? '#D7FF3F' : '#DADCD3',
                    color: item.urgent ? '#526B00' : '#5E625A',
                  }}
                >
                  {item.badge}
                </span>
                <span className="text-sm" style={{ color: '#111310' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
