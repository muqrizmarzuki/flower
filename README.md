# digibouquet — Digital Flower Bouquet Gift

A clean, aesthetic digital flower bouquet inspired by [digibouquet.vercel.app](https://digibouquet.vercel.app/). Includes interactive paper-wrapped bouquet presentation, pinned handwritten note card, customizable flower palette, copy link / sharing actions, ambient audio, and floating petal showers.

---

## 🌟 Features

- **DigiBouquet Stage**:
  - Paper bush / wrapper backing container.
  - Interactive flowers: **Carnation, Anemone, Dahlia, Daisy, Lily, Zinnia, Rose, Tulip**.
  - Interactive hover scaling and micro-sway.

- **Pinned Note Card**:
  - Crisp white note card pinned below the bouquet with `Dear [Name]`, `[Message]`, `Sincerely, [Your Name]`.
  - Editable inline inputs.

- **Action Controls**:
  - `COPY LINK` & `SHARE` buttons with toast notifications.
  - `CUSTOMIZE BOUQUET` drawer to add flowers live.
  - Ambient sound toggle (`🎵`).
  - `Shower Petals` button.

---

## 📁 File Structure

```text
flower/
├── index.html          # Clean DigiBouquet HTML structure
├── style.css           # Martian Mono & beige retro aesthetic CSS
├── bouquet.js          # Paper wrapper & procedural flower canvas renderer
├── petals.js           # Falling petal shower physics
├── particles.js        # Light ambient background sparkles
├── animations.js       # Audio synth fallback & toast popups
├── script.js           # Event listeners & render loop
├── assets/             # Media resources
└── README.md           # Documentation
```

---

## 🚀 How to Run

Open `index.html` directly in any web browser or serve via `python3 -m http.server 8000`.
# flower
