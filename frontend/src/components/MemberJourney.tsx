"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

export default function MemberJourney() {
  const [locale, setLocale] = useState<Locale>('en');
  useEffect(() => {
    const sync = () => {
      const s = localStorage.getItem('locale') as Locale | null;
      if (s) setLocale(s);
    };
    sync();
    window.addEventListener('locale-changed', sync);
    return () => window.removeEventListener('locale-changed', sync);
  }, []);
  const t = useTranslations(locale);

  return (
    <section style={{background: '#171A16', padding: '64px 0'}}>
      <div
        className="mx-auto"
        style={{maxWidth: 1440, paddingLeft: 64, paddingRight: 64}}
      >
        {/* Label */}
        <div className="mb-4">
          <span
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{color: '#D7FF3F'}}
          >
            FROM FIRST VISIT TO RENEWAL
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-bold mb-3"
          style={{fontSize: 42, fontWeight: 700, color: '#ECEDE6', lineHeight: '1.2em', maxWidth: 640}}
        >
          One connected journey.
        </h2>

        {/* Journey steps */}
        <p
          className="mb-3 font-medium"
          style={{fontSize: 22, color: '#ECEDE6', lineHeight: 1.5}}
        >
          {t.journey_steps}
        </p>

        {/* Subtext */}
        <p style={{fontSize: 13, color: '#5E625A', maxWidth: 540}}>
          Every step tracked. Every touchpoint connected. From visitor to loyal member — in one platform.
        </p>
      </div>
    </section>
  );
}
