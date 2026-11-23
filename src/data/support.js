import { B } from '../lib/i18n.js';

/**
 * 赞助页文案。
 *
 * 这一页同时被三处引用：官网页脚、App 内的支持入口、README 的赞助段。
 * 所以措辞必须是「无偿赠与、不换任何权益」——这句话不是修辞，是
 * Google Play 付款政策里判定「捐赠」而非「数字商品交易」的依据，
 * 改动前先想清楚，别加任何暗示回报的句子。
 */
export const SUPPORT = {
  kicker: B('赞助 · 无偿', 'Support · voluntary'),
  // 换行是设计的一部分：不让浏览器在「不 / 是」之间断行。见 index.css 的 pre-line。
  title: B('捐赠，\n不是购买。', 'A donation,\nnot a purchase.'),
  lede: B(
    'AscentRoam 由一个人独立开发与维护：没有广告，没有付费解锁，也没有订阅。源码公开在 GitHub 上，项目靠使用者自愿的支持继续运行。',
    'AscentRoam is built and maintained by one person: no ads, no paid unlocks, no subscription. The source is public on GitHub, and the project keeps running on voluntary support from the people who use it.'
  ),
  updated: B('最近更新：2026 年 11 月 23 日', 'Last updated: 23 November 2026'),
  summaryLabel: B('一句话版本', 'In one paragraph'),
  summary: B(
    '你给的钱换不回任何东西。所有课程、所有题、所有徽章，对每个人完全一样——不管他有没有赞助过。',
    'What you give buys nothing in return. Every lesson, every question, every badge is exactly the same for everyone — whether they have supported the project or not.'
  ),

  pledge: [
    B('不分金额', 'ANY AMOUNT'),
    B('不换权益', 'NO REWARD'),
    B('可随时停', 'CANCEL ANYTIME'),
  ],

  channelsLabel: B('渠道', 'Where to give'),
  channelsNote: B(
    '两个渠道都由第三方平台托管，付款在站外完成，与 App 和本站都不产生账号关系。',
    'Both are hosted by third-party platforms. Payment happens off this site, and creates no account relationship with the app or this site.'
  ),
  channels: [
    {
      id: 'afdian',
      num: '01',
      name: '爱发电',
      sub: B('中国大陆 · 人民币', 'Mainland China · CNY'),
      url: 'https://afdian.com/a/ascent',
      rows: [
        { k: B('支付方式', 'Payment'), v: B('支付宝 · 微信支付', 'Alipay · WeChat Pay') },
        { k: B('频率', 'Frequency'), v: B('单次，或每月', 'One-off, or monthly') },
        { k: B('平台服务费', 'Platform fee'), v: B('6%，提现前扣除', '6%, deducted before payout') },
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
        { k: B('支付方式', 'Payment'), v: B('银行卡 · PayPal', 'Card · PayPal') },
        { k: B('频率', 'Frequency'), v: B('单次，或每月', 'One-off, or monthly') },
        { k: B('平台服务费', 'Platform fee'), v: B('0%，仅支付渠道收费', '0%, only payment-processor fees') },
      ],
      cta: B('前往 Ko-fi', 'Open Ko-fi'),
    },
  ],

  ledgerLabel: B('它换不回什么', 'What it does not buy'),
  ledgerHead: [B('你可能以为', 'You might expect'), B('实际上是', 'What actually happens')],
  ledger: [
    {
      claim: B('解锁更多课程', 'Access to more lessons'),
      reality: B('91 门课全部免费，按学习顺序逐门解锁', 'All 91 lessons are free and unlock in study order'),
    },
    {
      claim: B('独家徽章或称号', 'Exclusive badges'),
      reality: B('40 枚徽章对所有人相同，没有赞助者专属', 'The same 40 badges for everyone — no supporter-only set'),
    },
    {
      claim: B('去除广告', 'An ad-free version'),
      reality: B('本来就没有广告，也没有任何买断版', 'There are no ads, and no paid tier to upgrade to'),
    },
    {
      claim: B('优先答复', 'Priority replies'),
      reality: B('邮件按到达顺序处理，与是否赞助无关', 'Mail is answered in the order it arrives, regardless of support'),
    },
    {
      claim: B('订阅关系', 'A subscription'),
      reality: B('只有你在平台上自己勾选的月付，可随时取消', 'Only the monthly option you tick on the platform — cancel anytime'),
    },
  ],

  sections: [
    {
      id: 'where',
      num: '01',
      title: B('钱花在哪里', 'Where the money goes'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '平台在到账前先扣掉自己的费用，剩下的部分全部回到项目本身：域名与站点托管、Google Play 开发者账号、构建与测试占用的设备和时间。没有工资，没有办公室，也没有中间人。',
            'The platform takes its fee before the money reaches me. Everything left goes back into the project: the domain and hosting, the Google Play developer account, and the devices and hours that building and testing take. No salaries, no office, no middleman.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '这是个人项目，不是注册的公益组织或基金会：捐赠不能抵税，也不开具发票。付款平台会给你一封收据邮件，那封就是全部凭证。',
            'This is an individual project, not a registered charity or foundation: donations are not tax-deductible and no invoice is issued. The receipt email from the payment platform is the only document there is.'
          ),
        },
      ],
    },
    {
      id: 'fees',
      num: '02',
      title: B('平台扣多少', 'What the platforms take'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '爱发电在提现前收取 6% 的平台服务费。Ko-fi 本身不抽成，但通过银行卡或 PayPal 结算时，支付渠道会收取自己的跨境与货币转换费用——金额取决于你所在的国家和支付方式，我看不到，也无从补贴。',
            'Afdian charges a 6% platform fee before payout. Ko-fi takes nothing, but card and PayPal settlements carry their own cross-border and currency-conversion fees. How much depends on your country and payment method — I neither see nor absorb them.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '你付款时填的卡号、账单地址和邮箱都留在平台与支付渠道那边，不进 App、不进本站，也不会进我这边的任何日志。',
            'The card number, billing address and email you enter at payment stay with the platform and the payment processor. They never reach the app, this site, or any log of mine.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '这也是为什么没有接支付宝或微信的个人收款码：二维码付款没有对账记录，也没有退款通道，出了问题双方都说不清。',
            'That is also why there is no bare Alipay or WeChat QR code here: a QR transfer leaves no statement and no refund path, and when something goes wrong neither side can prove anything.'
          ),
        },
      ],
    },
    {
      id: 'refund',
      num: '03',
      title: B('误付、重复付、未成年人', 'Mistakes, duplicates, minors'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '赞助原则上不退——它是赠与，不是订单。但如果是误操作、重复付款，或者未成年人未经监护人同意付了款，写一封邮件说明渠道、时间和金额，能退就退。',
            'Support is not refundable in principle — it is a gift, not an order. But if it was a mistake, a duplicate, or a minor paying without a guardian’s consent, write in with the channel, time and amount, and a refund will be made where possible.'
          ),
        },
        { kind: 'mail' },
      ],
    },
    {
      id: 'free',
      num: '04',
      title: B('不花钱也能帮', 'Help without paying'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '在 GitHub 上提一个 issue、指出题库里的错别字或过时的数据、把 App 转给要去同一座山的人——这些比一笔转账有用得多。内容是按公开的医学与技术资料整理的，错误一定存在，有人指出来它才会变好。',
            'Open an issue on GitHub, flag a typo or an outdated figure in the question bank, or pass the app on to someone heading for the same mountain — that is worth far more than a transfer. The content is compiled from public medical and technical sources, so mistakes exist; they only get fixed when someone points them out.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '有想加的线路、想补的语言，也可以直接说。十种语言的界面和内容都是这样一点点补齐的。',
            'Routes you want added, languages that need filling in — just say so. All ten languages were filled in that way, a little at a time.'
          ),
        },
      ],
    },
  ],

  quote: B(
    '山不会因为多了一笔转账而变矮。这份手册能写多久，取决于还有多少人愿意一起扛。',
    'The mountain does not get shorter because someone sent money. How long this manual keeps growing depends on how many people are willing to carry it.'
  ),
  quoteFrom: B('谢谢同行。', 'Thanks for walking with us.'),

  footer: {
    home: B('返回首页', 'Home'),
    privacy: B('隐私政策', 'Privacy'),
    delete: B('删除账号', 'Delete account'),
    source: B('源码', 'Source'),
    backTop: B('回到顶部', 'Back to top'),
  },
  docNote: B(
    'App 内的「支持」入口直接打开这一页。官网、App 与 README 保持同一套口径，以免对赞助的性质产生不同理解。',
    'The Support entry inside the app opens this page. The site, the app and the README keep the same wording, so the nature of this support cannot be read two ways.'
  ),
};
