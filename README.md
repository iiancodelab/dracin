# Dracin 🎬

A modern drama streaming web application built with Next.js 16, featuring a clean Netflix-inspired interface for browsing and watching Asian drama series.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)

## ✨ Features

- 🏠 **Homepage** - Hero banner with random featured drama, trending, latest, and popular sections
- 🔍 **Search** - Real-time search functionality
- 📺 **Drama Detail** - Full drama information with episode list and recommendations
- ▶️ **Video Player** - HLS streaming support with hls.js
- 📱 **PWA Support** - Installable as a mobile/desktop app
- 🌙 **Dark Theme** - Modern dark UI design
- ⚡ **Fast Loading** - Skeleton loaders and optimized performance
- 📜 **Scroll Restoration** - Proper scroll position on navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/iiancodelab/dracin.git
cd dracin

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | DramaBox API base URL | `https://api.dramabox.com/api` |

## 📁 Project Structure

```
dracin/
├── app/                    # Next.js App Router pages
│   ├── drama/[id]/        # Drama detail page
│   ├── watch/[id]/        # Video player page
│   ├── search/            # Search page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header with search
│   ├── footer.tsx        # Site footer
│   ├── video-player.tsx  # HLS video player
│   └── ...
├── lib/                  # Utilities
│   ├── api.ts           # API functions
│   └── types.ts         # TypeScript types
└── public/              # Static assets
    ├── manifest.json    # PWA manifest
    └── sw.js           # Service worker
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Video Streaming**: [hls.js](https://github.com/video-dev/hls.js/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📱 PWA Installation

1. Open the website in Chrome (mobile or desktop)
2. Click the "Install" button in the address bar, or
3. On mobile, tap menu → "Add to Home Screen"

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iiancodelab/dracin)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📄 License

This project is for educational purposes only. All content is provided by third-party APIs.

## 🙏 Acknowledgments

- [DramaBox](https://www.dramabox.com/) for the API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Vercel](https://vercel.com/) for hosting

---

Made with ❤️ by [iiancodelab](https://github.com/iiancodelab)
