"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CardContainer({
  tipo,
  data,
  onGerarEstatistica,
  estatisticasAtivas,
  onDadosCarregados,
}) {
  const [defesas, setDefesas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const titulos = {
    pendentes: "Defesas em Aberto",
    concluidos: "Defesas Concluídas",
    todos: "Todas as Defesas",
  };

  useEffect(() => {
    getDefesas();
  }, [tipo, data]);

  async function getDefesas() {
    setCarregando(true);

    let query = supabase.from("defesas").select(`
    *,
    aluno:profiles!defesas_aluno_id_fkey(nome_completo),
    orientador:profiles!defesas_orientador_id_fkey(nome_completo)
  `);

    if (tipo === "pendentes") {
      query = query.eq("status", "Em andamento");
    } else if (tipo === "concluidos") {
      query = query.eq("status", "Concluída");
    }

    if (data) {
      query = query.eq("data", data);
    }

    const { data: resultado, error } = await query;

    console.log("Filtros aplicados - Tipo:", tipo, "Data:", data);
    console.log("O que o Supabase devolveu:", resultado);

    if (error) {
      setErro(error.message);
    } else {
      setDefesas(resultado);
      if (onDadosCarregados) {
        onDadosCarregados(resultado);
      }
    }

    setCarregando(false);
  }

  if (carregando) return <p>Carregando Defesas...</p>;
  if (erro !== "") return <p style={{ color: "red" }}>Erro: {erro}</p>;
  if (defesas.length === 0) return <p>Nenhuma Defesa Encontrada...</p>;

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
      {defesas.map((item) => (
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
