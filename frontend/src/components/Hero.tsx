"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
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

  if (!mounted) return null;

  return (
    <section className="bg-[#F5F5F0] pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT: Text content */}
          <div className="flex-1 lg:text-left text-center">
            {/* Badge */}
            <div className="mb-6 lg:flex lg:justify-start flex justify-center">
              <span
                className="inline-flex items-center gap-2 bg-white border border-[#DADCD3] rounded-full px-4 py-1.5 text-sm font-medium"
                style={{ color: '#526B00' }}
              >
                ✦ All-in-one gym platform
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-bold mb-6"
              style={{ fontSize: 52, lineHeight: 1.1, color: '#111310' }}
            >
              Your gym,<br />fully managed.
            </h1>

            {/* Subtitle */}
            <p
              className="mb-8 lg:mx-0 mx-auto"
              style={{ fontSize: 18, color: '#5E625A', lineHeight: 1.6, maxWidth: 480 }}
            >
              FITOS gives studios and athletes everything they need — bookings, training, progress, and community in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10 lg:justify-start justify-center">
              <Link
                href="/register"
                className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-[#C4E82E] transition-colors"
              >
                Start free trial
              </Link>
              <Link
                href="#members"
                className="border border-[#171A16] text-[#111310] rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-[#171A16] hover:text-white transition-colors"
              >
                See how it works →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 lg:justify-start justify-center">
              {[
                { value: '2,400+', label: 'Members' },
                { value: '98%', label: 'Retention' },
                { value: '150+', label: 'Studios' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-bold text-2xl" style={{ color: '#111310' }}>{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#5E625A' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Hero image — hidden on mobile */}
          <div className="hidden lg:block w-[520px] shrink-0">
            <div className="relative w-full h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/hero_athlete.jpg"
                alt="Athlete training"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay card */}
              <div
                className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg"
                style={{ minWidth: 200 }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: '#526B00' }}>TODAY&apos;S CLASSES</p>
                <p className="font-bold text-sm" style={{ color: '#111310' }}>12 booked</p>
                <div className="mt-2 w-full rounded-full h-1.5" style={{ background: '#F5F5F0' }}>
                  <div className="rounded-full h-1.5" style={{ width: '75%', background: '#D7FF3F' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
