# 🚀 Interactive Portfolio with Sanity CMS

A beautiful, fully-featured portfolio website built with **Next.js 16**, **Framer Motion**, **Three.js**, and **Sanity CMS**. Packed with smooth animations, 3D elements, and responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=nextjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0.0-FF006E)](https://www.framer.com/motion)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)](https://sanity.io)

## ✨ Features

### 🎯 Hero Section
- **3D Rotating Cube** - Interactive Three.js cube with smooth rotation
- **Floating Particles** - Animated particle system background
- **Smooth Animations** - Framer Motion text and button animations
- **Responsive Design** - Perfect on all devices

### 💡 Skills Section
- **Grid Layout** - Beautifully organized skills
- **Animated Cards** - Scroll-triggered animations
- **Sanity Integrated** - Manage skills from CMS
- **Categorized** - Skills organized by category

### 📅 Work Experience
- **Timeline Layout** - Professional experience timeline
- **Achievements** - Highlight your accomplishments
- **Dates & Details** - Full employment information
- **CMS Managed** - Update from Sanity Studio

### 🚀 Projects Portfolio
- **Project Showcase** - Beautiful grid of projects
- **Hover Effects** - Interactive card animations
- **Project Details** - Modal for full project information
- **Tech Stack** - Display technologies used
- **Live Links** - Links to demo and GitHub

### 🎨 Design Features
- **Dark Mode** - Built-in dark theme support
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Layout** - Mobile-first design
- **Modern UI** - Clean, professional appearance
- **Accessible** - WCAG compliant with semantic HTML

### 📱 Responsive
- Mobile phones ✓
- Tablets ✓
- Desktop ✓
- Large screens ✓

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.2.0** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4.2.0** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Three.js** - 3D graphics

### Backend & CMS
- **Sanity CMS** - Headless content management
- **GROQ** - Query language for Sanity
- **next-sanity** - Sanity integration

### UI Components
- **shadcn/ui** - Accessible components
- **Radix UI** - Primitive components
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)
- Sanity account (free)

### Installation

1. **Clone the project**
```bash
git clone <your-repo>
cd portfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

4. **Run development server**
```bash
pnpm dev
```

5. **Open browser**
Visit http://localhost:3000

For detailed setup instructions, see **FINAL_SETUP.md**

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **FINAL_SETUP.md** | Step-by-step setup guide (START HERE) |
| **GETTING_STARTED.md** | Quick start & overview |
| **QUICK_START.md** | Quick reference card |
| **README_PORTFOLIO.md** | Features & architecture |
| **ANIMATIONS_GUIDE.md** | Customize animations |
| **OPTIMIZATION_TIPS.md** | Performance optimization |
| **TROUBLESHOOTING.md** | Problem solving |
| **FILE_STRUCTURE.md** | Project organization |
| **PROJECT_SUMMARY.md** | Technical details |
| **DOCS_INDEX.md** | Documentation index |

👉 **Start with FINAL_SETUP.md for complete setup instructions**

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx               # Homepage
├── globals.css            # Global styles
└── demo/
    └── page.tsx           # Component showcase

components/
├── Navbar.tsx             # Navigation
├── Footer.tsx             # Footer
├── sections/
│   ├── HeroSection.tsx
│   ├── SkillsSection.tsx
│   ├── WorkExperienceSection.tsx
│   └── ProjectsSection.tsx
└── 3d/
    ├── FloatingParticles.tsx
    └── RotatingCube.tsx

lib/
├── sanity.client.ts       # Sanity setup
├── sanity.queries.ts      # GROQ queries
└── animations.ts          # Animation variants

sanity/
├── schemas/
│   ├── skill.ts
│   ├── workExperience.ts
│   └── project.ts
└── sample-data.json
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `app/globals.css`

### Modify Animations
Check `lib/animations.ts` or `ANIMATIONS_GUIDE.md`

### Add Content
Go to Sanity Studio and create documents

### Adjust Layout
Edit Tailwind classes in component files

See **ANIMATIONS_GUIDE.md** for detailed customization.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
vercel
```

### Or connect GitHub to Vercel for automatic deployments

**Don't forget to add environment variables in Vercel Settings!**

See **FINAL_SETUP.md** for detailed deployment steps.

## 🔍 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 🤝 Contributing

Feel free to fork, modify, and use this portfolio for your own projects!

## 📄 License

MIT License - feel free to use this project as you wish.

## 🙋 Support

Having issues? Check out:
1. **TROUBLESHOOTING.md** - Common issues & solutions
2. **FINAL_SETUP.md** - Setup guidance
3. External resources:
   - Next.js Docs: https://nextjs.org/docs
   - Sanity Docs: https://www.sanity.io/docs
   - Framer Motion: https://www.framer.com/motion/
   - Three.js: https://threejs.org/docs/

## 📊 Checklist

Before launching, ensure:
- [ ] Sanity CMS set up
- [ ] Environment variables configured
- [ ] Content added to Sanity
- [ ] Development server runs without errors
- [ ] Tested on mobile
- [ ] Animations smooth
- [ ] Ready to deploy

## 🎯 Next Steps

1. ✅ Setup with FINAL_SETUP.md
2. ✅ Add your content in Sanity Studio
3. ✅ Customize colors and animations
4. ✅ Deploy to Vercel
5. ✅ Share with the world!

---

**Happy building! 🚀**

Made with ❤️ for developers by developers

Questions? Read the documentation or check TROUBLESHOOTING.md
