"use client";

import { useState } from "react";

export default function MenuLateral(){
    const [aberto, setAberto] = useState(false);
    return (
        <>
            <a className="btn-menu" onClick={() => setAberto(true)}>
                <i className="bi bi-list"></i>
            </a>

            <nav className={`menu-lateral ${aberto ? "aberto" : ""}`}>
                <a className="btn-fechar" onClick={() => setAberto(false)}>
                    <i className="bi bi-x-lg"></i>
                </a>

                <a href="/dashboard">
                    <i className="bi bi-house-door-fill"></i> Início
                </a>

                <a href="/perfil">
                    <i className="bi bi-person-fill"></i> Meu perfil
                </a>

                <a href="/defesas">
                    <i className="bi bi-calendar-fill"></i> Defesas
                </a>

                <a href="/login" className="logout-link">
                    <i className="bi bi-box-arrow-right"></i> Logout
                </a>
            </nav>
        </>
    );
}