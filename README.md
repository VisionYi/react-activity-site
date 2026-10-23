# React Activity Site 天堂體系｜能量學生命日誌

以 React、TypeScript 製作的活動回憶展示網站，提供活動搜尋、詳情、相簿、影片與留言互動。

- 網站：https://visionyi.github.io/react-activity-site/
- 原始碼：https://github.com/VisionYi/react-activity-site
- 更新紀錄：[CHANGELOG.md](CHANGELOG.md)

## 本機開發

使用 Node.js 24 與 npm：

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## 專案結構

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 部署流程
├── public/
│   ├── brand/
│   │   ├── logo-mark.svg
│   │   └── favicon.ico
│   ├── favicon.svg
│   ├── icons.svg
│   └── mockServiceWorker.js
└── src/
    ├── api/                    # Axios client、SWR hooks 與型別
    ├── assets/
    │   ├── images/             # 活動與詳情圖片
    │   └── imageCatalog.ts
    ├── components/             # 共用圖片、表單與錯誤 Dialog
    ├── context/                # 全域 API 錯誤狀態
    ├── hooks/                  # 篩選、留言與錯誤處理
    ├── mocks/                  # MSW handlers 與示範資料
    ├── pages/                  # 首頁與活動詳情
    ├── styles/                 # 全域 SCSS
    ├── utils/                  # 共用工具
    ├── App.tsx
    ├── App.scss
    ├── data.ts                 # 相簿與影片展示內容
    └── main.tsx                # React 進入點
```

## 技術架構

| 範圍 | 技術與用途 |
| --- | --- |
| UI 與路由 | React 19、TypeScript、Vite；React Router 使用 HashRouter 支援 GitHub Pages 子路徑 |
| API 與快取 | Axios 統一請求，SWR 管理 GET 資料與快取；留言寫入成功後重新載入留言 |
| 元件資料 | `useEventFilters` 同步篩選條件與網址；`useEventComments` 管理留言操作，活動資料不放進 Context |
| 錯誤處理 | `ApiErrorProvider` 統一接收 API 錯誤，使用 Headless UI Dialog 顯示 |
| 示範 API | MSW 攔截請求並回傳 `src/mocks/` 的資料，不連接正式後端 |
| 樣式 | SCSS、Tailwind CSS；共用樣式放在 `src/styles/` |

## 功能與示範 API

活動篩選條件會保存在網址；活動詳情提供照片分類、影片與留言互動。API 錯誤由共用 Dialog 顯示。

| 方法 | 路徑 | 用途 |
| --- | --- | --- |
| GET | `/api/events` | 活動列表與搜尋、篩選 |
| GET | `/api/events/:id` | 活動詳情 |
| GET | `/api/events/:id/comments` | 取得留言 |
| POST | `/api/events/:id/comments` | 新增留言 |
| PATCH | `/api/events/:id/comments/:commentId/like` | 更新留言愛心 |
| DELETE | `/api/events/:id/comments/:commentId` | 刪除留言 |

MSW 提供瀏覽器端示範資料，沒有連接正式後端或資料庫；留言重新整理後會重設。

## 部署

GitHub Actions 會將正式版部署至 GitHub Pages。網站使用 `/react-activity-site/` 子路徑與 HashRouter，支援直接開啟及重新整理活動詳情頁。
