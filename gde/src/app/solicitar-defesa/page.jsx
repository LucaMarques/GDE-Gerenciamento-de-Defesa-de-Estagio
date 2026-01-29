"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useModal } from "@/contexts/ModalContext";

import FormSolicitarDefesa from "@/components/defesas/FormSolicitarDefesa";
import "@/css/solicitar-defesa.css";

export default function SolicitarDefesa() {
  const router = useRouter();
  const { user, perfil, loading, logoutRef } = useAuth();
  const [orientadores, setOrientadores] = useState([]);
  const { mostrarModal } = useModal();

  useEffect(() => {
    if (loading) return;
    if (!logoutRef) return;
    if (!user && !logoutRef.current) {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Você precisa fazer login primeiro!",
                tipo: "warning"
      });
      router.push("/");
    }
    if (!perfil) return;

    if (perfil.tipo_usuario !== "aluno") {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Acesso permitido apenas para alunos.",
                tipo: "warning"
      });
      router.push("/dashboard");
      return;
    }

    const buscarOrientadores = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome_completo")
        .eq("tipo_usuario", "orientador");

      if (!error) {
        setOrientadores(data);
      } else {
        console.error(error);
        mostrarModal({
                  titulo: "Erro!",
                  mensagem: "Erro ao carregar orientadores",
                  tipo: "error"
        });
      };
    };

    buscarOrientadores();

  }, [loading, user, perfil, router]);

  if (loading || !user || !perfil || orientadores.length === 0) return <p>Carregando...</p>;
  
  return (
    <main className="solicitacao-container">
      <FormSolicitarDefesa orientadores={orientadores}/>
    </main>
  );
}
