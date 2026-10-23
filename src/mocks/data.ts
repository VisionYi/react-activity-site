import detailParentChild from '../assets/images/detail-story-parent-child.jpg';
import detailPicnic from '../assets/images/detail-story-picnic.jpg';
import detailForestVideo from '../assets/images/detail-video-forest-circle.jpg';
import { IMAGE_ASSETS } from '../assets/imageCatalog';
import type { ImageAsset } from '../assets/imageCatalog';

type MockPhoto = ImageAsset & { id: string; category: string };
export type EventFixture = {
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
  photos: MockPhoto[];
};

// 固定示範資料：日期與照片數供練習，不代表真實活動紀錄。
function makePhotos(eventId: string, count: number, images: ImageAsset[]): MockPhoto[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${eventId}-photo-${index + 1}`,
    category: index % 2 === 0 ? '自然風景' : '人物合照',
    ...images[index % images.length],
  }));
}

export const EVENTS: EventFixture[] = [
  {
    id: 'forest',
    code: 'ED-FOREST',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGE_ASSETS[1],
    excerpt:
      '大手拉小手走入蔥鬱山林，藉由植物導覽與親近土地的互動遊戲，帶孩子體驗大自然的生命能量與純粹快樂。',
    title: '森林親子同樂日｜草木輕呼吸',
    date: '2026-10-03',
    category: '親子活動',
    location: '桃園山林園區',
    story: '一起走進森林，把笑聲和這一天的回憶留下來。',
    photos: makePhotos('forest', 12, [IMAGE_ASSETS[0], IMAGE_ASSETS[1], IMAGE_ASSETS[7], IMAGE_ASSETS[8]]),
  },
  {
    id: 'hiking',
    code: 'ED-HIKING',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGE_ASSETS[2],
    excerpt:
      '穿梭在高聳入雲的柳杉林與魔法般的杜鵑老樹群，在雲霧繚繞中感受身心洗滌，挑戰自我的同時凝聚同行夥伴的無私默契。',
    title: '戶外探索日｜高島縱走杉木秘境',
    date: '2026-09-18',
    category: '戶外健走',
    location: '新竹尖石',
    story: '沿著山徑前進，在每個轉彎認識彼此。',
    photos: makePhotos('hiking', 3, [IMAGE_ASSETS[2], IMAGE_ASSETS[9], IMAGE_ASSETS[11]]),
  },
  {
    id: 'charity',
    code: 'ED-CHARITY',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGE_ASSETS[3],
    excerpt:
      '每一步都是對生命的關懷。我們攜手支持弱勢關懷機構，在七星山巔峰展開愛心步履與環保淨山行動。',
    title: '超越巔峰｜陽明山公益健行愛心行',
    date: '2026-07-25',
    category: '公益健行',
    location: '陽明山',
    story: '用腳步支持公益，也為自己留下一段風景。',
    photos: makePhotos('charity', 2, [IMAGE_ASSETS[3], IMAGE_ASSETS[2]]),
  },
  {
    id: 'seminar',
    code: 'ED-SEMINAR',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGE_ASSETS[4],
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
    cover: IMAGE_ASSETS[5],
    excerpt:
      '躍入翠綠深潭，在奔流溪水間互相攙扶攀登。炎炎夏日裡最痛快的清涼冒險，記錄了所有人最純真的笑顏。',
    title: '夏日沁涼記憶｜山谷溪流冒險溯溪',
    date: '2026-05-15',
    category: '戶外健走',
    location: '宜蘭山谷',
    story: '踏進清涼溪水，找回夏天最單純的快樂。',
    photos: makePhotos('river', 4, [IMAGE_ASSETS[5], IMAGE_ASSETS[13], IMAGE_ASSETS[5], IMAGE_ASSETS[11]]),
  },
  {
    id: 'craft',
    code: 'ED-CRAFT',
    startTime: '08:30',
    endTime: '14:30',
    participantCount: 20,
    cover: IMAGE_ASSETS[6],
    excerpt:
      '調配專屬於當下心境的天然香氛，在燭光與輕柔音樂中沉澱喧囂。透過手作的專注，重拾內心平靜與深層放鬆。',
    title: '心靈定聚｜香氛精油與手作療癒之夜',
    date: '2025-04-20',
    category: '手作體驗',
    location: '台北手作教室',
    story: '用雙手慢慢做，讓生活留下一點香氣。',
    photos: makePhotos('craft', 2, [IMAGE_ASSETS[6], IMAGE_ASSETS[10]]),
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
