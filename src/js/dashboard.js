import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/base.css'
import usuariosBase from '../data/usuarios.json'
import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

document.getElementById("header").appendChild(criaHeader());
document.getElementById("footer").appendChild(criaFooter());

// Tem que pegar  dps o tipo do localStorage 
const tipoUsuario = localStorage.getItem("tipoUsuario") || "aluno";

const cardsContainer = document.getElementById("cardsContainer");
const titulo = document.getElementById("tituloUsuario");

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

const nomeUsuario = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);
titulo.textContent = `Painel do ${nomeUsuario}`;

opcoesPorUsuario[tipoUsuario].forEach(opcao => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <i class="fa-solid ${opcao.icon}"></i>
    <p>${opcao.text}</p>
  `;
  cardsContainer.appendChild(card);
});
