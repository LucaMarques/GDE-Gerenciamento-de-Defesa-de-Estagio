import "../css/base.css";
import "../css/relatorios.css"; // Pode reutilizar o CSS
import "bootstrap-icons/font/bootstrap-icons.css";
import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

// Função que cria UMA linha da tabela
function criarLinhaDefesa(defesa, usuarios) {
  const aluno =
    usuarios.find((u) => u.id === defesa.alunoId)?.nome || "Não encontrado";
  const orientador =
    usuarios.find((u) => u.id === defesa.orientadorId)?.nome ||
    "Não encontrado";

  return `
        <tr>
            <td>${aluno}</td>
            <td>${orientador}</td>
            <td>${new Date(defesa.data).toLocaleDateString()}</td>
            <td><span class="status status-pendente">${
              defesa.status
            }</span></td>
        </tr>
    `;
}

// Função Principal de Renderização
function renderizarListaPendentes() {
  // Buscar dados do "banco de dados"
  const todasDefesas = JSON.parse(localStorage.getItem("defesas")) || [];
  const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // .filter() para achar só as pendentes
  const defesasPendentes = todasDefesas.filter(
    (defesa) => defesa.status === "pendente"
  );

  // .map() para transformar cada *dado* em *HTML*
  const htmlTabela = defesasPendentes
    .map((defesa) => criarLinhaDefesa(defesa, todosUsuarios))
    .join("");

  // Injetar no DOM
  const tbody = document.getElementById("lista-defesas-pendentes");
  if (defesasPendentes.length > 0) {
    tbody.innerHTML = htmlTabela;
  } else {
    tbody.innerHTML =
      '<tr><td colspan="4">Nenhuma defesa pendente encontrada.</td></tr>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Renderiza Header e Footer
  document.body.prepend(criaHeader());
  document.body.append(criaFooter());

  // Renderiza o conteúdo principal da página
  renderizarListaPendentes();
});
