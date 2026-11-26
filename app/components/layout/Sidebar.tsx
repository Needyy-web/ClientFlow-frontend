"use client";

import Link from "next/link";
import {usePathname} from 'next/navigation';

export default function Sidebar() {
    interface NavItem {
        label: string;
        href: string;
    };

    const navlinks: NavItem[] = [
        {label: 'Главная', href: '/dashboard'},
        {label: 'Клиенты', href: '/clients'},
        {label: 'Заказы', href: '/orders'},
        {label: 'Архив', href: '/archive'},
        {label: 'Исполнители', href: '/employees'},
        {label: 'Настройки', href: '/settings'},
    ];

    const pathname = usePathname();

    return (
        <aside className="w-64 flex flex-col shrink-0 bg-white rounded-lg m-4 p-4">
            <h1 className="font-semibold text-2xl mb-2">ClientFlow</h1>
            <nav className="flex flex-col gap-2">
                {navlinks.map((link) => (
                    <Link
                        href={link.href}
                        key={link.href}
                        className={`flex items-center w-full h-12 border rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-100 transition-colors duration-150 
                      ${
                            pathname === link.href
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                        {link.label}
                    </Link>
                    </nav>
                    <button className="mt-auto w-full h-12 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" type="button">Выход</button>
                    </aside>
                    )
                }