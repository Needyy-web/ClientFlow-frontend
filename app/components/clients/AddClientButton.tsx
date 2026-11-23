"use client";

import {useRef} from 'react';
import type { FormEvent } from 'react';

export default function AddClientButton() {
    const dialogRef = useRef < HTMLDialogElement>(null);

function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const companyName= formData.get("company-name");
    const contactName = formData.get("contact-name");
    const email = formData.get("email");
    const tel = formData.get("tel");
    const notes = formData.get("notes");
}
    return (
    <>
        <button onClick={() => dialogRef.current?.showModal()}
                className=" inline-flex items-center justify-center bg-indigo-600 h-10 px-4 rounded-lg transition-colors duration-150 hover:bg-indigo-900 text-white"
        >+ Добавить клиента
        </button>
        <dialog ref={dialogRef}
        >
            <button type="button" onClick={() => dialogRef.current?.close()}>Закрыть</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="company-name">Название компании</label>
                <input id="company-name" type="text" name="company-name" required/>
                <label htmlFor="contact-name">Контактное лицо</label>
                <input id="contact-name" type="text" name="contact-name"/>
                <label htmlFor="email">Электронная почта</label>
                <input id="email" type="email" name="email"/>
                <label htmlFor="tel">Телефон</label>
                <input id="tel" type="tel" name="tel"/>
                <label htmlFor="notes">Примечания</label>
                <textarea id="notes" name="notes"/>
                <button type="submit">Создать клиента</button>
            </form>
        </dialog>
    </>
    )
    }