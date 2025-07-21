import clsx from 'clsx'
import styles from './Badge.module.scss'

export type BadgeProps = {
  text: string
  theme: 'success' | 'failed' | 'warning'
  className?: string
}
const Badge: React.FC<BadgeProps> = ({ text, theme, className }) => {
  return (
    <div
      className={clsx(styles['badge'], styles[`badge--${theme}`], className)}
    >
      {text}
    </div>
  )
}

export default Badge
