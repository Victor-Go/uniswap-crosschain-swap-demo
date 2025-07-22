import { Network, Token } from '@/models/general'
import styles from './CurrencyInput.module.scss'
import { useTranslations } from 'next-intl'
import { capitalizeFirstLetter } from '@/utils/formatUtils'
import NumberInput from '../NumberInput/NumberInput'
import Image from 'next/image'
import clsx from 'clsx'

const currencyIconMapping: Record<Token, string> = {
  ETH: '/icons/eth.svg',
  USDC: '/icons/usdc.svg',
}

type CurrencyInputProps = {
  direction: 'from' | 'to'
  network: Network
  currency: Token
  onCurrencyChange?: () => void
  onAmountChange: (value: number) => void
  amount: number
  balance?: number
  disabled?: boolean
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  direction,
  network,
  currency,
  onAmountChange,
  amount,
  balance,
  disabled,
}) => {
  const t = useTranslations('')

  return (
    <div className={clsx(styles['container'])}>
      <div className={styles['info']}>
        <div className={styles['info__direction']}>
          {`${t(capitalizeFirstLetter(direction))} (${network})`}
        </div>
        <div className={styles['info__balance']}>
          {t('Balance')}: {balance || '--'}
        </div>
      </div>
      <div className={styles['input-container']}>
        <NumberInput
          min={0}
          max={1e9}
          value={amount}
          className={styles['input']}
          disabled={disabled}
          onChange={onAmountChange}
        />
        <div className={styles['currency']}>
          <Image
            width={25}
            height={25}
            src={currencyIconMapping[currency]}
            alt='icon'
          />
          <div className={styles['currency__name']}>
            {currency.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CurrencyInput
