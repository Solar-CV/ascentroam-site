import { B } from '../lib/i18n.js';
import { IMG } from './images.js';

export const PHOTOS = [
  {
    src: IMG.everest,
    title: B('珠穆朗玛峰 · 北壁', 'Everest · North Face'),
    meta: '8,848 m · 27°59′N 86°55′E',
    alt: B('珠峰北壁，山脊线与峰顶积雪', 'Everest north face and summit ridge'),
    tall: true,
  },
  {
    src: IMG.k2,
    title: B('乔戈里峰 · 从布洛阿特看', 'K2 · from Broad Peak'),
    meta: '8,611 m · 35°52′N 76°30′E',
    alt: B('乔戈里峰黎明时的山脊', 'K2 ridge at dawn'),
  },
  {
    src: IMG.manaslu,
    title: B('马纳斯鲁 · 大本营', 'Manaslu · Base Camp'),
    meta: '8,163 m · 4,800 m camp',
    alt: B('马纳斯鲁大本营的帐篷阵列', 'Tent lines at Manaslu base camp'),
    tall: true,
  },
  {
    src: IMG.nanga,
    title: B('南迦帕尔巴特 · 营地', 'Nanga Parbat · Camp'),
    meta: '8,126 m · Diamer Face',
    alt: B('南迦帕尔巴特雪原上的营地', 'Camp on the Nanga Parbat snowfield'),
  },
  {
    src: IMG.broadPeak,
    title: B('布洛阿特峰', 'Broad Peak'),
    meta: '8,051 m · 35°48′N 76°34′E',
    alt: B('布洛阿特峰顶被夕阳照亮', 'Broad Peak lit at sunset'),
  },
  {
    src: IMG.aconcagua,
    title: B('阿空加瓜峰', 'Aconcagua'),
    meta: '6,961 m · 32°39′S 70°00′W',
    alt: B('阿空加瓜峰与安第斯山谷', 'Aconcagua above the Andes valley'),
    tall: true,
  },
  {
    src: IMG.ropeTeam,
    title: B('昆布冰川 · 结组', 'Khumbu Icefall · Roped'),
    meta: '5,400 m · Everest approach',
    alt: B('昆布冰川上结组行进的队伍', 'A roped team crossing the Khumbu Icefall'),
  },
  {
    src: IMG.iceClimber,
    title: B('马纳斯鲁 · 冰原', 'Manaslu · Icefield'),
    meta: '6,200 m · fixed line',
    alt: B('冰原上沿固定绳攀登的登山者', 'A climber on fixed line across an icefield'),
  },
];

export const GALLERY_IMAGES = PHOTOS;
