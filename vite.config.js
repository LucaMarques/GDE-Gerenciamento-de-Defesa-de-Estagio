import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/GDE-Gerenciamento-de-Defesa-de-Estagio/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        defesas: resolve(__dirname, 'defesas.html'),
        login: resolve(__dirname, 'login.html'),
        perfil: resolve(__dirname, 'perfil.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        aceitardefesas: resolve(__dirname, 'aceitar-defesas.html'),
        solicitardefesas: resolve(__dirname, 'solicitar-defesas.html'),
        relatorios: resolve(__dirname, 'relatorios.html')
      }
    }
  },

  server: {
    open: true  // abre o navegador automaticamente
  },

  plugins: []
})
