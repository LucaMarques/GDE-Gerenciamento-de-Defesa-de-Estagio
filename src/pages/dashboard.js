import { montarLayout } from "../main";

document.addEventListener('DOMContentLoaded'  , () => {
  montarLayout();

  // Verificando o tipo de usuario
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    Swal.fire({
        title: 'Acesso restrito',
        text: 'Você precisa fazer login primeiro!',
        icon: 'warning',
        confirmButtonText: 'Ir para Login',
        confirmButtonColor: '#0fa394',
        allowOutsideClick: false, // Impede fechar clicando fora
        allowEscapeKey: false     // Impede fechar com ESC
    }).then(() => {
        window.location.href = "login.html";
    });
    return;
  }

  const tipoUsuario = usuarioLogado.tipo; 
  const nome = usuarioLogado.nome;

  const cardsContainer = document.getElementById("cardsContainer");
  const titulo = document.getElementById("tituloUsuario");

  // Testando persistencia de dado vendo se muda o nome no painel
  const nomeDisplay = document.getElementById("nomeUsuario");
  if (nomeDisplay) nomeDisplay.textContent = nome;

  // Cards conforme o tipo
  const opcoesPorUsuario = {
    aluno: [
      { icon: "fa-user", text: "Meus dados", pagina: "perfil.html"},
      { icon: "fa-plus", text: "Solicitar defesa", pagina: "solicitar-defesa.html" },
      { icon: "fa-calendar-days", text: "Agenda de defesas", pagina: "defesas.html?filtro=andamento"  },
      { icon: "fa-file-lines", text: "Histórico", pagina: "defesas.html?filtro=concluido"  }
    ],
    orientador: [
      { icon: "fa-list-check", text: "Avaliar defesas", pagina: "aceitar-defesas.html"  },
      { icon: "fa-calendar", text: "Minhas defesas", pagina: "defesas.html"  },
      { icon: "fa-chart-line", text: "Relatórios", pagina: "relatorios.html"  }
    ],
    coordenador: [
      { icon: "fa-users-gear", text: "Gerenciar usuários", pagina: "defesas.html"  },
      { icon: "fa-clipboard-list", text: "Gerenciar defesas", pagina: "defesas.html"  },
      { icon: "fa-database", text: "Gerenciar dados", pagina: "defesas.html"  },
      { icon: "fa-chart-pie", text: "Painel de estatísticas", pagina: "defesas.html"  }
    ]
  };

  // Muda o titulo da pagina de acordo o tipo do usuario
  const nomeTipo = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);
  if (titulo) titulo.textContent = `Painel do ${nomeTipo}`;

  // Gera os cards conforme o tipo do usuário
  opcoesPorUsuario[tipoUsuario].forEach(opcao => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <i class="fa-solid ${opcao.icon}"></i>
      <p>${opcao.text}</p>
    `;

    // Redireciona ao clicar no card
    card.addEventListener("click", () => {
      window.location.href = opcao.pagina;
    });

    cardsContainer.appendChild(card);
  });
});
