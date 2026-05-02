'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { en } from '@/locales/en'
import { id } from '@/locales/id'
import type { Translations } from '@/locales/en'

export type Locale = 'en' | 'id'

const translations: Record<Locale, Translations> = { en, id }

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  t: en,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
