"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import { defesas } from "@/data/defesas";
import { usuariosBase } from "@/data/usuarios";

import ListaDefesas from "@/components/defesas/ListaDefesas";

import "@/css/aceitar-defesas.css";

export default function AceitarDefesas() {

  const router = useRouter();
  const { user, perfil, loading } = useAuth();

  const [lista, setLista] = useState([]);

  useEffect(() => {

    if (loading) return;

    if (!user || !perfil) {
      alert("Você precisa estar logado.");
      router.push("/");
      return;
    }

    if (perfil.tipo_usuario !== "orientador") {
      alert("Acesso permitido apenas para orientadores.");
      router.push("/dashboard");
      return;
    }

    const nomeOrientador = perfil.nome_completo;

    // usando mock por enquanto
    let defesasLocal = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(defesasLocal)) defesasLocal = [];

    const todasDefesas = [...defesas, ...defesasLocal];

    const recebidas = todasDefesas.filter(
      d =>
        d.orientador === nomeOrientador &&
        d.status === "Aguardando"
    );

    setLista(recebidas);

  }, [user, perfil, loading, router]);

  if (loading || !user || !perfil) return null;

  return (
    <main className="solicitacoes-container">

      <h2 className="solicitacoes-titulo">
        Solicitações Recebidas
      </h2>

      <ListaDefesas
        lista={lista}
        setLista={setLista}
        usuariosBase={usuariosBase}
      />

    </main>
  );
}
