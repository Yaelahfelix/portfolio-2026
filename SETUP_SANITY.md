# Sanity CMS Setup Guide

## Prerequisites
- A Sanity account (create one at [sanity.io](https://sanity.io))
- Node.js and npm/pnpm installed

## Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create project"
3. Choose a project name (e.g., "portfolio")
4. Select a dataset (recommend "production")
5. Note down your **Project ID** and **Dataset name**

## Step 2: Create API Token

1. Go to your project settings in Sanity
2. Navigate to **API** → **Tokens**
3. Click **Create Token**
4. Name it (e.g., "portfolio-api")
5. Grant it **Editor** permissions
6. Copy the token - you'll need this for environment variables

## Step 3: Add Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

## Step 4: Deploy Schemas to Sanity

The schemas are defined in `/sanity/schemas/`. To deploy them:

### Option A: Using Sanity CLI (Recommended)

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Initialize Sanity in your project:
   ```bash
   sanity init --project-id YOUR_PROJECT_ID --dataset production
   ```

3. Deploy schema types:
   ```bash
   sanity deploy
   ```

4. Open Sanity Studio:
   ```bash
   sanity start
   ```

### Option B: Using the Sanity Dashboard

1. Go to your project on [sanity.io/manage](https://sanity.io/manage)
2. Click **Launch Studio**
3. The studio should automatically recognize the schema files

## Step 5: Add Sample Data

In the Sanity Studio:

### 1. Add Skills
- Click **+ Create** → **Skill**
- Add skill name, category (frontend/backend/tools/database), proficiency (0-100)
- Example skills: React, Node.js, PostgreSQL, etc.

### 2. Add Work Experience
- Click **+ Create** → **Work Experience**
- Fill in company, position, dates, description, responsibilities, technologies
- Mark "Currently Working Here" if it's your current role

### 3. Add Projects
- Click **+ Create** → **Project**
- Add project title, description, featured image, technologies
- Add live URL and GitHub URL if available
- Optional: Add case study content

## Step 6: Update Sample Content

To use real content in the portfolio:

1. Open `.env.local` and ensure all variables are set correctly
2. Add at least one skill, work experience, and project
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 and see your data automatically loaded!

## Troubleshooting

### "Dataset not found" error
- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that you created a dataset named exactly what's in `NEXT_PUBLIC_SANITY_DATASET`

### Data not loading
- Check browser console for fetch errors
- Verify all environment variables are set in `.env.local`
- Make sure you've published documents in Sanity Studio (draft documents won't show)

### CORS errors
- Add your domain to Sanity project settings:
  1. Go to **Settings** → **API** → **CORS origins**
  2. Add `http://localhost:3000` for development
  3. Add your production URL later

## Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js & Sanity Integration](https://www.sanity.io/guides/nextjs-cms)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity CLI Reference](https://www.sanity.io/docs/cli)
