import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
        favorites: resolve(__dirname, "./src/favorites.html"),
        read: resolve(__dirname, "./src/read.html"),
      }
    }
  },
  plugins: [
    basicSsl(),
    injectHTML(),
  ],
});
