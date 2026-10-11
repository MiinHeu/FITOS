"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

const journeySteps = [
  'Discovery',
  'First Visit',
  'Free Trial',
  'Membership',
  'Progress',
  'Community',
  'Renewal',
];

const featureCards = [
  {
    title: 'Smart Onboarding',
    desc: 'Automated welcome flows, waiver collection, and goal-setting surveys from day one.',
  },
  {
    title: 'Automated Follow-ups',
    desc: 'Timely messages triggered by attendance gaps, trial endings, or renewal dates.',
  },
  {
    title: 'Loyalty Rewards',
    desc: 'Milestone badges, referral credits, and streak tracking to keep members engaged.',
  },
];

export default function MemberJourney() {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _t = useTranslations(mounted ? locale : 'en');

  return (
    <section className="py-20 px-10" style={{ background: '#171A16' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section label */}
        <p
          className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3"
          style={{ color: 'rgba(215,255,63,0.7)' }}
        >
          Member Lifecycle
        </p>

        {/* Heading */}
        <h2 className="font-bold mb-4" style={{ fontSize: 36, color: '#fff' }}>
          The member journey
        </h2>

        {/* Subtitle */}
        <p className="mb-12" style={{ fontSize: 16, color: '#8A8E85', maxWidth: 520 }}>
          From first visit to loyal member — every touchpoint covered.
        </p>

        {/* Journey steps */}
        <div className="flex flex-wrap items-center gap-y-3 mb-12">
          {journeySteps.map((step, i) => (
            <span key={step} className="flex items-center">
              <span
                className="rounded-full px-4 py-2 text-sm font-medium text-white"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {step}
              </span>
              {i < journeySteps.length - 1 && (
                <span className="mx-2 text-lg" style={{ color: '#D7FF3F' }}>→</span>
              )}
            </span>
          ))}
        </div>

        {/* Feature highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-5"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: '#D7FF3F' }}
                />
                <h3 className="font-semibold text-sm" style={{ color: '#fff' }}>{card.title}</h3>
              </div>
              <p className="text-sm" style={{ color: '#8A8E85', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
