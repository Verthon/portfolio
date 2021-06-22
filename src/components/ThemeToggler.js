import * as React from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

import { MoonIcon } from '../icons/MoonIcon'
import { SunIcon } from '../icons/SunIcon'

export const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <SunIcon color="white" /> : <MoonIcon color="black" />}
    </button>
  )
}
