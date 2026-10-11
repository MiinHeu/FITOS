import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#F5F5F0' }}>
      <Sidebar />
      <main className="flex-1 ml-[232px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
