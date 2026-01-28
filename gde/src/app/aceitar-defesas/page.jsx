"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import ListaDefesas from "@/components/defesas/ListaDefesas";

import "@/css/aceitar-defesas.css";

export default function AceitarDefesas() {

  const router = useRouter();
  const { user, perfil, loading, logoutRef, defesas } = useAuth();

  const [lista, setLista] = useState([]);

  useEffect(() => {

    if (loading) return;

    if (!loading && !user && !logoutRef.current) {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Você precisa fazer login primeiro!",
                tipo: "warning"
            });
      router.push("/");
    }

    if (perfil.tipo_usuario !== "orientador") {
      mostrarModal({
                titulo: "Acesso negado!",
                mensagem: "Acesso permitido apenas para orientadores.",
                tipo: "warning"
            });
      router.push("/dashboard");
      return;
    }

    setLista(defesas);

  }, [user, perfil, loading, router]);

  if (loading || !user || !perfil) return null;

  return (
    <main className="solicitacoes-container">
      <div>
        <h2 className="solicitacoes-titulo">
        Solicitações Recebidas
      </h2>
      </div>
      <div>
        <ListaDefesas
        lista={lista}
        setLista={setLista}
        />
      </div>
    </main>
  );
}
