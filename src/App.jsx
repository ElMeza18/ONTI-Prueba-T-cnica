import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { getStoredNotes, getStoredNotifications, saveNotes, saveNotifications } from './storage.js'
import searchIcon from '../assets/icons/Buscar.svg'
import notificationIcon from '../assets/icons/Notificacion.svg'
import notificationUnreadIcon from '../assets/icons/Notificacion 2.png'
import arrowIcon from '../assets/icons/Icono enter.svg'
import trashIcon from '../assets/icons/Eliminar.png'
import noiseTexture from '../assets/icons/Noise-Animation.png'
import ellipseOne from '../assets/icons/Ellipse 259.svg'
import ellipseTwo from '../assets/icons/Ellipse 260.svg'
import ellipseThree from '../assets/icons/Ellipse 261.svg'
import ellipseFour from '../assets/icons/Ellipse 264.svg'

const emptyNoteForm = {
  title: '',
  text: '',
  reminderEnabled: false,
  reminderDate: '',
  reminderTime: '',
}

const buildNoteForm = (note) => ({
  title: note?.title ?? '',
  text: note?.text ?? '',
  reminderEnabled: Boolean(note?.reminder),
  reminderDate: note?.reminder?.date ?? '',
  reminderTime: note?.reminder?.time ?? '',
})

const buildPreviewText = (text = '') => {
  const cleanText = text.trim()

  if (!cleanText) return ''
  if (cleanText.length <= 20) return cleanText

  return `${cleanText.slice(0, 20)}...`
}

const formatDateLabel = (dateString, timeString) => {
  if (!dateString || !timeString) return 'Sin fecha'

  const [year, month, day] = dateString.split('-').map(Number)
  const [hours, minutes] = timeString.split(':').map(Number)
  const parsedDate = new Date(year, month - 1, day, hours, minutes)

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate)
}

const buildReminderNotifications = (noteTitle, reminderDate, reminderTime, now = new Date()) => {
  if (!reminderDate || !reminderTime) return []

  const [year, month, day] = reminderDate.split('-').map(Number)
  const [hours, minutes] = reminderTime.split(':').map(Number)
  const reminderDateTime = new Date(year, month - 1, day, hours, minutes)
  const upcomingWindowStart = new Date(reminderDateTime.getTime() - 10 * 60 * 1000)
  const notifications = []

  if (now >= upcomingWindowStart && now < reminderDateTime) {
    notifications.push({
      id: Date.now() + 1,
      title: 'Próximo recordatorio',
      message: `Tu nota “${noteTitle}” vence en 10 minutos.`,
      kind: 'upcoming',
      read: false,
      createdAt: now.toISOString(),
    })
  }

  if (now >= reminderDateTime) {
    notifications.push({
      id: Date.now() + 2,
      title: 'Recordatorio sucediendo',
      message: `Es hora de revisar la nota “${noteTitle}”.`,
      kind: 'active',
      read: false,
      createdAt: now.toISOString(),
    })
  }

  return notifications
}

function App() {
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [noteForm, setNoteForm] = useState(emptyNoteForm)
  const [notes, setNotes] = useState(() => getStoredNotes())
  const [notifications, setNotifications] = useState(() => getStoredNotifications())
  const [flashMessage, setFlashMessage] = useState('')
  const lastEnterRef = useRef(0)
  const reminderTimersRef = useRef([])

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  useEffect(() => {
    saveNotifications(notifications)
  }, [notifications])

  useEffect(() => {
    if (!flashMessage) return undefined

    const timeoutId = window.setTimeout(() => setFlashMessage(''), 2500)
    return () => window.clearTimeout(timeoutId)
  }, [flashMessage])

  useEffect(() => {
    return () => {
      reminderTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [])

  const unreadNotifications = notifications.filter((notification) => !notification.read).length

  const filteredNotes = useMemo(() => {
    const query = searchText.trim().toLowerCase()

    if (!query) return notes

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.text.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query),
    )
  }, [notes, searchText])

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort(
        (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
      ),
    [notifications],
  )

  const hasDraftContent =
    noteForm.title.trim() ||
    noteForm.text.trim() ||
    noteForm.reminderEnabled ||
    noteForm.reminderDate ||
    noteForm.reminderTime

  const reminderFieldsComplete =
    !noteForm.reminderEnabled || (noteForm.reminderDate && noteForm.reminderTime)

  const isSaveDisabled =
    !noteForm.title.trim() || !noteForm.text.trim() || !reminderFieldsComplete

  const hasUnsavedEditChanges = () => {
    if (!isEditing || !editingNoteId) return false

    const currentNote = notes.find((note) => note.id === editingNoteId)
    if (!currentNote) return false

    const originalForm = buildNoteForm(currentNote)

    return (
      noteForm.title.trim() !== originalForm.title.trim() ||
      noteForm.text.trim() !== originalForm.text.trim() ||
      noteForm.reminderEnabled !== originalForm.reminderEnabled ||
      noteForm.reminderDate !== originalForm.reminderDate ||
      noteForm.reminderTime !== originalForm.reminderTime
    )
  }

  const resetComposer = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setEditingNoteId(null)
    setShowDiscardDialog(false)
    setNoteForm(emptyNoteForm)
  }

  const clearReminderTimersForNote = (noteId) => {
    reminderTimersRef.current = reminderTimersRef.current.filter(({ timerId, noteId: timerNoteId }) => {
      if (timerNoteId !== noteId) return true

      window.clearTimeout(timerId)
      return false
    })
  }

  const openComposer = () => setIsModalOpen(true)

  const openNoteEditor = (note) => {
    setIsEditing(true)
    setEditingNoteId(note.id)
    setNoteForm(buildNoteForm(note))
    setIsModalOpen(true)
  }

  const handleComposerClose = () => {
    if (!hasDraftContent) {
      resetComposer()
      return
    }

    const title = noteForm.title.trim() || 'Sin título'
    const text = noteForm.text.trim() || 'Nota en borrador'

    const draftNote = {
      id: Date.now(),
      title,
      text,
      category: 'Borrador',
      variant: 'mint',
      isDraft: true,
    }

    setNotes((currentNotes) => [draftNote, ...currentNotes])
    setFlashMessage('Borrador creado')
    resetComposer()
  }

  const saveNote = () => {
    if (isSaveDisabled) return

    const title = noteForm.title.trim() || 'Sin título'
    const text = noteForm.text.trim()
    const noteId = isEditing && editingNoteId ? editingNoteId : Date.now()

    if (isEditing && editingNoteId) {
      clearReminderTimersForNote(editingNoteId)

      const updatedNotes = notes.map((note) => {
        if (note.id !== editingNoteId) return note

        return {
          ...note,
          title,
          text,
          category: note.isDraft ? 'Borrador' : note.category,
          reminder: noteForm.reminderEnabled
            ? {
                date: noteForm.reminderDate,
                time: noteForm.reminderTime,
              }
            : null,
        }
      })

      setNotes(updatedNotes)
      setFlashMessage('Nota actualizada')
      resetComposer()
    } else {
      const newNote = {
        id: noteId,
        title,
        text,
        category: noteForm.reminderEnabled ? 'Recordatorio' : 'Reciente',
        variant: noteForm.reminderEnabled ? 'violet' : 'peach',
        reminder: noteForm.reminderEnabled
          ? {
              date: noteForm.reminderDate,
              time: noteForm.reminderTime,
            }
          : null,
      }

      setNotes((currentNotes) => [newNote, ...currentNotes])
    }

    if (noteForm.reminderEnabled) {
      const [year, month, day] = noteForm.reminderDate.split('-').map(Number)
      const [hours, minutes] = noteForm.reminderTime.split(':').map(Number)
      const reminderDateTime = new Date(year, month - 1, day, hours, minutes)
      const now = new Date()

      const upcomingDelay = reminderDateTime.getTime() - now.getTime() - 10 * 60 * 1000
      const activeDelay = reminderDateTime.getTime() - now.getTime()

      if (upcomingDelay > 0) {
        const timerId = window.setTimeout(() => {
          setNotifications((currentNotifications) => [
            {
              id: Date.now(),
              noteId,
              title: 'Próximo recordatorio',
              message: `Tu nota “${title}” vence en 10 minutos.`,
              kind: 'upcoming',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...currentNotifications,
          ])
        }, upcomingDelay)

        reminderTimersRef.current.push({ noteId, timerId })
      }

      if (activeDelay > 0) {
        const timerId = window.setTimeout(() => {
          setNotifications((currentNotifications) => [
            {
              id: Date.now(),
              noteId,
              title: 'Recordatorio sucediendo',
              message: `Es hora de revisar la nota “${title}”.`,
              kind: 'active',
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...currentNotifications,
          ])
        }, activeDelay)

        reminderTimersRef.current.push({ noteId, timerId })
      } else {
        const reminderNotifications = buildReminderNotifications(
          title,
          noteForm.reminderDate,
          noteForm.reminderTime,
          now,
        ).map((item) => ({ ...item, noteId }))

        setNotifications((currentNotifications) => [...reminderNotifications, ...currentNotifications])
      }
    }

    if (isEditing && editingNoteId) {
      setFlashMessage('Nota actualizada')
    } else {
      setFlashMessage('Nota guardada con éxito')
    }

    resetComposer()
  }

  const handleFormChange = (field, value) => {
    setNoteForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const handleDeleteNote = (note) => {
    setDeleteTarget(note)
  }

  const confirmDeleteNote = () => {
    if (!deleteTarget) return

    clearReminderTimersForNote(deleteTarget.id)
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== deleteTarget.id))
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.noteId !== deleteTarget.id),
    )
    setDeleteTarget(null)
    setFlashMessage('Nota eliminada')
  }

  const handleCloseComposerRequest = () => {
    if (isEditing && hasUnsavedEditChanges()) {
      setShowDiscardDialog(true)
      return
    }

    if (!isEditing && hasDraftContent) {
      handleComposerClose()
      return
    }

    resetComposer()
  }

  const handleComposeKeyDown = (event) => {
    if (event.key !== 'Enter') return

    const now = Date.now()
    const isDoubleEnter = now - lastEnterRef.current < 350
    lastEnterRef.current = now

    if (isDoubleEnter) {
      openComposer()
    }
  }

  const handleSearchToggle = () => {
    setShowSearch((currentValue) => !currentValue)
    if (showSearch) {
      setSearchText('')
    }
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen((currentValue) => {
      const nextValue = !currentValue

      if (nextValue) {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) => ({
            ...notification,
            read: true,
          })),
        )
      }

      return nextValue
    })
  }

  const removeNotification = (notificationId) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== notificationId),
    )
  }

  return (
    <main className="home-screen">
      <div
        className="noise-layer"
        aria-hidden="true"
        style={{ backgroundImage: `url(${noiseTexture})` }}
      />

      <div className="background-orb orb-left" aria-hidden="true">
        <img src={ellipseOne} alt="" />
      </div>
      <div className="background-orb orb-middle" aria-hidden="true">
        <img src={ellipseThree} alt="" />
      </div>
      <div className="background-orb orb-right" aria-hidden="true">
        <img src={ellipseTwo} alt="" />
      </div>
      <div className="background-orb orb-far" aria-hidden="true">
        <img src={ellipseFour} alt="" />
      </div>

      <header className="topbar">
        <h1>Bienvenido</h1>

        <div className="header-controls">
          {showSearch && (
            <div className="search-panel">
              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Escribe una palabra clave..."
                aria-label="Buscar notas"
                autoFocus
              />
            </div>
          )}

          <div className="top-actions" aria-label="Acciones del usuario">
            <button
              type="button"
              className={`icon-button ${showSearch ? 'is-active' : ''}`}
              aria-label="Buscar"
              onClick={handleSearchToggle}
            >
              <img src={searchIcon} alt="" />
            </button>
            <button
              type="button"
              className={`icon-button notification-button ${
                unreadNotifications > 0 ? 'has-unread' : ''
              }`}
              aria-label="Notificaciones"
              onClick={toggleNotifications}
            >
              <img src={unreadNotifications > 0 ? notificationUnreadIcon : notificationIcon} alt="" />
            </button>
          </div>
        </div>
      </header>

      <section className="home-content" aria-label="Pantalla principal">
        

        <div className="notes-stack" aria-live="polite">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <article
                key={note.id}
                className={`note-card note-card--${note.variant}`}
                onClick={() => openNoteEditor(note)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openNoteEditor(note)
                  }
                }}
              >
                <button
                  type="button"
                  className="delete-note-button"
                  aria-label={`Eliminar nota ${note.title}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleDeleteNote(note)
                  }}
                >
                  <img src={trashIcon} alt="" />
                </button>
                <span className="note-tag">{note.isDraft ? 'Borrador' : note.category}</span>
                <h3>{note.title}</h3>
                <p>{buildPreviewText(note.text)}</p>
              </article>
            ))
          ) : (
            <div className="empty-state">No hay notas que coincidan con tu búsqueda.</div>
          )}
        </div>


          <div className="options-block">
            <div className="headline-block">
                <h2>Tus pensamientos viven aquí</h2>
                <p>Comienza por escribir tu primera nota...</p>
            </div>

            <button
              type="button"
              className="compose-bar"
              aria-label="Comenzar a escribir"
              onClick={openComposer}
              onKeyDown={handleComposeKeyDown}
            >
              <span>Comienza a escribir...</span>
              <span className="compose-arrow">
                <img src={arrowIcon} alt="" />
              </span>
            </button>
          </div>

        
      </section>

      {isNotificationsOpen && (
        <aside className="notifications-panel" aria-label="Panel de notificaciones">
          <div className="notifications-header">
            <div>
              <p className="notifications-kicker">Centro de alertas</p>
              <h3>Notificaciones</h3>
            </div>
            <button type="button" className="close-panel" onClick={toggleNotifications} aria-label="Cerrar notificaciones">
              ×
            </button>
          </div>

          <div className="notifications-list">
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`notification-item notification-item--${notification.kind} ${
                    notification.read ? 'is-read' : ''
                  }`}
                >
                  <div className="notification-dot" aria-hidden="true" />
                  <div className="notification-body">
                    <div className="notification-meta">
                      <span className="notification-tag">{notification.kind === 'upcoming' ? 'Próximo' : notification.kind === 'active' ? 'Ahora' : 'Pasada'}</span>
                      <button
                        type="button"
                        className="delete-notification"
                        onClick={() => removeNotification(notification.id)}
                        aria-label="Eliminar notificación"
                      >
                        <img src={trashIcon} alt="" />
                      </button>
                    </div>
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-date">
                      {formatDateLabel(
                        notification.createdAt ? new Date(notification.createdAt).toISOString().slice(0, 10) : '',
                        notification.createdAt ? new Date(notification.createdAt).toTimeString().slice(0, 5) : '',
                      )}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className="notifications-empty">No tienes notificaciones.</div>
            )}
          </div>
        </aside>
      )}

      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseComposerRequest}>
          <div className="note-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? 'Editar nota' : 'Nueva nota'}</h3>
              <button
                type="button"
                className="close-modal"
                onClick={handleCloseComposerRequest}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="note-title">Título de la nota</label>
              <input
                id="note-title"
                value={noteForm.title}
                onChange={(event) => handleFormChange('title', event.target.value.slice(0, 40))}
                placeholder="Ej. Ideas para sprint"
                maxLength={40}
              />
            </div>

            <div className="input-group">
              <label htmlFor="note-body">Cuerpo de la nota</label>
              <textarea
                id="note-body"
                value={noteForm.text}
                onChange={(event) => handleFormChange('text', event.target.value.slice(0, 120))}
                rows={6}
                placeholder="Escribe aquí tu nota..."
                maxLength={120}
              />
            </div>

            <div className="reminder-toggle-row">
              <label htmlFor="note-reminder" className="reminder-label">
                <input
                  id="note-reminder"
                  type="checkbox"
                  checked={noteForm.reminderEnabled}
                  onChange={(event) =>
                    handleFormChange('reminderEnabled', event.target.checked)
                  }
                />
                Recordatorio
              </label>
            </div>

            {noteForm.reminderEnabled && (
              <div className="reminder-fields">
                <div className="input-group small">
                  <label htmlFor="note-date">Fecha de recordatorio</label>
                  <input
                    id="note-date"
                    type="date"
                    value={noteForm.reminderDate}
                    onChange={(event) => handleFormChange('reminderDate', event.target.value)}
                  />
                </div>

                <div className="input-group small">
                  <label htmlFor="note-time">Hora de recordatorio</label>
                  <input
                    id="note-time"
                    type="time"
                    value={noteForm.reminderTime}
                    onChange={(event) => handleFormChange('reminderTime', event.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="secondary-action" onClick={handleCloseComposerRequest}>
                Cancelar
              </button>
              <button
                type="button"
                className="primary-action"
                onClick={saveNote}
                disabled={!isEditing && isSaveDisabled}
              >
                {isEditing ? 'Guardar edición' : 'Crear nota'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDiscardDialog && (
        <div className="modal-backdrop confirm-backdrop" onClick={() => setShowDiscardDialog(false)}>
          <div className="confirm-dialog" onClick={(event) => event.stopPropagation()}>
            <h3>Descartar cambios</h3>
            <p>Los cambios en tus notas no se guardarán.</p>
            <div className="modal-actions">
              <button type="button" className="secondary-action" onClick={() => setShowDiscardDialog(false)}>
                Cancelar
              </button>
              <button type="button" className="primary-action danger-action" onClick={resetComposer}>
                Descartar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-backdrop confirm-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="confirm-dialog" onClick={(event) => event.stopPropagation()}>
            <h3>Eliminar nota</h3>
            <p>Si eliminas esta nota, no podrás recuperarla.</p>
            <div className="modal-actions">
              <button type="button" className="secondary-action" onClick={() => setDeleteTarget(null)}>
                Cancelar
              </button>
              <button type="button" className="primary-action danger-action" onClick={confirmDeleteNote}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
