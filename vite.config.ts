import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      values: {
        'process.env': `(process.env || {})`,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
