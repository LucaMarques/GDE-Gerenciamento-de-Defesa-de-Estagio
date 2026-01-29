'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DefesaCard({defesa}){
    const [nome, setNome] = useState("Carregando...");
    const [nomeProfessor, setNomeProfessor] = useState(defesa.orientador || "N/A");

    useEffect(() => {
        async function buscarNomes() {
            if (defesa.aluno_id) {
                const { data: aluno } = await supabase
                    .from("profiles")
                    .select("nome_completo")
                    .eq("id", defesa.aluno_id)
                    .single();
                
                if (aluno) setNome(aluno.nome_completo);
            }
        }

        buscarNomes();
    }, [defesa.aluno_id]);

    const data = new Date(defesa.data);
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
    const dia = data.getDate();
    const mes = meses[data.getMonth()];

    return(
        <div className='card'>
            <div className="container-data">
                <p className="dia">{dia}</p>
                <p>{mes}</p>
            </div>
            <div className="container-info">
                <h3>{nome}</h3>
                <div>
                    <p>Orientador: {nomeProfessor}</p>
                    <p>Status: <span>{defesa.status}</span></p>
                    <p>Horário: {defesa.horario}</p>
                    <p>Local: {defesa.local}</p>
                </div>
            </div>
        </div>
    )
}