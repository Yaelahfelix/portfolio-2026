# Education & Achievements Sections Guide

## Overview

Your portfolio now includes two powerful new sections to showcase your educational background and professional achievements:

### Education Section
Displays your academic qualifications, degrees, and educational timeline with a beautiful timeline visualization.

### Achievements Section
Showcases awards, certifications, publications, speaking engagements, and other professional recognitions with category filtering.

---

## Education Section

### Features
- Timeline visualization with animated connectors
- School/University name, degree, and field of study
- Start and end dates with automatic date formatting
- GPA display
- Additional description for highlights and coursework
- Responsive design for mobile and desktop
- Smooth animations with Framer Motion

### Sanity Schema Fields

```
- school (required): Name of the educational institution
- degree (required): Type of degree (e.g., Bachelor, Master, PhD)
- field (required): Field of study (e.g., Computer Science)
- startDate (required): When you started
- endDate (optional): When you finished (leave empty if current)
- gpa (optional): Your GPA (e.g., 3.8/4.0)
- description (optional): Achievements, relevant coursework, highlights
- order (optional): Display order (lower numbers appear first)
```

### Sample Education Entry

```json
{
  "_type": "education",
  "_id": "edu-bachelor",
  "school": "State University",
  "degree": "Bachelor of Science",
  "field": "Computer Science",
  "startDate": "2018-09-01",
  "endDate": "2022-06-01",
  "gpa": "3.8/4.0",
  "description": "Focused on software development, data structures, and web technologies.",
  "order": 1
}
```

### Adding Education in Sanity Studio

1. Go to your Sanity Studio dashboard
2. Click on "Education" in the left sidebar
3. Click "Create" to add a new education entry
4. Fill in all required fields
5. Click "Publish" to make it live

---

## Achievements Section

### Features
- Grid layout with beautiful card design
- Category filtering (Award, Certification, Publication, Speaking, Recognition, Other)
- Featured achievements highlighted prominently at the top
- Emoji/icon support for visual appeal
- External links to certificates or proof
- Date formatting with automatic year calculation
- Hover effects and smooth animations
- Color-coded by category
- Mobile responsive

### Sanity Schema Fields

```
- title (required): Achievement title
- category (required): Type of achievement (award, certification, publication, speaking, recognition, other)
- issuer (optional): Organization that issued the award
- date (required): When achievement was earned
- description (optional): Details about the achievement
- icon (optional): Emoji or icon (e.g., 🏆, ☁️, 📝)
- link (optional): URL to certificate or proof
- featured (optional): Show at the top of the section
- order (optional): Display order (lower numbers appear first)
```

### Sample Achievement Entries

**Award Example:**
```json
{
  "_type": "achievement",
  "_id": "achieve-hackathon",
  "title": "First Place - Tech Hackathon 2023",
  "category": "award",
  "issuer": "Tech Community",
  "date": "2023-04-20",
  "description": "Won first place in a 48-hour hackathon with innovative full-stack solution.",
  "icon": "🏆",
  "featured": true,
  "order": 1
}
```

**Certification Example:**
```json
{
  "_type": "achievement",
  "_id": "achieve-aws",
  "title": "AWS Certified Solutions Architect",
  "category": "certification",
  "issuer": "Amazon Web Services",
  "date": "2023-06-15",
  "description": "Professional level certification in cloud architecture and design.",
  "icon": "☁️",
  "link": "https://aws.amazon.com/verification",
  "featured": true,
  "order": 2
}
```

**Publication Example:**
```json
{
  "_type": "achievement",
  "_id": "achieve-article",
  "title": "Published Article: Modern React Patterns",
  "category": "publication",
  "issuer": "Tech Blog",
  "date": "2023-03-10",
  "icon": "📝",
  "link": "https://blog.example.com/react-patterns",
  "order": 3
}
```

### Adding Achievements in Sanity Studio

1. Go to your Sanity Studio dashboard
2. Click on "Achievement" in the left sidebar
3. Click "Create" to add a new achievement
4. Fill in the required fields
5. Use the `featured` toggle to highlight top achievements
6. Set the `order` number to control display sequence
7. Click "Publish"

---

## Styling & Customization

### Education Section Colors
- Primary color: Blue-500 to Purple-500 gradient
- Timeline color: Blue → Purple → Pink gradient
- Background: Semi-transparent gradient from blue/purple tones

### Achievement Section Colors
By category:
- **Award**: Yellow/Orange tones
- **Certification**: Green/Emerald tones
- **Publication**: Blue/Cyan tones
- **Speaking**: Purple/Pink tones
- **Recognition**: Red/Rose tones
- **Other**: Gray/Slate tones

### Customizing Colors

To change the colors, edit `components/sections/AchievementSection.tsx`:

```typescript
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  award: { 
    bg: 'from-yellow-950/30 to-orange-950/30', 
    text: 'text-yellow-300', 
    border: 'border-yellow-500/30' 
  },
  // ... more categories
}
```

---

## Component Queries

### Fetching Education Data

```typescript
import { getEducation } from '@/lib/sanity.queries'

const education = await getEducation()
```

### Fetching Achievements Data

```typescript
import { getAchievements } from '@/lib/sanity.queries'

const achievements = await getAchievements()
```

---

## Best Practices

### Education Section
1. **Order entries chronologically** - Use the `order` field to control display
2. **Include GPA if impressive** - Shows academic excellence
3. **Add descriptions** - Highlight relevant coursework or achievements
4. **Keep dates accurate** - Use ISO date format (YYYY-MM-DD)
5. **Use for recent degrees** - Include education from the last 10 years

### Achievements Section
1. **Feature your best achievements** - Toggle `featured` for top 2-3 items
2. **Use emojis wisely** - Choose relevant icons for quick visual recognition
3. **Include external links** - Link to certificates, articles, or proof
4. **Add descriptions** - Provide context and details
5. **Organize by category** - Use appropriate categories for easy filtering
6. **Keep dates recent** - Focus on achievements from the last 5 years

---

## FAQ

### Q: Can I have empty dates for ongoing education?
**A:** Yes! Leave the `endDate` field empty and it will show "Present" automatically.

### Q: How do I link to my AWS certificate?
**A:** In the achievement document, paste the URL in the `link` field. It will appear as "View Certificate →" on featured items and "View ↗" on regular items.

### Q: Can I change the achievement icons?
**A:** Yes! Use any emoji in the `icon` field. Popular choices: 🏆 (award), ☁️ (cloud), 📝 (publication), 🎤 (speaking), 🎓 (education).

### Q: How many achievements should I display?
**A:** Typically 6-12 achievements work best. Featured achievements should be 2-3 of your best.

### Q: Can I sort achievements by date?
**A:** The achievements are sorted by the `order` field. Lower numbers appear first. You can manually set this or they auto-sort by date if not specified.

---

## Integration Notes

- Both sections fetch data from Sanity CMS using GROQ queries
- Data is automatically sorted and filtered
- Components use React hooks for data fetching
- Animations are powered by Framer Motion
- Fully responsive with Tailwind CSS
- Dark mode compatible

---

## Next Steps

1. Add your education history to Sanity Studio
2. Add your achievements and certifications
3. Set featured achievements to highlight
4. Customize colors if needed
5. Test the sections on mobile and desktop
6. Deploy your updated portfolio!

