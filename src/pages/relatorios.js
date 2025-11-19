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
    <div class="relatorio-container">
        <h2>Relatórios de Defesas</h2>
        
        <div class="relatorio-controles">
            <select id="select-relatorio">
                <option value="">-- Selecione um tipo de relatório --</option>
                <option value="pendentes">Relatórios Pendentes</option>
                <option value="concluidos">Histórico (Concluídos)</option>
                <option value="todos">Todos os Relatórios</option>
            </select>

            <input type="date" id="input-data">
        </div>

        <div id="container-resultados" class="container-relatorio-lista"></div>
    </div>
    `;
  mainElement.innerHTML = htmlInicial;

  document
    .getElementById("select-relatorio")
    .addEventListener("change", exibirRelatorios);
  
  document
    .getElementById("input-data")
    .addEventListener("change", exibirRelatorios);
}

function exibirRelatorios() {
  const valorStatus = document.getElementById("select-relatorio").value;
  const valorData = document.getElementById("input-data").value;
  const container = document.getElementById("container-resultados");

  let defesasFiltradas = [];
  let statusParaMensagem = valorStatus;

  // Filtro por Status ---
  if (valorStatus === "pendentes") {
    defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Em andamento";
    });
    statusParaMensagem = "Em andamento";
  } else if (valorStatus === "concluidos") {
    defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Concluído";
    });
    statusParaMensagem = "Concluído";
  } else if (valorStatus === "todos") {
    defesasFiltradas = defesas;
    statusParaMensagem = "todos";
  } else {
    container.innerHTML = "";
    return;
  }

  // Filtro por Data 
  if (valorData) { 
    defesasFiltradas = defesasFiltradas.filter((defesa) => {
      const dataDoBancoLimpa = defesa.data.split('T')[0];

      return dataDoBancoLimpa === valorData;
    });
  }

  injetarHtmlDosCards(container, defesasFiltradas, statusParaMensagem);
}

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

      // Formatação visual da data (dia/mês/ano), new Data transforma o texto simples
      //para um objeto data, para assim conseguir ultilizar .toLocaleDateString
      const dataFormatada = new Date(defesa.data).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });

      const bancaFormatada = defesa.banca.join(", ");

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