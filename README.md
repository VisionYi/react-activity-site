# 天堂體系｜能量學生命日誌

以 React 製作的活動回憶展示網站，包含活動搜尋與篩選、活動詳情、照片分類，以及本機留言與愛心互動。

- 網站：https://visionyi.github.io/react-activity-site/
- 原始碼：https://github.com/VisionYi/react-activity-site

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
  App.tsx           路由、共用篩選與留言狀態
  data.ts           活動與展示資料
  pages/            首頁與活動詳情
  assets/images/    本機圖片
  utils/date.ts     Day.js 日期與台灣時間格式化
  styles/           全域樣式、品牌變數與共用元件樣式
public/brand/       Logo 與 favicon
.github/workflows/  GitHub Pages 部署流程
```

使用 React、TypeScript、Vite、React Router、Day.js 與 Lucide React。

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
- Vite 正式建置 base 為 /react-activity-site/；本機開發維持 /。
- 使用 HashRouter，例如 /react-activity-site/#/events/forest，讓靜態主機直接開啟與重新整理詳情頁。
- 部署使用 GitHub 內建 GITHUB_TOKEN，不需要自建部署金鑰或提交機密。

## 備註

- 活動、時間、人數、文章與圖片均為展示資料；六場共用森林文章、時間軸與側欄地點。
- 圖片取自使用者提供的設計稿並存於本機；原圖寬512px，大尺寸顯示的清晰度有限。字型仍由 Google Fonts 載入。
- 影片與地圖維持示意；詳情照片為文字版位，沒有播放、上傳、下載、登入或後端。
- 篩選與已送留言由 App 保存，換頁仍保留；草稿與相簿條件在重進詳情時重設。重新整理後本機狀態清空。
- 留言以 UUID 識別並記錄 ISO 時間，畫面以 Asia/Taipei 格式化。
- 手機／平板為單欄；桌面側欄使用純CSS sticky，矮視窗可在側欄內捲動，表格只在自身容器橫向捲動。
- 已驗證 build、lint、1440／768／390px版面、日期格式與主要互動；一次性的驗收檔不保留在 repo。
