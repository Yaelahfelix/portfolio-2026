# Getting Started - Interactive Portfolio

Welcome! This guide will help you set up and customize your portfolio.

## 📋 What You Get

✨ **Beautiful Animations**
- Framer Motion for smooth transitions
- Scroll-triggered animations
- Hover effects on interactive elements
- Floating particle effects in hero section

🎯 **Interactive 3D Elements**
- Three.js particle system in hero
- Rotating 3D cube
- Smooth WebGL rendering

📱 **Fully Responsive**
- Mobile-first design
- Works on all screen sizes
- Touch-friendly navigation

📝 **Content Management**
- Sanity CMS for easy updates
- No code changes needed
- Manage skills, experience, and projects

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Create Sanity Project
1. Go to https://sanity.io/sign-up
2. Create a new project
3. Create dataset named `production`
4. Copy your **Project ID** from settings

### 3. Create API Token
1. Go to project settings → API → Tokens
2. Create token with Editor permissions
3. Copy the token

### 4. Add Environment Variables

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-api-token-here
```

Replace:
- `your-project-id-here` with your Sanity Project ID
- `your-api-token-here` with your Sanity API token

### 5. Deploy Sanity Schemas

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity in your project
sanity init --project-id YOUR_PROJECT_ID --dataset production

# Deploy schemas
sanity deploy
```

### 6. Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 🎉

## 📊 Adding Your Content

### Method 1: Using Sanity Studio (Recommended)

Open Sanity Studio:
```bash
sanity start
```

Then go to http://localhost:3000/admin or your Sanity studio URL.

### Add Skills

1. Click **+ Create** → **Skill**
2. Fill in:
   - **Skill Name**: e.g., "React.js"
   - **Category**: Choose from Frontend, Backend, Tools, Database
   - **Proficiency**: Slider 0-100 (e.g., 95 for expert)
   - **Icon URL**: (optional) URL to skill icon
   - **Display Order**: Number to control order on page
3. Click **Publish**

### Add Work Experience

1. Click **+ Create** → **Work Experience**
2. Fill in:
   - **Company Name**: e.g., "Google"
   - **Position**: e.g., "Senior Engineer"
   - **Start Date**: Pick date
   - **End Date**: Pick date (leave blank if current)
   - **Currently Working Here**: Toggle if active
   - **Description**: Brief summary of what you did
   - **Responsibilities**: Add multiple bullet points
   - **Technologies**: List tech stack used
3. Click **Publish**

### Add Projects

1. Click **+ Create** → **Project**
2. Fill in:
   - **Project Title**: e.g., "E-commerce Platform"
   - **Slug**: Auto-generated from title
   - **Description**: What the project does
   - **Featured Image**: Upload a nice screenshot
   - **Technologies Used**: List tech used
   - **Live URL**: Link to deployed project (optional)
   - **GitHub URL**: Link to GitHub repo (optional)
   - **Case Study**: Detailed write-up (optional)
   - **Featured Project**: Toggle to show prominently
   - **Display Order**: Number to control order
3. Click **Publish**

## 🎨 Customization

### Change Color Scheme

The portfolio uses blue as the primary color. To change:

1. **Find all color references**: Search for `blue-600`, `blue-400` in components
2. **Replace with your color**: 
   - `blue-600` → `purple-600`
   - `blue-400` → `purple-400`
3. **Update gradients**: `from-blue-600 to-blue-400` → `from-purple-600 to-purple-400`

Example colors to try:
- **Green**: `emerald-600` / `emerald-400`
- **Purple**: `purple-600` / `purple-400`
- **Orange**: `orange-600` / `orange-400`
- **Red**: `rose-600` / `rose-400`

### Modify Hero Section

Edit `components/sections/HeroSection.tsx`:

```typescript
// Change heading
<h1>Full-Stack Developer &
  <span> Creative Builder</span>
</h1>

// Change description
<p>Crafting beautiful, interactive web experiences...</p>

// Change button text
<button>View My Work</button>
```

### Update Social Links

Edit `components/Footer.tsx` - find the social links section and update URLs:

```typescript
{
  name: 'GitHub',
  href: 'https://github.com/YOUR_USERNAME',
  ...
}
```

### Add More Sections

Create a new file like `components/sections/BlogSection.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'

export function BlogSection() {
  return (
    <section id="blog">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Your content */}
      </div>
    </section>
  )
}
```

Then import in `app/page.tsx`:
```typescript
import { BlogSection } from '@/components/sections/BlogSection'

export default async function Home() {
  // ... existing code
  return (
    <main>
      {/* ... existing sections */}
      <BlogSection />
    </main>
  )
}
```

## 🧪 Testing

### Demo Page

Visit `/demo` to see components with sample data:
```
http://localhost:3000/demo
```

### Check Animations

1. Scroll down to see scroll-triggered animations
2. Hover over buttons to see hover effects
3. Check mobile view to verify responsive design

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to vercel.com and import repository
3. Add environment variables in Vercel settings
4. Deploy with one click!

### Deploy Elsewhere

1. Build: `pnpm build`
2. Start: `pnpm start`
3. Add environment variables on your hosting platform

## 🐛 Troubleshooting

### "Cannot find module" errors
→ Run `pnpm install` again and restart dev server

### Content not showing
→ Check environment variables are correct
→ Make sure documents are published in Sanity (not draft)

### Animations not working
→ Check if JavaScript is enabled
→ Try clearing browser cache

### 3D elements not rendering
→ Check browser console for errors
→ Verify WebGL is supported
→ Try different browser

### Images not loading
→ Verify image URLs are correct
→ Check CORS settings if using external images

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://sanity.io/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org/docs/)

## 💡 Pro Tips

1. **Use high-quality images**: 1200x800px works best for projects
2. **Write compelling descriptions**: 2-3 sentences per experience/project
3. **Keep skills organized**: Group related technologies
4. **Update regularly**: Add new projects and skills as you grow
5. **Test on mobile**: Use Chrome DevTools to test responsive design
6. **Performance**: Optimize images before uploading

## ✅ Checklist

- [ ] Install dependencies
- [ ] Create Sanity project
- [ ] Set environment variables
- [ ] Deploy schemas
- [ ] Add at least 3 skills
- [ ] Add your work experience
- [ ] Add your projects
- [ ] Customize colors to match your brand
- [ ] Update hero section text
- [ ] Update footer with social links
- [ ] Test on mobile
- [ ] Deploy to Vercel

## 🎉 You're All Set!

Your portfolio is ready! Here's what to do next:

1. **Share it**: Send the link to your network
2. **Keep it updated**: Add new projects as you complete them
3. **Get feedback**: Ask friends/colleagues for feedback
4. **Optimize**: Track analytics and improve based on visitors

Need help? Check the documentation files:
- `README_PORTFOLIO.md` - Full documentation
- `SETUP_SANITY.md` - Detailed Sanity setup
- `QUICK_START.md` - Quick reference

Happy building! 🚀
