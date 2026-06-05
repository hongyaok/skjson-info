'use client'

import { useState, useEffect } from 'react'
import { Switch, XStack } from 'tamagui'
import { Sun, Moon } from '@tamagui/lucide-icons'
import { useThemeSetting, useRootTheme } from '@tamagui/next-theme'

export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting()
  const [theme] = useRootTheme()
  const [mounted, setMounted] = useState(false)

  const [clientTheme, setClientTheme] = useState<string | undefined>('light')

  useEffect(() => {
    setMounted(true)
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme)
  }, [themeSetting.current, themeSetting.resolvedTheme, theme])

  const isDark = clientTheme === 'dark'

  const toggleTheme = () => {
    themeSetting.set(isDark ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <XStack items="center" gap="$2">
        <Sun size={16} color="$color10" />
        <Switch size="$2" checked={false} disabled>
          <Switch.Thumb animation="bouncy" />
        </Switch>
        <Moon size={16} color="$color10" />
      </XStack>
    )
  }

  return (
    <XStack items="center" gap="$2">
      <Sun size={16} color={!isDark ? "$color12" : "$color10"} />
      <Switch size="$2" checked={isDark} onCheckedChange={toggleTheme}>
        <Switch.Thumb animation="bouncy" />
      </Switch>
      <Moon size={16} color={isDark ? "$color12" : "$color10"} />
    </XStack>
  )
}
