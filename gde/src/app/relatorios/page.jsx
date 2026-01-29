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
  const dadosGrafico = useMemo(() => {
    // Garantimos que o código não quebre se dadosAtuais for nulo
    const lista = dadosAtuais || [];
    const pendentes = lista.filter((d) => d.status === "Em andamento").length;
    const concluidas = lista.filter((d) => d.status === "Concluída").length;

    return [
      { name: "Pendentes", value: pendentes, color: "#d9534f" },
      { name: "Concluídas", value: concluidas, color: "#28a745" },
    ];
  }, [dadosAtuais]);

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
