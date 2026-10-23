# Changelog

記錄專案的重要版本與功能變更。

## [0.1.0] - 2026-10-23

### 新增

- 建立活動首頁、活動詳情、相簿與影片展示，並定義活動、留言、篩選與 API response 型別。
- 使用 Axios、SWR 與 MSW 處理活動／留言讀取，以及留言新增、愛心與刪除；mock API 涵蓋留言欄位驗證、400 與 404。
- 加入共用圖片與表單欄位元件，使用 `useId` 關聯標籤和欄位錯誤；保留 HashRouter，篩選同步 `query`、`year`、`category`、`sort` 到網址，支援上一頁／下一頁；MSW worker 使用 Vite base path 支援子路徑部署。

### 優化

- API 錯誤統一轉成 `ApiError`，保留錯誤訊息與可取得的 HTTP 狀態碼，再由 Headless UI Dialog 顯示；移除各頁重複的錯誤訊息與重試按鈕。
- 活動篩選與列表查詢交由 `ActivitySection` 管理；`HeroSection` 共用 SWR 快取，減少首頁傳遞資料與篩選 props。
- 留言讀取、新增、愛心與刪除集中在 `useEventComments`；`CommentSection` 只接收 `eventId`，寫入後重新抓取留言。
- 搜尋加入 600ms 防抖與輸入法組字處理；網址省略空白篩選參數，年份、分類與排序仍即時更新。
- 初次載入使用 `isLoading`；只有成功取得空資料時才顯示空狀態，API 錯誤交由共用 Dialog 處理。

### 示範限制

- MSW 只模擬 API，不連接正式後端或資料庫；留言只存在頁面記憶體中，重新整理後會重設。
- 活動照片、時間、人數與部分詳情為展示資料。
