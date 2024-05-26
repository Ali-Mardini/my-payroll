import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitestConfig from './vitest.config';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
  optimizeDeps: {
    exclude: ['vitest'],
  },
});
