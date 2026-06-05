'use client'

import { useState, useEffect, useRef } from 'react'
import { Platform } from 'react-native'

export function useFadeIn() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Only trigger once
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
