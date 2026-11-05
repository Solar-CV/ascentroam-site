import { B } from '../lib/i18n.js';

export const PRIVACY = {
  kicker: B('法律 · 隐私', 'Legal · privacy'),
  title: B('隐私政策。', 'Privacy policy.'),
  lede: B(
    'AscentRoam 默认离线工作。只有你主动注册并开启同步，账号与学习数据才会离开这台设备。这份政策说明我们收集什么、为什么收集，以及你随时可以做什么。',
    'AscentRoam is offline by default. Account and learning data leave this device only if you register and enable sync. This policy explains what we collect, why, and what you can do about it.'
  ),
  updated: B('生效与更新：2026 年 11 月 5 日', 'Effective and last updated: 5 November 2026'),
  summaryLabel: B('一句话版本', 'In one paragraph'),
  summary: B(
    '默认离线，只有注册并开启同步才会上传账号与学习数据。我们不投放广告、不做用户画像，也不出售数据。',
    'Offline by default. Account and learning data are uploaded only if you register and enable sync. No ads, no profiling, no sale of data.'
  ),
  tocLabel: B('目录', 'Contents'),
  docLabel: B('全文', 'Full policy'),
  intro: B(
    '下面是完整条款，共 10 节。你可以从头读，也可以用左侧目录直接跳到关心的部分。',
    'The full terms follow in ten sections. Read from the top, or use the contents to jump to the part you need.'
  ),
  sections: [
    {
      id: 'scope',
      num: '01',
      title: B('谁在处理你的数据', 'Who processes your data'),
      blocks: [
        {
          kind: 'p',
          text: B(
            'AscentRoam 由个人开发者独立开发与维护，不是由某家公司运营的产品。对本政策有疑问，或需要行使下文权利，请使用第 10 节的联系方式。',
            'AscentRoam is built and maintained by an individual developer, not operated by a company. For questions about this policy, or to exercise the rights below, use the contact details in section 10.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '本政策适用于 AscentRoam Android 应用（包名 com.ascentroam.app）以及本站。如果你只使用离线功能、不注册账号，我们不会收到任何可识别你身份的信息。',
            'This policy covers the AscentRoam Android app (package com.ascentroam.app) and this website. If you use only the offline features and never create an account, we receive no information that identifies you.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '生效日期：2026 年 11 月 5 日。此前版本不再适用。',
            'Effective date: 5 November 2026. Earlier versions no longer apply.'
          ),
        },
      ],
    },
    {
      id: 'collect',
      num: '02',
      title: B('我们收集哪些数据', 'What we collect'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '我们只收集运行账号与同步所必需的数据，不收集与训练无关的信息。',
            'We collect only what is needed to run an account and sync your progress. Nothing unrelated to training.'
          ),
        },
        {
          kind: 'h3',
          text: B('账号与登录', 'Account and sign-in'),
        },
        {
          kind: 'ul',
          items: [
            B('注册邮箱；', 'Your email address;'),
            B('昵称或用户名；', 'A nickname or username;'),
            B(
              '密码哈希（scrypt，不可逆；我们不保存密码原文）；',
              'A password hash (scrypt, irreversible; we never store the password itself);'
            ),
            B(
              '使用 Google 登录时的 Google 账号标识、邮箱与头像链接；',
              'If you sign in with Google, your Google account ID, email address and avatar URL;'
            ),
            B(
              '注册时间、最近登录时间，以及用于区分设备的随机标识。',
              'Registration and last sign-in times, and a random identifier used to distinguish devices.'
            ),
          ],
        },
        {
          kind: 'h3',
          text: B('学习数据', 'Learning data'),
        },
        {
          kind: 'ul',
          items: [
            B('课程与课时的完成状态；', 'Lesson and unit completion;'),
            B(
              '当前海拔、连续学习天数、成就徽章与复习队列；',
              'Current altitude, streak, achievement badges and review queue;'
            ),
            B('头像文件与本机显示名；', 'Avatar file and local display name;'),
            B(
              '同步时间戳与冲突处理所需的版本号。',
              'Sync timestamps and the version numbers needed to resolve conflicts.'
            ),
          ],
        },
        {
          kind: 'h3',
          text: B('App 内反馈', 'In-app feedback'),
        },
        {
          kind: 'p',
          text: B(
            '你在 App 内提交反馈时，我们会收到你填写的正文、你选择填写的邮箱，以及只有你主动勾选才会附上的诊断信息：应用版本、Android 版本、设备型号、界面语言与最近一次崩溃记录。诊断信息默认不附加。',
            'When you send feedback from the app, we receive the message you write, the email address you choose to give, and — only if you tick the box — diagnostic details: app version, Android version, device model, interface language and the most recent crash record. Diagnostics are never attached by default.'
          ),
        },
        {
          kind: 'h3',
          text: B('网站', 'This website'),
        },
        {
          kind: 'p',
          text: B(
            '本站没有账号系统，也不使用广告、第三方分析或跨站跟踪。浏览器只在本地保存两项偏好：语言（ar-lang）与主题（ar-theme）。你可以随时在浏览器设置中清除它们。',
            'This site has no account system and uses no ads, third-party analytics or cross-site tracking. Your browser stores two preferences locally: language (ar-lang) and theme (ar-theme). You can clear them in your browser settings at any time.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '如果你使用网页的删除账号表单，我们会收到你填写的邮箱、昵称或用户名（可选）、备注（可选）、确认状态、界面语言、提交时间与来源页面。服务器日志可能记录 IP 地址、浏览器标识与请求时间，仅用于安全、限流与故障排查，不用于用户画像。',
            'If you use the account-deletion form on this site, we receive the email address you enter, an optional nickname or username, an optional note, your confirmation, interface language, submission time and the referring page. Server logs may record IP address, browser identifier and request time for security, rate limiting and troubleshooting only — never for profiling.'
          ),
        },
      ],
    },
    {
      id: 'why',
      num: '03',
      title: B('我们为什么使用这些数据', 'Why we use it'),
      blocks: [
        {
          kind: 'p',
          text: B('上述数据只用于以下目的：', 'We use the data above only to:'),
        },
        {
          kind: 'ul',
          items: [
            B(
              '创建和验证账号，保持登录状态与账号安全；',
              'Create and verify your account and keep sign-in and account security working;'
            ),
            B(
              '在你的设备之间同步课程进度、海拔、徽章与复习队列；',
              'Sync lesson progress, altitude, badges and review queue across your devices;'
            ),
            B(
              '显示昵称与头像，计算成就和复习计划；',
              'Show your nickname and avatar and calculate achievements and review schedules;'
            ),
            B(
              '处理删除、导出、更正与支持请求；',
              'Handle deletion, export, correction and support requests;'
            ),
            B(
              '防止滥用、排查故障并履行法律义务。',
              'Prevent abuse, diagnose failures and meet legal obligations.'
            ),
          ],
        },
        {
          kind: 'p',
          text: B(
            '我们不会出售你的数据，也不会把它用于广告画像或与本应用无关的推荐。',
            'We do not sell your data or use it for advertising profiles or recommendations unrelated to this app.'
          ),
        },
      ],
    },
    {
      id: 'storage',
      num: '04',
      title: B('数据存放在哪里', 'Where the data lives'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '账号与学习数据存储在腾讯云 CloudBase 的上海地域。账号相关邮件通过 Resend 发送。传输使用 HTTPS；服务端访问受最小权限控制，数据库不直接暴露给客户端。',
            'Account and learning data are stored in Tencent Cloud CloudBase in the Shanghai region. Account-related email is sent through Resend. Traffic uses HTTPS; server access is least-privilege and the database is not exposed directly to clients.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '如果你从中国大陆以外的地区使用本应用，数据会被传输到上述区域处理。这通常是提供同步服务所必需的；使用账号与同步功能即表示你知悉这一传输。我们会采取合理措施保护传输与存储安全。',
            'If you use the app from outside mainland China, data is transferred to that region for processing. This is normally necessary to provide sync; using an account and sync means you understand this transfer. We take reasonable measures to protect it in transit and at rest.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '保留期限：账号数据在账号存续期间保留；删除账号后，生产库中的账号与学习数据立即删除，加密备份最多保留 30 天后自动删除；邮箱验证码 10 分钟内失效。',
            'Retention: account data is kept while the account exists. After deletion, account and learning data are removed from production immediately; encrypted backups are kept for at most 30 days and then deleted automatically. Email verification codes expire within 10 minutes.'
          ),
        },
      ],
    },
    {
      id: 'sharing',
      num: '05',
      title: B('我们如何共享数据', 'How we share data'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '我们不出售、不出租、不交换你的个人数据。只在以下情形共享必要范围：',
            'We do not sell, rent or trade your personal data. We share only what is necessary in these cases:'
          ),
        },
        {
          kind: 'ul',
          items: [
            B(
              '云托管、邮件发送等服务商，仅按我们的指示处理数据，并受合同与保密义务约束；',
              'Cloud hosting and email delivery providers, which process data only on our instructions under contractual and confidentiality obligations;'
            ),
            B(
              '法律、司法或监管机关依法提出要求时；',
              'When required by law, a court or a regulator;'
            ),
            B(
              '发生合并、收购或资产转让时，数据可能作为资产转移；我们会提前通知，并要求接收方继续受本政策约束；',
              'In a merger, acquisition or transfer of assets, data may transfer as an asset; we will give notice beforehand and require the recipient to remain bound by this policy;'
            ),
            B('经过你明确同意的其他情形。', 'Any other case with your explicit consent.'),
          ],
        },
        {
          kind: 'p',
          text: B(
            '应用不包含广告 SDK、第三方分析 SDK 或社交分享 SDK。',
            'The app contains no advertising SDK, third-party analytics SDK or social-sharing SDK.'
          ),
        },
      ],
    },
    {
      id: 'rights',
      num: '06',
      title: B('你的权利', 'Your rights'),
      blocks: [
        {
          kind: 'p',
          text: B('你可以随时：', 'At any time, you can:'),
        },
        {
          kind: 'ul',
          items: [
            B(
              '在 App 内查看或更正昵称、头像与界面语言；',
              'View or correct your nickname, avatar and interface language in the app;'
            ),
            B(
              '在 App 内删除账号：我的 → 设置 → 账号 → 删除账号；',
              'Delete your account in the app: Profile → Settings → Account → Delete account;'
            ),
            B(
              '无法打开 App 时，使用本站的删除账号页提交请求，或直接发邮件；',
              'If you cannot open the app, use the account-deletion page on this site or email us;'
            ),
            B(
              '请求导出你的账号与学习数据；',
              'Request an export of your account and learning data;'
            ),
            B(
              '撤回同意、停止使用账号与同步，或注销账号；',
              'Withdraw consent, stop using an account and sync, or close the account;'
            ),
            B(
              '向所在地数据保护监管机构投诉。',
              'Complain to your local data-protection regulator.'
            ),
          ],
        },
        {
          kind: 'p',
          text: B(
            '删除账号后，生产库中的账号与云端学习数据立即删除；加密备份最多保留 30 天，到期自动删除。删除不可恢复。本机数据可在 App 内重置，或通过卸载 App 清除。',
            'After deletion, the account and synced learning data are removed from production immediately; encrypted backups remain for at most 30 days and are then deleted automatically. Deletion is irreversible. Local data can be reset in the app or removed by uninstalling it.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '我们通常在 7 个工作日内回复请求。为保护账号安全，可能会先核验你的注册邮箱。',
            'We normally respond within 7 business days. To protect the account, we may first verify your registered email address.'
          ),
        },
      ],
    },
    {
      id: 'third-party',
      num: '07',
      title: B('第三方服务', 'Third-party services'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '使用 Google 登录时，Google 按其自身隐私政策处理认证信息。我们只接收完成登录所需的账号标识、邮箱与头像链接，不接收你的 Google 密码。',
            'When you sign in with Google, Google handles authentication under its own privacy policy. We receive only the account ID, email address and avatar URL needed to complete sign-in — never your Google password.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '账号数据存储在腾讯云 CloudBase；账号邮件由 Resend 发送。它们只在提供相应服务所必需的范围内处理数据。',
            'Account data is stored in Tencent Cloud CloudBase and account email is sent through Resend. Each processes data only as needed to provide that service.'
          ),
        },
        {
          kind: 'p',
          text: B(
            'App 内反馈与网页的删除账号表单通过 Formspree 送达我们的支持邮箱；它只负责转发，不会将内容用于其他目的。',
            'In-app feedback and the account-deletion form on this site are delivered to our support inbox through Formspree, which forwards the content and does not use it for any other purpose.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '本站的图片、字体与界面资源均为自托管，不通过第三方广告或分析脚本加载。站内的 GitHub 等外部链接受其各自隐私政策约束。',
            'Images, fonts and interface assets on this site are self-hosted and are not loaded through third-party advertising or analytics scripts. External links such as GitHub are governed by their own privacy policies.'
          ),
        },
      ],
    },
    {
      id: 'children',
      num: '08',
      title: B('儿童与未成年人', 'Children and minors'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '本服务不面向 13 岁以下儿童，我们不会有意收集他们的个人数据。如果你认为孩子向我们提供了数据，请联系我们，我们会尽快删除。',
            'The service is not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child has provided data to us, contact us and we will delete it promptly.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '中国大陆法律对未成年人个人信息另有规定的，从其规定。未成年人在注册或使用账号前，应取得监护人同意。',
            'Where mainland Chinese law sets additional rules for minors’ personal information, those rules apply. Minors should obtain a guardian’s consent before registering or using an account.'
          ),
        },
      ],
    },
    {
      id: 'changes',
      num: '09',
      title: B('政策变更', 'Changes to this policy'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '我们可能会更新本政策。变更会在本页发布并更新生效日期；涉及权利范围或处理目的的重大变更，会在 App 内或本页显著提示。',
            'We may update this policy. Changes are published on this page with a new effective date; material changes to rights or purposes will be flagged in the app or prominently here.'
          ),
        },
        {
          kind: 'p',
          text: B(
            '变更生效后继续使用账号或同步功能，即表示你接受更新后的政策。如果你不同意，可以停止使用并删除账号。',
            'Continuing to use an account or sync after a change takes effect means you accept the updated policy. If you do not agree, you can stop using the service and delete your account.'
          ),
        },
      ],
    },
    {
      id: 'contact',
      num: '10',
      title: B('联系我们', 'Contact us'),
      blocks: [
        {
          kind: 'p',
          text: B(
            '隐私问题、数据导出、更正或删除请求，请联系：',
            'For privacy questions, data export, correction or deletion requests, contact:'
          ),
        },
        {
          kind: 'mail',
          text: B('support@ascentroam.com', 'support@ascentroam.com'),
        },
        {
          kind: 'p',
          text: B(
            '我们通常在 7 个工作日内回复。如果对回复不满意，你可以向所在地数据保护监管机构投诉。',
            'We normally reply within 7 business days. If you are not satisfied with the response, you can complain to your local data-protection regulator.'
          ),
        },
      ],
    },
  ],
  docNote: B(
    '本页是隐私政策的网页版本，与 App 内展示的条款一致。若两者出现差异，以本页为准。',
    'This page is the web version of the privacy policy and matches the terms shown in the app. If they differ, this page controls.'
  ),
  footer: {
    delete: B('删除账号', 'Delete account'),
    source: B('开源项目', 'Source'),
    home: B('返回网站', 'Back to site'),
    backTop: B('回到顶部', 'Back to top'),
    privacy: B('隐私政策', 'Privacy'),
  },
};
