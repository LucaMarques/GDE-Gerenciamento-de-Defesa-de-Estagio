"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CardContainer({
  tipo,
  data,
  onGerarEstatistica,
  estatisticasAtivas,
  onDadosCarregados,
}) {
  const { defesas } = useAuth(); 
  const [defesasFiltradas, setDefesasFiltradas] = useState([]);
  const [erro, setErro] = useState("");

  const titulos = {
    pendentes: "Defesas em Aberto",
    concluidos: "Defesas Concluídas",
    todos: "Todas as Defesas",
  };

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
      {!estatisticasAtivas && (
        <button className="btn-gerar-estatistica" onClick={onGerarEstatistica}>
          Gerar Estatísticas destes Resultados
        </button>
      )}
      <h2 className="titulo-resultados">
        {titulos[tipo]}
        {data &&
          ` em ${new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}`}
      </h2>
      {defesasFiltradas.map((item) => (
        <div key={item.id} className="card-defesa">
          <h3>{item.tema}</h3>
          <p>
            <strong>Aluno:</strong>{" "}
            {item.aluno?.nome_completo || "Nome não encontrado"}
          </p>
          <p>
            <strong>Data:</strong> {item.data}
          </p>
          <p>
            <strong>Orientador:</strong>{" "}
            {item.orientador?.nome_completo || "Não informado"}
          </p>
          <p>
            <strong>Banca:</strong>{" "}
            {item.banca ? item.banca.join(", ") : "Não informada"}
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