type ModalEntry = {
  onClose: () => void
}

const modalStack: ModalEntry[] = []

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    const top = modalStack[modalStack.length - 1]
    if (top) top.onClose()
  }
}

let initialized = false

export function pushModal(entry: ModalEntry) {
  modalStack.push(entry)
  if (!initialized) {
    window.addEventListener('keydown', handleKeyDown)
    initialized = true
  }
}

export function popModal(entry: ModalEntry) {
  const index = modalStack.lastIndexOf(entry)
  if (index !== -1) modalStack.splice(index, 1)
}
