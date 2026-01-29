'use client'

import '@/css/defesas.css'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import DefesaCard from "@/components/defesas/defesa-card";

export default function DefesasPage() {
    const searchParams = useSearchParams();
    const filtro = searchParams.get("filtro");
    const { user, perfil, loading } = useAuth();
    
    const [defesas, setDefesas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscar() {
            if (loading || !user || !perfil) {
                setCarregando(true);
                return;
            }

            let query = supabase.from("defesas").select("*");

            if (filtro === "andamento") {
                query = query.eq("status", "Em andamento");
            } else if (filtro === "concluido") {
                query = query.eq("status", "Concluída");
            }

            const { data, error } = await query;
            
            if (!error && data) {
                const defesasDoUsuario = data.filter(defesa => {
                    const ehAluno = defesa.aluno_id === user.id;
                    const ehOrientador = defesa.orientador_id === user.id;
                    return ehAluno || ehOrientador;
                });

                setDefesas(defesasDoUsuario);
            } else {
                console.error("Erro ao buscar defesas:", error);
                setDefesas([]);
            }
            
            setCarregando(false);
        }
        
        buscar();
    }, [filtro, user, perfil, loading]);

    if (carregando) return <p>Carregando...</p>;

    if (defesas.length === 0) {
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
                {defesas.map(defesa => (
                    <DefesaCard key={defesa.id} defesa={defesa} />
                ))}
            </div>
        </div>
    );
}