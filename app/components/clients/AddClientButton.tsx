"use client";

import {useRef} from 'react';
import type {FormEvent} from 'react';
import { useRouter } from 'next/navigation';

export default function AddClientButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const companyName = formData.get("company-name");
        const contactName = formData.get("contact-name");
        const email = formData.get("email");
        const tel = formData.get("tel");
        const notes = formData.get("notes");

        const clientData = {
            name: companyName,
            contact_name: contactName,
            email: email,
            phone: tel,
            notes: notes,
        }

        const response = await fetch('http://localhost:8000/client_companies',
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clientData),
            });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        router.refresh();
        dialogRef.current?.close();
        console.log(data);
    }

return (
    <>
        <button
            onClick={() => {
                dialogRef.current?.setAttribute('closedby', 'any')
                dialogRef.current?.showModal()}}
                className="cursor-pointer inline-flex items-center justify-center bg-indigo-600 h-10 px-4 rounded-lg transition-colors duration-150 hover:bg-indigo-900 text-white"
        >+ Добавить клиента
        </button>
        <dialog ref={dialogRef}
                className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl backdrop:bg-black/50 mx-auto my-auto"
        >
            <div className="mb-5 border-b border-slate-200 pb-4">
                <h2 className="text-xl font-semibold text-slate-900">Добавить клиента</h2>
                <p className="text-sm text-slate-500 mt-1">Введите данные клиентской компании</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="company-name">Название компании</label>
                    <input id="company-name" type="text" name="company-name"
                           className="border border-slate-300 rounded-lg h-10 px-3 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
                           required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name"
                           className="text-sm font-medium text-slate-700"
                    >Контактное лицо</label>
                    <input id="contact-name" type="text" name="contact-name"
                           className="border border-slate-300 rounded-lg h-10 px-3 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email"
                           className="text-sm font-medium text-slate-700"
                    >Электронная почта</label>
                    <input id="email" type="email" name="email"
                           className="border border-slate-300 rounded-lg h-10 px-3 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="tel"
                           className="text-sm font-medium text-slate-700"
                    >Телефон</label>
                    <input id="tel" type="tel" name="tel"
                           className="border border-slate-300 rounded-lg h-10 px-3 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="notes"
                           className="text-sm font-medium text-slate-700"
                    >Примечания</label>
                    <textarea id="notes" name="notes"
                              className="border border-slate-300 rounded-lg px-3 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors field-sizing-content py-2 resize-none min-h-24 max-h-48"
                    />
                </div>
                <div className="flex  justify-end items-center gap-3 border-t border-slate-200 pt-4">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        className="border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg h-10 px-4"
                    >Отмена
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center bg-indigo-600 h-10 px-4 rounded-lg transition-colors duration-150 hover:bg-indigo-900 text-white"
                    >Создать клиента
                    </button>
                </div>
            </form>
        </dialog>
    </>
)
}

