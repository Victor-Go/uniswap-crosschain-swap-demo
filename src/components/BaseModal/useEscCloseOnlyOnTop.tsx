import { useEffect, useRef } from 'react'

type DialogEntry = {
  id: symbol
  onClose?: () => void
}

const dialogStack: DialogEntry[] = []

let initialized = false

function initGlobalKeyListener() {
  if (initialized) return
  initialized = true

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const top = dialogStack[dialogStack.length - 1]
      if (top) {
        top.onClose?.()
      }
    }
  })
}

export function useEscCloseOnlyOnTop(isOpen: boolean, onClose?: () => void) {
  const idRef = useRef(Symbol())

  useEffect(() => {
    initGlobalKeyListener()

    if (!isOpen) return

    const id = idRef.current

    const entry: DialogEntry = {
      id: idRef.current,
      onClose,
    }

    dialogStack.push(entry)

    return () => {
      const index = dialogStack.findIndex((e) => e.id === id)
      if (index !== -1) {
        dialogStack.splice(index, 1)
      }
    }
  }, [isOpen, onClose])
}
