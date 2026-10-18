import detailParentChild from './assets/images/detail-story-parent-child.jpg';
import detailPicnic from './assets/images/detail-story-picnic.jpg';
import detailForestVideo from './assets/images/detail-video-forest-circle.jpg';
import image0 from './assets/images/hero-community-gathering.jpg';
import image1 from './assets/images/event-forest-family.jpg';
import image2 from './assets/images/event-hiking-ridge.jpg';
import image3 from './assets/images/event-charity-yangmingshan.jpg';
import image4 from './assets/images/event-community-seminar.jpg';
import image5 from './assets/images/event-river-adventure.jpg';
import image6 from './assets/images/event-aromatherapy-workshop.jpg';
import image7 from './assets/images/album-starry-bonfire.jpg';
import image8 from './assets/images/album-tea-gathering.jpg';
import image9 from './assets/images/album-summit-celebration.jpg';
import image10 from './assets/images/album-community-cooking.jpg';
import image11 from './assets/images/video-hiking-ridge.jpg';
import image12 from './assets/images/video-anniversary-community.jpg';
import image13 from './assets/images/video-river-adventure.jpg';

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: string;
};

const IMAGES: ImageAsset[] = [
  { src: image0, alt: '戶外聚會中開懷談笑的社群夥伴', width: 512, height: 286, position: 'center' },
  {
    src: image1,
    alt: '家長與孩子走在陽光灑落的森林木棧道',
    width: 512,
    height: 286,
    position: '46% center',
  },
  { src: image2, alt: '晨光與雲霧中的高島山稜步道', width: 512, height: 279, position: 'center' },
  {
    src: image3,
    alt: '穿著藍衣的公益健行夥伴在山頂合照',
    width: 512,
    height: 279,
    position: 'center',
  },
  { src: image4, alt: '社群夥伴在明亮的室內會場交流', width: 512, height: 279, position: 'center' },
  { src: image5, alt: '夥伴在翠綠溪谷中溯溪與戲水', width: 512, height: 286, position: 'center' },
  { src: image6, alt: '夥伴在溫暖的工作坊中製作香氛', width: 512, height: 279, position: 'center' },
  { src: image7, alt: '夥伴在星空下圍著營火彈唱', width: 512, height: 286, position: 'center' },
  { src: image8, alt: '夥伴在木屋茶室中舉杯談笑', width: 512, height: 286, position: 'center' },
  { src: image9, alt: '登山夥伴在雲海山頂舉手歡呼', width: 512, height: 279, position: 'center' },
  {
    src: image10,
    alt: '夥伴在開放式廚房準備共食料理',
    width: 512,
    height: 286,
    position: 'center',
  },
  { src: image11, alt: '沿著雲霧山稜前進的登山隊伍', width: 512, height: 279, position: 'center' },
  {
    src: image12,
    alt: '周年聚會中互相擁抱與分享的社群夥伴',
    width: 512,
    height: 279,
    position: 'center',
  },
  { src: image13, alt: '夥伴跳入翠綠溪潭激起水花', width: 512, height: 279, position: 'center' },
];
export type Photo = { id: string; category: string; alt: string };
export type EventItem = {
  id: string;
  code: string;
  startTime: string;
  endTime: string;
  participantCount: number;
  title: string;
  date: string;
  category: string;
  location: string;
  story: string;
  excerpt: string;
  cover: ImageAsset;
  photos: Photo[];
};
export type Filters = { query: string; year: string; category: string; sort: string };
export type CommentItem = {
  id: string;
  createdAt: string;
  eventId: string;
  body: string;
  likes: number;
  liked: boolean;
};

// 固定示範資料：日期與照片數供練習，不代表真實活動紀錄。
function makePhotos(eventId: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${eventId}-photo-${index + 1}`,
    category: index % 2 === 0 ? '自然風景' : '人物合照',
    alt: `活動照片版位 ${index + 1}，分類：${index % 2 === 0 ? '自然風景' : '人物合照'}`,
  }));
}

export const EVENTS: EventItem[] = [
  {
    id: 'forest',
    code: 'ED-FOREST',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[1],
    excerpt:
      '大手拉小手走入蔥鬱山林，藉由植物導覽與親近土地的互動遊戲，帶孩子體驗大自然的生命能量與純粹快樂。',
    title: '森林親子同樂日｜草木輕呼吸',
    date: '2026-10-03',
    category: '親子活動',
    location: '桃園山林園區',
    story: '一起走進森林，把笑聲和這一天的回憶留下來。',
    photos: makePhotos('forest', 12),
  },
  {
    id: 'hiking',
    code: 'ED-HIKING',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[2],
    excerpt:
      '穿梭在高聳入雲的柳杉林與魔法般的杜鵑老樹群，在雲霧繚繞中感受身心洗滌，挑戰自我的同時凝聚同行夥伴的無私默契。',
    title: '戶外探索日｜高島縱走杉木秘境',
    date: '2026-09-18',
    category: '戶外健走',
    location: '新竹尖石',
    story: '沿著山徑前進，在每個轉彎認識彼此。',
    photos: makePhotos('hiking', 3),
  },
  {
    id: 'charity',
    code: 'ED-CHARITY',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[3],
    excerpt:
      '每一步都是對生命的關懷。我們攜手支持弱勢關懷機構，在七星山巔峰展開愛心步履與環保淨山行動。',
    title: '超越巔峰｜陽明山公益健行愛心行',
    date: '2026-07-25',
    category: '公益健行',
    location: '陽明山',
    story: '用腳步支持公益，也為自己留下一段風景。',
    photos: makePhotos('charity', 2),
  },
  {
    id: 'seminar',
    code: 'ED-SEMINAR',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[4],
    excerpt:
      '回顧過往季度的生命轉變，發表年度體系進化願景，透過深度對話、團隊榮耀表彰與真摯的情感重溫夥伴初衷。',
    title: '第 16 屆秋季團隊定聚｜匯聚光芒',
    date: '2026-06-07',
    category: '社群聚會',
    location: '台北交流中心',
    story: '相聚交流的活動，照片將在活動後補上。',
    photos: [],
  },
  {
    id: 'river',
    code: 'ED-RIVER',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[5],
    excerpt:
      '躍入翠綠深潭，在奔流溪水間互相攙扶攀登。炎炎夏日裡最痛快的清涼冒險，記錄了所有人最純真的笑顏。',
    title: '夏日沁涼記憶｜山谷溪流冒險溯溪',
    date: '2026-05-15',
    category: '戶外健走',
    location: '宜蘭山谷',
    story: '踏進清涼溪水，找回夏天最單純的快樂。',
    photos: makePhotos('river', 4),
  },
  {
    id: 'craft',
    code: 'ED-CRAFT',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGES[6],
    excerpt:
      '調配專屬於當下心境的天然香氛，在燭光與輕柔音樂中沉澱喧囂。透過手作的專注，重拾內心平靜與深層放鬆。',
    title: '心靈定聚｜香氛精油與手作療癒之夜',
    date: '2025-04-20',
    category: '手作體驗',
    location: '台北手作教室',
    story: '用雙手慢慢做，讓生活留下一點香氣。',
    photos: makePhotos('craft', 2),
  },
];
export const CATEGORIES = Array.from(new Set(EVENTS.map((item) => item.category)));
export const YEARS = Array.from(new Set(EVENTS.map((item) => item.date.slice(0, 4))))
  .sort()
  .reverse();
export const INITIAL_FILTERS: Filters = { query: '', year: '', category: '', sort: 'newest' };

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
    image: IMAGES[7],
  },
  { id: 'tea', title: '青埔品茗聚會', subtitle: '舉杯之間，讓心更靠近', image: IMAGES[8] },
  { id: 'summit', title: '高島觀景台合影', subtitle: '把這一刻的勇氣留在山巔', image: IMAGES[9] },
  {
    id: 'cooking',
    title: '大地餐桌共食計畫',
    subtitle: '用雙手做出的料理最下飯',
    image: IMAGES[10],
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
    image: IMAGES[11],
  },
  {
    id: 'anniversary-film',
    category: '周年特別特輯',
    title: '第 15 屆周年年會精華｜因為有你，世界變得更亮',
    author: '體系核心部',
    image: IMAGES[12],
  },
  {
    id: 'river-film',
    category: '南澳溪谷紀錄',
    title: '夏日清涼溯溪特輯｜奔向金岳瀑布的無畏水花',
    author: '戶外探險小組',
    image: IMAGES[13],
  },
];

// 所有活動共用森林紀實示範內容；並非各場真實紀錄。
export const DETAIL = {
  article: {
    eyebrow: '活動專題紀實・STORY',
    title: '一起走進森林：遠離塵囂的清晨，用歡笑與綠意填滿彼此的記憶',
    author: '陳宛倫',
    quote: '「大自然是最溫柔的導師，而在森林裡牽著孩子的手，是我們給彼此最珍貴的陪伴。」',
    introduction:
      '早晨八點半，微涼的山風拂過東眼山的柳杉林，空氣中瀰漫著濕潤的泥土與香甜的松針芬多精。來自各地的家庭陸續抵達集合步道口，孩子們雀躍的奔跑聲，瞬間打破了山林的清寂。不同於平日繁忙都會的緊繃節奏，在這裡，大家放慢腳步，深呼吸，將心靈頻率與山林綠波共振。',
    firstChapter: {
      title: '第一篇章：腳踏大地的真實感知',
      body: '在破冰環節「森林能量圈」中，導師引導每位父母與孩子閉上眼、手拉著手，感受腳踏大地的沉穩支撐。孩子們驚奇地摸著樹幹粗糙的紋理，用放大鏡觀察樹葉上晶瑩剔透的晨露，尋找不同形狀的毬果與落葉。',
      highlight: '這種發自內心的探索與驚呼',
      ending: '，是電子螢幕永遠無法替代的生命力量。',
    },
    secondChapter: {
      title: '第二篇章：草地野餐與天然植物手作',
      body: '午後的草地上鋪滿了各家攜帶的野餐墊，微風掠過樹梢沙沙作響。大家熱情交換自備的拿手料理與親手烘焙的小點心，席間洋溢著開懷的笑聲。隨後的「植物拓印手作」更將氣氛推向高潮，孩子們運用採集來的新鮮葉片，在純棉手帕上敲拓出獨一無二的天然翠綠印記。那一塊塊布帕，不僅僅是手作品，更是今天永不褪色的歡樂憑證。',
    },
    photos: [
      {
        image: {
          src: detailParentChild,
          alt: '母親陪伴孩子觀察森林植物',
          width: 512,
          height: 343,
          position: 'center',
        },
        caption: '孩子們在向陽坡面專注尋找大自然的色彩密碼',
      },
      {
        image: {
          src: detailPicnic,
          alt: '野餐墊上的餐盒、水果與手作點心',
          width: 512,
          height: 279,
          position: 'center',
        },
        caption: '家庭野餐分享：自製飯糰、當季鮮果與手作巴斯克乳酪',
      },
    ],
    tableHeadings: ['探索階段', '活動亮點', '能量感知重點', '家庭迴響'],
    tableRows: [
      [
        '晨光尋寶',
        '辨認柳杉、紅檜葉形與毬果收集',
        '深層呼吸・放鬆副交感神經',
        '孩子主動放低身姿觀察自然',
      ],
      [
        '林間野餐',
        '自製低糖手作糕點與健康茶品',
        '同頻分享・增進親子依附感',
        '互相交流育兒與共學體驗',
      ],
      [
        '植物拓印',
        '純棉手巾敲拓與保留植物脈絡',
        '手作心流・沉浸專注與喜悅',
        '帶回珍貴的手工紀念品',
      ],
    ],
    reminders: [
      '山區氣候多變，隨身攜帶輕便防風外套與保暖水壺。',
      '落實無痕山林（LNT），活動結束後所有包裝與廢棄物全數隨行帶回。',
      '下方相簿為示意版位，可切換分類與查看更多照片版位。',
    ],
  },
  timeline: [
    {
      time: '08:30',
      title: '集合報到與破冰相見歡',
      description: '東眼山旅客中心前廣場集合，身心舒展與活動手環發放。',
    },
    {
      time: '09:30',
      title: '杉木林芬多精尋寶漫遊',
      description: '沿景觀步道慢行，導覽自然生態，收集天然拓印葉片。',
    },
    {
      time: '11:30',
      title: '綠茵野餐盛宴與家常手作',
      description: '在柳杉樹蔭草皮席地而坐，各家拿出特色料理溫暖共享。',
    },
    {
      time: '13:00',
      title: '自然植物拓印親子工坊',
      description: '用木槌將採集葉片脈絡敲印於純棉手巾，留住森林紋理。',
    },
    {
      time: '14:00',
      title: '感恩能量圈與圓滿大合照',
      description: '圍成同心圓真摯致謝，留下滿滿回憶與元氣返程。',
    },
  ],
  location: {
    title: '東眼山森林遊樂區景觀步道',
    address: '桃園市復興區霞雲里佳志35號',
    reminder: '山區午後溫差大，建議攜帶保暖薄外套',
  },
  video: {
    image: {
      src: detailForestVideo,
      alt: '夥伴在森林空地牽手圍成圓圈',
      width: 512,
      height: 286,
      position: 'center',
    },
    description:
      '記錄了當天所有的笑聲、奔跑的腳步聲，與在樹蔭下的感動分享。戴上耳機，一同重新感受東眼山微風的溫度。',
  },
};
