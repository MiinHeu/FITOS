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
    <footer className="py-10 px-10" style={{ background: '#171A16' }}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
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

        {/* CENTER: Copyright */}
        <p className="text-sm" style={{ color: '#8A8E85' }}>
          {t.footer_copy}
        </p>

        {/* RIGHT: Links */}
        <div className="flex items-center gap-6">
          {[
            { href: '#', label: t.footer_privacy },
            { href: '#', label: t.footer_terms },
            { href: '#', label: t.footer_contact },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: '#8A8E85' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
