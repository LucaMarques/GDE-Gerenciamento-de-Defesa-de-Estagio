import React, { useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function PerfilAvatar({ perfil, setPerfil }) {
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  async function handleUpload(e) {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (!perfil?.id) {
        alert("Erro: ID do perfil não encontrado. Tente recarregar a página.");
        return;
      }

      setUploading(true);
      console.log("Iniciando upload...");

      // 1. Definição do Caminho
      const fileExt = file.name.split('.').pop();
      const fileName = `${perfil.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`; 

      // 2. Upload para o Storage (Bucket 'avatars')
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("ERRO NO UPLOAD (Storage):", uploadError);
        throw new Error(`Erro no Storage: ${uploadError.message}`);
      }

      // 3. Pegar URL Pública
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      console.log("Upload sucesso. URL:", publicUrl);

      // 4. Salvar URL no Banco (Tabela 'profiles')
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', perfil.id);

      if (dbError) {
        console.error("ERRO NO BANCO:", dbError);
        throw new Error(`Erro ao salvar no banco: ${dbError.message}`);
      }

      // Sucesso total
      setPerfil({ ...perfil, avatar_url: publicUrl });
      alert("Foto atualizada com sucesso!");

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // Estilos
  const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
    img: { borderRadius: '50%', objectFit: 'cover', border: '4px solid #f1f5f9', backgroundColor: '#e2e8f0' },
    button: {
      backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1',
      padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500',
      transition: '0.2s'
    }
  };

  const avatarSrc = perfil?.avatar_url 
    ? perfil.avatar_url 
    : `https://ui-avatars.com/api/?name=${perfil?.nome_completo || 'User'}&background=random&color=fff&size=128`;

  return (
    <div style={styles.container}>
      <img 
        src={avatarSrc} 
        alt="Avatar" 
        width={96} height={96} 
        style={styles.img}
        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=User&background=ccc'; }}
      />
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleUpload} />
      <button type="button" style={styles.button} onClick={() => fileInput.current.click()} disabled={uploading}>
        {uploading ? 'Enviando...' : 'Trocar foto'}
      </button>
    </div>
  );
}