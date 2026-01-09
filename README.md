# Rajesh Kanakamedala | Portfolio

> "From Silicon to Cloud" — A Cyber-Physical Scrolly-telling Experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🌟 Overview

This is not just a portfolio; it's a **cinematic journey** through the career of a Full Stack & Embedded Systems Engineer. Designed with a **"Cyber-Physical"** aesthetic, it bridges the gap between low-level hardware (Embedded Systems) and high-level software (Cloud/VR) using immersive motion and bleeding-edge web technologies.

The application features a unique **"System Boot"** preloader, a liquid morphing navigation, a 3D-connected hero section, a horizontal scrolling experience tunnel, and a force-directed skills graph, all culminating in an interactive CLI terminal.

## 🚀 Tech Stack (Bleeding Edge)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Experimental Edge)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration, OKLCH colors)
- **Animation**:
  - [Framer Motion](https://www.framer.com/motion/) (Component interactions, layout animations)
  - [GSAP](https://gsap.com/) (ScrollTrigger for complex pinning/scrubbing)
- **Scroll Engine**: [Lenis](https://lenis.studio/) (Smooth scrolling normalization)
- **3D/Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Abstract visualizations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Cloudflare Workers / Pages (via OpenNext)

## ✨ Key Features

1. **System Boot Loader**: A thematic preloader that mimics a kernel boot sequence (Kernel -> Android Runtime -> React Hydration), playing only once per session.
2. **Liquid Morph Navigation**: A navigation bar that seamlessly transforms from a transparent header to a glassmorphic "pill" on scroll.
3. **The Convergence (Hero)**: A split-screen visual metaphor connecting Hardware (bottom) to Cloud (top) with a dynamic 3D spline.
4. **Isometric Architecture**: A scroll-triggered isometric build-up of the "Full Stack" architecture.
5. **Experience Tunnel**: A horizontal scrolling timeline for desktop, degrading gracefully to a vertical stack on mobile.
6. **Skills Network**: A force-directed graph where skill nodes interact magnetically with the cursor.
7. **Contact Terminal**: A retro-futuristic CLI that accepts commands like `help`, `email`, and `resume`.

## 🛠️ Installation & Development

### Prerequisites

- Node.js 20+
- pnpm (Preferred)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/rajesh-portfolio.git
   cd rajesh-portfolio
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open locally:**
   Visit `http://localhost:3000` to see the boot sequence.

## 🏗️ Build & Deploy

This project is optimized for **Cloudflare Pages** using OpenNext.

### Production Build

```bash
pnpm cf:build
```

### Preview locally (Wrangler)

```bash
pnpm cf:preview
```

### Deploy to Cloudflare

```bash
pnpm cf:deploy
```

## 📚 Code Wiki & Documentation

For detailed architectural insights, component documentation, and testing strategies, please refer to the **[Code Wiki](./docs/wiki/index.md)**.

- **[Architecture & Concept](./docs/wiki/01-Architecture.md)**: Deep dive into the "Cyber-Physical" design and tech stack.
- **[Core Utilities](./docs/wiki/02-Core-Utilities.md)**: Documentation for global contexts, hooks, and middleware.
- **[UI Components](./docs/wiki/03-Components-UI.md)**: Breakdown of the design system and atomic components.
- **[Feature Sections](./docs/wiki/04-Sections.md)**: Logic behind the Hero, Experience Tunnel, and Skills Network.
- **[Data Layer](./docs/wiki/05-Data-Layer.md)**: Schema definitions and data flow.
- **[Testing](./docs/wiki/06-Testing.md)**: Playwright setup and test suites.

## 📂 Project Structure

```text
src/
├── app/
│   ├── globals.css       # Tailwind v4 theme & custom utilities
│   ├── layout.tsx        # Root layout with Lenis & Loader providers
│   └── page.tsx          # Main orchestration
├── components/
│   ├── sections/         # Complex scroll sections (Hero, Experience, etc.)
│   └── ui/               # Reusable UI (Loader, Navbar, Modal)
├── context/              # React Context (Loader, Scroll)
├── data/                 # Data layer (Resume content)
├── hooks/                # Custom hooks (useSectionTransition)
├── lib/                  # Utilities (cn, constants)
└── middleware.ts         # Edge runtime CSP & security headers
```

## 🧪 Testing

We use **Playwright** for end-to-end testing.

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test tests/hero.spec.ts
```

## 🤝 Contributing & Community

Contributions are welcome! Please read our **[Contributing Guide](./CONTRIBUTING.md)** and **[Code of Conduct](./CODE_OF_CONDUCT.md)** before submitting a pull request.

## 🎨 Design System

- **Colors (OKLCH)**:
  - **Primary**: Neon Cyan (Cloud/Web)
  - **Secondary**: Solar Amber (Hardware/Kernel)
  - **Accent**: Signal Green
  - **Base**: Deep Void
- **Typography**: Space Grotesk (Headers), Inter (Body), JetBrains Mono (Code/Terminal).
- **Texture**: Subtle noise overlay for a tactical feel.

## 📄 License

This project is licensed under the **[MIT License](./LICENSE)**.

### Third-Party Attribution

A list of third-party libraries and their respective licenses can be found in **[THIRD-PARTY-LICENSES.txt](./THIRD-PARTY-LICENSES.txt)**.

MIT © [VenkataSudha](https://venkatasudha.com/)
