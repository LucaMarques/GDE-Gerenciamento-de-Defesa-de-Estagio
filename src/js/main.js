import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/base.css'
import usuariosBase from '../data/usuarios.json'
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

    btnMenu.addEventListener('click', () => {
        menuLateral.style.width = '250px';
    });

    btnFechar.addEventListener('click', () => {
        menuLateral.style.width = '0';
    });
});

// Animação da tela de login/cadastro
const loginContainer = document.getElementById('login-container')

const moveOverlay = () => loginContainer.classList.toggle('move')

document.getElementById('open-register').addEventListener('click', moveOverlay)
document.getElementById('open-login').addEventListener('click', moveOverlay)
document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)
document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)

// Local Storage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || usuariosBase

document.addEventListener('DOMContentLoaded', () =>{
    // Página de cadastro
    document.getElementById('btn-cadastro').addEventListener('click', () => {
        const tipo = document.getElementById('tipo-usuario').value;
        const nome = document.getElementById('nome-cadastro').value;
        const matricula = document.getElementById('matricula-cadastro').value;
        const email = document.getElementById('email-cadastro').value;
        const senha = document.getElementById('senha-cadastro').value;

        if (nome === '' || matricula === '' || email === '' || senha === '' || tipo === ''){
            alert('Preencha todos os campos!');
            return
        }

        const existe = usuarios.find(usuario => usuario.email === email)

        if (existe){
            alert('Este email já está cadastrado!');
            return
        }

        const novoUsuario = { nome, matricula, email, senha, tipo };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        alert('Cadastro realizado com sucesso!')
        document.getElementById('form-cadastro').reset()
        moveOverlay()
    })


    // Página de login
    document.getElementById('btn-login').addEventListener('click', () => {
        const email = document.getElementById('email-login').value.trim()
        const senha = document.getElementById('senha-login').value.trim()

        const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha)

        if (usuario){
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
            alert(`Bem-vindo, ${usuario.nome} ! (${usuario.tipo})`)

            if (usuario.tipo === 'aluno') window.location.href = 'aluno.html'
            else if (usuario.tipo === 'orientador') window.location.href = 'orientador.html'
            else if (usuario.tipo == 'coordenador') window.location.href = 'coordenador.html'
        } else {
            alert('Email ou senha incorretos!')
        }
        })
})
