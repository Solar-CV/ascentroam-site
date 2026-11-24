import { B } from '../lib/i18n.js';

/**
 * 服务条款（网页版）。
 *
 * 正文与 App 内的 TermsPolicy.kt 保持同一份口径，改条款时两边一起改；
 * 差异以本页为准（App 内是离线副本）。
 */
export const TERMS = {
  kicker: B('条款 · 使用', 'Terms · use'),
  title: B('服务条款。', 'Terms of service.'),
  lede: B(
    '这份条款说明 AscentRoam 的使用范围、内容边界与责任限制。它很短，因为这款应用本身也简单：免费、离线、不卖任何东西。',
    'These terms cover what AscentRoam is for, where its content stops, and how far liability goes. They are short because the app is simple: free, offline, and selling nothing.'
  ),
  updated: B('生效与更新：2026 年 11 月 24 日', 'Effective and last updated: 24 November 2026'),
  summaryLabel: B('摘要', 'Summary'),
  summary: B(
    '免费供个人使用。应用提供教学与认知准备，不是向导、不是医疗建议，也不保证任何一次登顶。',
    'Free for personal use. The app is teaching and mental preparation — not a guide, not medical advice, and no promise of any summit.'
  ),
  tocLabel: B('目录', 'Contents'),
  docLabel: B('全文', 'Full terms'),
  intro: B(
    '下面是完整条款，共 6 节。你可以从头读，也可以用左侧目录直接跳到关心的部分。',
    'The full terms follow in six sections. Read from the top, or use the contents to jump to the part you need.'
  ),
  sections: [
    {
      id: 'licence',
      num: '01',
      title: B('使用许可', 'Licence'),
      blocks: [
        {
          kind: 'p',
          text: B(
            'AscentRoam 授予你个人的、非独占的、不可转让的使用许可。你可以把它装在自己的设备上，用于自己或家人的学习。',
            'AscentRoam grants you a personal, non-exclusive, non-transferable licence to use the app. You may install it on your own devices for yourself or your family.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '不得把本应用或其内容作为付费产品转售、二次分发，或打包进收费课程。源码按仓库中的许可协议开放，与本文分开。',
            'You may not resell, redistribute or bundle the app or its content into a paid product or course. The source is released under the licence in its repository, which is separate from these terms.'
          ),
        },
      ],
    },
    {
      id: 'content',
      num: '02',
      title: B('内容边界', 'What the content is'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '应用内的课程、题库与技能书用于教学与认知准备，不构成专业向导、医疗建议或任何形式的登顶保证。',
            'Lessons, questions and field notes are for teaching and mental preparation. They are not professional guiding, medical advice, or any kind of guarantee that a summit will be reached.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '冰雪、绳索、攀冰与救援技术必须在持证教练的现场指导下学习。高原病的判断与用药，以现场医生和最新指南为准。',
            'Snow, rope, ice and rescue skills must be learned on site under a certified instructor. Diagnosis and medication for altitude illness follow the on-site doctor and current guidelines.'
          ),
        },
      ],
    },
    {
      id: 'account',
      num: '03',
      title: B('账号与数据', 'Accounts and data'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '账号与同步是可选的，不注册也能使用全部课程。我们如何处理数据，见隐私政策。',
            'An account and sync are optional; every lesson works without one. How data is handled is set out in the privacy policy.'
          ),
        },
      ],
    },
    {
      id: 'ip',
      num: '04',
      title: B('知识产权', 'Intellectual property'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '应用内的文字、题目与插图由本项目编写或整理，版权归项目所有；引用的公开医学与技术资料归各自作者。',
            'The text, questions and illustrations are written or compiled for this project and remain its copyright. Public medical and technical sources quoted here belong to their authors.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '未经许可，不得批量抓取题库，也不得把内容用于训练商业模型。',
            'Do not bulk-scrape the question bank, or use the content to train commercial models, without permission.'
          ),
        },
      ],
    },
    {
      id: 'liability',
      num: '05',
      title: B('免责', 'Liability'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '本应用按「现状」提供，不附带任何明示或暗示的担保。在法律允许的范围内，因使用本应用而产生的直接或间接损失，由使用者自行承担。',
            'The app is provided as is, without warranty of any kind. To the extent the law allows, any direct or indirect loss arising from its use is borne by the user.'
          ),
        },
      ],
    },
    {
      id: 'changes',
      num: '06',
      title: B('变更与联系', 'Changes and contact'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '条款更新会同时发布在应用内与官网，并更新生效日期。更新后继续使用，即表示接受新条款。',
            'Updates are published in the app and on the website, with a new effective date. Continuing to use the app after a change means you accept the new terms.'
          ),
        },
        {
          kind: 'p',
          text: B('有疑问写信到：', 'Questions: write to'),
        },
        { kind: 'mail' },
      ],
    },
  ],
  docNote: B(
    '本页与 App 内展示的条款一致，App 内副本可离线阅读。若两者出现差异，以本页为准。',
    'This page matches the terms shown in the app, where a copy is readable offline. If they differ, this page controls.'
  ),
  footer: {
    home: B('返回首页', 'Home'),
    privacy: B('隐私政策', 'Privacy'),
    support: B('支持项目', 'Support'),
    delete: B('删除账号', 'Delete account'),
    source: B('开源项目', 'Source'),
    backTop: B('回到顶部', 'Back to top'),
  },
};
