---
name: Multilanguage Setup
description: i18n implementation - English/Indonesian with splash screen onboarding and localStorage persistence
type: project
---

Portfolio supports English (default) and Indonesian via client-side i18n.

**Why:** User requested full multilanguage support with first-visit splash screen for language selection.

**How to apply:** All UI text comes from `useLanguage()` hook. Sanity CMS content has `_id` suffix fields for Indonesian translations (e.g., `description_id`, `title_id`).

## Architecture
- `locales/en.ts` + `locales/id.ts` — all UI translation strings
- `contexts/LanguageContext.tsx` — React context, reads/writes `portfolio_locale` in localStorage
- `components/Providers.tsx` — wraps app with `LanguageProvider` + `LanguageSplash`
- `components/LanguageSplash.tsx` — first-visit onboarding modal (shows only if no localStorage value)
- `components/LanguageToggle.tsx` — EN/ID toggle button in Navbar
- `components/HomeContent.tsx` — client wrapper for page (needed because page.tsx is server component but parallax text needs translations)

## Sanity localized fields (all optional, fall back to English if empty)
- `workExperience`: `description_id`, `responsibilities_id[]`
- `project`: `description_id`, `caseStudy_id`
- `education`: `description_id`
- `achievement`: `title_id`, `description_id`

## To add a new translation key
1. Add to `locales/en.ts` (TypeScript will enforce the same key exists in `locales/id.ts`)
2. Add to `locales/id.ts`
3. Use `const { t } = useLanguage()` in any client component
