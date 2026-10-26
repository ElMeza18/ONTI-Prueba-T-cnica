export const NOTES_STORAGE_KEY = 'onti.notes'
export const NOTIFICATIONS_STORAGE_KEY = 'onti.notifications'

const readStorage = (key, fallback) => {
  try {
    const rawValue = globalThis.localStorage?.getItem(key)

    if (rawValue === null || rawValue === undefined) {
      return fallback
    }

    const parsedValue = JSON.parse(rawValue)
    return parsedValue ?? fallback
  } catch {
    return fallback
  }
}

export const getStoredNotes = () => {
  const storedNotes = readStorage(NOTES_STORAGE_KEY, [])
  return Array.isArray(storedNotes) ? storedNotes : []
}

export const saveNotes = (notes) => {
  const normalizedNotes = Array.isArray(notes) ? notes : []

  try {
    globalThis.localStorage?.setItem(NOTES_STORAGE_KEY, JSON.stringify(normalizedNotes))
  } catch {
    // Ignore storage write failures in restricted contexts.
  }

  return normalizedNotes
}

export const getStoredNotifications = () => {
  const storedNotifications = readStorage(NOTIFICATIONS_STORAGE_KEY, [])
  return Array.isArray(storedNotifications) ? storedNotifications : []
}

export const saveNotifications = (notifications) => {
  const normalizedNotifications = Array.isArray(notifications) ? notifications : []

  try {
    globalThis.localStorage?.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(normalizedNotifications))
  } catch {
    // Ignore storage write failures in restricted contexts.
  }

  return normalizedNotifications
}
