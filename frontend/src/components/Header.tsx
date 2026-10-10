"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Link from 'next/link';

export default function Header() {
  const [locale, setLocale] = useState<Locale>('en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved) setLocale(saved);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLang = (lng: Locale) => {
    setLocale(lng);
    localStorage.setItem('locale', lng);
    window.dispatchEvent(new Event('locale-changed'));
  };

  const t = useTranslations(locale);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-fitos-dark/95 backdrop-blur-md shadow-lg' : 'bg-fitos-dark'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center"
            style={{width: 34, height: 34, background: '#D7FF3F', borderRadius: 10}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111310">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span style={{color: '#ECEDE6', fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em'}}>FITOS</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/', label: t.nav_home },
            { href: '/plans', label: t.nav_plans },
            { href: '/classes', label: t.nav_classes },
            { href: '#coaches', label: t.nav_coaches },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors"
              style={{color: '#8A8E85'}}
              onMouseEnter={e => (e.currentTarget.style.color = '#D7FF3F')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8E85')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex rounded-full p-0.5 mr-2" style={{background: 'rgba(255,255,255,0.08)'}}>
            <button
              onClick={() => switchLang('vi')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                locale === 'vi' ? 'text-fitos-near-black' : 'text-fitos-subtle hover:text-fitos-off-white'
              }`}
              style={locale === 'vi' ? { background: '#D7FF3F' } : {}}
            >
              VI
            </button>
            <button
              onClick={() => switchLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                locale === 'en' ? 'text-fitos-near-black' : 'text-fitos-subtle hover:text-fitos-off-white'
              }`}
              style={locale === 'en' ? { background: '#D7FF3F' } : {}}
            >
              EN
            </button>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium transition-colors"
            style={{color: '#ECEDE6'}}
          >
            {t.nav_login}
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium transition-colors"
            style={{color: '#ECEDE6'}}
          >
            Register
          </Link>
          <Link
            href="/register"
            className="btn-lime text-xs"
            style={{padding: '8px 20px'}}
          >
            {t.nav_start_trial}
          </Link>
        </div>
      </div>
    </header>
  );
}
