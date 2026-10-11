"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: 'Book Classes',
    desc: 'Browse live class capacity, PT availability, and get instant confirmation — all from your phone or desktop.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    title: 'Track Progress',
    desc: 'Visualise your improvements over time. Logged sets, personal bests, and body metrics in one clear dashboard.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
      </svg>
    ),
    title: 'AI Coach',
    desc: 'Get smart training recommendations based on your goals, attendance history, and recent performance.',
  },
];

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

  return (
    <section id="members" className="bg-white py-20 px-10">
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <p
          className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3"
          style={{ color: '#526B00' }}
        >
          {t.members_label}
        </p>
        <h2
          className="font-bold mb-4"
          style={{ fontSize: 36, color: '#111310' }}
        >
          For Members
        </h2>
        <p
          className="mb-12"
          style={{ fontSize: 16, color: '#5E625A', maxWidth: 560 }}
        >
          Everything a member needs, in one place.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white shadow-sm rounded-xl p-6"
            >
              {/* Icon */}
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

      </div>
    </section>
  );
}
