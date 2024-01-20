import { describe, it, expect, vi } from 'vitest'

import { createStorageService } from './storage'

describe('StorageService - allows to create type-safe storage either localStorage or sessionStorage', () => {
  it('should use provided storage on the client', () => {
    const mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as Storage
    const clientService = createStorageService<'test'>({ storage: mockStorage })

    clientService.setItem({ key: 'test', value: 'value' })
    expect(mockStorage.setItem).toHaveBeenCalledWith('test', 'value')

    clientService.getItem({ key: 'test' })
    expect(mockStorage.getItem).toHaveBeenCalledWith('test')

    clientService.removeItem({ key: 'test' })
    expect(mockStorage.removeItem).toHaveBeenCalledWith('test')
  })
  it('should use in-memory storage on the server', () => {
    const nonExistantStorage = undefined

    const serverService = createStorageService<string>({
      storage: nonExistantStorage,
    })
    serverService.setItem({ key: 'test', value: 'value' })
    expect(serverService.getItem({ key: 'test' })).toBe('testValue')
  })
})
