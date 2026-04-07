# 🔧 Troubleshooting Guide

Jika mengalami masalah, cari solusi di sini.

## ❌ Common Issues & Solutions

### Build Errors

#### Error: "Cannot find module '@sanity/client'"
**Solution:**
```bash
pnpm install
pnpm install @sanity/client next-sanity
```

#### Error: "Module not found: 'three'"
**Solution:**
```bash
pnpm install three @react-three/fiber @react-three/drei
```

#### Error: "Cannot read property 'projectId' of undefined"
**Cause:** Missing environment variables
**Solution:**
1. Check `.env.local` exists
2. Verify all Sanity env vars are set
3. Restart dev server: `pnpm dev`

#### Error: "Expected ',' or '}' in package.json"
**Cause:** Syntax error in package.json
**Solution:**
1. Check all commas are in place
2. No trailing commas in final entries
3. Run `json.stringify(require('./package.json'))` to validate

### Runtime Errors

#### Error: "Cannot read properties of undefined (reading 'map')"
**Cause:** Sanity data not loaded
**Solution:**
1. Check Sanity connection
2. Verify API token has read permissions
3. Check GROQ query in `lib/sanity.queries.ts`
4. Ensure documents exist in Sanity Studio

#### Error: "Three.js not found" or 3D elements not rendering
**Cause:** Canvas rendering issue
**Solution:**
1. Check browser supports WebGL:
   ```javascript
   const canvas = document.createElement('canvas');
   const gl = canvas.getContext('webgl');
   console.log(gl ? 'WebGL supported' : 'No WebGL');
   ```
2. Check browser console for errors
3. Try disabling hardware acceleration
4. Update graphics drivers

#### Error: "Framer Motion animation not working"
**Cause:** Component not wrapped properly
**Solution:**
1. Check `motion` component is imported from 'framer-motion'
2. Verify animation variants are properly defined
3. Check element has `initial`, `animate`, `exit` props
4. Inspect with React DevTools

### Data & CMS Issues

#### Skills/Projects not showing
**Cause:** Sanity data not connected
**Solution:**
1. Verify environment variables set:
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   echo $NEXT_PUBLIC_SANITY_DATASET
   ```
2. Check Sanity Studio has documents
3. Verify schemas deployed
4. Test GROQ query in Sanity console:
   ```groq
   *[_type == "skill"]
   *[_type == "project"]
   *[_type == "workExperience"]
   ```

#### "Network error" when fetching from Sanity
**Solution:**
1. Check internet connection
2. Verify Sanity project is active
3. Check API token hasn't expired
4. Add CORS origin in Sanity:
   - Go to Settings → API
   - Add your domain/localhost:3000

#### Stale data showing
**Solution:**
```typescript
// Force revalidation in page.tsx
export const revalidateTag = 0; // Revalidate every request
// Or
export const revalidateTag = 3600; // Revalidate every hour
```

### Performance Issues

#### Page loads slowly
**Diagnosis:**
```bash
# Check what's slow
pnpm build
# Look at output size
```

**Solutions:**
1. Enable image optimization
2. Remove unused animations
3. Lazy load heavy components
4. Check Sanity query efficiency

#### 3D animations stuttering
**Solutions:**
1. Reduce particle count in FloatingParticles.tsx
2. Disable some animations
3. Check browser performance
4. Update graphics drivers
5. Try different browser

#### High memory usage
**Solutions:**
1. Check for memory leaks
2. Profile with Chrome DevTools
3. Remove unused 3D elements
4. Optimize images

### Styling Issues

#### Tailwind classes not applying
**Solution:**
1. Check class spelling
2. Verify in `globals.css` Tailwind is imported
3. Restart dev server
4. Clear `.next` folder:
   ```bash
   rm -rf .next
   pnpm dev
   ```

#### Dark mode not working
**Solution:**
1. Check `next-themes` is installed
2. Verify theme provider in layout
3. Check OS dark mode preference
4. Force dark mode for testing:
   ```javascript
   // In browser console
   localStorage.setItem('theme', 'dark')
   ```

#### Responsive design broken
**Solution:**
1. Check mobile viewport in `layout.tsx`
2. Test with Chrome DevTools responsive mode
3. Verify Tailwind breakpoints used correctly
4. Check media queries in CSS

### Component Issues

#### Navbar not sticky
**Solution:**
1. Add `sticky top-0` classes
2. Verify z-index is high enough
3. Check parent containers don't have overflow hidden

#### Modal/Dialog not opening
**Solution:**
1. Check state management
2. Verify onClick handlers
3. Check z-index layers
4. Inspect with React DevTools

#### Images not loading
**Solution:**
1. Check image URL is valid
2. Use Next.js Image component
3. Add alt text
4. Verify image file exists

### Sanity-Specific Issues

#### "Dataset not found"
**Solution:**
```bash
# Create dataset
sanity dataset create production
```

#### "Permission denied" error
**Solution:**
1. Check API token permissions
2. Create new token with correct permissions
3. Verify token not expired
4. Check project/dataset in env vars

#### GROQ query returning empty
**Solution:**
1. Check document type name matches schema
2. Verify documents published (not draft)
3. Test query in Sanity console
4. Check GROQ syntax
```groq
# Test basic query
*[_type == "skill" && published == true]
```

### Deployment Issues

#### Env vars not working in production
**Solution:**
1. Add to Vercel Settings → Environment Variables
2. Use NEXT_PUBLIC_ prefix for client-side
3. Redeploy after adding vars
4. Check var names exactly match

#### Build fails on Vercel
**Solution:**
1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Check Node version compatibility
4. Test locally: `pnpm build`

#### 404 pages not rendering correctly
**Solution:**
1. Create `app/not-found.tsx`
2. Create `app/error.tsx`
3. Test with non-existent routes

### Browser-Specific Issues

#### Works locally but not in production
**Solution:**
1. Check env vars in production
2. Test on actual domain (not IP)
3. Check CORS settings
4. Clear browser cache

#### Safari animation issues
**Solution:**
1. Check webkit prefixes
2. Test Safari specifically
3. Use `-webkit-` variants in CSS
4. Check Safari console

#### Mobile touch events not working
**Solution:**
1. Add `pointer-events: auto`
2. Ensure buttons are 44px+ size
3. Remove `user-select: none` if needed
4. Test on actual device

## 🔍 Debugging Tips

### Enable Debug Logging
Add to components:
```typescript
console.log("[v0] Debug message:", variable);
```

### Check Network Requests
1. Open Chrome DevTools
2. Go to Network tab
3. Look for failed requests
4. Check response data

### React DevTools
1. Install React DevTools extension
2. Inspect components
3. Check props and state
4. Check component tree

### Sanity Console
1. Go to Sanity Studio
2. Open Vision tab
3. Write and test GROQ queries
4. Check document structure

## 📞 Getting Help

### Before asking for help, try:
1. ✅ Check this troubleshooting guide
2. ✅ Search error message on Google
3. ✅ Check official documentation
4. ✅ Review similar projects
5. ✅ Test in isolation

### Where to get help:
- **Sanity Issues**: https://slack.sanity.io
- **Framer Motion**: https://github.com/framer/motion/discussions
- **Next.js**: https://github.com/vercel/next.js/discussions
- **Three.js**: https://discourse.threejs.org
- **Stack Overflow**: Tag with relevant library

### When reporting bugs, include:
- Error message (full stack trace)
- Steps to reproduce
- Browser & OS
- Code snippet
- Expected vs actual behavior
- Screenshots/videos if applicable

## ✅ Verification Checklist

Use this to verify everything works:

- [ ] `pnpm install` completes without errors
- [ ] `pnpm dev` starts successfully
- [ ] Localhost:3000 loads without errors
- [ ] 3D cube renders in hero section
- [ ] Animations are smooth
- [ ] Skills load from Sanity
- [ ] Work experience timeline shows
- [ ] Projects display correctly
- [ ] Hover effects work
- [ ] Responsive on mobile
- [ ] Dark mode toggle works (if implemented)
- [ ] Build succeeds: `pnpm build`
- [ ] Demo page works: localhost:3000/demo

## 🐛 Known Issues & Workarounds

### Issue: Flickering on page load
**Workaround:** Add fade-in animation on mount

### Issue: 3D cube breaks on mobile
**Workaround:** Reduce cube size on small screens

### Issue: Sanity CORS errors
**Workaround:** Add localhost:3000 to CORS origins in Sanity

### Issue: Animations lag on Safari
**Workaround:** Use GPU-accelerated transforms only

---

Can't find your issue? Check the other documentation files or reach out for help!
