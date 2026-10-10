"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// ─── Checkmark SVG helpers ────────────────────────────────────────────────────

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
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

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#526B00',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const cardLight: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  border: '1px solid #DADCD3',
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
};

const cardDark: React.CSSProperties = {
  background: '#171A16',
  borderRadius: 16,
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const btnLime: React.CSSProperties = {
  background: '#D7FF3F',
  color: '#111310',
  borderRadius: 10,
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  width: '100%',
};

const btnOutline: React.CSSProperties = {
  background: 'transparent',
  color: '#111310',
  borderRadius: 10,
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: 14,
  border: '1px solid #DADCD3',
  cursor: 'pointer',
  width: '100%',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlansPage() {
  return (
    <>
      <Header />
      <main style={{ background: '#F5F5F0', minHeight: '100vh', paddingTop: 80 }}>

        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section style={{ background: '#F5F5F0', padding: '80px 24px 60px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <span style={labelStyle}>MEMBERSHIPS &amp; PT · NO JOINING FEE</span>
            <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111310', margin: '12px 0 0' }}>
              Choose your way to move.
            </h1>
            <p style={{ fontSize: 16, color: '#5E625A', marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
              Transparent monthly plans. Pause anytime. Your coach, bookings and progress stay together.
            </p>
          </div>
        </section>

        {/* ── Section 2: Pricing cards ─────────────────────────────────────── */}
        <section style={{ padding: '60px 24px' }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {/* Card 1 — Move */}
            <div style={cardLight}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111310', marginBottom: 16 }}>Move</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#111310' }}>đ890K</span>
                <span style={{ fontSize: 14, color: '#8A8E85' }}>/month</span>
              </div>
              <p style={{ fontSize: 12, color: '#8A8E85', marginBottom: 24 }}>8 classes / month</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['All group classes', 'App booking', 'Workout tracking', 'Progress dashboard'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#111310' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <button style={btnOutline}>Get started</button>
            </div>

            {/* Card 2 — Perform (highlighted) */}
            <div style={cardDark}>
              {/* Most popular badge */}
              <span
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: '#D7FF3F',
                  color: '#111310',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  letterSpacing: '0.05em',
                }}
              >
                MOST POPULAR
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ECEDE6', marginBottom: 16, marginRight: 90 }}>
                Perform
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#D7FF3F' }}>đ1.49M</span>
                <span style={{ fontSize: 14, color: '#5E625A' }}>/month</span>
              </div>
              <p style={{ fontSize: 12, color: '#5E625A', marginBottom: 24 }}>Unlimited classes</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited booking', '2 PT sessions included', 'AI Coach insights', 'Priority class booking'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#ECEDE6' }}>
                    <CheckIcon dark />
                    {f}
                  </li>
                ))}
              </ul>
              <button style={btnLime}>Get started</button>
            </div>

            {/* Card 3 — PT Focus */}
            <div style={cardLight}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111310', marginBottom: 16 }}>PT Focus</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#111310' }}>đ3.2M</span>
                <span style={{ fontSize: 14, color: '#8A8E85' }}>/month</span>
              </div>
              <p style={{ fontSize: 12, color: '#8A8E85', marginBottom: 24 }}>8 PT sessions / month</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Dedicated trainer', 'Custom workout plan', 'Monthly body metrics', 'All Perform benefits'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#111310' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <button style={btnOutline}>Get started</button>
            </div>
          </div>
        </section>

        {/* ── Section 3: PT Packages ───────────────────────────────────────── */}
        <section style={{ background: '#F5F5F0', padding: '60px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111310', marginBottom: 8 }}>
                Personal Training
              </h2>
              <p style={{ fontSize: 14, color: '#5E625A' }}>
                Results-focused PT packages with your dedicated coach.
              </p>
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
              className="grid grid-cols-1 md:grid-cols-3"
            >
              {[
                {
                  sessions: '5 sessions',
                  name: 'Starter Pack',
                  price: 'đ3.5M',
                  desc: '5 × 55-min PT sessions',
                  features: ['Program assessment', 'Technique coaching', 'Session summary'],
                },
                {
                  sessions: '10 sessions',
                  name: 'Focus Pack',
                  price: 'đ6.5M',
                  desc: '10 × 55-min PT sessions',
                  features: ['All Starter features', 'Weekly check-in', 'Nutrition brief'],
                },
                {
                  sessions: '20 sessions',
                  name: 'Transform Pack',
                  price: 'đ11.5M',
                  desc: '20 × 55-min PT sessions',
                  features: ['All Focus features', 'Body composition tracking', 'Monthly progress report'],
                },
              ].map(pkg => (
                <div
                  key={pkg.name}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    border: '1px solid #DADCD3',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span style={{ ...labelStyle, marginBottom: 12, display: 'block' }}>{pkg.sessions}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111310', marginBottom: 8 }}>
                    {pkg.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: '#111310' }}>{pkg.price}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#8A8E85', marginBottom: 20 }}>{pkg.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pkg.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#111310' }}>
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button style={btnLime}>Book a consultation</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: FAQ ───────────────────────────────────────────────── */}
        <section style={{ background: '#FFFFFF', padding: '60px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#111310',
                textAlign: 'center',
                marginBottom: 40,
              }}
            >
              Common questions
            </h2>
            {[
              {
                q: 'Can I pause my membership?',
                a: 'Yes, you can pause for up to 2 months per year. Request via the app or at the front desk.',
              },
              {
                q: 'Is there a joining fee?',
                a: 'No joining fee, ever. You pay only for the plan you choose.',
              },
              {
                q: 'How do I book PT sessions?',
                a: 'Book directly through the FITOS app or ask at reception. Your PT sessions are pre-loaded after purchase.',
              },
              {
                q: 'Can I switch plans?',
                a: 'Yes. Upgrade or downgrade at the start of each billing cycle. Your history and bookings stay intact.',
              },
            ].map((item, i, arr) => (
              <div
                key={item.q}
                style={{
                  background: '#FFFFFF',
                  borderBottom: i < arr.length - 1 ? '1px solid #DADCD3' : 'none',
                  padding: '20px 0',
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: '#111310' }}>{item.q}</p>
                <p style={{ fontSize: 14, color: '#5E625A', marginTop: 8 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: Dark CTA ──────────────────────────────────────────── */}
        <section
          style={{
            background: '#171A16',
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#ECEDE6' }}>Ready to start?</h2>
          <p style={{ fontSize: 16, color: '#5E625A', marginTop: 12 }}>
            Join Pulse District 2 today. No contracts. No joining fee.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginTop: 32,
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                background: '#D7FF3F',
                color: '#111310',
                borderRadius: 10,
                padding: '12px 28px',
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Start free trial
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#ECEDE6',
                borderRadius: 10,
                padding: '12px 28px',
                fontWeight: 600,
                fontSize: 15,
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
              }}
            >
              Talk to us
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
