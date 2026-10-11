import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#171A16] z-50 border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#D7FF3F] rounded-lg flex items-center justify-center">
            <span className="font-black text-xs text-[#111310]">F</span>
          </div>
          <span className="font-black text-[#ECEDE6] text-lg tracking-tight">FITOS</span>
        </Link>
        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/plans', 'Plans'], ['/classes', 'Classes']].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm text-[#8A8E85] hover:text-[#ECEDE6] transition-colors">{label}</Link>
          ))}
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#8A8E85] hover:text-[#ECEDE6] transition-colors">Log in</Link>
          <Link href="/register" className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2 text-sm hover:bg-[#C4E82E] transition-colors">Start free trial</Link>
        </div>
      </div>
    </header>
  );
}
