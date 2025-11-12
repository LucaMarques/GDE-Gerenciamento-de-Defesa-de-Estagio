import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded', () => {
  montarLayout();
  const btnAlterar = document.querySelector('.btn-alterar-dados');
  const camposKeys = [
    'matricula', 'curso', 'email', 'cpf', 'sexo', 'nascimento', 'telefone', 'endereco'
  ];

  function carregarDados() {
    const campos = document.querySelectorAll('.campo-valor');
    campos.forEach((campo, i) => {
      const valorSalvo = localStorage.getItem(camposKeys[i]);
      if (valorSalvo) campo.textContent = valorSalvo;
    });
  }
  carregarDados();

  btnAlterar.addEventListener('click', () => {
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
    btnAlterar.style.display = 'none';
    criarBotaoSalvar();
  });

  function criarBotaoSalvar() {
    const header = document.querySelector('.header-info-pessoais');
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.className = 'btn-salvar-dados';
    btnSalvar.onclick = salvarDados;
    header.appendChild(btnSalvar);
  }

  function validarCampos(valores) {
    // Matrícula: só números, até 12 dígitos
    if (!/^\d{1,12}$/.test(valores[0])) {
      alert('Matrícula deve conter até 12 números.');
      return false;
    }
    // Data de nascimento: formato DD/MM/AAAA
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valores[5])) {
      alert('Data de nascimento deve estar no formato DD/MM/AAAA.');
      return false;
    }
    // Telefone: só números, 10 ou 11 dígitos
    if (!/^\d{10,11}$/.test(valores[6].replace(/\D/g, ''))) {
      alert('Telefone deve conter apenas números (10 ou 11 dígitos).');
      return false;
    }
    // Endereço: mínimo 5 caracteres
    if (valores[7].trim().length < 5) {
      alert('Endereço deve ter pelo menos 5 caracteres.');
      return false;
    }
    // Sexo: só aceita Masculino ou Feminino
    if (valores[4] !== 'Masculino' && valores[4] !== 'Feminino') {
      alert('Selecione o sexo: Masculino ou Feminino.');
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
    document.querySelector('.btn-salvar-dados').remove();
    btnAlterar.style.display = 'inline-block';
  }
});
