import { B } from '../lib/i18n.js';

export const SITE = {
  name: 'AscentRoam',
  cn: '登攀',
  repo: 'https://github.com/Solar-CV/AscentApp',
  releases: 'https://github.com/Solar-CV/AscentApp/releases/latest',
  privacy: 'privacy.html',
  version: '0.26.3',
  size: '30 MB',
};

export const NAV = [
  { href: '#method', label: B('方法', 'Method') },
  { href: '#curriculum', label: B('课程', 'Curriculum') },
  { href: '#practice', label: B('题库', 'Practice') },
  { href: '#notes', label: B('技能书', 'Field notes') },
  { href: '#gallery', label: B('影像', 'Gallery') },
  { href: '#download', label: B('下载', 'Download') },
];

export const HERO = {
  eyebrow: B('高海拔攀登与徒步训练 · Android', 'High-altitude training, on Android'),
  titleLine1: B('上山之前，', 'Learn the mountain'),
  titleLine2: B('先把山学明白。', 'before you climb it.'),
  accent: B('先', 'before'),
  lede: B(
    'AscentRoam 是一份写给高海拔的野外手册。91 门课、1,563 道题，从 3,200 米到 8,848 米——离线可用，无需登录。',
    'AscentRoam is a field manual for high altitude. 91 lessons and 1,563 questions, from 3,200 m to 8,848 m — offline, no account required.'
  ),
  primary: B('下载 Android 版', 'Download for Android'),
  secondary: B('看看界面', 'See the app'),
  meta: [B('v0.26.3', 'v0.26.3')],
  coords: '27°59′17″N 86°55′31″E',
  place: B('珠穆朗玛 · 日出', 'Everest · Sunrise'),
  legend: B('照片 → 线场 · 96 列 × 4 档', 'PHOTO → FIELD · 96 × 4'),
  scale: [8848, 8000, 7000, 6000, 5000, 4000, 3200],
};

export const TICKER = [
  B('3,200 M 起点', '3,200 M START'),
  B('91 门课', '91 LESSONS'),
  B('1,563 道题', '1,563 QUESTIONS'),
  B('38 座山峰与线路', '38 PEAKS & ROUTES'),
  B('35 篇技能书', '35 FIELD NOTES'),
  B('40 枚徽章', '40 BADGES'),
  B('10 种语言', '10 LANGUAGES'),
  B('100% 离线', '100% OFFLINE'),
];

export const METHOD = {
  eyebrow: B('方法', 'Method'),
  title: B('你的进度，用海拔计量。', 'Progress, measured in altitude.'),
  body: B(
    '打开 App 时你在 3,200 米。学完一课，海拔上升；打通一个单元，进入下一个营地。海拔不靠签到，只靠真正学完的内容。',
    'You start at 3,200 m. Finish a lesson and you gain metres; clear a unit and you move to the next camp. Altitude is not a streak — it is what you have actually learned.'
  ),
  note: B('10 个单元 · 91 门课 · 高山轨道 6 个营地', '10 units · 91 lessons · 6 camps on the alpine track'),
  start: B('起点', 'START'),
  summit: B('顶点', 'SUMMIT'),
  aside: B(
    '这里的「顶峰」只是学习进度的终点。App 从不会因此说你已经准备好一座真山。',
    'The summit here is the end of a learning route. It never means you are ready for a real mountain.'
  ),
  unitLabel: B('单元', 'UNIT'),
  lessons: B('课', 'lessons'),
  peaksLabel: B('对应山峰与线路', 'Peaks & routes'),
  expand: B('展开', 'Open'),
  collapse: B('收起', 'Close'),
};

export const TRACKS = {
  eyebrow: B('课程', 'Curriculum'),
  title: B('两条轨道，一座山。', 'Two tracks, one mountain.'),
  lede: B(
    '从 5,000 米的雪坡到 8,000 米的死亡地带，从一日徒步到十天长线。每个单元都按真实路线组织，学完才进入下一个营地。',
    'From 5,000 m snow slopes to the 8,000 m death zone, from a day walk to a ten-day traverse. Each unit follows a real route; you move on when it is done.'
  ),
  cards: [
    {
      id: 'alpine',
      kicker: B('高山攀登', 'Alpine'),
      title: B('六个营地，一条上升路线。', 'Six camps, one line of ascent.'),
      copy: B(
        '环境与装备、技术入门、高原医学、硬技术、救援与判断，最后是 8,000 米。',
        'Environment and equipment, technical entry, altitude medicine, hard skills, rescue and judgement — then 8,000 m.'
      ),
      stats: [
        { n: '6', label: B('单元', 'units') },
        { n: '69', label: B('门课', 'lessons') },
        { n: '30', label: B('座山峰', 'peaks') },
      ],
      tone: 'ink',
      mode: 'ridge',
      seed: 91,
      href: '#method',
    },
    {
      id: 'trek',
      kicker: B('徒步', 'Trekking'),
      title: B('从一天，走到十天。', 'From one day to ten.'),
      copy: B(
        '线路判断、装包配速、营地与补给、高原适应，以及长线的许可与预案。',
        'Reading a route, pack and pace, camps and resupply, acclimatisation, and the permits and contingency of a long route.'
      ),
      stats: [
        { n: '4', label: B('单元', 'units') },
        { n: '22', label: B('门课', 'lessons') },
        { n: '8', label: B('条线路', 'routes') },
      ],
      tone: 'paper',
      mode: 'rings',
      seed: 42,
      href: '#method',
    },
    {
      id: 'bank',
      kicker: B('题库', 'Question bank'),
      title: B('学完，再被问一次。', 'Then be asked again.'),
      copy: B(
        '八种题型，从单选到情景判断。答错不扣分，直接进入当课的错题重做。',
        'Eight formats, from single choice to scenario judgement. A wrong answer costs nothing; it returns in that lesson’s retry set.'
      ),
      stats: [
        { n: '1,563', label: B('道题', 'items') },
        { n: '8', label: B('种题型', 'formats') },
        { n: '0/1/3/7/16/35', label: B('天间隔重复', 'day spacing') },
      ],
      tone: 'blue',
      mode: 'matrix',
      seed: 7,
      href: '#practice',
    },
  ],
};

export const PRACTICE = {
  eyebrow: B('题库', 'Practice'),
  meta: B('8 种题型', '8 FORMATS'),
  title: B('八种问法，一种目标。', 'Eight ways to be asked.'),
  lede: B(
    '不是背答案。每种题型都在逼你把知识放回山上：先判断，再动作。',
    'Not recall for its own sake. Every format puts the knowledge back on the mountain: judge first, then move.'
  ),
  formats: [
    { n: '01', zh: '单选', en: 'Single choice' },
    { n: '02', zh: '多选', en: 'Multiple answers' },
    { n: '03', zh: '排序', en: 'Ordering' },
    { n: '04', zh: '配对', en: 'Matching' },
    { n: '05', zh: '填空', en: 'Fill in' },
    { n: '06', zh: '计算', en: 'Calculation' },
    { n: '07', zh: '热点', en: 'Hotspot' },
    { n: '08', zh: '情景', en: 'Scenario' },
  ],
  quizKicker: B('示例 · 高山医学', 'Sample · altitude medicine'),
  quiz: {
    prompt: B(
      'Lake Louise 标准中，诊断 AMS 必须包含的症状是？',
      'Under the Lake Louise criteria, which symptom is required to diagnose AMS?'
    ),
    options: [
      B(
        '头痛，并至少伴随恶心、头晕、疲乏或失眠中的一项',
        'Headache plus at least one of nausea, dizziness, fatigue or poor sleep'
      ),
      B('仅有咳嗽', 'Cough alone'),
      B('仅有腿部酸痛', 'Sore legs alone'),
      B('仅有食欲变好', 'Improved appetite'),
    ],
    answer: 0,
    explanation: B(
      '头痛是 AMS 的核心症状。单纯的疲乏或失眠不足以诊断，必须与头痛组合出现。这条标准的实用价值是：你可以在营地快速自评并做决策。',
      'Headache is the core symptom; fatigue or insomnia alone do not qualify. The practical value of the rule is that you can self-assess at camp and make a decision.'
    ),
  },
  correct: B('正确。', 'Correct.'),
  wrong: B('再看一遍。', 'Not quite.'),
  next: B('换一题', 'Another one'),
  hint: B('选一个答案', 'Choose one'),
};

export const NOTES = {
  eyebrow: B('技能书', 'Field notes'),
  meta: B('35 篇 / 11 类', '35 NOTES / 11 CATEGORIES'),
  title: B('35 篇长文，写在出发前。', '35 notes, written before you leave.'),
  lede: B(
    '装备、技术、医学、天气、决策与救援，十一类，每篇四到八节。按你正在学的轨道过滤，不相关的不出现。',
    'Equipment, technique, medicine, weather, judgement and rescue — eleven categories, four to eight sections each, filtered to the track you are on.'
  ),
  categories: [
    B('装备', 'Equipment'),
    B('技术', 'Technique'),
    B('医学', 'Medicine'),
    B('健康', 'Health'),
    B('天气', 'Weather'),
    B('气象', 'Meteorology'),
    B('决策', 'Judgement'),
    B('判断', 'Assessment'),
    B('安全', 'Safety'),
    B('风险', 'Risk'),
    B('雪崩救援', 'Avalanche rescue'),
  ],
  quote: B(
    '大多数事故，始于帐篷里的一个决定，而不是绳子上的一个动作。',
    'Most accidents begin with a decision in the tent, not a move on the rope.'
  ),
  quoteNote: B('技能书 · 决策', 'Field note · judgement'),
  samples: [
    {
      cat: B('医学', 'Medicine'),
      title: B('急性高原病：从头痛到决策', 'Acute mountain sickness: from headache to decision'),
      excerpt: B(
        'Lake Louise 评分怎么用，什么时候该停，什么时候必须下撤。',
        'How to use the Lake Louise score, when to hold, and when descent is the only answer.'
      ),
      read: B('7 节 · 12 分钟', '7 sections · 12 min'),
    },
    {
      cat: B('气象', 'Meteorology'),
      title: B('看云识天气：六种云与预兆', 'Reading clouds: six signs and what follows'),
      excerpt: B(
        '荚状云、乳房云、雨幡与快速抬升的积云，各自意味着什么。',
        'Lenticular, mammatus, virga and fast-building cumulus — what each one is telling you.'
      ),
      read: B('6 节 · 9 分钟', '6 sections · 9 min'),
    },
    {
      cat: B('雪崩救援', 'Avalanche rescue'),
      title: B('三件套：信标搜索与探杆定点', 'The trilogy: beacon search and probe placement'),
      excerpt: B(
        '从信号到粗搜、细搜，再到探杆落点的顺序与常见错误。',
        'Signal to coarse search to fine search, then where the probe goes — and the mistakes that cost minutes.'
      ),
      read: B('8 节 · 14 分钟', '8 sections · 14 min'),
    },
  ],
};

export const BADGES = {
  eyebrow: B('记录', 'Record'),
  meta: B('40 枚成就', '40 OBJECTS'),
  title: B('40 枚徽章，都是实物。', 'Forty badges. All objects.'),
  lede: B(
    '不是平面图标。每一枚都有金属外框、珐琅与浮雕山体，实时渲染，解锁时喷彩带。个人主页只陈列你真正拿到的那几枚。',
    'Not flat icons. Each one has a metal rim, enamel and a relief summit, rendered live. The profile shows only what you have actually earned.'
  ),
  items: [
    { file: 'first_steps', zh: '首次出发', en: 'First steps', note: B('完成第一课', 'First lesson') },
    { file: 'basecamp_grad', zh: '大本营毕业', en: 'Base camp', note: B('完成 5,000 米单元', '5,000 m unit') },
    { file: 'six_k_grad', zh: '六千米毕业', en: 'Six thousand', note: B('完成 6,000 米单元', '6,000 m unit') },
    { file: 'eight_k_grad', zh: '八千米毕业', en: 'Eight thousand', note: B('完成 8,000 米单元', '8,000 m unit') },
    { file: 'avalanche_eye', zh: '雪崩之眼', en: 'Avalanche eye', note: B('救援单元全对', 'Rescue unit, no errors') },
    { file: 'fourteen_peaks', zh: '十四座巡礼', en: 'Fourteen peaks', note: B('走完 14 座 8000 米', 'All 14 eight-thousanders') },
    { file: 'full_route', zh: '攀登大满贯', en: 'Full route', note: B('69 门攀登课全部完成', 'All 69 alpine lessons') },
    { file: 'two_tracks', zh: '双线并进', en: 'Two tracks', note: B('两条轨道同时推进', 'Both tracks in progress') },
  ],
  note: B('40 枚成就 · 实时 3D · 解锁动画', '40 achievements · live 3D · unlock animation'),
};

export const GALLERY = {
  eyebrow: B('影像', 'Gallery'),
  meta: B('08 / 影像库', '08 / ARCHIVE'),
  title: B('这些山，是课程的原点。', 'These mountains are where the syllabus comes from.'),
  lede: B(
    '每一课对应的地形、营地与天气，都来自真实的山。把照片切成线场，是提醒：地图不是地面。',
    'The terrain, camps and weather behind each lesson come from real mountains. Turning a photograph into a line field is a reminder: the map is not the ground.'
  ),
  photoLabel: B('照片', 'Photo'),
  linesLabel: B('线场', 'Lines'),
};

export const LANGUAGES = {
  eyebrow: B('语言', 'Languages'),
  meta: B('10,727 条键', '10,727 KEYS'),
  title: B('十种语言，一条路线。', 'Ten languages, one route.'),
  body: B(
    '简体中文写作，另译九种，逐键对齐 10,727 条。缺译回退英文，再回退中文。',
    'Written in Simplified Chinese, translated into nine more, aligned key by key across 10,727 strings. Missing strings fall back to English, then Chinese.'
  ),
  list: [
    { code: 'zh-CN', label: '简体中文', latin: 'Chinese, Simplified' },
    { code: 'zh-TW', label: '繁體中文', latin: 'Chinese, Traditional' },
    { code: 'en', label: 'English', latin: 'English' },
    { code: 'ja', label: '日本語', latin: 'Japanese' },
    { code: 'de', label: 'Deutsch', latin: 'German' },
    { code: 'fr', label: 'Français', latin: 'French' },
    { code: 'es', label: 'Español', latin: 'Spanish' },
    { code: 'it', label: 'Italiano', latin: 'Italian' },
    { code: 'ru', label: 'Русский', latin: 'Russian' },
    { code: 'sv', label: 'Svenska', latin: 'Swedish' },
  ],
};

export const SAFETY = {
  eyebrow: B('边界', 'Limits'),
  meta: B('出发前必读', 'READ BEFORE YOU GO'),
  title: B('它不是什么。', 'What this is not.'),
  lede: B(
    '把话说清楚，比把话说满更有用。',
    'Saying what it is not matters more than saying what it is.'
  ),
  limits: [
    {
      n: '01',
      title: B('不是向导', 'Not a guide'),
      body: B(
        '它不带你上山，也不替代教练。冰雪、绳索、攀冰与救援，必须在持证教练的现场评估下学习。',
        'It does not take you up, and it does not replace an instructor. Snow, rope, ice and rescue skills must be learned under a certified guide, on site.'
      ),
    },
    {
      n: '02',
      title: B('不是医疗建议', 'Not medical advice'),
      body: B(
        '高原病的判断与用药，以现场医生和最新指南为准。App 里的是认知准备，不是处方。',
        'Diagnosis and medication for altitude illness follow the on-site doctor and current guidelines. What is here is preparation, not a prescription.'
      ),
    },
    {
      n: '03',
      title: B('不是登顶保证', 'Not a summit promise'),
      body: B(
        '学完 91 课，只说明你准备得更充分。天气、身体与运气，仍然决定你走到哪里。',
        'Finishing 91 lessons means you are better prepared. Weather, body and luck still decide how far you get.'
      ),
    },
  ],
  asideTitle: B('离线，不登录。', 'Offline. No account.'),
  aside: B(
    '课程、题目、技能书与徽章模型都在本地，飞行模式也能学。登录只为换设备时找回进度。',
    'Lessons, questions, notes and badge models live on the device; it works in aeroplane mode. Signing in only restores progress on a new phone.'
  ),
  privacy: B('隐私政策', 'Privacy policy'),
  delete: B('删除账号', 'Delete account'),
};

export const DOWNLOAD = {
  eyebrow: B('下载', 'Download'),
  title: B('把路线带走。', 'Take the route with you.'),
  lede: B(
    'Android 8.0 及以上，arm64。安装包约 30 MB，不申请多余权限。iOS 尚未发布。',
    'Android 8.0 and above, arm64. About 30 MB, no unnecessary permissions. iOS is not released yet.'
  ),
  primary: B('前往 GitHub Releases', 'Open GitHub Releases'),
  secondary: B('查看源码', 'Read the source'),
  specs: [
    { k: B('版本', 'VERSION'), v: '0.26.3' },
    { k: B('系统', 'ANDROID'), v: '8.0+ / API 26' },
    { k: B('架构', 'ABI'), v: 'arm64-v8a' },
    { k: B('体积', 'SIZE'), v: '≈ 30 MB' },
    { k: B('价格', 'PRICE'), v: B('免费', 'Free') },
    { k: B('账号', 'ACCOUNT'), v: B('不需要', 'Not required') },
  ],
  note: B('开源项目 · Solar-CV/AscentApp', 'Open source · Solar-CV/AscentApp'),
};

export const FOOTER = {
  appLabel: B('应用', 'App'),
  sectionsLabel: B('章节', 'Sections'),
  tagline: B('一份高海拔野外手册。', 'A field manual for high altitude.'),
  links: [
    { href: SITE.repo, label: 'GitHub' },
    { href: SITE.releases, label: 'Releases' },
    { href: 'delete-account.html', label: B('删除账号', 'Delete account') },
    { href: SITE.privacy, label: B('隐私政策', 'Privacy') },
  ],
  top: B('回到顶部', 'Back to top'),
  imprint: B(
    '线场由 Canvas 2D 实时绘制，不使用图像素材。',
    'Line fields are drawn live in Canvas 2D, not image assets.'
  ),
};
