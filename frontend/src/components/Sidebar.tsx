"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations, Locale } from '@/lib/i18n';

// Minimal inline SVG icons (16×16)
const Icons = {
  grid: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  trendingUp: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M3 17l5-5 4 4 9-9" />
      <path d="M15 7h6v6" />
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  dumbbell: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M6 4v6m0 4v6M18 4v6m0 4v6M3 10h18M3 14h18" />
    </svg>
  ),
  sparkles: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
    </svg>
  ),
  creditCard: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  book: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  barChart: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-6" />
    </svg>
  ),
  addCircle: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  clipboard: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
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
  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `sidebar-link${isActive(path) ? ' active' : ''}`;

  return (
    <aside
      className="fixed left-0 top-0 w-[232px] min-h-screen flex flex-col z-40"
      style={{ background: '#171A16' }}
    >
      {/* TOP: Brand */}
      <div className="py-6 px-4 flex flex-col gap-1">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-md font-bold text-base"
            style={{ width: 32, height: 32, background: '#D7FF3F', color: '#111310' }}
          >
            F
          </div>
          <span className="font-bold text-[15px]" style={{ color: '#fff' }}>FITOS</span>
        </Link>
        <p className="text-[11px] pl-1 mt-1" style={{ color: '#8A8E85' }}>{t.side_workspace_sub}</p>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">

        {/* OVERVIEW */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A8E85] px-3 mb-1 mt-0">
          {t.side_overview}
        </p>
        <Link href="/dashboard" className={linkClass('/dashboard')}>
          {Icons.grid}
          {t.side_dashboard}
        </Link>

        {/* GROW */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A8E85] px-3 mb-1 mt-4">
          {t.side_grow}
        </p>
        <Link href="/dashboard/leads" className={linkClass('/dashboard/leads')}>
          {Icons.users}
          {t.side_crm}
        </Link>
        <Link href="/dashboard/create-lead" className={linkClass('/dashboard/create-lead')}>
          {Icons.addCircle}
          Create Lead
        </Link>
        <Link href="/dashboard/customers" className={linkClass('/dashboard/customers')}>
          {Icons.users}
          Customers
        </Link>
        <Link href="/dashboard/sales" className={linkClass('/dashboard/sales')}>
          {Icons.trendingUp}
          {t.side_sales}
        </Link>

        {/* OPERATE */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A8E85] px-3 mb-1 mt-4">
          {t.side_operate}
        </p>
        <Link href="/dashboard/schedule" className={linkClass('/dashboard/schedule')}>
          {Icons.calendar}
          Schedule
        </Link>
        <Link href="/dashboard/bookings" className={linkClass('/dashboard/bookings')}>
          {Icons.calendar}
          {t.side_bookings}
        </Link>
        <Link href="/dashboard/workout-builder" className={linkClass('/dashboard/workout-builder')}>
          {Icons.dumbbell}
          Workout Builder
        </Link>

        {/* TRAINER */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A8E85] px-3 mb-1 mt-4">
          TRAINER
        </p>
        <Link href="/dashboard/trainer" className={linkClass('/dashboard/trainer')}>
          {Icons.dumbbell}
          Trainer View
        </Link>

        {/* MEMBER */}
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A8E85] px-3 mb-1 mt-4">
          MEMBER
        </p>
        <Link href="/dashboard/member" className={linkClass('/dashboard/member')}>
          {Icons.grid}
          My Dashboard
        </Link>
        <Link href="/dashboard/member/book" className={linkClass('/dashboard/member/book')}>
          {Icons.book}
          Book Class
        </Link>
        <Link href="/dashboard/member/progress" className={linkClass('/dashboard/member/progress')}>
          {Icons.barChart}
          Progress
        </Link>
        <Link href="/dashboard/member/ai-coach" className={linkClass('/dashboard/member/ai-coach')}>
          {Icons.sparkles}
          AI Coach
        </Link>
        <Link href="/dashboard/member/payments" className={linkClass('/dashboard/member/payments')}>
          {Icons.creditCard}
          Payments
        </Link>
        <Link href="/dashboard/member/profile" className={linkClass('/dashboard/member/profile')}>
          {Icons.user}
          Profile
        </Link>
      </nav>

      {/* BOTTOM: User card */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full text-xs font-bold shrink-0"
            style={{ width: 32, height: 32, background: '#D7FF3F', color: '#111310' }}
          >
            LN
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold truncate" style={{ color: '#fff' }}>Linh Nguyễn</p>
            <p className="text-[11px] truncate" style={{ color: '#8A8E85' }}>Manager</p>
          </div>
          <button
            className="text-[11px] transition-colors hover:text-white"
            style={{ color: '#8A8E85' }}
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
