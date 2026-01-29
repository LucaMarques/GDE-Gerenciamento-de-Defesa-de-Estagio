"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import CardGrid from "./CardGrid";
import { useModal } from "@/contexts/ModalContext";

export default function PainelUsuario() {

  const { user, perfil, loading, logoutRef } = useAuth();
  const router = useRouter();
  const { mostrarModal } = useModal();

  useEffect(() => {

    if (!loading && !user && !logoutRef.current) {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Você precisa fazer login primeiro!",
                tipo: "warning"
            });
      router.push("/");
    }

  }, [user, loading, router]);

  if (loading || !user || !perfil) return null;

  const tipoUsuario = perfil.tipo_usuario;
  const nome = perfil.nome_completo;

  const nomeTipo =
    tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);

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
