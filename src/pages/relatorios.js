import { montarLayout } from "../main.js"; 
import { defesas } from "../data/defesas.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Você precisa fazer login primeiro!");
  
    window.location.href = "/login.html"; 
  }

  montarLayout();
  prepararConteudoInterativo();
});


function prepararConteudoInterativo() {
  const mainElement = document.getElementById("main-content");
  if (!mainElement) return;

  const htmlInicial = `
        <h2>Relatórios de Defesas</h2>
        
        <button id="btn-pendentes" class="btn-toggle-relatorio">Exibir Relatórios Pendentes</button>
        <div id="container-pendentes" class="container-relatorio-lista"></div>
        
        <button id="btn-concluidos" class="btn-toggle-relatorio">Exibir Histórico (Concluídos)</button>
        <div id="container-concluidos" class="container-relatorio-lista"></div>

        <button id="btn-todos" class="btn-toggle-relatorio">Exibir Todos os Relatórios</button>
        <div id="container-todos" class="container-relatorio-lista"></div>
    `;
  mainElement.innerHTML = htmlInicial;

  document
    .getElementById("btn-pendentes")
    .addEventListener("click", alternarPendentes);
  document
    .getElementById("btn-concluidos")
    .addEventListener("click", alternarConcluidos);
  document.getElementById("btn-todos").addEventListener("click", alternarTodos);
}

function alternarPendentes() {
  const container = document.getElementById("container-pendentes");
  const botao = document.getElementById("btn-pendentes");
  const estaAberto = container.innerHTML !== "";

  if (estaAberto) {
    container.innerHTML = "";
    botao.textContent = "Exibir Relatórios Pendentes";
  } else {
    botao.textContent = "Ocultar Relatórios";

    const defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Em andamento";
    });

    injetarHtmlDosCards(container, defesasFiltradas, "Em andamento");
  }
}

function alternarConcluidos() {
  const container = document.getElementById("container-concluidos");
  const botao = document.getElementById("btn-concluidos");
  const estaAberto = container.innerHTML !== "";

  if (estaAberto) {
    container.innerHTML = "";
    botao.textContent = "Exibir Histórico (Concluídos)";
  } else {
    botao.textContent = "Ocultar Histórico";

    const defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Concluído";
    });

    injetarHtmlDosCards(container, defesasFiltradas, "Concluído");
  }
}

function alternarTodos() {
  const container = document.getElementById("container-todos");
  const botao = document.getElementById("btn-todos");
  const estaAberto = container.innerHTML !== "";

  if (estaAberto) {
    container.innerHTML = "";
    botao.textContent = "Exibir Todos os Relatórios";
  } else {
    botao.textContent = "Ocultar Todos";

    const defesasFiltradas = defesas;

    injetarHtmlDosCards(container, defesasFiltradas, "todos");
  }
}

/**
 cria o HTML usando os novos campos:
 * 'tema', 'aluno', 'orientador', 'data', 'horario', 'local', 'banca'
 */
function injetarHtmlDosCards(container, defesasFiltradas, statusParaFiltrar) {
  if (defesasFiltradas.length === 0) {
    const mensagem =
      statusParaFiltrar === "todos"
        ? "Nenhum item encontrado no banco de dados."
        : `Nenhum item encontrado com status "${statusParaFiltrar}".`;
    container.innerHTML = `<p>${mensagem}</p>`;
  } else {
    const htmlDosCards = defesasFiltradas.map((defesa) => {
      const classeStatus =
        defesa.status === "Em andamento" ? "status-aberto" : "status-concluida";

      const dataFormatada = new Date(defesa.data).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });

      const bancaFormatada = defesa.banca.join(", ");

      // Cria o novo HTML do card
      return `
                <div class="card-defesa">
                    <h3>${defesa.tema}</h3>
                    <p><strong>Aluno:</strong> ${defesa.aluno}</p>
                    <p><strong>Orientador:</strong> ${defesa.orientador}</p>
                    <p><strong>Data:</strong> ${dataFormatada}</p>
                    <p><strong>Horário:</strong> ${defesa.horario}</p>
                    <p><strong>Local:</strong> ${defesa.local}</p>
                    <p><strong>Banca:</strong> ${bancaFormatada}</p>
                    <p class="${classeStatus}">
                        <strong>Status:</strong> ${defesa.status}
                    </p>
                </div>
            `;
    });

    container.innerHTML = htmlDosCards.join("");
  }
}