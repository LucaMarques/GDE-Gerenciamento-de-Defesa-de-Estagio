"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import CardContainer from "@/components/relatorios/CardContainer";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import "../../css/relatorios.css";

export default function RelatoriosPage() {
  const [statusSelecionado, setStatusSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [exibirEstatisticas, setExibirEstatisticas] = useState(false);

  const [dadosAtuais, setDadosAtuais] = useState([]);
  const [dataInicioLocal, setDataInicioLocal] = useState("");
  const [dataFimLocal, setDataFimLocal] = useState("");

  // --- LÓGICA DE FILTRAGEM LOCAL ---
  const dadosFiltradosLocal = useMemo(() => {
    return dadosAtuais.filter((defesa) => {
      const dataDefesa = defesa.data; // Formato AAAA-MM-DD

      // Se não houver filtros locais, mantém o item
      const passaInicio = dataInicioLocal
        ? dataDefesa >= dataInicioLocal
        : true;
      const passaFim = dataFimLocal ? dataDefesa <= dataFimLocal : true;

      return passaInicio && passaFim;
    });
  }, [dadosAtuais, dataInicioLocal, dataFimLocal]);

  // --- ATUALIZAMOS O GRÁFICO PARA USAR OS DADOS FILTRADOS ---
  const dadosGrafico = useMemo(() => {
    const totalNoUniverso = dadosAtuais.length;
    const totalNoPeriodo = dadosFiltradosLocal.length;
    const foraDoPeriodo = totalNoUniverso - totalNoPeriodo;

    return [
      { name: "No Período", value: totalNoPeriodo, color: "#004a91" }, // Azul (mesma cor do seletor)
      { name: "Fora do Período", value: foraDoPeriodo, color: "#e0e0e0" }, // Cinza neutro
    ];
  }, [dadosAtuais, dadosFiltradosLocal]);

  // Cálculos para o Grid
  const totalFiltrado = dadosFiltradosLocal.length;
  const pendentesFiltrado = dadosFiltradosLocal.filter(
    (d) => d.status === "Em andamento",
  ).length;
  const concluidasFiltrado = dadosFiltradosLocal.filter(
    (d) => d.status === "Concluída",
  ).length;

  const porcentagemRepresentada =
    totalFiltrado > 0
      ? ((totalFiltrado / dadosAtuais.length) * 100).toFixed(1)
      : 0;

  const { user, loading } = useAuth();
  const { mostrarModal } = useModal();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading) {
  //     if (!user) {
  //       mostrarModal({
  //         titulo: "Acesso restrito",
  //         mensagem:
  //           "Você precisa fazer login para acessar os relatórios de defesas.",
  //         tipo: "warning",
  //         aoConfirmar: () => {
  //           router.push("/");
  //         },
  //       });
  //     }
  //   }
  // }, [user, loading, mostrarModal, router]);
  // if (loading) return <p className="main-wrapper">Verificando permissões...</p>;
  // if (!user) return null;
  return (
    <main className="main-wrapper">
      {/* CARD 1: SELEÇÃO */}
      <div className="relatorio-container">
        <h2>Relatórios de Defesas</h2>
        <div className="relatorio-controles">
          <select
            className="select-relatorio"
            value={statusSelecionado}
            onChange={(e) => {
              setStatusSelecionado(e.target.value);
              setExibirEstatisticas(false); // Reseta ao mudar o filtro
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
          onClick={() => router.push("/solicitar-defesa")}
        >
          + Adicionar Nova Defesa
        </button>
      </div>

      {/* LÓGICA DE EXIBIÇÃO DOS CARDS 2 E 3 */}
      {statusSelecionado && (
        <div
          className={
            exibirEstatisticas
              ? "layout-lado-a-lado"
              : "relatorio-resultados-card"
          }
        >
          {/* CARD 3: ESTATÍSTICAS */}
          {exibirEstatisticas && (
            <div className="card-estatisticas-container">
              <h2>Estatísticas Gerais</h2>
              {/* --- SELETOR DE PERÍODO LOCAL --- */}
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
              <div className="estatisticas-grid">
                <div className="estatistica-item">
                  <span>Total Selecionado ({statusSelecionado})</span>
                  <strong>{dadosAtuais.length}</strong>
                </div>
                <div className="estatistica-item periodo-destaque">
                  <span>No Período Filtrado</span>
                  <strong>{totalFiltrado}</strong>
                </div>
                <div className="estatistica-item porcentagem">
                  <span>Representação</span>
                  <strong>{porcentagemRepresentada}%</strong>
                </div>
              </div>
              <div
                className="grafico-container"
                style={{ width: "100%", height: 300 }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={dadosGrafico}
                      cx="50%"
                      cy="50%"
                      innerRadius={60} // Transforma em um gráfico de rosca (Donut)
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
          )}

          {/* CARD 2: RESULTADOS (Aparece na direita ou centralizado - 30% se ativo) */}
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
