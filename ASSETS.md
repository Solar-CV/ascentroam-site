# 图片清单 / Cloudinary 上传表

站点共 30 个位图文件：12 张山景、10 张应用界面、8 枚徽章。全部集中在 `src/data/images.js`，该文件是唯一的路径来源。

## 一、山景照片（12）

9 张常规照片已用 sips 压到长边 1600 px、JPEG 质量 55–72，用于首屏、画廊与下载区；3 张 `wide-*` 为全幅轮播专用，保持更宽的长边。

| 本地文件 | 大小 | 尺寸 | 原始素材（相对 1.七峰素材库） | 建议 Cloudinary Public ID | 用途 |
| --- | --- | --- | --- | --- | --- |
| public/img/everest.jpg | 446K | 1600×1200 | 1.珠穆朗玛/EVEREST11.jpeg | img/everest | 画廊 |
| public/img/everest-center.jpg | 251K | 1920×1158 | 1.珠穆朗玛/best-nature-background-0fpb3435kbns1clr.jpg | img/everest-center | 首屏幽灵层 + 线场采样 |
| public/img/k2.jpg | 286K | 1600×1200 | 2.乔戈里峰/K2 from Broad Peak.jpg | img/k2 | 画廊 |
| public/img/manaslu-camp.jpg | 492K | 1600×1200 | 8.马纳斯鲁/DJI_0238.JPG | img/manaslu-camp | 画廊 |
| public/img/nanga-camp.jpg | 403K | 1600×1200 | 9.南迦帕尔巴特峰/20220624_072637.jpg | img/nanga-camp | 画廊 |
| public/img/broad-peak.jpg | 253K | 1600×1200 | 12.布洛阿特峰/Broad peak from K2 BC.jpg | img/broad-peak | 下载区线场 |
| public/img/aconcagua.jpg | 223K | 1600×1200 | 阿空加瓜峰/aconcagua-peak-argentina.jpg | img/aconcagua | 画廊 |
| public/img/rope-team.jpg | 287K | 1600×1200 | 1.珠穆朗玛/DSC04095.jpg | img/rope-team | 画廊 |
| public/img/ice-climber.jpg | 168K | 1600×1200 | 8.马纳斯鲁/DSC07412.jpg | img/ice-climber | 画廊 |
| public/img/wide-k2.webp | 393K | 2200×1650 | 2.乔戈里峰/K2 from Broad Peak.jpg | img/wide-k2 | 实地轮播 / 01 |
| public/img/wide-ice.webp | 185K | 2200×1466 | 8.马纳斯鲁/DSC07412.jpg | img/wide-ice | 实地轮播 / 02 |
| public/img/wide-camp.webp | 386K | 1800×1350 | 8.马纳斯鲁/DJI_0238.JPG | img/wide-camp | 实地轮播 / 03 |

## 二、应用界面（10）

真实安装包截图，v0.26.3，Android 15 模拟器，1080×2400；中文、英文各一套。它们不是效果图，界面里的数字与站点课程数据一致。

| 本地文件 | 大小 | 建议 Cloudinary Public ID | 画面 |
| --- | --- | --- | --- |
| public/app/zh/path.webp | 52K | app/zh/path | 路径页：3,200 m、第 1 单元 |
| public/app/zh/lesson.webp | 90K | app/zh/lesson | 课程要点：高山环境与风险认知 |
| public/app/zh/quiz.webp | 59K | app/zh/quiz | 单选题，答对后的解释态 |
| public/app/zh/handbook.webp | 132K | app/zh/handbook | 技能书列表与分类 |
| public/app/zh/breath.webp | 37K | app/zh/breath | 4-4 呼吸进行中（吸气） |
| public/app/en/path.webp | 55K | app/en/path | Path / 3,200 m / Unit 1 |
| public/app/en/lesson.webp | 112K | app/en/lesson | Lesson / Alpine Environment and Risk |
| public/app/en/quiz.webp | 78K | app/en/quiz | Practice / 答对解释态 |
| public/app/en/handbook.webp | 128K | app/en/handbook | Handbook / 分类与文章列表 |
| public/app/en/breath.webp | 42K | app/en/breath | 4-4 breathing / Breathe out |

## 三、徽章（8）

public/badges 下 8 枚 webp，原图 256×256，自 App 的 40 枚 3D 徽章中选取。文件名即 Public ID，建议放 badges/ 目录。

avalanche_eye · basecamp_grad · eight_k_grad · first_steps · fourteen_peaks · full_route · six_k_grad · two_tracks

## 上传时保持目录结构

src/data/images.js 现在按资源类型分别拼接转换，CDN 只填 delivery base：

  const CDN = 'https://res.cloudinary.com/<cloud>/image/upload';

  IMG.everestCenter    → /f_auto,q_auto,w_1600,c_limit/img/everest-center.jpg
  IMG.everest          → /f_auto,q_auto,w_1600,c_limit/img/everest.jpg
  WIDE_IMG.k2          → /f_auto,q_auto,w_2200,c_limit/img/wide-k2.webp
  APP_SHOT('zh','path')→ /f_auto,q_auto,w_720,c_limit/app/zh/path.webp
  BADGE('first_steps') → /f_auto,q_auto,w_512,c_limit/badges/first_steps.webp

所以 Cloudinary 里保留这四个目录：img/、app/zh/、app/en/、badges/。站点只需改一个 CDN 常量，不必改组件。

## 建议的上传转换

- 常规山景：f_auto,q_auto,w_1600,c_limit
- 全幅轮播：f_auto,q_auto,w_2200,c_limit
- 界面截图：f_auto,q_auto,w_720,c_limit
- 徽章：f_auto,q_auto,w_512,c_limit

参数已经写进 images.js，上传到 Cloudinary 时不需要在控制台另建命名转换；如果账号限制了严格转换，请放行这四个组合。

## 图片来源与授权

山景照片来自 /Users/lolo/Desktop/素材下载/1.七峰素材库，版权归原作者，公开发布前请确认授权范围。应用截图由本项目在自有安装包上截取，可随站点发布。

## 四、图标与字体（不走 Cloudinary）

这些文件随站点构建直接放在 public/，没有上传到 Cloudinary 的必要：

| 本地文件 | 规格 | 说明 |
| --- | --- | --- |
| public/favicon.svg | 108 viewBox | App 同款山峰旗图标，页面导航与浏览器标签共用 |
| public/favicon-32.png | 32×32 | 由 SVG 以 512 px 渲染后 sips 缩小，兼容不支持 SVG favicon 的浏览器 |
| public/apple-touch-icon.png | 180×180 | iOS 添加到主屏 |
| public/fonts/barlow-condensed-700.ttf | 约 102 KB | 英文显示标题；SIL OFL 1.1，见同目录 NOTICE |

图标源图形与应用启动器一致：白底圆角方块、蓝色渐变山体、白色雪帽、金色旗杆与旗。若只想要 favicon 的简化轮廓，可单独替换 `public/favicon.svg` 与两个 PNG，不影响导航里的 `BrandMark`（在 `src/components/Icons.jsx`）。
