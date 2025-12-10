'use client'

import { useState } from "react";

export default function MenuNotification() {
  const [aberto, setAberto] = useState(false);

  const toggle = () => setAberto(!aberto);

  return (
    <div className="notificacao">
      <a className="btn-notificacao" onClick={toggle}>
        <i className="bi bi-bell-fill"></i>
        <span className="badge">{3}</span>
      </a>

      {aberto && (
        <div className="menu-notificacao">
          <h3>Notificações</h3>
          <ul>
            <li>Notificação 1</li>
            <li>Notificação 2</li>
            <li>Notificação 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}