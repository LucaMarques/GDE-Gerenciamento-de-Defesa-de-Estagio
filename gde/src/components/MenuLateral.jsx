"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";

export default function MenuLateral({}){
    const [aberto, setAberto] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();
    const { mostrarModal } = useModal();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setAberto(false);

            router.replace('/');
            
            mostrarModal({
                titulo: "Desconectado com Sucesso",
                mensagem: "Você foi desconectado da sua conta. Até logo!",
                tipo: "success"
            });
        } catch (err) {
            console.error("Erro ao desconectar:", err);
            mostrarModal({
                titulo: "Erro ao Desconectar ❌",
                mensagem: "Houve um erro ao desconectar. Tente novamente.",
                tipo: "error",
            });
        } finally {
            setLoading(false);
        }
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

                <a onClick={handleLogout} className="logout-link cursor-pointer" disabled={loading}>
                    <i className="bi bi-box-arrow-right"></i> {loading ? 'Desconectando...' : 'Logout'}
                </a>
            </nav>
        </>
    );
}