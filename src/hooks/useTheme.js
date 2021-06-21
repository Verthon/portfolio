import * as React from "react";

export const THEME = {
  dark: "dark",
  light: "light"
}

export const useTheme = (theme = THEME.light) => {
  const SYSTEM_DARK_THEME = window?.matchMedia("(prefers-color-scheme: dark)").matches;
  const INITIAL_THEME = localStorage.getItem("THEME") || SYSTEM_DARK_THEME ? THEME.dark : THEME.light
  const [currentTheme, setTheme] = React.useState(INITIAL_THEME)
  const nextTheme = theme === THEME.light ? THEME.dark : THEME.light

  const updateTheme = () => {
    window?.localStorage.setItem("THEME", theme)
    setTheme(theme)
  }

  React.useEffect(() => {
    document.body.dataset.theme = currentTheme
  }, [theme, currentTheme])

  return {
    updateTheme,
    nextTheme,
    currentTheme,
  }
}