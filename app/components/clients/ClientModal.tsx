'use client';

import { useRef, useEffect } from 'react';
import AddClientButton from './AddClientButton';

export default function ClientModal({}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal()
    }, [])
    return (
        <dialog
        ref={dialogRef}
        >Создание клиента</dialog>
    )
}