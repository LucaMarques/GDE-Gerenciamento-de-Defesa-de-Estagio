"use client";

import CardDefesa from "./CardDefesa";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useModal } from "@/contexts/ModalContext";
import { useNotificacao } from "@/contexts/NotificacaoContext";

export default function ListaDefesas() {
    const { defesas, setDefesas, perfil } = useAuth();
    const { mostrarModal } = useModal();
    const { enviarNotificacao } = useNotificacao();

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


        const { data: pessoas, error: erroPessoas } = await supabase
            .from("profiles")
            .select("id, nome_completo")
            .in("id", [defesa.aluno_id, defesa.orientador_id]);

        if (erroPessoas) {
            console.error("Erro ao buscar nomes:", erroPessoas);
            return;
        }

        const aluno = pessoas.find(p => p.id === defesa.aluno_id);
        const orientador = pessoas.find(p => p.id === defesa.orientador_id);

        const { data: coordenador, error: erroCoord } = await supabase
            .from("profiles")
            .select("id, nome_completo")
            .eq("tipo_usuario", "coordenador")
            .maybeSingle();

        if (erroCoord) {
            console.error("Erro ao buscar coordenador:", erroCoord);
        }

        // Envia mensagem para o aluno
        await enviarNotificacao({
            usuario_id: defesa.aluno_id,
            tipo_usuario: "aluno",
            mensagem:
                novoStatus === "Aceita"
                ? `Sua defesa foi aceita pelo orientador ${orientador.nome_completo}. Tema: "${defesa.tema}".`
                : `Sua defesa foi recusada pelo orientador ${orientador.nome_completo}. Tema: "${defesa.tema}".`,
            tipo: novoStatus === "Aceita" ? "sucesso" : "alerta",
        });
        
        // Envia mensagem para o coordenador (se encontrado)
        if (coordenador && coordenador.id) {
            await enviarNotificacao({
                usuario_id: coordenador.id,
                tipo_usuario: "coordenador",
                mensagem:
                    novoStatus === "Aceita"
                    ? `A defesa do aluno ${aluno.nome_completo} foi aceita pelo orientador ${orientador.nome_completo}. Tema: "${defesa.tema}".`
                    : `A defesa do aluno ${aluno.nome_completo} foi recusada pelo orientador ${orientador.nome_completo}. Tema: "${defesa.tema}".`,
                tipo: "info",
            });
        }

        mostrarModal({
            titulo: "Sucesso!",
            mensagem: "Status atualizado",
            tipo: "success"
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
