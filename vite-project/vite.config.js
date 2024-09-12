import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7228',  // URL de tu backend .NET
        changeOrigin: true,
        secure: false,  // Aceptar conexiones HTTPS no seguras (sin certificado válido)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
