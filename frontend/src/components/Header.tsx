"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  const switchLang = (lng: Locale) => {
    setLocale(lng);
    localStorage.setItem('locale', lng);
    window.dispatchEvent(new Event('locale-changed'));
  };

  const t = useTranslations(mounted ? locale : 'en');

  const navLinks = [
    { href: '/', label: t.nav_home },
    { href: '/plans', label: t.nav_plans },
    { href: '/classes', label: t.nav_classes },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 w-full h-16 z-50" style={{ background: '#171A16' }}>
      <div className="max-w-[1280px] mx-auto px-10 h-full flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-md font-bold text-base"
            style={{ width: 32, height: 32, background: '#D7FF3F', color: '#111310' }}
          >
            F
          </div>
          <span className="font-bold text-[18px]" style={{ color: '#fff' }}>FITOS</span>
        </Link>

        {/* CENTER: Nav */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm px-3 py-1 transition-colors ${
                isActive(item.href)
                  ? 'text-white font-medium border-b-2'
                  : 'text-[#8A8E85] hover:text-white'
              }`}
              style={isActive(item.href) ? { borderBottomColor: '#D7FF3F' } : {}}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Language + Auth */}
        <div className="flex items-center gap-3">
          {/* Language pill toggle */}
          <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => switchLang('vi')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                locale === 'vi' ? 'text-[#111310]' : 'text-[#8A8E85] hover:text-white'
              }`}
              style={locale === 'vi' ? { background: '#D7FF3F' } : {}}
            >
              VI
            </button>
            <button
              onClick={() => switchLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                locale === 'en' ? 'text-[#111310]' : 'text-[#8A8E85] hover:text-white'
              }`}
              style={locale === 'en' ? { background: '#D7FF3F' } : {}}
            >
              EN
            </button>
          </div>

          <Link href="/login" className="text-sm font-medium text-white hover:text-[#D7FF3F] transition-colors">
            {t.nav_login}
          </Link>

          <Link
            href="/register"
            className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-[#C4E82E] transition-colors"
          >
            {t.nav_start_trial}
          </Link>
        </div>
      </div>
    </header>
  );
}
