import Sidebar from '@/app/components/Sidebar';

export default function DashboardLayout({
    children
}:
{
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-slate-100">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <header className=" flex h-16 shrink-0 border-b border-slate-300 bg-white items-center">

                </header>
                <main className="flex-1 bg-slate-300">
                    {children}
                </main>
            </div>
        </div>
    )
}