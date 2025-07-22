import Image from 'next/image'
import styles from './LanguageButton.module.scss'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import useSwitchLocale from '@/hooks/useSwitchLocale'

const LanguageButton: React.FC = () => {
  const switchLocale = useSwitchLocale()

  const locale = useLocale()

  return (
    <div
      onClick={() => switchLocale(locale === 'en' ? 'fr' : 'en')}
      className={clsx(styles['language-button'])}
    >
      <div>{locale}</div>
      <Image
        className={styles['current-logo']}
        width={30}
        height={30}
        alt='language'
        src={`/icons/${locale}.svg`}
      />
      <Image
        className={styles['to-logo']}
        width={30}
        height={30}
        alt='language'
        src={`/icons/${locale === 'en' ? 'fr' : 'en'}.svg`}
      />
    </div>
  )
}
export default LanguageButton
