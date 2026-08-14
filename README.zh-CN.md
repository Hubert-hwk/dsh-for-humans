# 🎓 DeepSeek Harness 通俗教程 · 费曼学习法版

> 用**费曼学习法**把 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh`）讲明白 ——
> DeepSeek AI 开源的「**万物皆插件**」AI Agent 框架。

**中文原创教程** · 生活化类比 + 幽默讲述 · 12 张原创图解 · 每章费曼自查 · 与 Claude Code / Codex 对比 · **零基础可读**

<div align="center">
  <img src="docs/screenshot-home.png" alt="DeepSeek Harness 通俗教程首页截图" width="720">
</div>

> **🌐 English readers → [README.md](README.md)**

| | |
|---|---|
| 🌐 在线阅读 | https://Hubert-hwk.github.io/dsh-for-humans/ |
| 📦 离线下载 | [GitHub Releases](https://github.com/Hubert-hwk/dsh-for-humans/releases/latest)（zip，解压双击 `index.html` 即读） |
| 📄 License | [MIT](LICENSE) © Hubert-hwk |

---

## 这份教程是什么

DeepSeek Harness（`dsh`）是一个开源的 AI Agent 框架：它把大模型接上真实世界（文件、终端、网页、子代理），
并负责「想清楚之后怎么动手、动手之后怎么记录」。它宣称**万物皆插件** —— 模型适配器、工具、会话日志、
循环本身都是可替换的积木。

「万物皆插件」这五个字每个都认识，连起来就劝退？没关系 —— 这份教程用**费曼学习法**
（选概念 → 大白话讲 → 自己复述 → 查漏补缺）把它讲明白：生活类比、原创图解、讲完还考你，
保证小白也能**笑着看懂**。没听过 dsh？我们用你熟悉的 **Claude Code / Codex** 当尺子，从头量到尾。

内容基于 dsh 仓库最新源码与官方文档撰写，核对到 **0.1.0-rc.5**。

## 内容一览（12 章 · 四幕）

| 幕 | 章节 | 内容 |
|---|---|---|
| 第一幕 · 它是什么 | 01–03 | 一分钟看懂 dsh · 万物皆插件 · **和 Claude Code / Codex 比一比** |
| 第二幕 · 核心机制 | 04–06 | Cordis 五件事 · 一次对话的旅程（轮次） · 会话日志：唯一真源 |
| 第三幕 · 可插拔能力 | 07–10 | 能力缝 · 工具与执行流水线 · 作用域 · 委派与扩展 |
| 第四幕 · 动手与资源 | 11–12 | 动手：跑起来 + 写插件 · 术语表与下一步 |

顺读 01 → 11 约 40 分钟（中间允许笑出声）。每一章结尾的「费曼自查」请先自己讲一遍再看答案 ——
那才是费曼学习法的关键一步。

## 特性

- ✅ **零基础可读**：不用先懂框架，Claude Code / Codex 当对比尺子
- 🧱 **万物皆插件**：从设计思想到源码地图，讲透可替换的骨架
- 🎨 **12 张原创 SVG 图解**：全部本地资源，无外部 CDN
- ❓ **每章费曼自查**：折叠式问答，先自答再看参考
- 🚀 **100% 纯静态**：无构建步骤，任意静态托管都能跑
- 📴 **可离线阅读**：下载 zip 双击即看，无需联网

## 怎么用（三种方式）

### 方式一：在线阅读（推荐）

打开 https://Hubert-hwk.github.io/dsh-for-humans/ 即可，手机 / 平板 / 电脑浏览器都兼容。

### 方式二：下载离线包

到 [Releases 页](https://github.com/Hubert-hwk/dsh-for-humans/releases/latest) 下载 zip，
解压后双击 `index.html` 即可阅读 —— 零外部依赖，断网也能看。

### 方式三：本地预览 / 自己改

```sh
# 克隆本仓库
git clone https://github.com/Hubert-hwk/dsh-for-humans.git
cd dsh-for-humans

# 本地预览（任选其一）
python3 -m http.server 8080     # 浏览器打开 http://127.0.0.1:8080
# 或直接双击 index.html（file:// 协议同样支持）
```

## 部署到 GitHub Pages

本项目已内置 GitHub Actions 工作流（`.github/workflows/pages.yml`）：**推送到 `main` 分支即自动部署**，无需手动构建。

首次启用只需一步：

1. 推送代码后，打开仓库 **Settings → Pages**；
2. **Source** 选择 `GitHub Actions`（不要选 "Deploy from a branch"），保存即可；
3. 等 1~2 分钟，访问 `https://Hubert-hwk.github.io/dsh-for-humans/`。

> 手动方式（不用 Actions 时）：Settings → Pages → Source 选 `Deploy from a branch` → 分支 `main` → 目录 `/ (root)` → Save。

## 发布离线包（GitHub Releases）

打一个形如 `v1.0.0` 的 tag 推送，`.github/workflows/release.yml` 会自动打包 zip 并创建 Release：

```sh
git tag v1.0.0
git push origin v1.0.0
# 稍等片刻，Releases 页即出现带 zip 附件的发布
```

也可以本地手动打包（不依赖 CI）：

```sh
bash scripts/build-release.sh v1.0.0
# 产物：dist/deepseek-harness-tutorial-v1.0.0.zip
```

## 目录结构

```
├── index.html                  # 首页（教程导航 + 费曼学习法说明）
├── chapters/                   # 12 个章节页面
├── assets/
│   ├── css/style.css           # 全部样式（无外部字体 / CDN）
│   ├── js/main.js              # 交互：导航、复制、自查折叠、进度、语法高亮
│   └── img/                    # 12 张原创 SVG 图解 + favicon
├── docs/screenshot-home.png    # README 展示用截图
├── scripts/build-release.sh    # 一键打包离线 zip
├── .github/workflows/          # Pages 自动部署 + Release 自动打包
├── README.md                   # 英文版说明
├── README.zh-CN.md             # 本文件（中文版）
└── LICENSE
```

## 自定义与贡献

- 发现讲得不明白、有错误、或想补充内容？欢迎提 [Issue](https://github.com/Hubert-hwk/dsh-for-humans/issues) 和 [PR](https://github.com/Hubert-hwk/dsh-for-humans/pulls)；
- 改内容：直接编辑 `chapters/*.html`（正文是语义化标签，浏览器开 DevTools 定位即可）；
- 改样式：`assets/css/style.css` 顶部的 `:root` 主题变量（`--brand` 主色、`--accent` 强调色）；
- 改图：`assets/img/*.svg` 是矢量图，任意文本编辑器或 Figma / Inkscape 可打开；
- 「费曼自查」在 `<div class="quiz-item">` 里，`<div class="a">` 即参考答案，默认折叠点击展开；
- 改完本地预览确认后提交，推送 `main` 即自动上线。

## 致谢与参考

- [DeepSeek Harness 源码仓库](https://github.com/deepseek-ai/deepseek-harness)（MIT License）
- dsh 仓库内 `docs/` 下的官方文档（中英双语）与 `examples/` 示例
- Cordis：dsh 底层的插件框架

## License

[MIT License](LICENSE) © Hubert-hwk
