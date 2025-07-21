import { Currency } from '@/models/general'
import styles from './CurrencyInput.module.scss'
import { useTranslations } from 'next-intl'
import { capitalizeFirstLetter } from '@/utils/formatUtils'
import NumberInput from '../NumberInput/NumberInput'
import Image from 'next/image'

const currencyIconMapping: Record<Currency, string> = {
  ETH: '/icons/eth.svg',
  USDC: '/icons/usdc.svg',
}

type CurrencyInputProps = {
  direction: 'from' | 'to'
  currency: Currency
  onCurrencyChange: () => void
  onAmountChange: () => void
  amount: number
  balance?: number
}
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  direction,
  currency,
  onCurrencyChange,
  onAmountChange,
  amount,
  balance,
}) => {
  const t = useTranslations('')

  return (
    <div className={styles['container']}>
      <div className={styles['info']}>
        <div className={styles['info__direction']}>
          {t(capitalizeFirstLetter(direction))}
        </div>
        <div className={styles['info__balance']}>
          {t('Balance')}: {balance || '--'}
        </div>
      </div>
      <div className={styles['input-container']}>
        <NumberInput className={styles['input']} />
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
