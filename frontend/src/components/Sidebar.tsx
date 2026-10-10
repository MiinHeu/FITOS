"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

export default function Sidebar() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>('en');
  useEffect(() => {
    const sync = () => {
      const s = localStorage.getItem('locale') as Locale | null;
      if (s) setLocale(s);
    };
    sync();
    window.addEventListener('locale-changed', sync);
    return () => window.removeEventListener('locale-changed', sync);
  }, []);
  const t = useTranslations(locale);
  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className="w-[232px] h-screen flex flex-col fixed left-0 top-0 z-40"
      style={{background: '#171A16'}}
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <Link href="/" className="flex items-center gap-2">
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

      {/* Studio workspace */}
      <div className="mx-4 mb-4">
        <div className="rounded-xl px-4 py-3" style={{background: 'rgba(215,255,63,0.08)'}}>
          <p className="text-sm font-bold" style={{color: '#D7FF3F'}}>{t.side_workspace}</p>
          <p className="text-xs mt-0.5" style={{color: '#5E625A'}}>{t.side_workspace_sub}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p
          className="text-[10px] font-bold uppercase tracking-widest px-4 mb-2"
          style={{color: '#3D4139'}}
        >
          {t.side_overview}
        </p>

        <Link
          href="/dashboard"
          className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          {t.side_dashboard}
        </Link>

        <Link href="/dashboard" className="sidebar-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" />
          </svg>
          {t.side_insights}
        </Link>

        <p
          className="text-[10px] font-bold uppercase tracking-widest px-4 mt-6 mb-2"
          style={{color: '#3D4139'}}
        >
          {t.side_grow}
        </p>

        <Link
          href="/dashboard/leads"
          className={`sidebar-link ${isActive('/dashboard/leads') ? 'active' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
          {t.side_crm}
        </Link>

        <Link
          href="/dashboard/create-lead"
          className={`sidebar-link ${isActive('/dashboard/create-lead') ? 'active' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
          Create Lead
        </Link>

        <Link href="/dashboard" className="sidebar-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {t.side_sales}
        </Link>

        <Link href="/dashboard" className="sidebar-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 00-8 0v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {t.side_memberships}
        </Link>

        <p
          className="text-[10px] font-bold uppercase tracking-widest px-4 mt-6 mb-2"
          style={{color: '#3D4139'}}
        >
          {t.side_operate}
        </p>

        <Link href="/dashboard" className="sidebar-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {t.side_classes}
        </Link>

        <Link href="/dashboard" className="sidebar-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t.side_bookings}
        </Link>

        <Link
          href="/dashboard/member"
          className={`sidebar-link ${isActive('/dashboard/member') ? 'active' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Members
        </Link>

        <Link
          href="/dashboard/trainer"
          className={`sidebar-link ${isActive('/dashboard/trainer') ? 'active' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 4v6m0 4v6M18 4v6m0 4v6M3 10h18M3 14h18"/>
          </svg>
          Trainer
        </Link>
      </nav>

      {/* User info */}
      <div className="p-4" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center text-xs font-bold rounded-full"
            style={{width: 36, height: 36, background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', color: '#fff'}}
          >
            LN
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{color: '#ECEDE6'}}>Linh Nguyễn</p>
            <p className="text-[11px] truncate" style={{color: '#5E625A'}}>linh@pulse.vn</p>
          </div>
          <button style={{color: '#5E625A'}} className="hover:text-fitos-off-white">···</button>
        </div>
      </div>
    </aside>
  );
}
