(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();function h(){const a=document.createElement("header");return a.classList.add("header"),a.innerHTML=`
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
    `,a}function b(){const a=document.createElement("footer");return a.classList.add("footer"),a.innerHTML=`
        <footer class="footer" id="footer">
            <div class="container-footer">
                <div class="footer-section">
                    <img src="./public/logo.png" alt="Logo GDE">
                    <h2>GDE - Gerenciamento de Defesas de Estágio</h2>
                    <p class="footer-description">
                        Plataforma para organização e acompanhamento de defesas de estágio
                        facilitando o processo para alunos, orientadores e coordenadores.
                    </p>
                </div>
            </div>

            <div class="footer-bottom">
                &copy; 2025 GDE. Todos os direitos reservados.
            </div>
        </footer>
    `,a}function v(){const a=h(),s=b();document.body.prepend(a),document.body.append(s);const d=document.getElementById("btn-menu"),n=document.getElementById("menu-lateral"),e=document.getElementById("btn-fechar");d&&n&&e&&(d.addEventListener("click",()=>{n.style.width="250px"}),e.addEventListener("click",()=>{n.style.width="0"}));const t=document.getElementById("btn-notificacao"),i=document.getElementById("menu-notificacao"),f=document.getElementById("lista-notificacao"),m=document.getElementById("contador");let l=JSON.parse(localStorage.getItem("notificacoes")||JSON.stringify([{mensagem:"Sua defesa foi marcada para 25/11 às 14h",lida:!1},{mensagem:"Orientador enviou observação no seu TCC",lida:!1},{mensagem:"Defesa reagendada para 27/11 às 10h",lida:!0}]));function u(){f.innerHTML="",l.forEach((o,c)=>{const r=document.createElement("li");r.textContent=o.mensagem,r.classList.add("notificacao-item"),o.lida&&r.classList.add("lida"),r.addEventListener("click",()=>{l[c].lida=!0,localStorage.setItem("notificacoes",JSON.stringify(l)),u()}),f.appendChild(r)}),p()}function p(){const o=l.filter(c=>!c.lida).length;m.textContent=o,m.style.display=o>0?"block":"none"}t&&i&&(t.addEventListener("click",o=>{i.classList.toggle("aberta")}),document.addEventListener("click",o=>{!i.contains(o.target)&&!t.contains(o.target)&&i.classList.remove("aberta"),i.addEventListener("click",c=>{c.stopPropagation()})})),u();const g=document.getElementById("btn-logout");g&&g.addEventListener("click",o=>{o.preventDefault(),localStorage.removeItem("usuarioLogado"),localStorage.removeItem("tipoUsuario"),sessionStorage.clear(),window.location.href="./login.html"})}export{v as m};
