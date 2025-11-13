export function criaHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    header.innerHTML = `
        <header class="cabecalho" id="header">
            <div class="container-header">
                
                <!-- Botão do menu mobile -->
                <div class="menu-mobile">
                    <a class="btn-menu" id="btn-menu" href="javascript:void(0)">    
                        <i class="bi bi-list"></i>
                    </a>
                </div>

                <!-- Logo -->
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/dashboard.html" class="header-logo">
                    <img src="./logo.png" alt="Logo GDE">
                </a>

                <!-- Botões -->
                <div class="botoes">
                    <div class="notificacao">
                        <a class="btn-notificacao" id="btn-notificacao">
                            <i class="bi bi-bell-fill"></i>
                            <span class="badge" id="contador">3</span>
                        </a>
                        <div class="menu-notificacao" id="menu-notificacao">
                            <h3>Notificações</h3>
                            <ul id="lista-notificacao"></ul>
                        </div>
                    </div> 
                </div>
            </div>

            <!-- Menu lateral (fora do fluxo principal) -->
            <nav class="menu-lateral" id="menu-lateral">
                <a href="javascript:void(0)" class="btn-fechar" id="btn-fechar">
                    <i class="bi bi-x-lg"></i>
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/dashboard.html">
                    <i class="bi bi-house-door-fill"></i> Início
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/perfil.html">
                    <i class="bi bi-person-fill"></i> Meu perfil
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/defesas">
                    <i class="bi bi-calendar-fill"></i> Defesas
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/login" class="logout-link">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </nav>
        </header>
    `;
    return header;
}
