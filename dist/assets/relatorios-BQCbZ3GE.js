import{m as c,d as r}from"./main-DbTm04-e.js";document.addEventListener("DOMContentLoaded",()=>{JSON.parse(localStorage.getItem("usuarioLogado"))||(alert("Você precisa fazer login primeiro!"),window.location.href="/login.html"),c(),u()});function u(){const o=document.getElementById("main-content");if(!o)return;const e=`
    <div class="relatorio-container">
        <h2>Relatórios de Defesas</h2>
        
        <div class="relatorio-controles">
            <select id="select-relatorio">
                <option value="">-- Selecione um tipo de relatório --</option>
                <option value="pendentes">Relatórios Pendentes</option>
                <option value="concluidos">Histórico (Concluídos)</option>
                <option value="todos">Todos os Relatórios</option>
            </select>

            <input type="date" id="input-data">
        </div>

        <div id="container-resultados" class="container-relatorio-lista"></div>
    </div>
    `;o.innerHTML=e,document.getElementById("select-relatorio").addEventListener("change",l),document.getElementById("input-data").addEventListener("change",l)}function l(){const o=document.getElementById("select-relatorio").value,e=document.getElementById("input-data").value,s=document.getElementById("container-resultados");let n=[],t=o;if(o==="pendentes")n=r.filter(a=>a.status==="Em andamento"),t="Em andamento";else if(o==="concluidos")n=r.filter(a=>a.status==="Concluído"),t="Concluído";else if(o==="todos")n=r,t="todos";else{s.innerHTML="";return}e&&(n=n.filter(a=>a.data.split("T")[0]===e)),m(s,n,t)}function m(o,e,s){if(e.length===0){const n=s==="todos"?"Nenhum item encontrado no banco de dados.":`Nenhum item encontrado com status "${s}".`;o.innerHTML=`<p>${n}</p>`}else{const n=e.map(t=>{const a=t.status==="Em andamento"?"status-aberto":"status-concluida",i=new Date(t.data).toLocaleDateString("pt-BR",{timeZone:"UTC"}),d=t.banca.join(", ");return`
                <div class="card-defesa">
                    <h3>${t.tema}</h3>
                    <p><strong>Aluno:</strong> ${t.aluno}</p>
                    <p><strong>Orientador:</strong> ${t.orientador}</p>
                    <p><strong>Data:</strong> ${i}</p>
                    <p><strong>Horário:</strong> ${t.horario}</p>
                    <p><strong>Local:</strong> ${t.local}</p>
                    <p><strong>Banca:</strong> ${d}</p>
                    <p class="${a}">
                        <strong>Status:</strong> ${t.status}
                    </p>
                </div>
            `});o.innerHTML=n.join("")}}
