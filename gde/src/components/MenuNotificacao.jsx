'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MenuNotification() {
  const [aberto, setAberto] = useState(false);
  const [notificacao, setNotificacao] = useState([]);

  const toggle = () => setAberto(!aberto);

  useEffect(() => {
    async function buscarNotificacoes() {
      const { data, error } = await supabase
        .from('notificacoes')
        .select('id, texto')
        .order('created_at', { ascending: false });
      
      if (!error) setNotificacao(data);
    }
    buscarNotificacoes();
    }, []);

  return (
    <div className="notificacao">
      <button className="btn-notificacao" onClick={toggle}>
        <i className="bi bi-bell-fill"></i>
        <span className="badge">{notificacao.length}</span>
      </button>

      {aberto && (
        <div className="menu-notificacao">
          <h3>Notificações</h3>
          <ul>
            {notificacao.length === 0 ? (
            <p>Nenhuma notificação</p>
            ) : (
            notificacao.map((n) => (
              <li key={n.id}>{n.texto}</li>
            ))
          )}
          </ul>
        </div>
      )}
    </div>
  );
}