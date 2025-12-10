import MenuLateral from '@/components/MenuLateral';
import MenuNotificacao from '@/components/MenuNotificacao';

export default function Header() {
  return (
    <header className="cabecalho">
      <div className="container-header">
        <MenuLateral />

        <a href="/" className="header-logo">
          <img src="./logo.png" alt="Logo GDE" />
        </a>

        <div className="botoes">
          <MenuNotificacao />
        </div>
      </div>
    </header>
  );
}