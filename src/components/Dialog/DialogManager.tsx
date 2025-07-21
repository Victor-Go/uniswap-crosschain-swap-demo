'use client'

import React, { useState, useCallback, JSX } from 'react'
import ReactDOM from 'react-dom'
import Dialog from './Dialog'
import { useTranslations } from 'use-intl'

type DialogOptions = {
  title?: string
  description?: string | JSX.Element
  actions?: JSX.Element | JSX.Element[]
  onConfirm?: () => void
  onCancel?: () => void
  hideCancel?: boolean
  className?: string
  t?: (key: string) => string
}

let showDialog: ((opts: DialogOptions) => void) | null = null

export const openDialog = (options: DialogOptions) => {
  showDialog?.(options)
}

export const DialogContainer = () => {
  const t = useTranslations()

  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setDialogOptions(null), 300)
  }, [])

  showDialog = (opts: DialogOptions) => {
    setDialogOptions(opts)
    setIsOpen(true)
  }

  return dialogOptions
    ? ReactDOM.createPortal(
        <Dialog {...dialogOptions} isOpen={isOpen} onClose={close} t={t} />,
        document.body,
      )
    : null
}
