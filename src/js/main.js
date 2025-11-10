import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/base.css'
import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    // Cria o header e o footer em todas as páginas
    const header = criaHeader();
    const footer = criaFooter();

    // Adiciona no inicio e no final do body
    document.body.prepend(header);
    document.body.append(footer);
 
    // Menu lateral
    const btnMenu = document.getElementById('btn-menu');
    const menuLateral = document.getElementById('menu-lateral');
    const btnFechar = document.getElementById('btn-fechar');

    // Verifica a existencia dos componentes para que evite erros caso eles nao existam
    if (btnMenu && menuLateral && btnFechar) {
    btnMenu.addEventListener('click', () => {
        menuLateral.style.width = '250px';
    });

    btnFechar.addEventListener('click', () => {
        menuLateral.style.width = '0';
    });
}

});


