import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const CORS_ORIGIN = `${env.VITE_CORS_ORIGIN ?? 'http://localhost:5173'}`;
  const ALLOWED_HOSTS = `${env.VITE_ALLOWED_HOSTS ?? 'localhost'}`;
  return {
      plugins: [vue()],
      server: {
              cors: {
                    origin: [CORS_ORIGIN]
                    },
              allowedHosts: [ALLOWED_HOSTS]
               },
      resolve: {
        alias: {
          '@': path.resolve(pathSegments, './src'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      },
      esbuild: {
        supported: {
          'top-level-await': true //browsers can handle top-level-await features
        },
      },
   }
})
