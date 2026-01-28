"use client";

import CardDefesa from "./CardDefesa";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
// import { enviarNotificacao } from "@/components/notificacao";

export default function ListaDefesas() {
    const { defesas, setDefesas, perfil } = useAuth();

    const defesasAguardando = defesas?.filter(
        (defesa) => defesa.status === "Aguardando"
    );

    const atualizarStatus = async (defesa, novoStatus) => {
        const { error } = await supabase
            .from("defesas")
            .update({ status: novoStatus })
            .eq("id", defesa.id);

        if (error) {
            console.error("Erro ao atualizar status:", error);
            alert("Erro ao atualizar o status.");
            return;
        }

        // Atualiza o estado global (context)
        setDefesas((prev) =>
            prev.map((d) =>
                d.id === defesa.id ? { ...d, status: novoStatus } : d)
        );

        /*
        let statusTexto =
            novoStatus === "Recusado" ? "recusada" : "aceita";
        let tipoNotif =
            novoStatus === "Recusado" ? "alerta" : "sucesso";

        enviarNotificacao(
            defesa.aluno_id,
            `Sua defesa sobre "${defesa.tema}" foi ${statusTexto}.`,
            tipoNotif
        );
        */

        alert("Status atualizado com sucesso.");
    };

    if (!defesasAguardando || defesasAguardando.length === 0) {
        return (
            <div className="lista-defesas-vazia">
                Nenhuma solicitação pendente.
            </div>
        );
    }

    return (
        <div className="lista-defesas">
            {defesasAguardando.map((defesa) => (
                <CardDefesa
                    key={defesa.id}
                    defesa={defesa}
                    atualizarStatus={atualizarStatus}
                    perfil={perfil}
                />
            ))}
        </div>
    );
}
