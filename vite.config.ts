
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'figma:asset/e9f3f4cb580b0827ed78bb6ecbe12efcb70b7930.png': path.resolve(__dirname, './src/assets/e9f3f4cb580b0827ed78bb6ecbe12efcb70b7930.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });