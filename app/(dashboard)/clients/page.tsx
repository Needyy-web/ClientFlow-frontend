import type {ClientCompany} from "@/types/client";
import AddClientButton from "@/app/components/clients/AddClientButton"
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export default async function ClientsPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
        redirect('/login');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/client_companies`, {
            cache: "no-store",
            headers: {
                Cookie: `session_token=${sessionToken}`
            }
        });
    if (response.status === 401) {
        redirect('/login');
    }
    if (!response.ok) {
        throw new Error("API response failed.");
    }
    const data: ClientCompany[] = await response.json();


    return (
        <div className="p-8 w-full max-w-[1100px] mx-auto">
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold text-slate-900">Клиенты</h1>
                    <AddClientButton/>
                </div>
                <span>Управление клиентскими компаниями</span>
            </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100">
                    <tr className="font-bold">
                        <th className="border-b border-slate-200 p-4 text-left">Имя</th>
                        <th className="border-b border-slate-100 p-4 text-sm text-left">ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ?
                        data.map((client) => (
                            <tr key={client.id} className="duration-150 hover:bg-slate-100 transition-colors">
                                <td className="border-b border-slate-200 p-4">{client.name}</td>
                                <td className=" border-b border-slate-200 p-4">{client.id}</td>
                            </tr>
                        )) :
                        <tr>
                            <td colSpan={2} className="border-b border-slate-200 p-4 py-12 text-center">Клиентов пока
                                нет
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}