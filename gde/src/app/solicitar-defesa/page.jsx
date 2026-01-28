"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

import FormSolicitarDefesa from "@/components/defesas/FormSolicitarDefesa";

import "@/css/solicitar-defesa.css";

export default function SolicitarDefesa() {

  const router = useRouter();
  const { user, perfil, loading } = useAuth();

  const [orientadores, setOrientadores] = useState([]);

  useEffect(() => {

    if (loading) return;

    // Proteção de rota
    if (!user || !perfil) {
      alert("Você precisa estar logado.");
      router.push("/");
      return;
    }

    if (perfil.tipo_usuario !== "aluno") {
      alert("Acesso permitido apenas para alunos.");
      router.push("/dashboard");
      return;
    }

    buscarOrientadores();

  }, [loading, user, perfil, router]);

  const buscarOrientadores = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("id, nome_completo")
      .eq("tipo_usuario", "orientador");

    if (!error) {
      setOrientadores(data);
    } else {
      console.error(error);
      alert("Erro ao carregar orientadores");
    }
  };

  return (
    <main className="solicitacao-container">

      <FormSolicitarDefesa 
        orientadores={orientadores}
      />

    </main>
  );
}
