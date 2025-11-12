export function criarCard(defesa){
  const card= document.createElement("div");
  card.className="card";
  card.innerHTML = `
      <div class="container-data">
        <p class="dia">13</p>
        <p>Julho</p>
      </div>
      <div class="container-info">
        <h3>${defesa.aluno}</h3>
        <div>
          <p>Orientador: ${defesa.orientador}</p>
          <p>Status: <span>${defesa.status}</span> </p>
          <p>Horário: ${defesa.horario}</p>
          <p>Local: ${defesa.local}</p>
        </div>
      </div>
  `;

  return card;
}