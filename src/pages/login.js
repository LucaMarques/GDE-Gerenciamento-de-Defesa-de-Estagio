import { usuariosBase } from "../data/usuarios.js" 

document.addEventListener("DOMContentLoaded", () => {
    // Animação da tela de login/cadastro
    const loginContainer = document.getElementById('login-container')
    const moveOverlay = () => loginContainer.classList.toggle('move')

    document.getElementById('open-register').addEventListener('click', moveOverlay)
    document.getElementById('open-login').addEventListener('click', moveOverlay)
    document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)
    document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)

    // Local Storage
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios || usuarios.length === 0) { // 🔧 ALTERADO
        usuarios = usuariosBase;
    }

    document.getElementById("matricula-cadastro").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });

    const nomeInput = document.getElementById("nome-cadastro");

    nomeInput.addEventListener("input", function () {
        let texto = this.value;
        texto = texto.replace(/[0-9]/g, '');
        texto = texto.replace(/\s{2,}/g, ' ');
        this.value = texto;
    });
    
    nomeInput.addEventListener('blur', function() {
        let nome = this.value.trim();
        nome = nome.replace(/\s+/g, ' ');
        nome = nome.replace(/\b\w/g, l => l.toUpperCase());
        this.value = nome;
    });

    // Página de cadastro
    document.getElementById('btn-cadastro').addEventListener('click', () => {
        const tipo = document.getElementById('tipo-usuario').value.trim();
        const nome = document.getElementById('nome-cadastro').value.trim();
        const matricula = document.getElementById('matricula-cadastro').value.trim();
        const email = document.getElementById('email-cadastro').value.trim();
        const senha = document.getElementById('senha-cadastro').value.trim();

        const msgErro = document.getElementById('msg-cadastro-error');

        msgErro.style.display = "none";
        msgErro.textContent = "";

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nome === '' || matricula === '' || email === '' || senha === '' || tipo === ''){
            msgErro.textContent = 'Preencha todos os campos!'
            msgErro.style.display = 'block';
            return;
        }

        if (!regexEmail.test(email)){
            msgErro.textContent = 'Digite um email válido!';
            msgErro.style.display = 'block';
            return;
        }

        if (senha.length < 6) {
            msgErro.textContent = 'A senha deve ter 6 caracteres.';
            msgErro.style.display = 'block';
            return;
        }

        if (!/^\d+$/.test(matricula)) {
            msgErro.textContent = 'A matrícula deve ter apenas números!';
            msgErro.style.display = 'block';
            return;
        }

        const existe = usuarios.find(usuario => usuario.email === email)

        if (existe){
            msgErro.textContent = 'Este email já está cadastrado!';
            msgErro.style.display = 'block';
            return;
        }

        const novoUsuario = {
            nome, matricula, email, senha, tipo, curso: "", 
            cpf: "", sexo: "", nascimento: "", telefone: "", endereco: ""
        };
        
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        Swal.fire({
        title: 'Cadastrado!',
        text: 'Seu cadastro foi realizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fazer Login',
        confirmButtonColor: '#0fa394'
    }).then(() => {
        document.getElementById('form-cadastro').reset();
        moveOverlay(); // Troca a tela para o Login automaticamente
    });
    })


    // Página de login
    document.getElementById('btn-login').addEventListener('click', () => {
        const email = document.getElementById('email-login').value.trim()
        const senha = document.getElementById('senha-login').value.trim()
        const msgError = document.getElementById('msg-login-error')

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            msgError.textContent = "Digite um e-mail válido.";
            msgError.style.display = "block";
            return;
        }

        if (email === '' || senha === ''){
            msgError.textContent = 'Preencha todos os campos.';
            msgError.style.display = 'block';
            return;
        }

        const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha)

        if (usuario){
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
            localStorage.setItem("tipoUsuario", usuario.tipo);
            Swal.fire({
            title: `Bem-vindo(a), ${usuario.nome}!`,
            text: 'Login realizado com sucesso.',
            icon: 'success',
            timer: 1500, // Fecha sozinho em 1.5s para ser rápido
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
                window.location.href = "dashboard.html";
            }
        });
            
        } else {
            msgError.textContent = 'Email ou senha incorretos.';
            msgError.style.display = 'block';
        }
        })

    // Visualizar senha no input
    function aplicarToggleSenha(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);

        icon.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    }

    aplicarToggleSenha("senha-login", "toggle-login-senha");
    aplicarToggleSenha("senha-cadastro", "toggle-cadastro-senha");
});