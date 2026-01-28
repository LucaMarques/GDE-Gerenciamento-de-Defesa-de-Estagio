"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import CardGrid from "./CardGrid";

export default function PainelUsuario() {

  const { user, perfil, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!loading && !user) {
      alert("Acesso restrito! Você precisa fazer login primeiro.");
      router.push("/");
    }

  }, [user, loading, router]);

  if (loading || !user || !perfil) return null;

  const tipoUsuario = perfil.tipo_usuario;
  const nome = perfil.nome_completo;

  const nomeTipo =
    tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);

  console.log(perfil);

  return (
    <main className="painel">

      <h1 id="tituloUsuario">
        Painel do {nomeTipo}
      </h1>

      <p id="nomeUsuario">
        Bem-vindo, {nome}
      </p>

      <CardGrid tipoUsuario={tipoUsuario} />

    </main>
  );
}
