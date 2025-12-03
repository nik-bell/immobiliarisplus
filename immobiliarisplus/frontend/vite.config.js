import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/events': {
        target: 'https://events.mapbox.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/events/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            // Silently ignore errors
          });
        },
      },
    },
  },
})
