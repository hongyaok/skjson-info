import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { BackgroundWrapper } from '@/components/BackgroundWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'skjson | Train in Python. Run in the browser. No backend needed.',
  description: 'Export scikit-learn models to JSON and run inference directly in the browser using JavaScript.',
  icons: '/icon.svg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
