import * as React from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

import { MoonIcon } from '../icons/MoonIcon'
import { SunIcon } from '../icons/SunIcon'

export const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useDarkMode()
  return (
    <button
      className="site-nav__theme-toggler"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Dark theme toggler"
    >
      {darkMode ? <SunIcon color="white" /> : <MoonIcon color="black" />}
    </button>
  )
}
