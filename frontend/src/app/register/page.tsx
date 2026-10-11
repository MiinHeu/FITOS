"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studioCode, setStudioCode] = useState('');
  const [role, setRole] = useState<'member' | 'staff'>('member');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* LEFT COLUMN — dark panel */}
      <div
        className="hidden lg:flex flex-col justify-between shrink-0 p-12"
        style={{ width: 480, background: '#171A16' }}
      >
        {/* Top: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{ width: 34, height: 34, background: '#D7FF3F', borderRadius: 10 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#111310">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span style={{ color: '#ECEDE6', fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>FITOS</span>
        </Link>

        {/* Bottom: Quote card */}
        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <p className="font-medium leading-relaxed mb-4" style={{ fontSize: 22, color: '#ECEDE6' }}>
            &ldquo;From the first free trial to a loyal member for years — FITOS handles every step.&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div
              className="flex items-center justify-center font-bold text-sm rounded-full shrink-0"
              style={{ width: 40, height: 40, background: '#D7FF3F', color: '#111310' }}
            >
              BT
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: '#ECEDE6' }}>Bảo Trần</p>
              <p className="text-xs" style={{ color: '#8A8E85' }}>Owner · FitCore Saigon</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full" style={{ maxWidth: 400 }}>

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div
              className="flex items-center justify-center"
              style={{ width: 34, height: 34, background: '#D7FF3F', borderRadius: 10 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ fontSize: 21, fontWeight: 800, color: '#111310' }}>FITOS</span>
          </Link>

          <h1 className="font-bold mb-1" style={{ fontSize: 28, color: '#111310' }}>Create your account</h1>
          <p className="mb-8" style={{ fontSize: 15, color: '#5E625A' }}>Join FITOS today</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full name */}
            <div>
              <label className="block font-medium mb-1" style={{ fontSize: 13, color: '#111310' }}>
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#DADCD3', color: '#111310' }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1" style={{ fontSize: 13, color: '#111310' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#DADCD3', color: '#111310' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1" style={{ fontSize: 13, color: '#111310' }}>
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+84 901 234 567"
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#DADCD3', color: '#111310' }}
              />
            </div>

            {/* Studio code */}
            <div>
              <label className="block font-medium mb-1" style={{ fontSize: 13, color: '#111310' }}>
                Studio code{' '}
                <span className="font-normal" style={{ color: '#8A8E85' }}>(optional)</span>
              </label>
              <input
                type="text"
                value={studioCode}
                onChange={(e) => setStudioCode(e.target.value)}
                placeholder="e.g. PULSE2"
                className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#DADCD3', color: '#111310' }}
              />
            </div>

            {/* Role toggle */}
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: 13, color: '#111310' }}>
                I am a
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('member')}
                  className="flex-1 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: role === 'member' ? '#D7FF3F' : 'transparent',
                    color: '#111310',
                    border: role === 'member' ? 'none' : '1px solid #DADCD3',
                  }}
                >
                  I&apos;m a Member
                </button>
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  className="flex-1 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: role === 'staff' ? '#D7FF3F' : 'transparent',
                    color: '#111310',
                    border: role === 'staff' ? 'none' : '1px solid #DADCD3',
                  }}
                >
                  I&apos;m Staff
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 cursor-pointer"
                style={{ accentColor: '#D7FF3F' }}
              />
              <label htmlFor="terms" className="cursor-pointer leading-relaxed" style={{ fontSize: 13, color: '#5E625A' }}>
                I agree to the{' '}
                <a href="#" className="font-semibold" style={{ color: '#526B00' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-semibold" style={{ color: '#526B00' }}>Privacy Policy</a>
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full font-semibold rounded-lg py-3 mt-4 text-sm"
              style={{ background: '#D7FF3F', color: '#111310' }}
            >
              Create account
            </button>
          </form>

          {/* Bottom link */}
          <p className="text-center mt-6 text-sm" style={{ color: '#5E625A' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: '#526B00' }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
