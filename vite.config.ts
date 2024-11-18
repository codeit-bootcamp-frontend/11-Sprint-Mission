import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  esbuild: {
    jsx: 'transform',
    loader: 'tsx',
    include: [/src\/.*\.tsx?$/],
    exclude: /node_modules/,
  },
  build: {
    outDir: 'dist',
  },
});
