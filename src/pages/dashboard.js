import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded'  , () => {
  montarLayout();

  // Verificando o tipo de usuario
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html";
  }

  const tipoUsuario = usuarioLogado.tipo; 
  const nome = usuarioLogado.nome;

  const cardsContainer = document.getElementById("cardsContainer");
  const titulo = document.getElementById("tituloUsuario");

  // Testando persistencia de dado vendo se muda o nome no painel
  const nomeDisplay = document.getElementById("nomeUsuario");
  if (nomeDisplay) nomeDisplay.textContent = nome;

  // Cards conforme o tipo
  const opcoesPorUsuario = {
    aluno: [
      { icon: "fa-user", text: "Meus dados" },
      { icon: "fa-plus", text: "Solicitar defesa" },
      { icon: "fa-calendar-days", text: "Agenda de defesas" },
      { icon: "fa-file-lines", text: "Histórico" }
    ],
    orientador: [
      { icon: "fa-list-check", text: "Avaliar defesas" },
      { icon: "fa-calendar", text: "Minhas defesas" },
      { icon: "fa-chart-line", text: "Relatórios" }
    ],
    coordenador: [
      { icon: "fa-users-gear", text: "Gerenciar usuários" },
      { icon: "fa-clipboard-list", text: "Gerenciar defesas" },
      { icon: "fa-database", text: "Gerenciar dados" },
      { icon: "fa-chart-pie", text: "Painel de estatísticas" }
    ]
  };

  // Muda o titulo da pagina de acordo o tipo do usuario
  const nomeTipo = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);
  if (titulo) titulo.textContent = `Painel do ${nomeTipo}`;

  // Gera os cards conforme o tipo do usuário
  opcoesPorUsuario[tipoUsuario].forEach(opcao => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <i class="fa-solid ${opcao.icon}"></i>
      <p>${opcao.text}</p>
    `;
    cardsContainer.appendChild(card);
  });
});
