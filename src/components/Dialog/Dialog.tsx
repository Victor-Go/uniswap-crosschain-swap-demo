'use client'

import clsx from 'clsx'
import { BaseModal, ModalProps } from '../BaseModal/BaseModal'
import styles from './Dialog.module.scss'
import BaseButton from '../BaseButton/BaseButton'
import { JSX, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'

type DialogProps = ModalProps & {
  title?: string
  description?: string | JSX.Element
  actions?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  hideCancel?: boolean
  className?: string
  t?: (key: string) => string
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  actions,
  onConfirm,
  onCancel,
  hideCancel = false,
  className,
  t,
}) => {
  const renderActions = () => {
    if (actions) return actions
    if (onConfirm || onCancel) {
      return (
        <div className={styles['actions']}>
          {!hideCancel && (
            <BaseButton
              theme='red'
              onClick={() => {
                onClose?.()
                onCancel?.()
              }}
            >
              {t ? t('Cancel') : 'Cancel'}
            </BaseButton>
          )}
          {onConfirm && (
            <BaseButton
              theme='green'
              onClick={() => {
                onClose?.()
                onConfirm?.()
              }}
            >
              {t ? t('Confirm') : 'Confirm'}
            </BaseButton>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx(styles['dialog'], className)}
      title={title}
      closeOnBackdropClick
    >
      <div className={styles['body']}>
        {typeof description === 'string' ? (
          <h3>{description}</h3>
        ) : (
          <div className={styles['desc']}>{description}</div>
        )}
        {renderActions()}
      </div>
    </BaseModal>
  )
}

export default Dialog
