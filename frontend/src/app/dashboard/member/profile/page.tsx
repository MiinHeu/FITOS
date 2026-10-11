export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              MEMBER · PROFILE
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">My Profile</h1>
            <p className="text-sm text-[#5E625A] mt-1">Manage your personal information</p>
          </div>
          <button className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:opacity-90">
            Save changes
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex gap-6">
          {/* Left: personal info */}
          <div className="flex-1 space-y-5">
            {/* Avatar + name */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5 flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#D7FF3F] flex items-center justify-center text-2xl font-bold text-[#111310] shrink-0">
                JD
              </div>
              <div>
                <p className="text-lg font-bold text-[#111310]">Jane Doe</p>
                <p className="text-sm text-[#5E625A]">jane.doe@email.com</p>
                <button className="text-xs text-[#526B00] font-semibold mt-1 hover:underline">
                  Change photo
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#111310] mb-5">Personal details</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    defaultValue="Jane"
                    className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
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
                  defaultValue="jane.doe@email.com"
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+44 7700 123456"
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1994-03-22"
                    className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                    Emergency contact
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe — +44 7700 654321"
                    className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Goals, membership, notifications */}
          <div className="w-80 shrink-0 space-y-4">
            {/* Goals */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#111310] mb-4">My goals</h3>
              <div className="space-y-3">
                {[
                  { label: 'Lose weight', checked: false },
                  { label: 'Build strength', checked: true },
                  { label: 'Improve fitness', checked: true },
                ].map((goal) => (
                  <label key={goal.label} className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${goal.checked ? 'border-[#526B00] bg-[#D7FF3F]' : 'border-[#DADCD3]'}`}>
                      {goal.checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#111310" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-[#111310]">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Membership status */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#111310] mb-3">Membership</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#5E625A]">Plan</span>
                <span className="text-sm font-semibold text-[#111310]">Perform</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#5E625A]">Status</span>
                <span className="text-xs font-semibold bg-[#D7FF3F] text-[#526B00] px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5E625A]">Renews</span>
                <span className="text-sm font-semibold text-[#111310]">14 Aug 2025</span>
              </div>
            </div>

            {/* Notification preferences */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#111310] mb-4">Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'Class reminders', sublabel: '1 hour before class', enabled: true },
                  { label: 'Weekly summary', sublabel: 'Every Monday', enabled: true },
                  { label: 'Promotional offers', sublabel: 'Deals and events', enabled: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#111310] font-medium">{pref.label}</p>
                      <p className="text-xs text-[#8A8E85]">{pref.sublabel}</p>
                    </div>
                    {/* Static toggle */}
                    <div className={`w-10 h-5 rounded-full relative ${pref.enabled ? 'bg-[#D7FF3F]' : 'bg-[#DADCD3]'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${pref.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
