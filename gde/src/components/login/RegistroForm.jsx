"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"
import CampoSenha from "@/components/login/CampoSenha";

export default function RegistroForm({ abrirLogin }) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex = /^.{6,}$/;
  const nomeRegex = /^[A-Za-zÀ-ÿ]+ [A-Za-zÀ-ÿ]+$/;

  const handleNomeChange = (e) =>{
    let valor = e.target.value;

    valor = valor.replace(/[0-9]/g, '');
    valor = valor.replace(/\s{2,}/g, '');
    setNome(valor);
  }

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
  
    if (!nome || !matricula || !email || !senha || !tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!nomeRegex.test(nome)) {
      setErro("Informe nome e sobrenome");
      return;
    }

    if (!emailRegex.test(email)) {
      setErro("Formato de email inválido")
      return;
    }

    if (!senhaRegex.test(senha)) {
      setErro("Senha tem que ter 6 caracteres")
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome_completo: nome,
            tipo_usuario: tipo,
            matricula
          }
        }
      });
      
      if (error) {
        setErro(error.message);
        setLoading(false);
        return;
      }

      if (!data.user){
        alert("Cadastro realizado! Verifique seu email para confirmar a conta.");
        abrirLogin();
        setLoading(false);
        return;
      }
      alert("Cadastro realizado com sucesso!");
      abrirLogin();
    }catch (err) {
      console.error(err);
      setErro("Erro inesperado. Tente novamente mais tarde.");
    }finally{
      setLoading(false);
    }
  };

  return (
    
    <form className="form form-register" onSubmit={handleCadastro}>
      <h2 className="form-title">Criar Conta</h2>

      {erro && (<div className="msg-error">{erro}</div>)}

      <div className="form-tipo">
        <select className="selectpicker" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione o tipo</option>
          <option value="aluno">Aluno</option>
          <option value="orientador">Orientador</option>
          <option value="coordenador">Coordenador</option>
        </select>
      </div>

      <div className="form-input-container">
        <input type="text" className="form-input" placeholder="Nome completo" value={nome} onChange={handleNomeChange} onBlur={() => {const formatado = nome
          .trim()
          .replace(/\s+/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
          setNome(formatado); }} />
        <input type="text" className="form-input" placeholder="Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)}/>
        <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <CampoSenha id="senha-cadastro" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        handleCadastro(e);
                    }
        }}/>
      </div>

      <button type="submit" disabled={loading} className="form-button">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>

      <p className="mobile-text">
        Já tem conta?{" "}
        <a onClick={abrirLogin}>Login</a>
      </p>
    </form>
  );
}