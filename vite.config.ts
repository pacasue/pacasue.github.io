import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: isSsrBuild ? 'docs/server' : 'docs',
    ...(isSsrBuild && {
      rollupOptions: {
        input: 'src/entry-server.tsx',
      },
    }),
  },
}))
