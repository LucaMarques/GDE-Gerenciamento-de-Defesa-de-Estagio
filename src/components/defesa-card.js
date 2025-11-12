export function criarCard(defesa){
  const card= document.createElement("div");
  card.className="card";
  card.innerHTML = `
      <h3>${defesa.aluno}</h3>
      <div class="container-info">
        <div>
          <p>Orientador: ${defesa.orientador}</p>
          <p>Status: ${defesa.status}</p>
          <p>Data: ${defesa.data}</p>
          <p>Horário: ${defesa.horario}</p>
        </div>
        <div>
          <p>Banca: ${defesa.banca.join(', ')}</p>
          <p>Local: ${defesa.local}</p>
          <p>Tema: ${defesa.tema}</p>
        </div>
      </div>
  `;

  return card;
}