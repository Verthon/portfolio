import * as React from 'react'

import { isBrowser } from '../utils/environment'

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = isBrowser ? window.localStorage.getItem(key) : null

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (!isBrowser) {
        return window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      return error
    }
  }

  return [storedValue, setValue] as const
}
