import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plans = [
  {
    name: 'Move',
    price: '£29',
    period: '/month',
    desc: 'Perfect for getting started',
    features: ['Up to 8 classes/month', 'App access', 'Progress tracking', 'Community access'],
    highlight: false,
  },
  {
    name: 'Perform',
    price: '£49',
    period: '/month',
    desc: 'Our most popular plan',
    features: ['Unlimited classes', 'AI coaching', 'Priority booking', 'Nutrition guidance', 'Monthly check-in'],
    highlight: true,
  },
  {
    name: 'PT Focus',
    price: '£89',
    period: '/month',
    desc: 'Maximum results with personal training',
    features: ['Unlimited classes', '4 PT sessions/month', 'Custom programme', 'Body composition tracking', 'Direct trainer access'],
    highlight: false,
  },
];

const ptPackages = [
  { sessions: '4 sessions', price: '£120', per: 'per month', note: '£30/session' },
  { sessions: '8 sessions', price: '£200', per: 'per month', note: '£25/session — best value' },
  { sessions: '12 sessions', price: '£270', per: 'per month', note: '£22.50/session' },
];

const faqs = [
  { q: 'Is there a joining fee?', a: 'No — never. Just your chosen monthly plan.' },
  { q: 'Can I switch plans?', a: 'Yes, upgrade or downgrade at any time. Changes take effect from the next billing cycle.' },
  { q: 'Can I cancel?', a: 'Yes — 30 days notice, no phone calls, directly in the app.' },
  { q: 'Do PT sessions roll over?', a: 'Unused sessions roll over for up to one month.' },
  { q: 'Are there student / corporate rates?', a: 'Yes — contact us for group and corporate pricing.' },
  { q: 'What payment methods do you accept?', a: 'Credit/debit card and bank transfer. No cash or cheques.' },
];

export default function PlansPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#F5F5F0] py-20">
          <div className="max-w-[1280px] mx-auto px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-3">MEMBERSHIP PLANS</p>
            <h1 className="text-[52px] font-bold text-[#111310] mb-4">Choose your plan</h1>
            <p className="text-lg text-[#5E625A] max-w-md mb-8">Flexible memberships for every goal. No joining fee, no contracts — just great training.</p>
            <div className="inline-flex items-center gap-2 bg-[#D7FF3F] rounded-full px-4 py-1.5">
              <span className="text-xs font-bold text-[#111310]">🎉 NO JOINING FEE — LIMITED TIME</span>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {plans.map((p) => (
                <div key={p.name} className={`rounded-2xl p-7 border ${
                  p.highlight ? 'bg-[#171A16] border-[#D7FF3F]' : 'bg-white border-[#DADCD3]'
                }`}>
                  {p.highlight && (
                    <div className="inline-block bg-[#D7FF3F] text-[#111310] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4">Most popular</div>
                  )}
                  <h2 className={`text-lg font-bold mb-1 ${ p.highlight ? 'text-white' : 'text-[#111310]' }`}>{p.name}</h2>
                  <p className={`text-xs mb-4 ${ p.highlight ? 'text-[#8A8E85]' : 'text-[#5E625A]' }`}>{p.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-bold ${ p.highlight ? 'text-[#D7FF3F]' : 'text-[#111310]' }`}>{p.price}</span>
                    <span className={`text-sm ${ p.highlight ? 'text-[#8A8E85]' : 'text-[#5E625A]' }`}>{p.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${ p.highlight ? 'text-[#ECEDE6]' : 'text-[#5E625A]' }`}>
                        <span className={`mt-0.5 ${ p.highlight ? 'text-[#D7FF3F]' : 'text-[#526B00]' }`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/register" className={`block text-center font-semibold rounded-lg px-5 py-2.5 text-sm ${
                    p.highlight
                      ? 'bg-[#D7FF3F] text-[#111310] hover:bg-[#C4E82E]'
                      : 'bg-[#171A16] text-[#ECEDE6] hover:bg-black/80'
                  } transition-colors`}>
                    Get started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PT Packages */}
        <section className="bg-[#F5F5F0] py-16">
          <div className="max-w-[1280px] mx-auto px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-3">PERSONAL TRAINING</p>
            <h2 className="text-[38px] font-bold text-[#111310] mb-10">PT packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ptPackages.map((pt) => (
                <div key={pt.sessions} className="bg-white border border-[#DADCD3] rounded-xl p-6">
                  <h3 className="text-base font-bold text-[#111310] mb-1">{pt.sessions}</h3>
                  <p className="text-xs text-[#8A8E85] mb-4">{pt.note}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#111310]">{pt.price}</span>
                    <span className="text-sm text-[#5E625A]">{pt.per}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-3">FAQ</p>
            <h2 className="text-[38px] font-bold text-[#111310] mb-10">Questions about plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {faqs.map((f) => (
                <div key={f.q} className="bg-[#F5F5F0] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#111310] mb-2">{f.q}</h3>
                  <p className="text-sm text-[#5E625A]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="bg-[#171A16] py-16">
          <div className="max-w-[1280px] mx-auto px-10 text-center">
            <h2 className="text-[38px] font-bold text-white mb-4">Ready to join FITOS?</h2>
            <p className="text-base text-[#8A8E85] max-w-sm mx-auto mb-8">Sign up in 2 minutes. First class is on us.</p>
            <a href="/register" className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-6 py-3 text-sm hover:bg-[#C4E82E] transition-colors inline-block">Start free trial</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
