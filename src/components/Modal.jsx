"use client";

import { useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import Swal from "sweetalert2";

export default function Modal() {
  const { estaAberto, config, fecharModal } = useModal();

  useEffect(() => {
    if (estaAberto) {
      Swal.fire({
        title: config.titulo,
        text: config.mensagem,
        icon: config.tipo, // 'success', 'error', 'warning', 'info'
        confirmButtonColor: "#0fa394",
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed && config.aoConfirmar) {
          config.aoConfirmar();
        }
        fecharModal();
      });
    }
  }, [estaAberto, config, fecharModal]);

  return null;
}
