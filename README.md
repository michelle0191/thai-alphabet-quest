# 🇹🇭 Thai Alphabet Quest

An interactive learning app built from your **49-day Thai curriculum**
(`/Users/michelletinloi/.openclaw/workspace/thai-curriculum/curriculum.json`).

Goal: **recognise every letter of the Thai alphabet and pronounce it well.**

## How to run

Just open `index.html` in any modern browser (Chrome or Edge recommended
for the best speech features). No build step, no server, no dependencies.

```bash
open index.html      # macOS
```

## What's inside

| Game | What it does |
|------|-------------|
| 📖 **Reference** | Browse all **44 consonants** + **18 vowels**. Tap any card to hear it. |
| 🎴 **Flashcards** | Flip cards to learn each letter, its sound, name and example words. |
| 🔗 **Matching** | Pair letters with their sound, name, or word-meaning. |
| 🧠 **Memory** | Classic memory pairs — letter ↔ name. |
| 📚 **Class Sort** | Drag letters into Mid / High / Low tone class buckets. |
| ❓ **Quiz** | Multiple choice: identify the sound, class or name. |
| 🎙 **Pronounce** | Listen, then record yourself and get a similarity score. |
| 🎵 **Tones** | The complete tone-rule table (class × tone mark). |

## Data verified

- **44 consonants** → 9 mid + 11 high + 24 low ✅
- **18 vowels** with positions, sounds and example words ✅
- **89 example words** drawn from the curriculum ✅

## Features

- 🎮 **Gamified**: earn XP, build streaks, mark letters as "known"
- 🔊 **Text-to-speech** with Thai voice where available
- 🎤 **Speech recognition** pronunciation grading (Chrome/Edge)
- 💾 **Progress saved** locally in your browser
- 📱 **Responsive** — works on phone, tablet and desktop

## File structure

```
thai-alphabet-app/
├── index.html      # app shell + all screens
├── styles.css      # full styling
├── app.js          # all game logic
└── data.js         # curriculum data (44 + 18 letters)
```

---

Built from your own lesson content — every letter, sound and example
word comes straight from the 49-day curriculum you've been building. 🎉