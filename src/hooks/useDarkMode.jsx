import { useState, useEffect } from 'react'

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.theme === 'dark'
  )

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const root = window.document.documentElement
    const prevTheme = isDarkMode ? 'light' : 'dark'
    root.classList.remove(prevTheme)

    const nextTheme = isDarkMode ? 'dark' : 'light'
    root.classList.add(nextTheme)

    localStorage.setItem('theme', nextTheme)

    isDarkMode
      ? (document.querySelector('meta[name="theme-color"]').content = '#374151')
      : (document.querySelector('meta[name="theme-color"]').content = '#ffffff')
  }, [isDarkMode])

  // التحقق من وضع "دارك مود" في متصفح "سفاري" كل مرة يتم تغيير هذا الوضع
  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', function (e) {
        if (e.matches) {
          // تعيين وضع "دارك مود" كفعل
          setIsDarkMode(true)
        } else {
          // تعيين وضع "دارك مود" كغير فعال
          setIsDarkMode(false)
        }
      })
  }

  return [isDarkMode, toggleDarkMode]
}
