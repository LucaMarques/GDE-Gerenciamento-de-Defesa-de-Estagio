'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

const NotificacaoContext = createContext();

export function NotificacaoProvider({ children }) {
    const { user } = useAuth();

    const [notificacoes, setNotificacoes] = useState([]);
    const [loadingNotif, setLoadingNotif] = useState(true);

    async function buscarNotificacoes(){
        if (!user) return;
        
        const{ data } = await supabase
            .from("notificacoes")
            .select("*")
            .eq("usuario_id", user.id)
            .order("criada_em", { ascending: false });
        setNotificacoes(data || []);
        setLoadingNotif(false);
    }

    useEffect(() => {
        if (!user) {
            setNotificacoes([]);
            setLoadingNotif(false);
            return;
        }

        buscarNotificacoes();

        const channel = supabase
            .channel("notificacoes-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "notificacoes",
                    filter: `usuario_id=eq.${user.id}`,
                }, 
                () => buscarNotificacoes()
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    async function marcarComoLida(id){
        setNotificacoes((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, lida: true } : n
            )
        );

        await supabase
            .from("notificacoes")
            .update({ lida: true })
            .eq("id", id);
    }

    async function enviarNotificacao({
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

    const naoLidas = notificacoes.filter(n => !n.lida).length;

    return (
        <NotificacaoContext.Provider value={{notificacoes, naoLidas, marcarComoLida, loadingNotif, enviarNotificacao}}>
            {children}
        </NotificacaoContext.Provider>
  );
}

export function useNotificacao() {
    return useContext(NotificacaoContext);
}