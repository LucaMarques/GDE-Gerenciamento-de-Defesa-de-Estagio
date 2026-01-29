import { supabase } from "@/lib/supabaseClient";

export async function enviarNotificacao({
  usuario_id,
  tipo_usuario,
  mensagem,
  tipo = "info",
}) {
  const { error } = await supabase
    .from("notificacoes")
    .insert({
      usuario_id,
      tipo_usuario,
      mensagem,
      tipo,
    });

  if (error) {
    console.error("Erro ao enviar notificação:", error);
  }
}