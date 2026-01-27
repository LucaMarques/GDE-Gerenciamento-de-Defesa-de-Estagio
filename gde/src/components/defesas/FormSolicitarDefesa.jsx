"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//import { enviarNotificacao } from "@/components/notificacao";

import SelectOrientador from "./SelectOrientador";

export default function FormSolicitarDefesa({ orientadores }) {

  const router = useRouter();

  const [tema, setTema] = useState("");
  const [orientador, setOrientador] = useState("");

  const handleVoltar = () => {
    router.push("/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) {
      alert("Você precisa estar logado");
      router.push("/login");
      return;
    }

    if (!tema || !orientador) {
      alert("Preencha todos os campos");
      return;
    }

    const novaDefesa = {
      aluno: usuario.nome,
      orientador: orientador,
      status: "Aguardando",
      data: "0000-00-00",
      horario: "00:00",
      banca: [],
      local: "",
      tema: tema
    };

    let lista = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(lista)) lista = [];

    lista.push(novaDefesa);
    localStorage.setItem("defesas", JSON.stringify(lista));
    /*
    // Notifica orientador
    const msgOrientador = `O aluno ${usuario.nome} solicitou defesa sobre "${tema}".`;
    enviarNotificacao(orientador, msgOrientador, "alerta");

    // Notifica coordenadores
    const usuariosArmazenados =
      JSON.parse(localStorage.getItem("usuarios")) || usuariosBase;

    const coordenadores = usuariosArmazenados.filter(
      u => u.tipo === "coordenador"
    );

    coordenadores.forEach(c => {
      const msg = `O aluno ${usuario.nome} solicitou defesa sobre "${tema}" com o orientador ${orientador}.`;
      enviarNotificacao(c.nome, msg, "info");
    });*/

    alert("Solicitação enviada com sucesso!");

    router.push("/defesas");
  };

  return (
    <form className="solicitacao-form" onSubmit={handleSubmit}>

      <h2 className="solicitacao-titulo">Solicitar Defesa</h2>

      <div className="campo-grupo">
        <label className="campo-label">Tema do Trabalho</label>

        <input
          type="text"
          className="campo-input"
          placeholder="Digite o tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        />
      </div>

      <div className="campo-grupo">
        <label className="campo-label">Orientador</label>

        <SelectOrientador 
          orientadores={orientadores}
          value={orientador}
          onChange={setOrientador}
        />
      </div>

      <div className="area-botoes">

        <button
          type="button"
          className="botao voltar"
          onClick={handleVoltar}
        >
          Voltar
        </button>

        <button
          type="submit"
          className="botao enviar"
        >
          Solicitar
        </button>

      </div>

    </form>
  );
}
