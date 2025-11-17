import { gerarNotificacoesPorTipo,criarNotificacao } from "./notificacao.js";

export function iniciarNotificacoes() {
    const btnNotificacao = document.getElementById('btn-notificacao');
    const menuNotificacao = document.getElementById('menu-notificacao');
    const listaNotificacao = document.getElementById('lista-notificacao');
    const contador = document.getElementById('contador');

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) return;

    let CHAVE_NOTIFICACOES = `notificacoes_${usuario.nome}`;

    const notificacoesPotenciais = gerarNotificacoesPorTipo(usuario);
    
    let notificacoesSalvas = JSON.parse(localStorage.getItem(CHAVE_NOTIFICACOES)) || [];
    notificacoesSalvas = notificacoesSalvas.filter(n => n && n.mensagem);

    const mapaSalvas = new Map();
    notificacoesSalvas.forEach(n => mapaSalvas.set(n.mensagem, n));

    const notificacoesFinal = notificacoesPotenciais.map(notificacaoNova => {
        const notifAntiga = mapaSalvas.get(notificacaoNova.mensagem);
        if (notifAntiga) {
            return notifAntiga;
        } else {
            return notificacaoNova;
        }
    });

    notificacoesFinal.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

        if (isNaN(dataA)) return 1;  // manda invalid date pro final
        if (isNaN(dataB)) return -1;

        return dataB - dataA;
    });

    
    localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoesFinal));
    let notificacoes = notificacoesFinal;

    function renderNotificacao() {

        listaNotificacao.innerHTML = '';

        notificacoes.forEach((n, index) => {
            const dataFormatada = new Date(n.data).toLocaleString("pt-br", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="notificacao-mensagem">${n.mensagem}</div>
                <div class="notificacao-data">${dataFormatada}</div>
            `;
            li.classList.add('notificacao-item');
            if (n.lida) li.classList.add('lida');

            li.addEventListener('click', () => {
                notificacoes[index].lida = true;
                localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes));
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
        btnNotificacao.addEventListener("click", () => {
            menuNotificacao.classList.toggle("aberta");
        });

        document.addEventListener("click", (e) => {
            if (!menuNotificacao.contains(e.target) && !btnNotificacao.contains(e.target)) {
                menuNotificacao.classList.remove("aberta");
            }
        });

        menuNotificacao.addEventListener("click", (e) => e.stopPropagation());
    }

    renderNotificacao();
}
