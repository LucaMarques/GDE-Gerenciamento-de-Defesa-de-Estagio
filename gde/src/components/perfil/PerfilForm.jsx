import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function PerfilForm({ perfil, setPerfil, finalizarEdicao }) {
  // Inicializamos o form garantindo que use 'nome_completo'
  const [form, setForm] = useState({ 
    ...perfil,
    nome_completo: perfil.nome_completo || perfil.nome || '' 
  });
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpa erro ao digitar
    setErros((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // Validação regex para telefone (formato brasileiro)
    const telefoneRegex = /^(\(?\d{2}\)?\s?)?(9\d{4}|[2-9]\d{3})-?\d{4}$/;
    let valid = true;
    let novosErros = {};
    if (form.telefone && !telefoneRegex.test(form.telefone)) {
      novosErros.telefone = 'Telefone inválido. Use o formato (99) 99999-9999 ou 9999-9999';
      valid = false;
    }
    setErros(novosErros);
    if (!valid) return;

    setSalvando(true);
    console.log("Enviando dados:", form);

    try {
      // Atualiza usando o nome EXATO da coluna no banco: 'nome_completo'
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          nome_completo: form.nome_completo, // <--- CORREÇÃO PRINCIPAL AQUI
          telefone: form.telefone,
          endereco: form.endereco,
          data_nascimento: form.data_nascimento,
          cpf: form.cpf,
          // Não enviamos email/matricula/cpf pois geralmente são travados
        })
        .eq('id', perfil.id)
        .select()
        .single();

      if (error) throw error;

      setPerfil(data);
      finalizarEdicao();
      
    } catch (error) {
      console.error("ERRO AO SALVAR:", error);
      alert(`Erro ao salvar: ${error.message || "Verifique o console"}`);
    } finally {
      setSalvando(false);
    }
  }

  // Estilos
  const s = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    colFull: { gridColumn: '1 / -1' },
    label: { display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '4px', fontWeight: '600' },
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', color: '#1e293b', background: '#fff' },
    btnSalvar: { backgroundColor: '#10b981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' },
    btnCancelar: { backgroundColor: '#ef4444', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={s.grid}>
        <div style={s.colFull}>
          <label style={s.label}>Nome Completo</label>
          {/* Input name deve ser 'nome_completo' */}
          <input name="nome_completo" value={form.nome_completo || ''} onChange={handleChange} style={s.input} />
        </div>

        <div>
          <label style={s.label}>Telefone</label>
          <input name="telefone" value={form.telefone || ''} onChange={handleChange} style={s.input} />
          {erros.telefone && (
            <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '2px', display: 'block' }}>{erros.telefone}</span>
          )}
        </div>
        
        <div>
          <label style={s.label}>Data de Nascimento</label>
          <input name="data_nascimento" type="date" value={form.data_nascimento || ''} onChange={handleChange} style={s.input} />
        </div>

        <div style={s.colFull}>
          <label style={s.label}>Endereço</label>
          <input name="endereco" value={form.endereco || ''} onChange={handleChange} style={s.input} />
        </div>

        {/* Campos de Leitura */}
        <div style={s.colFull}>
           <label style={s.label}>E-mail (Login)</label>
           <input value={form.email || ''} disabled style={{...s.input, background: '#f1f5f9', color: '#94a3b8'}} />
        </div>
        <div>
           <label style={s.label}>Matrícula</label>
           <input value={form.matricula || ''} disabled style={{...s.input, background: '#f1f5f9', color: '#94a3b8'}} />
        </div>
        <input
            name="cpf"
            value={form.cpf || ''}
            onChange={handleChange}
            disabled={!!perfil.cpf} // 🔒 só bloqueia se já existir no banco
            style={{
              ...s.input,
              background: perfil.cpf ? '#f1f5f9' : '#fff',
              color: perfil.cpf ? '#94a3b8' : '#1e293b'
            }}
        />
      </div>
      
      <div style={{ textAlign: 'right', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button type="button" onClick={finalizarEdicao} style={s.btnCancelar}>Cancelar</button>
        <button type="submit" style={s.btnSalvar} disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}