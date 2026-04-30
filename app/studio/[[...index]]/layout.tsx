export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio CMS for Portfolio',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // Sanity Studio needs to manage its own HTML/Body to avoid hydration conflicts
  // with existing application layouts like custom fonts, tailwind globals, etc.
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
