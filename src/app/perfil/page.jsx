"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PerfilForm from "@/components/perfil/PerfilForm";
import PerfilAvatar from "@/components/perfil/PerfilAvatar";

// UI Components
const Card = ({ children, style }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', height: 'fit-content', ...style }}>
    {children}
  </div>
);

const InfoItem = ({ label, valor, fullWidth }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</span>
    <span style={{ fontSize: '1rem', color: '#334155', fontWeight: '500', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', wordBreak: 'break-word' }}>{valor || '-'}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'Concluído': { bg: '#dcfce7', color: '#166534' },
    'Pendente': { bg: '#fee2e2', color: '#991b1b' },
    'default': { bg: '#fef3c7', color: '#92400e' }
  };
  const tema = styles[status] || styles['default'];
  return (
    <div style={{ marginTop: '20px', width: '100%' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>STATUS DA DEFESA</p>
      <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', backgroundColor: tema.bg, color: tema.color }}>
        {status || 'Não informado'}
      </span>
    </div>
  );
};

export default function PerfilPage() {
  const router = useRouter();
  const { user, perfil: authPerfil, loading } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (authPerfil) setPerfil(authPerfil);
  }, [authPerfil]);

  // CORREÇÃO: Redirecionamento seguro dentro do useEffect
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Mostra loading enquanto não decide
  if (loading || (!perfil && user)) return <div style={{ padding: '50px', textAlign: 'center', color: '#64748b' }}>Carregando perfil...</div>;
  if (!user) return null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <section style={{ display: 'flex', gap: '30px', width: '100%', maxWidth: '1100px', flexWrap: 'wrap' }}>
        
        {/* Card Esquerda */}
        <Card style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <PerfilAvatar perfil={perfil} setPerfil={setPerfil} />
          <h2 style={{ marginTop: '16px', color: '#1e293b', fontSize: '1.4rem' }}>{perfil?.nome_completo || perfil?.nome || 'Usuário'}</h2>
          <p style={{ color: '#64748b', background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', marginTop: '5px' }}>{perfil?.tipo_usuario || 'Aluno'}</p>
          <StatusBadge status={perfil?.status_defesa} />
        </Card>

        {/* Card Direita */}
        <Card style={{ flex: '2', minWidth: '340px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Informações Pessoais</h3>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} style={{ background: 'transparent', color: '#10b981', border: '1px solid #10b981', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Alterar Dados
              </button>
            )}
          </div>

          {isEditing ? (
            <PerfilForm perfil={perfil} setPerfil={setPerfil} finalizarEdicao={() => setIsEditing(false)} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px 20px' }}>
              <InfoItem label="Matrícula" valor={perfil?.matricula} />
              <InfoItem label="Curso" valor={perfil?.curso} />
              <InfoItem label="E-mail" valor={perfil?.email} fullWidth />
              <InfoItem label="CPF" valor={perfil?.cpf} />
              <InfoItem label="Telefone" valor={perfil?.telefone} />
              <InfoItem label="Data de Nascimento" valor={perfil?.data_nascimento} />
              <InfoItem label="Endereço" valor={perfil?.endereco} fullWidth />
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}