import Sidebar from '@/app/components/layout/Sidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@/types/user';
import Header from '@/app/components/layout/Header'

export default async function DashboardLayout({
    children
}:
{
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (!token) {
        redirect('/login');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/auth/me`,
        {
            method: 'GET',
            headers: {
                Cookie: `session_token=${token}`
            },
            cache: 'no-store',
        });
    if (response.status === 401) {
        redirect('/login');
    } else if (!response.ok) {
        throw new Error(`Internal server error: ${response.status}`);
    }
   const user: User = await response.json();



    return (
        <div className="min-h-screen flex bg-slate-100">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Header user={user} />
                <main className="flex-1 bg-slate-50">
                    {children}
                </main>
            </div>
        </div>
    )
}