'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useModal } from '@/contexts/ModalContext';
import CampoSenha from '@/components/login/CampoSenha';

export default function ResetSenha(){
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [msg, setMsg] = useState('');
    const [tipo, setTipo] = useState('');
    const [loading, setLoading] = useState(false);
    const [autenticado, setAutenticado] = useState(false);

    const router = useRouter();
    const { mostrarModal } = useModal();

    useEffect(() => {
        const verificarSessao = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setAutenticado(true);
            } else {
                setMsg('Sessão expirada. Solicite um novo link de redefinição de senha.');
                setTipo('error');
            }
        };

        verificarSessao();
    }, []);

    const handleReset = async(e) => {
        e.preventDefault();
        setMsg('');

        if (!autenticado) {
            mostrarModal({
                titulo: "Sessão Inválida",
                mensagem: "Sua sessão expirou. Por favor, solicite um novo link de redefinição de senha.",
                tipo: "error",
            });
            return;
        }

        if (senha !== confirmar){
            mostrarModal({
                titulo: "Senhas Não Coincidem",
                mensagem: "As senhas digitadas não são iguais. Verifique e tente novamente.",
                tipo: "warning",
            });
            return;
        }

        if (senha.length < 6){
            mostrarModal({
                titulo: "Senha Fraca ❌",
                mensagem: "A senha deve ter pelo menos 6 caracteres.",
                tipo: "warning",
            });
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: senha,
            });

            setLoading(false);

            if (error){
                mostrarModal({
                    titulo: "Erro ao Redefinir ❌",
                    mensagem: `${error.message}`,
                    tipo: "error",
                });
                return;
            } else {
                mostrarModal({
                    titulo: "Senha redifinida",
                    mensagem: "Sua senha foi redefinida com sucesso! Você será redirecionado para o login.",
                    tipo: "success",
                    aoConfirmar: async () => {
                        await supabase.auth.signOut();
                        router.push('/login');
                    }
                });
            }
        } catch (err) {
            setLoading(false);
            mostrarModal({
                titulo: "Erro Inesperado ❌",
                mensagem: err.message,
                tipo: "error",
            });
        }
    };

    return (
        <main className="reset-container">
            <div className="reset-page">
                <form className="reset-form" onSubmit={handleReset}>
                    <h2 className="reset-title">Nova Senha</h2>
                    <p className="reset-text">Escolha uma nova senha segura para acessar sua conta</p>
                    {msg && <div className={`reset-msg ${tipo}`}>{msg}</div>}
                    
                    <div className="reset-input-container">
                        <CampoSenha type="password" className="reset-input" placeholder="Nova senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <CampoSenha type="password" className="reset-input" placeholder="Confirmar senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
                    </div>
                    <div className="reset-actions">
                        <button type="submit" className="reset-button" disabled={loading || !autenticado}>{loading ? 'Redefinindo...' : 'Redefinir Senha'}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}