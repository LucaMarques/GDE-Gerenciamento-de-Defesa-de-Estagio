'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function tempoRelativo(dataISO){
  const agora = new Date();
  const data = new Date(dataISO);

  const diffMs = agora - data;
  const diffSeg = Math.floor(diffMs/1000);
  const diffMin = Math.floor(diffSeg/60);
  const diffHora = Math.floor(diffMin/60);

  if (diffSeg < 60) return 'agora';
  if (diffMin < 60) return `há ${diffMin} min`;
  if (diffHora < 24) return `há ${diffHora} h`;

  const ontem = new Date(agora);
  ontem.setDate(agora.getDate()-1);
  if(
    data.getDate() === ontem.getDate() &&
    data.getMonth() === ontem.getMonth() &&
    data.getFullYear() === ontem.getFullYear()
  ) {
    return `ontem às ${data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return data.toLocaleDateString("pt-BR");
}

function iconePorTipo(tipo){
  if (tipo === 'alerta') return 'bi-exclamation-triangle-fill';
  if (tipo === 'sucesso') return 'bi-check-circle-fill';
  return 'bi-info-circle-fill';
}

export default function MenuNotification() {
  const [aberto, setAberto] = useState(false);
  const [notificacao, setNotificacao] = useState([]);
  const [userId, setUserId] = useState(null);

  const toggle = () => setAberto(!aberto);

  useEffect(() => {
    async function buscarUsuario(){
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    }
    buscarUsuario();
  }, []);

  useEffect(() => {
    if (!userId) return;
    async function buscarNotificacoes() {
      const { data, error } = await supabase
        .from('notificacoes')
        .select('id, mensagem, lida, tipo, criada_em')
        .eq('usuario_id', userId)
        .order('criada_em', { ascending: false });
      
      if (!error) setNotificacao(data);
    }
    buscarNotificacoes();

    const channel = supabase
      .channel('notificacoes-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema:'public',
          table: 'notificacoes',
          filter: `usuario_id=eq.${userId}`,
        },
        () => {
          buscarNotificacoes();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    }, [userId]);

  async function notificacaoLida(id){
      setNotificacao((prev) =>
        prev.map((n) =>
          n.id === id && !n.lida ? { ...n, lida: true } : n
        )
      );

      await supabase
        .from('notificacoes')
        .update({ lida: true })
        .eq('id', id);
  }

  const naoLidas = notificacao.filter(n => !n.lida).length;

  return (
    <div className="notificacao">
      <button className="btn-notificacao" onClick={toggle}>
        <i className="bi bi-bell-fill"></i>
        {naoLidas > 0 && <span className="badge">{naoLidas}</span>}
      </button>

      {aberto && (
        <div className="menu-notificacao">
          <h3>Notificações</h3>
          <ul>
            {notificacao.length === 0 ? (
              <p className="sem-notificacao">Nenhuma notificação</p>
            ) : (
              notificacao.map((n) => (
                <li key={n.id} onClick={() => notificacaoLida(n.id)} className={`tipo-${n.tipo} ${n.lida ? "lida" : ""}`}>
                  <div className="notificacao-item-content">
                    <div className="notificacao-header">
                      <i className={`bi ${iconePorTipo(n.tipo)} notificacao-icone`}></i>
                      <span className="notificacao-mensagem">{n.mensagem}</span>
                    </div>

                    <div className="notificacao-footer">
                      <span className="notificacao-data">{tempoRelativo(n.criada_em)}</span>
                      {!n.lida && (
                        <button className="btn-acao-notif" onClick={(e) => {
                            e.stopPropagation();
                            notificacaoLida(n.id);
                          }}>Marcar como lida</button>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}