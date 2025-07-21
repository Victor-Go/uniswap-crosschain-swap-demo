'use client'

import clsx from 'clsx'
import styles from './BaseButton.module.scss'
import { CSSProperties, JSX } from 'react'

type BaseButtonProps = {
  theme?: 'normal' | 'green' | 'red'
  children: JSX.Element | JSX.Element[] | string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  normalNormalBg?: string
  normalHoverBg?: string
  normalActiveBg?: string
  normalBorder?: string
  activeNormalBg?: string
  activeHoverBg?: string
  activeActiveBg?: string
}
const BaseButton: React.FC<BaseButtonProps> = ({
  theme,
  children,
  className,
  style,
  onClick,
  active,
  disabled,
  normalNormalBg,
  normalHoverBg,
  normalActiveBg,
  normalBorder,
  activeNormalBg,
  activeHoverBg,
  activeActiveBg,
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={clsx(
        styles['button'],
        { [styles['button--active']]: active },
        { [styles['button--green']]: !disabled && theme === 'green' },
        { [styles['button--red']]: !disabled && theme === 'red' },
        className,
      )}
      style={{
        ['--normal-normal-bg' as string]: !disabled && normalNormalBg,
        ['--normal-hover-bg' as string]: !disabled && normalHoverBg,
        ['--normal-active-bg' as string]: !disabled && normalActiveBg,
        ['--normal-border' as string]: !disabled && normalBorder,

        ['--active-normal-bg' as string]: !disabled && activeNormalBg,
        ['--active-hover-bg' as string]: !disabled && activeHoverBg,
        ['--active-active-bg' as string]: !disabled && activeActiveBg,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
export default BaseButton
