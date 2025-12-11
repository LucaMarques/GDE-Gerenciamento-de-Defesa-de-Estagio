"use client";

import { useState } from "react";
import CampoSenha from "@/components/login/CampoSenha";

export default function RegisterForm({ abrirLogin }) {
  return (
    <form className="form form-register">
      <h2 className="form-title">Criar Conta</h2>

      <div className="form-tipo">
        <select className="selectpicker">
          <option value="">Selecione o tipo</option>
          <option value="aluno">Aluno</option>
          <option value="orientador">Orientador</option>
          <option value="coordenador">Coordenador</option>
        </select>
      </div>

      <div className="form-input-container">
        <input type="text" className="form-input" placeholder="Nome completo" />
        <input type="text" className="form-input" placeholder="Matricula" />
        <input type="email" className="form-input" placeholder="Email" />
        <CampoSenha id="senha-cadastro" placeholder="Senha" />
      </div>

      <button type="button" className="form-button">Cadastrar</button>

      <p className="mobile-text">
        Já tem conta?
        <a onClick={abrirLogin}>Login</a>
      </p>
    </form>
  );
}