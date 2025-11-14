import{m as s}from"./main-DfM3t_-H.js";const c=[{aluno:"Andrew Sander",orientador:"Prof.Diego",status:"Em andamento",data:"2025-12-05T00:00:00-03:00",horario:"14:00",banca:["Prof. Luiz","Prof.Francisco"],local:"Sala de Redes",tema:"Banco de dados"},{aluno:"Pedro",orientador:"Prof.Diego",status:"Em andamento",data:"2025-08-12T00:00:00-03:00",horario:"14:00",banca:["Prof. Luiz","Prof.Francisco"],local:"Sala de Redes",tema:"Banco de dados"},{aluno:"Andrew Sander",orientador:"Prof.Diego",status:"Concluído",data:"2025-12-05T00:00:00-03:00",horario:"14:00",banca:["Prof. Luiz","Prof.Francisco"],local:"Sala de Redes",tema:"Banco de dados"}];function l(o){const r=new Date(o.data),n=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],i=r.getDate(),t=n[r.getMonth()],a=document.createElement("div");return a.className="card",a.innerHTML=`
      <div class="container-data">
        <p class="dia">${i}</p>
        <p>${t}</p>
      </div>
      <div class="container-info">
        <h3>${o.aluno}</h3>
        <div>
          <p>Orientador: ${o.orientador}</p>
          <p>Status: <span>${o.status}</span> </p>
          <p>Horário: ${o.horario}</p>
          <p>Local: ${o.local}</p>
        </div>
      </div>
  `,a}document.addEventListener("DOMContentLoaded",()=>{s();const o=document.querySelector(".defesas"),r=JSON.parse(localStorage.getItem("usuarioLogado"));if(!r){alert("Você precisar estar logado primeiro!"),window.location.href="login.html";return}const n=r.nome,t=new URLSearchParams(window.location.search).get("filtro");let a=c.filter(e=>e.aluno===n);t=="concluido"&&(a=a.filter(e=>e.status==="Concluído")),t=="andamento"&&(a=a.filter(e=>e.status==="Em andamento"));let d=document.createElement("div");d.className="cards-container",a.forEach(e=>{d.appendChild(l(e))}),o.appendChild(d)});
