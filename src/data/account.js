import { B } from '../lib/i18n.js';

/*
 * Account deletion configuration.
 *
 * Cloudflare Pages: functions/api/account-deletion.js accepts the POST and
 * forwards it to env.ACCOUNT_DELETION_WEBHOOK. Set that variable in the Pages
 * project; never put a backend secret in a VITE_* variable.
 *
 * Any other host: point VITE_ACCOUNT_DELETION_ENDPOINT at a POST endpoint that
 * accepts the JSON payload documented in README.md. VITE_ACCOUNT_DELETION_EMAIL
 * is the fallback address shown if the endpoint is unavailable.
 */
const env = (import.meta && import.meta.env) || {};

export const ACCOUNT_DELETION = {
  endpoint: env.VITE_ACCOUNT_DELETION_ENDPOINT || '/api/account-deletion',
  contactEmail: env.VITE_ACCOUNT_DELETION_EMAIL || 'support@ascentroam.com',
  responseDays: 7,
  backupDays: 30,
  requestTimeoutMs: 15000,
  appPackage: 'com.ascentroam.app',
};

export const ACCOUNT = {
  kicker: B('账号 · 删除', 'Account · deletion'),
  title: B('删除账号。', 'Delete your account.'),
  lede: B(
    'AscentRoam 的课程与进度默认保存在你的手机上。只有你主动注册并开启同步，服务器才会保存与账号相关的数据。这里可以删除账号，也可以只清空本机记录。',
    'Your lessons and progress live on your phone by default. The server only holds account data if you chose to register and sync. You can delete the account here, or just clear the data on this device.'
  ),
  updated: B('最近更新：2026 年 11 月 4 日', 'Last updated: 4 November 2026'),
  meta: [
    {
      k: B('应用', 'App'),
      v: 'AscentRoam for Android',
      note: 'com.ascentroam.app',
    },
    {
      k: B('处理时限', 'Response'),
      v: B('7 个工作日', '7 business days'),
    },
  ],

  form: {
    label: B('在线请求', 'Online request'),
    title: B('无法打开 App？', 'Can’t open the app?'),
    lede: B(
      '用注册邮箱提交删除请求。我们会核对账号，并在 7 个工作日内处理。',
      'Submit a deletion request with your registered email. We verify the account and process it within 7 business days.'
    ),
    email: B('注册邮箱', 'Registered email'),
    emailHint: B('请使用注册时填写的邮箱。', 'Use the address you registered with.'),
    identifier: B('昵称或用户名（可选）', 'Nickname or username (optional)'),
    identifierHint: B('有助于我们更快找到账号。', 'Helps us find the account faster.'),
    note: B('备注（可选）', 'Note (optional)'),
    notePlaceholder: B('例如：无法登录、换过邮箱。', 'For example: I cannot sign in, or I changed email.'),
    confirm: B('我确认要删除账号及其云端同步数据。', 'I understand this deletes my account and its synced data.'),
    submit: B('提交删除请求', 'Request deletion'),
    sending: B('正在提交…', 'Sending…'),
    privacy: B(
      '我们只用这些信息核对账号并处理删除，不会用于营销。',
      'We use this only to verify the account and process the request, never for marketing.'
    ),
    successTitle: B('请求已收到。', 'Request received.'),
    successBody: B(
      '我们会在 7 个工作日内处理，并向你填写的注册邮箱发送确认。',
      'We will process it within 7 business days and confirm by email to the address you provided.'
    ),
    successRef: B('请求编号', 'Request reference'),
    successReset: B('再提交一个请求', 'Submit another request'),
    emailError: B('请填写有效的邮箱地址。', 'Enter a valid email address.'),
    confirmError: B('请先勾选确认框。', 'Please tick the confirmation box.'),
    unavailable: B(
      '在线提交暂时不可用。请在 App 内删除，或直接发邮件到 support@ascentroam.com。',
      'Online submission is unavailable right now. Delete in the app, or email support@ascentroam.com.'
    ),
    failed: B(
      '提交没有完成。请稍后再试，或直接发邮件到 support@ascentroam.com。',
      'The request did not go through. Try again, or email support@ascentroam.com.'
    ),
    mailFallback: B('也可以直接发邮件请求删除。', 'You can also request deletion by email.'),
  },

  inApp: {
    label: B('方式一 · 应用内', 'Option 1 · in the app'),
    title: B('在 App 内删除，立即生效。', 'Delete in the app. It takes effect immediately.'),
    lede: B(
      '如果还能打开 AscentRoam，这是最快的路径。删除后账号立刻失效，App 回到未登录状态。',
      'If you can still open AscentRoam, this is the fastest route. The account stops working immediately and the app returns to the signed-out state.'
    ),
    steps: [
      B('打开 AscentRoam，进入底部导航的「我的」。', 'Open AscentRoam and go to Profile in the bottom bar.'),
      B('点右上角的齿轮图标，进入设置。', 'Tap the gear icon in the top right to open Settings.'),
      B('滑到最底部，在「账号」分区点「删除账号」。', 'Scroll to the bottom and tap Delete account in the Account section.'),
      B('确认框会列出将被删除的内容，点「删除」。', 'The confirmation dialog lists what will be removed — tap Delete.'),
    ],
    note: B(
      '「账号」分区只在登录后出现；没有账号，就没有可删的云端数据。',
      'The Account section only appears while you are signed in — without an account there is nothing in the cloud to delete.'
    ),
  },

  data: {
    label: B('删除范围', 'What changes'),
    title: B('删除什么，保留什么。', 'What gets deleted, what is kept.'),
    lede: B(
      '删除账号会同时删除云端同步数据，并把这台设备恢复为未登录状态。下面的清单与隐私政策一致。',
      'Deleting the account also deletes synced cloud data and returns this device to the signed-out state. This list matches the privacy policy.'
    ),
    deletedTitle: B('会删除', 'Deleted'),
    keptTitle: B('会保留', 'Kept'),
    deleted: [
      B(
        '账号本身：邮箱、昵称、密码哈希（不可逆）、Google 绑定关系。',
        'The account itself: email, nickname, password hash (irreversible) and any Google link.'
      ),
      B(
        '云端数据：学习进度、海拔、连续天数、成就徽章、复习队列、头像。',
        'Cloud data: progress, altitude, streak, badges, review queue and avatar.'
      ),
      B(
        '这台设备上的数据：本机进度、徽章、头像文件、本地用户名。',
        'Data on this device: local progress, badges, the avatar file and the local display name.'
      ),
    ],
    kept: [
      B(
        '与账号无关的本机偏好：主题、界面语言、当前课程轨道、首启引导状态。',
        'Device preferences unrelated to the account: theme, interface language, current track and onboarding state.'
      ),
      B(
        '加密灾备备份最多保留 30 天，到期自动删除；只用于灾难恢复。',
        'Encrypted disaster-recovery backups are kept for at most 30 days and then deleted automatically; they are used only for recovery.'
      ),
      B(
        '法律法规要求留存的记录（如有）按法定期限保留。',
        'Records we are legally required to retain (if any) are kept for the statutory period.'
      ),
    ],
    backupNote: B(
      '账号与生产库数据在删除后立即移除；加密备份最长 30 天。',
      'The account and production data are removed immediately; encrypted backups last no more than 30 days.'
    ),
  },

  local: {
    label: B('只清本机', 'Local only'),
    title: B('只想清空这台手机？', 'Only want to clear this phone?'),
    body: B(
      '不用删除账号。退出登录即可停止同步；在「设置 → 数据 → 重置学习进度」清空本机记录，或直接卸载 App。卸载只清除本机数据，不影响云端账号与进度。',
      'You do not have to delete the account. Signing out stops syncing; clear the records on this device under Settings → Data → Reset learning progress, or uninstall the app. Uninstalling only clears local data; the account and cloud progress stay.'
    ),
  },

  noAccount: {
    label: B('没有账号', 'No account'),
    title: B('从未注册过账号？', 'Never created an account?'),
    body: B(
      '服务器上没有可删除的账号数据。卸载 App 即清除这台设备上的记录。',
      'There is no account data on the server to delete. Uninstalling the app clears the records on this device.'
    ),
  },

  contact: {
    label: B('联系', 'Contact'),
    title: B('还有问题？', 'Still have a question?'),
    body: B(
      '用注册邮箱写信给我们，我们会在 7 个工作日内回复。',
      'Write to us from your registered address and we will reply within 7 business days.'
    ),
  },

  footer: {
    privacy: B('隐私政策', 'Privacy'),
    source: B('开源项目', 'Source'),
    home: B('返回网站', 'Back to site'),
    backTop: B('回到顶部', 'Back to top'),
  },
};
