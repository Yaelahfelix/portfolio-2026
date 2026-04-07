import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: 'Full-Stack Developer Portfolio | Interactive & Animated',
  description: 'Explore my portfolio showcasing full-stack development projects, skills, and professional experience. Built with React, Next.js, and modern web technologies.',
  keywords: ['portfolio', 'developer', 'full-stack', 'react', 'nextjs', 'web development'],
  authors: [{ name: 'Portfolio' }],
  creator: 'Portfolio Owner',
  publisher: 'Portfolio',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myportfolio.com',
    title: 'Full-Stack Developer Portfolio',
    description: 'Explore my portfolio showcasing full-stack development projects',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Developer Portfolio',
    description: 'Interactive & Animated Portfolio',
    creator: '@yourhandle',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
