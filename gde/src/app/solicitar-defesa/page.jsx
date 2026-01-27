"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { usuariosBase } from "@/data/usuarios";
import FormSolicitarDefesa from "@/components/defesas/FormSolicitarDefesa";

import "@/css/solicitar-defesa.css";

export default function SolicitarDefesa() {

  const router = useRouter();
  const [orientadores, setOrientadores] = useState([]);

  useEffect(() => {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario || usuario.tipo !== "aluno") {
      alert("Acesso permitido apenas para alunos.");
      router.push("/login");
      return;
    }

    const professores = usuariosBase.filter(
      u => u.tipo === "orientador"
    );

    setOrientadores(professores);

  }, [router]);

  return (
    <main className="solicitacao-container">

      <FormSolicitarDefesa 
        orientadores={orientadores}
      />

    </main>
  );
}
