import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react(), PWA()],
  server: {
    open: true,
    headers: { 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' }
  }
})

function PWA() {
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'My PWA',
      short_name: 'PWA',
      description: 'My awesome Progressive Web App!',
      theme_color: '#ffffff',
      icons: [],
    },
  })
}