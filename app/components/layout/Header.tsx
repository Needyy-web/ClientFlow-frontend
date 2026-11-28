import type { HeaderProps } from '@/types/user';

export default function Header({ user }: HeaderProps) {
    return (
        <header className="px-4 justify-between flex h-16 shrink-0 border-b border-slate-300 bg-white items-center">
            <h2>Рабочее пространство</h2>

            <div className="flex gap-3 items-center">
                <div className="flex rounded-full bg-slate-300 items-center justify-center size-10">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-sm text-slate-500">{user.role}</span>
                </div>
            </div>
        </header>
    )
}