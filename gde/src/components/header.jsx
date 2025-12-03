import "../css/base.css";

export default function Header() {
   return (
        <header className="cabecalho" id="header">
            <div className="container-header">
                
                {/* Botão do menu mobile */}
                <div className="menu-mobile">
                    <a className="btn-menu" id="btn-menu" href="javascript:void(0)">    
                        <i className="bi bi-list"></i>
                    </a>
                </div>

                {/* Logo */}
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/dashboard.html" className="header-logo">
                    <img src="./logo.png" alt="Logo GDE" />
                </a>

                {/* Botões */}
                <div className="botoes">
                    <div className="notificacao">
                        <a className="btn-notificacao" id="btn-notificacao">
                            <i className="bi bi-bell-fill"></i>
                            <span className="badge" id="contador">3</span>
                        </a>
                        <div className="menu-notificacao" id="menu-notificacao">
                            <h3>Notificações</h3>
                            <ul id="lista-notificacao"></ul>
                        </div>
                    </div> 
                </div>
            </div>

            {/* Menu lateral (fora do fluxo principal) */}
            <nav className="menu-lateral" id="menu-lateral">
                <a href="javascript:void(0)" className="btn-fechar" id="btn-fechar">
                    <i className="bi bi-x-lg"></i>
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/dashboard.html">
                    <i className="bi bi-house-door-fill"></i> Início
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/perfil.html">
                    <i className="bi bi-person-fill"></i> Meu perfil
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/defesas">
                    <i className="bi bi-calendar-fill"></i> Defesas
                </a>
                <a href="/GDE-Gerenciamento-de-Defesa-de-Estagio/login" className="logout-link">
                    <i className="bi bi-box-arrow-right"></i> Logout
                </a>
            </nav>
        </header>
    );
}
