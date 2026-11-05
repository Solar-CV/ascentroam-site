# AscentRoam — 登攀 · 官网

AscentRoam（登攀）是 Android 上的高海拔攀登与徒步训练应用。这个仓库是它的官网：一个双语、可切换昼夜主题的静态站点，核心视觉是 Canvas 2D 程序化绘制的 Quantized Line Field（量化线场）。

站点主体是纯静态产物，可直接部署到任意静态托管。若部署在 Cloudflare Pages，仓库里的 `functions/_middleware.js` 会额外按 IP 注入语言提示，`functions/api/account-deletion.js` 提供删除账号请求接口；其他托管可忽略 functions 目录，主站仍然完整可用。

## 开发

```bash
npm install        # 首次
npm run dev        # http://localhost:5173
npm run build      # 产物在 dist/
npm run preview    # 预览构建产物 http://localhost:4173
```

Node 18+。工程与同级参考项目 /Users/lolo/Desktop/WEB 使用同一套 Vite 4 + React 18 + Tailwind 3 版本；tailwind 只作为 reset/utility 基底，实际设计系统写在 src/index.css。

## 结构

```
index.html                 标题、描述、OG、JSON-LD、首屏主题/语言初始化、noscript
delete-account.html        独立的删除账号页入口
privacy.html               独立的隐私政策页入口
public/
  _redirects               /delete-account、/privacy -> 对应 .html（Cloudflare Pages）
  favicon.svg              App 山峰旗图标（108 viewBox）
  favicon-32.png           32 px PNG（由 SVG 渲染后缩小）
  apple-touch-icon.png     180 px PNG
  fonts/                   Barlow Condensed 700（英文标题，自托管，OFL）
  llms.txt                 给语言模型的站点事实（含安全边界）
  robots.txt
  img/*.jpg                9 张山景，首屏居中的一张为 1920 px 宽，其余 1600 px 长边
  img/wide-*.webp          3 张全幅轮播图，1800–2200 px
  app/zh/*.webp            5 张中文界面（1080×2400，v0.26.3 真机截图）
  app/en/*.webp            5 张英文界面
  badges/*.webp            8 枚 3D 徽章（自 App 的 40 枚中选取）
functions/
  _middleware.js           Cloudflare Pages Function：CN IP 注入语言提示
  api/account-deletion.js  删除账号请求接口（校验、蜜罐、转发 webhook）
src/
  main.jsx                 React 入口
  delete-main.jsx          删除账号页入口
  privacy-main.jsx         隐私政策页入口
  pages/DeleteAccount.jsx  删除账号页 UI 与表单状态机
  pages/Privacy.jsx        隐私政策页 UI 与目录
  App.jsx                  语言 Provider、章节顺序、滚动 reveal、跳转链接
  index.css                设计系统（令牌 / 版式 / 各章节 / 响应式 / 深色主题）
  lib/linefield.js         Canvas 线场引擎（采样、量化、噪声、指针弹簧、主题重绘）
  lib/i18n.js              B(zh, en) 与 pick(value, lang)
  data/content.js          全站文案、导航、统计、章节数据（唯一文案来源）
  data/curriculum.js       10 个学习单元（海拔、课数、主题、对应山峰）
  data/gallery.js          8 张图的标题、坐标、alt
  data/app.js              应用走查的 5 个步骤与实地轮播的 3 张图
  data/images.js           全部位图路径（Cloudinary 开关在这里）
  data/account.js          删除账号页文案、接口地址、联系邮箱与处理时限
  data/privacy.js          隐私政策全文（中英双语、10 节）
  context/LangContext.jsx
  hooks/useLanguage.js     语言优先级：saved > window.__AR_LANG__ > 浏览器
  hooks/useTheme.js        localStorage ar-theme，默认浅色
  components/              Nav Hero Marquee Method Tracks Practice Notes
                           AppShowcase Interlude Badges Gallery Languages
                           Safety Download Footer Field Icons
```

## 视觉：Quantized Line Field

线场不是装饰图，也不是 SVG/logo：它每帧从一张照片采样亮度，量化成四档线宽，逐列绘制竖线段。

- 采样：按容器尺寸计算列数（20–200），5×5 超采样取 Rec.709 亮度，cover 裁切；采样一次后销毁离屏画布。
- 量化：四档线宽 0.36 / 1.05 / 2.20 / 3.60 × cell/5.25，对应透明度 0.16 / 0.45 / 0.72 / 0.95，阈值 0.16 / 0.44 / 0.78。
- 动态：xorshift(7319) 种子值噪声向下漂移，叠加约 27 秒一轮的扫描带；首屏的指针脉冲弹簧：pointerenter / pointerdown / 移动超过 1.5 px 时 pulse=1，短边 12.5% 半径（最低 45 px，约为此前的一半）内的线段沿径向被推开（y 方向 0.58 倍），弹簧 k=120、c=14，pulse 按 exp(-3.2 dt) 衰减。最大位移约 4 个列宽，停手后回落到采样网格；指针处只保留 10–18 px 的四向刻度，不做大环。
- 模式：photo（照片）、badge（徽章 alpha 轮廓）、ridge / rings / matrix（课程卡片的程序化图形）。
- 性能：每个档位合并成一条 Path2D，每帧每组只 stroke 一次；离屏暂停；prefers-reduced-motion 下只画静态一帧；主题切换时用 CSS 变量重读墨色并重绘。
- 主题：颜色来自 --field-ink / --field-accent / --field-boost；深色下徽章与 rings 卡片用 boost 提亮。

首屏使用 /img/everest-center.jpg（珠峰居中的日出，1920×1158），下载区使用 broad-peak.jpg。所有照片先转灰度再采样，线场只取亮度。

首屏是全幅构图，不再是左右分栏：同一张珠峰日出照片以 28% 灰度的“幽灵层”铺满整屏（深色主题切为 screen 混合），96 列线场以 46% 叠加，上面再盖一层从上到下渐隐的纸色 wash，保证标题、CTA 与底部 meta 可读。`ASCENTROAM` 字标由 Canvas 采样成四档竖线，在 50% 高度循环横穿；它位于线场之下，像压印在山体上。纯线场在峰顶中间调几乎不产生线，远看会失去山形，所以保留幽灵层。

## 真实界面与实地轮播

两个章节刻意不依赖线场，给整页一次呼吸：

- **04 应用（AppShowcase）**：五屏滚动走查。外层容器高约 5.5 个视口，手机画面 sticky 在视口中；滚动进度决定当前屏（path / lesson / quiz / handbook / breath），右侧标题、正文与底部步骤条同步切换。步骤条可直接点击，按比例跳到对应位置；浮点边界用 `+ 1e-6` 与 `(i + 0.02) / n` 校正。
- **实地（Interlude）**：满屏三联摄影轮播，7 秒自动切换，9 秒 Ken Burns 缓慢推近，交叉淡入。右下角有显式的暂停 / 播放按钮（状态写入 aria-label）；prefers-reduced-motion 下默认不自动播放、不推近，点「播放」才会开始切换。
- 手机构图固定 1080×2400，桌面最大高度 640px；移动端改为手机在上、文案在下，隐藏次要 meta，五个步骤标签仍完整可点。
- 截图取自 v0.26.3 的 Android 15 模拟器（1080×2400），中文与英文各一套；界面里的数字与课程数据一致，不是效果图。

## 语言判定

初始语言按固定优先级取，前两项在首屏渲染前完成：

1. 用户手动选择：`localStorage` 的 `ar-lang`（只接受 `zh` / `en`）。
2. Cloudflare Pages：`functions/_middleware.js` 在 `cf-ipcountry === 'CN'` 且请求的是 HTML 时，用 `HTMLRewriter` 往 `<head>` 最前面插入 `window.__AR_LANG__ = 'zh'`。
3. 浏览器 `navigator.language`：中文环境用 `zh`，其余用 `en`。

推断值只决定第一次显示，不写回 `localStorage`；只有用户点语言按钮才会持久化。所以切过一次之后，IP 和浏览器都不会再把语言改回去。`index.html` 的内联脚本执行同样的顺序，避免 React 挂载前闪错语言。不部署 Cloudflare Function 时，自动退回浏览器判断。

`cf-ipcountry` 只判断国家/地区，不识别具体个人；中间件也只处理 HTML 请求，不碰图片、字体和静态资源。本地 `npm run dev` / `npm run preview` 不会执行 Pages Function；验证 IP 行为要放到 Cloudflare Pages 或用 `wrangler pages dev`，本地可以用 `window.__AR_LANG__` 注入模拟。

## 字体

- 中文标题继续用 Georgia / Times / Songti SC 栈；英文标题换成 Barlow Condensed 700。参考工程用 500/600，这里按“加粗”要求提高到 700。
- 字体文件在 `public/fonts/barlow-condensed-700.ttf`（约 102 KB），`@font-face` 用 `font-display: swap`。`html[lang='en']` 下的显示类使用它，正文、导航和中文页仍用系统栈；`.lang-native` 保留 Georgia。首屏的线场字标是拉丁品牌字，也用 Barlow，所以中文页会请求这个字体。
- 授权为 SIL Open Font License 1.1，版权与许可证链接写在 `public/fonts/BarlowCondensed-NOTICE.txt`。
- 选择自托管而不是 jsdelivr：参考工程用 `@fontsource` 的 CDN 版本，但生产站不应把首屏字体依赖在第三方 CDN 上，构建环境也不一定联网。

## 文案与事实

站点数字以 App 仓库代码为准（README 里的版本已经过期）：

- 版本 v0.26.3（app/build.gradle.kts versionCode 148）
- 91 课：攀登 6 单元 16/12/15/6/10/10 = 69；徒步 4 单元 5/9/5/3 = 22
- 1,563 道正式题（另有 158 道复习副本），8 种题型，间隔 0/1/3/7/16/35 天
- 35 篇技能书，11 类；40 枚 3D 徽章；38 条山峰与线路（30 攀登 + 8 徒步）
- 10 种语言，10,727 条键；离线完整可用，登录只用于跨设备找回进度
- Android 8.0+（API 26），arm64-v8a，约 30 MB，免费

改文案只动 src/data/content.js；改单元只动 src/data/curriculum.js；改应用走查只动 src/data/app.js。

## 图片与 Cloudinary

现在图片在 public/img、public/app 与 public/badges，构建时原样复制到 dist（dist 约 5 MB，其中位图占大部分）。参考工程 /Users/lolo/Desktop/WEB 是把 Cloudinary 的完整 URL 直接写进数据文件；这里把路径集中在 src/data/images.js，并按资源类型分别加转换参数，避免把 256 px 的徽章放大到 1600 px：

1. 把 public/ 里的图片按同名上传到 Cloudinary，保持 img/、app/zh/、app/en/、badges/ 的目录结构。
2. 打开 src/data/images.js，把 CDN 改成 delivery base（只到 /image/upload，不要带转换参数）：
   https://res.cloudinary.com/<cloud>/image/upload
3. 重新构建。IMG、WIDE_IMG、BADGE() 与 APP_SHOT() 会各自拼上合适的转换，组件不用改。

转换参数已写在 images.js 里：

- 站点照片 f_auto,q_auto,w_1600,c_limit
- 全幅轮播 f_auto,q_auto,w_2200,c_limit
- 界面截图 f_auto,q_auto,w_720,c_limit
- 徽章 f_auto,q_auto,w_512,c_limit

上传后可以删掉 public/ 里的大图再构建，避免重复打包；本地开发也可继续保留，CDN 为空时站点完全离线可用。Cloudinary 控制台如果开了严格转换，请确认这些命名转换被允许。切到 CDN 后，记得把 `index.html` 里的图片 preload 与 `og:image` 也改成对应的 Cloudinary 地址（社交平台的 `og:image` 必须是绝对 URL），否则浏览器仍会去请求本地文件。

素材来源：/Users/lolo/Desktop/素材下载/1.七峰素材库（珠峰、K2、马纳斯鲁、南迦帕尔巴特、布洛阿特、阿空加瓜等）。照片版权归原作者，发布前请确认授权范围。应用截图来自本项目自己的安装包，可随站点发布。

## 部署

dist 是纯静态目录，部署到 Netlify / Vercel / 任意对象存储均可。主站没有前端路由；删除账号页与隐私页各需要一个重写（`/delete-account` → `/delete-account.html`、`/privacy` → `/privacy.html`），Cloudflare Pages 由 `public/_redirects` 提供，其他托管需在平台侧配置同样的重写。若托管在子路径，需要在 vite.config.js 设 base。

Cloudflare Pages 额外支持 IP 语言提示与删除请求接口：把整个仓库接到 Pages，构建命令 `npm run build`、输出目录 `dist`，根目录的 `functions/` 会被自动识别并部署。只上传 dist 的纯静态部署不会带 Function，语言仍按浏览器判断，删除表单会走客户端兜底（提示直接发邮件）；其余功能不受影响。

上线前把 index.html 的 og:image 换成绝对地址（当前是 /img/everest-center.jpg，社交平台需要完整 URL），并按实际域名补 og:url。

## 删除账号（Google Play 合规）

删除账号是一个独立入口，不依赖主站的前端路由：

- 线上地址为 `/delete-account`，由 `public/_redirects` 以 200 重写到 `/delete-account.html`。本地 `npm run preview` 不读取 `_redirects`，直接打开 `/delete-account.html` 验收。
- UI 在 `src/pages/DeleteAccount.jsx`，文案与配置在 `src/data/account.js`。页面同时给出 App 内删除（立即生效）与在线请求（7 个工作日）两条路径，并列出删除范围、保留数据、只清本机、未注册账号与联系邮箱。
- 表单字段：注册邮箱、昵称或用户名（可选）、备注（可选）、确认勾选；另有隐藏蜜罐字段。客户端校验邮箱与勾选，请求 15 秒超时，成功后显示 requestId，失败时给出直接发邮件的兜底。
- 客户端构建变量：`VITE_ACCOUNT_DELETION_ENDPOINT`（默认 `/api/account-deletion`）、`VITE_ACCOUNT_DELETION_EMAIL`（默认 `support@ascentroam.com`）。见 `.env.example`。
- 服务端接口：`POST /api/account-deletion`，JSON。只接受 `application/json`，body 不超过 12 KB；`email` 必须合法且 `confirm === true`。未配置 webhook 返回 503，上游失败或超时返回 502，成功返回 202 `{ ok: true, requestId, receivedAt }`。隐藏字段 `website` 非空时静默返回 202，不转发。
- Cloudflare 环境变量：`ACCOUNT_DELETION_WEBHOOK`（必填，接收转发请求）、`ACCOUNT_DELETION_TOKEN`（可选，作为 Bearer）。服务端转发 `type/requestId/receivedAt/app/package/source/locale/email/identifier/note`，不记录 PII。见 `.dev.vars.example`。
- Cloudflare Pages 会自动识别 `functions/api/account-deletion.js`。纯 `npm run preview` 不执行 Function，表单会按 404/503 走邮件兜底；要本地联调接口，用 `wrangler pages dev dist` 或部署预览环境。公开表单本身不带账号体系，生产环境建议在 Cloudflare 侧再叠一层 Rate limiting 或 Turnstile；当前接口只做字段校验与蜜罐。

## 隐私政策页

- 线上地址 `/privacy`，由 `public/_redirects` 以 200 重写到 `/privacy.html`。本地同样直接用 `/privacy.html` 验收（python http.server 不读 `_redirects`）。
- 页面在 `src/pages/Privacy.jsx`，全文在 `src/data/privacy.js`，与 App 内隐私政策同源：默认离线、账号与学习数据、腾讯云 CloudBase（上海）、Resend 发信、保留与删除、用户权利、第三方、儿童、变更与联系。
- 桌面为左侧 sticky 目录 + 右侧正文；900 px 以下目录收起，只留正文。顶部摘要卡用一句话概括“默认离线、无广告、不出售数据”。
- 主站 `SITE.privacy` 已改为站内相对地址 `privacy.html`，安全说明侧栏与两处页脚都指向本页；删除账号页也从本页进入。
- 修改政策时同时改 `src/data/privacy.js` 的 `updated` 与对应条款；App 内 `docs/privacy.html` 需要单独同步，二者以本页为准。

## 可访问性与降级

- 语义化 landmark、跳转链接、键盘可操作的菜单（Esc 关闭）与题型/徽章/画廊切换。
- 应用走查的五个步骤是带 aria-current 的按钮，可用键盘直接跳转；轮播有暂停/播放按钮与可读的图片说明。
- 双语切换会同步 html lang；主题在首屏 HTML 内联脚本里恢复，避免闪白。
- 线场 canvas 全部 aria-hidden，信息由文字承载；禁用动画时只画静态帧，轮播不自动播放。
- 无 JS 时显示 noscript 摘要与下载入口。
