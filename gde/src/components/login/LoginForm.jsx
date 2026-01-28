"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"
import { useModal } from "@/contexts/ModalContext";
import CampoSenha from "@/components/login/CampoSenha";

export default function LoginForm({ abrirCadastro }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const router = useRouter();
    const { mostrarModal } = useModal();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        if (!email || !senha){
            setErro('Preencha todos os campos')
            return;
        }

        if (!emailRegex.test(email)){
            setErro('Email em formato inválido')
            return;
        }

        try {
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
                return;
            }
            mostrarModal({
                titulo: "Login realizado com sucesso",
                mensagem: "Você será redirecionado para o sistema.",
                tipo: "success",
                aoConfirmar: () => {
                    router.replace("/dashboard");
                }
            });
        } catch (err) {
            setErro('Erro inesperado ao fazer login');
        } finally {
            setLoading(false);
        }
    }; 

    const handleResetSenha = async () => {
        if (!email) {
            mostrarModal({
                titulo: "Email Obrigatório ❌",
                mensagem: "Informe seu email para redefinir a senha.",
                tipo: "warning",
            });
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:3000/reset-senha",
        });

        setLoading(false);

        if (error) {
            mostrarModal({
                titulo: "Erro ao Enviar Email ❌",
                mensagem: "Não conseguimos enviar o email de redefinição. Verifique o email e tente novamente.",
                tipo: "error",
            });
        } else {
            mostrarModal({
                titulo: "Email Enviado! 📧",
                mensagem: `Um link de redefinição foi enviado para ${email}. Verifique sua caixa de entrada e spam.`,
                tipo: "success",
            });
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

            <button type="button" className="form-link" onClick={handleResetSenha}>Esqueceu a senha?</button>

            <button type="submit" className="form-button primary" disabled={loading}>{loading ? 'Entrando...' : 'Logar'}</button>

            <p className="mobile-text">
                Não tem conta?{" "}
                <a href="#" onClick={abrirCadastro}>Registre-se</a>
            </p>
        </form>
    );
}