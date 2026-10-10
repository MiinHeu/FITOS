"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [isRegister, setIsRegister] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = localStorage.getItem('locale') as Locale | null;
    if (s) setLocale(s);
  }, []);

  const t = useTranslations(mounted ? locale : 'en');

  return (
    <div className="min-h-screen flex">
      {/* Left panel — 590px, dark */}
      <div
        className="hidden lg:flex lg:flex-col relative flex-shrink-0"
        style={{width: 590, background: '#171A16'}}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/assets/login_athlete.jpg"
            alt="Fitness motivation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{background: 'rgba(23,26,22,0.5)'}} />
        </div>

        {/* Brand top-left */}
        <div className="relative z-10 p-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{width: 34, height: 34, background: '#D7FF3F', borderRadius: 10}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{color: '#ECEDE6', fontSize: 21, fontWeight: 800}}>FITOS</span>
          </Link>
        </div>

        {/* Quote card bottom */}
        <div className="relative z-10 mt-auto p-8">
          <div
            className="rounded-2xl p-5"
            style={{background: 'rgba(23,26,22,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(236,237,230,0.1)'}}
          >
            <p className="font-medium mb-4" style={{fontSize: 16, color: '#ECEDE6', lineHeight: 1.5}}>
              &ldquo;Consistency becomes easier when you can see yourself improving week by week.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center font-bold text-sm rounded-full"
                style={{width: 36, height: 36, background: '#D7FF3F', color: '#111310'}}
              >
                MT
              </div>
              <div>
                <p className="font-semibold text-sm" style={{color: '#ECEDE6'}}>Minh Trần</p>
                <p className="text-xs" style={{color: '#8A8E85'}}>Head Coach · Pulse District 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{background: '#F5F5F0', padding: 80}}
      >
        <div className="w-full" style={{maxWidth: 400}}>
          {/* Mobile brand */}
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div
              className="flex items-center justify-center"
              style={{width: 34, height: 34, background: '#D7FF3F', borderRadius: 10}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{fontSize: 21, fontWeight: 800, color: '#111310'}}>FITOS</span>
          </Link>

          {/* Login form card */}
          <div
            style={{background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
              marginBottom: 12,}}
          >
            <h1 className="font-bold mb-1" style={{fontSize: 22, color: '#111310'}}>
              {isRegister ? t.register_title : t.login_title}
            </h1>
            <p className="text-xs mb-5" style={{color: '#8A8E85'}}>
              {isRegister ? t.register_subtitle : t.login_subtitle}
            </p>

            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              {isRegister && (
                <>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{color: '#5E625A'}}>
                      {t.register_name}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 text-sm focus:outline-none transition-all"
                      style={{background: '#F5F5F0',
                        border: '1px solid #DADCD3',
                        borderRadius: 8,
                        color: '#111310',}}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{color: '#5E625A'}}>
                      {t.register_studio}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 text-sm focus:outline-none transition-all"
                      style={{background: '#F5F5F0',
                        border: '1px solid #DADCD3',
                        borderRadius: 8,
                        color: '#111310',}}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{color: '#5E625A'}}>
                  {t.login_email}
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2.5 text-sm focus:outline-none transition-all"
                  placeholder="you@studio.com"
                  style={{background: '#F5F5F0',
                    border: '1px solid #DADCD3',
                    borderRadius: 8,
                    color: '#111310',}}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold" style={{color: '#5E625A'}}>
                    {t.login_password}
                  </label>
                  {!isRegister && (
                    <a href="#" className="text-xs font-medium" style={{color: '#526B00'}}>
                      {t.login_forgot}
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  className="w-full px-3 py-2.5 text-sm focus:outline-none transition-all"
                  style={{background: '#F5F5F0',
                    border: '1px solid #DADCD3',
                    borderRadius: 8,
                    color: '#111310',}}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-sm transition-all"
                style={{background: '#D7FF3F', color: '#111310', borderRadius: 10}}
              >
                {isRegister ? t.register_submit : t.login_submit}
              </button>
            </form>
          </div>

          {/* Info message */}
          <div
            className="rounded-xl px-4 py-3 mb-4 text-xs"
            style={{background: '#E9EDFF', color: '#3b4fa8'}}
          >
            Role access: Manager, Receptionist, or Coach — select after sign in.
          </div>

          {/* Role access card */}
          <div
            className="rounded-xl px-4 py-3 mb-4"
            style={{background: '#fff', border: '1px solid #DADCD3'}}
          >
            <p className="text-xs font-semibold mb-2" style={{color: '#5E625A'}}>Access as</p>
            <div className="flex gap-2">
              {['Manager', 'Receptionist', 'Coach'].map((role) => (
                <button
                  key={role}
                  className="flex-1 py-1.5 text-xs font-medium rounded-lg transition-all"
                  style={{background: '#F5F5F0', color: '#5E625A', border: '1px solid #DADCD3'}}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle register / login */}
          <p className="text-center text-xs" style={{color: '#8A8E85'}}>
            {isRegister ? t.register_has_account : t.login_no_account}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold"
              style={{color: '#526B00'}}
            >
              {isRegister ? t.register_login : t.login_register}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
