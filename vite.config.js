import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Static single-page app: `npm run build` writes everything to dist/.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800
  }
});
