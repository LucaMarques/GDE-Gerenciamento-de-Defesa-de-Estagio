import { defesas } from "../data/defesas.js";
import { montarLayout } from "../main.js";
import { enviarNotificacao } from "../components/notificacao.js";
import { usuariosBase } from "../data/usuarios.js";

document.addEventListener("DOMContentLoaded", () => {
    montarLayout();

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario || usuario.tipo !== "orientador") {
        alert("Acesso permitido apenas para orientadores.");
        window.location.href = "login.html";
        return;
    }

    const mainList = document.getElementById("lista-defesas");
    let defesasLocal = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(defesasLocal)) {
        defesasLocal = [];
    }
    let todasDefesas = [...defesas, ...defesasLocal];

    // Filtra apenas as que foram enviadas para este orientador
    const recebidas = todasDefesas.filter(
        d => d.orientador === usuario.nome && d.status === "Aguardando"
    );

    // Se não houver solicitações
    if (recebidas.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "Nenhuma solicitação pendente.";
        msg.style.textAlign = "center";
        msg.style.fontSize = "18px";
        mainList.appendChild(msg);
    } else {
        // Se houver cria os cards
        recebidas.forEach((defesa, index) => {
            const card = document.createElement("div");
            card.classList.add("card-defesa");

            card.innerHTML = `
                <h3 class="card-titulo">${defesa.tema}</h3>
                <p class="card-info"><strong>Aluno:</strong> ${defesa.aluno}</p>
                <p class="card-info"><strong>Status:</strong> ${defesa.status}</p>
            `;

            const botoes = document.createElement("div");
            botoes.classList.add("card-botoes");

            // Botão aceitar
            const btnAceitar = document.createElement("button");
            btnAceitar.textContent = "Aceitar";
            btnAceitar.classList.add("botao", "aceitar");
            btnAceitar.onclick = () => atualizarStatus(defesa, "Em andamento");

            // Botão recusar
            const btnRecusar = document.createElement("button");
            btnRecusar.textContent = "Recusar";
            btnRecusar.classList.add("botao", "recusar");
            btnRecusar.onclick = () => atualizarStatus(defesa, "Recusado");

            botoes.appendChild(btnAceitar);
            botoes.appendChild(btnRecusar);

            card.appendChild(botoes);
            mainList.appendChild(card);
        });
    }
});

// Altera os status e salva no Local Storage
function atualizarStatus(defesa, novoStatus) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    let lista = JSON.parse(localStorage.getItem("defesas"));

    if (!Array.isArray(lista)) {
        lista = [];
    }
    let item = lista.find(d => d.aluno === defesa.aluno && d.tema === defesa.tema);

    // Já existe no localStorage (pois poderia estar apenas no json, nesse caso não iria fazer nada)
    if (item) {
        item.status = novoStatus;
    } else {
        // Cria no localStorage caso venha do json
        lista.push({
            ...defesa,
            status: novoStatus
        });
    }

    localStorage.setItem("defesas", JSON.stringify(lista));

    // Determinar mensagem e tipo de notificação
    let statusTexto;
    let tipoNotif;
    
    if (novoStatus === "Recusado") {
        statusTexto = "recusada";
        tipoNotif = "alerta";
    } else {
        statusTexto = "aceita";
        tipoNotif = "sucesso";
    }

    // Envia notificação de aceitação para aluno
    const mensagemAluno = `Sua defesa sobre "${defesa.tema}" foi ${statusTexto} pelo orientador ${usuario.nome}.`;
    enviarNotificacao(defesa.aluno, mensagemAluno, tipoNotif);
    
    // Envia notificação de aceitação para coordenador
    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || usuariosBase;
    const coordenadores = usuariosArmazenados.filter(u => u.tipo === "coordenador");
            
    coordenadores.forEach(coordenador => {
        const mensagemCoordenador = `A defesa de ${defesa.aluno} sobre "${defesa.tema}" foi ${statusTexto} pelo orientador ${usuario.nome}.`;
        enviarNotificacao(coordenador.nome, mensagemCoordenador, tipoNotif);
    });

    alert("Status atualizado!");
    location.reload();
}
