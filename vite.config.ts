import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command, isPreview }) => ({
  // 開發維持根路徑；正式建置對應 GitHub Pages 的專案子路徑。
  base: command === 'build' || isPreview ? '/react-activity-site/' : '/',
  plugins: [react()],
}));
