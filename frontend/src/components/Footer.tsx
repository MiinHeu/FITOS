import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#171A16] border-t border-white/10 py-10">
      <div className="max-w-[1280px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#D7FF3F] rounded-lg flex items-center justify-center">
            <span className="font-black text-xs text-[#111310]">F</span>
          </div>
          <span className="font-black text-[#ECEDE6] text-base tracking-tight">FITOS</span>
        </Link>
        {/* Copyright */}
        <p className="text-xs text-[#8A8E85]">© {new Date().getFullYear()} FITOS. All rights reserved.</p>
        {/* Links */}
        <nav className="flex items-center gap-6">
          {[['#', 'Privacy'], ['#', 'Terms'], ['#', 'Contact']].map(([href, label]) => (
            <Link key={label} href={href} className="text-xs text-[#8A8E85] hover:text-[#ECEDE6] transition-colors">{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
