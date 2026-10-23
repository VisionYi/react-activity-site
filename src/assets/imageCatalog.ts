import image0 from './images/hero-community-gathering.jpg';
import image1 from './images/event-forest-family.jpg';
import image2 from './images/event-hiking-ridge.jpg';
import image3 from './images/event-charity-yangmingshan.jpg';
import image4 from './images/event-community-seminar.jpg';
import image5 from './images/event-river-adventure.jpg';
import image6 from './images/event-aromatherapy-workshop.jpg';
import image7 from './images/album-starry-bonfire.jpg';
import image8 from './images/album-tea-gathering.jpg';
import image9 from './images/album-summit-celebration.jpg';
import image10 from './images/album-community-cooking.jpg';
import image11 from './images/video-hiking-ridge.jpg';
import image12 from './images/video-anniversary-community.jpg';
import image13 from './images/video-river-adventure.jpg';

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export const IMAGE_ASSETS: ImageAsset[] = [
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
