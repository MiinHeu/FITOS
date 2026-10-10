"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Link from 'next/link';

const weeklyRevenue = [
  { week: 'W1', value: 45 }, { week: 'W2', value: 55 }, { week: 'W3', value: 40 },
  { week: 'W4', value: 60 }, { week: 'W5', value: 50 }, { week: 'W6', value: 65 },
  { week: 'W7', value: 70 }, { week: 'W8', value: 85 },
];

const classData = [
  { time: '07:00', name: 'Engine Room', coach: 'Coach Minh', fill: 13, max: 18 },
  { time: '12:15', name: 'Mobility Reset', coach: 'Coach An', fill: 8, max: 18 },
  { time: '18:30', name: 'Strength Lab', coach: 'Coach Quân', fill: 14, max: 16 },
  { time: '19:45', name: 'Boxing Basics', coach: 'Coach Mai', fill: 20, max: 20 },
];

const expiringMembers = [
  { name: 'Hà My', plan: 'Perform', days: 2 },
  { name: 'Đức Anh', plan: 'Move', days: 5 },
  { name: 'Yến Nhi', plan: 'PT Focus', days: 9 },
];

const priorities = [
  { label: 'Follow up 12 trial members', badge: 'CRM', urgent: true },
  { label: '3 memberships expire in 2 days', badge: 'Renewals', urgent: true },
  { label: 'Engine Room (07:00) — 5 spots left', badge: 'Classes', urgent: false },
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

  return (
    <div>
      {/* Page header */}
      <div
        style={{background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',}}
      >
        <div>
          <span
            className="text-[11px] font-semibold uppercase tracking-widest block mb-1"
            style={{color: '#526B00'}}
          >
            Manager
          </span>
          <h1 className="font-bold" style={{fontSize: 28, color: '#111310'}}>
            {t.dash_greeting}
          </h1>
          <p className="text-sm mt-1" style={{color: '#8A8E85'}}>{t.dash_date}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{color: '#8A8E85'}}
              fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="pl-10 pr-4 py-2.5 text-sm focus:outline-none"
              placeholder={t.dash_search}
              style={{width: 200,
                background: '#F5F5F0',
                border: '1px solid #DADCD3',
                borderRadius: 10,
                color: '#111310',}}
            />
          </div>
          <button
            className="font-semibold text-sm"
            style={{background: '#D7FF3F',
              color: '#111310',
              borderRadius: 10,
              padding: '10px 20px',}}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{padding: '24px 28px'}}>
        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: t.dash_revenue, value: 'đ286.4M', delta: '+12.8% vs last month', highlight: true },
            { label: t.dash_members, value: '642', delta: '+24 net new' },
            { label: t.dash_leads, value: '86', delta: '+18.2% this month' },
            { label: t.dash_conversion, value: '31.4%', delta: '+4.1 pts' },
          ].map((m, i) => (
            <div
              key={i}
              style={{background: i === 0 ? 'rgba(215,255,63,0.08)' : '#fff',
                borderRadius: 16,
                border: i === 0 ? '1px solid rgba(215,255,63,0.3)' : '1px solid #DADCD3',
                padding: 20,}}
            >
              <p className="text-xs font-medium mb-2" style={{color: '#8A8E85'}}>{m.label}</p>
              <p className="font-bold" style={{fontSize: 28, color: '#111310'}}>{m.value}</p>
              <p className="text-xs mt-1 font-medium" style={{color: '#526B00'}}>{m.delta}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart + CRM funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Revenue chart */}
          <div
            className="col-span-2"
            style={{background: '#fff', borderRadius: 16, border: '1px solid #DADCD3', padding: 24}}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold" style={{fontSize: 14, color: '#111310'}}>{t.dash_revenue_perf}</h3>
                <p className="text-xs mt-0.5" style={{color: '#8A8E85'}}>{t.dash_revenue_sub}</p>
              </div>
              <Link href="#" className="text-xs font-semibold" style={{color: '#526B00'}}>
                {t.dash_view_orders}
              </Link>
            </div>
            <div className="flex items-end gap-2" style={{height: 160}}>
              {weeklyRevenue.map((w, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-lg"
                    style={{
                      height: `${w.value * 1.8}px`,
                      background: i === weeklyRevenue.length - 1 ? '#D7FF3F' : '#ECEDE6',
                    }}
                  />
                  <span className="text-[10px]" style={{color: '#8A8E85'}}>{w.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CRM funnel */}
          <div style={{background: '#171A16', borderRadius: 16, padding: 24}}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold" style={{fontSize: 14, color: '#ECEDE6'}}>{t.dash_crm_funnel}</h3>
                <p className="text-xs mt-0.5" style={{color: '#5E625A'}}>86 {t.dash_open_leads}</p>
              </div>
              <Link href="/dashboard/leads" className="text-xs font-semibold" style={{color: '#D7FF3F'}}>
                {t.dash_open_crm}
              </Link>
            </div>
            <div className="space-y-2">
              {[
                { label: t.dash_new_lead, count: 86, pct: '100%' },
                { label: t.dash_consultation, count: 54, pct: '63%' },
                { label: t.dash_trial_booked, count: 37, pct: '43%' },
                { label: t.dash_purchase, count: 27, pct: '31%', lime: true },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{background: s.lime ? 'rgba(215,255,63,0.12)' : 'rgba(255,255,255,0.06)'}}
                >
                  <span className="text-sm" style={{color: '#ECEDE6'}}>{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{color: s.lime ? '#D7FF3F' : '#ECEDE6'}}>{s.count}</span>
                    <span className="text-xs" style={{color: '#5E625A'}}>· {s.pct}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 leading-relaxed" style={{color: '#5E625A'}}>
              {t.dash_best_opp}
            </p>
          </div>
        </div>

        {/* Class occupancy + Memberships expiring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Class occupancy */}
          <div style={{background: '#fff', borderRadius: 16, border: '1px solid #DADCD3', padding: 24}}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold" style={{fontSize: 14, color: '#111310'}}>{t.dash_class_occ}</h3>
                <p className="text-xs mt-0.5" style={{color: '#8A8E85'}}>{t.dash_class_today}</p>
              </div>
              <Link href="#" className="text-xs font-semibold" style={{color: '#526B00'}}>
                {t.dash_full_schedule}
              </Link>
            </div>
            <div className="space-y-4">
              {classData.map((c, i) => {
                const pct = (c.fill / c.max) * 100;
                const barColor = pct >= 100 ? '#FF6B6B' : pct >= 80 ? '#FFB347' : '#D7FF3F';
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-bold w-12 text-right" style={{color: '#111310'}}>{c.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-sm font-semibold" style={{color: '#111310'}}>{c.name}</span>
                          <span className="text-xs ml-2" style={{color: '#8A8E85'}}>{c.coach}</span>
                        </div>
                        <span className="text-xs" style={{color: '#8A8E85'}}>{c.fill}/{c.max}</span>
                      </div>
                      <div className="w-full rounded-full h-2" style={{background: '#ECEDE6'}}>
                        <div
                          className="rounded-full h-2 transition-all"
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Memberships expiring */}
          <div style={{background: '#fff', borderRadius: 16, border: '1px solid #DADCD3', padding: 24}}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold" style={{fontSize: 14, color: '#111310'}}>{t.dash_memberships_exp}</h3>
                <p className="text-xs mt-0.5" style={{color: '#8A8E85'}}>{t.dash_memberships_sub}</p>
              </div>
              <Link href="#" className="text-xs font-semibold" style={{color: '#8A8E85'}}>
                {t.dash_view_all}
              </Link>
            </div>
            <div className="space-y-4">
              {expiringMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center font-bold text-xs rounded-full flex-shrink-0"
                    style={{width: 40, height: 40, background: '#ECEDE6', color: '#111310'}}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{color: '#111310'}}>{m.name}</p>
                    <p className="text-xs" style={{color: '#8A8E85'}}>{m.plan}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{background: m.days <= 3 ? '#FFF0F0' : m.days <= 5 ? '#FFF8E6' : '#F5F5F0',
                      color: m.days <= 3 ? '#D93030' : m.days <= 5 ? '#B87000' : '#5E625A',}}
                  >
                    {m.days} days
                  </span>
                </div>
              ))}
            </div>
            <button
              className="mt-6 flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{color: '#111310'}}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t.dash_start_renewal}
            </button>
          </div>
        </div>

        {/* Today's priorities */}
        <div style={{background: '#fff', borderRadius: 16, border: '1px solid #DADCD3', padding: 24}}>
          <h3 className="font-bold mb-4" style={{fontSize: 14, color: '#111310'}}>Today&apos;s priorities</h3>
          <div className="space-y-2">
            {priorities.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{background: '#F5F5F0'}}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{background: p.urgent ? '#D7FF3F' : '#ECEDE6',
                    color: p.urgent ? '#526B00' : '#5E625A',}}
                >
                  {p.badge}
                </span>
                <span className="text-sm" style={{color: '#111310'}}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
