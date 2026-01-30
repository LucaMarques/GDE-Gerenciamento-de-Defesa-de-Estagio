import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/base.css'
import { criaHeader } from "./components/Header.jsx";
import { criaFooter } from "./components/Footer.jsx";
import { iniciarNotificacoes } from "./components/notificacoes-controlador.js"

export function montarLayout(){
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

    iniciarNotificacoes();

    // Botão de Logout
    const btnLogout = document.getElementById('btn-logout')
    
    if (btnLogout) {
        btnLogout.addEventListener("click", (evento) =>{
            evento.preventDefault();

            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            if (usuario) {
                localStorage.removeItem(`notificacoes_${usuario.nome}`);
            }

            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('tipoUsuario');
            sessionStorage.clear();
            window.location.href = './login.html';
        });
    }
};


