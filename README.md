# 💻 ThinkPad X1 3D Developer Workstation

An immersive, standalone 3D developer desk environment inspired by [Henry Heffernan's website](https://henryheffernan.com/), custom-engineered to showcase the technical achievements, automation pipelines, and engineering background of **Abdul Samad Khan (`wyacoomz`)**.

---

## 🕹️ Interactive Features

1. **Detailed ThinkPad X1 Carbon Model**:
   - Tapered wedge chassis profile with 4 underside rubber feet and dual-axis stainless steel drop hinges.
   - 2048x1024 high-resolution canvas keyboard deck with dish-shaped curved keycaps, FnLock, F1–F12 icons, CapsLock LED dot, circular TrackPoint recess, speaker grilles, and glowing green power button.
   - Physical 3D knurled TrackPoint rubber nub in iconic ThinkPad red (`#DF1A2D`).
   - 3 physical TrackPoint clickpad buttons (Left/Right with red horizontal stripes, Middle scroll with blue tactile dots), recessed square fingerprint reader, Intel Core badge, and the 45° angled ThinkPad logo with an illuminated red LED dot on the "i".
   - Dual Thunderbolt 4 / USB-C ports, HDMI 2.1, USB-A 3.2, 3.5mm audio jack, and copper heatsink exhaust vents.
   - Top display bezel with dual microphones, glass webcam lens, and red ThinkShutter physical privacy slider.

2. **Interactive Laptop Screen**:
   - **Interactive Terminal (`zsh`)**: Supports live typing, command runner (`help`, `whoami`, `projects`, `pipeline`, `skills`, `leetcode`, `resume`, `contact`, `clear`), and clickable quick command pills.
   - **5-Stage Dynamics 365 Pipeline Simulator**: Live animated simulation of the 5-subsidiary unattended bot with a "Run Pipeline Simulation" button.
   - **Selected Work, Field Notes, and Resume Tabs**: Interactive project ledger and engineering trade-offs.

3. **Tactical Camera Controls & Raycasting**:
   - **Focus Screen**: Smoothly glides the camera directly face-on to the screen (`pos: (0, 2.28, 2.20), look: (0, 1.15, -1.22)`) for high-legibility terminal interaction.
   - **Desk View**: Glides back to the 3/4 workstation perspective.
   - **Direct 3D Raycasting**: Click directly on the 3D laptop screen's tabs or quick command buttons to trigger actions.
   - **Toggleable Architect Desk Lamp**: Switch on/off with real-time Three.js spotlight intensity.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server (Port 3001)
npm run dev

# Production build
npm run build
```

---

## 🛠️ Tech Stack
- **Three.js** (WebGL 3D Rendering, ACES Filmic Tone Mapping, PCF Soft Shadows)
- **React 18** + **TypeScript**
- **Vite** (Rollup Code Splitting)
- **Tailwind CSS**
- **Lucide Icons**
