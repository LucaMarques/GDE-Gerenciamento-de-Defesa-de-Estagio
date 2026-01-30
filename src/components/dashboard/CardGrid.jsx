"use client";

import Card from "./Card";

export default function CardGrid({ tipoUsuario }) {

  const opcoesPorUsuario = {
    aluno: [
      { icon: "fa-user", text: "Meus dados", pagina: "/perfil" },
      { icon: "fa-plus", text: "Solicitar defesa", pagina: "/solicitar-defesa" },
      { icon: "fa-calendar-days", text: "Agenda de defesas", pagina: "/defesas?filtro=andamento" },
      { icon: "fa-file-lines", text: "Histórico", pagina: "/defesas?filtro=concluido" }
    ],

    orientador: [
      { icon: "fa-list-check", text: "Avaliar defesas", pagina: "/aceitar-defesas" },
      { icon: "fa-calendar", text: "Minhas defesas", pagina: "/defesas" },
      { icon: "fa-chart-line", text: "Relatórios", pagina: "/relatorios" }
    ],

    coordenador: [
      { icon: "fa-users-gear", text: "Gerenciar usuários", pagina: "/usuarios" },
      { icon: "fa-clipboard-list", text: "Gerenciar defesas", pagina: "/defesas" },
      { icon: "fa-database", text: "Gerenciar dados", pagina: "/dados" },
      { icon: "fa-chart-pie", text: "Painel de estatísticas", pagina: "/estatisticas" }
    ]
  };

  const opcoes = opcoesPorUsuario[tipoUsuario] || [];

  return (
    <div className="cardsContainer">
      {opcoes.map((opcao, index) => (
        <Card
          key={index}
          icon={opcao.icon}
          text={opcao.text}
          pagina={opcao.pagina}
        />
      ))}
    </div>
  );
}
