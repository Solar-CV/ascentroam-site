import { B } from '../lib/i18n.js';

// Real screenshots captured from v0.26.3 on a 1080x2400 Android emulator.
export const APP = {
  eyebrow: B('应用', 'In the app'),
  meta: B('5 张 · 真实安装包', '5 SCREENS · REAL BUILD'),
  title: B('每一课，都往上走一点。', 'Every lesson moves you up.'),
  lede: B(
    '这些不是效果图，是在 Android 上装好 v0.26.3 之后截下来的界面。向下滚动，从起点看到训练。',
    'Not mockups. These are captures from v0.26.3 installed on Android. Scroll from base camp through to training.'
  ),
  spec: B('1080 × 2400 · Android 15', '1080 × 2400 · Android 15'),
  stepsLabel: B('界面步骤', 'App screens'),
  steps: [
    {
      id: 'path',
      name: B('路径', 'Path'),
      kicker: B('路径 · PATH', 'PATH'),
      title: B('打开就是海拔。', 'You open at altitude.'),
      body: B(
        '3,200 米起步，十个单元沿一条上升路线排开。学完一课，海拔上升；打通一个单元，进入下一个营地。',
        'You start at 3,200 m. Ten units sit on one rising line. Finish a lesson and you gain metres; clear a unit and you reach the next camp.'
      ),
      meta: B('3,200 M · 第 1 单元', '3,200 M · UNIT 1'),
      alt: B('App 路径页：3,200 米起点、第 1 单元与当前课程', 'App path screen: 3,200 m start, Unit 1 and the current lesson'),
    },
    {
      id: 'lesson',
      name: B('课程', 'Lesson'),
      kicker: B('课程 · LESSON', 'LESSON'),
      title: B('一页要点，一次测验。', 'Key points, then a quiz.'),
      body: B(
        '每课四到八个要点，先讲清楚为什么，再用十五道题检验。答错不扣分，题目留在当课重做。',
        'Four to eight key points first — the why, not just the rule — then fifteen questions. A wrong answer costs nothing; it returns in that lesson’s retry set.'
      ),
      meta: B('15 题 · 约 11 分钟', '15 QUESTIONS · 11 MIN'),
      alt: B('课程页：高山环境与风险认知的要点与开始测验按钮', 'Lesson screen: key points for Alpine Environment and Risk Awareness'),
    },
    {
      id: 'quiz',
      name: B('题库', 'Practice'),
      kicker: B('题库 · PRACTICE', 'PRACTICE'),
      title: B('答完，立刻知道为什么。', 'The reason, right after the answer.'),
      body: B(
        '八种题型，从单选到情景判断。选错时给出正确项和解释——这道题考的是客观危险与主观危险的分界。',
        'Eight formats, from single choice to scenario judgement. A wrong pick still shows the right one and why — here, the line between objective and subjective danger.'
      ),
      meta: B('单选 · 第 1 / 15 题', 'SINGLE CHOICE · 1 / 15'),
      alt: B('题库页：单选题目与答对后的解释', 'Quiz screen: a single-choice question with the explanation after a correct answer'),
    },
    {
      id: 'handbook',
      name: B('技能书', 'Handbook'),
      kicker: B('技能书 · HANDBOOK', 'HANDBOOK'),
      title: B('三十五篇，随时能查。', 'Thirty-five notes, always there.'),
      body: B(
        '高海拔医学、冰雪技术、攀冰、绳索、天气与救援。按你正在学的轨道过滤，不相关的不会出现。',
        'Altitude medicine, snow and ice, ice climbing, ropes, weather, rescue. Filtered by the track you are on, so nothing irrelevant appears.'
      ),
      meta: B('35 篇 · 11 类', '35 NOTES · 11 CATEGORIES'),
      alt: B('技能书列表：高海拔医学与冰雪技术文章', 'Handbook list: altitude medicine and snow-and-ice articles'),
    },
    {
      id: 'breath',
      name: B('训练', 'Training'),
      kicker: B('训练 · TRAINING', 'TRAINING'),
      title: B('下了山，也要练。', 'Train off the mountain.'),
      body: B(
        '4-4 呼吸、冰爪步伐、装备默写、天气判读。四个小练习，不需要器械，五分钟起。',
        '4-4 breathing, crampon footwork, gear-list recall, weather reading. Four drills, no equipment, five minutes to start.'
      ),
      meta: B('4-4 呼吸 · 5 分钟', '4-4 BREATHING · 5 MIN'),
      alt: B('训练页：4-4 呼吸法正在进行吸气计数', 'Training screen: the 4-4 breathing pacer counting an inhale'),
    },
  ],
};

export const INTERLUDE = {
  eyebrow: B('实地', 'Field'),
  top: B('FIELD NOTES — 实地', 'IN THE FIELD'),
  quote: B('课程可以重来，山不能。', 'Lessons can be retaken. Mountains cannot.'),
  sub: B(
    '这不是恐吓，是排课的理由。把判断练在出发前，而不是在山上。',
    'Not a threat — a reason for the syllabus. Practise judgement before you leave, not on the mountain.'
  ),
  photos: [
    {
      src: 'k2',
      caption: B('K2 · 8,611 M · 从布洛阿特看', 'K2 · 8,611 M · FROM BROAD PEAK'),
      alt: B('黎明时从布洛阿特看 K2 的山脊', 'K2 at dawn, seen from Broad Peak'),
    },
    {
      src: 'ice',
      caption: B('马纳斯鲁 · 8,163 M · 蓝色冰原', 'MANASLU · 8,163 M · BLUE ICE'),
      alt: B('一名攀登者走在马纳斯鲁的蓝色冰原上', 'A climber crossing a blue ice field on Manaslu'),
    },
    {
      src: 'camp',
      caption: B('马纳斯鲁大本营 · 4,800 M', 'MANASLU BASE CAMP · 4,800 M'),
      alt: B('马纳斯鲁大本营的帐篷阵列航拍', 'Aerial view of the tent lines at Manaslu base camp'),
    },
  ],
};
