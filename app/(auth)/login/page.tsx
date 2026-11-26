"use client";

import type {FormEvent} from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const loginData = {
            email: email,
            password: password,
        };

        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        router.push('/clients');
        console.log(data);
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-xl p-8 shadow">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4  text-center">Вход в аккаунт</h2>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="email">Логин</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full h-12 border border-slate-300 rounded-lg px-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full h-12 border border-slate-300 rounded-lg px-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>
                    <button
                        className="w-full h-12 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        type="submit">Войти</button>
                </form>
            </div>
        </>
    )
}