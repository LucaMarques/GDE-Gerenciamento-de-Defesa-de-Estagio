'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function DefesaCard({defesa}){
    const { defesas } = useAuth();
    
    const nomeAluno = defesa.aluno?.nome_completo || "N/A";
    const nomeProfessor = defesa.orientador?.nome_completo || "N/A";



    const dataObj = new Date(defesa.data);
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
    const dia = dataObj.getUTCDate();
    const mes = meses[dataObj.getUTCMonth()];

    return(
        <div className='card'>
            <div className="container-data">
                <p className="dia">{dia}</p>
                <p>{mes}</p>
            </div>
            <div className="container-info">
                <h3>{nomeAluno}</h3>
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