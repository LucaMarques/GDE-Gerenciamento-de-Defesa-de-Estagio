export function criarCard(defesa){

  const data = new Date(defesa.data);

  const meses= ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];

  const dia = data.getDate();
  const mes = meses[data.getMonth()];

  const card= document.createElement("div");
  card.className="card";
  card.innerHTML = `
      <div class="container-data">
        <p class="dia">${dia}</p>
        <p>${mes}</p>
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