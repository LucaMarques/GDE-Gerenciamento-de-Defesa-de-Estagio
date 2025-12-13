"use client"

import { useState } from "react";

export default function Overlay({ abrirLogin, abrirCadastro }) {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <h2 className="form-title form-title-light">Já tem conta?</h2>
        <p className="form-text">Para entrar na nossa plataforma faça login com suas informações</p>
        <button className="form-button form-button-light" onClick={abrirLogin}>
          Entrar
        </button>
      </div>
      <div className="overlay">
        <h2 className="form-title form-title-light">Olá!</h2>
        <p className="form-text">Cadastre-se e comece a usar a nossa plataforma on-line</p>
        <button className="form-button form-button-light" onClick={abrirCadastro}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}