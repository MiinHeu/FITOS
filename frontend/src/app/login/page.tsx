"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
            &ldquo;The only platform that truly understands what a modern gym studio needs.&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div
              className="flex items-center justify-center font-bold text-sm rounded-full shrink-0"
              style={{ width: 40, height: 40, background: '#D7FF3F', color: '#111310' }}
            >
              NL
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: '#ECEDE6' }}>Nguyễn Linh</p>
              <p className="text-xs" style={{ color: '#8A8E85' }}>Studio Manager · Pulse District 2</p>
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

          <h1 className="font-bold mb-1" style={{ fontSize: 28, color: '#111310' }}>Welcome back</h1>
          <p className="mb-8" style={{ fontSize: 15, color: '#5E625A' }}>Sign in to your FITOS account</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                style={{
                  borderColor: '#DADCD3',
                  color: '#111310',
                  // @ts-ignore
                  '--tw-ring-color': '#D7FF3F',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1" style={{ fontSize: 13, color: '#111310' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 pr-10"
                  style={{
                    borderColor: '#DADCD3',
                    color: '#111310',
                    // @ts-ignore
                    '--tw-ring-color': '#D7FF3F',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#8A8E85' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs font-medium" style={{ color: '#526B00' }}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full font-semibold rounded-lg py-3 mt-6 text-sm"
              style={{ background: '#D7FF3F', color: '#111310' }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: '#DADCD3' }} />
            <span className="text-xs" style={{ color: '#8A8E85' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: '#DADCD3' }} />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium"
            style={{ borderColor: '#DADCD3', color: '#111310' }}
          >
            {/* Simple G icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Bottom link */}
          <p className="text-center mt-6 text-sm" style={{ color: '#5E625A' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold" style={{ color: '#526B00' }}>
              Start free trial →
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
