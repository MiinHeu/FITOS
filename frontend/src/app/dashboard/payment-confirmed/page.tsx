import Link from 'next/link';

export default function PaymentConfirmedPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
      <div className="bg-white border border-[#DADCD3] rounded-2xl p-10 w-full max-w-md text-center">
        {/* Checkmark */}
        <div className="w-20 h-20 bg-[#D7FF3F] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16L13 23L26 9" stroke="#111310" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#111310] mb-2">Payment confirmed</h2>
        <p className="text-sm text-[#5E625A] mb-6">Membership activated successfully</p>

        {/* Member summary */}
        <div className="bg-[#F5F5F0] border border-[#DADCD3] rounded-xl px-5 py-4 mb-8 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#D7FF3F] flex items-center justify-center text-sm font-bold text-[#111310]">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111310]">Jane Doe</p>
              <p className="text-xs text-[#5E625A]">jane.doe@email.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-[#8A8E85]">Plan</span>
              <span className="text-xs font-semibold text-[#111310]">Perform</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[#8A8E85]">Amount</span>
              <span className="text-xs font-semibold text-[#111310]">£49/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[#8A8E85]">Start date</span>
              <span className="text-xs font-semibold text-[#111310]">15 Jul 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[#8A8E85]">Status</span>
              <span className="text-xs font-semibold text-[#526B00] bg-[#D7FF3F] px-2 py-0.5 rounded-full">Active</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/dashboard/members"
            className="flex-1 bg-[#171A16] text-[#ECEDE6] font-semibold rounded-lg px-4 py-2.5 text-sm text-center hover:opacity-90"
          >
            View member
          </Link>
          <Link
            href="/dashboard/create-sale"
            className="flex-1 bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2.5 text-sm text-center hover:opacity-90"
          >
            Create another sale
          </Link>
        </div>
      </div>
    </div>
  );
}
