// src/main.tsx
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { SWRConfig } from 'swr';
import './styles/index.scss';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('找不到 #root，請確認 index.html 的掛載節點。');
const rootElement = root;

async function startApp() {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledFrame: 'bypass',
  });
  createRoot(rootElement).render(
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <HashRouter>
        <App />
      </HashRouter>
    </SWRConfig>,
  );
}

void startApp().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : '未知錯誤';
  createRoot(rootElement).render(
    <main className="page">
      <h1>示範 API 啟動失敗</h1>
      <p>目前無法載入瀏覽器示範服務，請確認網站路徑或重新整理。</p>
      <pre>{message}</pre>
    </main>,
  );
});
