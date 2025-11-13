import { defesas } from "../data/defesas.js";
import { criarCard } from '../components/defesa-card.js';
import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded', () => {
    montarLayout();
    
    const main = document.querySelector(".defesas");

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario){
        alert("Você precisar estar logado primeiro!");
        window.location.href="login.html";
        return;
    }

    const nomeUsuario = usuario.nome;

    const params = new URLSearchParams(window.location.search);
    const filtro = params.get("filtro");

    let defesasFiltradas = defesas.filter(d => d.aluno === nomeUsuario);

    if (filtro == 'concluido') {
        defesasFiltradas = defesasFiltradas.filter(d => d.status === "Concluído");
    }

    if (filtro == "andamento") {
        defesasFiltradas = defesasFiltradas.filter(d => d.status === "Em andamento");
    }


    let container = document.createElement("div");
    container.className = "cards-container";
    
    defesasFiltradas.forEach(defesa => {
        container.appendChild(criarCard(defesa));
    })
    
    main.appendChild(container);
})
    