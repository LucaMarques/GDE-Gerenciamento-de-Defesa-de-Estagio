"use client";

import CardDefesa from "./CardDefesa";
//import { enviarNotificacao } from "@/components/notificacao";

export default function ListaDefesas({ lista, setLista, usuariosBase }) {

  const atualizarStatus = (defesa, novoStatus) => {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    let listaLocal = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(listaLocal)) listaLocal = [];

    const item = listaLocal.find(
      d => d.aluno === defesa.aluno && d.tema === defesa.tema
    );

    if (item) {
      item.status = novoStatus;
    } else {
      listaLocal.push({
        ...defesa,
        status: novoStatus
      });
    }

    localStorage.setItem("defesas", JSON.stringify(listaLocal));

    let statusTexto;
    let tipoNotif;

    if (novoStatus === "Recusado") {
      statusTexto = "recusada";
      tipoNotif = "alerta";
    } else {
      statusTexto = "aceita";
      tipoNotif = "sucesso";
    }

    const mensagemAluno = `Sua defesa sobre "${defesa.tema}" foi ${statusTexto}.`;
    enviarNotificacao(defesa.aluno, mensagemAluno, tipoNotif);

    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || usuariosBase;

    const coordenadores = usuariosArmazenados.filter(
      u => u.tipo === "coordenador"
    );

    coordenadores.forEach(c => {
      const msg = `A defesa de ${defesa.aluno} foi ${statusTexto}.`;
      enviarNotificacao(c.nome, msg, tipoNotif);
    });

    alert("Status atualizado com sucesso.");

    setLista(prev =>
      prev.filter(
        d => !(d.aluno === defesa.aluno && d.tema === defesa.tema)
      )
    );
  };

  if (lista.length === 0) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Nenhuma solicitação pendente.
      </p>
    );
  }

  return (
    <div className="lista-defesas">
      {lista.map((defesa, index) => (
        <CardDefesa 
          key={index}
          defesa={defesa}
          atualizarStatus={atualizarStatus}
        />
      ))}
    </div>
  );
}
