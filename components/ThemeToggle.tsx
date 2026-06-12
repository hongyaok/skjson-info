'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-[56px] h-[30px] rounded-full bg-secondary/20 border border-border/40 opacity-50" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-[56px] h-[30px] flex items-center justify-between rounded-full bg-secondary/30 hover:bg-secondary/40 border border-border/40 p-[2px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]/50 group transition-all duration-300 hover:shadow-[0_0_12px_rgba(250,204,21,0.15)]"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
    >
      {/* Animated Slider Backdrop */}
      <motion.div
        className="absolute top-[2px] bottom-[2px] left-[2px] w-[24px] h-[24px] rounded-full shadow-sm"
        animate={{
          x: isDark ? 26 : 0,
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid rgba(0, 0, 0, 0.08)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
      />

      {/* Sun Icon */}
      <div className="z-10 w-[24px] h-[24px] flex items-center justify-center">
        <Sun
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            isDark 
              ? 'text-muted-foreground/50 group-hover:text-muted-foreground scale-90' 
              : 'text-amber-500 fill-amber-500/10 scale-100'
          }`}
        />
      </div>

      {/* Moon Icon */}
      <div className="z-10 w-[24px] h-[24px] flex items-center justify-center">
        <Moon
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            isDark 
              ? 'text-[#facc15] fill-[#facc15]/10 scale-100' 
              : 'text-muted-foreground/50 group-hover:text-muted-foreground scale-90'
          }`}
        />
      </div>
    </button>
  )
}
