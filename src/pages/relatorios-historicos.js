import "../css/base.css";
import "../css/relatorios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

function criarLinhaDefesa(defesa, usuarios) {
  const aluno =
    usuarios.find((u) => u.id === defesa.alunoId)?.nome ||
    `ID: ${defesa.alunoId}`;
  const orientador =
    usuarios.find((u) => u.id === defesa.orientadorId)?.nome ||
    `ID: ${defesa.orientadorId}`;

  let statusClass = "status-pendente";
  if (defesa.status === "aprovada") statusClass = "status-aprovada";
  if (defesa.status === "reprovada") statusClass = "status-reprovada";

  return `
        <tr>
            <td>${aluno}</td>
            <td>${orientador}</td>
            <td>${new Date(defesa.data).toLocaleDateString()}</td>
            <td>
              <span class="status ${statusClass}">${defesa.status}</span>
            </td>
        </tr>
    `;
}

function renderizarHistorico() {
  const todasDefesas = JSON.parse(localStorage.getItem("defesas")) || [];
  const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const defesasHistorico = todasDefesas;

  const htmlTabela = defesasHistorico
    .map((defesa) => criarLinhaDefesa(defesa, todosUsuarios))
    .join("");

  const tbody = document.getElementById("lista-historico");
  if (defesasHistorico.length > 0) {
    tbody.innerHTML = htmlTabela;
  } else {
    tbody.innerHTML =
      '<tr><td colspan="4">Nenhum registro encontrado.</td></tr>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.prepend(criaHeader());
  document.body.append(criaFooter());

  renderizarHistorico();

  try {
    const btnMenu = document.getElementById("btn-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const btnFechar = document.getElementById("btn-fechar");

    if (btnMenu && menuLateral && btnFechar) {
      btnMenu.addEventListener("click", () => {
        menuLateral.style.width = "250px";
      });

      btnFechar.addEventListener("click", () => {
        menuLateral.style.width = "0";
      });
    } else {
      console.warn("Elementos do menu lateral não encontrados (historico.js).");
    }
  } catch (e) {
    console.error("Erro ao configurar menu lateral (historico.js):", e);
  }
});
