"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"
import CampoSenha from "@/components/login/CampoSenha";

export default function LoginForm({ abrirCadastro }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault('');
        setErro('');

        if (!email || !senha){
            setErro('Preencha todos os campos')
            return;
        }

        if (!emailRegex.test(email)){
            setErro('Email em formato inválido')
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });

        if (error) {
            if (error.message.includes('Email not confirmed')){
                console.log('Confirme seu email antes de fazer login.');
            } else if (error.message.includes('Invalid login credentials')){
                setErro('Email ou senha incorretos'); 
            } else {
                setErro('Erro ao fazer login');
            }
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push("/dashboard")
    };

    const handleResetSenha = async () => {
        if (!email) {
            setErro("Informe seu email para redefinir a senha");
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            setErro("Erro ao enviar email de redefinição");
        } else {
            alert("Email de redefinição enviado!");
        }
    };

    return (
        <form className="form form-login" onSubmit={handleLogin}>
            <h2 className="form-title">Entrar</h2>

            <div className="form-input-container">
                {erro && <div className="msg-error">{erro}</div>}
                <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <CampoSenha id="senha-login" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        handleLogin(e);
                    }
                }} />
            </div>

            <a className="form-link" onClick={handleResetSenha}>Esqueceu a senha?</a>

            <button type="submit" className="form-button" disabled={loading}>{loading ? 'Entrando...' : 'Logar'}</button>

            <p className="mobile-text">
                Não tem conta?{" "}
                <a href="#" onClick={abrirCadastro}>Registre-se</a>
            </p>
        </form>
    );
}