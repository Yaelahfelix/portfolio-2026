# 🚀 Final Setup Guide - Interactive Portfolio with Sanity CMS

Selamat! Portfolio Anda sudah siap dibangun. Ikuti panduan lengkap ini untuk setup dan deployment.

## 📋 Apa yang Sudah Dibuat

Anda sekarang memiliki portfolio interaktif dengan fitur-fitur keren:

### ✨ Fitur Utama
1. **Hero Section** - Dengan 3D animated cube dan floating particles menggunakan Three.js
2. **Skills Section** - Menampilkan skills dari Sanity CMS dengan animasi
3. **Work Experience** - Timeline interaktif dari Sanity CMS
4. **Projects Section** - Showcase projects dengan hover effects dan modal details
5. **Smooth Animations** - Powered by Framer Motion
6. **Responsive Design** - Mobile-first, works on all devices
7. **Dark Mode** - Built-in dark mode support

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Setup Sanity CMS (IMPORTANT)

#### Option A: Create New Sanity Project
```bash
npm create sanity@latest -- --template clean --create-project
```

This will:
- Ask you to create a new Sanity account (or login)
- Create a new project
- Create a dataset
- Give you PROJECT_ID and DATASET

#### Option B: Use Existing Sanity Project
If you already have a Sanity project, just grab the credentials from your Sanity dashboard.

### Step 3: Set Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
```

**How to get these values:**

1. **PROJECT_ID & DATASET**: Available in your Sanity project settings
   - Go to https://manage.sanity.io
   - Select your project
   - In Settings → Project Details, copy PROJECT_ID
   - Your dataset is usually "production"

2. **API_VERSION**: Use the date format (today's date or later), e.g., "2024-01-01"

3. **SANITY_API_TOKEN**: 
   - Go to Settings → API Tokens
   - Create a new token with these permissions:
     - ✅ Read content
     - ✅ Write content
     - ✅ Manage assets
   - Copy the token to your env file

### Step 4: Deploy Sanity Schemas

After setting up environment variables, Sanity will auto-detect and create the schemas from your project.

Alternatively, if you have Sanity CLI:
```bash
sanity deploy
```

### Step 5: Add Sample Data (Optional)

Go to your Sanity Studio (usually at https://your-project.sanity.studio) and:

1. Click on "Skills" document type
2. Click "+" to create new
3. Fill in skill details from `sanity/sample-data.json`
4. Repeat for Work Experience and Projects

Or import the sample data programmatically using the Sanity import tools.

### Step 6: Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 to see your portfolio!

Visit http://localhost:3000/demo to see all components in action.

## 📁 Project Structure

```
/app
  /layout.tsx - Main layout with metadata
  /page.tsx - Home page (main portfolio)
  /demo/page.tsx - Component showcase
  
/components
  /Navbar.tsx - Navigation with smooth animations
  /Footer.tsx - Footer section
  /sections
    /HeroSection.tsx - 3D hero with animations
    /SkillsSection.tsx - Skills grid from Sanity
    /WorkExperienceSection.tsx - Timeline from Sanity
    /ProjectsSection.tsx - Project showcase from Sanity
  /3d
    /FloatingParticles.tsx - 3D particle system
    /RotatingCube.tsx - Animated 3D cube

/sanity
  /schemas
    /skill.ts - Skill document schema
    /workExperience.ts - Work experience schema
    /project.ts - Project schema
  /sample-data.json - Sample data for testing

/lib
  /sanity.client.ts - Sanity client configuration
  /sanity.queries.ts - GROQ queries
  /animations.ts - Animation variants and utilities

/app
  /globals.css - Global styles with animations
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `/app/globals.css`:
- Update primary colors
- Modify gradients
- Adjust animation speeds

### Modify Animations
See `ANIMATIONS_GUIDE.md` for detailed animation customization.

### Add More Projects/Skills
Simply add documents in your Sanity Studio - the portfolio will auto-update!

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

**Don't forget to add environment variables in Vercel Settings!**

### Other Hosting
Works with any Node.js hosting (Netlify, Railway, etc.)

## 🐛 Troubleshooting

### Error: "Cannot read property of undefined"
- Make sure Sanity environment variables are set correctly
- Check that schemas are deployed to Sanity
- Verify API token has read permissions

### 3D Elements Not Showing
- Check browser console for Three.js errors
- Make sure you're on a modern browser (Chrome, Firefox, Safari, Edge)
- Try disabling browser extensions

### Animations Not Smooth
- Reduce animation complexity in ANIMATIONS_GUIDE.md
- Check browser performance
- Disable some effects if needed

## 📖 Additional Resources

- **README_PORTFOLIO.md** - Feature overview and architecture
- **ANIMATIONS_GUIDE.md** - How to customize animations
- **PROJECT_SUMMARY.md** - Full technical summary
- **Sanity Docs** - https://www.sanity.io/docs
- **Framer Motion** - https://www.framer.com/motion/
- **Three.js** - https://threejs.org/docs/

## ✅ Testing Checklist

- [ ] Environment variables set correctly
- [ ] Sanity schemas deployed
- [ ] Sample data added to Sanity
- [ ] Homepage loads without errors
- [ ] Hero 3D cube renders
- [ ] Skills section displays from CMS
- [ ] Work experience timeline renders
- [ ] Projects showcase displays with images
- [ ] Animations work smoothly
- [ ] Responsive on mobile
- [ ] Dark mode works

## 🎉 Next Steps

1. Add your own content in Sanity Studio
2. Customize colors and animations
3. Deploy to Vercel
4. Share with the world!

---

**Need help?** Check the other documentation files or refer to the Sanity and Framer Motion documentation.

Happy building! 🚀
