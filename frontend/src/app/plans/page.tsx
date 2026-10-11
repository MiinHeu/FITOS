"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={dark ? '#D7FF3F' : '#526B00'} opacity={dark ? 1 : 0.12} />
      <path
        d="M4.5 8.5l2.5 2.5 4.5-5"
        stroke={dark ? '#111310' : '#526B00'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const memberPlans = [
  {
    name: 'Move',
    price: '$29',
    period: '/mo',
    desc: '8 classes per month',
    features: [
      'All group classes',
      'App booking',
      'Workout tracking',
      'Progress dashboard',
      'Cancel anytime',
    ],
    highlight: false,
    badge: null,
    cta: 'Get started',
  },
  {
    name: 'Perform',
    price: '$59',
    period: '/mo',
    desc: 'Unlimited classes',
    features: [
      'Unlimited class booking',
      '2 PT sessions included',
      'AI Coach insights',
      'Priority booking',
      'Nutrition brief',
      'All Move features',
      'Dedicated support',
    ],
    highlight: true,
    badge: 'MOST POPULAR',
    cta: 'Get started',
  },
  {
    name: 'PT Focus',
    price: '$99',
    period: '/mo',
    desc: '8 PT sessions / month',
    features: [
      'Dedicated trainer',
      'Custom workout plan',
      'Monthly body metrics',
      'Nutrition coaching',
      'Unlimited classes',
      'Progress reports',
      'VIP booking priority',
      'All Perform features',
    ],
    highlight: false,
    badge: null,
    cta: 'Get started',
  },
];

const ptPackages = [
  {
    sessions: '5 sessions',
    name: 'Starter Pack',
    price: '$149',
    features: ['Program assessment', 'Technique coaching', 'Session summary'],
  },
  {
    sessions: '10 sessions',
    name: 'Focus Pack',
    price: '$249',
    features: ['All Starter features', 'Weekly check-in', 'Nutrition brief'],
  },
  {
    sessions: '20 sessions',
    name: 'Transform Pack',
    price: '$449',
    features: ['All Focus features', 'Body composition tracking', 'Monthly progress report'],
  },
];

const faqs = [
  { q: 'Can I pause my membership?', a: 'Yes, you can pause for up to 2 months per year. Request via the app or at the front desk.' },
  { q: 'Is there a joining fee?', a: 'No joining fee, ever. You pay only for the plan you choose.' },
  { q: 'How do I book PT sessions?', a: 'Book through the FITOS app or ask at reception. PT sessions are pre-loaded after purchase.' },
  { q: 'Can I switch plans?', a: 'Yes. Upgrade or downgrade at the start of each billing cycle. Your history and bookings stay intact.' },
  { q: 'What happens after my free trial?', a: 'After 14 days, choose a plan or your account pauses. No automatic charges without your confirmation.' },
  { q: 'Do PT packages expire?', a: 'PT packages are valid for 3 months from purchase. Extensions can be arranged with your coach.' },
];

export default function PlansPage() {
  return (
    <>
      <Header />
      <main>

        {/* 1. Hero */}
        <section className="pt-24 pb-16 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-4" style={{ color: '#526B00' }}>
              MEMBERSHIPS &amp; PT · NO JOINING FEE
            </p>
            <h1 className="font-bold mb-4" style={{ fontSize: 40, color: '#111310' }}>
              Flexible plans for every fitness goal
            </h1>
            <p className="mx-auto mb-8" style={{ fontSize: 17, color: '#5E625A', maxWidth: 560 }}>
              Transparent pricing, no contracts, no joining fees. Pause or cancel anytime.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full"
                style={{ background: '#fff', border: '1px solid #DADCD3', color: '#111310' }}
              >
                <span style={{ color: '#526B00' }}>✓</span> Cancel anytime
              </span>
              <span
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full"
                style={{ background: '#fff', border: '1px solid #DADCD3', color: '#111310' }}
              >
                <span style={{ color: '#526B00' }}>✓</span> 14-day free trial
              </span>
            </div>
          </div>
        </section>

        {/* 2. Pricing cards */}
        <section className="py-16 px-10 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memberPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="relative flex flex-col"
                  style={{
                    background: plan.highlight ? '#171A16' : '#fff',
                    border: plan.highlight ? 'none' : '1px solid #DADCD3',
                    borderRadius: 12,
                    padding: 28,
                  }}
                >
                  {plan.badge && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: '#D7FF3F', color: '#111310' }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <h3
                    className="font-bold mb-3"
                    style={{ fontSize: 18, color: plan.highlight ? '#ECEDE6' : '#111310', marginRight: plan.badge ? 90 : 0 }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="font-bold"
                      style={{ fontSize: 40, color: plan.highlight ? '#D7FF3F' : '#111310' }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: plan.highlight ? '#5E625A' : '#8A8E85' }}>
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs mb-6" style={{ color: plan.highlight ? '#5E625A' : '#8A8E85' }}>
                    {plan.desc}
                  </p>
                  <ul className="flex-1 flex flex-col gap-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm" style={{ color: plan.highlight ? '#ECEDE6' : '#111310' }}>
                        <CheckIcon dark={plan.highlight} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className="block text-center font-semibold text-sm w-full py-2.5 rounded-lg"
                    style={{
                      background: plan.highlight ? '#D7FF3F' : 'transparent',
                      color: '#111310',
                      border: plan.highlight ? 'none' : '1px solid #171A16',
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PT Packages */}
        <section className="py-16 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#526B00' }}>
              PERSONAL TRAINING
            </p>
            <h2 className="font-bold mb-3" style={{ fontSize: 36, color: '#111310' }}>
              Personal Training Packages
            </h2>
            <p className="mb-10" style={{ fontSize: 16, color: '#5E625A', maxWidth: 520 }}>
              Results-focused PT packages with your dedicated coach. Choose the commitment that suits your goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ptPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex flex-col"
                  style={{ background: '#fff', border: '1px solid #DADCD3', borderRadius: 12, padding: 24 }}
                >
                  <span
                    className="uppercase text-[11px] font-semibold tracking-[0.08em] mb-3 block"
                    style={{ color: '#526B00' }}
                  >
                    {pkg.sessions}
                  </span>
                  <h3 className="font-bold mb-2" style={{ fontSize: 18, color: '#111310' }}>{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-bold" style={{ fontSize: 32, color: '#111310' }}>{pkg.price}</span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: '#8A8E85' }}>one-time package</p>
                  <ul className="flex-1 flex flex-col gap-2.5 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#111310' }}>
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="w-full font-semibold text-sm py-2.5 rounded-lg"
                    style={{ background: '#D7FF3F', color: '#111310' }}
                  >
                    Get started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="py-16 px-10 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-bold mb-10 text-center" style={{ fontSize: 36, color: '#111310' }}>Plans FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {faqs.map((item, i) => (
                <div key={i}>
                  <p className="font-bold mb-2" style={{ fontSize: 15, color: '#111310' }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5E625A' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Dark CTA */}
        <section className="py-20 px-10" style={{ background: '#171A16' }}>
          <div className="max-w-[1280px] mx-auto text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: 42, color: '#ECEDE6' }}>
              Ready to transform your studio?
            </h2>
            <p className="mx-auto mb-10" style={{ fontSize: 18, color: '#8A8E85', maxWidth: 560 }}>
              Start a free 14-day trial. No credit card required, no joining fee, no commitment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="font-semibold rounded-lg px-5 py-2.5 text-sm"
                style={{ background: '#D7FF3F', color: '#111310' }}
              >
                Start free trial
              </Link>
              <button
                type="button"
                className="font-semibold rounded-lg px-5 py-2.5 text-sm"
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#ECEDE6' }}
              >
                Talk to sales
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
