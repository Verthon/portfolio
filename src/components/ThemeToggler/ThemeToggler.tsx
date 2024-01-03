/** @jsxImportSource react */
import * as React from 'react'
import { useDarkMode } from '../../hooks/useDarkMode'

import { MoonIcon } from '../../icons/MoonIcon'
import { SunIcon } from '../../icons/SunIcon'

import { themeToggler } from './ThemeToggler.module.css'

export const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useDarkMode()
  return (
    <button
      className={themeToggler}
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? 'Activate light theme' : 'Activate dark theme'}
      title={darkMode ? 'Activate light theme' : 'Activate dark theme'}
      data-cy="theme-toggler"
    >
      {darkMode ? <SunIcon color="white" /> : <MoonIcon color="black" />}
    </button>
  )
}
