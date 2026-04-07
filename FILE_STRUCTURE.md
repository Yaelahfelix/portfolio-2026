# 📂 Complete File Structure Guide

Portfolio project Anda memiliki struktur yang terorganisir dengan baik. Berikut adalah penjelasan lengkap setiap folder dan file.

## Struktur Lengkap

```
portfolio-project/
├── app/
│   ├── layout.tsx                    # Root layout dengan metadata & viewport
│   ├── page.tsx                      # Homepage (main portfolio)
│   ├── globals.css                   # Global styles & animations
│   └── demo/
│       └── page.tsx                  # Demo page untuk testing components
│
├── components/
│   ├── index.ts                      # Barrel exports untuk clean imports
│   ├── Navbar.tsx                    # Navigation bar dengan smooth animations
│   ├── Footer.tsx                    # Footer section
│   ├── sections/                     # Section components
│   │   ├── HeroSection.tsx           # Hero dengan 3D cube & particles
│   │   ├── SkillsSection.tsx         # Skills grid from Sanity
│   │   ├── WorkExperienceSection.tsx # Timeline from Sanity
│   │   └── ProjectsSection.tsx       # Project showcase from Sanity
│   └── 3d/                          # Three.js components
│       ├── FloatingParticles.tsx     # 3D particle system
│       └── RotatingCube.tsx          # Animated 3D cube
│
├── lib/
│   ├── sanity.client.ts              # Sanity client setup
│   ├── sanity.queries.ts             # GROQ queries untuk fetching data
│   ├── animations.ts                 # Animation variants & utilities
│   └── utils.ts                      # Utility functions (cn, etc)
│
├── sanity/
│   ├── index.ts                      # Schema exports
│   ├── schemas/                      # Document schemas
│   │   ├── skill.ts                  # Skill schema
│   │   ├── workExperience.ts         # Work experience schema
│   │   └── project.ts                # Project schema
│   └── sample-data.json              # Sample data untuk testing
│
├── public/
│   ├── og-image.png                  # Open Graph image
│   ├── icon.svg                      # Favicon
│   └── icon-*.png                    # Dark/light icons
│
├── hooks/
│   ├── use-mobile.tsx                # Mobile detection hook
│   └── use-toast.ts                  # Toast notifications
│
├── components/ui/                    # shadcn/ui components
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── ... (other UI components)
│
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables (git ignored)
├── .gitignore                        # Git ignore file
├── next.config.mjs                   # Next.js config
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
├── postcss.config.js                 # PostCSS config
├── package.json                      # Dependencies & scripts
├── pnpm-lock.yaml                    # Lock file
│
├── Documentation/
│   ├── FINAL_SETUP.md               # Step-by-step setup guide ⭐ START HERE
│   ├── README_PORTFOLIO.md          # Features & architecture
│   ├── GETTING_STARTED.md           # Quick start guide
│   ├── ANIMATIONS_GUIDE.md          # Animation customization
│   ├── OPTIMIZATION_TIPS.md         # Performance tips
│   ├── SETUP_SANITY.md              # Sanity setup details
│   ├── PROJECT_SUMMARY.md           # Technical summary
│   ├── QUICK_START.md               # Quick reference
│   └── FILE_STRUCTURE.md            # This file
│
└── scripts/                          # Optional: utility scripts
    └── (add as needed)
```

## 📄 File Descriptions

### App Directory

#### `app/layout.tsx`
- Root layout component
- Contains metadata (title, description, OG tags)
- Contains viewport configuration
- Includes Analytics
- Sets up fonts

#### `app/page.tsx`
- Main homepage
- Imports all sections: Hero, Skills, WorkExperience, Projects
- Navbar & Footer
- Main entry point

#### `app/globals.css`
- Global styles
- CSS variables & design tokens
- Animation keyframes
- Tailwind directives
- Smooth scroll behavior

#### `app/demo/page.tsx`
- Component showcase page
- Test all animations
- Verify responsive design
- View documentation

### Components Directory

#### Section Components
- **HeroSection.tsx** - Main hero with 3D elements
  - Rotating cube with Three.js
  - Floating particles background
  - Animated text with Framer Motion
  - CTA buttons

- **SkillsSection.tsx** - Skills showcase
  - Grid layout of skills
  - Animated cards on scroll
  - Fetches from Sanity CMS
  - Categorized skills

- **WorkExperienceSection.tsx** - Work history timeline
  - Timeline layout
  - Company, position, dates
  - Achievements list
  - Staggered animations
  - Data from Sanity CMS

- **ProjectsSection.tsx** - Project portfolio
  - Grid/masonry layout
  - Project cards with images
  - Hover animations
  - Modal for details
  - Tech stack display
  - Links to live demo/GitHub
  - Data from Sanity CMS

#### 3D Components
- **FloatingParticles.tsx** - Three.js particle system
  - Animated particles
  - Responsive sizing
  - Performance optimized

- **RotatingCube.tsx** - 3D animated cube
  - Rotating animation
  - Interactive on hover
  - Responsive scaling

### Library Files

#### `lib/sanity.client.ts`
```typescript
// Sanity client initialization
// Reads from environment variables
// Configured for data fetching
```

#### `lib/sanity.queries.ts`
```typescript
// GROQ queries
// Fetch skills, work experience, projects
// Type-safe queries
```

#### `lib/animations.ts`
- Reusable animation variants
- Framer Motion configurations
- Scroll triggers
- Stagger effects
- Fade, slide animations

#### `lib/utils.ts`
- `cn()` function for class merging
- Utility functions
- Type helpers

### Sanity Schemas

#### `sanity/schemas/skill.ts`
```typescript
{
  _type: "skill"
  name: string
  category: string
  proficiency: number (0-100)
  icon: string
}
```

#### `sanity/schemas/workExperience.ts`
```typescript
{
  _type: "workExperience"
  company: string
  position: string
  startDate: date
  endDate: date
  isCurrentlyWorking: boolean
  description: string
  achievements: array of strings
}
```

#### `sanity/schemas/project.ts`
```typescript
{
  _type: "project"
  title: string
  description: string
  longDescription: string
  image: image reference
  technologies: array of strings
  liveLink: string (URL)
  githubLink: string (URL)
  featured: boolean
  order: number
}
```

### Documentation Files

| File | Purpose |
|------|---------|
| FINAL_SETUP.md | Step-by-step setup guide (START HERE) |
| README_PORTFOLIO.md | Features & technical overview |
| GETTING_STARTED.md | Quick start instructions |
| QUICK_START.md | Quick reference guide |
| ANIMATIONS_GUIDE.md | How to customize animations |
| SETUP_SANITY.md | Detailed Sanity setup |
| OPTIMIZATION_TIPS.md | Performance optimization |
| PROJECT_SUMMARY.md | Technical architecture |
| FILE_STRUCTURE.md | This file |

## 🔄 Data Flow

```
User visits portfolio
       ↓
Next.js Server Component (app/page.tsx)
       ↓
Fetches data from Sanity CMS
       ├→ Skills
       ├→ Work Experience
       └→ Projects
       ↓
Renders Components with data
       ├→ HeroSection (static 3D)
       ├→ SkillsSection (animated cards)
       ├→ WorkExperienceSection (timeline)
       └→ ProjectsSection (project showcase)
       ↓
Browser renders with Framer Motion & Three.js animations
       ↓
User sees beautiful animated portfolio!
```

## 🎯 Key Files to Modify

### To Customize Content:
1. Add/edit documents in Sanity Studio
2. Modify sample data in `sanity/sample-data.json`

### To Customize Design:
1. Colors: `app/globals.css`
2. Animations: `lib/animations.ts` or `ANIMATIONS_GUIDE.md`
3. Fonts: `app/layout.tsx`

### To Customize Layout:
1. Section components in `components/sections/`
2. Hero 3D elements in `components/3d/`

### To Add Features:
1. Create new schema in `sanity/schemas/`
2. Create new component in `components/sections/`
3. Add query in `lib/sanity.queries.ts`
4. Import in `app/page.tsx`

## 📦 Dependencies

### Production Dependencies
- **next**: 16.2.0 - React framework
- **react**: 19.2.4 - UI library
- **framer-motion**: 11.0.0 - Animations
- **three**: r128 - 3D graphics
- **@react-three/fiber**: 8.16.0 - Three.js for React
- **@react-three/drei**: 9.100.0 - 3D utilities
- **@sanity/client**: 6.0.0 - Sanity CMS client
- **next-sanity**: 5.0.0 - Sanity integration
- **tailwindcss**: 4.2.0 - CSS framework
- **@radix-ui**: Various - Accessible UI components

### Dev Dependencies
- **typescript**: 5.7.3 - Type safety
- **@types/three**: Type definitions for Three.js
- **postcss**: CSS processing

## 🚀 Build & Deploy

### Development
```bash
pnpm dev          # Start dev server
```

### Production
```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

### Deployment
```bash
vercel            # Deploy to Vercel
```

## 📖 Reading Guide

**First time setup?**
1. Read FINAL_SETUP.md
2. Run through steps
3. Check GETTING_STARTED.md

**Want to customize?**
1. See ANIMATIONS_GUIDE.md for animations
2. See OPTIMIZATION_TIPS.md for performance
3. See FILE_STRUCTURE.md (this file) for where to edit

**Need technical details?**
1. Check PROJECT_SUMMARY.md
2. Review component files directly
3. Check Sanity & Framer Motion docs

---

Everything is organized and ready to go! Happy coding! 🚀
