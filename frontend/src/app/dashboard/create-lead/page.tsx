import Link from 'next/link';

export default function CreateLeadPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              GROW · CRM
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Create Lead</h1>
            <Link href="/dashboard/leads" className="text-sm text-[#5E625A] mt-1 inline-flex items-center gap-1 hover:text-[#111310]">
              ← Back to Leads
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex gap-6">
          {/* Left: Form */}
          <div className="flex-1">
            <div className="bg-white border border-[#DADCD3] rounded-xl p-6">
              <h2 className="text-base font-semibold text-[#111310] mb-5">Lead information</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+44 7700 000000"
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Source
                  </label>
                  <select className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent">
                    <option value="">Select source</option>
                    <option value="walk-in">Walk-in</option>
                    <option value="referral">Referral</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Interest
                  </label>
                  <select className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent">
                    <option value="">Select plan</option>
                    <option value="move">Move</option>
                    <option value="perform">Perform</option>
                    <option value="pt-focus">PT Focus</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                  Notes
                </label>
                <textarea
                  placeholder="Any relevant notes about this lead..."
                  rows={4}
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Tips card */}
          <div className="w-80 shrink-0">
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#111310] mb-4">Lead tips</h3>
              <ul className="space-y-3">
                <li className="flex gap-2.5">
                  <span className="text-[#526B00] font-bold text-sm mt-0.5">•</span>
                  <p className="text-sm text-[#5E625A]">
                    Contact new leads within the first hour — response rates drop significantly after 24 hours.
                  </p>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[#526B00] font-bold text-sm mt-0.5">•</span>
                  <p className="text-sm text-[#5E625A]">
                    Offer a free trial session to walk-ins and referrals. Trial-to-convert rates are 3× higher.
                  </p>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[#526B00] font-bold text-sm mt-0.5">•</span>
                  <p className="text-sm text-[#5E625A]">
                    After a trial, follow up within 48 hours with a personalised plan recommendation.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-[#F5F5F0] border border-[#DADCD3] rounded-xl p-5 mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-2">Assigned to</p>
              <select className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent">
                <option>Jordan T.</option>
                <option>Sarah M.</option>
                <option>Marcus L.</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            href="/dashboard/leads"
            className="bg-white border border-[#DADCD3] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:bg-[#F5F5F0]"
          >
            Cancel
          </Link>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90">
            Save lead
          </button>
        </div>
      </div>
    </div>
  );
}
