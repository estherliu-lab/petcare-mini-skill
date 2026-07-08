# PetCare Mini Skill：猫狗日常照护小助手

[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

<p align="left">
  <a href="https://estherliu-lab.github.io/petcare-mini-skill/">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Festherliu-lab.github.io%2Fpetcare-mini-skill%2F" alt="扫码打开 PetCare Mini Skill" width="160" height="160">
  </a>
</p>

一个轻量、多语言、适合猫狗主人的日常照护小助手。

PetCare Mini Skill 是一个无需后端、无需数据库的静态网页项目。用户填写宠物的基础信息后，应用会生成今日照护清单、喂食提醒、清洁护理提醒、健康记录模板、疫苗与驱虫记录模板，以及一句轻松可爱的“宠物心情翻译”。

## 功能说明

- 支持猫和狗的基础档案输入
- 生成今日照护清单
- 生成喂食与清洁护理提醒
- 提供健康记录模板
- 提供疫苗与驱虫记录模板
- 生成轻松可爱的宠物心情句子
- 提供快速食物安全提醒
- 支持 English / 中文 / 日本語
- 语言选择会保存到 `localStorage`
- 支持一键复制生成结果
- 无后端、无数据库、无 API key、无构建步骤

## 使用方式

在线预览：[https://estherliu-lab.github.io/petcare-mini-skill/](https://estherliu-lab.github.io/petcare-mini-skill/)

本地预览：

1. 下载或克隆这个仓库。
2. 用浏览器打开 `index.html` 文件。

这是一个纯静态网站，不需要后端、API key 或构建步骤。

## 文件结构

```text
PetCare-Mini-Skill/
├── README.md
├── README.zh-CN.md
├── README.ja.md
├── SKILL.md
├── LICENSE
├── index.html
├── styles.css
├── app.js
├── data/
│   └── translations.js
└── examples/
    ├── example-en.md
    ├── example-zh-CN.md
    └── example-ja.md
```

## 免责声明

本工具仅用于一般日常照护提醒，不能替代专业兽医建议。如果宠物出现明显异常、误食危险食物或行为突然改变，请及时联系兽医或宠物中毒求助机构。

## 开源许可证说明

本项目使用 MIT License。详情见 [LICENSE](LICENSE)。
