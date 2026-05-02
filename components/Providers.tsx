'use client'

import { type ReactNode } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { LanguageSplash } from './LanguageSplash'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageSplash />
      {children}
    </LanguageProvider>
  )
}
