"use client";

import { useState } from "react";
import CampoSenha from "@/components/login/CampoSenha";
import { useRouter } from "next/navigation";

export default function LoginForm({ abrirCadastro }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (email === "user@domain.com" && senha === "senha123") {
            alert(`Bem-vindo, Usuário!`);
            router.push("/dashboard");
        } else {
            setErro("Email ou senha incorretos!");
        }
    };

    return (
        <form className="form form-login">
            <h2 className="form-title">Entrar</h2>

            <div className="form-input-container">
                {erro && <div className="msg-error">{erro}</div>}
                <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <CampoSenha
                    id="senha-login"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <a className="form-link">Esqueceu a senha?</a>

            <button type="button" onClick={handleLogin} className="form-button">
                Logar
            </button>

            <p className="mobile-text">
                Não tem conta?{" "}
                <a href="#" onClick={abrirCadastro}>
                    Registre-se
                </a>
            </p>
        </form>
    );
}