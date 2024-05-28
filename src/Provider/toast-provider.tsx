'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { Toaster } from 'sonner'

const ToastProvider = () => {
    const { theme , systemTheme } = useTheme()
    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  return (
    <Toaster closeButton position="top-center" richColors theme={isDark ? 'dark' : 'light'} />
  )
}

export default ToastProvider