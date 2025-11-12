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
                        <a href="../perfil.html" class="btn-usuario">
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
                <a href="../dashboard.html">
                    <i class="bi bi-house-door-fill"></i>
                    Inicio
                </a>
                <a href="../perfil.html">
                    <i class="bi bi-person-fill"></i>
                    Meu perfil
                </a>
                <a href="../dashboard.html">
                    <i class="bi bi-calendar-fill"></i>
                    Defesas
                </a>
                <!-- Adiciona uma classe especial ao link de logout -->
                <a href="#" class="logout-link">
                    <i class="bi bi-box-arrow-right"></i>
                    Logout
                </a>
            </nav>
        </header>
    `;
    return header;
}
