export function criaHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    header.innerHTML = `
        <header class="cabecalho" id="header">
            <div class="container-header">
                <a href="#" class="header-logo">
                    <img src="./public/logo.png" alt="Logo GDE">
                </a>

                <div class="botoes">
                    <div class="usuario">
                        <a class="btn-usuario">
                            <i class="bi bi-person-fill"></i>
                        </a>
                    </div>

                    <div class="notificacao">
                        <a class="btn-notificacao">
                           <i class="bi bi-bell-fill"></i>
                        </a>
                    </div> 

                    <div class="menu-mobile">
                        <a class="btn-menu" id="btn-menu" href="javascript:void(0)">    
                            <i class="bi bi-list"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Menu lateral -->
            <nav class="menu-lateral" id="menu-lateral">
                <a href="javascript:void(0)" class="btn-fechar" id="btn-fechar">
                    <i class="bi bi-x-lg"></i>
                </a>
                <a href="#">Calendário</a>
                <a href="#">Compromissos</a>
                <a href="#">Lembretes</a>
            </nav>
        </header>
    `;
    return header;
}
