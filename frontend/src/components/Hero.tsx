"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
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
    <section style={{background: '#F5F5F0', paddingTop: 80, paddingBottom: 64}}>
      <div
        className="mx-auto flex flex-col lg:flex-row items-center gap-[52px]"
        style={{maxWidth: 1440, paddingLeft: 64, paddingRight: 64}}
      >
        {/* Left content */}
        <div className="flex-1">
          {/* Label */}
          <div className="mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest"
              style={{background: '#D7FF3F', color: '#526B00'}}
            >
              {t.hero_badge}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-bold leading-tight mb-5"
            style={{fontSize: 42, fontWeight: 700, color: '#111310', lineHeight: '1.2em'}}
          >
            {t.hero_title_1}<br />{t.hero_title_2}<br />{t.hero_title_3}
          </h1>

          {/* Subtitle */}
          <p
            className="mb-8 max-w-md"
            style={{fontSize: 14, color: '#5E625A', lineHeight: 1.6}}
          >
            {t.hero_subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link href="/plans" className="btn-lime">
              {t.hero_cta}
            </Link>
            <Link href="#members" className="btn-outline">
              ↗ {t.hero_cta2}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              { value: t.stat1_value, label: t.stat1_label },
              { value: t.stat2_value, label: t.stat2_label },
              { value: t.stat3_value, label: t.stat3_label },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-bold text-3xl" style={{color: '#111310'}}>{s.value}</p>
                <p className="text-xs mt-1" style={{color: '#5E625A'}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex-shrink-0" style={{width: 580}}>
          <div
            className="relative overflow-hidden"
            style={{borderRadius: 24, height: 530}}
          >
            <Image
              src="/assets/hero_athlete.jpg"
              alt="Athlete training"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Live capacity overlay */}
          <div
            className="absolute bottom-5 right-5 shadow-xl"
            style={{background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 16,
              width: 220,}}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{background: '#D7FF3F', color: '#526B00'}}
              >
                LIVE CAPACITY
              </span>
              <span style={{fontSize: 11, color: '#8A8E85'}}>18:30</span>
            </div>
            <p className="font-bold text-sm mb-2" style={{color: '#111310'}}>Strength Fundamentals</p>
            <div className="w-full rounded-full h-2 mb-1" style={{background: '#ECEDE6'}}>
              <div className="rounded-full h-2" style={{width: '78%', background: '#D7FF3F'}} />
            </div>
            <p className="text-right text-xs" style={{color: '#8A8E85'}}>14/18</p>
          </div>
        </div>
      </div>
    </section>
  );
}
