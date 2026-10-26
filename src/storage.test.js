import test from 'node:test'
import assert from 'node:assert/strict'
import { getStoredNotes, saveNotes, getStoredNotifications, saveNotifications } from './storage.js'

function createStorageMock() {
  const store = new Map()

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    },
  }
}

test('getStoredNotes returns empty array when there is no saved data', () => {
  global.localStorage = createStorageMock()

  assert.deepEqual(getStoredNotes(), [])
})

test('saveNotes and getStoredNotes persist note data', () => {
  global.localStorage = createStorageMock()
  const notes = [{ id: 1, title: 'Nueva', text: 'Texto', category: 'Reciente', variant: 'peach' }]

  saveNotes(notes)

  assert.deepEqual(getStoredNotes(), notes)
})

test('saveNotifications and getStoredNotifications persist notification data', () => {
  global.localStorage = createStorageMock()
  const notifications = [{ id: 1, title: 'Aviso', message: 'Hola', kind: 'upcoming', read: false, createdAt: '2024-01-01T00:00:00.000Z' }]

  saveNotifications(notifications)

  assert.deepEqual(getStoredNotifications(), notifications)
})
