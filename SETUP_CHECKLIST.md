# ✅ Setup Checklist

Gunakan checklist ini untuk track progress setup Anda.

## Phase 1: Dependencies & Environment

### Installation
- [ ] Node.js 18+ installed
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] Repository cloned/downloaded
- [ ] Navigated to project folder

### Dependencies
- [ ] Run `pnpm install`
- [ ] Installation completed without errors
- [ ] No peer dependency warnings (minor ones OK)

### Environment Variables
- [ ] Created `.env.local` file
- [ ] Added `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Added `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Added `NEXT_PUBLIC_SANITY_API_VERSION`
- [ ] Added `SANITY_API_TOKEN`
- [ ] All values are correct (copy-pasted, not typed)

> Don't have these values yet? See FINAL_SETUP.md Step 2

## Phase 2: Local Development

### Start Dev Server
- [ ] Run `pnpm dev`
- [ ] Server started successfully
- [ ] No build errors
- [ ] Console shows "ready in X ms"

### Browser Test
- [ ] Open http://localhost:3000
- [ ] Page loads without errors
- [ ] Hero section visible
- [ ] 3D cube renders
- [ ] Animations are smooth

### Demo Page
- [ ] Visit http://localhost:3000/demo
- [ ] All components display
- [ ] No console errors
- [ ] Responsive preview works

## Phase 3: Sanity CMS Setup

### Account & Project
- [ ] Created Sanity account at sanity.io
- [ ] Created new project
- [ ] Project created successfully
- [ ] Copied PROJECT_ID
- [ ] Copied DATASET name
- [ ] Note: usually "production"

### API Token
- [ ] Went to Settings → API Tokens
- [ ] Created new token
- [ ] Gave "Read content" permission
- [ ] Gave "Write content" permission
- [ ] Gave "Manage assets" permission
- [ ] Copied token
- [ ] Added token to `.env.local`

### Verify Connection
- [ ] Restarted dev server (`Ctrl+C` then `pnpm dev`)
- [ ] Page still loads
- [ ] Check browser console for errors
- [ ] No "Cannot connect to Sanity" errors

## Phase 4: Sanity Schemas & Content

### Deploy Schemas
Sanity automatically detects schemas from your project:
- [ ] Sanity studio opened at your-project.sanity.studio
- [ ] Saw Skills document type
- [ ] Saw Work Experience document type
- [ ] Saw Projects document type

### Add Sample Content
- [ ] Clicked "+" in Sanity to create document
- [ ] Created at least 1 Skill
- [ ] Created at least 1 Work Experience entry
- [ ] Created at least 1 Project
- [ ] Published all documents
- [ ] All content visible in studio

### Verify Content Shows
- [ ] Returned to http://localhost:3000
- [ ] Skills section shows your skills
- [ ] Work Experience shows your entries
- [ ] Projects section shows your projects
- [ ] Everything formatted correctly

> Tip: You may need to refresh the page (Ctrl+R)

## Phase 5: Customization

### Colors & Styling
- [ ] Opened `app/globals.css`
- [ ] Found CSS custom properties section
- [ ] Updated primary color (optional)
- [ ] Updated accent color (optional)
- [ ] Changes applied live

### Animations
- [ ] Opened `lib/animations.ts`
- [ ] Reviewed animation variants
- [ ] Adjusted duration if desired
- [ ] Adjusted delay if desired
- [ ] Tested animations in browser

### Personal Info
- [ ] Updated `app/layout.tsx` metadata
- [ ] Changed title
- [ ] Changed description
- [ ] Added your name/title
- [ ] Updated Open Graph image

## Phase 6: Testing

### Responsive Design
- [ ] Opened Chrome DevTools (F12)
- [ ] Toggled Device Toolbar
- [ ] Tested on Mobile (375px)
- [ ] Tested on Tablet (768px)
- [ ] Tested on Desktop (1920px)
- [ ] All looks good

### Browser Compatibility
- [ ] Tested in Chrome
- [ ] Tested in Firefox (optional)
- [ ] Tested in Safari (optional)
- [ ] Tested in Edge (optional)

### Performance
- [ ] Opened Lighthouse tab in DevTools
- [ ] Ran audit
- [ ] Performance score > 80
- [ ] Fixed any critical issues

### Dark Mode
- [ ] OS switched to dark mode
- [ ] Portfolio updated to dark theme
- [ ] All text readable
- [ ] All colors appropriate

## Phase 7: Production Build

### Build Test
- [ ] Run `pnpm build`
- [ ] Build completed successfully
- [ ] No build errors
- [ ] No TypeScript errors

### Production Preview
- [ ] Run `pnpm start`
- [ ] Server started
- [ ] Visit http://localhost:3000
- [ ] Page loads correctly
- [ ] Animations work

## Phase 8: Deployment (Vercel)

### Pre-Deployment
- [ ] Created Vercel account
- [ ] Repo pushed to GitHub (optional but recommended)
- [ ] All env vars ready

### Deploy
- [ ] Run `vercel` in terminal
- [ ] Followed prompts
- [ ] Project created on Vercel
- [ ] Build completed
- [ ] Deployment succeeded

### Post-Deployment
- [ ] Visited deployed URL
- [ ] Page loads correctly
- [ ] Add env vars to Vercel Settings if needed
- [ ] Redeployed if env vars were missing
- [ ] All content displays

### Custom Domain (Optional)
- [ ] Added custom domain in Vercel
- [ ] Updated DNS records
- [ ] Domain pointing correctly
- [ ] SSL certificate working

## Phase 9: Final Verification

### Content
- [ ] All your skills showing
- [ ] All work experience visible
- [ ] All projects displayed
- [ ] Images loading correctly
- [ ] Text readable

### Functionality
- [ ] Links working (if any)
- [ ] Animations smooth
- [ ] Hover effects working
- [ ] Responsive on mobile
- [ ] Dark mode working

### Performance
- [ ] Pages load fast
- [ ] No broken images
- [ ] No console errors
- [ ] Network requests successful

### SEO
- [ ] Meta tags correct
- [ ] OG image displaying
- [ ] Title & description accurate
- [ ] Mobile viewport set

## Phase 10: Sharing

### Before Sharing
- [ ] Verified everything works
- [ ] Tested on multiple devices
- [ ] Checked for typos
- [ ] All content finalized
- [ ] Animations optimized

### Share It!
- [ ] Shared on LinkedIn
- [ ] Shared on Twitter
- [ ] Shared with employers/clients
- [ ] Shared in portfolio groups
- [ ] Got feedback

## 🎯 Summary Checklist

### Essential (Must Do)
- [ ] Phase 1: Dependencies
- [ ] Phase 2: Local Dev
- [ ] Phase 3: Sanity Setup
- [ ] Phase 4: Add Content
- [ ] Phase 7: Build Test
- [ ] Phase 8: Deployment

### Recommended (Should Do)
- [ ] Phase 5: Customization
- [ ] Phase 6: Testing
- [ ] Phase 9: Final Verification
- [ ] Phase 10: Sharing

### Optional (Nice to Have)
- [ ] Browser compatibility testing
- [ ] Custom domain setup
- [ ] Analytics implementation
- [ ] Contact form addition

## 🆘 Stuck?

If you're stuck on a step:

1. **Check TROUBLESHOOTING.md** - Most common issues solved
2. **Check FINAL_SETUP.md** - Detailed step-by-step guide
3. **Check console (F12)** - Error messages help
4. **Restart dev server** - `Ctrl+C` then `pnpm dev`

## ✅ Success!

When you've checked all essential boxes:
✅ Your portfolio is live!
✅ Content is showing!
✅ Everyone can see it!

---

## 📝 Notes

Use this space to note any issues or modifications you made:

```
Issue: [describe issue]
Solution: [what you did]

Modification: [what you changed]
Reason: [why you changed it]

---
```

---

**Congratulations! You're all set! 🎉**
