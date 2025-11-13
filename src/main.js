import 'bootstrap-icons/font/bootstrap-icons.css'
import './css/base.css'
import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

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

    // Botão de notificação
    const btnNotificacao = document.getElementById('btn-notificacao');
    const menuNotificacao = document.getElementById('menu-notificacao');
    const listaNotificacao = document.getElementById('lista-notificacao');
    const contador = document.getElementById('contador');

    let notificacoes = JSON.parse(localStorage.getItem('notificacoes') || 
        JSON.stringify([
            { mensagem: "Sua defesa foi marcada para 25/11 às 14h", lida: false },
            { mensagem: "Orientador enviou observação no seu TCC", lida: false },
            { mensagem: "Defesa reagendada para 27/11 às 10h", lida: true }
        ])
    );

    function renderNotificacao(){
        listaNotificacao.innerHTML = '';

        notificacoes.forEach((n, index) => {
            const li = document.createElement('li');
            li.textContent = n.mensagem;
            li.classList.add('notificacao-item');
            if (n.lida) li.classList.add('lida');
            
            li.addEventListener('click', () => {
                notificacoes[index].lida = true;
                localStorage.setItem('notificacoes', JSON.stringify(notificacoes));
                renderNotificacao();
            });
            listaNotificacao.appendChild(li);
        });
        atualizarContador();
    }

    function atualizarContador() {
        const naoLidas = notificacoes.filter(n => !n.lida).length;
        contador.textContent = naoLidas;
        contador.style.display = naoLidas > 0 ? "block" : "none";
    }

    if (btnNotificacao && menuNotificacao) {
        btnNotificacao.addEventListener("click", (evento) => {
            menuNotificacao.classList.toggle("aberta");
        });

        document.addEventListener("click", (e) => {
            if (!menuNotificacao.contains(e.target) && !btnNotificacao.contains(e.target)) {
                menuNotificacao.classList.remove("aberta");
            }

        menuNotificacao.addEventListener("click", (e) => {
            e.stopPropagation();
            });
        });
    }

    renderNotificacao();

    // Botão de Logout
    const btnLogout = document.getElementById('btn-logout')
    
    if (btnLogout) {
        btnLogout.addEventListener("click", (evento) =>{
            evento.preventDefault();
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem('tipoUsuario');
            sessionStorage.clear();
            window.location.href = './login.html';
        });
    }
};


