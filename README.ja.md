# PetCare Mini Skill：猫と犬の毎日ケア小さなアシスタント

[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

猫と犬の飼い主向けの、軽量で多言語対応の毎日ケアアシスタントです。

PetCare Mini Skill は、バックエンドやデータベースを必要としない静的ウェブサイトです。ペットの基本情報を入力すると、今日のケアチェックリスト、食事リマインダー、グルーミングリマインダー、健康記録テンプレート、ワクチン・駆虫記録テンプレート、そして少し楽しい「ペット気分翻訳」を生成します。

## 機能

- 猫と犬のプロフィール入力
- 今日のケアチェックリスト生成
- 食事とグルーミングのリマインダー
- 健康記録テンプレート
- ワクチン・駆虫記録テンプレート
- かわいすぎない、軽いペット気分フレーズ
- クイック食の安全メモ
- English / 中文 / 日本語 に対応
- 選択した言語を `localStorage` に保存
- 生成結果をプレーンテキストでコピー
- バックエンド、データベース、API キー、ビルド手順は不要

## 使い方

オンラインデモ：[https://ezekielgarden-arch.github.io/petcare-mini-skill/](https://ezekielgarden-arch.github.io/petcare-mini-skill/)

ローカルデモ：

1. このリポジトリをダウンロード、または clone します。
2. ブラウザで `index.html` を開きます。

これは静的ウェブサイトです。バックエンド、API キー、ビルド手順は必要ありません。

## ファイル構成

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

## 免責事項

このツールは一般的な日常ケアのリマインダーです。専門的な獣医師の助言に代わるものではありません。気になる症状、危険な食べ物の誤食、急な行動の変化がある場合は、獣医師またはペット中毒相談窓口に連絡してください。

## ライセンス

MIT License を使用しています。詳しくは [LICENSE](LICENSE) をご覧ください。
