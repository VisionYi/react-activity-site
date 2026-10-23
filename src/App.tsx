// src/App.tsx
import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import { HOME } from './data';
import './App.scss';

export default function App() {
  const { pathname, hash, search } = useLocation();
  // 額外補充：Router 只更新網址，切頁後的錨點捲動需等 DOM 掛載。
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    const section = new URLSearchParams(search).get('section');
    if (section) document.getElementById(section)?.scrollIntoView();
  }, [pathname, hash, search]);

  return (
    <>
      <div className="site-header-shell">
        <header className="site-header">
          <Link to="/" className="site-header__brand" aria-label="天堂體系 能量學生命日誌首頁">
            <img
              src={`${import.meta.env.BASE_URL}brand/logo-mark.svg`}
              alt=""
              className="site-header__mark shrink-0"
            />
            <span className="site-header__wordmark">
              <span className="site-header__title">天堂體系</span>
              <span className="site-header__subtitle">能量學生命日誌</span>
            </span>
          </Link>
          <Link
            to="/?section=activities"
            onClick={() => document.getElementById('activities')?.scrollIntoView()}
            className="button button--accent site-header__nav-link"
          >
            探索活動
          </Link>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route
          path="*"
          element={
            <main className="page">
              <h1>找不到這個頁面</h1>
              <Link to="/">返回活動首頁</Link>
            </main>
          }
        />
      </Routes>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <Link to="/" className="site-footer__title">
            {HOME.footer.title}
          </Link>
          <p className="site-footer__description">{HOME.footer.description}</p>
          <div className="site-footer__bottom">
            <p>{HOME.footer.copyright}</p>
            <ul className="site-footer__values">
              {HOME.footer.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
