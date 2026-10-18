// src/main.tsx
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/index.scss';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('找不到 #root，請確認 index.html 的掛載節點。');

createRoot(root).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
