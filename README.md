# PetCare Mini Skill

[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

<p align="left">
  <a href="https://estherliu-lab.github.io/petcare-mini-skill/">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Festherliu-lab.github.io%2Fpetcare-mini-skill%2F" alt="QR code to open PetCare Mini Skill" width="160" height="160">
  </a>
</p>

A tiny multilingual daily care assistant for cats and dogs.

PetCare Mini Skill is a lightweight static website that helps pet owners create a simple daily care checklist from basic pet information. It is warm, practical, slightly cute, and intentionally conservative: it does not diagnose medical conditions or replace veterinary advice.

## Features

- Pet profile input for cats and dogs
- Daily care checklist generation
- Feeding and grooming reminders
- Health record template
- Vaccine and deworming record template
- Cute pet mood translator
- Quick food safety note
- English, Simplified Chinese, and Japanese UI
- Language preference saved in `localStorage`
- Copy generated result as plain text
- No backend, database, API key, or build step

## Demo

Online demo: [https://estherliu-lab.github.io/petcare-mini-skill/](https://estherliu-lab.github.io/petcare-mini-skill/)

Local demo:

1. Download or clone this repository.
2. Open `index.html` in your browser.

This is a static website. No backend, API key, or build step is required.

## File Structure

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

## Safety Disclaimer

This tool is for general daily care reminders only and does not replace professional veterinary advice. If a pet shows concerning symptoms, eats something risky, or suddenly changes behavior, contact a veterinarian or pet poison control immediately.

## License

MIT License. See [LICENSE](LICENSE).
