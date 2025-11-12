document.addEventListener('DOMContentLoaded', () => {
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
    camposAtuais.forEach((campo) => {
      const valor = campo.textContent;
      const input = document.createElement('input');
      input.value = valor;
      input.className = 'input-edicao';
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

  function salvarDados() {
    const inputs = document.querySelectorAll('.input-edicao');
    inputs.forEach((input, i) => {
      const span = document.createElement('span');
      span.className = 'campo-valor';
      span.textContent = input.value;
      input.replaceWith(span);
      // salvado no localStorage :)
      localStorage.setItem(camposKeys[i], input.value);
    });
    document.querySelector('.btn-salvar-dados').remove();
    btnAlterar.style.display = 'inline-block';
  }
});
