"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificacao } from "@/contexts/NotificacaoContext";
import SelectOrientador from "./SelectOrientador";

export default function FormSolicitarDefesa({ orientadores }) {
  const router = useRouter();
  const { user, perfil, loading, logoutRef } = useAuth();
  const { mostrarModal } = useModal();
  const [tema, setTema] = useState("");
  const [orientadorId, setOrientadorId] = useState("");
  const [dataDefesa, setDataDefesa] = useState("");
  const { enviarNotificacao } = useNotificacao();
  const handleVoltar = () => router.push("/dashboard");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== Dados do form ===");
    console.log("Tema:", tema);
    console.log("Orientador ID:", orientadorId);
    console.log("Data da defesa:", dataDefesa);
    console.log("Aluno ID:", user?.id);
    console.log("Curso:", user?.curso || "Engenharia de Software");
    
    if (!tema || !orientadorId || !dataDefesa) {
      mostrarModal({
                titulo: "Campos vázios",
                mensagem: "Preencha todos os campos!",
                tipo: "warning"
      });
      return;
    }

    const { data: insertedData, error } = await supabase.from("defesas").insert([
      {
        tema,
        status: "Aguardando",
        data: dataDefesa,
        aluno_id: user.id,
        orientador_id: orientadorId,
        banca: [],
        curso: user.curso || "Engenharia de Software",
      },
    ]);

    console.log("Insert result:", { insertedData, error });
    
    if (error) {
      console.error("Erro ao criar defesa:", error);
      mostrarModal({
                titulo: "Erro!",
                mensagem: "Erro ao criar defesa",
                tipo: "error"
      });
      return;
    }

    const { data: aluno } = await supabase
      .from("profiles")
      .select("nome_completo")
      .eq("id", user.id)
      .single();

    const { data: orientador } = await supabase
      .from("profiles")
      .select("nome_completo")
      .eq("id", orientadorId)
      .single();

    await enviarNotificacao({
      usuario_id: orientadorId,
      tipo_usuario: "orientador",
      mensagem: `O aluno ${aluno.nome_completo} enviou uma solicitação de defesa com o tema: "${tema}".`,
      tipo: "info",
    });

    const { data: coordenadores, error: erroCoord } = await supabase
      .from("profiles")
      .select("id, nome_completo")
      .eq("tipo_usuario", "coordenador");

    if (erroCoord) {
      console.error("Erro ao buscar coordenadores:", erroCoord);
    }

    if (coordenadores && coordenadores.length) {
      for (const c of coordenadores) {
        await enviarNotificacao({
          usuario_id: c.id,
          tipo_usuario: "coordenador",
          mensagem: `Nova solicitação de defesa enviada por ${aluno.nome_completo}. Tema: "${tema}".`,
          tipo: "info",
        });
      }
    }

    mostrarModal({
                titulo: "Sucesso!",
                mensagem: "Defesa solicitada com sucesso!",
                tipo: "success"
    });    

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
          value={orientadorId}
          onChange={setOrientadorId}
        />
      </div>

      <div className="campo-grupo">
        <label className="campo-label">Data da Defesa</label>
        <input
          type="date"
          className="campo-input"
          value={dataDefesa}
          onChange={(e) => setDataDefesa(e.target.value)}
          required
        />
      </div>

      <div className="area-botoes">
        <button type="button" className="botao voltar" onClick={handleVoltar}>
          Voltar
        </button>
        <button type="submit" className="botao enviar" disabled={!user || orientadores.length === 0 || !tema || !orientadorId || !dataDefesa}>
          Solicitar
        </button>
      </div>
    </form>
  );
}

