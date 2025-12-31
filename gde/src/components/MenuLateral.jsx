"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function MenuLateral({}){
    const [aberto, setAberto] = useState(false);
    const router = useRouter();
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout();
        router.push('/')
    }

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

                <a onClick={handleLogout} className="logout-link">
                    <i className="bi bi-box-arrow-right"></i> Logout
                </a>
            </nav>
        </>
    );
}