'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CampoSenha from '@/components/login/CampoSenha';
import { useRouter } from 'next/navigation';

export default function ResetSenha(){
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [msg, setMsg] = useState('');
    const [tipo, setTipo] = useState('');
    const [loading, setLoading] = useState(false);
    const [autenticado, setAutenticado] = useState(false);

    const router = useRouter();

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
            setMsg('Sessão não verificada. Por favor, recarregue a página.');
            setTipo('error');
            return;
        }

        if (senha !== confirmar){
            setMsg('As senhas não coincidem');
            setTipo('error');
            return;
        }

        if (senha.length < 6){
            setMsg('A senha deve ter pelo menos 6 caracteres');
            setTipo('error');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: senha,
            });

            setLoading(false);

            if (error){
                setMsg(`Erro ao redefinir senha: ${error.message}`);
                setTipo('error');
                return;
            } else {
                setMsg('Senha redefinida com sucesso!');
                setTipo('success');
                setTimeout(async () => {
                    await supabase.auth.signOut();
                    router.push('/login');
                }, 2500);

            }
        } catch (err) {
            setLoading(false);
            setMsg(`Erro: ${err.message}`);
            setTipo('error');
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
                        <input type="password" className="reset-input" placeholder="Nova senha" value={senha} onChange={(e) => setSenha(e.target.value)} ></input>
                        <input type="password" className="reset-input" placeholder="Confirmar senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} ></input>
                    </div>
                    <div className="reset-actions">
                        <button type="submit" className="reset-button" disabled={loading || !autenticado}>{loading ? 'Redefinindo...' : 'Redefinir Senha'}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}