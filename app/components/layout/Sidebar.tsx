"use client";

import Link from "next/link";
import {usePathname, useRouter} from 'next/navigation';
import {LayoutDashboard, House, User, BookText, Archive, Users, Settings, LogOut} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

export default function Sidebar() {
    interface NavItem {
        label: string;
        href: string;
        icon: LucideIcon,
    };

    const navlinks: NavItem[] = [
        {label: 'Главная', href: '/dashboard', icon: House},
        {label: 'Клиенты', href: '/clients', icon: User},
        {label: 'Заказы', href: '/orders', icon: BookText},
        {label: 'Архив', href: '/archive', icon: Archive},
        {label: 'Исполнители', href: '/employees', icon: Users},
        {label: 'Настройки', href: '/settings', icon: Settings},
    ];

    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        const response = await fetch('http://localhost:8000/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error(`Failed to logout: ${response.status}`);
        }
        router.replace('/login');
    }

    return (
        <aside className="w-64 flex flex-col shrink-0 bg-white rounded-lg m-4 p-4">
            <div className="flex mb-2 items-center gap-2">
                <LayoutDashboard size={24} strokeWidth={1.8}/>
                <h1 className="font-semibold text-2xl">ClientFlow</h1>
            </div>
            <nav className="flex flex-col gap-1">
                {navlinks.map((link) => (
                    <Link
                        href={link.href}
                        key={link.href}
                        className={`gap-2 flex items-center w-full h-10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150 
                      ${
                            pathname === link.href
                                ? 'bg-indigo-50 text-indigo-700 '
                                : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                        <link.icon size={18} strokeWidth={1.8}/>
                        {link.label}
                    </Link>
                ))}
            </nav>
            <button
                className="items-center gap-2 px-3 flex mt-auto w-full h-10 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors duration-150 active:bg-indigo-200"
                type="button"
                onClick={handleLogout}
            >
                <LogOut size={18} strokeWidth={1.8}/>
                Выход
            </button>
        </aside>
    )
}