import { IMAGE_ASSETS } from './assets/imageCatalog';
import type { ImageAsset } from './assets/imageCatalog';
export type { ImageAsset } from './assets/imageCatalog';

// 首頁展示資料與文案集中在這裡；不把可計算的統計另存 state。
export const HOME = {
  hero: {
    eyebrow: '天堂體系・能量學生命日誌',
    title: '一起走過的每一段旅程，',
    highlight: '都值得被記住。',
    description:
      '記錄每一次相聚、每一場活動，以及我們一起留下的美好回憶。在這座溫暖的能量聚落裡，真摯的陪伴永遠在時光中發光。',
    badge: '2026 年度相聚紀事',
    featuredEventId: 'forest',
    featuredLabel: '精選回憶',
  },
  events: {
    eyebrow: '活動探索・時光紀事',
    title: '重溫每一次真摯的相遇',
    description: '探索天堂體系豐富的歷程，從定聚、戶外健行到公益陪伴，尋找與回味每次相聚的感動。',
  },
  albums: {
    eyebrow: '最近的回憶相簿',
    title: '定格微笑與感動的瞬間',
    description: '每一次真摯的凝視都在時間裡留香。翻閱這些定格的光影，彷彿能再次聽見大家的歡笑。',
  },
  videos: {
    eyebrow: '活動精選影片',
    title: '動態影像・重溫心動每一刻',
    description: '聽見林間風聲與夥伴的開懷笑聲，讓記憶隨著鏡頭呼吸，重返熱血沸騰與溫暖湧動的當下。',
  },
  banner: {
    eyebrow: '共好・共創・共享',
    title: '想為你的小組或下一場聚會，',
    highlight: '留下專屬的生命回憶？',
    description:
      '天堂體系支持每一位夥伴自主發起健康、溫暖、有愛的實體聚會。我們提供相簿空間、活動行事曆與宣傳支援，陪伴你開啟更多美好聯結。',
  },
  footer: {
    title: '天堂體系',
    description: '記錄每一次相聚，留下每一段回憶。',
    copyright: '© 2026 天堂體系 Energy Heaven Community. All rights reserved.',
    values: ['溫暖連結', '能量傳遞', '生命共好'],
  },
};

export type AlbumItem = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageAsset;
  label?: string;
};
export const ALBUMS: AlbumItem[] = [
  {
    id: 'bonfire',
    title: '陽明山星芒夜談・圍爐歌唱',
    subtitle: '「夜深了，心卻更加溫暖靠近。」',
    label: '星空營火夜話',
    image: IMAGE_ASSETS[7],
  },
  { id: 'tea', title: '青埔品茗聚會', subtitle: '舉杯之間，讓心更靠近', image: IMAGE_ASSETS[8] },
  { id: 'summit', title: '高島觀景台合影', subtitle: '把這一刻的勇氣留在山巔', image: IMAGE_ASSETS[9] },
  {
    id: 'cooking',
    title: '大地餐桌共食計畫',
    subtitle: '用雙手做出的料理最下飯',
    image: IMAGE_ASSETS[10],
  },
];
export type VideoItem = {
  id: string;
  title: string;
  category: string;
  author: string;
  image: ImageAsset;
};
export const VIDEOS: VideoItem[] = [
  {
    id: 'hiking-film',
    category: '戶外年度大片',
    title: '高島縱走完整全紀錄｜穿越迷霧與柳杉的奇幻征程',
    author: '天堂影像組',
    image: IMAGE_ASSETS[11],
  },
  {
    id: 'anniversary-film',
    category: '周年特別特輯',
    title: '第 15 屆周年年會精華｜因為有你，世界變得更亮',
    author: '體系核心部',
    image: IMAGE_ASSETS[12],
  },
  {
    id: 'river-film',
    category: '南澳溪谷紀錄',
    title: '夏日清涼溯溪特輯｜奔向金岳瀑布的無畏水花',
    author: '戶外探險小組',
    image: IMAGE_ASSETS[13],
  },
];
