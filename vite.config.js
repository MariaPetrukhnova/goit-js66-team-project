import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    basicSsl(),
    injectHTML(),
  ],
});
