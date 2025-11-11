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

  return `
        <tr>
            <td>${aluno}</td>
            <td>${orientador}</td>
            <td>${new Date(defesa.data).toLocaleDateString()}</td>
            <td>
              <span class="status status-pendente">${defesa.status}</span>
            </td>
        </tr>
    `;
}

function renderizarListaPendentes() {
  const todasDefesas = JSON.parse(localStorage.getItem("defesas")) || [];
  const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const defesasPendentes = todasDefesas.filter(
    (defesa) => defesa.status === "pendente"
  );

  const htmlTabela = defesasPendentes
    .map((defesa) => criarLinhaDefesa(defesa, todosUsuarios))
    .join("");

  const tbody = document.getElementById("lista-defesas-pendentes");
  if (defesasPendentes.length > 0) {
    tbody.innerHTML = htmlTabela;
  } else {
    tbody.innerHTML =
      '<tr><td colspan="4">Nenhuma defesa pendente encontrada.</td></tr>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.prepend(criaHeader());
  document.body.append(criaFooter());

  renderizarListaPendentes();

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
      console.warn("Elementos do menu lateral não encontrados (pendentes.js).");
    }
  } catch (e) {
    console.error("Erro ao configurar menu lateral (pendentes.js):", e);
  }
});
