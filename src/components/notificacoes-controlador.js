import { gerarNotificacoesPorTipo, criarNotificacao, enviarNotificacao } from "./notificacao.js";

// Função para calcular horário relativo
function calcularHorarioRelativo(dataISO) {
    const agora = new Date();
    const data = new Date(dataISO);
    
    if (isNaN(data)) return 'data inválida';
    
    const diffMs = agora - data;
    const diffSegundos = Math.floor(diffMs / 1000);
    const diffMinutos = Math.floor(diffSegundos / 60);
    const diffHoras = Math.floor(diffMinutos / 60);
    
    // Menos de 1 minuto
    if (diffSegundos < 60) {
        return 'agora';
    }
    
    // Menos de 1 hora
    if (diffMinutos < 60) {
        return diffMinutos === 1 ? 'há 1 minuto' : `há ${diffMinutos} minutos`;
    }
    
    // Comparar datas calendário (dia/mês/ano)
    const agoraData = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const dataData = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    const diffDiasCalendario = Math.floor((agoraData - dataData) / (1000 * 60 * 60 * 24));
    
    // Mesma data (menos de 24 horas, mas pode ter horas diferentes)
    if (diffDiasCalendario === 0) {
        const hora = data.toLocaleString('pt-br', { hour: '2-digit', minute: '2-digit' });
        return `hoje às ${hora}`;
    }
    
    // Dia anterior (ontem)
    if (diffDiasCalendario === 1) {
        const hora = data.toLocaleString('pt-br', { hour: '2-digit', minute: '2-digit' });
        return `ontem às ${hora}`;
    }
    
    // 2 a 6 dias atrás
    if (diffDiasCalendario < 7) {
        return `há ${diffDiasCalendario} dias`;
    }
    
    // Menos de 30 dias
    const diffSemanas = Math.floor(diffDiasCalendario / 7);
    if (diffDiasCalendario < 30) {
        return diffSemanas === 1 ? 'há 1 semana' : `há ${diffSemanas} semanas`;
    }
    
    // Menos de 365 dias
    const diffMeses = Math.floor(diffDiasCalendario / 30);
    if (diffDiasCalendario < 365) {
        return diffMeses === 1 ? 'há 1 mês' : `há ${diffMeses} meses`;
    }
    
    // Ano passado ou mais
    const diffAnos = Math.floor(diffDiasCalendario / 365);
    return diffAnos === 1 ? 'há 1 ano' : `há ${diffAnos} anos`;
}

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

    // Mesclar notificações: manter as salvas (que vêm de enviarNotificacao)
    // e adicionar as geradas (que vêm de gerarNotificacoesPorTipo) se não duplicarem
    const mapaSalvas = new Map();
    notificacoesSalvas.forEach(n => mapaSalvas.set(n.mensagem, n));

    notificacoesPotenciais.forEach(notificacaoNova => {
        // Se a notificação gerada não existe nas salvas, adiciona
        if (!mapaSalvas.has(notificacaoNova.mensagem)) {
            notificacoesSalvas.push(notificacaoNova);
            mapaSalvas.set(notificacaoNova.mensagem, notificacaoNova);
        }
    });

    // Ordenar por data (mais recentes primeiro)
    notificacoesSalvas.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

        if (isNaN(dataA)) return 1;  // manda invalid date pro final
        if (isNaN(dataB)) return -1;

        return dataB - dataA;
    });

    localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoesSalvas));
    let notificacoes = notificacoesSalvas;

    function renderNotificacao() {

        listaNotificacao.innerHTML = '';

        notificacoes.forEach((n, index) => {
            const horarioRelativo = calcularHorarioRelativo(n.data);

            // Determinar ícone baseado no tipo
            let icone = 'bi-info-circle';
            if (n.tipo === 'alerta') icone = 'bi-exclamation-triangle';
            else if (n.tipo === 'sucesso') icone = 'bi-check-circle';

            // Determinar ação rápida baseada na mensagem
            let botaoAcao = '';
            if (n.mensagem.includes('solicitou defesa')) {
                botaoAcao = '<button class="btn-acao-notif" data-acao="ver-defesa" data-indice="' + index + '">Ver defesa</button>';
            } else if (n.mensagem.includes('está em andamento')) {
                botaoAcao = '<button class="btn-acao-notif" data-acao="ver-detalhes" data-indice="' + index + '">Detalhes</button>';
            } else if (n.mensagem.includes('foi concluída') || n.mensagem.includes('foi concluído')) {
                botaoAcao = '<button class="btn-acao-notif" data-acao="ver-resultado" data-indice="' + index + '">Ver resultado</button>';
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="notificacao-item-content">
                    <div class="notificacao-header">
                        <i class="bi ${icone} notificacao-icone"></i>
                        <div class="notificacao-mensagem">${n.mensagem}</div>
                    </div>
                    <div class="notificacao-footer">
                        <span class="notificacao-data" title="${new Date(n.data).toLocaleString('pt-br')}">${horarioRelativo}</span>
                        ${botaoAcao}
                    </div>
                </div>
            `;
            li.classList.add('notificacao-item');
            
            // Aplicar classe baseada no tipo de notificação
            if (n.tipo === 'alerta') {
                li.classList.add('tipo-alerta');
            } else if (n.tipo === 'sucesso') {
                li.classList.add('tipo-sucesso');
            } else if (n.tipo === 'info') {
                li.classList.add('tipo-info');
            }
            
            if (n.lida) li.classList.add('lida');

            // Marcar como lida ao clicar na notificação (exceto no botão)
            li.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    notificacoes[index].lida = true;
                    localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes));
                    renderNotificacao();
                }
            });

            // Botões de ação para acesso rápido
            const botao = li.querySelector('.btn-acao-notif');
            if (botao) {
                botao.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const acao = botao.dataset.acao;
                    
                    // Marcar como lida
                    notificacoes[index].lida = true;
                    localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes));

                    // Executar ação
                    if (acao === 'ver-defesa') {
                        window.location.href = 'defesas.html';
                    } else if (acao === 'ver-detalhes' || acao === 'ver-resultado') {
                        window.location.href = 'defesas.html';
                    }
                });
            }

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
        btnNotificacao.addEventListener("click", (e) => {
            e.stopPropagation();
            menuNotificacao.classList.toggle("aberta");
        });

        document.addEventListener("click", (e) => {
            if (!menuNotificacao.contains(e.target) && !btnNotificacao.contains(e.target)) {
                menuNotificacao.classList.remove("aberta");
            }
        });

        menuNotificacao.addEventListener("click", (e) => e.stopPropagation());
    }

    // Listener para atualizar notificações quando localStorage for alterado (ex: de outra aba)
    window.addEventListener('storage', (e) => {
        if (e.key === CHAVE_NOTIFICACOES) {
            notificacoes = JSON.parse(e.newValue) || [];
            renderNotificacao();
        }
    });

    // Listener para evento customizado de notificações adicionadas
    window.addEventListener('notificacaoAdicionada', (e) => {
        if (e.detail.chave === CHAVE_NOTIFICACOES) {
            notificacoes = JSON.parse(localStorage.getItem(CHAVE_NOTIFICACOES)) || [];
            renderNotificacao();
        }
    });

    renderNotificacao();
}
