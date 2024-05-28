'use client'

import { useEffect, useState } from 'react'

export function useClientMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleMatchChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mediaQueryList.addEventListener('change', handleMatchChange)
    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange)
    }
  }, [query])

  return matches as boolean
}
