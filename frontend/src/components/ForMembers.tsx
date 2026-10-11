export default function ForMembers() {
  const features = [
    {
      title: 'Book classes instantly',
      desc: 'Browse the live schedule, filter by class type or trainer, and reserve your spot in seconds.',
    },
    {
      title: 'Track every workout',
      desc: 'Log sessions, monitor personal records, and visualise progress with easy-to-read charts.',
    },
    {
      title: 'AI-powered coaching',
      desc: 'Get personalised workout recommendations and form tips from your AI training assistant.',
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-3">FOR MEMBERS</p>
        <h2 className="text-[38px] font-bold text-[#111310] mb-4">Everything you need to train</h2>
        <p className="text-base text-[#5E625A] max-w-xl mb-12">One app for booking, tracking, coaching, and connecting with your gym community.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-[#DADCD3] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#D7FF3F] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#111310] font-bold text-base">✓</span>
              </div>
              <h3 className="text-base font-bold text-[#111310] mb-2">{f.title}</h3>
              <p className="text-sm text-[#5E625A]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
