"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function EstatisticasContainer({
  dadosAtuais,
  statusSelecionado,
}) {
  // Estados internos (exclusivos do Card 3)
  const [dataInicioLocal, setDataInicioLocal] = useState("");
  const [dataFimLocal, setDataFimLocal] = useState("");

  // --- LÓGICA DE FILTRAGEM LOCAL (AMOSTRA) ---
  const dadosFiltradosLocal = useMemo(() => {
    return (dadosAtuais || []).filter((defesa) => {
      const dataDefesa = defesa.data;
      const passaInicio = dataInicioLocal
        ? dataDefesa >= dataInicioLocal
        : true;
      const passaFim = dataFimLocal ? dataDefesa <= dataFimLocal : true;
      return passaInicio && passaFim;
    });
  }, [dadosAtuais, dataInicioLocal, dataFimLocal]);

  // --- CÁLCULOS DE REPRESENTAÇÃO ---
  const totalNoUniverso = dadosAtuais.length;
  const totalNoPeriodo = dadosFiltradosLocal.length;
  const foraDoPeriodo = totalNoUniverso - totalNoPeriodo;

  const porcentagemRepresentada =
    totalNoUniverso > 0
      ? ((totalNoPeriodo / totalNoUniverso) * 100).toFixed(1)
      : 0;

  // --- DADOS PARA O RECHARTS ---
  const dadosGrafico = useMemo(
    () => [
      { name: "No Período", value: totalNoPeriodo, color: "#004a91" },
      { name: "Fora do Período", value: foraDoPeriodo, color: "#e0e0e0" },
    ],
    [totalNoPeriodo, foraDoPeriodo],
  );

  return (
    <div className="card-estatisticas-container">
      <div className="header-estatisticas">
        <h2>Estatísticas Gerais</h2>

        {/* SELETOR DE PERÍODO LOCAL */}
        <div className="filtro-periodo-container">
          <span>Filtrar período:</span>
          <input
            type="date"
            value={dataInicioLocal}
            onChange={(e) => setDataInicioLocal(e.target.value)}
            className="input-data-small"
          />
          <span>até</span>
          <input
            type="date"
            value={dataFimLocal}
            onChange={(e) => setDataFimLocal(e.target.value)}
            className="input-data-small"
          />
          {(dataInicioLocal || dataFimLocal) && (
            <button
              className="btn-limpar-filtro"
              onClick={() => {
                setDataInicioLocal("");
                setDataFimLocal("");
              }}
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      <div className="estatisticas-grid">
        <div className="estatistica-item">
          <span>Total Selecionado ({statusSelecionado})</span>
          <strong>{totalNoUniverso}</strong>
        </div>
        <div className="estatistica-item periodo-destaque">
          <span>No Período Filtrado</span>
          <strong>{totalNoPeriodo}</strong>
        </div>
        <div className="estatistica-item porcentagem">
          <span>Representação</span>
          <strong>{porcentagemRepresentada}%</strong>
        </div>
      </div>

      <div className="grafico-container" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dadosGrafico}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {dadosGrafico.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
