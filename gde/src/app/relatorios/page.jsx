"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import CardContainer from "@/components/relatorios/CardContainer";
import "./relatorios.css";

export default function RelatoriosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");

  const { user, loading } = useAuth(); // Pega os dados do Supabase Auth
  const { mostrarModal } = useModal(); // Pega a função pra setar os dados de ModalContext
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        mostrarModal({
          titulo: "Acesso restrito",
          mensagem:
            "Você precisa fazer login para acessar os relatórios de defesas.",
          tipo: "warning",
          aoConfirmar: () => {
            router.push("/");
          },
        });
      }
    }
  }, [user, loading, mostrarModal, router]);

  if (loading) return <p className="main-wrapper">Verificando permissões...</p>;

  if (!user) return null;

  return (
    <main className="main-wrapper">
      <div className="relatorio-container">
        <h2>Relatórios de Defesas</h2>

        <div className="relatorio-controles">
          <select
            className="select-relatorio"
            value={statusSelecionado}
            onChange={(e) => setStatusSelecionado(e.target.value)}
          >
            <option value="">-- Selecione um tipo --</option>
            <option value="pendentes">Relatórios Pendentes</option>
            <option value="concluidos">Relatórios Concluídos</option>
            <option value="todos">Todos os Relatórios</option>
          </select>

          <input
            type="date"
            className="input-data"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>

        {statusSelecionado && (
          <CardContainer tipo={statusSelecionado} data={dataSelecionada} />
        )}
      </div>
    </main>
  );
}
