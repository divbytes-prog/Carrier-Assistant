import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const stripPackageVersions = () => ({
  name: 'strip-package-versions',
  enforce: 'pre' as const,
  async resolveId(source: string) {
    const unversioned = source.replace(/@\d+(?:\.\d+)*(?:-[^/]+)?$/, '')
    if (unversioned === source) return null
    const resolved = await this.resolve(unversioned, undefined, { skipSelf: true })
    return resolved?.id ?? null
  },
})

export default defineConfig({
  plugins: [stripPackageVersions(), react()],
  resolve: {
    alias: [
      { find: /^lucide-react$/, replacement: path.resolve(__dirname, './src/lucide-shim.ts') },
      { find: '@', replacement: path.resolve(__dirname, '.') },
    ],
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
