import "../css/base.css";
import "../css/relatorios.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { criaHeader } from "./components/header.js";
import { criaFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = criaHeader();
  const footer = criaFooter();
  document.body.prepend(header);
  document.body.append(footer);
  try {
    const btnMenu = document.getElementById("btn-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const btnFechar = document.getElementById("btn-fechar");

    if (btnMenu && menuLateral && btnFechar) {
      btnMenu.addEventListener("click", () => {
        menuLateral.style.width = "250px";
      });

      btnFechar.addEventListener("click", () => {
        menuLateral.style.width = "0";
      });
    } else {
      console.warn("Elementos do menu lateral não encontrados.");
    }
  } catch (e) {
    console.error("Erro ao configurar menu lateral:", e);
  }
});
