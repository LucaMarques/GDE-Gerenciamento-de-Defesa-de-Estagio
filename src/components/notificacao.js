import { defesas } from "../data/defesas.js";

export function gerarNotificacoesPorTipo(usuario) {
    const notificacoes = [];

    if (!usuario || !usuario.tipo) return notificacoes;

    if (usuario.tipo === "aluno") {
        const minhasDefesas = defesas.filter(d => d.aluno === usuario.nome);

        minhasDefesas.forEach(def => {
            if (def.status === "Em andamento" || def.status === "Aguardando") {
                notificacoes.push({
                    mensagem: `Sua defesa sobre "${def.tema}" está ${def.status.toLowerCase()} para ${def.data !== "0000-00-00" ? new Date(def.data).toLocaleDateString("pt-BR") : "a definir"} às ${def.horario}.`,
                    lida: false,
                    tipo: "info",
                    data: new Date().toISOString()
                });
            }

            if (def.status === "Em andamento") {
                notificacoes.push({
                    mensagem: `Sua defesa sobre "${def.tema}" está em andamento.`,
                    lida: false,
                    tipo: "alerta",
                    data: new Date().toISOString()
                });
            }

            if (def.status === "Concluído") {
                notificacoes.push({
                    mensagem: `Sua defesa "${def.tema}" foi concluída.`,
                    lida: false,
                    tipo: "sucesso",
                    data: new Date().toISOString()
                });
            }
        });
    }

    if (usuario.tipo === "orientador") {
        const defesasOrientador = defesas.filter(d => d.orientador === usuario.nome);

        defesasOrientador.forEach(def => {
            if (def.status === "Aguardando") {
                notificacoes.push({
                    mensagem: `O aluno ${def.aluno} solicitou defesa sobre "${def.tema}".`,
                    lida: false,
                    tipo: "alerta",
                    data: new Date().toISOString()
                });
            }
            if (def.status === "Em andamento") {
                notificacoes.push({
                    mensagem: `A defesa do aluno ${def.aluno} está em andamento.`,
                    lida: false,
                    tipo: "info",
                    data: new Date().toISOString()
                });
            }

             if (def.status === "Concluído") {
                notificacoes.push({
                    mensagem: `A defesa do aluno ${def.aluno} foi concluída.`,
                    lida: false,
                    tipo: "sucesso",
                    data: new Date().toISOString()
                });
            }
        });
    }

    if (usuario.tipo === "coordenador") {
        const pendentes = defesas.filter(d => d.status === "Aguardando");

        if (pendentes.length > 0) {
            notificacoes.push({
                mensagem: `${pendentes.length} defesas aguardando aprovação.`,
                lida: false,
                tipo: "alerta",
                data: new Date().toISOString()
            });
        }

        defesas.forEach(def => {
            if (def.data !== "0000-00-00" && def.status !== "Concluído") {
                notificacoes.push({
                    mensagem: `Defesa marcada: aluno ${def.aluno}, tema "${def.tema}".`,
                    lida: false,
                    tipo: "info",
                    data: new Date().toISOString()
                });
            }
        });

        const concluidas = defesas.filter(d => d.status === "Concluído");

        concluidas.forEach(def => {
            notificacoes.push({
                mensagem: `Defesa concluída: aluno ${def.aluno}, tema "${def.tema}".`,
                lida: false,
                tipo: "sucesso",
                data: new Date().toISOString()
            });
        });
    }

    return notificacoes;
}

export function criarNotificacao(mensagem, usuarioAlvo) {
    const CHAVE = `notificacoes_${usuarioAlvo}`;
    const lista = JSON.parse(localStorage.getItem(CHAVE)) || [];

    lista.push({
        mensagem,
        data: new Date().toISOString(),
        lida: false
    });

    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function enviarNotificacao(destino, mensagem) {
    let chave = "";

    if (destino.tipo === "aluno") {
        chave = `notificacoes_${destino.nome}`;
    } else if (destino.tipo === "orientador") {
        chave = `notificacoes_${destino.nome}`;
    } else if (destino.tipo === "coordenador") {
        chave = `notificacoes_${destino.nome}`;
    }

    const lista = JSON.parse(localStorage.getItem(chave)) || [];

    lista.push({
        mensagem,
        data: new Date().toISOString(),
        lida: false
    });

    localStorage.setItem(chave, JSON.stringify(lista));
}