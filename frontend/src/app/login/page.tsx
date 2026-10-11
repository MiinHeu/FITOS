import Link from 'next/link';
import Header from '@/components/Header';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex w-[480px] bg-[#171A16] flex-col p-12 flex-shrink-0">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 mb-auto">
          <div className="w-8 h-8 bg-[#D7FF3F] rounded-lg flex items-center justify-center">
            <span className="font-black text-xs text-[#111310]">F</span>
          </div>
          <span className="font-black text-[#ECEDE6] text-lg tracking-tight">FITOS</span>
        </Link>
        {/* Quote */}
        <div className="my-auto">
          <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-7">
            <p className="text-[22px] font-bold text-white leading-snug mb-4">
              &quot;The best workout is the one you actually show up for.&quot;
            </p>
            <p className="text-xs text-[#8A8E85]">— FITOS coaching team</p>
          </div>
        </div>
        {/* Spacer */}
        <div className="mb-auto"></div>
      </div>
      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-[#F5F5F0] px-6 py-12">
        <div className="bg-white rounded-2xl border border-[#DADCD3] p-10 w-full max-w-[400px]">
          <h2 className="text-[28px] font-bold text-[#111310] mb-1">Welcome back</h2>
          <p className="text-sm text-[#5E625A] mb-8">Sign in to your FITOS account</p>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111310] mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#111310]">Password</label>
                <a href="#" className="text-xs text-[#526B00] hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-[#DADCD3] rounded-lg px-3.5 py-2.5 text-sm text-[#111310] placeholder:text-[#8A8E85] focus:outline-none focus:border-[#D7FF3F] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg py-2.5 text-sm hover:bg-[#C4E82E] transition-colors mt-2"
            >
              Sign in
            </button>
          </form>
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#DADCD3]"></div>
            <span className="text-xs text-[#8A8E85]">or</span>
            <div className="flex-1 h-px bg-[#DADCD3]"></div>
          </div>
          <p className="text-center text-sm text-[#5E625A]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#526B00] font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
