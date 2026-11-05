import { B } from '../lib/i18n.js';

// Lesson counts follow Curriculum.kt (v0.26.3): 16/12/15/6/10/10 alpine, 5/9/5/3 trek.
export const UNITS = [
  {
    id: 'm5i',
    track: 'alpine',
    code: 'M5 · ENTRY',
    title: B('5000M · 入门', '5000M · Entry'),
    altitude: 5000,
    lessons: 16,
    subtitle: B(
      '以科普为主。这个高度的山峰多是徒步型，先把环境、装备、睡眠与行前准备打好底。',
      'Mostly orientation. At this altitude the peaks are walk-ups; start with environment, equipment, sleep and preparation.'
    ),
    topics: [
      B('高山环境与风险认知', 'Mountain environment & risk'),
      B('冰爪、冰镐与高山靴', 'Boots, crampons, ice axe'),
      B('雪坡行走与节奏', 'Snow slopes & pacing'),
    ],
    peaks: [
      { zh: '奥太娜', en: 'Aotaina', alt: '5,211', note: B('四川 · 黑水', 'Sichuan') },
      { zh: '四姑娘山大峰', en: 'Siguniang · Da Feng', alt: '5,025', note: B('四川 · 小金', 'Sichuan') },
      { zh: '乞力马扎罗', en: 'Kilimanjaro', alt: '5,895', note: B('坦桑尼亚', 'Tanzania') },
    ],
  },
  {
    id: 'm5a',
    track: 'alpine',
    code: 'M5 · TECHNICAL',
    title: B('5000M · 技术', '5000M · Technical'),
    altitude: 5300,
    lessons: 12,
    subtitle: B(
      '技术入门。把冰爪、冰镐、制动、绳结、结组学完一遍，再加上定向、营地与求救。',
      'Technical entry. Crampons, axe, arrest, knots and glacier travel — plus navigation, camps and rescue calls.'
    ),
    topics: [
      B('冰爪技术：法式、德式与混合', 'Crampon technique: French, German, mixed'),
      B('冰镐与滑坠制动', 'Ice axe & self-arrest'),
      B('绳结、安全带与结组', 'Knots, harness, glacier travel'),
    ],
    peaks: [
      { zh: '岗什卡三峰', en: 'Gangshika III', alt: '5,005', note: B('青海 · 门源', 'Qinghai') },
      { zh: '岗什卡主峰', en: 'Gangshika', alt: '5,254', note: B('青海 · 门源', 'Qinghai') },
      { zh: '哈巴雪山', en: 'Haba Snow Mountain', alt: '5,396', note: B('云南 · 香格里拉', 'Yunnan') },
      { zh: '厄尔布鲁士', en: 'Elbrus', alt: '5,642', note: B('俄罗斯', 'Russia') },
    ],
  },
  {
    id: 'm6',
    track: 'alpine',
    code: 'M6 · 6000',
    title: B('6000M', '6000M'),
    altitude: 6000,
    lessons: 15,
    subtitle: B(
      '技术比重上升，高原病正式展开：医学、热病外伤、医疗准备与易感人群。',
      'Technique takes more weight, and altitude medicine begins: AMS, HACE, HAPE, cold injury, medical planning.'
    ),
    topics: [
      B('急性高原病与脑水肿、肺水肿', 'AMS, HACE and HAPE'),
      B('失温、冻伤与野外医学', 'Cold injury & field medicine'),
      B('天气窗口与看云识天气', 'Weather windows, reading clouds'),
    ],
    peaks: [
      { zh: '玉珠峰', en: 'Yuzhu Peak', alt: '6,178', note: B('青海 · 格尔木', 'Qinghai') },
      { zh: '启孜峰', en: 'Qizi Peak', alt: '6,206', note: B('西藏 · 当雄', 'Tibet') },
      { zh: '罗布切东峰', en: 'Lobuche East', alt: '6,119', note: B('尼泊尔', 'Nepal') },
      { zh: '岛峰', en: 'Imja Tse · Island Peak', alt: '6,189', note: B('尼泊尔', 'Nepal') },
    ],
  },
  {
    id: 'm7',
    track: 'alpine',
    code: 'M7 · CAMP 3',
    title: B('7000M · 技术', '7000M · Technical'),
    altitude: 7000,
    lessons: 6,
    subtitle: B(
      '硬技术段：攀冰、绳索、固定绳、过结换绳、冰川行进、自救。这里开始要求动作精确到顺序。',
      'The hard skills: ice climbing, ropes, fixed lines, passing knots, glacier travel, self-rescue. Sequence matters.'
    ),
    topics: [
      B('攀冰技术', 'Ice climbing'),
      B('固定绳与锚点系统', 'Fixed ropes & anchors'),
      B('自救与冰裂缝', 'Self-rescue & crevasse'),
    ],
    peaks: [
      { zh: '慕士塔格峰', en: 'Muztagh Ata', alt: '7,509', note: B('新疆 · 阿克陶', 'Xinjiang') },
      { zh: '列宁峰', en: 'Lenin Peak', alt: '7,134', note: B('吉尔吉斯斯坦', 'Kyrgyzstan') },
    ],
  },
  {
    id: 'm7h',
    track: 'alpine',
    code: 'M7 · CAMP 4',
    title: B('7000M · 高营', '7000M · High camp'),
    altitude: 7500,
    lessons: 10,
    subtitle: B(
      '判断、救援与团队：雪崩埋压与复苏、三件套搜索挖掘、领导力，以及天气与营地物资。',
      'Judgement, rescue and team: avalanche burial and recovery, beacon search, leadership, weather and camp logistics.'
    ),
    topics: [
      B('雪崩埋压与复苏', 'Avalanche burial & recovery'),
      B('三件套：信标、探杆、雪铲', 'Beacon, probe, shovel'),
      B('领导力与撤退决策', 'Leadership & retreat'),
    ],
    peaks: [
      { zh: '希姆隆峰', en: 'Himlung Himal', alt: '7,126', note: B('尼泊尔', 'Nepal') },
      { zh: '阿玛达布朗峰', en: 'Ama Dablam', alt: '6,812', note: B('尼泊尔', 'Nepal') },
    ],
  },
  {
    id: 'm8',
    track: 'alpine',
    code: 'M8 · FINAL',
    title: B('8000M', '8000M'),
    altitude: 8000,
    lessons: 10,
    subtitle: B(
      '检验全部进阶知识：生理极限、氧气与补给、14 座 8000 米、远征后勤与综合决策。',
      'Everything at once: physiology, oxygen, the 14 eight-thousanders, expedition logistics and final exams.'
    ),
    topics: [
      B('8000 米生理极限', 'Physiology at 8,000'),
      B('氧气系统与补给', 'Oxygen systems'),
      B('世界 14 座 8000 米', 'The 14 eight-thousanders'),
    ],
    peaks: [
      { zh: '珠穆朗玛峰', en: 'Everest', alt: '8,848', note: B('中国 / 尼泊尔', 'China / Nepal') },
      { zh: '乔戈里峰', en: 'K2', alt: '8,611', note: B('中国 / 巴基斯坦', 'China / Pakistan') },
      { zh: '干城章嘉峰', en: 'Kangchenjunga', alt: '8,586', note: B('尼泊尔 / 印度', 'Nepal / India') },
      { zh: '洛子峰', en: 'Lhotse', alt: '8,516', note: B('中国 / 尼泊尔', 'China / Nepal') },
      { zh: '马卡鲁峰', en: 'Makalu', alt: '8,485', note: B('中国 / 尼泊尔', 'China / Nepal') },
      { zh: '卓奥友峰', en: 'Cho Oyu', alt: '8,188', note: B('中国 / 尼泊尔', 'China / Nepal') },
      { zh: '道拉吉里峰', en: 'Dhaulagiri', alt: '8,167', note: B('尼泊尔', 'Nepal') },
      { zh: '马纳斯鲁峰', en: 'Manaslu', alt: '8,163', note: B('尼泊尔', 'Nepal') },
      { zh: '南迦帕尔巴特峰', en: 'Nanga Parbat', alt: '8,126', note: B('巴基斯坦', 'Pakistan') },
      { zh: '安纳普尔纳一号峰', en: 'Annapurna I', alt: '8,091', note: B('尼泊尔', 'Nepal') },
      { zh: '加舒尔布鲁木一号峰', en: 'Gasherbrum I', alt: '8,080', note: B('中国 / 巴基斯坦', 'China / Pakistan') },
      { zh: '布洛阿特峰', en: 'Broad Peak', alt: '8,051', note: B('中国 / 巴基斯坦', 'China / Pakistan') },
      { zh: '加舒尔布鲁木二号峰', en: 'Gasherbrum II', alt: '8,035', note: B('中国 / 巴基斯坦', 'China / Pakistan') },
      { zh: '希夏邦马峰', en: 'Shishapangma', alt: '8,027', note: B('西藏', 'Tibet') },
    ],
  },
  {
    id: 't1',
    track: 'trek',
    code: 'T1 · DAY',
    title: B('一日 · 入门', 'Day · Entry'),
    altitude: 1200,
    lessons: 5,
    subtitle: B(
      '先学会判断一条线路有多难，再谈走多远。装包、配速、补水和脚的保护都在这一段。',
      'Learn how hard a route is before you decide how far to walk. Pack, pace, water, feet.'
    ),
    topics: [
      B('判断线路难度', 'Reading a route'),
      B('装包、配速与补水', 'Pack weight & pace'),
      B('水、脚与天气', 'Water, feet, weather'),
    ],
    peaks: [
      { zh: '徽杭古道', en: 'Huihang Trail', alt: '1,000', note: B('安徽 · 绩溪', 'Anhui') },
      { zh: '武功山', en: 'Wugong Mountain', alt: '1,918', note: B('江西 · 萍乡', 'Jiangxi') },
    ],
  },
  {
    id: 't2',
    track: 'trek',
    code: 'T2 · MULTI-DAY',
    title: B('多日', 'Multi-day'),
    altitude: 2500,
    lessons: 9,
    subtitle: B(
      '从一天变成几天：行程怎么排、营地怎么选、饭怎么做，天气变了怎么办。',
      'From one day to several: itinerary, camps, cooking, and what to do when the weather turns.'
    ),
    topics: [
      B('行程与营地', 'Itinerary & camps'),
      B('做饭与补给', 'Cooking & resupply'),
      B('天气突变', 'When weather turns'),
    ],
    peaks: [
      { zh: '雨崩', en: 'Yubeng', alt: '3,200', note: B('云南 · 德钦', 'Yunnan') },
      { zh: '安纳普尔纳大本营', en: 'Annapurna Base Camp', alt: '4,130', note: B('尼泊尔', 'Nepal') },
    ],
  },
  {
    id: 't3',
    track: 'trek',
    code: 'T3 · ALTITUDE',
    title: B('高原', 'High altitude'),
    altitude: 3800,
    lessons: 5,
    subtitle: B(
      '3,000 m 以上，问题从「累不累」变成「适应得怎么样」。上升节奏、保暖防晒、吃睡与心态。',
      'Above 3,000 m the question changes from tired to acclimatised. Rate, warmth, sun, food, sleep.'
    ),
    topics: [
      B('上升节奏', 'Ascent rate'),
      B('保暖、防晒与睡眠', 'Cold, sun, sleep'),
      B('高原上的吃与睡', 'Eating at altitude'),
    ],
    peaks: [
      { zh: 'ABC · 高原段', en: 'ABC · upper section', alt: '4,130', note: B('尼泊尔', 'Nepal') },
      { zh: '珠峰大本营', en: 'Everest Base Camp', alt: '5,364', note: B('尼泊尔', 'Nepal') },
    ],
  },
  {
    id: 't4',
    track: 'trek',
    code: 'T4 · LONG ROUTE',
    title: B('长线', 'Long route'),
    altitude: 4500,
    lessons: 3,
    subtitle: B(
      '十天以上的线路：分段补给、许可规定、通信预案，以及常见急症的现场处理。',
      'Ten days or more: resupply, permits, comms plans, and field treatment of common emergencies.'
    ),
    topics: [
      B('许可与分段补给', 'Permits & resupply'),
      B('通信与预案', 'Comms & contingency'),
      B('现场急救', 'Field first aid'),
    ],
    peaks: [
      { zh: '冈仁波齐转山', en: 'Kailash Kora', alt: '5,630', note: B('西藏 · 阿里', 'Tibet') },
      { zh: 'EBC + 三条垭口', en: 'EBC + Three Passes', alt: '5,550', note: B('尼泊尔', 'Nepal') },
    ],
  },
];

export const ALPINE = UNITS.filter((u) => u.track === 'alpine');
export const TREK = UNITS.filter((u) => u.track === 'trek');
export const SUMMIT = 8848;
export const START = 3200;
