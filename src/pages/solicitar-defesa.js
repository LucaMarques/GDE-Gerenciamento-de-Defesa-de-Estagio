import { montarLayout } from "../main";
import { usuariosBase } from "../data/usuarios.js";
import { enviarNotificacao } from "../components/notificacao.js"

document.addEventListener('DOMContentLoaded'  , () => {
    montarLayout();

    const orientadores = document.getElementById("orientador");
    const form = document.getElementById("form-solicitar-defesa");
    const btnVoltar = document.getElementById("btn-voltar");


    // Filtra os tipos de usuarios por orientador e manda para a variavel orientadores
    const professores = usuariosBase.filter(u => u.tipo === "orientador");

    professores.forEach(p => {
        const op = document.createElement("option");
        op.value = p.nome;
        op.textContent = p.nome;
        orientadores.appendChild(op);
    });

    // Botão voltar
    btnVoltar.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

    // Botão solicitar
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

        if (!usuario) {
            alert("Você precisa estar logado");
            window.location.href = "login.html";
        }

        const tema = document.getElementById("tema").value;
        const orientador = document.getElementById("orientador").value;

        const novaDefesa = {
            aluno: usuario.nome,
            orientador: orientador,
            status: "Aguardando",
            data: "0000-00-00",
            horario: "00:00",
            banca: [],
            local: "",
            tema: tema
        };

        let lista = JSON.parse(localStorage.getItem("defesas"));
        if (!Array.isArray(lista)) {
            lista = [];
        }
        lista.push(novaDefesa);
        localStorage.setItem("defesas", JSON.stringify(lista));

        // Envia notificação de solicitação para o orientador
        const mensagemOrientador = `O aluno ${usuario.nome} solicitou defesa sobre "${tema}".`;
        enviarNotificacao(orientador, mensagemOrientador, "alerta");

        // Envia notificação de solicitação para o coordenador
        const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || usuariosBase;
        const coordenadores = usuariosArmazenados.filter(u => u.tipo === "coordenador");
        
        coordenadores.forEach(coordenador => {
            const mensagemCoordenador = `O aluno ${usuario.nome} solicitou defesa sobre "${tema}" com o orientador ${orientador}.`;
            enviarNotificacao(coordenador.nome, mensagemCoordenador, "info");
        });

        alert("Solicitação enviada com sucesso!");
        window.location.href = "defesas.html";
    });
});