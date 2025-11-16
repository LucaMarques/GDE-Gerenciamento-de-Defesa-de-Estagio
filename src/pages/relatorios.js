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

// MUDANÇA TOTAL AQUI
function prepararConteudoInterativo() {
  const mainElement = document.getElementById("main-content");
  if (!mainElement) return;

  // 1. Cria o novo HTML com o <select> e um *único* container
  const htmlInicial = `
        <h2>Relatórios de Defesas</h2>
        
        <select id="select-relatorio">
            <option value="">-- Selecione um tipo de relatório --</option>
            <option value="pendentes">Relatórios Pendentes</option>
            <option value="concluidos">Histórico (Concluídos)</option>
            <option value="todos">Todos os Relatórios</option>
        </select>

        <div id="container-resultados" class="container-relatorio-lista"></div>
    `;
  mainElement.innerHTML = htmlInicial;

  // 2. Adiciona um "escutador" para o evento de MUDANÇA no select
  document
    .getElementById("select-relatorio")
    .addEventListener("change", exibirRelatorios);
}

// NOVA FUNÇÃO: Chamada sempre que o usuário muda a opção do select
function exibirRelatorios(event) {
  // 1. Pega o valor da opção selecionada (ex: "pendentes", "concluidos")
  const valorSelecionado = event.target.value;
  const container = document.getElementById("container-resultados");

  let defesasFiltradas = [];
  let statusParaMensagem = valorSelecionado;

  // 2. Filtra o array 'defesas' com base no valor selecionado
  if (valorSelecionado === "pendentes") {
    defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Em andamento";
    });
    statusParaMensagem = "Em andamento";

  } else if (valorSelecionado === "concluidos") {
    defesasFiltradas = defesas.filter((defesa) => {
      return defesa.status === "Concluído";
    });
    statusParaMensagem = "Concluído";

  } else if (valorSelecionado === "todos") {
    defesasFiltradas = defesas; // Pega todos, sem filtro
    statusParaMensagem = "todos";
    
  } else {
    // Se o usuário selecionar a opção "-- Selecione..." (valor "")
    container.innerHTML = ""; // Limpa o container
    return; // Para a execução
  }

  // 3. Chama a sua função original para construir os cards!
  // Ela funciona perfeitamente aqui.
  injetarHtmlDosCards(container, defesasFiltradas, statusParaMensagem);
}


/* ==================================================================
   SUA LÓGICA DE "FÁBRICA DE CARDS" (NÃO FOI ALTERADA)
   Esta função é a mesma de antes e não precisa de NENHUMA mudança.
   Ela apenas recebe a lista filtrada e o container, e faz o trabalho.
  ==================================================================
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