"use client";

import { useState } from 'react';
import ClientModal from './ClientModal';

export default function AddClientButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <button onClick={() => setIsModalOpen(true)} className=" inline-flex items-center justify-center bg-indigo-600 h-10 px-4 rounded-lg transition-colors duration-150 hover:bg-indigo-900 text-white"
        >+ Добавить клиента</button>
    )
}