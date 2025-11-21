import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded', () => {
  montarLayout();
  const btnAlterar = document.querySelector('.btn-alterar-dados');
  const btnCancelar = document.querySelector('.btn-cancelar-edicao');
  const camposKeys = [
    'matricula', 'curso', 'email', 'cpf', 'sexo', 'nascimento', 'telefone', 'endereco'
  ];


  // puxa o usuario logado do local storage
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // verifica se esta logado e passa os dados
  if (usuarioLogado) {
    localStorage.setItem('nome', usuarioLogado.nome || '');
    localStorage.setItem('matricula', usuarioLogado.matricula || '');
    localStorage.setItem('email', usuarioLogado.email || '');
    localStorage.setItem('curso', usuarioLogado.curso || '');
    localStorage.setItem('cpf', usuarioLogado.cpf || '');
    localStorage.setItem('sexo', usuarioLogado.sexo || '');
    localStorage.setItem('nascimento', usuarioLogado.nascimento || '');
    localStorage.setItem('telefone', usuarioLogado.telefone || '');
    localStorage.setItem('endereco', usuarioLogado.endereco || '');
  } 
  else {
    Swal.fire({
        title: 'Acesso restrito',
        text: 'Você precisa fazer login para acessar seu perfil.',
        icon: 'warning',
        confirmButtonColor: '#0fa394',
        allowOutsideClick: false,
        confirmButtonText: 'Ir para Login'
    }).then(() => {
        window.location.href = "login.html";
    });
    return;
  }

  // tira os dados fixos do html
  const campos = document.querySelectorAll('.campo-valor');
  campos.forEach(campo => campo.textContent = '');

  function carregarDados() {
    const campos = document.querySelectorAll('.campo-valor');
    campos.forEach((campo, i) => {
      const valorSalvo = localStorage.getItem(camposKeys[i]);
      if (valorSalvo) campo.textContent = valorSalvo;
    });
  }
  carregarDados();

  const nomePerfil = document.querySelector('.nome-perfil');
  const tipoUsuario = document.querySelector('.tipo-usuario');
  
  nomePerfil.textContent = usuarioLogado.nome;
  tipoUsuario.textContent = usuarioLogado.tipo.charAt(0).toUpperCase() + usuarioLogado.tipo.slice(1);
  


  btnAlterar.addEventListener('click', () => {
    btnCancelar.style.display = 'inline-block';
    btnAlterar.style.display = 'none';
    // Buscar os campos atuais toda vez que for editar
    const camposAtuais = document.querySelectorAll('.campo-valor');
    camposAtuais.forEach((campo, idx) => {
      const valor = campo.textContent;
      let input;
      if (camposKeys[idx] === 'sexo') {
        input = document.createElement('select');
        input.className = 'input-edicao';
        const op1 = document.createElement('option');
        op1.value = 'Masculino';
        op1.textContent = 'Masculino';
        const op2 = document.createElement('option');
        op2.value = 'Feminino';
        op2.textContent = 'Feminino';
        input.appendChild(op1);
        input.appendChild(op2);
        input.value = valor;
        // Seleciona o valor atual
        Array.from(input.options).forEach(opt => {
          if (opt.value === valor) input.value = valor;
        });
      } else {
        input = document.createElement('input');
        input.value = valor;
        input.className = 'input-edicao';
      }
      campo.replaceWith(input);
    });
    criarBotaoSalvar();
  });

  btnCancelar.addEventListener('click', () => {
    // Cancela edição, restaura campos originais e oculta botão
    btnCancelar.style.display = 'none';
    btnAlterar.style.display = 'inline-block';
    const header = document.querySelector('.header-info-pessoais');
    const btnSalvar = document.querySelector('.btn-salvar-dados');
    if (btnSalvar) btnSalvar.remove();
    // Substitui inputs/selects pelos spans com dados do localStorage
    const infoCampos = document.querySelector('.info-campos');
    infoCampos.querySelectorAll('input, select').forEach((el, idx) => {
      const span = document.createElement('span');
      span.className = 'campo-valor';
      span.textContent = localStorage.getItem(camposKeys[idx]) || '';
      el.replaceWith(span);
    });
  });

  function criarBotaoSalvar() {
    const infoCampos = document.querySelector('.info-campos');
    let btnSalvar = document.querySelector('.btn-salvar-dados');
    if (btnSalvar) btnSalvar.remove();
    btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.className = 'btn-salvar-dados';
    btnSalvar.style.marginTop = '32px';
    btnSalvar.style.width = '180px';
    btnSalvar.style.alignSelf = 'center';
    btnSalvar.onclick = () => {
      const inputs = document.querySelectorAll('.input-edicao');
      const valores = Array.from(inputs).map(input => input.value);
      if (!validarCampos(valores)) {
        // Se houver erro, mantém modo edição e botões
        return;
      }
      salvarDados();
      btnCancelar.style.display = 'none';
      btnAlterar.style.display = 'inline-block';
    };
    infoCampos.appendChild(btnSalvar);
  }

  function validarCampos(valores) {
    // Função auxiliar para mostrar erro
    const mostrarErro = (msg) => {
        Swal.fire({
            title: 'Campo Inválido',
            text: msg,
            icon: 'error',
            confirmButtonColor: '#0fa394'
        });
    };

    // Matrícula: só números, até 12 dígitos
    if (!/^\d{1,12}$/.test(valores[0])) {
      mostrarErro('Matrícula deve conter até 12 números.');
      return false;
    }
    // Data de nascimento: formato DD/MM/AAAA
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valores[5])) {
      mostrarErro('Data de nascimento deve estar no formato DD/MM/AAAA.');
      return false;
    }
    // Telefone: só números, 10 ou 11 dígitos
    if (!/^\d{10,11}$/.test(valores[6].replace(/\D/g, ''))) {
      mostrarErro('Telefone deve conter apenas números (10 ou 11 dígitos).');
      return false;
    }
    // Endereço: mínimo 5 caracteres
    if (valores[7].trim().length < 5) {
      mostrarErro('Endereço deve ter pelo menos 5 caracteres.');
      return false;
    }
    // Sexo: só aceita Masculino ou Feminino
    if (valores[4] !== 'Masculino' && valores[4] !== 'Feminino') {
      mostrarErro('Selecione o sexo: Masculino ou Feminino.');
      return false;
    }
    return true;
  }

  function formatarTelefone(telefone) {
    // Remove tudo que não é número
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length === 11) {
      return `(${telefone.slice(0,2)}) ${telefone.slice(2,7)}-${telefone.slice(7)}`;
    } else if (telefone.length === 10) {
      return `(${telefone.slice(0,2)}) ${telefone.slice(2,6)}-${telefone.slice(6)}`;
    }
    return telefone;
  }

  function salvarDados() {
    const inputs = document.querySelectorAll('.input-edicao');
    const valores = Array.from(inputs).map(input => input.value);

    if (!validarCampos(valores)) return;
    inputs.forEach((input, i) => {
      const span = document.createElement('span');
      span.className = 'campo-valor';
      // Formata telefone
      if (camposKeys[i] === 'telefone') {
        span.textContent = formatarTelefone(input.value);
        localStorage.setItem(camposKeys[i], formatarTelefone(input.value));
      } else {
        span.textContent = input.value;
        localStorage.setItem(camposKeys[i], input.value);
      }
      input.replaceWith(span);
    });

    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    camposKeys.forEach((key, i) => {
      usuarioLogado[key] = valores[i];
    });
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const idx = usuarios.findIndex(u => u.nome === usuarioLogado.nome);
    if (idx !== -1) {
      usuarios[idx] = usuarioLogado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    document.querySelector('.btn-salvar-dados').remove();
    btnAlterar.style.display = 'inline-block';
    
    Swal.fire({
        title: 'Dados Salvos!',
        text: 'Suas informações foram atualizadas.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        position: 'center'
    });
  }
});
