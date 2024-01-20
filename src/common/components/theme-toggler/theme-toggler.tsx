import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'

import { createStorageService } from '~/common/infrastructure/services/storage'
import { usePrefersDarkMode } from '~/common/application/hooks/usePrefersDarkMode'
import SunIcon from '../sun-icon/sun-icon'
import MoonIcon from '../moon-icon/moon-icon'

import { themeToggler } from './theme-toggler.module.css'

export default component$(() => {
  const prefersDarkMode = usePrefersDarkMode()
  const store = useStore({ isDarkMode: true })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const storage = createStorageService<'user-theme-variant'>({
      storage: isServer ? undefined : window.localStorage,
    })
    const storedPreference = storage.getItem({ key: 'user-theme-variant' })

    store.isDarkMode =
      storedPreference !== null ? storedPreference === 'dark' : prefersDarkMode

    const element = window.document.documentElement
    element.dataset.theme = store.isDarkMode ? 'dark' : 'light'
    element.classList.toggle('dark-mode', store.isDarkMode)
  })

  return (
    <button
      class={themeToggler}
      onClick$={() => {
        const setTheme = () => {
          const element = window.document.documentElement
          element.dataset.theme = store.isDarkMode ? 'dark' : 'light'
          element.classList.toggle('dark-mode', store.isDarkMode)
        }
        store.isDarkMode = !store.isDarkMode
        const storage = createStorageService<'user-theme-variant'>({
          storage: window.localStorage,
        })
        storage.setItem({
          key: 'user-theme-variant',
          value: store.isDarkMode ? 'dark' : 'light',
        })
        setTheme()
      }}
      aria-label={
        store.isDarkMode ? 'Activate light theme' : 'Activate dark theme'
      }
      title={store.isDarkMode ? 'Activate light theme' : 'Activate dark theme'}
      data-cy="theme-toggler"
    >
      {store.isDarkMode ? (
        <SunIcon color="white" />
      ) : (
        <MoonIcon color="black" />
      )}
    </button>
  )
})
