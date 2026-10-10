"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

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

  const features = [
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: 'CRM & Lead Tracking',
      desc: 'Follow every lead from first message to signed membership with a built-in CRM pipeline.',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      title: 'Class & Booking Management',
      desc: 'Live capacity, waiting lists and auto-confirmations. Spend less time on admin.',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M3 3v18h18" />
          <path d="M7 16l4-8 4 4 4-6" />
        </svg>
      ),
      title: 'Revenue & Membership Reports',
      desc: 'Daily revenue, membership health and renewal forecasts — all in one dashboard.',
    },
  ];

  return (
    <section style={{background: '#F5F5F0', padding: '64px 0'}}>
      <div
        className="mx-auto"
        style={{maxWidth: 1440, paddingLeft: 64, paddingRight: 64}}
      >
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
          <div className="flex-1">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest block mb-3"
              style={{color: '#526B00'}}
            >
              {t.studio_label}
            </span>
            <h2
              className="font-bold leading-tight"
              style={{fontSize: 36, fontWeight: 700, color: '#111310'}}
            >
              {t.studio_title}
            </h2>
          </div>
          <p
            className="flex-1 max-w-md"
            style={{fontSize: 14, color: '#5E625A', lineHeight: 1.6}}
          >
            {t.studio_subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="transition-all duration-300 hover:-translate-y-1"
              style={{background: '#fff',
                borderRadius: 16,
                border: '1px solid #DADCD3',
                padding: 24,}}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: '#ECEDE6',
                  color: '#111310',}}
              >
                {f.icon}
              </div>
              <h3 className="font-bold mb-2" style={{fontSize: 14, color: '#111310'}}>
                {f.title}
              </h3>
              <p style={{fontSize: 13, color: '#5E625A', lineHeight: 1.6}}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dashboard preview card */}
        <div
          style={{background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            padding: 24,}}
        >
          <div className="flex items-center gap-2 mb-5">
            <div
              className="flex items-center justify-center"
              style={{width: 28, height: 28, background: '#D7FF3F', borderRadius: 8}}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-sm" style={{color: '#111310'}}>FITOS Dashboard</span>
            <span
              className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{background: '#D7FF3F', color: '#526B00'}}
            >
              TODAY
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t.studio_revenue, value: 'đ18.4M', delta: '+12%' },
              { label: t.studio_members, value: '642', delta: '+24' },
              { label: t.studio_checkins, value: '86', delta: 'Today' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{background: '#F5F5F0'}}
              >
                <p className="text-xs mb-1" style={{color: '#5E625A'}}>{stat.label}</p>
                <p className="text-xl font-bold" style={{color: '#111310'}}>{stat.value}</p>
                <p className="text-xs mt-1 font-medium" style={{color: '#526B00'}}>{stat.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
