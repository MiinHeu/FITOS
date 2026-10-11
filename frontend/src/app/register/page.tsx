'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [role, setRole] = useState<'member' | 'staff'>('member');

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex w-[480px] bg-[#171A16] flex-col p-12 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5 mb-auto">
          <div className="w-8 h-8 bg-[#D7FF3F] rounded-lg flex items-center justify-center">
            <span className="font-black text-xs text-[#111310]">F</span>
          </div>
          <span className="font-black text-[#ECEDE6] text-lg tracking-tight">FITOS</span>
        </Link>
        <div className="my-auto">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-7">
            <p className="text-[22px] font-bold text-white leading-snug mb-4">
              &quot;Join thousands of members already training smarter.&quot;
            </p>
            <div className="flex items-center gap-6 mt-6">
              {[{ v: '2,400+', l: 'Active members' }, { v: '40+', l: 'Weekly classes' }, { v: '£0', l: 'Joining fee' }].map(m => (
                <div key={m.l}>
                  <p className="text-xl font-bold text-[#D7FF3F]">{m.v}</p>
                  <p className="text-[10px] text-[#8A8E85] mt-0.5">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-auto"></div>
      </div>
      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F5F0] px-6 py-12">
        <div className="bg-white rounded-2xl border border-[#DADCD3] p-10 w-full max-w-[420px]">
          <h2 className="text-[28px] font-bold text-[#111310] mb-1">Create your account</h2>
          <p className="text-sm text-[#5E625A] mb-6">Start your free trial today</p>
          {/* Role toggle */}
          <div className="flex bg-[#F5F5F0] rounded-lg p-1 mb-6">
            {(['member', 'staff'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${
                  role === r
                    ? 'bg-white text-[#111310] shadow-sm'
                    : 'text-[#8A8E85]'
                }`}
              >
                {r === 'member' ? 'Member' : 'Staff / Owner'}
              </button>
            ))}
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111310] mb-1.5">Full name</label>
              <input type="text" placeholder="Jane Doe" className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111310] mb-1.5">Email address</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111310] mb-1.5">Phone number</label>
              <input type="tel" placeholder="+44 7700 000000" className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors" />
            </div>
            {role === 'staff' && (
              <div>
                <label className="block text-xs font-semibold text-[#111310] mb-1.5">Studio code</label>
                <input type="text" placeholder="e.g. FITOS-CC-01" className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors" />
              </div>
            )}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-[#D7FF3F]" />
              <span className="text-xs text-[#5E625A]">
                I agree to the{' '}
                <a href="#" className="text-[#526B00] hover:underline">Terms of Service</a>{' '}and{' '}
                <a href="#" className="text-[#526B00] hover:underline">Privacy Policy</a>
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg py-2.5 text-sm hover:bg-[#C4E82E] transition-colors mt-2"
            >
              Create account
            </button>
          </form>
          <p className="text-center text-sm text-[#5E625A] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#526B00] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
