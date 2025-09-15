// src/app/(public)/layout.tsx
import '../globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo application',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
