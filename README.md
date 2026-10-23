# 天堂體系｜能量學生命日誌

以 React 製作的活動回憶展示網站，包含活動搜尋與篩選、活動詳情、照片分類，以及留言與愛心互動。活動和留言由 SWR 載入；留言新增、愛心與刪除透過 Axios API 操作。MSW 在開發版和公開版攔截 API，提供瀏覽器端示範資料。

- 網站：https://visionyi.github.io/react-activity-site/
- 原始碼：https://github.com/VisionYi/react-activity-site
- 版本記錄：[CHANGELOG.md](CHANGELOG.md)

## 本機開發

使用 Node.js 24 與 npm：

```bash
npm ci
npm run dev
```

```bash
npm run lint     # 檢查程式規則
npm run build    # 型別檢查與正式建置
npm run preview  # 預覽正式版，開啟 /react-activity-site/
```

## 專案結構

```text
src/
  App.tsx           路由與共用頁面框架
  api/              Axios API 函式、SWR Hooks 與資料型別
  components/       共用圖片與表單欄位
  hooks/            URL 活動篩選狀態
  mocks/             MSW handlers、瀏覽器 worker 與 API fixtures
  data.ts            首頁、相簿與影片展示內容
  assets/imageCatalog.ts  共用本機圖片中繼資料
  pages/            首頁與 API 驅動的活動詳情
  assets/images/    本機圖片
  utils/date.ts     Day.js 日期與台灣時間格式化
  styles/           全域樣式、品牌變數與共用元件樣式
public/brand/       Logo 與 favicon
.github/workflows/  GitHub Pages 部署流程
```

使用 React、TypeScript、Vite、React Router、Axios、SWR、MSW、Day.js 與 Lucide React。

## 示範 API 與資料行為

活動篩選條件保存在 HashRouter 的網址中，例如：

```text
/react-activity-site/#/?query=森林&year=2026&category=親子活動&sort=newest
```

重新整理、分享網址或使用瀏覽器上一頁，都會還原當時的搜尋、年份、分類與排序。活動和留言由 SWR 管理；表單草稿、照片分類與「瀏覽更多」數量留在頁面元件中。

| 方法 | 路徑 | 用途 |
| --- | --- | --- |
| GET | `/api/events?query=&year=&category=&sort=` | 活動清單與篩選；回傳 `events`、符合筆數 `total`、全部筆數 `totalEvents`、分類計數與年份選項 |
| GET | `/api/events/:id` | 活動詳情，包含本機照片和共用文章、時間軸、地點、影片示範內容 |
| GET | `/api/events/:id/comments` | 取得該活動留言 |
| POST | `/api/events/:id/comments` | 新增留言，JSON 欄位為 `author`、`body`；暱稱必填且最多 40 字，留言必填且最多 500 字 |
| PATCH | `/api/events/:id/comments/:commentId/like` | 以 `{ "liked": true }` 或 `{ "liked": false }` 設定愛心，重送同一值不會重複增減 |
| DELETE | `/api/events/:id/comments/:commentId` | 刪除留言 |

新增留言成功回傳 201；欄位驗證錯誤回傳 400；活動或留言不存在時回傳 404。新增、愛心與刪除成功後，頁面會重新取得留言列表；操作期間會暫停其他留言操作。重新取得失敗時會顯示錯誤並提供重試。

所有活動資料都由 MSW 瀏覽器 worker 提供，沒有連接後端或資料庫。留言只存在目前頁面的記憶體中，重新整理或關閉頁面就會清空，也不會與其他訪客共享。

## 樣式約定

- SCSS＋BEM 為主，Tailwind 作小範圍輔助；JSX 直接使用 className，不使用 CSS Modules。
- 頁面匯入自己的 SCSS，全域統一由 styles/index.scss 載入；使用 @use，不使用 Sass 舊式 @import。
- 色彩、字型、圓角集中於 variables.scss；Tailwind 只映射，元件不重複定義品牌色碼。
- 共用容器、按鈕與表單在 components.scss，斷點 mixin 在 _mixins.scss；平板768px、桌面1024px。
- 全域基礎放 @layer base，元件放 @layer components；同一樣式屬性只由一處管理。
- BEM 使用 block__element、block--modifier；SCSS 採2格縮排、一行一個宣告。

## GitHub Pages 部署

推送 main 後，GitHub Actions 自動執行 npm ci、lint、build，再將 dist 部署到 Pages；也可於 Actions 手動執行。

- Repository → Settings → Pages → Source 設為 **GitHub Actions**。
- Vite 正式建置 base 為 `/react-activity-site/`；本機開發維持 `/`。API 和 `mockServiceWorker.js` 都使用同一個 base path，讓 Pages 子路徑可正常啟動與攔截。
- 使用 HashRouter，例如 /react-activity-site/#/events/forest，讓靜態主機直接開啟與重新整理詳情頁。
- `main.tsx` 會先等待 MSW worker 啟動，成功後才 render React；若 worker 無法啟動，頁面會顯示錯誤訊息。
- 部署使用 GitHub 內建 GITHUB_TOKEN，不需要自建部署金鑰或提交機密。

## 備註

- 活動、時間、人數、留言與圖片均為展示資料；六場活動共用森林文章、時間軸與側欄地點。
- 圖片取自使用者提供的設計稿並存於本機；原圖寬512px，大尺寸顯示的清晰度有限。字型仍由 Google Fonts 載入。
- 影片與地圖維持示意；沒有登入、權限或正式後端。此 mock API 是公開學習示範，不適合保存真實個資或社團留言。
- 留言以 UUID 識別並記錄 ISO 時間，畫面以 Asia/Taipei 格式化。
- 手機／平板為單欄；桌面側欄使用純CSS sticky，矮視窗可在側欄內捲動，表格只在自身容器橫向捲動。
- 已驗證 build、lint、1440／768／390px版面、日期格式與主要互動；一次性的驗收檔不保留在 repo。
