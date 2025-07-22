import clsx from 'clsx'
import styles from './Badge.module.scss'
import { useTranslations } from 'next-intl'
import { capitalizeFirstLetter } from '@/utils/formatUtils'

export type BadgeProps = {
  text: string
  theme: 'success' | 'failed' | 'warning'
  className?: string
}
const Badge: React.FC<BadgeProps> = ({ text, theme, className }) => {
  const t = useTranslations()

  return (
    <div
      className={clsx(styles['badge'], styles[`badge--${theme}`], className)}
    >
      {t(capitalizeFirstLetter(text))}
    </div>
  )
}

export default Badge
