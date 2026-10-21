import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-ML-portfolio/',
  build: {
    target: 'es2020',
    // Split the heavy 3D libraries out of the initial bundle so the hero
    // shell can paint before Three.js parses. Keeps initial JS small.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
