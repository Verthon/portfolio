// import * as React from 'react'

// export const THEME = {
//   dark: 'dark',
//   light: 'light',
// }

// export const useTheme = (theme = THEME.light) => {
//   const SYSTEM_DARK_THEME = window
//     ? window.matchMedia('(prefers-color-scheme: dark)').matches
//     : false
//   const INITIAL_THEME =
//     localStorage.getItem('THEME') || SYSTEM_DARK_THEME
//       ? THEME.dark
//       : THEME.light
//   const INIT_NEXT = theme === THEME.light ? THEME.dark : THEME.light
//   const INIT_IS_NEXT_LIGHT = theme === THEME.light

//   const [currentTheme, setTheme] = React.useState(INITIAL_THEME)
//   const [nextTheme, setNextTheme] = React.useState({ name: INIT_NEXT, isLight: INIT_IS_NEXT_LIGHT })

//   const updateTheme = () => {
//     console.log({ nextTheme, currentTheme })
//     localStorage.setItem('THEME', currentTheme)
//     setTheme(nextTheme.name)
//     const next = { name: nextTheme === THEME.light ? THEME.dark : THEME.light, isLight: !nextTheme.isLight }
//     setNextTheme(next)
//   }

//   React.useEffect(() => {
//     document.body.dataset.theme = currentTheme
//   }, [theme, currentTheme])

//   return {
//     updateTheme,
//     currentTheme,
//     nextTheme,
//   }
// }

import * as React from "react"

import { useMedia } from "./useMedia"
import { useLocalStorage } from "./useLocalStorage"

const usePrefersDarkMode = () => {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}

export const useDarkMode = () => {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;

  // Fire off effect that add/removes dark mode class
  React.useEffect(
    () => {
      const className = "dark-mode";
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  // Return enabled state and setter
  return [enabled, setEnabledState];
}
