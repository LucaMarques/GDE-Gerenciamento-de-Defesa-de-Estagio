"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import CardContainer from "@/components/relatorios/CardContainer";
import EstatisticasContainer from "@/components/relatorios/EstatisticasContainer";
import "@/css/relatorios.css";

export default function RelatoriosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [exibirEstatisticas, setExibirEstatisticas] = useState(false);
  const [dadosAtuais, setDadosAtuais] = useState([]);

  const { user, loading, logoutRef } = useAuth(); 
  const { mostrarModal } = useModal(); 
  const router = useRouter();

  return (
    <main className="main-wrapper">
      {/* CARD 1 - SELEÇÃO */}
      <div className="relatorio-container">
        <h2>Relatórios de Defesas</h2>
        <div className="relatorio-controles">
          <select
            className="select-relatorio"
            value={statusSelecionado}
            onChange={(e) => {
              setStatusSelecionado(e.target.value);
              setExibirEstatisticas(false);
            }}
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
            onChange={(e) => {
              setDataSelecionada(e.target.value);
              setExibirEstatisticas(false);
            }}
          />
        </div>
        <button
          className="btn-adicionar-defesa"
          onClick={() => router.push("/aceitar-defesas")}
        >
          + Aceitar novas defesas
        </button>
      </div>

      {/* EXIBIÇÃO DOS CARDS 2 E 3 */}
      {statusSelecionado && (
        <div
          className={
            exibirEstatisticas
              ? "layout-lado-a-lado"
              : "relatorio-resultados-card"
          }
        >
          {/* CARD 3 - ESTATÍSTICAS*/}
          {exibirEstatisticas && (
            <EstatisticasContainer
              statusSelecionado={statusSelecionado}
            />
          )}

          {/* CARD 2 - RESULTADOS */}
          <div className={exibirEstatisticas ? "card-resultados-coluna" : ""}>
            <CardContainer
              tipo={statusSelecionado}
              data={dataSelecionada}
              onGerarEstatistica={() => setExibirEstatisticas(true)}
              estatisticasAtivas={exibirEstatisticas}
              onDadosCarregados={(dados) => setDadosAtuais(dados)}
            />
          </div>
        </div>
      )}
    </main>
  );
}