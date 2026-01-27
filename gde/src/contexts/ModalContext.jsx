"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext({});

export function ModalProvider({ children }) {
  const [estaAberto, setEstaAberto] = useState(false);
  const [config, setConfig] = useState({
    titulo: "",
    mensagem: "",
    tipo: "info", // info, warning, success, error
    aoConfirmar: null,
  });

  const mostrarModal = ({
    titulo,
    mensagem,
    tipo = "info",
    aoConfirmar = null,
  }) => {
    setConfig({ titulo, mensagem, tipo, aoConfirmar });
    setEstaAberto(true);
  };

  const fecharModal = () => {
    setEstaAberto(false);
    setConfig({ titulo: "", mensagem: "", tipo: "info", aoConfirmar: null });
  };

  return (
    <ModalContext.Provider
      value={{ estaAberto, config, mostrarModal, fecharModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
