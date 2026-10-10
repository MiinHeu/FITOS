"use client";
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';
import Link from 'next/link';

export default function Footer() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const sync = () => {
      const s = localStorage.getItem('locale') as Locale | null;
      if (s) setLocale(s);
    };
    sync();
    window.addEventListener('locale-changed', sync);
    return () => window.removeEventListener('locale-changed', sync);
  }, []);
  const t = useTranslations(mounted ? locale : 'en');

  return (
    <footer style={{background: '#171A16'}} className="py-8">
      <div className="max-w-[1440px] mx-auto px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
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
        <p className="text-xs" style={{color: '#5E625A'}}>{t.footer_copy}</p>
        <div className="flex gap-6">
          {[
            { href: '#', label: t.footer_privacy },
            { href: '#', label: t.footer_terms },
            { href: '#', label: t.footer_contact },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs transition-colors"
              style={{color: '#5E625A'}}
              onMouseEnter={e => (e.currentTarget.style.color = '#ECEDE6')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5E625A')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
