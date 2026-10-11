import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MemberJourney from '@/components/MemberJourney';
import ForMembers from '@/components/ForMembers';
import ForStudioTeams from '@/components/ForStudioTeams';
import Footer from '@/components/Footer';
import Link from 'next/link';

const classes = [
  { time: '07:00', name: 'Engine Room', instructor: 'Coach Minh', spots: 5, max: 18, type: 'Strength' },
  { time: '09:30', name: 'Mobility Reset', instructor: 'Coach An', spots: 10, max: 18, type: 'Mobility' },
  { time: '12:15', name: 'HIIT Conditioning', instructor: 'Coach Bảo', spots: 0, max: 16, type: 'HIIT' },
  { time: '18:30', name: 'Strength Lab', instructor: 'Coach Quân', spots: 2, max: 16, type: 'Strength' },
];

const coaches = [
  {
    initials: 'MT',
    name: 'Minh Trần',
    specialty: 'Strength & Conditioning',
    bio: 'Head Coach with 8 years of experience building progressive programs for all fitness levels.',
  },
  {
    initials: 'AL',
    name: 'An Lê',
    specialty: 'Mobility & Recovery',
    bio: 'Certified movement specialist focused on injury prevention and long-term athletic development.',
  },
  {
    initials: 'QP',
    name: 'Quân Phạm',
    specialty: 'Powerlifting & Strength',
    bio: 'Competitive powerlifter and coach helping members hit personal bests through structured periodization.',
  },
];

const plans = [
  {
    name: 'Move',
    price: '$29',
    period: '/mo',
    desc: '8 classes per month',
    features: ['All group classes', 'App booking', 'Workout tracking', 'Progress dashboard', 'Cancel anytime'],
    highlight: false,
    badge: null,
  },
  {
    name: 'Perform',
    price: '$59',
    period: '/mo',
    desc: 'Unlimited classes',
    features: ['Unlimited class booking', '2 PT sessions included', 'AI Coach insights', 'Priority booking', 'Nutrition brief', 'All Move features', 'Dedicated support'],
    highlight: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'PT Focus',
    price: '$99',
    period: '/mo',
    desc: '8 PT sessions / month',
    features: ['Dedicated trainer', 'Custom workout plan', 'Monthly body metrics', 'Nutrition coaching', 'Unlimited classes', 'Progress reports', 'VIP booking priority', 'All Perform features'],
    highlight: false,
    badge: null,
  },
];

const faqs = [
  { q: 'Can I pause my membership?', a: 'Yes — you can pause for up to 60 days per year, anytime through the app. No fees or penalties.' },
  { q: 'Is there a joining fee?', a: 'No joining fee on any plan. Your first payment starts your membership immediately.' },
  { q: 'Can I switch plans?', a: 'Switch at any time. The difference is prorated to your next billing date.' },
  { q: 'How does the AI coach work?', a: 'The AI reads your logged workouts and goals, then suggests session types, rest timing and progression cues.' },
  { q: 'What happens after my free trial?', a: 'After 14 days, you choose a plan or your account pauses. No automatic charges without your confirmation.' },
  { q: 'Can I book PT sessions separately?', a: 'Yes, PT packages are available without a membership. Book a consultation to get started.' },
];

export default function LandingPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <Hero />

        {/* Trust Strip */}
        <section className="py-5 px-10" style={{ background: '#ECEDE6' }}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-16 flex-wrap">
            {[
              { value: '2,400+', label: 'Active Members' },
              { value: '150+', label: 'Partner Studios' },
              { value: '98%', label: 'Retention Rate' },
              { value: '50K+', label: 'Classes Booked' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="font-bold text-2xl" style={{ color: '#111310' }}>{s.value}</span>
                <span className="text-xs" style={{ color: '#5E625A' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Member Journey */}
        <MemberJourney />

        {/* For Members */}
        <ForMembers />

        {/* For Studio Teams */}
        <ForStudioTeams />

        {/* Classes Today */}
        <section className="py-20 px-10 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#526B00' }}>
              SCHEDULE
            </p>
            <h2 className="font-bold mb-3" style={{ fontSize: 38, color: '#111310' }}>Classes Today</h2>
            <p className="mb-10" style={{ fontSize: 16, color: '#5E625A', maxWidth: 560 }}>
              Drop in for a session or book ahead to secure your spot. Every class is designed to push you further.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {classes.map((c, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ background: '#fff', border: '1px solid #DADCD3', borderRadius: 12, padding: 20 }}
                >
                  {/* Time badge top-right */}
                  <span
                    className="absolute top-4 right-4 text-xs font-semibold rounded-full px-2 py-0.5"
                    style={{ background: '#D7FF3F', color: '#111310' }}
                  >
                    {c.time}
                  </span>
                  {/* Type chip */}
                  <span
                    className="inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-3"
                    style={{ background: '#ECEDE6', color: '#5E625A' }}
                  >
                    {c.type}
                  </span>
                  <h4 className="font-bold mb-1" style={{ fontSize: 15, color: '#111310' }}>{c.name}</h4>
                  <p className="text-sm mb-4" style={{ color: '#5E625A' }}>{c.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: c.spots === 0 ? '#FFE4E1' : '#E8FFAA',
                        color: c.spots === 0 ? '#B91C1C' : '#526B00',
                      }}
                    >
                      {c.spots === 0 ? 'Full' : `${c.spots} spots left`}
                    </span>
                    <button
                      className="text-xs font-semibold rounded-lg px-3 py-1.5"
                      style={{
                        background: c.spots === 0 ? 'transparent' : '#D7FF3F',
                        color: '#111310',
                        border: c.spots === 0 ? '1px solid #DADCD3' : 'none',
                      }}
                    >
                      {c.spots === 0 ? 'Waitlist' : 'Book'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Link href="/classes" className="text-sm font-semibold" style={{ color: '#526B00' }}>
                View all classes →
              </Link>
            </div>
          </div>
        </section>

        {/* Coaches */}
        <section className="py-20 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#526B00' }}>
              TEAM
            </p>
            <h2 className="font-bold mb-12" style={{ fontSize: 38, color: '#111310' }}>Our Coaches</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coaches.map((c, i) => (
                <div
                  key={i}
                  style={{ background: '#fff', border: '1px solid #DADCD3', borderRadius: 12, padding: 24 }}
                >
                  {/* Avatar circle */}
                  <div
                    className="flex items-center justify-center font-bold text-xl rounded-full mb-4"
                    style={{ width: 64, height: 64, background: '#D7FF3F', color: '#111310' }}
                  >
                    {c.initials}
                  </div>
                  <h4 className="font-bold mb-0.5" style={{ fontSize: 16, color: '#111310' }}>{c.name}</h4>
                  <p className="text-xs font-semibold mb-3" style={{ color: '#526B00' }}>{c.specialty}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5E625A' }}>{c.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-10 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <p className="uppercase text-[11px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#526B00' }}>
              MEMBERSHIPS
            </p>
            <h2 className="font-bold mb-3" style={{ fontSize: 38, color: '#111310' }}>Simple pricing</h2>
            <p className="mb-12" style={{ fontSize: 16, color: '#5E625A', maxWidth: 560 }}>
              Transparent monthly plans. No joining fee. Pause or cancel anytime without penalties.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((p, i) => (
                <div
                  key={i}
                  className="relative flex flex-col"
                  style={{
                    background: p.highlight ? '#171A16' : '#fff',
                    border: p.highlight ? 'none' : '1px solid #DADCD3',
                    borderRadius: 12,
                    padding: 24,
                  }}
                >
                  {p.badge && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: '#D7FF3F', color: '#111310' }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 18, color: p.highlight ? '#ECEDE6' : '#111310' }}
                  >
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="font-bold"
                      style={{ fontSize: 40, color: p.highlight ? '#D7FF3F' : '#111310' }}
                    >
                      {p.price}
                    </span>
                    <span className="text-sm" style={{ color: p.highlight ? '#5E625A' : '#8A8E85' }}>
                      {p.period}
                    </span>
                  </div>
                  <p className="text-xs mb-5" style={{ color: p.highlight ? '#5E625A' : '#8A8E85' }}>
                    {p.desc}
                  </p>
                  <ul className="flex-1 space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: p.highlight ? '#ECEDE6' : '#5E625A' }}
                      >
                        <span style={{ color: p.highlight ? '#D7FF3F' : '#526B00', fontWeight: 700 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/plans"
                    className="block text-center font-semibold text-sm w-full py-2.5 rounded-lg"
                    style={{
                      background: p.highlight ? '#D7FF3F' : 'transparent',
                      color: p.highlight ? '#111310' : '#111310',
                      border: p.highlight ? 'none' : '1px solid #171A16',
                    }}
                  >
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-10" style={{ background: '#F5F5F0' }}>
          <div className="max-w-[1280px] mx-auto flex justify-center">
            <div
              className="w-full max-w-2xl rounded-2xl p-10"
              style={{ background: '#fff', border: '1px solid #DADCD3' }}
            >
              {/* Quote mark */}
              <span className="block font-bold mb-4" style={{ fontSize: 48, color: '#D7FF3F', lineHeight: 1 }}>&ldquo;</span>
              <p className="font-medium mb-6" style={{ fontSize: 20, color: '#111310', lineHeight: 1.6 }}>
                Consistency becomes easier when you can see yourself improving week by week. FITOS made that visible for every single member at our studio.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center font-bold text-sm rounded-full shrink-0"
                  style={{ width: 44, height: 44, background: '#D7FF3F', color: '#111310' }}
                >
                  MT
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#111310' }}>Minh Trần</p>
                  <p className="text-xs" style={{ color: '#5E625A' }}>Head Coach · Pulse District 2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-10 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-bold text-center mb-12" style={{ fontSize: 38, color: '#111310' }}>
              Frequently asked
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="font-bold mb-2" style={{ fontSize: 15, color: '#111310' }}>{faq.q}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#5E625A' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="py-20 px-10" style={{ background: '#171A16' }}>
          <div className="max-w-[1280px] mx-auto text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: 42, color: '#ECEDE6' }}>
              Ready to transform your studio?
            </h2>
            <p className="mx-auto mb-10" style={{ fontSize: 18, color: '#8A8E85', maxWidth: 560 }}>
              Join hundreds of fitness studios already using FITOS to grow memberships, fill classes and coach with more impact.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="font-semibold rounded-lg px-5 py-2.5 text-sm"
                style={{ background: '#D7FF3F', color: '#111310' }}
              >
                Start free trial
              </Link>
              <Link
                href="/login"
                className="font-semibold rounded-lg px-5 py-2.5 text-sm"
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#ECEDE6' }}
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
