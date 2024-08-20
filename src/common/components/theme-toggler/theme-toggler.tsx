import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik'

import { createStorageService } from '~/common/infrastructure/services/storage'
import type { UserTheme } from '~/common/domain/models/user-theme'

import { themeToggler, srOnly } from './theme-toggler.module.css'

const updateThemeInStorage = (currentTheme: UserTheme) => {
  const storage = createStorageService<'user-theme-variant'>({
    storage: window.localStorage,
  })
  storage.setItem({
    key: 'user-theme-variant',
    value: currentTheme,
  })
}

const detectSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const updateThemeInCss = (currentTheme: UserTheme) => {
  const prefersDarkMode = detectSystemTheme()
  const isDark =
    currentTheme === 'system' ? prefersDarkMode : currentTheme === 'dark'
  const element = window.document.documentElement
  element.dataset.theme = isDark ? 'dark' : 'light'
  element.classList.toggle('dark-mode', isDark)
}

const getInitialUserTheme = () => {
  const storage = createStorageService<'user-theme-variant'>({
    storage: window.localStorage,
  })

  const storageTheme = storage.getItem({
    key: 'user-theme-variant',
  }) as UserTheme | null

  return storageTheme ?? 'system'
}

export default component$(() => {
  const currentTheme = useSignal<UserTheme>('system')

  const setCurrentTheme = $((_event: Event, element: HTMLSelectElement) => {
    currentTheme.value = element.value as UserTheme
    updateThemeInStorage(currentTheme.value)
    updateThemeInCss(currentTheme.value)
  })

  const themeOptions = [
    { value: 'system', name: 'System mode' },
    { value: 'dark', name: 'Dark mode' },
    { value: 'light', name: 'Light mode' },
  ]

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    currentTheme.value = getInitialUserTheme()
  })

  return (
    <>
      <label for="theme-select" class={srOnly}>
        Select Theme
      </label>
      <select
        id="theme-select"
        class={themeToggler}
        value={currentTheme.value}
        onInput$={setCurrentTheme}
      >
        {themeOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  )
})
