import * as React from 'react'

import { useMedia } from './useMedia'
import { useLocalStorage } from './useLocalStorage'

const usePrefersDarkMode = () => {
  return useMedia(['(prefers-color-scheme: dark)'], [true], false)
}

export const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage<'dark' | 'light'>(
    'user-theme-variant'
  )

  const prefersDarkMode = usePrefersDarkMode()

  const enabled =
    typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode

  const setDarkMode = () => {
    setEnabledState((prevState) => (prevState === 'dark' ? 'light' : 'dark'))
  }

  React.useEffect(() => {
    const className = 'dark-mode'
    const element = window.document.body
    if (enabled === 'dark') {
      element.dataset.theme = 'dark'
      element.classList.add(className)
    } else {
      element.dataset.theme = ''
      element.classList.remove(className)
    }
  }, [enabled])

  return [enabled, setDarkMode] as const
}
