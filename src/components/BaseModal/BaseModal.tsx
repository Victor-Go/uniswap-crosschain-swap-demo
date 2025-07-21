'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './BaseModal.module.scss'
import clsx from 'clsx'
import { useEscCloseOnlyOnTop } from './useEscCloseOnlyOnTop'

export type ModalProps = {
  handleEsc?: boolean
  isOpen: boolean
  onClose?: () => void
  dontAllowClose?: boolean
  closeOnBackdropClick?: boolean
}
export const BaseModal: React.FC<
  ModalProps & {
    children: React.ReactNode
    title?: string
    leftButton?: React.ReactNode
    className?: string
  }
> = ({
  handleEsc = true,
  isOpen,
  onClose,
  dontAllowClose,
  children,
  title,
  closeOnBackdropClick,
  leftButton,
  className,
}) => {
  useEscCloseOnlyOnTop(isOpen, onClose)

  const [mounted, setMounted] = useState(false)
  const [animateClass, setAnimateClass] = useState<'fade-in' | 'fade-out' | ''>(
    '',
  )

  const handleEscRef = useRef(handleEsc)
  useEffect(() => {
    handleEscRef.current = handleEsc
  }, [handleEsc])

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      const timeout = setTimeout(() => {
        requestAnimationFrame(() => {
          setAnimateClass('fade-in')
        })
      }, 0)
      return () => {
        clearTimeout(timeout)
      }
    } else {
      setAnimateClass('fade-out')
      const timer = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <div
      className={clsx(styles['backdrop'], styles[animateClass])}
      onClick={() => {
        closeOnBackdropClick && onClose?.()
      }}
    >
      <div
        className={clsx(
          styles['content'],
          styles[animateClass === 'fade-in' ? 'scale-in' : 'scale-out'],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={clsx(styles['header'])}>
          <div className={styles['left']}>
            {leftButton && <>{leftButton}</>}
          </div>
          {title && <h2 className={styles['title']}>{title}</h2>}
          <div className={styles['right']}>
            {!dontAllowClose && (
              <button
                title='close'
                className={styles['close']}
                onClick={onClose}
              >
                <img
                  draggable='false'
                  src='/icons/close.svg'
                  alt='close'
                  className={styles['close__icon']}
                />
              </button>
            )}
          </div>
        </div>
        <div className={styles['body']}>{children}</div>
      </div>
    </div>
  )
}
