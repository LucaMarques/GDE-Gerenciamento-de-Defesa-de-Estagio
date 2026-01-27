"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { defesas } from "@/data/defesas";
import { usuariosBase } from "@/data/usuarios";

import ListaDefesas from "@/components/defesas/ListaDefesas";

import "@/css/aceitar-defesas.css";

export default function AceitarDefesas() {

  const router = useRouter();
  const [lista, setLista] = useState([]);

  useEffect(() => {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario || usuario.tipo !== "orientador") {
      alert("Acesso permitido apenas para orientadores.");
      router.push("/login");
      return;
    }

    let defesasLocal = JSON.parse(localStorage.getItem("defesas"));
    if (!Array.isArray(defesasLocal)) defesasLocal = [];

    const todasDefesas = [...defesas, ...defesasLocal];

    const recebidas = todasDefesas.filter(
      d => d.orientador === usuario.nome && d.status === "Aguardando"
    );

    setLista(recebidas);

  }, [router]);

  return (
    <main className="solicitacoes-container">

      <h2 className="solicitacoes-titulo">Solicitações Recebidas</h2>

      <ListaDefesas 
        lista={lista}
        setLista={setLista}
        usuariosBase={usuariosBase}
      />

    </main>
  );
}
