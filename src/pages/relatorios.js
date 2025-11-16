import { montarLayout } from "../main.js";
import { defesas } from "../data/defesas.js";

document.addEventListener("DOMContentLoaded", () => {
  // Funções de Login e Layout 
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "/login.html";
  }
  montarLayout();

  // Lógica da página
  prepararConteudoInterativo();
});

function prepararConteudoInterativo() {
  const mainElement = document.getElementById("main-content");
  if (!mainElement) return;

  // Cria o HTML com o campo de seleção e o <input type="date"> 
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

  // Adiciona os "escutadores" de eventos
  // Ambo o <select> e o <input> vão chamar a MESMA função
  document
    .getElementById("select-relatorio")
    .addEventListener("change", exibirRelatorios);
  
  document
    .getElementById("input-data")
    .addEventListener("change", exibirRelatorios);
}

// função filtra por STATUS e por DATA
function exibirRelatorios() {
  // 1. Pega o valor dos DOIS controles
  const valorStatus = document.getElementById("select-relatorio").value;
  const valorData = document.getElementById("input-data").value;
  const container = document.getElementById("container-resultados");

  let defesasFiltradas = [];
  let statusParaMensagem = valorStatus;

  // Filtrar por Status
  // o filtro principal e obrigatório
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
    // Se o usuário selecionar a opção "-- Selecione..." (valor "")
    container.innerHTML = ""; // Limpa o container
    return; // Para a execução
  }

  // Filtrar por Data
  // Este filtro é opcional e só é executado se uma data for escolhida
  if (valorData) { // Se 'valorData' NÃO estiver vazio 
    defesasFiltradas = defesasFiltradas.filter((defesa) => {
      // Compara a data da defesa com a data do input
      return defesa.data === valorData;
    });
  }

  // Chama a função original para construir os cards!
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