import { B } from '../lib/i18n.js';

/**
 * 赞助页文案。
 *
 * 这一页同时被 App 内的支持入口和 README 的赞助段引用，所以措辞必须是
 * 「无偿赠与、不换任何权益」——这句话不是修辞，是 Google Play 付款政策里
 * 判定「捐赠」而非「数字商品交易」的依据。改动前先想清楚，
 * 别加任何暗示回报的句子。
 *
 * 文风约定：像开发者本人在解释，不写格言，不堆排比。
 * 有话直说，能用短句就用短句，但别硬凑对仗。
 */
export const SUPPORT = {
  kicker: B('赞助 · 无偿', 'Support · voluntary'),
  // 英文标题在 92px 下放不进一栏，换行位置由文案定（见 index.css 的 pre-line）。
  title: B('支持\nAscentRoam。', 'Supporting\nAscentRoam.'),
  lede: B(
    'AscentRoam 由个人开发者独立开发与维护，免费、无广告，源码公开在 GitHub 上。如果它对你有用，可以在这里自愿支持一下。',
    'AscentRoam is built and maintained by an independent developer — free, with no ads — and the source is public on GitHub. If you find it useful, you can support the project here.'
  ),
  updated: B('最近更新：2026 年 11 月 23 日', 'Last updated: 23 November 2026'),
  summaryLabel: B('摘要', 'In short'),
  summary: B(
    '赞助是自愿的赠与。所有课程、题目和徽章对每个人都一样，与有没有赞助无关。',
    'Support is a voluntary gift. The lessons, the questions and the badges are the same whether you have supported the project or not.'
  ),

  pledge: [
    B('金额随意', 'ANY AMOUNT'),
    B('不附带回报', 'NO REWARD'),
    B('随时可停', 'CANCEL ANYTIME'),
  ],

  channelsLabel: B('支持渠道', 'Where to give'),
  channelsNote: B(
    '两个渠道都由第三方平台托管，付款在站外完成。卡号、账单地址这类支付信息留在平台那边，不经过 App、本站，也不经过我。',
    'Both are hosted by third-party platforms and payment happens off this site. Card numbers and billing details stay with the platform — they never reach the app, this site, or me.'
  ),
  channels: [
    {
      id: 'afdian',
      num: '01',
      name: '爱发电',
      sub: B('中国大陆 · 人民币', 'Mainland China · CNY'),
      url: 'https://afdian.com/a/ascent',
      rows: [
        { k: B('付款方式', 'Payment'), v: B('支付宝 · 微信支付', 'Alipay · WeChat Pay') },
        { k: B('付款频率', 'Frequency'), v: B('单次，或每月', 'One-off, or monthly') },
        { k: B('平台服务费', 'Platform fee'), v: B('6%，提现时扣除', '6%, taken before payout') },
      ],
      cta: B('前往爱发电', 'Open Afdian'),
    },
    {
      id: 'kofi',
      num: '02',
      name: 'Ko-fi',
      sub: B('中国大陆以外 · 多币种', 'Outside mainland China · multi-currency'),
      url: 'https://ko-fi.com/ascentroam',
      rows: [
        { k: B('付款方式', 'Payment'), v: B('银行卡 · PayPal', 'Card · PayPal') },
        { k: B('付款频率', 'Frequency'), v: B('单次，或每月', 'One-off, or monthly') },
        { k: B('平台服务费', 'Platform fee'), v: B('不抽成，只收支付手续费', 'No cut; processor fees only') },
      ],
      cta: B('前往 Ko-fi', 'Open Ko-fi'),
    },
  ],

  ledgerLabel: B('赞助换不来什么', 'What it does not buy'),
  ledgerHead: [B('你可能以为', 'You might expect'), B('实际上是', 'What happens')],
  ledger: [
    {
      claim: B('解锁更多课程', 'Access to more lessons'),
      reality: B('91 门课全部免费，按学习顺序逐门解锁', 'All 91 lessons are free and unlock in study order'),
    },
    {
      claim: B('独家徽章或称号', 'Exclusive badges'),
      reality: B('40 枚徽章对所有人一样，没有赞助者专属版本', 'The same 40 badges for everyone — no supporter-only set'),
    },
    {
      claim: B('去除广告', 'An ad-free version'),
      reality: B('本来就没有广告，也没有付费版', 'There are no ads, and there is no paid version'),
    },
    {
      claim: B('优先答复', 'Priority replies'),
      reality: B('邮件按到达顺序处理，与是否赞助无关', 'Mail is answered in the order it arrives, regardless of support'),
    },
    {
      claim: B('订阅关系', 'A subscription'),
      reality: B('只有你在平台上自己开通的月付，随时可以取消', 'Only a monthly plan you set up yourself on the platform, which you can cancel anytime'),
    },
  ],

  sections: [
    {
      id: 'free',
      title: B('不花钱也能帮', 'Help without paying'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '在 GitHub 上提一个 issue、指出题库里的错别字或过时的数据、把 App 转给要去同一座山的人，这些比一笔转账有用得多。内容整理自公开的医学与技术资料，错误一定存在；有人指出来，它才会变好。',
            'Open an issue on GitHub, flag a typo or an outdated figure in the question bank, or pass the app on to someone heading for the same mountain — all of that helps more than a transfer. The content is compiled from public medical and technical sources, so mistakes exist, and they get fixed when someone points them out.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '想加的线路、想补的语言，也可以直接说。',
            'If there is a route you want added or a language that needs work, just say so.'
          ),
        },
        { kind: 'mail' },
      ],
    },
  ],

  quote: B(
    '谢谢每一个用它学习、帮我找错、把它转给朋友的人。',
    'Thanks to everyone who studies with it, spots mistakes, or passes it on to a friend.'
  ),

  footer: {
    home: B('返回首页', 'Home'),
    privacy: B('隐私政策', 'Privacy'),
    terms: B('服务条款', 'Terms'),
    delete: B('删除账号', 'Delete account'),
    source: B('开源项目', 'Source'),
    backTop: B('回到顶部', 'Back to top'),
  },
  docNote: B(
    'App 内的「支持」入口打开的就是这一页。',
    'The Support entry in the app opens this page.'
  ),
};

/**
 * 首页底部的一条窄带（Download 之后、Footer 之前）。
 * 不放按钮、不抢视线：一句事实 + 一个文字链接，点进去才是赞助页。
 */
export const SUPPORT_TEASER = {
  label: B('支持', 'Support'),
  body: B(
    '完全免费，没有广告，也没有付费解锁。愿意的话，可以帮它继续做下去。',
    'Completely free — no ads, no paid unlocks. If you want, you can help keep it going.'
  ),
  cta: B('看看怎么支持', 'Ways to support'),
};
