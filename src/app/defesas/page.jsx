'use client'

import '@/css/defesas.css'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import DefesaCard from "@/components/defesa-card";

export default function DefesasPage() {
    const [filtro, setFiltro] = useState(null);
    const { user, perfil, loading, defesas, logoutRef } = useAuth();
    const [defesasFiltradas, setDefesasFiltradas] = useState([]);
    const { mostrarModal } = useModal();
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFiltro(params.get("filtro"));
    }, []);

    useEffect(() => {
        if (loading || !user || !perfil) return;

        let filtradas = defesas || [];

        if (filtro === "andamento") {
            filtradas = filtradas.filter(d => d.status === "Em andamento");
        } else if (filtro === "concluido") {
            filtradas = filtradas.filter(d => d.status === "Concluída");
        }

        setDefesasFiltradas(filtradas);

    }, [filtro, user, perfil, loading, defesas]);

    if (loading) return <p>Carregando...</p>;

    if (!loading && !user && !logoutRef.current) {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Você precisa fazer login primeiro!",
                tipo: "warning"
            });
      router.push("/");
    }

    if (defesasFiltradas.length === 0) {
        return (
            <div className='defesas'>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Nenhuma defesa encontrada para você.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='defesas'>
            <div className='cards-container'>
                {defesasFiltradas.map(defesa => (
                    <DefesaCard key={defesa.id} defesa={defesa} />
                ))}
            </div>
        </div>
    );
}