# Changelog

本檔記錄專案的重要版本變更。

## [0.1.0] - 2026-10-23

### 新增

- 加入 Axios API client，使用共用 Axios instance、泛型 request 函式與 response interceptor；成功回應直接取得 `response.data`，API 錯誤統一轉成含狀態碼與欄位錯誤的 `ApiError`。
- 加入 `EventSummary`、`EventDetail`、`Photo`、`Comment`、篩選條件和 API response 型別。
- 加入 SWR 活動清單、活動詳情與留言讀取 hooks，支援首次載入、背景更新、錯誤提示、手動重試與空結果畫面。
- 加入 MSW 瀏覽器端 mock API，涵蓋：
  - `GET /api/events?query=&year=&category=&sort=`：依關鍵字、年份、分類與日期排序篩選活動，回傳活動清單、符合筆數、總活動數、分類計數與年份選項。
  - `GET /api/events/:id`：取得活動詳情；活動不存在時回傳 `404`。
  - `GET /api/events/:id/comments`：取得該活動的留言；活動不存在時回傳 `404`。
  - `POST /api/events/:id/comments`：新增留言，暱稱必填且最多 40 字，留言必填且最多 500 字；成功回傳 `201`，格式或欄位驗證失敗回傳 `400`。
  - `PATCH /api/events/:id/comments/:commentId/like`：以 `{ liked: boolean }` 設定愛心，`liked` 非布林值時回傳 `400`，重送相同值不會重複增減；活動或留言不存在時回傳 `404`。
  - `DELETE /api/events/:id/comments/:commentId`：刪除留言；活動或留言不存在時回傳 `404`。
- 在 React render 前等待 MSW worker 啟動，並使用 Vite base path 設定 worker 網址，支援 GitHub Pages 子路徑。
- 將活動篩選條件同步到網址，使用 `query`、`year`、`category`、`sort` 參數；搜尋、年份、分類及排序可透過重新整理、瀏覽器上一頁／下一頁或分享網址還原。
- 加入共用 `ActivityImage` 元件，明確傳遞圖片替代文字、尺寸、載入優先級與原生 `<img>` 屬性。
- 加入共用暱稱與留言欄位元件，使用 `useId` 串接 label 和欄位錯誤訊息，並支援原生欄位 props。

### 調整

- 將活動 fixture 與詳情文章、時間軸、地點、影片示範資料移至 `src/mocks/data.ts`；首頁展示文案、相簿與影片資料留在 `src/data.ts`，共用圖片中繼資料集中於 `src/assets/imageCatalog.ts`。
- 首頁活動清單、精選活動與活動詳情改由 API 載入；詳情頁依活動 ID 取得資料，缺少 ID 時在頁面入口顯示返回首頁連結。
- 留言表單改為收集暱稱和留言內容，顯示驗證錯誤、送出狀態、留言作者與時間。
- 留言新增、愛心與刪除改呼叫一般 Axios API 函式；寫入成功後由頁面明確呼叫留言 GET hook 的 `mutate()` 重新取得列表。操作期間停用留言表單與操作按鈕；重新取得列表失敗時保留讀取錯誤與重試入口。
- 保留 HashRouter、既有頁面視覺與 GitHub Pages 路徑；活動、文章、時間軸、地點和影片仍使用目前的展示內容。

### 修正

- 統一篩選關鍵字在網址、Axios request params 與 MSW handler 的參數名稱為 `query`，讓 `EventFilters` 可直接作為 `useGetEvents` 的 Axios `params`，不需另外轉換欄位名稱。

### 示範資料限制

- MSW 在瀏覽器攔截 API，不連接正式後端或資料庫。
- 留言只存在目前頁面的記憶體中；重新整理或關閉頁面後會重設，也不會跨訪客保存。
- 活動照片、時間、人數與部分詳情均為學習展示資料；各活動共用同一份文章、時間軸、地點與影片內容。
