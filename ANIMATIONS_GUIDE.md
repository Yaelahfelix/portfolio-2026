# 🎬 Animations & Interactivity Guide

Learn how to customize animations and add your own effects.

## Understanding Framer Motion

Framer Motion is a React animation library that makes it easy to create smooth animations.

### Basic Concepts

**Variants**: Predefined animation states
```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>
```

**Transitions**: Control animation timing
```typescript
transition={{ duration: 0.6, ease: 'easeOut' }}
transition={{ delay: 0.2 }}
transition={{ repeat: Infinity, repeatType: 'loop' }}
```

**Gestures**: Respond to user interaction
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
whileInView={{ opacity: 1 }}
```

## Available Animations in This Portfolio

### 1. Fade In Animations

**Fade In Up**
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}
```
Used in: Hero, Skills, Projects sections

**Fade In Left/Right**
```typescript
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}
```
Used in: Work Experience timeline

### 2. Stagger Animations

Multiple elements animate with delay between each:
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,      // Delay between children
      delayChildren: 0.3,         // Delay before starting
    },
  },
}
```

### 3. Hover Effects

**Scale on Hover**
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

**Lift on Hover**
```typescript
whileHover={{ y: -4 }}
```

**Color on Hover**
```typescript
whileHover={{ color: '#2563eb' }}
```

### 4. Scroll-Triggered Animations

Elements animate when they come into view:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content appears as you scroll
</motion.div>
```

## Customizing Animations

### Change Animation Duration

Shorter animation (feels snappier):
```typescript
transition={{ duration: 0.3 }} // 0.3 seconds
```

Longer animation (feels smoother):
```typescript
transition={{ duration: 1 }} // 1 second
```

### Change Animation Easing

Different easing functions create different feels:
```typescript
// Smooth, natural feeling
transition={{ ease: 'easeOut' }}

// Bouncy, playful
transition={{ ease: 'backOut' }}

// Linear, mechanical
transition={{ ease: 'linear' }}

// Custom easing
transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Change Stagger Timing

Faster stagger (animations overlap):
```typescript
transition={{ staggerChildren: 0.05 }} // 0.05s between each
```

Slower stagger (animations spread out):
```typescript
transition={{ staggerChildren: 0.3 }} // 0.3s between each
```

## 3D Animations

### Rotating Cube

Located in `components/3d/RotatingCube.tsx`

```typescript
useFrame(() => {
  if (meshRef.current) {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.008
  }
})
```

**To adjust rotation speed**: Change the numbers (0.005, 0.008)
- Smaller = slower
- Larger = faster

### Floating Particles

Located in `components/3d/FloatingParticles.tsx`

```typescript
useFrame((state) => {
  if (!ref.current) return
  ref.current.rotation.x -= 0.0001
  ref.current.rotation.y -= 0.0001
})
```

**To adjust particle colors**:
```typescript
<PointMaterial
  color="#3b82f6"  // Change this to your color
  size={0.003}
/>
```

## Common Animation Patterns

### Fade In on Load
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Slide In from Left
```typescript
<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Content slides in from left
</motion.div>
```

### Bounce Animation
```typescript
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  Bouncing content
</motion.div>
```

### Scale with Spring
```typescript
<motion.button
  whileHover={{ scale: 1.1 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Click me
</motion.button>
```

## Scroll Animations

### Appear on Scroll
```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}  // Only animate once
>
  This appears when you scroll to it
</motion.div>
```

### Parallax Effect
```typescript
<motion.div
  style={{ y: scrollY }}  // Requires useScroll hook
>
  Content moves at different speed than scroll
</motion.div>
```

## Performance Tips

### 1. Use `will-change` for Animations
```typescript
// In your component styles
style={{ willChange: 'transform, opacity' }}
```

### 2. Limit Animations on Mobile
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')

<motion.div
  animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 100 }}
>
  Content
</motion.div>
```

### 3. Use `initial={false}` to Skip Initial Animation
```typescript
<motion.div
  initial={false}  // Don't animate on mount
  animate={{ opacity: 1 }}
>
  Content
</motion.div>
```

## Adding New Animations

### Example: Add Bounce to Button

In `components/sections/HeroSection.tsx`:

```typescript
<motion.button
  whileHover={{ 
    scale: 1.05,
    y: -2  // Lift effect
  }}
  whileTap={{ scale: 0.95 }}
  animate={{
    y: [0, -3, 0]  // Bounce animation
  }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  View My Work
</motion.button>
```

### Example: Rotate on Hover

```typescript
<motion.div
  whileHover={{
    rotate: 5,
    scale: 1.05
  }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Rotates and scales on hover
</motion.div>
```

## Debugging Animations

### Check Animation Performance

1. Open Chrome DevTools → Performance
2. Record a section with animations
3. Check FPS and look for dropped frames

### Common Issues

**Animation feels janky**
- Reduce complexity
- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width` and `height`

**Animation doesn't trigger**
- Check if `initial` and `animate` are set correctly
- Verify `viewport={{ once: true }}` doesn't prevent animation
- Check browser console for errors

**Animation too fast/slow**
- Adjust `duration` value
- Use `delay` for timing control

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://www.framer.com/motion/introduction/)
- [Easing Functions](https://easings.net/)
- [Three.js Docs](https://threejs.org/docs/)

## Animation Library

Reusable animation variants are in `lib/animations.ts`:

```typescript
import { fadeInUp, staggerContainer } from '@/lib/animations'

<motion.div variants={staggerContainer()}>
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

---

Happy animating! 🎨
