import { defesas } from "../data/defesas.js";
import { criarCard } from '../components/defesa-card.js';
import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded', () => {
    montarLayout();

        // Junta dados locais com o localstorage
    let defesasLocal = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(defesasLocal)) {
        defesasLocal = [];
    }
    let todasDefesas = [...defesas, ...defesasLocal];
    
    const main = document.querySelector(".defesas");

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario){
        Swal.fire({
            title: 'Acesso restrito',
            text: 'Você precisa estar logado primeiro!',
            icon: 'warning',
            confirmButtonText: 'Ir para Login',
            confirmButtonColor: '#0fa394',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            window.location.href = "login.html";
        });
        return;
    }

    const nomeUsuario = usuario.nome;

    const params = new URLSearchParams(window.location.search);
    const filtro = params.get("filtro");

    let defesasFiltradas = todasDefesas.filter(d => d.aluno === nomeUsuario);

    if (filtro == 'concluido') {
        defesasFiltradas = defesasFiltradas.filter(d => d.status === "Concluído" || d.status === "Recusado");
    }

    if (filtro == "andamento") {
        defesasFiltradas = defesasFiltradas.filter(d => d.status === "Em andamento" || d.status === "Aguardando");
    }


    let container = document.createElement("div");
    container.className = "cards-container";
    
    // Verifica caso contenha container e passa uma mensagem 
    if (defesasFiltradas.length === 0) {

        // Container principal
        const vazio = document.createElement("div");
        vazio.style.display = "flex";
        vazio.style.flexDirection = "column";
        vazio.style.alignItems = "center";
        vazio.style.textAlign = "center";
        vazio.style.padding = "40px";
        vazio.style.background = "#ffffff";
        vazio.style.borderRadius = "10px";
        vazio.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        vazio.style.maxWidth = "600px";
        vazio.style.margin = "40px auto";
        vazio.style.color = "#000000";

        // Texto
        const texto = document.createElement("p");
        texto.textContent = "Você ainda não possui nenhuma defesa!";
        texto.style.fontSize = "18px";
        texto.style.marginBottom = "24px";
        texto.style.color = "#000000";

        // Botões (container)
        const botoes = document.createElement("div");
        botoes.style.display = "flex";
        botoes.style.gap = "16px";

        // Voltar
        const btnVoltar = document.createElement("button");
        btnVoltar.textContent = "Voltar";
        btnVoltar.style.padding = "12px 28px";
        btnVoltar.style.borderRadius = "6px";
        btnVoltar.style.border = "none";
        btnVoltar.style.cursor = "pointer";
        btnVoltar.style.fontSize = "15px";
        btnVoltar.style.transition = "0.3s ease";
        btnVoltar.style.background = "#d9d9d9";
        btnVoltar.style.color = "#000000";

        btnVoltar.onmouseenter = () => {
            btnVoltar.style.background = "#bfbfbf";
        };
        btnVoltar.onmouseleave = () => {
            btnVoltar.style.background = "#d9d9d9";
        };

        btnVoltar.onclick = () => {
            window.location.href = "dashboard.html";
        };


        // Solicitar Defesa
        const btnSolicitar = document.createElement("button");
        btnSolicitar.textContent = "Solicitar Defesa";
        btnSolicitar.style.padding = "12px 28px";
        btnSolicitar.style.borderRadius = "6px";
        btnSolicitar.style.border = "none";
        btnSolicitar.style.cursor = "pointer";
        btnSolicitar.style.fontSize = "15px";
        btnSolicitar.style.transition = "0.3s ease";
        btnSolicitar.style.background = "#0fa394";
        btnSolicitar.style.color = "#ffffff";

        btnSolicitar.onmouseenter = () => {
            btnSolicitar.style.background = "#17c7b5";
        };
        btnSolicitar.onmouseleave = () => {
            btnSolicitar.style.background = "#0fa394";
        };

        btnSolicitar.onclick = () => {
            window.location.href = "solicitar-defesa.html";
        };

        botoes.appendChild(btnVoltar);
        botoes.appendChild(btnSolicitar);
        vazio.appendChild(texto);
        vazio.appendChild(botoes);
        container.appendChild(vazio);

        main.appendChild(container);

        // Caso tenha defesas carrega os cards normalmente
    } else {

        defesasFiltradas.forEach(defesa => {
            container.appendChild(criarCard(defesa));
        })
        
        main.appendChild(container);
    }
})
    