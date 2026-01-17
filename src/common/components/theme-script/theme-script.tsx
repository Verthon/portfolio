import { themeStorageKey } from '~/common/constants/theme-storage-key'

export const ThemeScript = () => {
  const themeScript = `
    (function() {
      const storageTheme = localStorage.getItem('${themeStorageKey}');
      
      if (!storageTheme) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.firstElementChild.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        document.firstElementChild.classList.toggle('dark-mode', isDarkMode);
        return;
      }

      const theme = storageTheme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : storageTheme;
      
      document.firstElementChild.setAttribute('data-theme', theme);
      document.firstElementChild.classList.toggle('dark-mode', theme === 'dark');
    })();
  `
  return <script id="page-theme" dangerouslySetInnerHTML={themeScript} />
}
