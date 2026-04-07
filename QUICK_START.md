# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Install Dependencies
```bash
pnpm install
```

## Step 2: Setup Sanity CMS (5 minutes)

### Create Sanity Project
1. Go to [sanity.io](https://sanity.io)
2. Sign up or log in
3. Create a new project
4. Create a dataset named `production`
5. Note your **Project ID**

### Create API Token
1. In Sanity project settings → API → Tokens
2. Create new token with Editor permissions
3. Copy the token

### Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=paste_your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=paste_your_token
```

## Step 3: Deploy Schemas
```bash
npm install -g @sanity/cli
sanity init --project-id YOUR_PROJECT_ID --dataset production
sanity deploy
```

## Step 4: Start Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` 🎉

## Step 5: Add Your Content

### Open Sanity Studio
```bash
sanity start
```

Or go to: `https://YOUR-PROJECT.sanity.studio`

### Add Sample Content
1. **Click "+ Create" → "Skill"**
   - Name: "React"
   - Category: "Frontend"
   - Proficiency: "95"
   - Publish

2. **Click "+ Create" → "Work Experience"**
   - Company: "Your Company"
   - Position: "Your Role"
   - Start Date: Pick a date
   - Description: "What you did"
   - Publish

3. **Click "+ Create" → "Project"**
   - Title: "My Project"
   - Description: "What it does"
   - Upload an image
   - Add technologies
   - Publish

## Done! 🎊

Your portfolio is now live with your content!

## What to Do Next

- **Customize Colors**: Edit component files and change `blue-600` to your brand color
- **Update Hero Text**: Edit `components/sections/HeroSection.tsx`
- **Add Your Information**: Update footer with your social links
- **Deploy**: Push to GitHub and connect to Vercel

## Common Issues

### "Cannot find module '@react-three/fiber'"
→ Run `pnpm install` again

### Content not showing
→ Check `.env.local` variables and ensure documents are published

### Environment variables not loading
→ Restart dev server: Stop and run `pnpm dev` again

## Get Help

Full documentation: [README_PORTFOLIO.md](./README_PORTFOLIO.md)
Sanity setup details: [SETUP_SANITY.md](./SETUP_SANITY.md)
