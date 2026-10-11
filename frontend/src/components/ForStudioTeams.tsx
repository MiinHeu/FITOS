"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'CRM & Leads',
    desc: 'Follow every lead from first message to signed membership with a built-in CRM pipeline.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: 'Scheduling',
    desc: 'Live class capacity, waiting lists and auto-confirmations. Spend less time on admin.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    title: 'Revenue Tracking',
    desc: 'Daily revenue, membership health and renewal forecasts — all in one dashboard.',
  },
];

export default function ForStudioTeams() {
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
    <section className="py-20 px-10" style={{ background: '#F5F5F0' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <p
          className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3"
          style={{ color: '#526B00' }}
        >
          {t.studio_label}
        </p>
        <h2
          className="font-bold mb-4"
          style={{ fontSize: 36, color: '#111310' }}
        >
          For Studio Teams
        </h2>
        <p
          className="mb-12"
          style={{ fontSize: 16, color: '#5E625A', maxWidth: 560 }}
        >
          Manage every aspect of your studio.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6"
              style={{ border: '1px solid #DADCD3' }}
            >
              <div
                className="flex items-center justify-center mb-5 rounded-xl"
                style={{ width: 40, height: 40, background: '#D7FF3F', color: '#111310' }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold mb-2 text-sm" style={{ color: '#111310' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: '#5E625A', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Mock dashboard preview */}
        <div
          className="mt-12 rounded-2xl p-6 flex items-center justify-between"
          style={{ background: '#171A16' }}
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.1em] font-medium mb-1"
              style={{ color: 'rgba(215,255,63,0.7)' }}
            >
              Live dashboard
            </p>
            <p className="font-semibold text-sm" style={{ color: '#fff' }}>
              Track everything in real time
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              '12 Classes Today',
              '48 Check-ins',
              '$3,240 Revenue',
            ].map((label) => (
              <span
                key={label}
                className="rounded-full px-4 py-2 text-sm text-white"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
