"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CardContainer({ tipo, data }) {
  const { defesas } = useAuth(); 
  const [defesasFiltradas, setDefesasFiltradas] = useState([]);

  useEffect(() => {
    if (!defesas) return;

    let filtradas = [...defesas];

    if (tipo === "pendentes") {
      filtradas = filtradas.filter(d => d.status === "Em andamento");
    } else if (tipo === "concluidos") {
      filtradas = filtradas.filter(d => d.status === "Concluída");
    } 
    if (data) {
      filtradas = filtradas.filter(d => d.data === data);
    }

    setDefesasFiltradas(filtradas);
  }, [defesas, tipo, data]);
    
  if (!defesasFiltradas || defesasFiltradas.length === 0) {
    return <p>Nenhuma Defesa Encontrada...</p>;
  }

  return (
    <div className="container-relatorio-lista">
      {defesasFiltradas.map((item) => (
        <div key={item.id} className="card-defesa">
          <h3>{item.tema}</h3>
          <p>
            <strong>Aluno:</strong> {item.aluno?.nome_completo}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                item.status === "Em andamento"
                  ? "status-pendente"
                  : "status-concluido"
              }
            >
              {item.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
