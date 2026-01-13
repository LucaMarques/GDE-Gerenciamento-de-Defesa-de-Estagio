"use client";

import { useState } from "react";
import CardContainer from "@/components/relatorios/CardContainer";
import "./relatorios.css";

export default function RelatoriosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");

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
