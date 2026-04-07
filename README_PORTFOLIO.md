# 🚀 Interactive Portfolio - Next.js + Three.js + Framer Motion + Sanity CMS

A stunning, fully interactive portfolio website built with modern web technologies. Features beautiful animations, 3D elements, and a powerful CMS for easy content management.

## ✨ Features

### 🎨 Design & Animations
- **Framer Motion**: Smooth, professional animations and transitions
- **Three.js Integration**: 3D particle effects and rotating cube in hero section
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Dark Mode Support**: Built-in dark/light mode toggle
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions

### 📝 Content Management
- **Sanity CMS**: Powerful headless CMS for managing content
- **Skills Management**: Add and organize skills by category with proficiency levels
- **Work Experience**: Display your career history with detailed information
- **Project Showcase**: Feature your best projects with filtering by technology
- **Easy Updates**: No code changes needed - update content through Sanity Studio

### 🎯 Sections
1. **Hero Section**: Eye-catching landing with 3D particles and animated text
2. **Skills Section**: Display technical skills organized by category
3. **Work Experience Section**: Timeline view of professional experience
4. **Projects Section**: Showcase your work with filtering and detailed information
5. **Footer**: Contact information and social links

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **CMS**: Sanity
- **Image Optimization**: Next.js Image
- **Type Safety**: TypeScript

## 📦 Installation

### 1. Clone and Install

```bash
git clone <your-repo>
cd portfolio
pnpm install
```

### 2. Setup Sanity CMS

Follow the detailed guide in [SETUP_SANITY.md](./SETUP_SANITY.md)

Key steps:
- Create a Sanity project
- Get your Project ID
- Create an API token
- Add environment variables

### 3. Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page, integrates all sections
│   └── globals.css          # Global styles and animations
├── components/
│   ├── 3d/                  # Three.js components
│   │   ├── FloatingParticles.tsx
│   │   └── RotatingCube.tsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── WorkExperienceSection.tsx
│   │   └── ProjectsSection.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── sanity.client.ts     # Sanity client configuration
│   └── sanity.queries.ts    # GROQ queries for data fetching
├── sanity/
│   └── schemas/             # Sanity document type schemas
│       ├── skill.ts
│       ├── workExperience.ts
│       └── project.ts
└── public/                  # Static assets
```

## 🎨 Customization

### Change Colors

The portfolio uses a blue color scheme. To customize:

1. **Tailwind Classes**: Search and replace `blue-600`, `blue-400`, etc.
2. **CSS Variables**: Update in `app/globals.css`
3. **Example**: Change all `from-blue-600 to-blue-400` to your brand colors

### Modify Hero Section

Edit `components/sections/HeroSection.tsx`:
- Update heading text
- Modify CTA button text and links
- Change particle colors in `FloatingParticles.tsx`

### Add New Sections

1. Create a new component in `components/sections/`
2. Add a corresponding Sanity schema if needed
3. Import and add to `app/page.tsx`

### Customize Animations

All animations use Framer Motion. Edit:
- `containerVariants` - Controls stagger timing
- `itemVariants` - Individual element animations
- `whileHover` / `whileInView` - Interaction animations

## 📊 Adding Content via Sanity

### Add Skills
1. Open Sanity Studio (dashboard)
2. Click "+ Create" → "Skill"
3. Fill in:
   - Skill name (e.g., "React")
   - Category (Frontend, Backend, Tools, Database)
   - Proficiency (0-100)
   - Display order
4. Publish

### Add Work Experience
1. Click "+ Create" → "Work Experience"
2. Fill in company, position, dates
3. Add description and responsibilities
4. List technologies used
5. Mark if currently working there
6. Publish

### Add Projects
1. Click "+ Create" → "Project"
2. Add title and description
3. Upload featured image
4. Add technologies used
5. Optionally add live URL and GitHub URL
6. Mark as featured if important
7. Publish

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings
4. Deploy automatically on push

### Other Platforms

Set environment variables and run:
```bash
pnpm build
pnpm start
```

## 🔐 Security

- API tokens never exposed (stored in `.env.local`)
- Private projects require authentication
- CORS properly configured for Sanity
- No sensitive data in client code

## ⚡ Performance

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Lazy loading for heavy 3D components
- **Caching**: Sanity content caching via CDN
- **SEO**: Proper metadata and structured data

## 🐛 Troubleshooting

### Content Not Loading
- Verify environment variables are set
- Check Sanity API token is valid
- Ensure documents are published (not draft)

### 3D Elements Not Showing
- Check browser console for errors
- Verify Three.js library is installed
- Try disabling browser extensions

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `pnpm build`
- Check Tailwind configuration

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://sanity.io/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📧 Contact

Have questions? Reach out through the portfolio contact section.

---

**Happy coding! 🎉**
