import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/base.css'
import { criaHeader } from "../components/header.js";
import { criaFooter } from "../components/footer.js";
import { defesas } from "../data/defesas.js";
import { criarCard } from '../components/defesa-card.js';

const header = criaHeader();
const footer = criaFooter();
document.body.prepend(header);
document.body.append(footer);

const main = document.querySelector(".defesas");
let container = document.createElement("div");
container.className = "cards-container";

defesas.forEach(defesa => {
    const aux = criarCard(defesa);
    container.appendChild(aux);
})

main.appendChild(container);
