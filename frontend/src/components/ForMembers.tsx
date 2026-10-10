"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

export default function ForMembers() {
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
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
      title: t.member_f1_title,
      desc: t.member_f1_desc,
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
          <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: t.member_f2_title,
      desc: t.member_f2_desc,
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t.member_f3_title,
      desc: t.member_f3_desc,
    },
  ];

  return (
    <section id="members" style={{background: '#F5F5F0', padding: '64px 0'}}>
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
              {t.members_label}
            </span>
            <h2
              className="font-bold leading-tight"
              style={{fontSize: 36, fontWeight: 700, color: '#111310'}}
            >
              {t.members_title}
            </h2>
          </div>
          <p
            className="flex-1 max-w-md"
            style={{fontSize: 14, color: '#5E625A', lineHeight: 1.6}}
          >
            {t.members_subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <h3
                className="font-bold mb-2"
                style={{fontSize: 14, color: '#111310'}}
              >
                {f.title}
              </h3>
              <p style={{fontSize: 13, color: '#5E625A', lineHeight: 1.6}}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
