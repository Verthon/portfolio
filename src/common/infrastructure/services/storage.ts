type StorageVariant = {
  storage?: Storage
}

export const createStorageService = <Key extends string>({
  storage,
}: StorageVariant) => {
  const inMemoryStorage: Record<Key, string> = {} as Record<Key, string>

  const isSupported = () => {
    if (!storage) return false

    try {
      const testKey = '__test_key__'
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
      return true
    } catch (e) {
      console.error('error', e)
      return false
    }
  }

  const isStorageSupported = isSupported()

  const getStorageItem = ({ key }: { key: Key }) => {
    return !isStorageSupported
      ? inMemoryStorage[key] || null
      : storage?.getItem(key) || null
  }

  const setStorageItem = ({ key, value }: { key: Key; value: string }) => {
    if (!isStorageSupported) {
      inMemoryStorage[key] = value
    } else {
      storage?.setItem(key, value)
    }
  }

  const removeStorageItem = ({ key }: { key: Key }) => {
    if (!isStorageSupported) {
      delete inMemoryStorage[key]
    } else {
      storage?.removeItem(key)
    }
  }

  return {
    getItem: getStorageItem,
    setItem: setStorageItem,
    removeItem: removeStorageItem,
  }
}
