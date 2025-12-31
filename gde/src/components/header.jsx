"use client"

import { useAuth } from '@/contexts/AuthContext';
import MenuLateral from '@/components/MenuLateral';
import MenuNotificacao from '@/components/MenuNotificacao';

export default function Header() {
  const { user, loading } = useAuth();

  const usuarioLogado = !loading && user;

  return (
    <header className="cabecalho">
      <div className="container-header">
        {usuarioLogado && <MenuLateral />}

        <a href="/" className={`header-logo ${!usuarioLogado ? "logo-centralizada" : ""}`}>
          <img src="./logo.png" alt="Logo GDE" />
        </a>

        <div className="botoes">
          {usuarioLogado && <MenuNotificacao />}
        </div>
      </div>
    </header>
  );
}