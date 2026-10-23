// src/main.tsx
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { SWRConfig } from 'swr';
import './styles/index.scss';
import App from './App';
import { ApiErrorProvider } from './components/ApiErrorDialog';

const root = document.getElementById('root');
if (!root) throw new Error('找不到 #root，請確認 index.html 的掛載節點。');
const rootElement = root;

(async () => {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledFrame: 'bypass',
  });

  createRoot(rootElement).render(
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <HashRouter>
        <ApiErrorProvider>
          <App />
        </ApiErrorProvider>
      </HashRouter>
    </SWRConfig>,
  );
})()
