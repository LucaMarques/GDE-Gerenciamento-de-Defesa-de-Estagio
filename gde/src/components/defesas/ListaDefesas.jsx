"use client";

import CardDefesa from "./CardDefesa";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useModal } from "@/contexts/ModalContext";
// import { enviarNotificacao } from "@/components/notificacao";

export default function ListaDefesas() {
    const { defesas, setDefesas, perfil } = useAuth();
    const { mostrarModal } = useModal();

    const defesasAguardando = defesas?.filter(
        (defesa) => defesa.status === "Aguardando"
    );

    const atualizarStatus = async (defesa, novoStatus) => {
        const { error } = await supabase
            .from("defesas")
            .update({ status: novoStatus })
            .eq("id", defesa.id);

        if (error) {
            mostrarModal({
                titulo: "Erro!",
                mensagem: "Falha ao atualizar o status",
                tipo: "error"
            });
            console.error("Erro ao atualizar status:", error);
            return;
        }

        // Atualiza o estado global (context)
        setDefesas((prev) =>
            prev.map((d) =>
                d.id === defesa.id ? { ...d, status: novoStatus } : d)
        );

        /*
        enviarNotificacao(
            defesa.aluno_id,
            `Sua defesa sobre "${defesa.tema}" foi ${statusTexto}.`,
            tipoNotif
        );
        */

        mostrarModal({
                titulo: "Sucesso!",
                mensagem: "Status atualizado",
                tipo: "Sucess"
            });

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
