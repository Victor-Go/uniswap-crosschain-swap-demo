import Image from 'next/image'
import styles from './WalletButton.module.scss'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { openDialog } from '../Dialog/DialogManager'

const WalletButton: React.FC = () => {
  const t = useTranslations()

  const loggedIn = true

  const logout = () => {
    openDialog({
      title: t('Log out confirm'),
      description: t('Are you sure you want to log out of your wallet?'),
      onConfirm: () => {},
    })
  }

  const login = () => {}

  return (
    <div
      onClick={loggedIn ? logout : login}
      className={clsx(styles['wallet-button'], {
        [styles['logged-in']]: loggedIn,
      })}
    >
      <Image
        className={styles['wallet-logo']}
        width={30}
        height={30}
        alt='wallet'
        src='/icons/wallet.svg'
      />
      <Image
        className={styles['logout-logo']}
        width={30}
        height={30}
        alt='wallet'
        src='/icons/logout.svg'
      />
    </div>
  )
}
export default WalletButton
