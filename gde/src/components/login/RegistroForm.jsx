"use client";

import { useState } from "react";
import CampoSenha from "@/components/login/CampoSenha";

export default function RegistroForm({ abrirLogin }) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    if (nome && matricula && email && senha) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Preencha todos os campos.");
    }
  };

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
        <input
          type="text"
          className="form-input"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <input
          type="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CampoSenha
          id="senha-cadastro"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleCadastro} className="form-button">
        Cadastrar
      </button>

      <p className="mobile-text">
        Já tem conta?{" "}
        <a onClick={abrirLogin}>Login</a>
      </p>
    </form>
  );
}