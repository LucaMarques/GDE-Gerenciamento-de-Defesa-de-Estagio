"use client";

import { useEffect } from "react";

export default function BackgroundCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("bg-cadastro");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Aqui você coloca o código real do seu script de animação original
  }, []);

  return (
    <canvas
      id="bg-cadastro"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1
      }}
    />
  );
}