import { defesas } from "../data/defesas.js";
import { criarCard } from '../components/defesa-card.js';
import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded', () => {
    montarLayout();
    
    const main = document.querySelector(".defesas");
    let container = document.createElement("div");
    container.className = "cards-container";
    
    defesas.forEach(defesa => {
        const aux = criarCard(defesa);
        container.appendChild(aux);
    })
    
    main.appendChild(container);
})
    