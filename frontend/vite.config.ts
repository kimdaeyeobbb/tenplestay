import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.jpg'],
  resolve: {
    alias: [
      // 절대 경로로 관리
      { find: '@apis', replacement: '/src/apis' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@store', replacement: '/src/store' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
    ],
  },
});
